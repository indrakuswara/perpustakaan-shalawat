// Backend PostgreSQL via driver `pg` (dipakai saat DATABASE_URL
// menunjuk ke postgres:// atau postgresql://, mis. Neon di production).
// API-nya async dan namanya identik dengan backend SQLite supaya
// facade di db.ts bisa menukar keduanya tanpa ubah code lain.

import { Pool } from "pg";
import { randomUUID } from "node:crypto";
import type {
  AdminRow,
  ContentFilter,
  ContentInput,
  ContentRow,
  ContentStatus,
  ContentType,
} from "./db-types.ts";
import { parseBlocksSafe, slugify } from "./db-types.ts";

// --- Koneksi ---

const globalForPool = globalThis as unknown as {
  pgPool?: Pool;
  pgSchemaReady?: boolean;
};

// Dipakai unit test untuk menyuntikkan pool pg-mem (in-memory).
let testPool: Pool | null = null;
export function setPoolForTests(pool: Pool | null): void {
  testPool = pool;
  globalForPool.pgSchemaReady = false;
}

function getPool(): Pool {
  if (testPool) return testPool;
  if (globalForPool.pgPool) return globalForPool.pgPool;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL belum di-set untuk backend PostgreSQL");
  }
  const pool = new Pool({ connectionString, max: 5 });
  globalForPool.pgPool = pool;
  return pool;
}

