"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import type { ArticleBlocks } from "@/lib/db-types";
import { inputCls } from "./formStyles";

interface UnitState {
  id: string;
  arab: string;
  latin: string;
  translation: string;
  text: string;
}

interface SectionState {
  id: string;
  title: string;
  units: UnitState[];
}

const smallBtnCls =
  "rounded-md border border-stone-300 bg-white px-2 py-1 text-xs text-stone-600 transition hover:border-stone-400 hover:text-stone-900 disabled:opacity-40";

function emptyUnit(): UnitState {
  return {
    id: crypto.randomUUID(),
    arab: "",
    latin: "",
    translation: "",
    text: "",
  };
}

function initialSections(
  initial: ArticleBlocks | null,
  legacyBody: string,
): SectionState[] {
  if (initial) {
    return initial.sections.map((s) => ({
      id: s.id,
      title: s.title,
      units: s.units.map((u) => ({
        id: u.id,
        arab: u.arab ?? "",
        latin: u.latin ?? "",
        translation: u.translation ?? "",
        text: u.text ?? "",
      })),
    }));
  }
  const trimmed = legacyBody.trim();
  if (trimmed) {
    const units = trimmed
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p !== "")
      .map((text) => ({ ...emptyUnit(), text }));
    return [
      {
        id: crypto.randomUUID(),
        title: "Bagian 1",
        units: units.length > 0 ? units : [emptyUnit()],
      },
    ];
  }
  return [{ id: crypto.randomUUID(), title: "", units: [emptyUnit()] }];
}

