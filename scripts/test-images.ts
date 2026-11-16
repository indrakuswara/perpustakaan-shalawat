// Unit test homepage photos and their recorded sources
// (public/images/*.jpg + public/images/SOURCES.md).
// Dijalankan: node --experimental-strip-types scripts/test-images.ts
import { existsSync, readFileSync } from "node:fs";

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

const FILES = [
  "hero-sheikh-zayed.jpg",
  "koleksi-dibai.jpg",
  "koleksi-simtudduror.jpg",
  "koleksi-qad-kafani.jpg",
  "koleksi-lakum-busyro.jpg",
  "makna-masjid.jpg",
];

console.log("== homepage photos exist ==");

for (const f of FILES) {
  ok(`photo exists: public/images/${f}`, existsSync(`public/images/${f}`));
}

console.log("== SOURCES.md records source, license, and URL ==");

const md = readFileSync("public/images/SOURCES.md", "utf8");
const lines = md.split(/\r?\n/);
// Table row for a file: the line starting with `| <filename> | ...`
// Provenance is checked within THAT row only, so a row missing its own
// source, license, or URL cannot hide behind the intro or other rows.
function rowFor(f: string): string | undefined {
  return lines.find((line) => line.startsWith(`| ${f} |`));
}
for (const f of FILES) {
  const row = rowFor(f);
  ok(
    `SOURCES.md records ${f} with source, license, and URL`,
    row !== undefined &&
      row.includes("Pexels") &&
      row.includes("Pexels License") &&
      row.includes("http"),
  );
}

console.log("== Makna photo is not the Sheikh Zayed hero ==");

// Whole Makna table line, not just the filename cell: the old regex
// stopped at the first `|` after the filename, so it could never match
// a wrong mosque name in the description cell.
const maknaRow = rowFor("makna-masjid.jpg") ?? "";
ok(
  "SOURCES.md row for makna-masjid.jpg does not mention sheikh zayed",
  !/sheikh zayed/i.test(maknaRow),
);
ok(
  "SOURCES.md row for makna-masjid.jpg names a different mosque (Masjid Biru)",
  /masjid biru|blue mosque/i.test(maknaRow),
);

console.log(`\n${passed} lulus, ${failed} gagal`);
process.exit(failed ? 1 : 0);
