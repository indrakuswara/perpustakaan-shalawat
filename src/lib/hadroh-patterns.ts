// Data pola pukulan hadroh Banjari + parser rumus — murni data & fungsi,
// bisa dites tanpa browser (scripts/test-hadroh-patterns.ts).
//
// SUMBER (transkripsi apa adanya, bukan karangan):
// - Empat track terbang: dokumen latihan "Rumus Banjari" (Scribd
//   document/498686042), tabel Wedokan, Lanangan, Golong Wedokan, Golong
//   Lanangan × bagian Dasar / Naik / Turun. Dokumen yang sama juga memuat
//   bagian Naik ½, Naik Awal, dan Naik Start — belum dimuat di sini.
// - Track bass: dokumen "Notasi Pukulan Banjari" oleh Nuqthoh Assirrul
//   Jami' (Scribd), tipe Bass pola 1. Bass berperan penjaga tempo, jadi
//   polanya sama di semua bagian.
// - Cross-check: baris Dasar Golong Wedokan & Golong Lanangan dari "Rumus
//   Banjari" identik dengan pola 1 tipe Nggolong Nganai & Nikai di dokumen
//   Nuqthoh — dua dokumen independen sepakat.
//
// Konvensi notasi (dari keterangan kedua dokumen):
// - D = Dung/Duk (pukulan tengah, bunyi rendah), T = Tek/Tang (pinggir, tinggi)
// - d = Duk ringan (huruf kecil = pukulan lebih ringan)
// - "." = jeda; huruf ganda dalam satu token (TT, DD, TD) = pukulan cepat
// - "D)" di awal baris rumus = pukulan pembuka, dipakai sekali di awalan
//   saja — di sini disimpan sebagai `pickup`, bukan bagian dari loop.
//
// Normalisasi pemutaran: setiap baris rumus dibentangkan merata dalam satu
// siklus bagian (tiap track menjaga jumlah langkahnya sendiri sesuai
// dokumen; track yang lebih rapat memang memainkan sub-divisi lebih rapat).

export type Hit = "D" | "T" | "d" | "t";

export interface Step {
  hit: Hit | null; // null = jeda
  fast: boolean; // berasal dari token huruf ganda (pukulan cepat)
}

export type SectionId = "dasar" | "naik" | "turun";

export interface SectionDef {
  id: SectionId;
  label: string;
}

export const SECTIONS: SectionDef[] = [
  { id: "dasar", label: "Dasar" },
  { id: "naik", label: "Naik" },
  { id: "turun", label: "Turun" },
];

export interface TrackDef {
  id: string;
  name: string;
  role: string;
  kind: "terbang" | "bass";
  /** Pukulan pembuka sekali jalan ("D)" di dokumen); null bila tidak ada. */
  pickup: Hit | null;
  /** String rumus mentah per bagian, persis seperti dokumen sumber. */
  sections: Record<SectionId, string>;
  source: string;
}

const RUMUS_BANJARI = 'Dokumen "Rumus Banjari" (Scribd)';
const NUQTHOH = 'Dokumen "Notasi Pukulan Banjari" — Nuqthoh Assirrul Jami\' (Scribd)';

