// Backend PostgreSQL via driver `pg` (dipakai saat DATABASE_URL
// menunjuk ke postgres:// atau postgresql://, mis. Neon di production).
// API-nya async dan namanya identik dengan backend SQLite supaya
// facade di db.ts bisa menukar keduanya tanpa ubah code lain.

import { Pool } from "pg";
import { randomUUID } from "node:crypto";
import type {
  AdminRow,
  AutomationCleanupStatus,
  AutomationRun,
  AutomationRunInput,
  AutomationRunStatus,
  AutomationTestResult,
  AutomationTestStatus,
  ContentFilter,
  ContentInput,
  ContentRow,
  ContentStatus,
  ContentType,
  RequestFilter,
  RequestInput,
  RequestRow,
} from "./db-types.ts";
import { parseBlocksSafe, slugify } from "./db-types.ts";
import type { RequestKind, RequestStatus } from "./requests.ts";
import { normalizeTitle } from "./requests.ts";

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
  // CREATE TABLE IF NOT EXISTS tidak aman dari race di Postgres:
  // dua proses prerender Vercel yang bersamaan sama-sama melihat
  // tabel automation_runs belum ada, sama-sama mencoba membuatnya,
  // dan yang kedua gagal dengan duplicate key di pg_type (23505).
  // Itu persis yang menggagalkan build production 100d02b, padahal
  // build lokal lolos karena hanya satu proses. Kalau errornya
  // salah satu kode lomba DDL (23505 duplikat key, 42701 duplikat
  // kolom, 42P07 duplikat tabel, 42710 duplikat objek), ulangi
  // sampai total 3 percobaan: proses lain sudah membuat tabelnya,
  // sehingga percobaan ulang hanya menjadi no-op. Error lain tetap
  // dilempar.
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await createSchemaTables();
      break;
    } catch (err) {
      const code = (err as { code?: unknown }).code;
      const isRace =
        code === "23505" ||
        code === "42701" ||
        code === "42P07" ||
        code === "42710";
      if (!isRace || attempt === 3) throw err;
      await new Promise((r) => setTimeout(r, 100 * attempt));
    }
  }
  globalForPool.pgSchemaReady = true;
}

async function createSchemaTables(): Promise<void> {
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
    CREATE TABLE IF NOT EXISTS requests (
      id TEXT PRIMARY KEY,
      kind TEXT NOT NULL,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      title_norm TEXT NOT NULL,
      note TEXT,
      status TEXT NOT NULL DEFAULT 'baru',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
    CREATE INDEX IF NOT EXISTS idx_requests_kind_status ON requests(kind, status);
    CREATE TABLE IF NOT EXISTS request_hits (
      ip_hash TEXT NOT NULL,
      hit_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS idx_request_hits_hash ON request_hits(ip_hash);
    CREATE TABLE IF NOT EXISTS automation_runs (
      run_key TEXT PRIMARY KEY,
      workflow TEXT NOT NULL,
      trigger TEXT NOT NULL,
      status TEXT NOT NULL,
      commit_sha TEXT NOT NULL,
      actor TEXT NOT NULL,
      actions_url TEXT NOT NULL,
      passed INTEGER NOT NULL DEFAULT 0,
      failed INTEGER NOT NULL DEFAULT 0,
      skipped INTEGER NOT NULL DEFAULT 0,
      failed_tests TEXT NOT NULL DEFAULT '[]',
      tests TEXT NOT NULL DEFAULT '[]',
      cleanup_status TEXT NOT NULL DEFAULT 'unknown',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS idx_automation_runs_created ON automation_runs(created_at DESC);
  `);
  // Migrasi ringan: tambah kolom blocks untuk DB yang dibuat sebelum fitur ini.
  await getPool().query(
    "ALTER TABLE contents ADD COLUMN IF NOT EXISTS blocks JSONB",
  );
  // Migrasi ringan: tambah kolom tests untuk tabel automation_runs
  // yang dibuat sebelum daftar per-tes ada.
  await getPool().query(
    "ALTER TABLE automation_runs ADD COLUMN IF NOT EXISTS tests TEXT NOT NULL DEFAULT '[]'",
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
      // Dikirim sebagai JSON string; Postgres meng-cast ke JSONB.
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

// --- Request repository (fitur request tanpa login) ---

function mapRequest(r: Record<string, unknown>): RequestRow {
  return {
    id: String(r.id),
    kind: r.kind as RequestKind,
    name: String(r.name),
    title: String(r.title),
    titleNorm: String(r.title_norm),
    note: r.note == null ? null : String(r.note),
    status: r.status as RequestStatus,
    createdAt: toISO(r.created_at),
  };
}

export async function createRequest(input: RequestInput): Promise<RequestRow> {
  if (input.kind !== "shalawat" && input.kind !== "maulid") {
    throw new Error("Jenis request tidak valid");
  }
  const id = randomUUID();
  await query(
    `INSERT INTO requests (id, kind, name, title, title_norm, note)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      id,
      input.kind,
      input.name,
      input.title,
      normalizeTitle(input.title),
      input.note?.trim() || null,
    ],
  );
  return (await getRequestById(id)) as RequestRow;
}

export async function getRequestById(id: string): Promise<RequestRow | null> {
  const rows = await query<Record<string, unknown>>(
    "SELECT * FROM requests WHERE id = $1",
    [id],
  );
  return rows[0] ? mapRequest(rows[0]) : null;
}

export async function listRequests(
  filter: RequestFilter = {},
): Promise<RequestRow[]> {
  const where: string[] = [];
  const params: unknown[] = [];
  if (filter.kind) {
    params.push(filter.kind);
    where.push(`kind = $${params.length}`);
  }
  if (filter.status) {
    params.push(filter.status);
    where.push(`status = $${params.length}`);
  }
  const sql =
    "SELECT * FROM requests" +
    (where.length ? ` WHERE ${where.join(" AND ")}` : "") +
    " ORDER BY CASE WHEN status = 'baru' THEN 0 ELSE 1 END, created_at DESC";
  const rows = await query<Record<string, unknown>>(sql, params);
  return rows.map(mapRequest);
}

export async function updateRequestStatus(
  id: string,
  status: RequestStatus,
): Promise<void> {
  if (status !== "baru" && status !== "selesai" && status !== "ditolak") {
    throw new Error("Status request tidak valid");
  }
  await query("UPDATE requests SET status = $1 WHERE id = $2", [status, id]);
}

export async function deleteRequest(id: string): Promise<void> {
  await query("DELETE FROM requests WHERE id = $1", [id]);
}

export async function findPendingRequestDuplicate(
  kind: RequestKind,
  titleNorm: string,
  name: string,
): Promise<RequestRow | null> {
  const rows = await query<Record<string, unknown>>(
    `SELECT * FROM requests
     WHERE kind = $1 AND title_norm = $2 AND status = 'baru' AND lower(name) = lower($3)
     LIMIT 1`,
    [kind, titleNorm, name],
  );
  return rows[0] ? mapRequest(rows[0]) : null;
}

export async function listRequestHitTimes(
  ipHash: string,
  sinceIso: string,
): Promise<string[]> {
  const rows = await query<{ hit_at: unknown }>(
    "SELECT hit_at FROM request_hits WHERE ip_hash = $1 AND hit_at >= $2",
    [ipHash, sinceIso],
  );
  return rows.map((r) => toISO(r.hit_at));
}

export async function recordRequestHit(
  ipHash: string,
  pruneBeforeIso: string,
): Promise<void> {
  await query("DELETE FROM request_hits WHERE hit_at < $1", [pruneBeforeIso]);
  await query("INSERT INTO request_hits (ip_hash) VALUES ($1)", [ipHash]);
}

// --- Laporan automation (halaman admin tersembunyi) ---

function parseAutomationTests(raw: unknown): AutomationTestResult[] {
  try {
    const parsed: unknown =
      typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (v): v is Record<string, unknown> =>
          typeof v === "object" && v !== null,
      )
      .map((v) => ({
        title: typeof v.title === "string" ? v.title : "",
        // Fail closed: an unknown or corrupt status never displays
        // as passed.
        status:
          v.status === "passed" || v.status === "skipped"
            ? (v.status as AutomationTestStatus)
            : "failed",
      }))
      .filter((v) => v.title.length > 0);
  } catch {
    return [];
  }
}

