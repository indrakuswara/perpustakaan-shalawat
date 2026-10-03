// Base URL publik situs (untuk URL kanonis share + metadata OG).
// Production membaca SITE_URL dari env Vercel; fallback ke domain
// production supaya lokal pun menghasilkan URL yang benar.
export const SITE_URL =
  process.env.SITE_URL ?? "https://perpustakaan-shalawat.vercel.app";
