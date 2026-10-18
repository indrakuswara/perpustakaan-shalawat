import type { MetadataRoute } from "next";
import { listPublishedContents, parseDbDateTime } from "@/lib/db";
import { SITE_URL } from "@/lib/site-url";

// Sitemap WAJIB digenerate ulang dari DB setiap request. Tanpa baris ini,
// Next meng-cache output sitemap saat build — artikel yang dipublish sesudah
// deploy terakhir tidak pernah masuk sitemap (kasus Lakum Busyro, Okt 2026).
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL;
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${base}/shalawat`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${base}/maulid`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${base}/search`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
  // Hanya artikel PUBLISHED yang masuk sitemap — draft tidak pernah terindeks.
  for (const a of await listPublishedContents()) {
    urls.push({
      url: `${base}/baca/${a.slug}`,
      lastModified: parseDbDateTime(a.updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  return urls;
}
