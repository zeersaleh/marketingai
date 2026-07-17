import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/i18n";

export default function robots(): MetadataRoute.Robots {
  // Staging must never be indexed; production allows everything but the API.
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === "staging") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      // Explicitly welcome major AI crawlers so their access is on the
      // record rather than resolved via the wildcard rule above. A bot
      // matching its own group ignores the "*" group, so /api/ is
      // repeated here to keep it off-limits for these crawlers too.
      { userAgent: "GPTBot", allow: "/", disallow: "/api/" },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: "/api/" },
      { userAgent: "ClaudeBot", allow: "/", disallow: "/api/" },
      { userAgent: "PerplexityBot", allow: "/", disallow: "/api/" },
      { userAgent: "Google-Extended", allow: "/", disallow: "/api/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
