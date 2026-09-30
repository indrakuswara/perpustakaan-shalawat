// Fetch + parse Maulid Diba'i dari terjemahkitab.com menjadi ArticleBlocks.
// Dipakai oleh scripts/import-terjemahkitab.ts (one-shot lokal) dan
// src/app/api/admin/import-diba/route.ts (import sementara via production).
import { get } from "node:https";
import { randomUUID } from "node:crypto";
import { parseBlocks, type ArticleBlocks } from "./db-types.ts";

export const DIBA_SOURCE_URL =
  "https://terjemahkitab.com/terjemah-maulid-diba/";

// Batas section [start, end) dalam indeks unit, dari analisis struktur Diba'i.
const SECTIONS: Array<[number, number, string]> = [
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

// Tiap <p> sumber = Arab + terjemah menempel; terjemah selalu diawali huruf Latin.
function splitUnit(text: string): { arab: string; translation: string } {
  const m = /[a-zA-Z]/.exec(text);
  if (!m) return { arab: text, translation: "" };
  return {
    arab: text.slice(0, m.index).trim(),
    translation: text.slice(m.index).trim(),
  };
}

export async function fetchDibaBlocks(): Promise<ArticleBlocks> {
  const html = await fetchHtml(DIBA_SOURCE_URL);
  const article = /<article[\s\S]*?<\/article>/.exec(html)?.[0];
  if (!article) throw new Error("Elemen <article> tidak ditemukan");
  const clean = article
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "");
  const paragraphs = [...clean.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)]
    .map((m) => stripTags(m[1]))
    .filter((t) => t.length > 0);

  const units = paragraphs.map((t) => {
    const { arab, translation } = splitUnit(t);
    return { id: randomUUID(), arab, translation };
  });

  const blocks: ArticleBlocks = {
    sections: SECTIONS.map(([start, end, title]) => ({
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
      `Unit tak terpetakan: ${units.length - total} (cek batas SECTIONS)`,
    );
  parseBlocks(blocks); // validasi skema; throw bila invalid
  return blocks;
}
