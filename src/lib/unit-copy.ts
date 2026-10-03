import type { ArticleUnit } from "./db-types.ts";

// Format teks salinan untuk SATU unit (bait): semua lapis yang terisi
// digabung berurutan arab -> latin -> terjemahan -> english -> text,
// TANPA label apa pun ("Artinya:" / "English:" dihilangkan atas
// permintaan Juple 2026-10-03 — hasil paste harus teks bersih saja).
// Lapis kosong / whitespace-only di-skip total: tidak ada baris
// kosong ganda. Fungsi murni: scripts/test-unit-copy.ts
export function formatUnitForCopy(unit: ArticleUnit): string {
  const lines: string[] = [];
  const push = (value: string | undefined) => {
    const v = value?.trim();
    if (v) lines.push(v);
  };
  push(unit.arab);
  push(unit.latin);
  push(unit.translation);
  push(unit.english);
  push(unit.text);
  return lines.join("\n");
}
