// Unit test search JUDUL SAJA (searchPublishedContents):
// query hanya boleh cocok di judul artikel, TIDAK di deskripsi atau
// isi bait. Mengunci perilaku sesudah perubahan dari pencarian
// judul + deskripsi + isi.
// Dijalankan: node scripts/test-search-title-only.ts
// (SQLite: file DB temp; Postgres: pg-mem.)
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import nodePath from "node:path";
import { newDb } from "pg-mem";

// Backend SQLite membaca DATABASE_URL secara lazy di getDb().
process.env.DATABASE_URL = `file:${nodePath.join(mkdtempSync(nodePath.join(tmpdir(), "perpustakaan-search-")), "test.db")}`;

import * as sqliteBackend from "../src/lib/db-sqlite.ts";
import * as pgBackend from "../src/lib/db-pg.ts";
import { setPoolForTests } from "../src/lib/db-pg.ts";

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

type ContentInput = {
  title: string;
  type: "SHALAWAT" | "MAULID";
  description?: string;
  body: string;
};

type SearchFn = (
  query: string,
  type?: "SHALAWAT" | "MAULID",
) =>
  | Promise<{ id: string; title: string; type: string }[]>
  | { id: string; title: string; type: string }[];

// Fixture meniru data live: "rabbi" hanya ada di ISI bait Huwannur,
// Yaa Imamarrusli, dan Maulid Adh-Dhiya'ul Lami' (bukan di judul);
// "kitab maulid" hanya ada di DESKRIPSI Shalawat Nariyah.
async function checkBackend(
  label: string,
  create: (input: ContentInput) => Promise<{ id: string }> | { id: string },
  publish: (id: string) => Promise<unknown> | unknown,
  search: SearchFn,
) {
  const ids: string[] = [];
  const add = async (input: ContentInput) => {
    const row = await create(input);
    ids.push(row.id);
    return row;
  };
  const huwannur = await add({
    title: "Huwannur",
    type: "SHALAWAT",
    description: "Shalawat pujian",
    body: "Ya rabbi salli 'ala Muhammad wa 'ala alihi",
  });
  await add({
    title: "Yaa Imamarrusli",
    type: "SHALAWAT",
    body: "Ya rabbi ballighna maqashidana",
  });
  await add({
    title: "Maulid Adh-Dhiya'ul Lami'",
    type: "MAULID",
    body: "Ya rabbi salli 'ala Muhammad",
  });
  await add({
    title: "Maulid Simtudduror",
    type: "MAULID",
    body: "Ya Robbi salli 'ala Muhammad",
  });
  await add({
    title: "Maulid Diba'",
    type: "MAULID",
    body: "Allahumma salli 'ala sayyidina Muhammad",
  });
  await add({
    title: "Shalawat Nariyah",
    type: "SHALAWAT",
    description: "Kitab maulid pilihan",
    body: "Allahumma sholli sholatan kamilah",
  });
  // Draft: judulnya mengandung "badar", tapi belum terbit.
  const draft = await create({
    title: "Shalawat Badar",
    type: "SHALAWAT",
    body: "Sholatullah salamullah",
  });
  // Terbitkan semua kecuali draft.
  for (const id of ids) await publish(id);
  void draft;

  // Kata yang HANYA ada di isi bait -> 0 hasil.
  ok(
    `${label}: "rabbi" (isi bait saja) -> 0 hasil`,
    (await search("rabbi")).length === 0,
  );
  // Kata yang HANYA ada di deskripsi -> 0 hasil.
  ok(
    `${label}: "kitab" (deskripsi saja) -> 0 hasil`,
    (await search("kitab")).length === 0,
  );
  ok(
    `${label}: "kitab maulid" (deskripsi saja) -> 0 hasil`,
    (await search("kitab maulid")).length === 0,
  );
  // Kata yang cocok di judul -> ketemu, dan hanya yang judulnya cocok.
  const byTitle = await search("huwannur");
  ok(
    `${label}: "huwannur" (judul) -> Huwannur`,
    byTitle.length === 1 && byTitle[0].id === huwannur.id,
  );
  ok(
    `${label}: "HUWANNUR" tetap cocok (case-insensitive)`,
    (await search("HUWANNUR")).length === 1,
  );
  const bySub = await search("dhiya");
  ok(
    `${label}: "dhiya" (substring judul) -> 1 hasil`,
    bySub.length === 1 && bySub[0].title === "Maulid Adh-Dhiya'ul Lami'",
  );
  const maulid = await search("maulid");
  ok(
    `${label}: "maulid" -> 3 artikel maulid (bukan 4 via deskripsi Nariyah)`,
    maulid.length === 3 && maulid.every((r) => r.type === "MAULID"),
  );
  // Filter type tetap jalan di atas pencarian judul saja.
  ok(
    `${label}: "maulid" + filter SHALAWAT -> 0 hasil`,
    (await search("maulid", "SHALAWAT")).length === 0,
  );
  ok(
    `${label}: "maulid" + filter MAULID -> 3 hasil`,
    (await search("maulid", "MAULID")).length === 3,
  );
  // Draft tetap tidak muncul walau judulnya cocok.
  ok(
    `${label}: "badar" (judul draft) -> 0 hasil`,
    (await search("badar")).length === 0,
  );
  // Query kosong tetap -> [].
  ok(
    `${label}: query kosong -> []`,
    (await search("  ")).length === 0,
  );
}

console.log("== SQLite ==");
await checkBackend(
  "sqlite",
  (input) => sqliteBackend.createContent(input),
  (id) => sqliteBackend.publishContent(id),
  (query, type) => sqliteBackend.searchPublishedContents(query, type),
);

console.log("== Postgres (pg-mem) ==");
{
  const mem = newDb();
  const pg = mem.adapters.createPg();
  const pool = new pg.Pool();
  setPoolForTests(pool as never);
  await checkBackend(
    "pg",
    (input) => pgBackend.createContent(input),
    (id) => pgBackend.publishContent(id),
    (query, type) => pgBackend.searchPublishedContents(query, type),
  );
}

console.log(`\n${passed} lulus, ${failed} gagal`);
process.exit(failed ? 1 : 0);
