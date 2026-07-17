import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import { sectors } from "@/content/sectors";
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
  return pageMetadata(locale, "/sectors", dict.nav.sectors, dict.brand.tagline);
}

export default async function SectorsPage({
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
          sectors.map((sector) => ({
            name: sector.name[locale],
            url: localeUrl(locale, `/sectors/${sector.slug}`),
          }))
        )}
      />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl font-bold text-navy-900">
          {dict.sections.sectors}
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {sectors.map((sector) => (
            <Link
              key={sector.slug}
              href={`/${locale}/sectors/${sector.slug}`}
              className="group rounded-xl border border-sand-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-navy-900 group-hover:text-gold-600">
                {sector.name[locale]}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {sector.context[locale]}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}
