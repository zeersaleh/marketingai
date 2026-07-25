import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Post } from "@/lib/posts";
import { categoryOf } from "@/lib/categories";
import CategoryArt from "@/components/CategoryArt";

interface PostCardProps {
  post: Post;
  locale: Locale;
  /** dict.insights.minRead — passed in so the card stays dictionary-agnostic. */
  minReadLabel: string;
  /** Defaults to the post's category name — consistent in both languages. */
  eyebrow?: string;
  variant?: "default" | "featured" | "compact";
  headingLevel?: "h2" | "h3";
  showExcerpt?: boolean;
}

/**
 * The site's post card, shared by the insights landing page, category
 * archives, and the route/homepage insight grids.
 */
export default function PostCard({
  post,
  locale,
  minReadLabel,
  eyebrow,
  variant = "default",
  headingLevel = "h3",
  showExcerpt = true,
}: PostCardProps) {
  const category = categoryOf(post);
  const eyebrowText = eyebrow ?? category.name[locale];
  const intlLocale = locale === "ar" ? "ar-SY" : "en-US";
  const dateText = new Intl.DateTimeFormat(intlLocale, {
    dateStyle: "long",
  }).format(new Date(post.date));
  const minutes = new Intl.NumberFormat(intlLocale).format(
    post.readMinutes[locale]
  );
  const Heading = headingLevel;

  const meta = (
    <span className="flex flex-wrap items-center gap-x-2 text-xs font-normal normal-case tracking-normal text-ink-600">
      <time dateTime={post.date}>{dateText}</time>
      <span aria-hidden="true">·</span>
      <span>
        {minutes} {minReadLabel}
      </span>
    </span>
  );

  if (variant === "featured") {
    return (
      <Link
        href={`/${locale}/insights/${post.slug}`}
        className="group grid overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm transition-shadow hover:shadow-md md:grid-cols-5"
      >
        <div className="relative h-40 md:col-span-2 md:h-full">
          <CategoryArt
            variant={category.art}
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="p-6 md:col-span-3 md:p-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide">
            <span className="text-gold-600">{eyebrowText}</span>
            {meta}
          </div>
          <Heading className="mt-3 text-2xl font-bold leading-snug text-navy-900 group-hover:text-gold-600 md:text-3xl">
            {post.title[locale]}
          </Heading>
          {showExcerpt && (
            <p className="mt-3 leading-relaxed text-ink-600">
              {post.excerpt[locale]}
            </p>
          )}
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/${locale}/insights/${post.slug}`}
        className="group block rounded-xl border border-sand-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
          {eyebrowText}
        </p>
        <Heading className="mt-2 text-sm font-semibold leading-snug text-navy-900 group-hover:text-gold-600">
          {post.title[locale]}
        </Heading>
        <div className="mt-2">{meta}</div>
      </Link>
    );
  }

  return (
    <Link
      href={`/${locale}/insights/${post.slug}`}
      className="group block rounded-xl border border-sand-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide">
        <span className="text-gold-600">{eyebrowText}</span>
        {meta}
      </div>
      <Heading className="mt-2 font-semibold leading-snug text-navy-900 group-hover:text-gold-600">
        {post.title[locale]}
      </Heading>
      {showExcerpt && (
        <p className="mt-2 text-sm leading-relaxed text-ink-600">
          {post.excerpt[locale]}
        </p>
      )}
    </Link>
  );
}
