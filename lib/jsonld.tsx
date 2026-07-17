import {
  founderName,
  siteName,
  siteUrl,
  socialLinks,
  type Locale,
} from "@/lib/i18n";

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

/** The founder as a Person, for author/E-E-A-T attribution. */
export function founderPerson(locale: Locale) {
  return {
    "@type": "Person",
    name: founderName[locale],
    url: localeUrl(locale, "/about"),
    jobTitle: locale === "ar" ? "المؤسس" : "Founder",
    worksFor: organizationRef(),
    sameAs: [socialLinks.linkedin, socialLinks.x],
  };
}

export function itemList(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function faqPage(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
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
