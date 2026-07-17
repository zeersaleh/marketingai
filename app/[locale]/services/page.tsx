import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import { services } from "@/content/services";
import { JsonLd, itemList, localeUrl } from "@/lib/jsonld";
import CtaBand from "@/components/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata(
    locale,
    "/services",
    dict.nav.services,
    dict.brand.tagline
  );
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <>
      <JsonLd
        data={itemList(
          services.map((service) => ({
            name: service.name[locale],
            url: localeUrl(locale, `/services/${service.slug}`),
          }))
        )}
      />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl font-bold text-navy-900">
          {dict.sections.services}
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${locale}/services/${service.slug}`}
              className="group rounded-xl border border-sand-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-navy-900 group-hover:text-gold-600">
                {service.name[locale]}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {service.short[locale]}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-600">
                {service.problem[locale]}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}
