// Base URL publik situs (untuk URL kanonis share + metadata OG).
// Production membaca SITE_URL dari env Vercel; fallback ke domain
// production supaya lokal pun menghasilkan URL yang benar.
// Trailing slash selalu dibuang: env Vercel terpasang dengan slash
// di akhir, dan pemakaian `${SITE_URL}/baca/...` menghasilkan
// double slash kalau tidak dinormalisasi.
export function normalizeSiteUrl(raw: string | undefined): string {
  return (raw ?? "https://perpustakaan-shalawat.vercel.app").replace(
    /\/+$/,
    "",
  );
}

export const SITE_URL = normalizeSiteUrl(process.env.SITE_URL);
