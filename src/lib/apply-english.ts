import type { ArticleBlocks } from "./db-types.ts";

// Pasang layer `english` ke blocks secara posisional: english[si][ui]
// berlaku untuk sections[si].units[ui]. String kosong/whitespace berarti
// "sengaja dikosongkan" — field english TIDAK dipasang pada unit itu.
// Jumlah section dan jumlah unit per section WAJIB persis sama dengan
// blocks; selisih apa pun melempar error (pemanggil batal, tidak menulis).
// Murni: input tidak dimutasi, hasil adalah salinan baru.
export function applyEnglishToBlocks(
  blocks: ArticleBlocks,
  english: string[][],
): ArticleBlocks {
  if (english.length !== blocks.sections.length) {
    throw new Error(
      `Jumlah section payload (${english.length}) != blocks (${blocks.sections.length})`,
    );
  }
  const out: ArticleBlocks = JSON.parse(JSON.stringify(blocks));
  out.sections.forEach((section, si) => {
    const payloadSection = english[si];
    if (payloadSection.length !== section.units.length) {
      throw new Error(
        `Jumlah unit section ${si} payload (${payloadSection.length}) != blocks (${section.units.length})`,
      );
    }
    section.units.forEach((unit, ui) => {
      const value = payloadSection[ui]?.trim();
      if (value) unit.english = value;
    });
  });
  return out;
}
