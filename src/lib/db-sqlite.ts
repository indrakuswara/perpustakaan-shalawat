import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import nodePath from "node:path";
import { randomUUID } from "node:crypto";

// Backend SQLite via node:sqlite (built-in Node, tanpa native dep).
// Dipakai saat DATABASE_URL tidak menunjuk ke Postgres (dev lokal).
// API-nya sinkron; facade di db.ts membungkusnya jadi async supaya
// seragam dengan backend Postgres.

import type {
  AdminRow,
  ArticleBlocks,
  ContentFilter,
  ContentInput,
  ContentRow,
  ContentStatus,
  ContentType,
} from "./db-types.ts";
import { parseBlocksSafe, slugify } from "./db-types.ts";

function resolveDbPath(): string {
  const raw = process.env.DATABASE_URL ?? "file:./data/app.db";
  const path = raw.startsWith("file:") ? raw.slice("file:".length) : raw;
  // Path DB memang dinamis via env (perlu saat deploy); abaikan analisa statik Turbopack.
  return nodePath.resolve(process.cwd(), /*turbopackIgnore: true*/ path);
}

function initSchema(db: DatabaseSync): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'ADMIN',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS contents (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      type TEXT NOT NULL,
      description TEXT,
      body TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'DRAFT',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      published_at TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_contents_status ON contents(status);
    CREATE INDEX IF NOT EXISTS idx_contents_type_status ON contents(type, status);
  `);
  // Migrasi ringan: tambah kolom blocks untuk DB yang dibuat sebelum fitur ini.
  const hasBlocks = (
    db
      .prepare("SELECT name FROM pragma_table_info('contents') WHERE name = 'blocks'")
      .get() as { name: string } | undefined
  );
  if (!hasBlocks) {
    db.exec("ALTER TABLE contents ADD COLUMN blocks TEXT");
  }
}

const globalForDb = globalThis as unknown as {
  dbInstance?: DatabaseSync;
};

export function getDb(): DatabaseSync {
  if (globalForDb.dbInstance) return globalForDb.dbInstance;
  const dbPath = resolveDbPath();
  mkdirSync(nodePath.dirname(dbPath), { recursive: true });
  const db = new DatabaseSync(dbPath);
  initSchema(db);
  globalForDb.dbInstance = db;
  return db;
}

function mapAdmin(row: unknown): AdminRow {
  const r = row as Record<string, string>;
  return {
    id: r.id,
    email: r.email,
    passwordHash: r.password_hash,
    role: r.role,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

// --- Admin repository ---

export function findAdminByEmail(email: string): AdminRow | null {
  const row = getDb()
    .prepare("SELECT * FROM admins WHERE email = ?")
    .get(email.toLowerCase().trim());
  return row ? mapAdmin(row) : null;
}

export function findAdminById(id: string): AdminRow | null {
  const row = getDb().prepare("SELECT * FROM admins WHERE id = ?").get(id);
  return row ? mapAdmin(row) : null;
}

export function upsertAdmin(
  email: string,
  passwordHash: string,
  role = "ADMIN",
): AdminRow {
  const normalized = email.toLowerCase().trim();
  const existing = findAdminByEmail(normalized);
  const db = getDb();
  if (existing) {
    db.prepare(
      "UPDATE admins SET password_hash = ?, updated_at = datetime('now') WHERE id = ?",
    ).run(passwordHash, existing.id);
    return findAdminById(existing.id) as AdminRow;
  }
  const id = randomUUID();
  db.prepare(
    "INSERT INTO admins (id, email, password_hash, role) VALUES (?, ?, ?, ?)",
  ).run(id, normalized, passwordHash, role);
  return findAdminById(id) as AdminRow;
}

// --- Content repository (Fase 2: Admin CMS) ---


function mapContent(row: unknown): ContentRow {
  const r = row as Record<string, string | null>;
  return {
    id: r.id as string,
    title: r.title as string,
    slug: r.slug as string,
    type: r.type as ContentType,
    description: r.description,
    body: r.body as string,
    status: r.status as ContentStatus,
    createdAt: r.created_at as string,
    updatedAt: r.updated_at as string,
    publishedAt: r.published_at,
    blocks: parseBlocksSafe(r.blocks),
  };
}

function blocksToJson(blocks: ArticleBlocks | null | undefined): string | null {
  return blocks ? JSON.stringify(blocks) : null;
}

function uniqueSlug(base: string, excludeId?: string): string {
  const db = getDb();
  let slug = base;
  let n = 2;
  for (;;) {
    const row = (
      excludeId
        ? db
            .prepare("SELECT id FROM contents WHERE slug = ? AND id != ?")
            .get(slug, excludeId)
        : db.prepare("SELECT id FROM contents WHERE slug = ?").get(slug)
    ) as { id: string } | undefined;
    if (!row) return slug;
    slug = `${base}-${n}`;
    n += 1;
  }
}

export function createContent(input: ContentInput): ContentRow {
  const title = input.title.trim();
  if (!title) throw new Error("Judul wajib diisi");
  if (!input.body.trim()) throw new Error("Isi artikel wajib diisi");
  if (input.type !== "SHALAWAT" && input.type !== "MAULID") {
    throw new Error("Tipe konten tidak valid");
  }
  const db = getDb();
  const id = randomUUID();
  const slug = uniqueSlug(slugify(title));
  db.prepare(
    `INSERT INTO contents (id, title, slug, type, description, body, blocks, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'DRAFT')`,
  ).run(
    id,
    title,
    slug,
    input.type,
    input.description?.trim() || null,
    input.body,
    blocksToJson(input.blocks),
  );
  return getContentById(id) as ContentRow;
}

export function getContentById(id: string): ContentRow | null {
  const row = getDb().prepare("SELECT * FROM contents WHERE id = ?").get(id);
  return row ? mapContent(row) : null;
}

export function listContents(filter: ContentFilter = {}): ContentRow[] {
  const where: string[] = [];
  const params: string[] = [];
  if (filter.status) {
    where.push("status = ?");
    params.push(filter.status);
  }
  if (filter.type) {
    where.push("type = ?");
    params.push(filter.type);
  }
  if (filter.query) {
    where.push("(title LIKE ? OR description LIKE ?)");
    params.push(`%${filter.query}%`, `%${filter.query}%`);
  }
  const sql =
    "SELECT * FROM contents" +
    (where.length ? ` WHERE ${where.join(" AND ")}` : "") +
    " ORDER BY updated_at DESC";
  const rows = getDb().prepare(sql).all(...params);
  return (rows as unknown[]).map(mapContent);
}

// Query KHUSUS publik: tidak pernah mengembalikan draft.
// Dipakai halaman publik (Fase 3); didefinisikan di sini supaya
// aturannya terpusat dan gampang diaudit.
export function listPublishedContents(type?: ContentType): ContentRow[] {
  return listContents({ status: "PUBLISHED", type });
}

export function getPublishedBySlug(slug: string): ContentRow | null {
  const row = getDb()
    .prepare("SELECT * FROM contents WHERE slug = ? AND status = 'PUBLISHED'")
    .get(slug);
  return row ? mapContent(row) : null;
}

// Pencarian publik: judul + deskripsi + isi, HANYA yang published.
export function searchPublishedContents(
  query: string,
  type?: ContentType,
): ContentRow[] {
  const q = query.trim();
  if (!q) return [];
  const like = `%${q}%`;
  const params: string[] = [];
  let sql = "SELECT * FROM contents WHERE status = 'PUBLISHED'";
  if (type) {
    sql += " AND type = ?";
    params.push(type);
  }
  sql +=
    " AND (title LIKE ? OR description LIKE ? OR body LIKE ?) ORDER BY updated_at DESC";
  params.push(like, like, like);
  const rows = getDb().prepare(sql).all(...params);
  return (rows as unknown[]).map(mapContent);
}

export function updateContent(
  id: string,
  input: Partial<ContentInput>,
): ContentRow {
  const existing = getContentById(id);
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
    title !== existing.title ? uniqueSlug(slugify(title), id) : existing.slug;
  // blocks: undefined = pertahankan yang lama; null/object = timpa.
  const blocks =
    input.blocks !== undefined ? input.blocks : existing.blocks;
  getDb()
    .prepare(
      `UPDATE contents
       SET title = ?, slug = ?, type = ?, description = ?, body = ?, blocks = ?,
           updated_at = datetime('now')
       WHERE id = ?`,
    )
    .run(
      title,
      slug,
      type,
      input.description !== undefined
        ? input.description.trim() || null
        : existing.description,
      body,
      blocksToJson(blocks),
      id,
    );
  return getContentById(id) as ContentRow;
}

export function publishContent(id: string): ContentRow {
  const existing = getContentById(id);
  if (!existing) throw new Error("Artikel tidak ditemukan");
  getDb()
    .prepare(
      `UPDATE contents
       SET status = 'PUBLISHED', published_at = COALESCE(published_at, datetime('now')),
           updated_at = datetime('now')
       WHERE id = ?`,
    )
    .run(id);
  return getContentById(id) as ContentRow;
}

export function unpublishContent(id: string): ContentRow {
  const existing = getContentById(id);
  if (!existing) throw new Error("Artikel tidak ditemukan");
  getDb()
    .prepare(
      `UPDATE contents
       SET status = 'DRAFT', updated_at = datetime('now')
       WHERE id = ?`,
    )
    .run(id);
  return getContentById(id) as ContentRow;
}

export function deleteContent(id: string): void {
  getDb().prepare("DELETE FROM contents WHERE id = ?").run(id);
}

// --- Content stats (dipakai dashboard; CRUD penuh di Fase 2) ---

export function countContents(): {
  total: number;
  published: number;
  drafts: number;
} {
  const db = getDb();
  const total = (
    db.prepare("SELECT COUNT(*) AS n FROM contents").get() as { n: number }
  ).n;
  const published = (
    db
      .prepare("SELECT COUNT(*) AS n FROM contents WHERE status = 'PUBLISHED'")
      .get() as { n: number }
  ).n;
  const drafts = (
    db.prepare("SELECT COUNT(*) AS n FROM contents WHERE status = 'DRAFT'").get() as {
      n: number;
    }
  ).n;
  return { total, published, drafts };
}
