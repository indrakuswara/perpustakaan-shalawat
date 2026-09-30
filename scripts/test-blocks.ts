// Unit test tipe + validator article blocks (db-types.ts).
// Dijalankan: node --experimental-strip-types scripts/test-blocks.ts
import {
  parseBlocks,
  blocksToPlainText,
  sectionAnchorIds,
  type ArticleBlocks,
} from "../src/lib/db-types.ts";

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

function throws(name: string, fn: () => unknown) {
  let threw = false;
  let msg = "";
  try {
    fn();
  } catch (e) {
    threw = true;
    msg = e instanceof Error ? e.message : "";
  }
  ok(name, threw && msg.length > 0);
}

console.log("== parseBlocks: valid ==");

// Contoh 1: Header + Ayat + Latin + Terjemah
const contoh1 = {
  sections: [
    {
      id: "s1",
      title: "Niat dan Hadiah Fatihah",
      units: [
        {
          id: "u1",
          arab: "نَوَيْنَا قِرَاءَةَ الْمَوْلِدِ",
          latin: "Nawainâ qirâ'atal-maulid",
          translation: "Saya berniat membaca maulid",
        },
      ],
    },
  ],
};
const b1 = parseBlocks(contoh1);
ok("contoh 1 (arab+latin+terjemah) valid", b1.sections.length === 1);
ok("contoh 1: field terbaca", b1.sections[0].units[0].latin === "Nawainâ qirâ'atal-maulid");

// Contoh 2: Header + Kalimat (teks biasa saja)
const b2 = parseBlocks({
  sections: [{ id: "s1", title: "Pengantar", units: [{ id: "u1", text: "Sebuah kalimat pengantar." }] }],
});
ok("contoh 2 (teks saja) valid", b2.sections[0].units[0].text === "Sebuah kalimat pengantar.");

// Contoh 3: Header + Ayat + Terjemah (tanpa latin)
const b3 = parseBlocks({
  sections: [
    {
      id: "s1",
      title: "Shalawat",
      units: [{ id: "u1", arab: "يَارَبِّ صَلِّ عَلَى مُحَمَّدْ", translation: "Ya Rabbi, limpahkan shalawat" }],
    },
  ],
});
ok(
  "contoh 3 (arab+terjemah) valid",
  b3.sections[0].units[0].arab === "يَارَبِّ صَلِّ عَلَى مُحَمَّدْ" &&
    b3.sections[0].units[0].latin === undefined,
);

console.log("== parseBlocks: invalid -> throw ==");
throws("sections kosong ditolak", () => parseBlocks({ sections: [] }));
throws("sections bukan array ditolak", () => parseBlocks({ sections: "x" }));
throws("judul section kosong ditolak", () =>
  parseBlocks({ sections: [{ id: "s1", title: "   ", units: [{ id: "u1", text: "x" }] }] }),
);
throws("unit tanpa field terisi ditolak", () =>
  parseBlocks({ sections: [{ id: "s1", title: "A", units: [{ id: "u1" }] }] }),
);
throws("arab bukan string ditolak", () =>
  parseBlocks({ sections: [{ id: "s1", title: "A", units: [{ id: "u1", arab: 123 }] }] }),
);
throws("raw bukan object ditolak (string)", () => parseBlocks("bukan-object"));
throws("raw bukan object ditolak (null)", () => parseBlocks(null));
throws("raw bukan object ditolak (array)", () => parseBlocks([]));
throws("units kosong ditolak", () =>
  parseBlocks({ sections: [{ id: "s1", title: "A", units: [] }] }),
);

console.log("== parseBlocks: toleransi ==");
// Field tak dikenal diabaikan, bukan crash
const toleran = parseBlocks({
  sections: [
    {
      id: "s1",
      title: "A",
      units: [{ id: "u1", text: "x", foo: "bar", audio: 42 }],
      extra: true,
    },
  ],
  version: 99,
});
ok(
  "field tak dikenal diabaikan",
  (toleran.sections[0].units[0] as unknown as Record<string, unknown>).foo === undefined &&
    toleran.sections[0].units[0].text === "x",
);
// String kosong / whitespace dianggap tidak terisi
throws("field hanya whitespace dianggap kosong", () =>
  parseBlocks({ sections: [{ id: "s1", title: "A", units: [{ id: "u1", arab: "   " }] }] }),
);
const trimOk = parseBlocks({
  sections: [{ id: "s1", title: "A", units: [{ id: "u1", arab: "  teks  " }] }],
});
ok("field di-trim", trimOk.sections[0].units[0].arab === "teks");

