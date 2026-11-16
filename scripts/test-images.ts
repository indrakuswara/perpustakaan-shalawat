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
// Tabel SOURCES.md di-parse sebagai tabel, bukan dicocokkan per baris
// mentah: header dipetakan ke indeks kolom, lalu tiap baris data dipecah
// jadi sel dan provenance dicek per sel. Baris yang kehilangan sumber,
// lisensi, atau URL-nya sendiri tidak bisa bersembunyi di balik intro
// atau baris lain, dan perubahan urutan kolom tidak merusak cek ini.
function splitRow(line: string): string[] {
  return line
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());
}
const headerIdx = lines.findIndex((line) => line.startsWith("| File |"));
const header = headerIdx >= 0 ? splitRow(lines[headerIdx]) : [];
function colIndex(name: string): number {
  return header.findIndex((cell) =>
    cell.toLowerCase().includes(name.toLowerCase()),
  );
}
const COL = {
  file: colIndex("File"),
  source: colIndex("Sumber"),
  license: colIndex("Lisensi"),
  url: colIndex("URL"),
  notes: colIndex("Keterangan"),
};
ok(
  "SOURCES.md has a table header with File/Source/License/URL/Notes columns",
  headerIdx >= 0 &&
    COL.file >= 0 &&
    COL.source >= 0 &&
    COL.license >= 0 &&
    COL.url >= 0 &&
    COL.notes >= 0,
);
function rowFor(f: string): string[] | undefined {
  const line = lines.find((l) => {
    if (!l.startsWith("|")) return false;
    return splitRow(l)[COL.file] === f;
  });
  return line === undefined ? undefined : splitRow(line);
}
function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}
for (const f of FILES) {
  const row = rowFor(f);
  ok(`SOURCES.md records ${f}`, row !== undefined);
  ok(
    `SOURCES.md records ${f} with source Pexels`,
    row?.[COL.source] === "Pexels",
  );
  ok(
    `SOURCES.md records ${f} with license Pexels License`,
    row?.[COL.license] === "Pexels License",
  );
  ok(
    `SOURCES.md records ${f} with an https URL`,
    isHttpsUrl(row?.[COL.url] ?? ""),
  );
}

console.log("== Makna photo is not the Sheikh Zayed hero ==");

// Sel Keterangan baris Makna, bukan seluruh baris: nama masjid
// tercatat di sel itu.
const maknaNotes = rowFor("makna-masjid.jpg")?.[COL.notes] ?? "";
ok(
  "SOURCES.md row for makna-masjid.jpg does not mention sheikh zayed",
  !/sheikh zayed/i.test(maknaNotes),
);
ok(
  "SOURCES.md row for makna-masjid.jpg names a different mosque (Masjid Biru)",
  /masjid biru|blue mosque/i.test(maknaNotes),
);

console.log(`\n${passed} lulus, ${failed} gagal`);
process.exit(failed ? 1 : 0);
