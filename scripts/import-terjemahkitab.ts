// Importer sekali-jalan: maulid dari terjemahkitab.com -> draft artikel.
// Dijalankan: node --experimental-strip-types scripts/import-terjemahkitab.ts [diba|simtudduror|adhiya]
// Tanpa DATABASE_URL -> pakai .env lokal (SQLite, untuk dry-run).
// Artikel SELALU dibuat sebagai DRAFT (createContent memaksa DRAFT).
import {
  fetchDibaBlocks,
  fetchSimtuddurorBlocks,
  fetchAdhiyaUlamiBlocks,
  DIBA_SOURCE_URL,
  SIMTUDDUROR_SOURCE_URL,
  ADHIYA_ULAMI_SOURCE_URL,
} from "../src/lib/import-terjemahkitab.ts";
import { blocksToPlainText } from "../src/lib/db-types.ts";

const TARGETS = {
  diba: {
    sourceUrl: DIBA_SOURCE_URL,
    fetch: fetchDibaBlocks,
    title: "Maulid Diba'i",
    type: "MAULID" as const,
    description:
      "Maulid Ad-Diba'i lengkap dengan terjemah bahasa Indonesia. Sumber teks: terjemahkitab.com.",
  },
  simtudduror: {
    sourceUrl: SIMTUDDUROR_SOURCE_URL,
    fetch: fetchSimtuddurorBlocks,
    title: "Maulid Simtudduror",
    type: "MAULID" as const,
    description:
      "Maulid Simtudduror (Simthud Durar) karya Habib Ali bin Muhammad Al-Habsyi, " +
      "lengkap dengan terjemah bahasa Indonesia. Sumber teks: terjemahkitab.com.",
  },
  adhiya: {
    sourceUrl: ADHIYA_ULAMI_SOURCE_URL,
    fetch: fetchAdhiyaUlamiBlocks,
    title: "Maulid Adh-Dhiya'ul Lami'",
    type: "MAULID" as const,
    description:
      "Maulid Adh-Dhiya'ul Lami' (الضياء اللامع) karya Habib Umar bin Muhammad bin Hafidz, " +
      "lengkap dengan teks Arab, Latin, dan terjemah bahasa Indonesia. Sumber teks: salawat.com.",
  },
};

async function main() {
  const arg = process.argv[2] ?? "diba";
  const target = TARGETS[arg as keyof typeof TARGETS];
  if (!target) {
    console.error(
      `Target tidak dikenal: ${arg} (pilih: diba | simtudduror | adhiya)`,
    );
    process.exit(1);
  }

  console.log(`Mengambil ${target.sourceUrl} ...`);
  const blocks = await target.fetch();
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
    title: target.title,
    type: target.type,
    description: target.description,
    body: blocksToPlainText(blocks),
    blocks,
  });
  console.log(`DRAFT dibuat: id=${row.id} slug=${row.slug} status=${row.status}`);
}

main().catch((e) => {
  console.error("GAGAL:", e.message);
  process.exit(1);
});
