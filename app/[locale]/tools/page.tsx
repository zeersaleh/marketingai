import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import CtaBand from "@/components/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata(locale, "/tools", dict.tools.heading, dict.tools.sub);
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const upcoming = [
    { title: dict.tools.roiTitle, desc: dict.tools.roiDesc },
    { title: dict.tools.inactionTitle, desc: dict.tools.inactionDesc },
    { title: dict.tools.roadmapTitle, desc: dict.tools.roadmapDesc },
  ];

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl font-bold text-navy-900">
          {dict.tools.heading}
        </h1>
        <p className="mt-2 max-w-2xl text-ink-600">{dict.tools.sub}</p>

        <Link
          href={`/${locale}/tools/readiness-scorecard`}
          className="group mt-10 block rounded-xl border-2 border-gold-500 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
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
      <CtaBand locale={locale} />
    </>
  );
}
