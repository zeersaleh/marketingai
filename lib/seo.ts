import type { Metadata } from "next";
import { locales, siteName, siteUrl, type Locale } from "@/lib/i18n";

/**
 * Build page metadata with hreflang alternates. `path` is the
 * locale-relative path starting with "/" (e.g. "/services/market-entry-strategy"),
 * or "" for the locale home page.
 */
export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string
): Metadata {
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${siteUrl}/${l}${path}`])
  );
  return {
    title: { absolute: `${title} | ${siteName[locale]}` },
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}${path}`,
      languages: { ...languages, "x-default": `${siteUrl}/en${path}` },
    },
    openGraph: {
      title,
      description,
      siteName: siteName[locale],
      locale: locale === "ar" ? "ar_SY" : "en_US",
      type: "website",
      url: `${siteUrl}/${locale}${path}`,
    },
  };
}
