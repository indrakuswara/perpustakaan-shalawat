// Facade data layer: memilih backend SQLite atau PostgreSQL
// berdasarkan DATABASE_URL, lalu mengekspos SATU API async yang sama.
// - DATABASE_URL kosong / file:...  -> SQLite lokal (dev, tanpa setup)
// - DATABASE_URL postgres://...     -> PostgreSQL (production, mis. Neon)
// Seluruh code lain hanya import dari file ini.

import * as sqliteBackend from "./db-sqlite.ts";
import * as pgBackend from "./db-pg.ts";

export type {
  AdminRow,
  ContentFilter,
  ContentInput,
  ContentRow,
  ContentStatus,
  ContentType,
} from "./db-types.ts";
export { slugify, parseDbDateTime } from "./db-types.ts";

function shouldUsePostgres(): boolean {
  const url = process.env.DATABASE_URL ?? "";
  return url.startsWith("postgres://") || url.startsWith("postgresql://");
}

// Backend dipilih sekali saat modul dimuat (env sudah final di titik ini).
const backend = shouldUsePostgres() ? pgBackend : sqliteBackend;

// --- Admin repository ---
export async function findAdminByEmail(email: string) {
  return backend.findAdminByEmail(email);
}
export async function findAdminById(id: string) {
  return backend.findAdminById(id);
}
export async function upsertAdmin(
  email: string,
  passwordHash: string,
  role = "ADMIN",
) {
  return backend.upsertAdmin(email, passwordHash, role);
}

// --- Content repository ---
export async function createContent(
  input: Parameters<typeof backend.createContent>[0],
) {
  return backend.createContent(input);
}
export async function getContentById(id: string) {
  return backend.getContentById(id);
}
export async function listContents(
  filter: Parameters<typeof backend.listContents>[0] = {},
) {
  return backend.listContents(filter);
}
export async function listPublishedContents(
  type?: Parameters<typeof backend.listPublishedContents>[0],
) {
  return backend.listPublishedContents(type);
}
export async function getPublishedBySlug(slug: string) {
  return backend.getPublishedBySlug(slug);
}
export async function searchPublishedContents(
  query: string,
  type?: Parameters<typeof backend.searchPublishedContents>[1],
) {
  return backend.searchPublishedContents(query, type);
}
export async function updateContent(
  id: string,
  input: Parameters<typeof backend.updateContent>[1],
) {
  return backend.updateContent(id, input);
}
export async function publishContent(id: string) {
  return backend.publishContent(id);
}
export async function unpublishContent(id: string) {
  return backend.unpublishContent(id);
}
export async function deleteContent(id: string) {
  return backend.deleteContent(id);
}
export async function countContents() {
  return backend.countContents();
}
