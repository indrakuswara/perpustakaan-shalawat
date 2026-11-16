// Unit test homepage metadata equality: src/app/(home)/layout.tsx dan
// src/app/(site)/layout.tsx harus mendefinisikan metadata yang SAMA
// (title + description). Homepage pindah ke route group (home) hanya
// untuk varian header dark, bukan untuk metadata berbeda.
// Dijalankan: node --experimental-strip-types scripts/test-metadata.ts
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

// Nilai metadata homepage yang berlaku (judul/deskripsi situs).
const EXPECTED = {
  titleDefault: "Perpustakaan Digital Shalawat & Maulid",
  titleTemplate: "%s | Perpustakaan Shalawat",
  description:
    "Baca shalawat dan maulid gratis: Arab, Latin, terjemahan Indonesia, dan English, plus unduh PDF.",
};

function metadataOf(path: string) {
  const src = readFileSync(path, "utf8");
  return {
    titleDefault: src.match(/default:\s*"([^"]*)"/)?.[1],
    titleTemplate: src.match(/template:\s*"([^"]*)"/)?.[1],
    description: src.match(/description:\s*"([^"]*)"/)?.[1],
  };
}

const home = metadataOf("src/app/(home)/layout.tsx");
const site = metadataOf("src/app/(site)/layout.tsx");

console.log("== homepage metadata is defined in both layouts ==");

for (const [label, value] of [
  ["(home) title.default", home.titleDefault],
  ["(home) title.template", home.titleTemplate],
  ["(home) description", home.description],
  ["(site) title.default", site.titleDefault],
  ["(site) title.template", site.titleTemplate],
  ["(site) description", site.description],
] as const) {
  ok(`metadata: ${label} is defined`, value !== undefined);
}

console.log("== (home) and (site) metadata are equal ==");

ok(
  "metadata: title.default is the same in (home) and (site)",
  home.titleDefault === site.titleDefault,
);
ok(
  "metadata: title.template is the same in (home) and (site)",
  home.titleTemplate === site.titleTemplate,
);
ok(
  "metadata: description is the same in (home) and (site)",
  home.description === site.description,
);

console.log("== shared values match the site metadata ==");

ok(
  "metadata: title.default is Perpustakaan Digital Shalawat & Maulid",
  home.titleDefault === EXPECTED.titleDefault,
);
ok(
  "metadata: title.template is %s | Perpustakaan Shalawat",
  home.titleTemplate === EXPECTED.titleTemplate,
);
ok(
  "metadata: description matches the site description",
  home.description === EXPECTED.description,
);

console.log(`\n${passed} lulus, ${failed} gagal`);
process.exit(failed ? 1 : 0);
