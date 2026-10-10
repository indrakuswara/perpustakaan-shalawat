// Unit test model cetak (src/lib/print-model.ts).
// Dijalankan: node scripts/test-print-model.ts
import { buildPrintModel } from "../src/lib/print-model.ts";
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

const blocks: ArticleBlocks = {
  sections: [
    {
      id: "s1",
      title: "Pembuka",
      units: [
        { id: "u1", arab: "بِسْمِ الله", latin: "Bismillah", translation: "Dengan nama Allah", english: "In the name of Allah" },
        { id: "u2", arab: "  الحَمْدُ لِلَّه  ", latin: "", translation: "Segala puji bagi Allah" },
      ],
    },
    {
      id: "s2",
      title: "Penutup",
      units: [{ id: "u3", text: "Catatan penutup." }],
    },
  ],
};

const m1 = buildPrintModel({ blocks, body: "diabaikan" });
ok("blocks ada -> sections terpetakan", m1.sections.length === 2);
ok("blocks ada -> paragraphs kosong", m1.paragraphs.length === 0);
ok("judul section terjaga", m1.sections[0].title === "Pembuka");
ok("unit utuh 4 lapis", (() => { const u = m1.sections[0].units[0]; return u.arab === "بِسْمِ الله" && u.latin === "Bismillah" && u.translation === "Dengan nama Allah" && u.english === "In the name of Allah"; })());
ok("lapis di-trim & lapis kosong dibuang", (() => { const u = m1.sections[0].units[1]; return u.arab === "الحَمْدُ لِلَّه" && u.latin === undefined && u.translation === "Segala puji bagi Allah" && u.english === undefined; })());
ok("unit text polos ikut", m1.sections[1].units[0].text === "Catatan penutup.");

const withEmpty: ArticleBlocks = {
  sections: [
    { id: "s1", title: "Hampa", units: [{ id: "u1", arab: "   " }, { id: "u2" }] },
    { id: "s2", title: "Isi", units: [{ id: "u3", arab: "نَصّ" }] },
  ],
};
const m2 = buildPrintModel({ blocks: withEmpty, body: "" });
ok("unit hampa dibuang & section hampa dibuang", m2.sections.length === 1 && m2.sections[0].title === "Isi");

const m3 = buildPrintModel({ blocks: null, body: "Paragraf satu.\nBaris kedua.\n\nParagraf dua.\n\n\n  Paragraf tiga.  " });
ok("tanpa blocks -> sections kosong", m3.sections.length === 0);
ok("body terpecah per paragraf (baris tunggal tetap menyatu)", m3.paragraphs.length === 3 && m3.paragraphs[0] === "Paragraf satu.\nBaris kedua." && m3.paragraphs[2] === "Paragraf tiga.");

const m4 = buildPrintModel({ blocks: null, body: "   " });
ok("body kosong -> paragraphs kosong", m4.paragraphs.length === 0);

const m5 = buildPrintModel({ blocks: { sections: [] }, body: "Cadangan body." });
ok("blocks tanpa section -> fallback ke body", m5.sections.length === 0 && m5.paragraphs.length === 1);

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
