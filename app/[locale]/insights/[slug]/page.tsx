import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dirOf, isLocale, locales, siteUrl, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import { getAllPosts, getPost } from "@/lib/posts";
import CtaBand from "@/components/CtaBand";
import NewsletterForm from "@/components/NewsletterForm";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllPosts().map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(locale) || !post) return {};
  return pageMetadata(
    locale,
    `/insights/${slug}`,
    post.title[locale],
    post.excerpt[locale]
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const dict = getDictionary(locale);

  // Language the body is actually written in (fallback when untranslated).
  const contentLocale = post.contentLocale[locale];
  const isFallback = contentLocale !== locale;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title[locale],
    datePublished: post.date,
    inLanguage: contentLocale,
    url: `${siteUrl}/${locale}/insights/${post.slug}`,
    author: { "@type": "Organization", name: "Tibyan" },
  };

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
          {post.pillar[locale]}
        </p>
        <h1
          lang={contentLocale}
          dir={dirOf(contentLocale)}
          className="mt-2 text-3xl font-bold leading-tight text-navy-900 md:text-4xl"
        >
          {post.title[locale]}
        </h1>
        <time dateTime={post.date} className="mt-3 block text-sm text-ink-600">
          {new Intl.DateTimeFormat(locale === "ar" ? "ar-SY" : "en-US", {
            dateStyle: "long",
          }).format(new Date(post.date))}
        </time>

        {isFallback && (
          <p className="mt-4 rounded-md border-s-4 border-gold-500 bg-sand-100 p-3 text-sm text-ink-600">
            {dict.insights.fallbackNotice}
          </p>
        )}

        <div
          lang={contentLocale}
          dir={dirOf(contentLocale)}
          className="post-body mt-8"
          dangerouslySetInnerHTML={{ __html: post.html[locale] }}
        />

        {/* End-of-post newsletter block */}
        <div className="mt-12 rounded-xl bg-navy-950 p-6 text-navy-100">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-500">
            {dict.newsletter.heading}
          </p>
          <p className="mt-2 text-sm text-navy-100/80">
            {dict.newsletter.body}
          </p>
          <div className="mt-4">
            <NewsletterForm locale={locale} labels={dict.newsletter} />
          </div>
        </div>
      </article>
      <CtaBand locale={locale} />
    </>
  );
}
