// Unit test TOC builder (src/lib/toc.ts).
// Dijalankan: node scripts/test-toc.ts
import { buildTocItems, countArabUnits } from "../src/lib/toc.ts";
import { sectionAnchorIds } from "../src/lib/db-types.ts";
import type { ArticleBlocks } from "../src/lib/db-types.ts";

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

const arabUnit = (id: string) => ({ id, arab: "يَا رَبِّ" });
const textUnit = (id: string) => ({ id, text: "Pengantar teks." });

// Qamarun: 1 section, 7 arab units.
const qamarunBlocks: ArticleBlocks = {
  sections: [
    {
      id: "s1",
      title: "Pembuka",
      units: Array.from({ length: 7 }, (_, i) => arabUnit(`u${i + 1}`)),
    },
  ],
};

// Dibai: 11 sections, 444 units total (10 x 40 + 44), built programmatically.
const dibaiBlocks: ArticleBlocks = {
  sections: Array.from({ length: 11 }, (_, si) => ({
    id: `s${si + 1}`,
    title: `Bagian ${si + 1}`,
    units: Array.from({ length: si < 10 ? 40 : 44 }, (_, ui) =>
      arabUnit(`u${si + 1}-${ui + 1}`),
    ),
  })),
};

// 1 section, 1 unit.
const oneUnitBlocks: ArticleBlocks = {
  sections: [{ id: "s1", title: "Pembuka", units: [arabUnit("u1")] }],
};

// 1 section: text-only intro unit followed by 2 arab units.
const blocksWithTextIntro: ArticleBlocks = {
  sections: [
    {
      id: "s1",
      title: "Pembuka",
      units: [textUnit("u1"), arabUnit("u2"), arabUnit("u3")],
    },
  ],
};

// Locked rule: total units > 30 only because of text-only units still
// gives kind "bagian" (threshold counts ALL units, bait list lists arab only).
// 2 sections, 31 units total (29 text-only + 2 arab).
const blocksManyTextUnits: ArticleBlocks = {
  sections: [
    {
      id: "s1",
      title: "Pengantar",
      units: [
        ...Array.from({ length: 29 }, (_, i) => textUnit(`t${i + 1}`)),
        arabUnit("u1"),
      ],
    },
    { id: "s2", title: "Penutup", units: [arabUnit("u2")] },
  ],
};

// 1 section, 31 arab units: > 30 total units so kind "bagian", but only
// 1 section, so the built list has exactly 1 item -> kind "none".
const oneSectionManyUnitsBlocks: ArticleBlocks = {
  sections: [
    {
      id: "s1",
      title: "Pembuka",
      units: Array.from({ length: 31 }, (_, i) => arabUnit(`u${i + 1}`)),
    },
  ],
};

// 2 sections x 2 arab units: bait numbering must continue across the
// section boundary (bait-1..bait-4 in order).
const twoSectionBaitBlocks: ArticleBlocks = {
  sections: [
    {
      id: "s1",
      title: "Bagian 1",
      units: [arabUnit("u1"), arabUnit("u2")],
    },
    {
      id: "s2",
      title: "Bagian 2",
      units: [arabUnit("u3"), arabUnit("u4")],
    },
  ],
};

console.log("== buildTocItems ==");

ok(
  "Qamarun (1 section, 7 arab units) returns 7 bait items",
  (() => {
    const r = buildTocItems(qamarunBlocks);
    return (
      r.kind === "bait" &&
      r.items.length === 7 &&
      r.items[0].id === "bait-1" &&
      r.items[0].label === "Bait 1" &&
      r.items[6].id === "bait-7" &&
      r.items[6].label === "Bait 7"
    );
  })(),
);

ok(
  "Dibai (444 units) returns section items",
  (() => {
    const r = buildTocItems(dibaiBlocks);
    return (
      r.kind === "bagian" && r.items.length === dibaiBlocks.sections.length
    );
  })(),
);

ok(
  "Dibai bagian ids match sectionAnchorIds exactly and labels match section titles",
  (() => {
    const r = buildTocItems(dibaiBlocks);
    const anchors = sectionAnchorIds(dibaiBlocks);
    return (
      r.kind === "bagian" &&
      r.items.length === anchors.length &&
      r.items.every(
        (item, i) =>
          item.id === anchors[i] &&
          item.label === dibaiBlocks.sections[i].title,
      )
    );
  })(),
);

ok(
  "text-heavy article bagian ids match sectionAnchorIds and labels match titles",
  (() => {
    const r = buildTocItems(blocksManyTextUnits);
    const anchors = sectionAnchorIds(blocksManyTextUnits);
    return (
      r.kind === "bagian" &&
      r.items.length === anchors.length &&
      r.items.every(
        (item, i) =>
          item.id === anchors[i] &&
          item.label === blocksManyTextUnits.sections[i].title,
      )
    );
  })(),
);

ok(
  "1 section, 1 unit returns none (panel hidden)",
  buildTocItems(oneUnitBlocks).kind === "none" &&
    buildTocItems(oneUnitBlocks).items.length === 0,
);

ok(
  "1 section with 31 units returns none (exactly 1 bagian item)",
  (() => {
    const r = buildTocItems(oneSectionManyUnitsBlocks);
    return r.kind === "none" && r.items.length === 0;
  })(),
);

ok(
  "bait numbering continues across sections (2 sections x 2 units)",
  (() => {
    const r = buildTocItems(twoSectionBaitBlocks);
    return (
      r.kind === "bait" &&
      r.items.length === 4 &&
      r.items[0].id === "bait-1" &&
      r.items[0].label === "Bait 1" &&
      r.items[1].id === "bait-2" &&
      r.items[2].id === "bait-3" &&
      r.items[2].label === "Bait 3" &&
      r.items[3].id === "bait-4" &&
      r.items[3].label === "Bait 4"
    );
  })(),
);

ok(
  "text-only intro unit is not numbered and not in the TOC",
  (() => {
    const r = buildTocItems(blocksWithTextIntro);
    return (
      r.kind === "bait" &&
      r.items.length === 2 &&
      r.items[0].id === "bait-1" &&
      r.items[1].id === "bait-2" &&
      countArabUnits(blocksWithTextIntro) === 2
    );
  })(),
);

ok(
  "total units > 30 from text-only units still gives kind bagian",
  (() => {
    const r = buildTocItems(blocksManyTextUnits);
    return (
      r.kind === "bagian" &&
      r.items.length === 2 &&
      countArabUnits(blocksManyTextUnits) === 2
    );
  })(),
);

console.log(`\n${passed} lulus, ${failed} gagal`);
process.exit(failed ? 1 : 0);