export const TRACKS: TrackDef[] = [
  {
    id: "lanangan",
    name: "Terbang Lanangan",
    role: "Pukulan utama · nikahi",
    kind: "terbang",
    pickup: "D",
    sections: {
      dasar: ". TT DD D TT T D",
      naik: ". TT TT D TT T D",
      turun: ". DD TT D TT T D",
    },
    source: RUMUS_BANJARI,
  },
  {
    id: "wedokan",
    name: "Terbang Wedokan",
    role: "Sahutan · nganai",
    kind: "terbang",
    pickup: "D",
    sections: {
      dasar: "T T . DD D T . TD",
      naik: "T T . TT D T . TD",
      turun: "D D . TT D T . TD",
    },
    source: RUMUS_BANJARI,
  },
  {
    id: "golong-lanangan",
    name: "Nggolong Lanangan",
    role: "Penggolong · nikahi",
    kind: "terbang",
    pickup: "D",
    sections: {
      dasar: "T . D D D . T D",
      naik: "T . T T D . T D",
      turun: "D . T T D . T D",
    },
    source: RUMUS_BANJARI,
  },
  {
    id: "golong-wedokan",
    name: "Nggolong Wedokan",
    role: "Penggolong · nganai",
    kind: "terbang",
    pickup: "D",
    sections: {
      dasar: ". T . D D T . D",
      naik: ". T . T D T . D",
      turun: ". D . T D T . D",
    },
    source: RUMUS_BANJARI,
  },
  {
    id: "bass",
    name: "Bass",
    role: "Penjaga tempo",
    kind: "bass",
    pickup: null,
    sections: {
      dasar: "D . . D . d d . D",
      naik: "D . . D . d d . D",
      turun: "D . . D . d d . D",
    },
    source: NUQTHOH,
  },
];

const HIT_CHARS: Record<string, Hit> = { D: "D", T: "T", d: "d", t: "t" };

/**
 * Ubah string rumus (token dipisah spasi) menjadi daftar langkah.
 * Token "." = jeda; token 1 huruf = pukulan biasa; token ≥2 huruf =
 * pukulan cepat (tiap huruf satu langkah, fast=true).
 */
export function parseRumus(raw: string): Step[] {
  const tokens = raw.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) throw new Error("Rumus kosong");
  const steps: Step[] = [];
  for (const token of tokens) {
    if (token === ".") {
      steps.push({ hit: null, fast: false });
      continue;
    }
    const fast = token.length > 1;
    for (const ch of token) {
      const hit = HIT_CHARS[ch];
      if (!hit) throw new Error(`Simbol rumus tidak dikenal: "${ch}"`);
      steps.push({ hit, fast });
    }
  }
  return steps;
}

/** Langkah-langkah satu track pada satu bagian, sudah diparse. */
export function sectionSteps(track: TrackDef, section: SectionId): Step[] {
  return parseRumus(track.sections[section]);
}

// ---- Aturan murni pemutar (dipakai komponen React, dites terpisah) ----

/**
 * Apakah satu track berbunyi? Mute selalu menang; bila ada solo aktif,
 * hanya track yang di-solo (dan tidak di-mute) yang berbunyi.
 */
export function isTrackAudible(
  solo: ReadonlySet<string>,
  muted: ReadonlySet<string>,
  trackId: string
): boolean {
  if (muted.has(trackId)) return false;
  if (solo.size > 0) return solo.has(trackId);
  return true;
}

/** Urutan bagian pada mode "urutan penuh" dan siklus per bagiannya. */
export const URUTAN_ORDER: SectionId[] = ["dasar", "naik", "turun"];
export const URUTAN_CYCLES_PER_SECTION = 2;

export interface UrutanAdvance {
  section: SectionId;
  cycles: number;
  finished: boolean;
}

/**
 * Langkah progresi mode urutan setelah satu siklus selesai.
 * `cyclesDone` = jumlah siklus bagian `current` yang SUDAH selesai
 * (termasuk yang baru berakhir). Di bawah ambang → tetap; mencapai
 * ambang → pindah ke bagian berikut; bagian terakhir → finished.
 */
export function advanceUrutan(
  current: SectionId,
  cyclesDone: number
): UrutanAdvance {
  if (cyclesDone < URUTAN_CYCLES_PER_SECTION) {
    return { section: current, cycles: cyclesDone, finished: false };
  }
  const idx = URUTAN_ORDER.indexOf(current);
  if (idx >= URUTAN_ORDER.length - 1) {
    return { section: current, cycles: cyclesDone, finished: true };
  }
  return { section: URUTAN_ORDER[idx + 1], cycles: 0, finished: false };
}
