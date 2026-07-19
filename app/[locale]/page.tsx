import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import { getAllPosts } from "@/lib/posts";
import CtaBand from "@/components/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata(locale, "", dict.home.tagline, dict.home.subline);
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const latest = getAllPosts().slice(0, 3);

  const routes = [
    {
      key: "syria",
      copy: dict.syriaRoute,
      primaryHref: `/${locale}/tools/readiness-scorecard`,
      landingHref: `/${locale}/entering-syria`,
    },
    {
      key: "gulf",
      copy: dict.gulfRoute,
      primaryHref: `/${locale}/book-a-call`,
      landingHref: `/${locale}/gulf-marketing-ai`,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-950 text-sand-50">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            {dict.home.tagline}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-navy-100/90">
            {dict.home.subline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/book-a-call`}
              className="rounded-md border border-navy-100/40 px-5 py-3 text-sm font-semibold text-sand-50 hover:border-gold-500"
            >
              {dict.hero.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Two audience routes */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold text-navy-900">
          {dict.home.routesHeading}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {routes.map((route) => (
            <div
              key={route.key}
              className="flex flex-col rounded-xl border-2 border-gold-500 bg-white p-8 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                {route.copy.label}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-navy-900">
                {route.copy.heading}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {route.copy.sub}
              </p>
              <ul className="mt-5 space-y-2">
                {route.copy.bullets.map((bullet) => (
                  <li
                    key={bullet.title}
                    className="rounded-md border-s-4 border-gold-500 bg-sand-50 p-3 text-sm text-ink-900 shadow-sm"
                  >
                    <span className="font-semibold text-navy-900">
                      {bullet.title}
                    </span>
                    <span className="mt-1 block text-ink-600">
                      {bullet.body}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={route.primaryHref}
                  className="rounded-md bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-300"
                >
                  {route.copy.cta}
                </Link>
                <Link
                  href={route.landingHref}
                  className="text-sm font-semibold text-gold-600 hover:text-navy-900"
                >
                  {route.copy.secondaryCta}
                </Link>
              </div>
            </div>
          ))}
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

      <CtaBand
        locale={locale}
        heading={dict.cta.neutralBand}
        sub={dict.cta.neutralBandSub}
        primaryHref={`/${locale}/book-a-call`}
        primaryLabel={dict.hero.secondaryCta}
        showSecondary={false}
      />
    </>
  );
}
