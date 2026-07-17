import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/lib/i18n";
import { services } from "@/content/services";
import { sectors } from "@/content/sectors";
import { getAllPosts } from "@/lib/posts";

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

  const posts = getAllPosts();
  const entries: { path: string; lastModified: Date }[] = [
    ...[...staticPaths,
      ...services.map((s) => `/services/${s.slug}`),
      ...sectors.map((s) => `/sectors/${s.slug}`),
    ].map((path) => ({ path, lastModified: new Date() })),
    ...posts.map((p) => ({
      path: `/insights/${p.slug}`,
      lastModified: new Date(p.date),
    })),
  ];

  // One <url> entry per locale per path — Google expects every language
  // version listed as its own entry, each carrying the full alternate set.
  return locales.flatMap((locale) =>
    entries.map(({ path, lastModified }) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((l) => [l, `${siteUrl}/${l}${path}`])
          ),
          "x-default": `${siteUrl}/en${path}`,
        },
      },
    }))
  );
}
