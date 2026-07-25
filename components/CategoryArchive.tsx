import Link from "next/link";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import { getAllPosts } from "@/lib/posts";
import { postsInCategory, type Category } from "@/lib/categories";
import {
  JsonLd,
  breadcrumbList,
  collectionPage,
  localeUrl,
} from "@/lib/jsonld";
import PostCard from "@/components/PostCard";
import CategoryArt from "@/components/CategoryArt";

export function categoryArchiveMetadata(
  locale: Locale,
  category: Category
): Metadata {
  return pageMetadata(
    locale,
    `/insights/${category.id}`,
    category.name[locale],
    category.description[locale]
  );
}

/**
 * Full archive of one insights category. Shared by the two literal route
 * folders under app/[locale]/insights/ — those segments shadow [slug], so
 * category ids are reserved slugs (enforced by scripts/validate-content.mjs).
 */
export default function CategoryArchive({
  locale,
  category,
}: {
  locale: Locale;
  category: Category;
}) {
  const dict = getDictionary(locale);
  const posts = postsInCategory(getAllPosts(), category);
  const url = localeUrl(locale, `/insights/${category.id}`);

  return (
    <>
      <JsonLd
        data={collectionPage({
          name: category.name[locale],
          description: category.description[locale],
          url,
          inLanguage: locale,
          items: posts.map((post) => ({
            name: post.title[locale],
            url: localeUrl(locale, `/insights/${post.slug}`),
          })),
        })}
      />
      <JsonLd
        data={breadcrumbList([
          {
            name: locale === "ar" ? "الرئيسية" : "Home",
            url: localeUrl(locale, ""),
          },
          { name: dict.nav.insights, url: localeUrl(locale, "/insights") },
          { name: category.name[locale], url },
        ])}
      />

      {/* Hero band */}
      <section className="relative overflow-hidden bg-navy-950">
        <CategoryArt
          variant={category.art}
          className="absolute inset-0 h-full w-full opacity-60"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <Link
            href={`/${locale}/insights`}
            className="text-sm font-semibold text-gold-300 hover:text-sand-50"
          >
            {dict.insights.backToInsights}
          </Link>
          <h1 className="mt-4 text-4xl font-bold text-sand-50">
            {category.name[locale]}
          </h1>
          <p className="mt-3 max-w-2xl text-navy-100/90">
            {category.description[locale]}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
              locale={locale}
              minReadLabel={dict.insights.minRead}
              headingLevel="h2"
            />
          ))}
        </div>
      </section>
    </>
  );
}
