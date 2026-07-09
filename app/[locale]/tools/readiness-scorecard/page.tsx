import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import ScorecardTool from "@/components/ScorecardTool";

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
    "/tools/readiness-scorecard",
    dict.tools.scorecardTitle,
    dict.tools.scorecardDesc
  );
}

export default async function ScorecardPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-navy-900 md:text-4xl">
        {dict.tools.scorecardTitle}
      </h1>
      <p className="mt-3 leading-relaxed text-ink-600">
        {dict.tools.scorecardDesc}
      </p>
      <div className="mt-8">
        <ScorecardTool locale={locale} labels={dict.tools} />
      </div>
    </section>
  );
}
