// Unit test Daily Inspiration picker (src/lib/daily-inspiration.ts).
// Dijalankan: node scripts/test-daily-inspiration.ts
import {
  buildDailyPool,
  pickDailyInspiration,
} from "../src/lib/daily-inspiration.ts";
import type { DailyPoolItem } from "../src/lib/daily-inspiration.ts";
import type { ContentRow } from "../src/lib/db-types.ts";

let passed = 0;
let failed = 0;
function ok(name: string, cond: boolean) {
  if (cond) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.log(`  ✗ ${name}`);
  }
}

const pool3: DailyPoolItem[] = [
  { slug: "lakum-busyro", arab: "لَكُمْ بُشْرَى" },
  { slug: "qad-kafani", arab: "قَدْ كَفَانِي" },
  { slug: "qamarun-sidnan-nabi", arab: "قَمَرٌ سَيِّدُنَا النَّبِي" },
];

const pool1: DailyPoolItem[] = [
  { slug: "qad-kafani", arab: "قَدْ كَفَانِي" },
];

function articleRow(partial: Partial<ContentRow>): ContentRow {
  return {
    id: "c1",
    title: "Artikel",
    slug: "artikel",
    type: "SHALAWAT",
    description: null,
    body: "",
    status: "PUBLISHED",
    createdAt: "2026-11-01T00:00:00.000Z",
    updatedAt: "2026-11-01T00:00:00.000Z",
    publishedAt: "2026-11-01T00:00:00.000Z",
    blocks: null,
    ...partial,
  };
}

// First section starts with a text-only unit, then an arab unit.
const articleQamarun = articleRow({
  id: "c-qamarun",
  title: "Qamarun Sidnan Nabi",
  slug: "qamarun-sidnan-nabi",
  blocks: {
    sections: [
      {
        id: "s1",
        title: "Pembuka",
        units: [
          { id: "u1", text: "Pengantar sebelum bait pertama." },
          {
            id: "u2",
            arab: "قَمَرٌ سَيِّدُنَا النَّبِي",
            latin: "Qamarun Sidnan Nabi",
            translation: "Bulan, junjungan kita Nabi",
          },
        ],
      },
    ],
  },
});

// No arab unit at all, so it must be skipped from the pool.
const articleWithTextIntro = articleRow({
  id: "c-intro",
  title: "Artikel Pengantar Saja",
  slug: "artikel-pengantar-saja",
  blocks: {
    sections: [
      {
        id: "s1",
        title: "Pembuka",
        units: [
          { id: "u1", text: "Hanya pengantar teks." },
          { id: "u2", latin: "Tanpa arab sama sekali" },
        ],
      },
    ],
  },
});

// Draft article with an arab unit: must not enter the pool.
const articleDraft = articleRow({
  id: "c-draft",
  title: "Draf Belum Terbit",
  slug: "draf-belum-terbit",
  status: "DRAFT",
  publishedAt: null,
  blocks: {
    sections: [
      {
        id: "s1",
        title: "Pembuka",
        units: [{ id: "u1", arab: "قَدْ كَفَانِي" }],
      },
    ],
  },
});

console.log("== pickDailyInspiration ==");

const sameDay = new Date("2026-11-16T10:00:00+07:00");
ok(
  "same date returns the same bait",
  pickDailyInspiration(pool3, sameDay) === pickDailyInspiration(pool3, sameDay),
);

const pickNov16 = pickDailyInspiration(pool3, new Date("2026-11-16T10:00:00+07:00"));
const pickNov17 = pickDailyInspiration(pool3, new Date("2026-11-17T10:00:00+07:00"));
ok("consecutive dates shift the pick", pickNov16 !== pickNov17);

ok(
  "pool of 1 always returns that item",
  pickDailyInspiration(pool1, new Date("2026-11-16T10:00:00+07:00")) ===
    pool1[0],
);

ok(
  "empty pool returns null",
  pickDailyInspiration([], new Date()) === null,
);

// 2026-11-16T17:00:00Z is 2026-11-17 00:00 WIB, still 16 Nov in UTC.
const pickUtcLate = pickDailyInspiration(pool3, new Date("2026-11-16T17:00:00.000Z"));
const pickWibNextDay = pickDailyInspiration(pool3, new Date("2026-11-17T10:00:00+07:00"));
const pickWibSameUtcDay = pickDailyInspiration(pool3, new Date("2026-11-16T10:00:00+07:00"));
ok(
  "UTC instant picks by the WIB calendar date, not the UTC date",
  pickUtcLate === pickWibNextDay && pickUtcLate !== pickWibSameUtcDay,
);

console.log("== buildDailyPool ==");

const poolFromFixtures = buildDailyPool([articleWithTextIntro, articleQamarun]);
ok(
  "buildDailyPool skips text-only first units and sorts by slug",
  poolFromFixtures.length === 1 &&
    poolFromFixtures[0].slug === "qamarun-sidnan-nabi" &&
    poolFromFixtures[0].arab.length > 0 &&
    poolFromFixtures[0].latin === "Qamarun Sidnan Nabi" &&
    poolFromFixtures[0].translation === "Bulan, junjungan kita Nabi",
);

const poolWithoutDraft = buildDailyPool([articleDraft, articleQamarun]);
ok(
  "buildDailyPool skips draft articles",
  poolWithoutDraft.length === 1 && poolWithoutDraft[0].slug === "qamarun-sidnan-nabi",
);

console.log(`\n${passed} lulus, ${failed} gagal`);
process.exit(failed ? 1 : 0);
