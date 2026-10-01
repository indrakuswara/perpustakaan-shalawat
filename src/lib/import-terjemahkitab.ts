// Fetch + parse artikel maulid dari terjemahkitab.com menjadi ArticleBlocks.
// Dipakai oleh scripts/import-terjemahkitab.ts (one-shot lokal) dan
// rute admin sementara (import via production, lalu dihapus).
import { get } from "node:https";
import { randomUUID } from "node:crypto";
import { parseBlocks, type ArticleBlocks } from "./db-types.ts";

export const DIBA_SOURCE_URL =
  "https://terjemahkitab.com/terjemah-maulid-diba/";
export const SIMTUDDUROR_SOURCE_URL =
  "https://terjemahkitab.com/terjemah-maulid-simtudduror/";

// Batas section Diba'i [start, end) dalam indeks paragraf.
// Ditentukan manual dari struktur halaman sumber; total harus mencakup semua paragraf.
const DIBA_SECTIONS: Array<[number, number, string]> = [
  [0, 12, "Shalawat Pembuka"],
  [12, 19, "Ayat-Ayat Al-Qur'an"],
  [19, 40, "Qasidah Pujian Nabi"],
  [40, 63, "Muqaddimah"],
  [63, 75, "Fashl: Cahaya Nabi Muhammad"],
  [75, 119, "Sifat-Sifat Nabi Muhammad"],
  [119, 201, "Kelahiran Nabi Muhammad"],
  [201, 240, "Mahallul Qiyam"],
  [240, 371, "Sirah dan Akhlak Nabi"],
  [371, 392, "Isra' Mi'raj"],
  [392, 444, "Doa Penutup"],
];

const SIMTUDDUROR_TITLES = [
  "Shalawat Pembuka",
  "Muqaddimah",
  "Keagungan Allah",
  "Dua Kalimat Syahadat",
  "Cahaya Nabi Muhammad",
  "Silsilah Cahaya Nabi",
  "Menjelang Kelahiran",
  "Kelahiran Nabi Muhammad",
  "Qasidah Kelahiran",
  "Keajaiban Kelahiran",
  "Masa Penyusuan",
  "Masa Kanak-Kanak",
  "Wahyu dan Dakwah",
  "Isra' Mi'raj",
  "Sifat-Sifat Nabi Muhammad",
  "Akhlak Nabi Muhammad",
  "Doa Penutup",
];

