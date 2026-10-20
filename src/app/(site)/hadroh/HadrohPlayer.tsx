"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  SECTIONS,
  TRACKS,
  sectionSteps,
  type Hit,
  type SectionId,
  type TrackDef,
} from "@/lib/hadroh-patterns";

// Pemutar pola hadroh: Web Audio API, scheduler lookahead.
// Model ritme: satu bagian = satu siklus 4 ketuk; langkah tiap track
// dibentangkan merata dalam siklus (lihat catatan di hadroh-patterns.ts).

const SAMPLE_URLS = {
  dung: "/audio/hadroh/dung.mp3",
  tek: "/audio/hadroh/tek.mp3",
  bass: "/audio/hadroh/bass.mp3",
} as const;

type SampleKey = keyof typeof SAMPLE_URLS;
type Mode = "loop" | "urutan";

const CYCLE_BEATS = 4;
const CYCLES_PER_SECTION = 2; // mode urutan: tiap bagian 2 siklus
const SECTION_ORDER: SectionId[] = ["dasar", "naik", "turun"];

interface ScheduledCycle {
  start: number;
  section: SectionId;
}

export default function HadrohPlayer() {
  const [section, setSection] = useState<SectionId>("dasar");
  const [mode, setMode] = useState<Mode>("loop");
  const [bpm, setBpm] = useState(92);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [solo, setSolo] = useState<Set<string>>(new Set());
  const [muted, setMuted] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState<SectionId>("dasar");
  const [activeSteps, setActiveSteps] = useState<Record<string, number>>({});

  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const buffersRef = useRef<Partial<Record<SampleKey, AudioBuffer>>>({});
  const timerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const nextCycleTimeRef = useRef(0);
  const cycleCountRef = useRef(0);
  const sectionRef = useRef<SectionId>("dasar");
  const modeRef = useRef<Mode>("loop");
  const bpmRef = useRef(92);
  const queueRef = useRef<ScheduledCycle[]>([]);
  const displayCycleRef = useRef<ScheduledCycle | null>(null);
  const soloRef = useRef(solo);
  const mutedRef = useRef(muted);
  soloRef.current = solo;
  mutedRef.current = muted;
  modeRef.current = mode;
  bpmRef.current = bpm;

  const cycleDuration = useCallback(
    () => (CYCLE_BEATS * 60) / bpmRef.current,
    []
  );

  const audible = useCallback((trackId: string) => {
    const s = soloRef.current;
    const m = mutedRef.current;
    if (m.has(trackId)) return false;
    if (s.size > 0) return s.has(trackId);
    return true;
  }, []);

  const playHit = useCallback(
    (track: TrackDef, hit: Hit, when: number) => {
      const ctx = ctxRef.current;
      const master = masterRef.current;
      if (!ctx || !master) return;
      const b = buffersRef.current;
      let buffer: AudioBuffer | undefined;
      let rate = 1;
      let gain = 0.9;
      if (track.kind === "bass") {
        if (hit === "D") {
          buffer = b.bass ?? b.dung;
          rate = b.bass ? 1 : 0.72;
          gain = 1;
        } else {
          buffer = b.dung;
          rate = 0.85;
          gain = 0.5;
        }
      } else if (hit === "D") {
        buffer = b.dung;
        rate = 1.12;
        gain = 0.9;
      } else if (hit === "T") {
        buffer = b.tek;
        rate = 1;
        gain = 0.8;
      } else if (hit === "d") {
        buffer = b.dung;
        rate = 1.12;
        gain = 0.45;
      } else {
        buffer = b.tek;
        rate = 1.05;
        gain = 0.45;
      }
      if (!buffer) return;
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.playbackRate.value = rate;
      const g = ctx.createGain();
      g.gain.value = gain;
      src.connect(g).connect(master);
      src.start(when);
    },
    []
  );

  const scheduleCycle = useCallback(
    (sectionId: SectionId, start: number) => {
      const dur = cycleDuration();
      for (const track of TRACKS) {
        if (!audible(track.id)) continue;
        const steps = sectionSteps(track, sectionId);
        const stepDur = dur / steps.length;
        steps.forEach((s, i) => {
          if (s.hit) playHit(track, s.hit, start + i * stepDur);
        });
      }
      queueRef.current.push({ start, section: sectionId });
    },
    [audible, cycleDuration, playHit]
  );

  const stop = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    timerRef.current = null;
    rafRef.current = null;
    queueRef.current = [];
    displayCycleRef.current = null;
    setPlaying(false);
    setActiveSteps({});
  }, []);

  const start = useCallback(
    async (withPickup: boolean, startSection: SectionId) => {
      const AC: typeof AudioContext | undefined =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) {
        setLoadError("Browser ini tidak mendukung Web Audio.");
        return;
      }
      if (!ctxRef.current) {
        ctxRef.current = new AC();
        masterRef.current = ctxRef.current.createGain();
        masterRef.current.gain.value = 0.9;
        masterRef.current.connect(ctxRef.current.destination);
      }
      const ctx = ctxRef.current;
      // Jangan await resume(): di sebagian browser promise-nya bisa
      // menggantung; scheduler di bawah cukup aman berjalan dan konteks
      // akan running segera setelah gestur klik diproses.
      void ctx.resume().catch(() => undefined);

      // Muat sampel (sekali saja; kegagalan bass jatuh ke dung).
      if (!buffersRef.current.dung) {
        setLoading(true);
        setLoadError(null);
        try {
          const load = async (key: SampleKey) => {
            const res = await fetch(SAMPLE_URLS[key]);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const raw = await res.arrayBuffer();
            buffersRef.current[key] = await ctx.decodeAudioData(raw);
          };
          await load("dung");
          await load("tek");
          await load("bass").catch(() => {
            buffersRef.current.bass = undefined;
          });
        } catch {
          setLoading(false);
          setLoadError(
            "Sampel bunyi gagal dimuat. Periksa koneksi lalu coba lagi."
          );
          return;
        }
        setLoading(false);
      }

      const t0 = ctx.currentTime + 0.08;
      if (withPickup) {
        for (const track of TRACKS) {
          if (track.pickup && audible(track.id)) {
            playHit(track, track.pickup, t0);
          }
        }
      }
      sectionRef.current = startSection;
      cycleCountRef.current = 0;
      nextCycleTimeRef.current = t0 + (withPickup ? 60 / bpmRef.current : 0);
      queueRef.current = [];
      displayCycleRef.current = null;
      setActiveSection(startSection);
      setPlaying(true);

      timerRef.current = window.setInterval(() => {
        const c = ctxRef.current;
        if (!c) return;
        while (nextCycleTimeRef.current < c.currentTime + 0.15) {
          scheduleCycle(sectionRef.current, nextCycleTimeRef.current);
          nextCycleTimeRef.current += cycleDuration();
          if (modeRef.current === "urutan") {
            cycleCountRef.current += 1;
            if (cycleCountRef.current >= CYCLES_PER_SECTION) {
              cycleCountRef.current = 0;
              const idx = SECTION_ORDER.indexOf(sectionRef.current);
              if (idx >= SECTION_ORDER.length - 1) {
                // Bagian terakhir selesai dijadwalkan: hentikan setelah
                // siklus terakhir berbunyi (timer dibersihkan di rAF).
                sectionRef.current = SECTION_ORDER[0];
                const lastStart = nextCycleTimeRef.current - cycleDuration();
                window.setTimeout(
                  () => stop(),
                  Math.max(0, (lastStart + cycleDuration() - c.currentTime) * 1000)
                );
                if (timerRef.current) window.clearInterval(timerRef.current);
                timerRef.current = null;
                break;
              }
              sectionRef.current = SECTION_ORDER[idx + 1];
            }
          }
        }
      }, 25);

      const tick = () => {
        const c = ctxRef.current;
        if (c) {
          const now = c.currentTime;
          while (
            queueRef.current.length > 0 &&
            queueRef.current[0].start <= now
          ) {
            displayCycleRef.current = queueRef.current.shift()!;
          }
          const dc = displayCycleRef.current;
          if (dc) {
            const progress = (now - dc.start) / cycleDuration();
            if (progress >= 0 && progress < 1) {
              setActiveSection((prev) =>
                prev === dc.section ? prev : dc.section
              );
              setActiveSteps((prev) => {
                const next: Record<string, number> = {};
                for (const track of TRACKS) {
                  const len = sectionSteps(track, dc.section).length;
                  next[track.id] = Math.min(
                    len - 1,
                    Math.floor(progress * len)
                  );
                }
                return JSON.stringify(next) === JSON.stringify(prev)
                  ? prev
                  : next;
              });
            }
          }
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [audible, cycleDuration, playHit, stop]
  );

  // Ganti bagian: bila sedang memutar, mulai ulang dari bagian pilihan
  // (tanpa pukulan pembuka).
  const pickSection = useCallback(
    (id: SectionId) => {
      setSection(id);
      sectionRef.current = id;
      if (playing) {
        if (timerRef.current) window.clearInterval(timerRef.current);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        timerRef.current = null;
        rafRef.current = null;
        setPlaying(false);
        setActiveSteps({});
        void start(false, id);
      }
    },
    [playing, start]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      void ctxRef.current?.close().catch(() => undefined);
    };
  }, []);

  const toggleIn = (
    setter: React.Dispatch<React.SetStateAction<Set<string>>>,
    id: string
  ) =>
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div>
      {/* Pilihan bagian */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Bagian pukulan">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={section === s.id}
            onClick={() => pickSection(s.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              section === s.id
                ? "bg-[#0b3d2e] text-white"
                : "border border-[#e9e4d8] bg-white text-stone-600 hover:border-[#0b3d2e]/40 hover:text-[#0b3d2e]"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Transport */}
      <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl border border-[#e9e4d8] border-l-4 border-l-[#0b3d2e] bg-white p-4 shadow-sm">
        <button
          onClick={() => (playing ? stop() : void start(true, section))}
          disabled={loading}
          aria-label={playing ? "Berhenti" : "Putar"}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0b3d2e] text-lg text-white transition hover:bg-[#0b3d2e]/90 disabled:opacity-50"
        >
          {loading ? "…" : playing ? "❚❚" : "▶"}
        </button>
        <div className="min-w-40 flex-1">
          <label
            htmlFor="tempo"
            className="text-[11px] font-medium tracking-widest text-stone-500 uppercase"
          >
            Tempo
          </label>
          <input
            id="tempo"
            type="range"
            min={50}
            max={160}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-full accent-[#cfa52f]"
          />
        </div>
        <div className="text-sm font-semibold whitespace-nowrap text-[#0b3d2e]">
          {bpm} BPM
        </div>
        <div
          className="flex overflow-hidden rounded-lg border border-[#e9e4d8] text-xs font-medium"
          role="group"
          aria-label="Mode putar"
        >
          {(
            [
              ["loop", "Loop bagian"],
              ["urutan", "Urutan penuh"],
            ] as [Mode, string][]
          ).map(([m, label]) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`px-3 py-2 transition ${
                mode === m
                  ? "bg-[#0b3d2e] text-white"
                  : "bg-white text-stone-600 hover:text-[#0b3d2e]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loadError && (
        <p className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {loadError}
        </p>
      )}

      {/* Track */}
      <div className="mt-4 space-y-3">
        {TRACKS.map((track) => {
          const steps = sectionSteps(track, section);
          const active = activeSteps[track.id];
          const isSolo = solo.has(track.id);
          const isMuted = muted.has(track.id);
          const dimmed = (solo.size > 0 && !isSolo) || isMuted;
          return (
            <section
              key={track.id}
              aria-label={track.name}
              className={`rounded-xl border border-[#e9e4d8] border-l-4 border-l-[#cfa52f] bg-white p-4 shadow-sm transition ${
                dimmed ? "opacity-55" : ""
              }`}
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-serif text-base font-semibold text-[#0b3d2e]">
                    {track.name}
                  </h3>
                  <p className="text-xs text-stone-500">{track.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hidden font-mono text-[11px] text-stone-400 sm:block">
                    {track.pickup ? "D) " : ""}
                    {track.sections[section]}
                  </span>
                  <button
                    onClick={() => toggleIn(setSolo, track.id)}
                    aria-pressed={isSolo}
                    className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition ${
                      isSolo
                        ? "border-[#cfa52f] bg-[#cfa52f]/15 text-[#8a6d1d]"
                        : "border-[#e9e4d8] bg-[#fffefb] text-stone-600 hover:text-[#0b3d2e]"
                    }`}
                  >
                    Solo
                  </button>
                  <button
                    onClick={() => toggleIn(setMuted, track.id)}
                    aria-pressed={isMuted}
                    className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition ${
                      isMuted
                        ? "border-red-300 bg-red-50 text-red-700"
                        : "border-[#e9e4d8] bg-[#fffefb] text-stone-600 hover:text-[#0b3d2e]"
                    }`}
                  >
                    Senyap
                  </button>
                </div>
              </div>
              <div
                className="flex gap-1"
                aria-hidden
                data-track-grid={track.id}
              >
                {steps.map((s, i) => {
                  const isActive = playing && activeSection === section && active === i;
                  return (
                    <span
                      key={i}
                      className={`flex aspect-square min-w-0 flex-1 items-center justify-center rounded-md text-xs font-bold transition-colors duration-75 ${
                        isActive
                          ? "bg-[#cfa52f] text-white"
                          : s.hit
                            ? "bg-[#f6f2e7] text-stone-800"
                            : "bg-[#f6f2e7]/50"
                      } ${s.fast ? "underline decoration-[#cfa52f] decoration-2 underline-offset-2" : ""} ${
                        s.hit === "d" ? "opacity-60" : ""
                      }`}
                    >
                      {s.hit ?? ""}
                    </span>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-stone-500">
        Sedang memutar bagian{" "}
        <strong className="text-[#0b3d2e]">
          {SECTIONS.find((s) => s.id === activeSection)?.label}
        </strong>
        {mode === "urutan" && playing
          ? " — mode urutan: Dasar → Naik → Turun, masing-masing 2 putaran."
          : "."}
      </p>
    </div>
  );
}
