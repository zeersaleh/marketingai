import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import { getAllPosts, type Post } from "@/lib/posts";
import { categories, postsInCategory, type Category } from "@/lib/categories";
import { JsonLd, collectionPage, itemList, localeUrl } from "@/lib/jsonld";
import PostCard from "@/components/PostCard";
import CategoryArt from "@/components/CategoryArt";

/** Max posts shown per category section on the landing page. */
const POSTS_PER_CATEGORY = 7;

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

function CategorySection({
  category,
  posts,
  total,
  locale,
  minReadLabel,
  viewAllLabel,
}: {
  category: Category;
  posts: Post[];
  total: number;
  locale: Locale;
  minReadLabel: string;
  viewAllLabel: string;
}) {
  const count = new Intl.NumberFormat(
    locale === "ar" ? "ar-SY" : "en-US"
  ).format(total);
  return (
    <section className="mt-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-20 shrink-0 overflow-hidden rounded-lg">
            <CategoryArt variant={category.art} className="h-full w-full" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-navy-900">
              {category.name[locale]}
            </h2>
            <p className="mt-1 max-w-xl text-sm text-ink-600">
              {category.description[locale]}
            </p>
          </div>
        </div>
        <Link
          href={`/${locale}/insights/${category.id}`}
          className="text-sm font-semibold text-gold-600 hover:text-navy-900"
        >
          {viewAllLabel} ({count})
        </Link>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
            locale={locale}
            minReadLabel={minReadLabel}
          />
        ))}
      </div>
    </section>
  );
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const posts = getAllPosts();
  const featured = posts[0];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <JsonLd
        data={collectionPage({
          name: dict.insights.heading,
          description: dict.insights.sub,
          url: localeUrl(locale, "/insights"),
          inLanguage: locale,
          items: posts.map((post) => ({
            name: post.title[locale],
            url: localeUrl(locale, `/insights/${post.slug}`),
          })),
        })}
      />
      <JsonLd
        data={itemList(
          posts.map((post) => ({
            name: post.title[locale],
            url: localeUrl(locale, `/insights/${post.slug}`),
          }))
        )}
      />
      <h1 className="text-4xl font-bold text-navy-900">
        {dict.insights.heading}
      </h1>
      <p className="mt-2 max-w-2xl text-ink-600">{dict.insights.sub}</p>

      {featured && (
        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
            {dict.insights.featured}
          </p>
          <div className="mt-3">
            <PostCard
              post={featured}
              locale={locale}
              minReadLabel={dict.insights.minRead}
              variant="featured"
              headingLevel="h2"
            />
          </div>
        </div>
      )}

      {categories.map((category) => {
        const inCategory = postsInCategory(posts, category);
        // The featured post already leads the page — drop it from its own
        // section and let the next-newest posts fill the seven slots.
        const shown = inCategory
          .filter((p) => p.slug !== featured?.slug)
          .slice(0, POSTS_PER_CATEGORY);
        if (shown.length === 0) return null;
        return (
          <CategorySection
            key={category.id}
            category={category}
            posts={shown}
            total={inCategory.length}
            locale={locale}
            minReadLabel={dict.insights.minRead}
            viewAllLabel={dict.insights.viewAll}
          />
        );
      })}
    </section>
  );
}
