// Unit test design tokens and font wiring (src/app/globals.css,
// src/app/layout.tsx, src/app/(site)/layout.tsx).
// Dijalankan: node --experimental-strip-types scripts/test-tokens.ts
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
const rootLayout = readFileSync("src/app/layout.tsx", "utf8");
const siteLayout = readFileSync("src/app/(site)/layout.tsx", "utf8");

console.log("== design tokens (:root) ==");

// Semua 20 token, nilai hex persis sesuai spec section 4.
const tokens: Array<[string, string]> = [
  ["--bg", "#e6f0e8"],
  ["--card", "#ffffff"],
  ["--panel", "#f4faf5"],
  ["--line", "#cfe3d3"],
  ["--emerald-950", "#03362a"],
  ["--emerald-900", "#064e3b"],
  ["--emerald-800", "#0a5c46"],
  ["--emerald-700", "#0e6e54"],
  ["--gold", "#cfa52f"],
  ["--gold-soft", "#e3c566"],
  ["--gold-deep", "#7d6010"],
  ["--emas-tua", "#7a5c14"],
  ["--ink", "#171717"],
  ["--latin", "#0b4f3f"],
  ["--english", "#3d4a43"],
  ["--label", "#4a554e"],
  ["--muted", "#5c665f"],
  ["--placeholder", "#6b7367"],
  ["--on-dark", "#f4faf5"],
  ["--on-dark-muted", "#d7e6dc"],
];

for (const [name, hex] of tokens) {
  ok(`tokens: :root defines ${name} ${hex}`, css.includes(`${name}: ${hex}`));
}

console.log("== font mappings (@theme inline) ==");

const fontMappings: Array<[string, string]> = [
  ["--font-display", "--font-marcellus"],
  ["--font-sans", "--font-public-sans"],
  ["--font-serif", "--font-source-serif"],
  ["--font-arab", "--font-arab"],
];

for (const [utility, variable] of fontMappings) {
  ok(
    `tokens: @theme inline maps ${utility} to var(${variable})`,
    css.includes(`${utility}: var(${variable})`),
  );
}

console.log("== font loading (src/app/layout.tsx) ==");

// [import, konstanta, variabel] untuk keempat font next/font/google.
const fonts: Array<[string, string, string]> = [
  ["Marcellus", "marcellus", "--font-marcellus"],
  ["Public_Sans", "publicSans", "--font-public-sans"],
  ["Source_Serif_4", "sourceSerif", "--font-source-serif"],
  ["Amiri", "amiri", "--font-arab"],
];

for (const [importName, , variable] of fonts) {
  ok(
    `fonts: ${importName} imported from next/font/google with variable ${variable}`,
    rootLayout.includes(`import { Marcellus, Public_Sans, Source_Serif_4, Amiri } from "next/font/google"`) &&
      rootLayout.includes(`${importName}({`) &&
      rootLayout.includes(`variable: "${variable}"`),
  );
}

// Variabel font harus menempel di <html>, bukan di tempat lain.
const htmlTag = rootLayout.match(/<html[\s\S]*?>/)?.[0] ?? "";
for (const [, constName, variable] of fonts) {
  ok(
    `fonts: <html> className carries ${variable}`,
    htmlTag.includes(`${constName}.variable`),
  );
}

console.log("== font scoping (src/app/(site)/layout.tsx) ==");

const outerDivClass =
  siteLayout.match(/<div className="([^"]*)"/)?.[1] ?? "";
ok(
  "fonts: (site) layout outer wrapper div carries font-sans",
  outerDivClass.split(" ").includes("font-sans"),
);

console.log("== removed values are gone ==");

// Variabel lama, Geist, dan blok dark-mode: tidak boleh muncul lagi.
const removedFromCss = [
  "--background",
  "--foreground",
  "Geist",
  "font-geist",
  "prefers-color-scheme",
];
for (const banned of removedFromCss) {
  ok(`removed: globals.css has no ${banned}`, !css.includes(banned));
}

const removedFromRootLayout = ["Geist", "font-geist", "prefers-color-scheme"];
for (const banned of removedFromRootLayout) {
  ok(`removed: layout.tsx has no ${banned}`, !rootLayout.includes(banned));
}

ok(
  "removed: (site)/layout.tsx has no font-geist",
  !siteLayout.includes("font-geist"),
);

console.log("== print tokens (globals.css + PrintView.tsx) ==");

const printView = readFileSync("src/components/site/PrintView.tsx", "utf8");
ok(
  "print: .print-card border uses var(--line)",
  css.includes("border: 1px solid var(--line)"),
);
ok(
  "print: .print-card left border uses the emerald token",
  css.includes("border-left: 4px solid var(--emerald-900)"),
);
ok("print: globals.css has no #e9e4d8", !css.includes("#e9e4d8"));
ok("print: PrintView has no #0b3d2e", !printView.includes("#0b3d2e"));
ok("print: PrintView has no #e7d9ae", !printView.includes("#e7d9ae"));
ok("print: PrintView has no teal-", !printView.includes("teal-"));

console.log(`\n${passed} lulus, ${failed} gagal`);
process.exit(failed ? 1 : 0);
