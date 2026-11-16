// Unit test Daily Inspiration picker (src/lib/daily-inspiration.ts).
// Dijalankan: node scripts/test-daily-inspiration.ts
import {
  buildDailyPool,
  dayOfYearWIB,
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

// blocks: null article: must be skipped, no throw.
const articleBlocksNull = articleRow({
  id: "c-null",
  title: "Artikel Tanpa Blocks",
  slug: "artikel-tanpa-blocks",
  blocks: null,
});

// Article with an empty sections array: must be skipped, no throw.
const articleEmptySections = articleRow({
  id: "c-empty",
  title: "Artikel Tanpa Section",
  slug: "artikel-tanpa-section",
  blocks: { sections: [] },
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

// Exact-item pins (spec formula: index = dayOfYearWIB % pool.length).
// 2026 is not a leap year: 2026-11-16 is day 320 (31+28+31+30+31+30+31+31+30+31+16),
// 320 % 3 = 2 -> pool3[2] (qamarun-sidnan-nabi).
// 2026-11-17 is day 321, 321 % 3 = 0 -> pool3[0] (lakum-busyro).
// Day 1 maps to index 1 (not 0) per the spec formula verbatim, not a bug.
ok(
  "2026-11-16 is day 320 of the year",
  dayOfYearWIB(new Date("2026-11-16T10:00:00+07:00")) === 320,
);
ok(
  "2026-11-16 (day 320, 320 % 3 = 2) picks pool3[2] qamarun-sidnan-nabi",
  pickNov16 === pool3[2],
);
ok(
  "2026-11-17 is day 321 of the year",
  dayOfYearWIB(new Date("2026-11-17T10:00:00+07:00")) === 321,
);
ok(
  "2026-11-17 (day 321, 321 % 3 = 0) picks pool3[0] lakum-busyro",
  pickNov17 === pool3[0],
);

// Leap-year day-of-year edges.
ok(
  "leap year: 2024-02-29 is day 60",
  dayOfYearWIB(new Date("2024-02-29T10:00:00+07:00")) === 60,
);
ok(
  "leap year: 2024-12-31 is day 366",
  dayOfYearWIB(new Date("2024-12-31T10:00:00+07:00")) === 366,
);
ok(
  "non-leap year: 2025-12-31 is day 365",
  dayOfYearWIB(new Date("2025-12-31T10:00:00+07:00")) === 365,
);

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

const poolWithNullAndEmpty = buildDailyPool([
  articleBlocksNull,
  articleEmptySections,
  articleQamarun,
]);
ok(
  "buildDailyPool skips blocks: null and empty-sections articles",
  poolWithNullAndEmpty.length === 1 &&
    poolWithNullAndEmpty[0].slug === "qamarun-sidnan-nabi",
);

console.log(`\n${passed} lulus, ${failed} gagal`);
process.exit(failed ? 1 : 0);
