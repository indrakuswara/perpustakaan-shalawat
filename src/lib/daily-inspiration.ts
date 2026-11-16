// Daily Inspiration picker (spec 11.1).
// Pool = bait pembuka tiap artikel PUBLISHED yang punya blocks: unit
// pertama yang punya teks Arab (dipindai berurutan dari section pertama).
// Pemilihan: index = hariKeTahun(tanggal WIB) mod jumlahPool.
import type { ContentRow } from "./db-types.ts";

export type DailyPoolItem = {
  slug: string;
  arab: string;
  latin?: string;
  translation?: string;
  english?: string;
};

export function buildDailyPool(articles: ContentRow[]): DailyPoolItem[] {
  const pool: DailyPoolItem[] = [];
  for (const article of articles) {
    if (article.status !== "PUBLISHED" || !article.blocks) continue;
    let found: DailyPoolItem | null = null;
    for (const section of article.blocks.sections) {
      for (const unit of section.units) {
        if (!unit.arab) continue;
        const item: DailyPoolItem = { slug: article.slug, arab: unit.arab };
        if (unit.latin) item.latin = unit.latin;
        if (unit.translation) item.translation = unit.translation;
        if (unit.english) item.english = unit.english;
        found = item;
        break;
      }
      if (found) break;
    }
    if (found) pool.push(found);
  }
  pool.sort((a, b) => (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0));
  return pool;
}

const WIB_PARTS = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Jakarta",
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

// Hari ke-tahun (1-366) dari tanggal kalender Asia/Jakarta untuk
// instant yang diberikan.
export function dayOfYearWIB(date: Date): number {
  const parts = WIB_PARTS.formatToParts(date);
  const year = Number(parts.find((p) => p.type === "year")?.value);
  const month = Number(parts.find((p) => p.type === "month")?.value);
  const day = Number(parts.find((p) => p.type === "day")?.value);
  const startOfYear = Date.UTC(year, 0, 1);
  const thisDay = Date.UTC(year, month - 1, day);
  return Math.round((thisDay - startOfYear) / 86_400_000) + 1;
}

export function pickDailyInspiration(
  pool: DailyPoolItem[],
  date: Date,
): DailyPoolItem | null {
  if (pool.length === 0) return null;
  return pool[dayOfYearWIB(date) % pool.length];
}
