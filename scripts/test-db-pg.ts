// Unit test backend PostgreSQL (db-pg.ts) via pg-mem (in-memory).
// Dijalankan: node --experimental-strip-types scripts/test-db-pg.ts
// (atau tsx / node versi yang mendukung import .ts)
import { newDb } from "pg-mem";
import {
  setPoolForTests,
  upsertAdmin,
  findAdminByEmail,
  findAdminById,
  createContent,
  getContentById,
  updateContent,
  publishContent,
  unpublishContent,
  deleteContent,
  listContents,
  listPublishedContents,
  getPublishedBySlug,
  searchPublishedContents,
  countContents,
} from "../src/lib/db-pg.ts";
import { slugify } from "../src/lib/db-types.ts";

const db = newDb();
const pg = db.adapters.createPg();
setPoolForTests(new pg.Pool() as never);

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

console.log("== backend Postgres (pg-mem) ==");

// --- Admin ---
const a1 = await upsertAdmin("Admin@Test.com", "hash1");
ok("upsertAdmin normalisasi email", a1.email === "admin@test.com");
ok("findAdminByEmail ketemu", (await findAdminByEmail("ADMIN@test.com"))?.id === a1.id);
ok("findAdminById ketemu", (await findAdminById(a1.id))?.email === "admin@test.com");
ok("findAdminByEmail null utk email asing", (await findAdminByEmail("x@y.z")) === null);
const a2 = await upsertAdmin("admin@test.com", "hash2");
ok("upsertAdmin update hash, id sama", a2.id === a1.id && a2.passwordHash === "hash2");

// --- Content CRUD ---
const c1 = await createContent({ title: "Shalawat Nariyah", type: "SHALAWAT", body: "Allahumma sholli..." });
ok("createContent status DRAFT", c1.status === "DRAFT");
ok("createContent slug", c1.slug === "shalawat-nariyah");
ok("createContent publishedAt null", c1.publishedAt === null);

const c2 = await createContent({ title: "Shalawat Nariyah", type: "SHALAWAT", body: "isi 2" });
ok("slug unik utk judul sama", c2.slug === "shalawat-nariyah-2");

const c3 = await createContent({ title: "Maulid Simthud Duror", type: "MAULID", description: "Kitab maulid", body: "Ya Robbi salli..." });
ok("description tersimpan", c3.description === "Kitab maulid");

ok("getContentById ketemu", (await getContentById(c1.id))?.title === "Shalawat Nariyah");
ok("getContentById null utk id asing", (await getContentById("nope")) === null);

// --- published-only (aturan keras) ---
ok("listPublishedContents kosong saat semua draft", (await listPublishedContents()).length === 0);
ok("getPublishedBySlug null utk draft", (await getPublishedBySlug(c1.slug)) === null);

const p1 = await publishContent(c1.id);
ok("publishContent status PUBLISHED", p1.status === "PUBLISHED");
ok("publishContent publishedAt terisi", typeof p1.publishedAt === "string" && p1.publishedAt.length > 0);
const p1b = await publishContent(c1.id);
ok("publish ulang tidak reset publishedAt", p1b.publishedAt === p1.publishedAt);

ok("listPublishedContents hanya published", (await listPublishedContents()).length === 1);
ok("getPublishedBySlug ketemu setelah publish", (await getPublishedBySlug(c1.slug))?.id === c1.id);
ok("listPublishedContents filter type", (await listPublishedContents("MAULID")).length === 0);

// --- update ---
const u1 = await updateContent(c2.id, { title: "Shalawat Badar" });
ok("updateContent ganti judul + slug", u1.title === "Shalawat Badar" && u1.slug === "shalawat-badar");
const u2 = await updateContent(c2.id, { body: "isi baru" });
ok("updateContent tanpa ganti judul slug tetap", u2.slug === "shalawat-badar");

// --- search (judul + deskripsi + isi, hanya published) ---
await publishContent(c3.id);
const s1 = await searchPublishedContents("duror");
ok("search ketemu via judul", s1.length === 1 && s1[0].id === c3.id);
const s2 = await searchPublishedContents("kitab maulid");
ok("search ketemu via deskripsi", s2.length === 1);
const s3 = await searchPublishedContents("ROBBI");
ok("search case-insensitive via isi", s3.length === 1);
const s4 = await searchPublishedContents("badar");
ok("search tidak menemukan draft", s4.length === 0);
ok("search query kosong -> []", (await searchPublishedContents("  ")).length === 0);

// --- listContents filter ---
const all = await listContents();
ok("listContents semua", all.length === 3);
ok("listContents filter status DRAFT", (await listContents({ status: "DRAFT" })).length === 1);
ok("listContents filter type+status", (await listContents({ type: "SHALAWAT", status: "PUBLISHED" })).length === 1);
ok("listContents query", (await listContents({ query: "NARIYAH" })).length === 1);

// --- unpublish & delete ---
const un = await unpublishContent(c1.id);
ok("unpublishContent kembali DRAFT", un.status === "DRAFT");
ok("setelah unpublish tidak muncul di publik", (await getPublishedBySlug(c1.slug)) === null);

await deleteContent(c2.id);
ok("deleteContent menghapus", (await getContentById(c2.id)) === null);

// --- stats ---
const stats = await countContents();
ok("countContents", stats.total === 2 && stats.published === 1 && stats.drafts === 1);

// --- slugify ---
ok("slugify arab+simbol", slugify("  Shalawat: Nârîyah!! ") === "shalawat-nariyah");
ok("slugify kosong -> artikel", slugify("!!!") === "artikel");

// --- validasi ---
let threw = false;
try { await createContent({ title: "  ", type: "SHALAWAT", body: "x" }); } catch { threw = true; }
ok("createContent tolak judul kosong", threw);
threw = false;
try { await updateContent("nope", { title: "x" }); } catch { threw = true; }
ok("updateContent tolak id asing", threw);

console.log(`\n${passed} lulus, ${failed} gagal`);
process.exit(failed ? 1 : 0);
