import type { ArticleUnit, ContentRow } from "./db-types.ts";
import { parseDbDateTime } from "./db-types.ts";

// Bentuk jawaban artikel publik, dipakai route GET /articles/[slug].
// Bentuk ini DIKUNCI oleh kontrak Pact ReaderWeb (repo contract-testing-pact):
// consumer hanya butuh nama field + tipe ini, dan verifier Pact memutar
// ulang kontrak itu ke endpoint ini tiap deploy production. Jangan rename
// atau hapus field tanpa memperbarui kontraknya dulu.
//
// - units = seluruh unit dari semua section blok, diratakan sesuai urutan.
//   Unit hanya membawa field yang memang terisi; field yang tidak ada
//   TIDAK diarang jadi string kosong, supaya jawaban tetap jujur.
// - description null -> string kosong: kontrak menuntut string, dan
//   artikel published tanpa deskripsi tetap harus lolos tipe.
// - publishedAt null -> createdAt, keduanya null -> string kosong:
//   kontrak menuntut string ISO dan route tidak boleh jadi 500 karena
//   satu tanggal hilang.
// - PRASYARAT DATA (bukan jaminan kode): kontrak menuntut tiap unit
//   membawa string arab, latin, translation, english, dan units minimal
//   1. Untuk state kontrak (qad-kafani) ini TERBUKTI dari HTML halaman
//   baca production 2026-11-04: 21 unit arab dan masing-masing 21 unit
//   latin, terjemahan, english. Kalau data itu berubah (mis. unit baru
//   tanpa english), verifikasi production GAGAL dengan benar, dan itu
//   temuan kontrak, bukan bug mapper: mapper sengaja tidak mengarang
//   field yang tidak ada dan tidak menyembunyikan unit yang tidak
//   lengkap.

export interface ArticleApiUnit {
  id: string;
  arab?: string;
  latin?: string;
  translation?: string;
  english?: string;
  text?: string;
}

export interface ArticleApiResponse {
  id: string;
  title: string;
  slug: string;
  type: string;
  description: string;
  status: string;
  publishedAt: string;
  units: ArticleApiUnit[];
}

function toApiUnit(u: ArticleUnit): ArticleApiUnit {
  const unit: ArticleApiUnit = { id: u.id };
  if (u.arab != null) unit.arab = u.arab;
  if (u.latin != null) unit.latin = u.latin;
  if (u.translation != null) unit.translation = u.translation;
  if (u.english != null) unit.english = u.english;
  if (u.text != null) unit.text = u.text;
  return unit;
}

export function toArticleApiResponse(row: ContentRow): ArticleApiResponse {
  const units = row.blocks
    ? row.blocks.sections.flatMap((s) => s.units.map(toApiUnit))
    : [];
  const stamp = row.publishedAt ?? row.createdAt;
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    type: row.type,
    description: row.description ?? "",
    status: row.status,
    publishedAt: stamp ? parseDbDateTime(stamp).toISOString() : "",
    units,
  };
}

// Keputusan route yang bisa dites murni: null = artikel tidak ada atau
// tidak published -> 404 dengan body yang dikunci kontrak. Route handler
// tinggal meneruskan hasil ini ke NextResponse.json, sehingga perilaku
// 404 terbukti di tes unit, bukan hanya di curl manual.
export type ArticleApiResult =
  | { status: 200; body: ArticleApiResponse }
  | { status: 404; body: { error: string } };

export function toArticleApiResult(row: ContentRow | null): ArticleApiResult {
  if (!row) return { status: 404, body: { error: "Article not found" } };
  return { status: 200, body: toArticleApiResponse(row) };
}
