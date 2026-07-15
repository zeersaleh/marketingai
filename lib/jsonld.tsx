import { siteName, siteUrl, type Locale } from "@/lib/i18n";

export function localeUrl(locale: Locale, path: string): string {
  return `${siteUrl}/${locale}${path}`;
}

/** The site's identity, for use as a `provider`/`publisher` reference. */
export function organizationRef() {
  return {
    "@type": "Organization",
    name: siteName.en,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
  };
}

export function breadcrumbList(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Renders a JSON-LD object as an inline `<script>` tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
