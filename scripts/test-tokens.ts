// Unit test design tokens (src/app/globals.css).
// Dijalankan: node scripts/test-tokens.ts
import { readFileSync } from "node:fs";

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

const css = readFileSync("src/app/globals.css", "utf8");

console.log("== design tokens ==");

ok(
  "tokens: :root defines --bg #e6f0e8, --gold-deep #7d6010, --emas-tua #7a5c14",
  css.includes("--bg: #e6f0e8") &&
    css.includes("--gold-deep: #7d6010") &&
    css.includes("--emas-tua: #7a5c14"),
);

ok(
  "tokens: banned values are gone",
  !css.includes("#0f766e") &&
    !css.includes("#334155") &&
    !css.includes("#e4d9bf") &&
    !css.includes("prefers-color-scheme"),
);

ok(
  "tokens: @theme inline maps --font-display to Marcellus and --font-serif to Source Serif 4",
  css.includes("--font-display: var(--font-marcellus)") &&
    css.includes("--font-serif: var(--font-source-serif)"),
);

console.log(`\n${passed} lulus, ${failed} gagal`);
process.exit(failed ? 1 : 0);
