import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import { services } from "@/content/services";
import { sectors } from "@/content/sectors";
import { getAllPosts } from "@/lib/posts";
import { postsForPillars, SYRIA_PILLARS } from "@/lib/route-content";
import CtaBand from "@/components/CtaBand";
import {
  JsonLd,
  breadcrumbList,
  localeUrl,
  organizationRef,
} from "@/lib/jsonld";

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
    "/entering-syria",
    dict.syriaRoute.heading,
    dict.syriaRoute.sub
  );
}

export default async function EnteringSyriaPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const routeServices = services.filter((s) => s.route === "syria");
  const posts = postsForPillars(getAllPosts(), SYRIA_PILLARS, 3);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: dict.syriaRoute.heading,
    description: dict.syriaRoute.sub,
    provider: organizationRef(),
    areaServed: ["Syria"],
    url: localeUrl(locale, "/entering-syria"),
  };

  const breadcrumbJsonLd = breadcrumbList([
    { name: locale === "ar" ? "الرئيسية" : "Home", url: localeUrl(locale, "") },
    {
      name: dict.syriaRoute.heading,
      url: localeUrl(locale, "/entering-syria"),
    },
  ]);

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Hero */}
      <section className="bg-navy-950 text-sand-50">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-500">
            {dict.syriaRoute.label}
          </p>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            {dict.syriaRoute.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-navy-100/90">
            {dict.syriaRoute.sub}
          </p>
          <p className="mt-6 max-w-2xl border-s-4 border-gold-500 ps-4 text-sm leading-relaxed text-navy-100/80">
            {dict.hero.credibility}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/tools/readiness-scorecard`}
              className="rounded-md bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-300"
            >
              {dict.syriaRoute.cta}
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

      {/* Methodology strip */}
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

      {/* Services for this route */}
      <section className="bg-sand-100">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-bold text-navy-900">
              {dict.syriaRoute.servicesHeading}
            </h2>
            <Link
              href={`/${locale}/services`}
              className="text-sm font-semibold text-gold-600 hover:text-navy-900"
            >
              {dict.sections.allServices}
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {routeServices.map((service) => (
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

      {/* Diagnostic */}
      <section className="bg-sand-100">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <Link
            href={`/${locale}/tools/readiness-scorecard`}
            className="group block rounded-xl border-2 border-gold-500 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h2 className="text-2xl font-semibold text-navy-900 group-hover:text-gold-600">
              {dict.tools.scorecardTitle}
            </h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-ink-600">
              {dict.tools.scorecardDesc}
            </p>
            <span className="mt-4 inline-block rounded-md bg-navy-900 px-5 py-2 text-sm font-semibold text-sand-50">
              {dict.tools.startTool}
            </span>
          </Link>
        </div>
      </section>

      {/* Insights for this route */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-bold text-navy-900">
            {dict.syriaRoute.insightsHeading}
          </h2>
          <Link
            href={`/${locale}/insights`}
            className="text-sm font-semibold text-gold-600 hover:text-navy-900"
          >
            {dict.sections.allInsights}
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
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