function fetchHtml(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    get(
      url,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
          "Accept-Encoding": "identity",
        },
      },
      (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} dari ${url}`));
          return;
        }
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve(data));
      },
    ).on("error", reject);
  });
}

function stripTags(s: string): string {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractParagraphs(html: string): string[] {
  const article = /<article[\s\S]*?<\/article>/.exec(html)?.[0];
  if (!article) throw new Error("Elemen <article> tidak ditemukan");
  const clean = article
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "");
  return [...clean.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)]
    .map((m) => stripTags(m[1]))
    .filter((t) => t.length > 0);
}

// Tiap <p> sumber umumnya = Arab + terjemah; terjemah diawali huruf Latin.
// Paragraf murni Arab (tanpa Latin) atau murni terjemah tetap jadi satu unit.
function splitUnit(text: string): { arab: string; translation: string } {
  const m = /[a-zA-Z]/.exec(text);
  if (!m) return { arab: text, translation: "" };
  return {
    arab: text.slice(0, m.index).trim(),
    translation: text.slice(m.index).trim(),
  };
}

interface ParsedUnit {
  id: string;
  arab: string;
  translation: string;
}

function toUnits(paragraphs: string[]): ParsedUnit[] {
  return paragraphs.map((t) => {
    const { arab, translation } = splitUnit(t);
    return { id: randomUUID(), arab, translation };
  });
}

function buildBlocks(
  units: ParsedUnit[],
  sections: Array<[number, number, string]>,
): ArticleBlocks {
  const blocks: ArticleBlocks = {
    sections: sections.map(([start, end, title]) => ({
      id: randomUUID(),
      title,
      units: units.slice(start, end).map((u) => ({
        id: u.id,
        ...(u.arab ? { arab: u.arab } : {}),
        ...(u.translation ? { translation: u.translation } : {}),
      })),
    })),
  };
  const total = blocks.sections.reduce((n, s) => n + s.units.length, 0);
  if (total !== units.length)
    throw new Error(
      `Unit tak terpetakan: ${units.length - total} (cek batas section)`,
    );
  parseBlocks(blocks); // validasi skema; throw bila invalid
  return blocks;
}

export async function fetchDibaBlocks(): Promise<ArticleBlocks> {
  const html = await fetchHtml(DIBA_SOURCE_URL);
  const units = toUnits(extractParagraphs(html));
  return buildBlocks(units, DIBA_SECTIONS);
}

// ---------------------------------------------------------------------------
// Simtudduror
// ---------------------------------------------------------------------------
// Halaman sumber memakai 17 Elementor toggle = 17 fasal kitab.
// Tiap toggle: judul = baris Arab pembuka fasal; isi = paragraf yang SELALU
// berurutan terjemah, Arab, terjemah, Arab, ... (diverifikasi terhadap halaman
// asli; parse melempar bila pola ini berubah).
// Unit dibentuk berpasangan: (judul Arab + terjemah paragraf pertama),
// lalu (Arab + terjemah) untuk sisanya. Refrain penutup fasal ikut menjadi
// satu unit normal di akhir section-nya.

export interface SimtuddurorToggle {
  title: string;
  paragraphs: string[];
}

const hasArabic = (t: string) => /[\u0600-\u06FF]/.test(t);
const hasLatin = (t: string) => /[a-zA-Z]/.test(t);

export function extractSimtuddurorToggles(html: string): SimtuddurorToggle[] {
  const toggles: SimtuddurorToggle[] = [];
  const re =
    /elementor-toggle-title"[^>]*>(.*?)<\/a>[\s\S]*?elementor-tab-content[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const title = stripTags(m[1]);
    const paragraphs = [...m[2].matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)]
      .map((p) => stripTags(p[1]))
      .filter((t) => t.length > 0);
    if (title) toggles.push({ title, paragraphs });
  }
  return toggles;
}

export function simtuddurorBlocksFromToggles(
  toggles: SimtuddurorToggle[],
): ArticleBlocks {
  if (toggles.length !== SIMTUDDUROR_TITLES.length) {
    throw new Error(
      `Jumlah fasal Simtudduror berubah: ${toggles.length} (ekspektasi ${SIMTUDDUROR_TITLES.length})`,
    );
  }
  const sections = toggles.map((toggle, k) => {
    const { title, paragraphs } = toggle;
    if (paragraphs.length === 0)
      throw new Error(`Fasal ${k + 1} (${title}) tidak punya isi`);
    // Paragraf isi harus berurutan: terjemah, Arab, terjemah, Arab, ...
    paragraphs.forEach((p, j) => {
      const expectLatinOnly = j % 2 === 0;
      const ok = expectLatinOnly
        ? hasLatin(p) && !hasArabic(p)
        : hasArabic(p) && !hasLatin(p);
      if (!ok)
        throw new Error(
          `Pola paragraf fasal ${k + 1} berubah di indeks ${j}: "${p.slice(0, 40)}..."`,
        );
    });
    const units: Array<{ id: string; arab?: string; translation?: string }> = [
      { id: randomUUID(), arab: title, translation: paragraphs[0] },
    ];
    for (let j = 1; j < paragraphs.length; j += 2) {
      units.push({
        id: randomUUID(),
        arab: paragraphs[j],
        ...(paragraphs[j + 1] ? { translation: paragraphs[j + 1] } : {}),
      });
    }
    return { id: randomUUID(), title: SIMTUDDUROR_TITLES[k], units };
  });
  const blocks: ArticleBlocks = { sections };
  parseBlocks(blocks); // validasi skema; throw bila invalid
  return blocks;
}

export async function fetchSimtuddurorBlocks(): Promise<ArticleBlocks> {
  const html = await fetchHtml(SIMTUDDUROR_SOURCE_URL);
  return simtuddurorBlocksFromToggles(extractSimtuddurorToggles(html));
}