async function ensureSchema(): Promise<void> {
  if (globalForPool.pgSchemaReady) return;
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS admins (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'ADMIN',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS contents (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      type TEXT NOT NULL,
      description TEXT,
      body TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'DRAFT',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      published_at TIMESTAMPTZ
    );
    CREATE INDEX IF NOT EXISTS idx_contents_status ON contents(status);
    CREATE INDEX IF NOT EXISTS idx_contents_type_status ON contents(type, status);
  `);
  // Migrasi ringan: tambah kolom blocks untuk DB yang dibuat sebelum fitur ini.
  await getPool().query(
    "ALTER TABLE contents ADD COLUMN IF NOT EXISTS blocks JSONB",
  );
  globalForPool.pgSchemaReady = true;
}

async function query<T>(text: string, params: unknown[] = []): Promise<T[]> {
  await ensureSchema();
  const res = await getPool().query(text, params as never[]);
  return res.rows as T[];
}

// pg mengembalikan TIMESTAMPTZ sebagai Date; samakan ke string ISO
// seperti backend SQLite supaya bentuk ContentRow identik.
function toISO(v: unknown): string {
  if (v instanceof Date) return v.toISOString();
  return String(v);
}

function mapAdmin(r: Record<string, unknown>): AdminRow {
  return {
    id: String(r.id),
    email: String(r.email),
    passwordHash: String(r.password_hash),
    role: String(r.role),
    createdAt: toISO(r.created_at),
    updatedAt: toISO(r.updated_at),
  };
}

function mapContent(r: Record<string, unknown>): ContentRow {
  return {
    id: String(r.id),
    title: String(r.title),
    slug: String(r.slug),
    type: r.type as ContentType,
    description: r.description == null ? null : String(r.description),
    body: String(r.body),
    status: r.status as ContentStatus,
    createdAt: toISO(r.created_at),
    updatedAt: toISO(r.updated_at),
    publishedAt: r.published_at == null ? null : toISO(r.published_at),
    // Driver pg mengembalikan JSONB sebagai object; pg-mem bisa string/object.
    // parseBlocksSafe menangani keduanya dan tidak pernah throw.
    blocks: parseBlocksSafe(r.blocks),
  };
}

// --- Admin repository ---

export async function findAdminByEmail(
  email: string,
): Promise<AdminRow | null> {
  const rows = await query<Record<string, unknown>>(
    "SELECT * FROM admins WHERE email = $1",
    [email.toLowerCase().trim()],
  );
  return rows.length ? mapAdmin(rows[0]) : null;
}

export async function findAdminById(id: string): Promise<AdminRow | null> {
  const rows = await query<Record<string, unknown>>(
    "SELECT * FROM admins WHERE id = $1",
    [id],
  );
  return rows.length ? mapAdmin(rows[0]) : null;
}

export async function upsertAdmin(
  email: string,
  passwordHash: string,
  role = "ADMIN",
): Promise<AdminRow> {
  const normalized = email.toLowerCase().trim();
  const existing = await findAdminByEmail(normalized);
  if (existing) {
    await query(
      "UPDATE admins SET password_hash = $1, updated_at = now() WHERE id = $2",
      [passwordHash, existing.id],
    );
    return (await findAdminById(existing.id)) as AdminRow;
  }
  const id = randomUUID();
  await query(
    "INSERT INTO admins (id, email, password_hash, role) VALUES ($1, $2, $3, $4)",
    [id, normalized, passwordHash, role],
  );
  return (await findAdminById(id)) as AdminRow;
}

// --- Content repository ---

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  let slug = base;
  let n = 2;
  for (;;) {
    const rows = excludeId
      ? await query<{ id: string }>(
          "SELECT id FROM contents WHERE slug = $1 AND id != $2",
          [slug, excludeId],
        )
      : await query<{ id: string }>("SELECT id FROM contents WHERE slug = $1", [
          slug,
        ]);
    if (!rows.length) return slug;
    slug = `${base}-${n}`;
    n += 1;
  }
}

export async function createContent(input: ContentInput): Promise<ContentRow> {
  const title = input.title.trim();
  if (!title) throw new Error("Judul wajib diisi");
  if (!input.body.trim()) throw new Error("Isi artikel wajib diisi");
  if (input.type !== "SHALAWAT" && input.type !== "MAULID") {
    throw new Error("Tipe konten tidak valid");
  }
  const id = randomUUID();
  const slug = await uniqueSlug(slugify(title));
  await query(
    `INSERT INTO contents (id, title, slug, type, description, body, blocks, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, 'DRAFT')`,
    [
      id,
      title,
      slug,
      input.type,
      input.description?.trim() || null,
      input.body,
      // Driver pg menserialisasi object JS menjadi JSONB otomatis.
      input.blocks ? JSON.stringify(input.blocks) : null,
    ],
  );
  return (await getContentById(id)) as ContentRow;
}

export async function getContentById(id: string): Promise<ContentRow | null> {
  const rows = await query<Record<string, unknown>>(
    "SELECT * FROM contents WHERE id = $1",
    [id],
  );
  return rows.length ? mapContent(rows[0]) : null;
}

export async function listContents(
  filter: ContentFilter = {},
): Promise<ContentRow[]> {
  const where: string[] = [];
  const params: unknown[] = [];
  if (filter.status) {
    params.push(filter.status);
    where.push(`status = $${params.length}`);
  }
  if (filter.type) {
    params.push(filter.type);
    where.push(`type = $${params.length}`);
  }
  if (filter.query) {
    // ILIKE = LIKE case-insensitive (menyamai perilaku SQLite).
    params.push(`%${filter.query}%`, `%${filter.query}%`);
    where.push(
      `(title ILIKE $${params.length - 1} OR description ILIKE $${params.length})`,
    );
  }
  const sql =
    "SELECT * FROM contents" +
    (where.length ? ` WHERE ${where.join(" AND ")}` : "") +
    " ORDER BY updated_at DESC";
  const rows = await query<Record<string, unknown>>(sql, params);
  return rows.map(mapContent);
}

// Query KHUSUS publik: tidak pernah mengembalikan draft.
export async function listPublishedContents(
  type?: ContentType,
): Promise<ContentRow[]> {
  return listContents({ status: "PUBLISHED", type });
}

export async function getPublishedBySlug(
  slug: string,
): Promise<ContentRow | null> {
  const rows = await query<Record<string, unknown>>(
    "SELECT * FROM contents WHERE slug = $1 AND status = 'PUBLISHED'",
    [slug],
  );
  return rows.length ? mapContent(rows[0]) : null;
}

// Pencarian publik: judul + deskripsi + isi, HANYA yang published.
export async function searchPublishedContents(
  queryText: string,
  type?: ContentType,
): Promise<ContentRow[]> {
  const q = queryText.trim();
  if (!q) return [];
  const like = `%${q}%`;
  const params: unknown[] = [];
  let sql = "SELECT * FROM contents WHERE status = 'PUBLISHED'";
  if (type) {
    params.push(type);
    sql += ` AND type = $${params.length}`;
  }
  params.push(like, like, like);
  const n = params.length;
  sql += ` AND (title ILIKE $${n - 2} OR description ILIKE $${n - 1} OR body ILIKE $${n}) ORDER BY updated_at DESC`;
  const rows = await query<Record<string, unknown>>(sql, params);
  return rows.map(mapContent);
}

export async function updateContent(
  id: string,
  input: Partial<ContentInput>,
): Promise<ContentRow> {
  const existing = await getContentById(id);
  if (!existing) throw new Error("Artikel tidak ditemukan");
  const title = (input.title ?? existing.title).trim();
  if (!title) throw new Error("Judul wajib diisi");
  const body = input.body ?? existing.body;
  if (!body.trim()) throw new Error("Isi artikel wajib diisi");
  const type = input.type ?? existing.type;
  if (type !== "SHALAWAT" && type !== "MAULID") {
    throw new Error("Tipe konten tidak valid");
  }
  const slug =
    title !== existing.title ? await uniqueSlug(slugify(title), id) : existing.slug;
  // blocks: undefined = pertahankan yang lama; null/object = timpa.
  const blocks = input.blocks !== undefined ? input.blocks : existing.blocks;
  await query(
    `UPDATE contents
     SET title = $1, slug = $2, type = $3, description = $4, body = $5, blocks = $6,
         updated_at = now()
     WHERE id = $7`,
    [
      title,
      slug,
      type,
      input.description !== undefined
        ? input.description.trim() || null
        : existing.description,
      body,
      blocks ? JSON.stringify(blocks) : null,
      id,
    ],
  );
  return (await getContentById(id)) as ContentRow;
}

export async function publishContent(id: string): Promise<ContentRow> {
  const existing = await getContentById(id);
  if (!existing) throw new Error("Artikel tidak ditemukan");
  await query(
    `UPDATE contents
     SET status = 'PUBLISHED', published_at = COALESCE(published_at, now()),
         updated_at = now()
     WHERE id = $1`,
    [id],
  );
  return (await getContentById(id)) as ContentRow;
}

export async function unpublishContent(id: string): Promise<ContentRow> {
  const existing = await getContentById(id);
  if (!existing) throw new Error("Artikel tidak ditemukan");
  await query(
    `UPDATE contents
     SET status = 'DRAFT', updated_at = now()
     WHERE id = $1`,
    [id],
  );
  return (await getContentById(id)) as ContentRow;
}

export async function deleteContent(id: string): Promise<void> {
  await query("DELETE FROM contents WHERE id = $1", [id]);
}

// --- Content stats (dipakai dashboard) ---

export async function countContents(): Promise<{
  total: number;
  published: number;
  drafts: number;
}> {
  const total = (
    await query<{ n: number }>("SELECT COUNT(*)::int AS n FROM contents")
  )[0].n;
  const published = (
    await query<{ n: number }>(
      "SELECT COUNT(*)::int AS n FROM contents WHERE status = 'PUBLISHED'",
    )
  )[0].n;
  const drafts = (
    await query<{ n: number }>(
      "SELECT COUNT(*)::int AS n FROM contents WHERE status = 'DRAFT'",
    )
  )[0].n;
  return { total, published, drafts };
}
