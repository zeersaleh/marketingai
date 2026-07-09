import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/lib/i18n";
import { services } from "@/content/services";
import { sectors } from "@/content/sectors";
import { posts } from "@/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about",
    "/services",
    "/sectors",
    "/tools",
    "/tools/readiness-scorecard",
    "/insights",
    "/subscribe",
    "/book-a-call",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const dynamicPaths = [
    ...services.map((s) => `/services/${s.slug}`),
    ...sectors.map((s) => `/sectors/${s.slug}`),
    ...posts.map((p) => `/insights/${p.slug}`),
  ];

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: `${siteUrl}/en${path}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteUrl}/${l}${path}`])
      ),
    },
  }));
}
