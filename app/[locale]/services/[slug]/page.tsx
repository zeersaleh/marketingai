import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import { getService, services } from "@/content/services";
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
    services.map((service) => ({ locale, slug: service.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!isLocale(locale) || !service) return {};
  return pageMetadata(
    locale,
    `/services/${slug}`,
    service.name[locale],
    service.short[locale]
  );
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const dict = getDictionary(locale);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name[locale],
    description: service.short[locale],
    provider: organizationRef(),
    areaServed: ["Syria", "Saudi Arabia", "Gulf Cooperation Council"],
    url: localeUrl(locale, `/services/${slug}`),
  };

  const breadcrumbJsonLd = breadcrumbList([
    { name: locale === "ar" ? "الرئيسية" : "Home", url: localeUrl(locale, "") },
    { name: dict.nav.services, url: localeUrl(locale, "/services") },
    { name: service.name[locale], url: localeUrl(locale, `/services/${slug}`) },
  ]);

  const labels =
    locale === "ar"
      ? { problem: "المشكلة", approach: "منهجنا", deliverables: "المخرجات", forWho: "لمن هذه الخدمة", faq: "الأسئلة الشائعة" }
      : { problem: "The problem", approach: "Our approach", deliverables: "Deliverables", forWho: "Who it's for", faq: "Frequently asked questions" };

  const faqJsonLd = faqPage(
    service.faqs.map((faq) => ({
      question: faq.question[locale],
      answer: faq.answer[locale],
    }))
  );

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <section className="bg-navy-950 text-sand-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="max-w-3xl text-4xl font-bold">{service.name[locale]}</h1>
          <p className="mt-3 max-w-2xl text-lg text-navy-100/90">
            {service.short[locale]}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl gap-10 px-4 py-16 lg:grid lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gold-600">
              {labels.problem}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-900">
              {service.problem[locale]}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gold-600">
              {labels.approach}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-900">
              {service.approach[locale]}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gold-600">
              {labels.deliverables}
            </h2>
            <ul className="mt-3 space-y-2">
              {service.deliverables[locale].map((item) => (
                <li
                  key={item}
                  className="rounded-md border-s-4 border-gold-500 bg-white p-3 text-sm text-ink-900 shadow-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gold-600">
              {labels.forWho}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-900">
              {service.forWho[locale]}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gold-600">
              {labels.faq}
            </h2>
            <div className="mt-3 space-y-6">
              {service.faqs.map((faq) => (
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
          </div>
        </div>

        <aside className="mt-10 lg:mt-0">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gold-600">
            {dict.sections.tiersHeading}
          </h2>
          <div className="mt-3 space-y-4">
            {service.tiers.map((tier) => (
              <div
                key={tier.name.en}
                className="rounded-xl border border-sand-200 bg-white p-5 shadow-sm"
              >
                <h3 className="font-semibold text-navy-900">
                  {tier.name[locale]}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-600">
                  {tier.audience[locale]}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {tier.description[locale]}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
