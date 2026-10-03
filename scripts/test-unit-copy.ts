// Unit test formatUnitForCopy (src/lib/unit-copy.ts).
// Dijalankan: node --experimental-strip-types scripts/test-unit-copy.ts
import { formatUnitForCopy } from "../src/lib/unit-copy.ts";
import type { ArticleUnit } from "../src/lib/db-types.ts";

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

const unit = (partial: Partial<ArticleUnit>): ArticleUnit => ({
  id: "u1",
  ...partial,
});

console.log("== formatUnitForCopy ==");

ok(
  "lengkap 4 lapis: urutan arab, latin, Artinya, English",
  formatUnitForCopy(
    unit({
      arab: "يَا رَبِّ",
      latin: "Yâ Rabbi",
      translation: "Ya Rabbi",
      english: "O my Lord",
    }),
  ) === "يَا رَبِّ\nYâ Rabbi\nYa Rabbi\nO my Lord",
);

ok(
  "tanpa latin: tidak ada baris kosong di tengah",
  formatUnitForCopy(
    unit({ arab: "يَا رَبِّ", translation: "Ya Rabbi", english: "O my Lord" }),
  ) === "يَا رَبِّ\nYa Rabbi\nO my Lord",
);

ok(
  "tanpa english: tidak ada label English",
  formatUnitForCopy(
    unit({ arab: "يَا رَبِّ", latin: "Yâ Rabbi", translation: "Ya Rabbi" }),
  ) === "يَا رَبِّ\nYâ Rabbi\nYa Rabbi",
);

ok(
  "tanpa latin & english (kasus Diba'i): arab + Artinya saja",
  formatUnitForCopy(unit({ arab: "يَا رَبِّ", translation: "Ya Rabbi" })) ===
    "يَا رَبِّ\nYa Rabbi",
);

ok(
  "text-only: teks apa adanya tanpa label",
  formatUnitForCopy(unit({ text: "Sebuah kalimat pengantar." })) ===
    "Sebuah kalimat pengantar.",
);

ok(
  "field whitespace-only dianggap kosong",
  formatUnitForCopy(
    unit({ arab: "يَا رَبِّ", latin: "   ", translation: "Ya Rabbi", english: "  " }),
  ) === "يَا رَبِّ\nYa Rabbi",
);

ok(
  "translation kosong tapi english terisi: tidak ada label Artinya yatim",
  formatUnitForCopy(unit({ arab: "يَا رَبِّ", english: "O my Lord" })) ===
    "يَا رَبِّ\nO my Lord",
);

ok(
  "nilai field di-trim dalam hasil copy",
  formatUnitForCopy(
    unit({ arab: "  يَا رَبِّ  ", translation: "  Ya Rabbi  " }),
  ) === "يَا رَبِّ\nYa Rabbi",
);

ok(
  "text ikut setelah english bila keduanya ada",
  formatUnitForCopy(
    unit({ arab: "يَا رَبِّ", english: "O my Lord", text: "Catatan." }),
  ) === "يَا رَبِّ\nO my Lord\nCatatan.",
);

ok(
  "lima lapis lengkap: urutan arab, latin, Artinya, English, text",
  formatUnitForCopy(
    unit({
      arab: "يَا رَبِّ",
      latin: "Yâ Rabbi",
      translation: "Ya Rabbi",
      english: "O my Lord",
      text: "Catatan.",
    }),
  ) === "يَا رَبِّ\nYâ Rabbi\nYa Rabbi\nO my Lord\nCatatan.",
);

console.log(`\n${passed} lulus, ${failed} gagal`);
process.exit(failed ? 1 : 0);
