// Logika murni fitur Request Shalawat & Maulid (tanpa login).
// Spec: docs/specs/2026-10-21-fitur-request-tanpa-login-design.md
// File ini TIDAK menyentuh DB/rangkaian — semua fungsi deterministik
// dan diuji di scripts/test-requests.ts. Urusan simpan/baca antrian
// ada di backend DB (db-sqlite.ts / db-pg.ts lewat facade db.ts).

import { createHash } from "node:crypto";

export type RequestKind = "shalawat" | "maulid";
export type RequestStatus = "baru" | "selesai" | "ditolak";

// --- Normalisasi & pencocokan judul (spec §5) ---

// Samakan bentuk judul supaya perbandingan adil: huruf kecil, aksen
// dilucuti, apostrof hilang tanpa memecah kata ("Diba'i" -> "dibai"),
// tanda baca lain jadi pemisah kata, spasi dirapikan.
export function normalizeTitle(raw: string): string {
  return raw
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Cocok bila (judul-judul SUDAH ternormalisasi):
// - persis sama, atau
// - yang lebih pendek muncul utuh di yang lebih panjang pada batas kata
//   (bukan sekadar potongan di tengah kata: "sim" TIDAK cocok dengan
//   "simtudduror"), atau
// - seluruh kata judul yang lebih pendek muncul sebagai kata utuh di
//   judul yang lebih panjang (menoleransi beda urutan kata).
export function titlesMatch(a: string, b: string): boolean {
  if (!a || !b) return false;
  if (a === b) return true;
  const [shorter, longer] = a.length <= b.length ? [a, b] : [b, a];
  if (` ${longer} `.includes(` ${shorter} `)) return true;
  const longerWords = new Set(longer.split(" "));
  return shorter.split(" ").every((w) => longerWords.has(w));
}

export interface PublishedTitleRef {
  title: string;
  slug: string;
}

// Saring artikel terbit yang judulnya cocok dengan judul request
// (mentah, belum ternormalisasi). Maksimal 3 hasil, urutan mengikuti
// daftar masukan.
export function findMatchingArticles(
  rawRequestTitle: string,
  published: PublishedTitleRef[],
): PublishedTitleRef[] {
  const norm = normalizeTitle(rawRequestTitle);
  if (!norm) return [];
  return published
    .filter((p) => titlesMatch(norm, normalizeTitle(p.title)))
    .slice(0, 3);
}

// --- Validasi form (spec §7) ---

export interface RequestInputValue {
  name: string;
  title: string;
  note: string | null;
}

export interface RequestValidation {
  ok: boolean;
  errors: { name?: string; title?: string; note?: string };
  value: RequestInputValue;
}

export function validateRequestInput(raw: {
  name?: unknown;
  title?: unknown;
  note?: unknown;
}): RequestValidation {
  const name = String(raw.name ?? "").trim();
  const title = String(raw.title ?? "").trim();
  const noteTrimmed = String(raw.note ?? "").trim();
  const errors: RequestValidation["errors"] = {};
  if (name.length < 2 || name.length > 40)
    errors.name = "Nama panggilan wajib diisi (2–40 karakter).";
  if (title.length < 3 || title.length > 120)
    errors.title = "Judul wajib diisi (3–120 karakter).";
  if (noteTrimmed.length > 500)
    errors.note = "Keterangan maksimal 500 karakter.";
  return {
    ok: Object.keys(errors).length === 0,
    errors,
    value: { name, title, note: noteTrimmed ? noteTrimmed : null },
  };
}

// --- Batas kirim per IP (spec §7) ---

export const RATE_LIMIT_MAX = 5;
export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

// true bila jumlah hit di dalam jendela 1 jam terakhir sudah mencapai
// batas. Murni atas daftar timestamp (ms) — pengambilan datanya urusan
// lapisan DB.
export function isRateLimited(hitTimestampsMs: number[], nowMs: number): boolean {
  const from = nowMs - RATE_LIMIT_WINDOW_MS;
  const count = hitTimestampsMs.filter((t) => t > from && t <= nowMs).length;
  return count >= RATE_LIMIT_MAX;
}

// IP mentah tidak pernah disimpan; yang dicatat hanya hash SHA-256-nya
// untuk menghitung batas kirim.
export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

// Honeypot anti-bot (spec §7): kolom "website" disembunyikan dari
// manusia. Terisi (sesudah trim tidak kosong) = kiriman bot -> action
// menampilkannya sebagai sukses tapi tidak menyimpan apa pun dan
// tidak menghitungnya ke batas kirim.
export function isHoneypotTriggered(raw: unknown): boolean {
  return String(raw ?? "").trim() !== "";
}