function mapAutomationRun(r: Record<string, unknown>): AutomationRun {
  let failedTests: string[] = [];
  try {
    const parsed: unknown =
      typeof r.failed_tests === "string"
        ? JSON.parse(r.failed_tests)
        : r.failed_tests;
    if (Array.isArray(parsed)) {
      failedTests = parsed.filter((v): v is string => typeof v === "string");
    }
  } catch {
    failedTests = [];
  }
  return {
    runKey: String(r.run_key),
    workflow: String(r.workflow),
    trigger: String(r.trigger),
    status: r.status as AutomationRunStatus,
    commitSha: String(r.commit_sha),
    actor: String(r.actor),
    actionsUrl: String(r.actions_url),
    passed: Number(r.passed),
    failed: Number(r.failed),
    skipped: Number(r.skipped),
    failedTests,
    tests: parseAutomationTests(r.tests),
    cleanupStatus: r.cleanup_status as AutomationCleanupStatus,
    createdAt: toISO(r.created_at),
  };
}

export async function createAutomationRun(
  input: AutomationRunInput,
): Promise<AutomationRun> {
  const rows = await query<Record<string, unknown>>(
    `INSERT INTO automation_runs
       (run_key, workflow, trigger, status, commit_sha, actor, actions_url,
        passed, failed, skipped, failed_tests, tests, cleanup_status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
     ON CONFLICT (run_key) DO UPDATE SET
       workflow = EXCLUDED.workflow,
       trigger = EXCLUDED.trigger,
       status = EXCLUDED.status,
       commit_sha = EXCLUDED.commit_sha,
       actor = EXCLUDED.actor,
       actions_url = EXCLUDED.actions_url,
       passed = EXCLUDED.passed,
       failed = EXCLUDED.failed,
       skipped = EXCLUDED.skipped,
       failed_tests = EXCLUDED.failed_tests,
       tests = EXCLUDED.tests,
       cleanup_status = EXCLUDED.cleanup_status,
       created_at = now()
     RETURNING *`,
    [
      input.runKey,
      input.workflow,
      input.trigger,
      input.status,
      input.commitSha,
      input.actor,
      input.actionsUrl,
      input.passed,
      input.failed,
      input.skipped,
      JSON.stringify(input.failedTests),
      JSON.stringify(input.tests ?? []),
      input.cleanupStatus,
    ],
  );
  await query(
    `DELETE FROM automation_runs WHERE run_key NOT IN
       (SELECT run_key FROM automation_runs
        ORDER BY created_at DESC, run_key DESC LIMIT 50)`,
  );
  if (!rows[0]) throw new Error("Gagal menyimpan laporan automation");
  return mapAutomationRun(rows[0]);
}

export async function listAutomationRuns(
  limit = 50,
): Promise<AutomationRun[]> {
  const rows = await query<Record<string, unknown>>(
    `SELECT * FROM automation_runs
     ORDER BY created_at DESC, run_key DESC LIMIT $1`,
    [limit],
  );
  return rows.map(mapAutomationRun);
}
