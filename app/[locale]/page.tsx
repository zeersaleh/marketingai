import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import { services } from "@/content/services";
import { sectors } from "@/content/sectors";
import { posts } from "@/content/posts";
import CtaBand from "@/components/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata(locale, "", dict.brand.tagline, dict.brand.subline);
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const latest = posts.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-950 text-sand-50">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            {dict.brand.tagline}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-navy-100/90">
            {dict.brand.subline}
          </p>
          <p className="mt-6 max-w-2xl border-s-4 border-gold-500 ps-4 text-sm leading-relaxed text-navy-100/80">
            {dict.hero.credibility}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/tools/readiness-scorecard`}
              className="rounded-md bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-300"
            >
              {dict.hero.primaryCta}
            </Link>
            <Link
              href={`/${locale}/book-a-call`}
              className="rounded-md border border-navy-100/40 px-5 py-3 text-sm font-semibold text-sand-50 hover:border-gold-500"
            >
              {dict.hero.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Four shared problems */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold text-navy-900">
          {dict.problems.heading}
        </h2>
        <p className="mt-2 max-w-2xl text-ink-600">{dict.problems.sub}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dict.problems.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-sand-200 bg-white p-5 shadow-sm"
            >
              <h3 className="font-semibold text-navy-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-sand-100">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-bold text-navy-900">
              {dict.sections.services}
            </h2>
            <Link
              href={`/${locale}/services`}
              className="text-sm font-semibold text-gold-600 hover:text-navy-900"
            >
              {dict.sections.allServices}
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* Sector strip */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-bold text-navy-900">
            {dict.sections.sectors}
          </h2>
          <Link
            href={`/${locale}/sectors`}
            className="text-sm font-semibold text-gold-600 hover:text-navy-900"
          >
            {dict.sections.allSectors}
          </Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => (
            <Link
              key={sector.slug}
              href={`/${locale}/sectors/${sector.slug}`}
              className="rounded-lg border border-sand-200 bg-white px-4 py-3 text-sm font-semibold text-navy-900 shadow-sm transition-colors hover:border-gold-500"
            >
              {sector.name[locale]}
            </Link>
          ))}
        </div>
      </section>

      {/* Methodology strip (capability proof pre-case-studies) */}
      <section className="bg-navy-900 text-sand-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-bold">{dict.sections.methodology}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {dict.methodology.steps.map((step, i) => (
              <div key={step.title}>
                <p className="text-4xl font-bold text-gold-500">{i + 1}</p>
                <h3 className="mt-2 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-100/80">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest insights */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-bold text-navy-900">
            {dict.sections.latestInsights}
          </h2>
          <Link
            href={`/${locale}/insights`}
            className="text-sm font-semibold text-gold-600 hover:text-navy-900"
          >
            {dict.sections.allInsights}
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/insights/${post.slug}`}
              className="group rounded-xl border border-sand-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                {post.pillar[locale]}
              </p>
              <h3 className="mt-2 font-semibold leading-snug text-navy-900 group-hover:text-gold-600">
                {post.title[locale]}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {post.excerpt[locale]}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
