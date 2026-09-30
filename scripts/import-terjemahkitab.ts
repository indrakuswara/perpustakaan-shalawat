// Importer sekali-jalan: Maulid Diba'i dari terjemahkitab.com -> draft artikel.
// Dijalankan: DATABASE_URL="<db>" node --experimental-strip-types scripts/import-terjemahkitab.ts
// Tanpa DATABASE_URL -> pakai .env lokal (SQLite, untuk dry-run).
// Artikel SELALU dibuat sebagai DRAFT (createContent memaksa DRAFT).
import {
  fetchDibaBlocks,
  DIBA_SOURCE_URL,
} from "../src/lib/import-terjemahkitab.ts";
import { blocksToPlainText } from "../src/lib/db-types.ts";

async function main() {
  console.log(`Mengambil ${DIBA_SOURCE_URL} ...`);
  const blocks = await fetchDibaBlocks();
  const total = blocks.sections.reduce((n, s) => n + s.units.length, 0);
  console.log(
    `Valid: ${blocks.sections.length} section, ${total} unit. ` +
      blocks.sections.map((s) => `${s.title}(${s.units.length})`).join(", "),
  );

  // DB: pakai facade (SQLite lokal bila DATABASE_URL file:, Postgres bila postgres://).
  if (!process.env.DATABASE_URL) {
    const { readFileSync } = await import("node:fs");
    const env = readFileSync(".env", "utf8");
    const m = env.match(/^DATABASE_URL=(.*)$/m);
    if (m) process.env.DATABASE_URL = m[1].trim().replace(/^"|"$/g, "");
  }
  const { createContent } = await import("../src/lib/db.ts");
  const row = await createContent({
    title: "Maulid Diba'i",
    type: "MAULID",
    description:
      "Maulid Ad-Diba'i lengkap dengan terjemah bahasa Indonesia. Sumber teks: terjemahkitab.com.",
    body: blocksToPlainText(blocks),
    blocks,
  });
  console.log(`DRAFT dibuat: id=${row.id} slug=${row.slug} status=${row.status}`);
}

main().catch((e) => {
  console.error("GAGAL:", e.message);
  process.exit(1);
});
