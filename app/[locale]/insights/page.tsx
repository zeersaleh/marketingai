import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import { getAllPosts } from "@/lib/posts";
import { JsonLd, itemList, localeUrl } from "@/lib/jsonld";

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
    "/insights",
    dict.insights.heading,
    dict.insights.sub
  );
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const sorted = getAllPosts();

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <JsonLd
        data={itemList(
          sorted.map((post) => ({
            name: post.title[locale],
            url: localeUrl(locale, `/insights/${post.slug}`),
          }))
        )}
      />
      <h1 className="text-4xl font-bold text-navy-900">
        {dict.insights.heading}
      </h1>
      <p className="mt-2 max-w-2xl text-ink-600">{dict.insights.sub}</p>
      <div className="mt-10 space-y-6">
        {sorted.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/insights/${post.slug}`}
            className="group block rounded-xl border border-sand-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide">
              <span className="text-gold-600">{post.pillar[locale]}</span>
              <time dateTime={post.date} className="font-normal text-ink-600">
                {new Intl.DateTimeFormat(
                  locale === "ar" ? "ar-SY" : "en-US",
                  { dateStyle: "long" }
                ).format(new Date(post.date))}
              </time>
            </div>
            <h2 className="mt-2 text-xl font-semibold leading-snug text-navy-900 group-hover:text-gold-600">
              {post.title[locale]}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              {post.excerpt[locale]}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