console.log("== blocksToPlainText ==");
const blocksUrutan: ArticleBlocks = {
  sections: [
    {
      id: "s1",
      title: "Bagian 1",
      units: [
        { id: "u1", arab: "ARAB1", latin: "LATIN1", translation: "TERJEMAH1" },
        { id: "u2", text: "TEKS2" },
      ],
    },
    {
      id: "s2",
      title: "Bagian 2",
      units: [{ id: "u3", arab: "ARAB3", translation: "TERJEMAH3" }],
    },
  ],
};
ok(
  "urutan field & pemisah antar unit benar",
  blocksToPlainText(blocksUrutan) === "ARAB1\nLATIN1\nTERJEMAH1\n\nTEKS2\n\nARAB3\nTERJEMAH3",
);
ok(
  "blocks valid minimal -> plain text non-kosong",
  blocksToPlainText(b2).trim().length > 0,
);

console.log("== sectionAnchorIds ==");
ok(
  "judul duplikat dapat suffix -2, -3",
  JSON.stringify(
    sectionAnchorIds({
      sections: [
        { id: "a", title: "Niat", units: [{ id: "u1", text: "x" }] },
        { id: "b", title: "Niat", units: [{ id: "u1", text: "x" }] },
        { id: "c", title: "Niat", units: [{ id: "u1", text: "x" }] },
      ],
    }),
  ) === JSON.stringify(["bagian-niat", "bagian-niat-2", "bagian-niat-3"]),
);
ok(
  "judul berbeda -> anchor berbeda",
  JSON.stringify(
    sectionAnchorIds({
      sections: [
        { id: "a", title: "Niat dan Hadiah Fatihah", units: [{ id: "u1", text: "x" }] },
        { id: "b", title: "Ya Rabbi Shalli", units: [{ id: "u1", text: "x" }] },
      ],
    }),
  ) === JSON.stringify(["bagian-niat-dan-hadiah-fatihah", "bagian-ya-rabbi-shalli"]),
);
ok(
  "judul Arab murni -> anchor fallback bagian-{index}",
  JSON.stringify(
    sectionAnchorIds({
      sections: [
        { id: "a", title: "مَوْلِدُ الدِّيْبَعِيِّ", units: [{ id: "u1", text: "x" }] },
        { id: "b", title: "Niat", units: [{ id: "u1", text: "x" }] },
        { id: "c", title: "يَا رَبِّ صَلِّ", units: [{ id: "u1", text: "x" }] },
      ],
    }),
  ) === JSON.stringify(["bagian-1", "bagian-niat", "bagian-3"]),
);
ok(
  "fallback tidak tabrakan dengan slug normal",
  JSON.stringify(
    sectionAnchorIds({
      sections: [
        { id: "a", title: "2", units: [{ id: "u1", text: "x" }] },
        { id: "b", title: "مَوْلِد", units: [{ id: "u1", text: "x" }] },
      ],
    }),
  ) === JSON.stringify(["bagian-2", "bagian-2-2"]),
);
ok(
  "collision silang antar judul tetap unik",
  JSON.stringify(
    sectionAnchorIds({
      sections: [
        { id: "a", title: "Niat-2", units: [{ id: "u1", text: "x" }] },
        { id: "b", title: "Niat", units: [{ id: "u1", text: "x" }] },
        { id: "c", title: "Niat", units: [{ id: "u1", text: "x" }] },
      ],
    }),
  ) === JSON.stringify(["bagian-niat-2", "bagian-niat", "bagian-niat-3"]),
);

console.log(`\n${passed} lulus, ${failed} gagal`);
process.exit(failed ? 1 : 0);
