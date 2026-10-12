import type { MetadataRoute } from "next";
import { listPublishedContents, parseDbDateTime } from "@/lib/db";
import { SITE_URL } from "@/lib/site-url";

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
