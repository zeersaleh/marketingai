import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dirOf, isLocale, locales, siteUrl, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import { getAllPosts, getPost } from "@/lib/posts";
import { categoryOf, postsInCategory } from "@/lib/categories";
import PostCard from "@/components/PostCard";
import {
  JsonLd,
  breadcrumbList,
  founderPerson,
  localeUrl,
  organizationRef,
} from "@/lib/jsonld";
import CtaBand from "@/components/CtaBand";
import NewsletterForm from "@/components/NewsletterForm";
import LinkedInNewsletterLink from "@/components/LinkedInNewsletterLink";

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
    post.excerpt[locale],
    { ogType: "article", publishedTime: post.date, modifiedTime: post.date }
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
  const category = categoryOf(post);
  const related = postsInCategory(getAllPosts(), category)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  // Language the body is actually written in (fallback when untranslated).
  const contentLocale = post.contentLocale[locale];
  const isFallback = contentLocale !== locale;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title[locale],
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: contentLocale,
    articleSection: category.name[locale],
    url: localeUrl(locale, `/insights/${post.slug}`),
    mainEntityOfPage: localeUrl(locale, `/insights/${post.slug}`),
    image: `${siteUrl}/og.png`,
    author: founderPerson(locale),
    publisher: organizationRef(),
  };

  const breadcrumbJsonLd = breadcrumbList([
    { name: locale === "ar" ? "الرئيسية" : "Home", url: localeUrl(locale, "") },
    { name: dict.nav.insights, url: localeUrl(locale, "/insights") },
    { name: post.title[locale], url: localeUrl(locale, `/insights/${post.slug}`) },
  ]);

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16">
        <JsonLd data={jsonLd} />
        <JsonLd data={breadcrumbJsonLd} />
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
        <p className="mt-3 flex flex-wrap items-center gap-x-2 text-sm text-ink-600">
          <time dateTime={post.date}>
            {new Intl.DateTimeFormat(locale === "ar" ? "ar-SY" : "en-US", {
              dateStyle: "long",
            }).format(new Date(post.date))}
          </time>
          <span aria-hidden="true">·</span>
          <span>
            {new Intl.NumberFormat(locale === "ar" ? "ar-SY" : "en-US").format(
              post.readMinutes[locale]
            )}{" "}
            {dict.insights.minRead}
          </span>
        </p>

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

        {/* Related posts from the same category */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-bold text-navy-900">
              {dict.insights.moreInCategory} {category.name[locale]}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <PostCard
                  key={p.slug}
                  post={p}
                  locale={locale}
                  minReadLabel={dict.insights.minRead}
                  variant="compact"
                  headingLevel="h3"
                />
              ))}
            </div>
          </div>
        )}

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
          <LinkedInNewsletterLink
            orFollowLabel={dict.newsletter.orFollow}
            ctaLabel={dict.newsletter.linkedinCta}
          />
        </div>
      </article>
      <CtaBand locale={locale} />
    </>
  );
}
