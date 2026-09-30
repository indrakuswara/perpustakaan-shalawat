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

// ---- Blok konten terstruktur (reader ala NU Online) ----

// Satu unit bacaan: tiap field opsional, minimal satu terisi.
// Contoh: { arab, latin, translation } / { text } / { arab, translation }.
export interface ArticleUnit {
  id: string;
  arab?: string;
  latin?: string;
  translation?: string;
  text?: string;
}

// Satu bagian (header): judulnya menjadi daftar isi + anchor link.
export interface ArticleSection {
  id: string;
  title: string;
  units: ArticleUnit[];
}

export interface ArticleBlocks {
  sections: ArticleSection[];
}

const BLOCK_FIELDS = ["arab", "latin", "translation", "text"] as const;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function cleanText(v: unknown, label: string): string | undefined {
  if (v === undefined || v === null) return undefined;
  if (typeof v !== "string")
    throw new Error(`Field "${label}" harus berupa teks`);
  const t = v.trim();
  return t ? t : undefined;
}

function cleanId(v: unknown): string {
  if (v === undefined || v === null) return "";
  if (typeof v !== "string") throw new Error("ID blok harus berupa teks");
  return v;
}

// Validasi + normalisasi data blok (mis. dari JSON kolom DB / form admin).
// Field tak dikenal diabaikan; string kosong dianggap tidak terisi.
// Throw Error berbahasa Indonesia bila tidak valid.
export function parseBlocks(raw: unknown): ArticleBlocks {
  if (!isRecord(raw)) throw new Error("Data blok artikel tidak valid");
  const { sections } = raw;
  if (!Array.isArray(sections) || sections.length === 0)
    throw new Error("Artikel harus memiliki minimal satu bagian");
  return {
    sections: sections.map((s, si) => {
      if (!isRecord(s)) throw new Error(`Bagian ke-${si + 1} tidak valid`);
      const title = cleanText(s.title, "judul bagian");
      if (!title) throw new Error(`Judul bagian ke-${si + 1} wajib diisi`);
      const { units } = s;
      if (!Array.isArray(units) || units.length === 0)
        throw new Error(
          `Bagian "${title}" harus memiliki minimal satu unit bacaan`,
        );
      return {
        id: cleanId(s.id),
        title,
        units: units.map((u, ui) => {
          if (!isRecord(u))
            throw new Error(
              `Unit ke-${ui + 1} pada bagian "${title}" tidak valid`,
            );
          const unit: ArticleUnit = { id: cleanId(u.id) };
          for (const f of BLOCK_FIELDS) {
            const val = cleanText(u[f], f);
            if (val !== undefined) unit[f] = val;
          }
          if (!unit.arab && !unit.latin && !unit.translation && !unit.text)
            throw new Error(
              `Unit ke-${ui + 1} pada bagian "${title}" wajib memiliki minimal satu field terisi`,
            );
          return unit;
        }),
      };
    }),
  };
}

// Turunan teks polos dari blok: untuk kolom body (search, SEO, sitemap).
// Field per unit digabung sesuai urutan arab -> latin -> translation -> text;
// antar unit dipisah baris kosong.
export function blocksToPlainText(blocks: ArticleBlocks): string {
  return blocks.sections
    .map((s) =>
      s.units
        .map((u) =>
          [u.arab, u.latin, u.translation, u.text]
            .filter((f): f is string => !!f)
            .join("\n"),
        )
        .join("\n\n"),
    )
    .join("\n\n");
}

// Anchor per section untuk daftar isi: "bagian-<slug-judul>".
// Judul duplikat mendapat suffix -2, -3, dst agar tidak tabrakan.
export function sectionAnchorIds(blocks: ArticleBlocks): string[] {
  const used = new Set<string>();
  return blocks.sections.map((s, i) => {
    // slugify mengembalikan "artikel" bila judul tidak mengandung karakter latin
    // yang bisa di-slug (mis. judul Arab murni) -> fallback berbasis posisi section
    // agar anchor tetap unik dan tidak menyesatkan. Judul yang memang bertuliskan
    // "Artikel" ikut memakai fallback; ini dapat diterima karena anchor hanya
    // perlu unik dan berfungsi sebagai target link.
    const slug = slugify(s.title);
    const base = slug === "artikel" ? `bagian-${i + 1}` : `bagian-${slug}`;
    // Dedup lintas semua anchor yang sudah dipakai, bukan per-base saja, supaya
    // fallback ("bagian-2") tidak bertabrakan dengan slug normal ("bagian-2"
    // dari judul "2") dan judul seperti "Niat-2" vs "Niat".
    let anchor = base;
    let n = 2;
    while (used.has(anchor)) {
      anchor = `${base}-${n}`;
      n++;
    }
    used.add(anchor);
    return anchor;
  });
}