function move<T>(arr: T[], index: number, dir: -1 | 1): T[] {
  const target = index + dir;
  if (target < 0 || target >= arr.length) return arr;
  const next = [...arr];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function unitFilled(u: UnitState): boolean {
  return (
    u.arab.trim() !== "" ||
    u.latin.trim() !== "" ||
    u.translation.trim() !== "" ||
    u.text.trim() !== ""
  );
}

function validateSections(sections: SectionState[]): string | null {
  for (let i = 0; i < sections.length; i++) {
    const s = sections[i];
    if (s.title.trim() === "") {
      return `Bagian ${i + 1} belum punya judul.`;
    }
    if (!s.units.some(unitFilled)) {
      return `Bagian "${s.title.trim()}" belum punya isi — isi minimal satu kolom pada satu unit.`;
    }
  }
  return null;
}

export default function BlocksEditor({
  initial,
  legacyBody,
}: {
  initial: ArticleBlocks | null;
  legacyBody: string;
}) {
  const [sections, setSections] = useState<SectionState[]>(() =>
    initialSections(initial, legacyBody),
  );
  const [error, setError] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  // useEffectEvent selalu membaca state terbaru tanpa perlu re-subscribe.
  const validateCurrentSections = useEffectEvent(() =>
    validateSections(sections),
  );

  useEffect(() => {
    // Event submit di-dispatch pada <form> dan bubble KE ATAS, jadi
    // onSubmit pada div anak tidak pernah terpanggil. Daftarkan listener
    // native langsung pada form leluhur.
    const form = rootRef.current?.closest("form");
    if (!form) return;
    const onSubmit = (e: Event) => {
      const msg = validateCurrentSections();
      if (msg) {
        e.preventDefault();
        setError(msg);
      }
    };
    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, []);

  const update = (next: SectionState[]) => {
    setSections(next);
    setError(null);
  };

  // Unit kosong dibuang saat serialisasi agar selaras dengan validasi server
  // (parseBlocks me-throw untuk unit tanpa field terisi).
  const payload = {
    sections: sections.map((s) => ({
      ...s,
      units: s.units.filter(unitFilled),
    })),
  };

  return (
    <div ref={rootRef}>
      <input
        type="hidden"
        name="blocks"
        value={JSON.stringify(payload)}
      />
      {error && (
        <p
          role="alert"
          className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {error}
        </p>
      )}
      <div className="space-y-4">
        {sections.map((section, si) => (
          <div
            key={section.id}
            className="rounded-xl border border-stone-200 bg-stone-50 p-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-400">
                {si + 1}
              </span>
              <input
                type="text"
                value={section.title}
                onChange={(e) =>
                  update(
                    sections.map((s, i) =>
                      i === si ? { ...s, title: e.target.value } : s,
                    ),
                  )
                }
                placeholder="Judul bagian, cth: Shalawat Badar"
                aria-label={`Judul bagian ${si + 1}`}
                className={inputCls}
              />
              <button
                type="button"
                title="Pindah ke atas"
                disabled={si === 0}
                onClick={() => update(move(sections, si, -1))}
                className={smallBtnCls}
              >
                ↑
              </button>
              <button
                type="button"
                title="Pindah ke bawah"
                disabled={si === sections.length - 1}
                onClick={() => update(move(sections, si, 1))}
                className={smallBtnCls}
              >
                ↓
              </button>
              <button
                type="button"
                title="Hapus bagian"
                disabled={sections.length === 1}
                onClick={() =>
                  update(sections.filter((_, i) => i !== si))
                }
                className={`${smallBtnCls} hover:border-red-300! hover:text-red-700!`}
              >
                Hapus
              </button>
            </div>

            <div className="mt-3 space-y-3">
              {section.units.map((unit, ui) => (
                <div
                  key={unit.id}
                  className="rounded-lg border border-stone-200 bg-white p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-stone-400">
                      Unit {ui + 1}
                    </span>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        title="Pindah ke atas"
                        disabled={ui === 0}
                        onClick={() =>
                          update(
                            sections.map((s, i) =>
                              i === si
                                ? { ...s, units: move(s.units, ui, -1) }
                                : s,
                            ),
                          )
                        }
                        className={smallBtnCls}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        title="Pindah ke bawah"
                        disabled={ui === section.units.length - 1}
                        onClick={() =>
                          update(
                            sections.map((s, i) =>
                              i === si
                                ? { ...s, units: move(s.units, ui, 1) }
                                : s,
                            ),
                          )
                        }
                        className={smallBtnCls}
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        title="Hapus unit"
                        disabled={section.units.length === 1}
                        onClick={() =>
                          update(
                            sections.map((s, i) =>
                              i === si
                                ? {
                                    ...s,
                                    units: s.units.filter((_, j) => j !== ui),
                                  }
                                : s,
                            ),
                          )
                        }
                        className={`${smallBtnCls} hover:border-red-300! hover:text-red-700!`}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 space-y-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-stone-500">
                        Arab (ayat)
                      </label>
                      <textarea
                        dir="rtl"
                        rows={2}
                        value={unit.arab}
                        onChange={(e) =>
                          update(
                            sections.map((s, i) =>
                              i === si
                                ? {
                                    ...s,
                                    units: s.units.map((u, j) =>
                                      j === ui
                                        ? { ...u, arab: e.target.value }
                                        : u,
                                    ),
                                  }
                                : s,
                            ),
                          )
                        }
                        placeholder="التَّهْجِي…"
                        className={`${inputCls} text-right font-serif text-lg leading-loose`}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-stone-500">
                        Latin
                      </label>
                      <textarea
                        rows={3}
                        value={unit.latin}
                        onChange={(e) =>
                          update(
                            sections.map((s, i) =>
                              i === si
                                ? {
                                    ...s,
                                    units: s.units.map((u, j) =>
                                      j === ui
                                        ? { ...u, latin: e.target.value }
                                        : u,
                                    ),
                                  }
                                : s,
                            ),
                          )
                        }
                        placeholder="Teks latin / transliterasi…"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-stone-500">
                        Terjemah
                      </label>
                      <textarea
                        rows={3}
                        value={unit.translation}
                        onChange={(e) =>
                          update(
                            sections.map((s, i) =>
                              i === si
                                ? {
                                    ...s,
                                    units: s.units.map((u, j) =>
                                      j === ui
                                        ? { ...u, translation: e.target.value }
                                        : u,
                                    ),
                                  }
                                : s,
                            ),
                          )
                        }
                        placeholder="Terjemahan bahasa Indonesia…"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-stone-500">
                        Teks biasa
                      </label>
                      <textarea
                        rows={2}
                        value={unit.text}
                        onChange={(e) =>
                          update(
                            sections.map((s, i) =>
                              i === si
                                ? {
                                    ...s,
                                    units: s.units.map((u, j) =>
                                      j === ui
                                        ? { ...u, text: e.target.value }
                                        : u,
                                    ),
                                  }
                                : s,
                            ),
                          )
                        }
                        placeholder="Teks biasa / keterangan…"
                        className={`${inputCls} leading-relaxed`}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  update(
                    sections.map((s, i) =>
                      i === si ? { ...s, units: [...s.units, emptyUnit()] } : s,
                    ),
                  )
                }
                className="w-full rounded-lg border border-dashed border-stone-300 px-3 py-2 text-xs font-medium text-stone-500 transition hover:border-stone-400 hover:text-stone-700"
              >
                + Tambah unit
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            update([
              ...sections,
              { id: crypto.randomUUID(), title: "", units: [emptyUnit()] },
            ])
          }
          className="w-full rounded-lg border border-dashed border-stone-300 bg-white px-3 py-2.5 text-sm font-medium text-stone-600 transition hover:border-emerald-700 hover:text-emerald-800"
        >
          ＋ Tambah bagian
        </button>
      </div>
    </div>
  );
}
