import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import { getSector, sectors } from "@/content/sectors";
import { getService } from "@/content/services";
import CtaBand from "@/components/CtaBand";
import {
  JsonLd,
  breadcrumbList,
  faqPage,
  localeUrl,
  organizationRef,
} from "@/lib/jsonld";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    sectors.map((sector) => ({ locale, slug: sector.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const sector = getSector(slug);
  if (!isLocale(locale) || !sector) return {};
  return pageMetadata(
    locale,
    `/sectors/${slug}`,
    sector.name[locale],
    sector.context[locale]
  );
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const sector = getSector(slug);
  if (!sector) notFound();
  const dict = getDictionary(locale);

  const sectorJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: sector.name[locale],
    description: sector.context[locale],
    provider: organizationRef(),
    areaServed: ["Syria", "Saudi Arabia", "Gulf Cooperation Council"],
    url: localeUrl(locale, `/sectors/${slug}`),
  };

  const breadcrumbJsonLd = breadcrumbList([
    { name: locale === "ar" ? "الرئيسية" : "Home", url: localeUrl(locale, "") },
    { name: dict.nav.sectors, url: localeUrl(locale, "/sectors") },
    { name: sector.name[locale], url: localeUrl(locale, `/sectors/${slug}`) },
  ]);

  const needsHeading =
    locale === "ar"
      ? "ما يحتاجه هذا القطاع من التسويق والاتصالات"
      : "What this sector needs from marketing & communications";
  const faqHeading =
    locale === "ar" ? "الأسئلة الشائعة" : "Frequently asked questions";

  const faqJsonLd = faqPage(
    sector.faqs.map((faq) => ({
      question: faq.question[locale],
      answer: faq.answer[locale],
    }))
  );

  return (
    <>
      <JsonLd data={sectorJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <section className="bg-navy-950 text-sand-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="max-w-3xl text-4xl font-bold">{sector.name[locale]}</h1>
          <p className="mt-3 max-w-2xl text-lg text-navy-100/90">
            {sector.context[locale]}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gold-600">
          {needsHeading}
        </h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {sector.needs[locale].map((need) => (
            <li
              key={need}
              className="rounded-xl border border-sand-200 bg-white p-5 text-sm leading-relaxed text-ink-900 shadow-sm"
            >
              {need}
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-sm font-semibold uppercase tracking-wide text-gold-600">
          {dict.sections.relatedServices}
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {sector.serviceSlugs.map((serviceSlug) => {
            const service = getService(serviceSlug);
            if (!service) return null;
            return (
              <Link
                key={service.slug}
                href={`/${locale}/services/${service.slug}`}
                className="group rounded-xl border border-sand-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="font-semibold text-navy-900 group-hover:text-gold-600">
                  {service.name[locale]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {service.short[locale]}
                </p>
              </Link>
            );
          })}
        </div>

        <h2 className="mt-12 text-sm font-semibold uppercase tracking-wide text-gold-600">
          {faqHeading}
        </h2>
        <div className="mt-4 space-y-6">
          {sector.faqs.map((faq) => (
            <div key={faq.question.en}>
              <h3 className="font-semibold text-navy-900">
                {faq.question[locale]}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-900">
                {faq.answer[locale]}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
