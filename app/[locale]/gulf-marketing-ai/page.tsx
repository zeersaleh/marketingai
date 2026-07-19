import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import { services } from "@/content/services";
import { getAllPosts } from "@/lib/posts";
import { postsForPillars, GULF_PILLARS } from "@/lib/route-content";
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
    "/gulf-marketing-ai",
    dict.gulfRoute.heading,
    dict.gulfRoute.sub
  );
}

export default async function GulfMarketingAiPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const routeServices = services.filter((s) => s.route === "gulf");
  const posts = postsForPillars(getAllPosts(), GULF_PILLARS, 3);

  const upcoming = [
    { title: dict.tools.roiTitle, desc: dict.tools.roiDesc },
    { title: dict.tools.inactionTitle, desc: dict.tools.inactionDesc },
    { title: dict.tools.roadmapTitle, desc: dict.tools.roadmapDesc },
  ];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: dict.gulfRoute.heading,
    description: dict.gulfRoute.sub,
    provider: organizationRef(),
    areaServed: ["Saudi Arabia", "Gulf Cooperation Council"],
    url: localeUrl(locale, "/gulf-marketing-ai"),
  };

  const breadcrumbJsonLd = breadcrumbList([
    { name: locale === "ar" ? "الرئيسية" : "Home", url: localeUrl(locale, "") },
    {
      name: dict.gulfRoute.heading,
      url: localeUrl(locale, "/gulf-marketing-ai"),
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
            {dict.gulfRoute.label}
          </p>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            {dict.gulfRoute.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-navy-100/90">
            {dict.gulfRoute.sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/book-a-call`}
              className="rounded-md bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-300"
            >
              {dict.gulfRoute.cta}
            </Link>
            <Link
              href={`/${locale}/services/applied-ai-for-marketing-teams`}
              className="rounded-md border border-navy-100/40 px-5 py-3 text-sm font-semibold text-sand-50 hover:border-gold-500"
            >
              {dict.gulfRoute.programCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Four pillars */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dict.gulfRoute.bullets.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-sand-200 bg-white p-5 shadow-sm"
            >
              <h2 className="font-semibold text-navy-900">{item.title}</h2>
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
            {dict.gulfRoute.methodologySteps.map((step, i) => (
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

      {/* The program behind this route */}
      <section className="bg-sand-100">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-bold text-navy-900">
            {dict.gulfRoute.servicesHeading}
          </h2>
          {routeServices.map((service) => (
            <div key={service.slug} className="mt-8">
              <Link
                href={`/${locale}/services/${service.slug}`}
                className="group block rounded-xl border border-sand-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-2xl font-semibold text-navy-900 group-hover:text-gold-600">
                  {service.name[locale]}
                </h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-ink-600">
                  {service.short[locale]}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-gold-600 group-hover:text-navy-900">
                  {dict.gulfRoute.programCta}
                </span>
              </Link>
              <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-gold-600">
                {dict.sections.tiersHeading}
              </h3>
              <div className="mt-3 grid gap-4 md:grid-cols-3">
                {service.tiers.map((tier) => (
                  <div
                    key={tier.name.en}
                    className="rounded-xl border border-sand-200 bg-white p-5 shadow-sm"
                  >
                    <h4 className="font-semibold text-navy-900">
                      {tier.name[locale]}
                    </h4>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-600">
                      {tier.audience[locale]}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">
                      {tier.description[locale]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Diagnostic */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Link
          href={`/${locale}/book-a-call`}
          className="group block rounded-xl border-2 border-gold-500 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h2 className="text-2xl font-semibold text-navy-900 group-hover:text-gold-600">
            {dict.gulfRoute.diagnosticHeading}
          </h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-ink-600">
            {dict.gulfRoute.diagnosticBody}
          </p>
          <span className="mt-4 inline-block rounded-md bg-navy-900 px-5 py-2 text-sm font-semibold text-sand-50">
            {dict.hero.secondaryCta}
          </span>
        </Link>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {upcoming.map((tool) => (
            <div
              key={tool.title}
              className="rounded-xl border border-sand-200 bg-white p-5 opacity-80 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                {dict.tools.comingSoon}
              </p>
              <h3 className="mt-2 font-semibold text-navy-900">{tool.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {tool.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Insights for this route */}
      <section className="bg-sand-100">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-bold text-navy-900">
              {dict.gulfRoute.insightsHeading}
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
        </div>
      </section>

      <CtaBand
        locale={locale}
        heading={dict.gulfRoute.diagnosticHeading}
        sub={dict.gulfRoute.diagnosticBody}
        primaryHref={`/${locale}/book-a-call`}
        primaryLabel={dict.gulfRoute.cta}
        showSecondary={false}
      />
    </>
  );
}
