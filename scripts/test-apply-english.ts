// Unit test applyEnglishToBlocks (src/lib/apply-english.ts).
// Dijalankan: node --experimental-strip-types scripts/test-apply-english.ts
import { applyEnglishToBlocks } from "../src/lib/apply-english.ts";
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
function throws(name: string, fn: () => unknown) {
  try {
    fn();
    ok(name, false);
  } catch {
    ok(name, true);
  }
}

function sample(): ArticleBlocks {
  return {
    sections: [
      {
        id: "s1",
        title: "Satu",
        units: [
          { id: "u1", arab: "أ", translation: "a" },
          { id: "u2", arab: "ب", translation: "b" },
        ],
      },
      {
        id: "s2",
        title: "Dua",
        units: [{ id: "u3", text: "teks saja" }],
      },
    ],
  };
}

// 1. English terpasang sesuai posisi section/unit.
{
  const out = applyEnglishToBlocks(sample(), [["A-en", "B-en"], ["T-en"]]);
  ok("unit 1 english terisi", out.sections[0].units[0].english === "A-en");
  ok("unit 2 english terisi", out.sections[0].units[1].english === "B-en");
  ok("unit text-only bisa diisi", out.sections[1].units[0].english === "T-en");
  ok("field lain utuh", out.sections[0].units[0].arab === "أ");
  ok("id unit utuh", out.sections[0].units[0].id === "u1");
}

// 2. String kosong / whitespace = sengaja kosong: english TIDAK dipasang.
{
  const out = applyEnglishToBlocks(sample(), [["", "  "], ["x"]]);
  ok("kosong -> english undefined", out.sections[0].units[0].english === undefined);
  ok("whitespace -> english undefined", out.sections[0].units[1].english === undefined);
  ok("yang terisi tetap terisi", out.sections[1].units[0].english === "x");
}

// 3. Nilai di-trim sebelum disimpan.
{
  const out = applyEnglishToBlocks(sample(), [["  A-en  ", "B"], ["C"]]);
  ok("english di-trim", out.sections[0].units[0].english === "A-en");
}

// 4. Input tidak dimutasi.
{
  const input = sample();
  applyEnglishToBlocks(input, [["A", "B"], ["C"]]);
  ok("input tidak berubah", input.sections[0].units[0].english === undefined);
}

// 5. Jumlah section tidak cocok -> throw.
throws("section kurang -> throw", () =>
  applyEnglishToBlocks(sample(), [["A", "B"]]),
);
throws("section lebih -> throw", () =>
  applyEnglishToBlocks(sample(), [["A", "B"], ["C"], ["D"]]),
);

// 6. Jumlah unit per section tidak cocok -> throw.
throws("unit kurang -> throw", () =>
  applyEnglishToBlocks(sample(), [["A"], ["C"]]),
);
throws("unit lebih -> throw", () =>
  applyEnglishToBlocks(sample(), [["A", "B", "X"], ["C"]]),
);

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
