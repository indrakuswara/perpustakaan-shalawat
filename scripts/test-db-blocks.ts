// Test roundtrip kolom blocks di kedua backend DB.
// SQLite: node:sqlite dengan file DB temp (bukan DB dev asli).
// Postgres: pg-mem (in-memory).
// Dijalankan: node --experimental-strip-types scripts/test-db-blocks.ts
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import nodePath from "node:path";
import { DatabaseSync } from "node:sqlite";
import { newDb } from "pg-mem";

// Backend SQLite membaca DATABASE_URL secara lazy di getDb(),
// jadi cukup di-set sebelum ada fungsi backend yang dipanggil.
process.env.DATABASE_URL = `file:${nodePath.join(mkdtempSync(nodePath.join(tmpdir(), "blocks-test-")), "app.db")}`;

import * as sqliteBackend from "../src/lib/db-sqlite.ts";
import * as pgBackend from "../src/lib/db-pg.ts";
import { setPoolForTests } from "../src/lib/db-pg.ts";
import { parseBlocks } from "../src/lib/db-types.ts";
import type { ArticleBlocks } from "../src/lib/db-types.ts";

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
const eq = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

// Contoh 1 dari spec: header -> ayat -> latin -> terjemah, plus unit teks biasa.
const sampleBlocks = {
  sections: [
    {
      id: "s1",
      title: "Muqaddimah",
      units: [
        {
          id: "u1",
          arab: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
          latin: "Bismillāhirraḥmānirraḥīm",
          translation:
            "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang",
        },
        { id: "u2", text: "Segala puji bagi Allah, Tuhan semesta alam." },
      ],
    },
    {
      id: "s2",
      title: "Shalawat",
      units: [
        {
          id: "u3",
          arab: "اَللّٰهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
          translation: "Ya Allah, limpahkanlah shalawat kepada Muhammad",
        },
      ],
    },
  ],
};
// Bentuk ternormalisasi (parseBlocks men-trim dsb.) untuk perbandingan.
const expectedBlocks: ArticleBlocks = parseBlocks(sampleBlocks);

const updatedBlocks: ArticleBlocks = parseBlocks({
  sections: [
    {
      id: "s9",
      title: "Penutup",
      units: [{ id: "u9", text: "Doa penutup." }],
    },
  ],
});

console.log("== kolom blocks: backend SQLite ==");

const s1 = sqliteBackend.createContent({
  title: "Shalawat Test Blocks",
  type: "SHALAWAT",
  body: "teks turunan",
  blocks: sampleBlocks as unknown as ArticleBlocks,
});
ok(
  "createContent menyimpan blocks (roundtrip deep-equal)",
  eq(sqliteBackend.getContentById(s1.id)?.blocks, expectedBlocks),
);

const s2 = sqliteBackend.updateContent(s1.id, { blocks: updatedBlocks });
ok(
  "updateContent mengganti blocks",
  eq(s2.blocks, updatedBlocks) &&
    eq(sqliteBackend.getContentById(s1.id)?.blocks, updatedBlocks),
);

const s3 = sqliteBackend.updateContent(s1.id, { title: "Judul Baru Saja" });
ok(
  "updateContent tanpa blocks mempertahankan blocks lama",
  eq(s3.blocks, updatedBlocks),
);

const s4 = sqliteBackend.updateContent(s1.id, { blocks: null });
ok(
  "updateContent blocks:null menghapus blocks",
  sqliteBackend.getContentById(s1.id)?.blocks === null,
);

// Simulasi data korup langsung di kolom (tidak lewat API).
const rawDb: DatabaseSync = sqliteBackend.getDb();
rawDb
  .prepare("UPDATE contents SET blocks = 'json terpotong {{{' WHERE id = ?")
  .run(s1.id);
ok(
  "blocks JSON rusak -> terbaca null, tidak throw",
  sqliteBackend.getContentById(s1.id)?.blocks === null,
);
rawDb
  .prepare('UPDATE contents SET blocks = \'{"sections":[]}\' WHERE id = ?')
  .run(s1.id);
ok(
  "blocks shape salah -> terbaca null, tidak throw",
  sqliteBackend.getContentById(s1.id)?.blocks === null,
);

// Simulasi baris lama (pra-migrasi): INSERT tanpa kolom blocks.
const legacyId = "legacy-sqlite-1";
rawDb
  .prepare(
    "INSERT INTO contents (id, title, slug, type, body, status) VALUES (?, ?, ?, ?, ?, 'DRAFT')",
  )
  .run(legacyId, "Artikel Lama", "artikel-lama", "MAULID", "isi lama");
ok(
  "baris lama tanpa blocks -> terbaca blocks null",
  sqliteBackend.getContentById(legacyId)?.blocks === null,
);

console.log("== kolom blocks: backend Postgres (pg-mem) ==");

const memDb = newDb();
const pg = memDb.adapters.createPg();
const pool = new pg.Pool();
setPoolForTests(pool as never);

const p1 = await pgBackend.createContent({
  title: "Shalawat Test Blocks",
  type: "SHALAWAT",
  body: "teks turunan",
  blocks: sampleBlocks as unknown as ArticleBlocks,
});
ok(
  "createContent menyimpan blocks (roundtrip deep-equal)",
  eq((await pgBackend.getContentById(p1.id))?.blocks, expectedBlocks),
);

const p2 = await pgBackend.updateContent(p1.id, { blocks: updatedBlocks });
ok(
  "updateContent mengganti blocks",
  eq(p2.blocks, updatedBlocks) &&
    eq((await pgBackend.getContentById(p1.id))?.blocks, updatedBlocks),
);

const p3 = await pgBackend.updateContent(p1.id, { title: "Judul Baru Saja" });
ok(
  "updateContent tanpa blocks mempertahankan blocks lama",
  eq(p3.blocks, updatedBlocks),
);

const p4 = await pgBackend.updateContent(p1.id, { blocks: null });
ok(
  "updateContent blocks:null menghapus blocks",
  (await pgBackend.getContentById(p1.id))?.blocks === null,
);

// Shape salah via API (pg tidak bisa menyimpan JSONB invalid, jadi
// kasus JSON rusak hanya relevan untuk SQLite).
await pgBackend.updateContent(p1.id, {
  blocks: { sections: [] } as unknown as ArticleBlocks,
});
ok(
  "blocks shape salah -> terbaca null, tidak throw",
  (await pgBackend.getContentById(p1.id))?.blocks === null,
);

const legacyPg = await pgBackend.createContent({
  title: "Artikel Lama PG",
  type: "MAULID",
  body: "isi lama",
});
ok(
  "content tanpa blocks -> terbaca blocks null",
  (await pgBackend.getContentById(legacyPg.id))?.blocks === null,
);

console.log(`\n${passed} lulus, ${failed} gagal`);
process.exit(failed ? 1 : 0);
