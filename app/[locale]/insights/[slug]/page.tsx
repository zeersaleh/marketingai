import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, siteUrl, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import { getPost, posts } from "@/content/posts";
import CtaBand from "@/components/CtaBand";
import NewsletterForm from "@/components/NewsletterForm";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug }))
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title[locale],
    datePublished: post.date,
    inLanguage: locale,
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
        <h1 className="mt-2 text-3xl font-bold leading-tight text-navy-900 md:text-4xl">
          {post.title[locale]}
        </h1>
        <time dateTime={post.date} className="mt-3 block text-sm text-ink-600">
          {new Intl.DateTimeFormat(locale === "ar" ? "ar-SY" : "en-US", {
            dateStyle: "long",
          }).format(new Date(post.date))}
        </time>

        <div className="mt-8 space-y-5">
          {post.body[locale].map((block, i) =>
            block.type === "h2" ? (
              <h2
                key={i}
                className="pt-4 text-2xl font-semibold text-navy-900"
              >
                {block.text}
              </h2>
            ) : (
              <p key={i} className="leading-relaxed text-ink-900">
                {block.text}
              </p>
            )
          )}
        </div>

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
