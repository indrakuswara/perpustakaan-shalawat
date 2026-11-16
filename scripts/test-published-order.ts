// Unit test urutan "Terbaru" (temuan audit A1, 31 Okt 2026):
// listPublishedContents dengan order "published" harus mengurutkan dari
// published_at DESC — bukan updated_at. Skenario kunci: artikel yang
// diterbitkan lebih dulu tapi diedit belakangan TIDAK boleh mengalahkan
// artikel yang diterbitkan belakangan.
// Dijalankan: node scripts/test-published-order.ts
// (SQLite: file DB temp; Postgres: pg-mem.)
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import nodePath from "node:path";
import { newDb } from "pg-mem";

// Backend SQLite membaca DATABASE_URL secara lazy di getDb().
process.env.DATABASE_URL = `file:${nodePath.join(mkdtempSync(nodePath.join(tmpdir(), "req-order-")), "app.db")}`;

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

// Skenario: A diterbitkan 2020 tapi diedit 2026; B diterbitkan 2021,
// tidak pernah diedit sesudahnya. Urutan "published" yang benar: B, A.
async function checkBackend(
  label: string,
  create: (title: string) => Promise<{ id: string }> | { id: string },
  publish: (id: string) => Promise<unknown> | unknown,
  stamp: (id: string, publishedAt: string, updatedAt: string) => Promise<unknown> | unknown,
  list: (order?: "updated" | "published") => Promise<{ title: string }[]> | { title: string }[],
) {
  const a = await create("Artikel Lama Diedit");
  const b = await create("Artikel Baru Terbit");
  await publish(a.id);
  await publish(b.id);
  await stamp(a.id, "2020-01-01 00:00:00", "2026-01-01 00:00:00");
  await stamp(b.id, "2021-01-01 00:00:00", "2019-01-01 00:00:00");
  const byUpdated = (await list()).map((r) => r.title);
  const byPublished = (await list("published")).map((r) => r.title);
  ok(
    `${label}: urutan default tetap updated_at (A dulu)`,
    byUpdated[0] === "Artikel Lama Diedit",
  );
  ok(
    `${label}: urutan published menaruh B dulu`,
    byPublished[0] === "Artikel Baru Terbit" &&
      byPublished[1] === "Artikel Lama Diedit",
  );
}

console.log("== SQLite ==");
{
  const db = sqliteBackend.getDb();
  await checkBackend(
    "sqlite",
    (title) => sqliteBackend.createContent({ title, type: "SHALAWAT", body: "isi" }),
    (id) => sqliteBackend.publishContent(id),
    (id, publishedAt, updatedAt) =>
      db.prepare("UPDATE contents SET published_at = ?, updated_at = ? WHERE id = ?").run(publishedAt, updatedAt, id),
    (order) => sqliteBackend.listPublishedContents(undefined, order),
  );
  // Jalur yang dipakai beranda beneran adalah facade (db.ts), bukan
  // backend langsung — jadi urutan "published" diuji lewat facade juga.
  // Dynamic import SETELAH env di-set: facade memilih backend sekali
  // saat modul dimuat.
  const facade = await import("../src/lib/db.ts");
  const facadeOrder = (
    await facade.listPublishedContents(undefined, "published")
  ).map((r) => r.title);
  ok(
    "facade: urutan published menaruh B dulu",
    facadeOrder[0] === "Artikel Baru Terbit" &&
      facadeOrder[1] === "Artikel Lama Diedit",
  );
  await checkTieBreak(
    "sqlite",
    (title) => sqliteBackend.createContent({ title, type: "SHALAWAT", body: "isi" }),
    (id) => sqliteBackend.publishContent(id),
    (id, publishedAt, updatedAt) =>
      db.prepare("UPDATE contents SET published_at = ?, updated_at = ? WHERE id = ?").run(publishedAt, updatedAt, id),
    (order) => sqliteBackend.listPublishedContents(undefined, order),
    (id) => sqliteBackend.deleteContent(id),
  );
}

