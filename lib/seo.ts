import type { Metadata } from "next";
import { locales, siteName, siteUrl, type Locale } from "@/lib/i18n";

export interface PageMetadataOptions {
  /** Use "article" for posts so shares carry article OG semantics. */
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Build page metadata with hreflang alternates. `path` is the
 * locale-relative path starting with "/" (e.g. "/services/market-entry-strategy"),
 * or "" for the locale home page.
 */
export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  options: PageMetadataOptions = {}
): Metadata {
  const { ogType = "website", publishedTime, modifiedTime } = options;
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${siteUrl}/${l}${path}`])
  );
  // This object replaces the layout's `openGraph` wholesale (Next.js merges
  // metadata shallowly per key), so images must be repeated here.
  const ogBase = {
    title,
    description,
    siteName: siteName[locale],
    locale: locale === "ar" ? "ar_SY" : "en_US",
    url: `${siteUrl}/${locale}${path}`,
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  };
  return {
    title: { absolute: `${title} | ${siteName[locale]}` },
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}${path}`,
      languages: { ...languages, "x-default": `${siteUrl}/en${path}` },
      types: { "application/rss+xml": `${siteUrl}/${locale}/feed.xml` },
    },
    openGraph:
      ogType === "article"
        ? { ...ogBase, type: "article", publishedTime, modifiedTime }
        : { ...ogBase, type: "website" },
  };
}
