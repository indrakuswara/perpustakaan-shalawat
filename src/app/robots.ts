import type { MetadataRoute } from "next";

function baseUrl(): string {
  return (
    process.env.SITE_URL ?? "https://shalawat-lib-99.loca.lt"
  ).replace(/\/$/, "");
}

export default function robots(): MetadataRoute.Robots {
  const base = baseUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Area admin tidak boleh di-crawl/diindeks.
        disallow: ["/admin", "/admin/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
