// Unit test related-articles picker (src/lib/related.ts).
// Dijalankan: node scripts/test-related.ts
import { pickRelated } from "../src/lib/related.ts";
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

// 3 published MAULID rows with distinct publishedAt values.
const maulidList3: ContentRow[] = [
  articleRow({
    id: "m1",
    title: "Maulid Dibai",
    slug: "maulid-dibai",
    type: "MAULID",
    publishedAt: "2026-11-01T00:00:00.000Z",
  }),
  articleRow({
    id: "m2",
    title: "Maulid Simtudduror",
    slug: "maulid-simtudduror",
    type: "MAULID",
    publishedAt: "2026-11-03T00:00:00.000Z",
  }),
  articleRow({
    id: "m3",
    title: "Maulid Adh-Dhiya",
    slug: "maulid-adh-dhiya",
    type: "MAULID",
    publishedAt: "2026-11-02T00:00:00.000Z",
  }),
];

// Mixed list containing qad-kafani (SHALAWAT) plus other types.
const list: ContentRow[] = [
  articleRow({
    id: "c-qad",
    title: "Qad Kafani",
    slug: "qad-kafani",
    type: "SHALAWAT",
    publishedAt: "2026-11-01T00:00:00.000Z",
  }),
  articleRow({
    id: "c-qamarun",
    title: "Qamarun Sidnan Nabi",
    slug: "qamarun-sidnan-nabi",
    type: "SHALAWAT",
    publishedAt: "2026-11-05T00:00:00.000Z",
  }),
  articleRow({
    id: "c-lakum",
    title: "Lakum Busyro",
    slug: "lakum-busyro",
    type: "SHALAWAT",
    publishedAt: "2026-11-04T00:00:00.000Z",
  }),
  articleRow({
    id: "c-dibai",
    title: "Maulid Dibai",
    slug: "maulid-dibai",
    type: "MAULID",
    publishedAt: "2026-11-06T00:00:00.000Z",
  }),
];

// 6 published SHALAWAT rows with distinct publishedAt values (s6 newest).
const sixShalawat: ContentRow[] = Array.from({ length: 6 }, (_, i) => {
  const n = i + 1;
  return articleRow({
    id: `s${n}`,
    title: `Shalawat ${n}`,
    slug: `s${n}`,
    type: "SHALAWAT",
    publishedAt: `2026-11-0${n}T00:00:00.000Z`,
  });
});

console.log("== pickRelated ==");

ok(
  "Maulid with 2 other candidates returns exactly 2",
  (() => {
    const out = pickRelated(maulidList3, "maulid-dibai");
    return out.length === 2 && out.every((a) => a.type === "MAULID");
  })(),
);

ok(
  "Maulid candidates come back newest first",
  (() => {
    const out = pickRelated(maulidList3, "maulid-dibai");
    return (
      out.length === 2 &&
      out[0].slug === "maulid-simtudduror" &&
      out[1].slug === "maulid-adh-dhiya"
    );
  })(),
);

ok(
  "current article never appears",
  (() => {
    const out = pickRelated(list, "qad-kafani");
    return (
      !out.some((a) => a.slug === "qad-kafani") &&
      out.every((a) => a.type === "SHALAWAT")
    );
  })(),
);

ok(
  "empty category returns [] (panel hidden)",
  pickRelated([], "x").length === 0,
);

ok(
  "current article absent from the list returns []",
  pickRelated(maulidList3, "tidak-ada").length === 0,
);

ok(
  "limit 4 is respected",
  (() => {
    const out = pickRelated(sixShalawat, "s1");
    return (
      out.length === 4 &&
      out[0].slug === "s6" &&
      out[1].slug === "s5" &&
      out[2].slug === "s4" &&
      out[3].slug === "s3"
    );
  })(),
);

ok(
  "null publishedAt sorts last",
  (() => {
    const withNull: ContentRow[] = [
      ...sixShalawat,
      articleRow({
        id: "s7",
        title: "Shalawat 7",
        slug: "s7",
        type: "SHALAWAT",
        publishedAt: null,
      }),
    ];
    const out = pickRelated(withNull, "s1");
    return out.length === 4 && out[3].slug !== "s7" && !out.some((a) => a.slug === "s7");
  })(),
);

console.log(`\n${passed} lulus, ${failed} gagal`);
process.exit(failed ? 1 : 0);
