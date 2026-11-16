// Daftar isi halaman baca: daftar lompat bait atau bagian (spec 11.2, 8.8).
// - Total unit <= 30 -> kind "bait": satu item per unit ber-Arab, dinomori
//   global 1-based dalam urutan section/unit, id "bait-<n>".
// - Total unit > 30 -> kind "bagian": satu item per section, id dari
//   sectionAnchorIds (agar cocok dengan anchor kartu bagian).
// - Ambang 30 menghitung SEMUA unit (arab + text-only), tapi daftar bait
//   hanya berisi unit ber-Arab.
// - Daftar yang hasilnya tepat 1 item -> kind "none" (panel disembunyikan).

import type { ArticleBlocks } from "./db-types.ts";
import { sectionAnchorIds } from "./db-types.ts";

export type TocItem = { id: string; label: string };
export type TocResult = { kind: "bait" | "bagian" | "none"; items: TocItem[] };

export function countArabUnits(blocks: ArticleBlocks): number {
  let n = 0;
  for (const s of blocks.sections) {
    for (const u of s.units) {
      if (u.arab) n++;
    }
  }
  return n;
}

export function buildTocItems(blocks: ArticleBlocks): TocResult {
  const totalUnits = blocks.sections.reduce(
    (n, s) => n + s.units.length,
    0,
  );
  let kind: "bait" | "bagian";
  let items: TocItem[];
  if (totalUnits <= 30) {
    kind = "bait";
    items = [];
    let n = 0;
    for (const s of blocks.sections) {
      for (const u of s.units) {
        if (!u.arab) continue;
        n++;
        items.push({ id: `bait-${n}`, label: `Bait ${n}` });
      }
    }
  } else {
    kind = "bagian";
    const anchors = sectionAnchorIds(blocks);
    items = blocks.sections.map((s, i) => ({
      id: anchors[i],
      label: s.title,
    }));
  }
  if (items.length === 1) return { kind: "none", items: [] };
  return { kind, items };
}
