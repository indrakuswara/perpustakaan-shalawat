// Baca Juga: artikel se-kategori dengan yang sedang dibaca (spec 11.4).
// - Artikel yang sedang dibaca tidak pernah muncul.
// - Tanpa isi silang kategori: kategori yang hanya punya sedikit kandidat
//   mengembalikan sedikit itu saja.
// - Urutan terbaru dulu berdasarkan publishedAt (null paling akhir),
//   dipotong limit (bawaan 4). Urutan diurutkan di sini supaya tidak
//   bergantung pada urutan query DB.

import type { ContentRow } from "./db-types.ts";
import { parseDbDateTime } from "./db-types.ts";

export function pickRelated(
  articles: ContentRow[],
  currentSlug: string,
  limit = 4,
): ContentRow[] {
  const current = articles.find((a) => a.slug === currentSlug);
  if (!current) return [];
  const same = articles.filter(
    (a) => a.type === current.type && a.slug !== currentSlug,
  );
  same.sort((a, b) => {
    if (a.publishedAt === null && b.publishedAt === null) return 0;
    if (a.publishedAt === null) return 1;
    if (b.publishedAt === null) return -1;
    return (
      parseDbDateTime(b.publishedAt).getTime() -
      parseDbDateTime(a.publishedAt).getTime()
    );
  });
  return same.slice(0, limit);
}
