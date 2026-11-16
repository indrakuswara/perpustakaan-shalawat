// Unit test homepage photos and their recorded sources
// (public/images/*.jpg + public/images/SOURCES.md).
// Dijalankan: node scripts/test-images.ts
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
for (const f of FILES) {
  ok(
    `SOURCES.md records ${f} with source, license, and URL`,
    md.includes(f) &&
      /sumber|source/i.test(md) &&
      /lisensi|license/i.test(md) &&
      md.includes("http"),
  );
}

console.log("== Makna photo is not the Sheikh Zayed hero ==");

ok(
  "SOURCES.md row for makna-masjid.jpg does not mention sheikh zayed",
  !/makna-masjid\.jpg[^|]*sheikh zayed/i.test(md),
);

console.log(`\n${passed} lulus, ${failed} gagal`);
process.exit(failed ? 1 : 0);
