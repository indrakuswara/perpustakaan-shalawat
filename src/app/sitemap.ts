import type { MetadataRoute } from "next";
import { listPublishedContents } from "@/lib/db";

function baseUrl(): string {
  return (
    process.env.SITE_URL ?? "https://shalawat-lib-99.loca.lt"
  ).replace(/\/$/, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = baseUrl();
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
      lastModified: new Date(a.updatedAt + "Z"),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  return urls;
}