console.log("== Postgres (pg-mem) ==");
{
  const mem = newDb();
  const pg = mem.adapters.createPg();
  const pool = new pg.Pool();
  setPoolForTests(pool as never);
  await checkBackend(
    "pg",
    (title) => pgBackend.createContent({ title, type: "SHALAWAT", body: "isi" }),
    (id) => pgBackend.publishContent(id),
    (id, publishedAt, updatedAt) =>
      pool.query("UPDATE contents SET published_at = $1, updated_at = $2 WHERE id = $3", [publishedAt, updatedAt, id]),
    (order) => pgBackend.listPublishedContents(undefined, order),
  );
  await checkTieBreak(
    "pg",
    (title) => pgBackend.createContent({ title, type: "SHALAWAT", body: "isi" }),
    (id) => pgBackend.publishContent(id),
    (id, publishedAt, updatedAt) =>
      pool.query("UPDATE contents SET published_at = $1, updated_at = $2 WHERE id = $3", [publishedAt, updatedAt, id]),
    (order) => pgBackend.listPublishedContents(undefined, order),
    (id) => pgBackend.deleteContent(id),
  );
}

// Skenario tie-break (follow-up redesign, Nov 2026): dua artikel terbit
// dengan published_at yang SAMA PERSIS. Tanpa kunci sekunder, ORDER BY
// tidak deterministik: /search dan "Terbaru" beranda bisa menampilkan
// urutan berbeda (flake e2e "empty search shows all published articles").
// Kunci sekunder = id DESC, jadi urutan selalu stabil dan sama di kedua
// backend.
async function checkTieBreak(
  label: string,
  create: (title: string) => Promise<{ id: string }> | { id: string },
  publish: (id: string) => Promise<unknown> | unknown,
  stamp: (id: string, publishedAt: string, updatedAt: string) => Promise<unknown> | unknown,
  list: (order?: "updated" | "published") => Promise<{ title: string }[]> | { title: string }[],
  remove: (id: string) => Promise<unknown> | unknown,
) {
  // Susun pasangan supaya id artikel yang dibuat PERTAMA lebih kecil
  // dari yang KEDUA: tanpa tie-break, SQLite/pg-mem mengembalikan
  // urutan sisip (pertama dulu), jadi test ini GAGAL sebelum perbaikan
  // dan LULUS sesudahnya. Ulangi pembuatan sampai susunan itu tercapai.
  let first!: { id: string };
  let second!: { id: string };
  for (let attempt = 0; attempt < 10; attempt++) {
    first = await create("Tie Pertama");
    second = await create("Tie Kedua");
    if (first.id < second.id) break;
    await remove(first.id);
    await remove(second.id);
    if (attempt === 9) throw new Error("tidak dapat menyusun pasangan tie-break");
  }
  await publish(first.id);
  await publish(second.id);
  await stamp(first.id, "2022-06-01 00:00:00", "2022-06-01 00:00:00");
  await stamp(second.id, "2022-06-01 00:00:00", "2022-06-01 00:00:00");
  // published_at pasangan ini (2022) lebih baru dari skenario sebelumnya
  // (2020/2021), jadi keduanya harus menempati dua baris pertama.
  const runs: string[][] = [];
  for (let i = 0; i < 3; i++) {
    runs.push((await list("published")).map((r) => r.title));
  }
  ok(
    `${label}: urutan tie-break stabil di 3 panggilan`,
    runs[0].join("|") === runs[1].join("|") &&
      runs[1].join("|") === runs[2].join("|"),
  );
  ok(
    `${label}: tie published_at diurutkan id DESC (Kedua dulu)`,
    runs[0][0] === "Tie Kedua" && runs[0][1] === "Tie Pertama",
  );
}

console.log(`\n${passed} lulus, ${failed} gagal`);
if (failed > 0) process.exit(1);
