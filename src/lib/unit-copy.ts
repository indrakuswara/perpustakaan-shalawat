import type { ArticleUnit } from "./db-types.ts";

// Format teks salinan untuk SATU unit (bait): semua lapis yang terisi
// digabung berurutan arab -> latin -> Artinya -> English -> text.
// Lapis kosong / whitespace-only di-skip total: tidak ada label yatim
// ("English:" tanpa isi) dan tidak ada baris kosong ganda.
// Fungsi murni supaya bisa di-test: scripts/test-unit-copy.ts
export function formatUnitForCopy(unit: ArticleUnit): string {
  const lines: string[] = [];
  const push = (value: string | undefined, label?: string) => {
    const v = value?.trim();
    if (v) lines.push(label ? `${label}: ${v}` : v);
  };
  push(unit.arab);
  push(unit.latin);
  push(unit.translation, "Artinya");
  push(unit.english, "English");
  push(unit.text);
  return lines.join("\n");
}
