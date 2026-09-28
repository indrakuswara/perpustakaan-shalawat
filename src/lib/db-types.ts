// Tipe data + helper murni yang dipakai kedua backend DB (SQLite & Postgres).

export type ContentType = "SHALAWAT" | "MAULID";
export type ContentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface AdminRow {
  id: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContentRow {
  id: string;
  title: string;
  slug: string;
  type: ContentType;
  description: string | null;
  body: string;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface ContentInput {
  title: string;
  type: ContentType;
  description?: string;
  body: string;
}

export interface ContentFilter {
  status?: ContentStatus;
  type?: ContentType;
  query?: string;
}

export function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "artikel";
}

// Parse timestamp dari DB jadi Date.
// - SQLite menyimpan "2026-09-28 10:51:50" (tanpa zona) -> anggap UTC.
// - Postgres mengembalikan ISO "2026-09-28T10:51:50.123Z" -> langsung valid.
export function parseDbDateTime(value: string): Date {
  const s = value.includes("T") ? value : value.replace(" ", "T") + "Z";
  return new Date(s);
}
