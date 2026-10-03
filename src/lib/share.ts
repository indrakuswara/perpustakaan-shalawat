// Helper murni untuk fitur Bagikan: teks + tautan share per kanal.
// Dipakai komponen client ShareButton — logika di sini supaya bisa
// di-test: scripts/test-share.ts
export const SITE_NAME = "Perpustakaan Digital Shalawat & Maulid";

export function buildShareText(title: string): string {
  const t = title.trim();
  return t ? `${t} — ${SITE_NAME}` : SITE_NAME;
}

export interface ShareLinks {
  text: string;
  whatsapp: string;
  telegram: string;
}

export function buildShareLinks(title: string, url: string): ShareLinks {
  const text = buildShareText(title);
  return {
    text,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  };
}
