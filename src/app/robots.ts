import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const base = SITE_URL;
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
