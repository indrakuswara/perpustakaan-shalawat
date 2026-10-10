// Model cetak murni untuk halaman unduh PDF (/baca/<slug>/cetak).
// Menormalkan blocks/body artikel menjadi struktur siap-render:
// lapis kosong dibuang, unit & section hampa dibuang, body polos
// dipecah menjadi paragraf. Fungsi murni — diuji di scripts/test-print-model.ts.
import type { ArticleBlocks, ArticleUnit } from "./db-types.ts";

export interface PrintUnit {
  arab?: string;
  latin?: string;
  translation?: string;
  english?: string;
  text?: string;
}

export interface PrintSection {
  title: string;
  units: PrintUnit[];
}

export interface PrintModel {
  sections: PrintSection[];
  paragraphs: string[];
}

const LAYERS = ["arab", "latin", "translation", "english", "text"] as const;

function cleanUnit(unit: ArticleUnit): PrintUnit | null {
  const out: PrintUnit = {};
  for (const key of LAYERS) {
    const value = unit[key]?.trim();
    if (value) out[key] = value;
  }
  return Object.keys(out).length > 0 ? out : null;
}

export function buildPrintModel(input: {
  blocks: ArticleBlocks | null;
  body: string;
}): PrintModel {
  const { blocks, body } = input;
  if (blocks && blocks.sections.length > 0) {
    const sections: PrintSection[] = [];
    for (const section of blocks.sections) {
      const units = section.units
        .map(cleanUnit)
        .filter((u): u is PrintUnit => u !== null);
      if (units.length > 0) sections.push({ title: section.title, units });
    }
    if (sections.length > 0) return { sections, paragraphs: [] };
  }
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  return { sections: [], paragraphs };
}
