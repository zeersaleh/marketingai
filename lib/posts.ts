import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { locales, type Locale, type Localized } from "@/lib/i18n";

export interface Post {
  slug: string;
  date: string; // ISO, from the newest language version
  /** Languages this post was actually written in. */
  availableIn: Locale[];
  /** For each display locale, which language's content is shown (fallback-aware). */
  contentLocale: Localized<Locale>;
  pillar: Localized;
  title: Localized;
  excerpt: Localized;
  html: Localized;
}

interface PostFile {
  title: string;
  date: string;
  pillar: string;
  excerpt: string;
  html: string;
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

let cache: Post[] | null = null;

/**
 * Prefixes the display locale onto root-relative internal links in rendered
 * post HTML. Markdown bodies are written locale-agnostic (e.g. /book-a-call),
 * but every route lives under /<locale>/..., so an unprefixed link would treat
 * its first segment as the locale and 404. Skips protocol-relative (//host) and
 * already-localized (/en, /ar) hrefs; leaves anchors, mailto:, and http(s):
 * links untouched (they don't start with "/").
 */
function localizeInternalLinks(html: string, locale: Locale): string {
  return html.replace(/href="(\/[^"]*)"/g, (full, href: string) => {
    if (href.startsWith("//")) return full; // protocol-relative external
    if (/^\/(en|ar)(\/|#|\?|$)/.test(href)) return full; // already localized
    return `href="/${locale}${href}"`;
  });
}

function parseFile(filePath: string): PostFile {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const html = marked.parse(content, { async: false }) as string;
  return {
    title: String(data.title ?? ""),
    date: String(data.date ?? ""),
    pillar: String(data.pillar ?? ""),
    excerpt: String(data.excerpt ?? ""),
    html,
  };
}

/**
 * Loads all posts from content/posts at build time.
 * File convention: <slug>.<locale>.md (e.g. my-post.en.md, my-post.ar.md).
 * A post missing one language falls back to the other language's content —
 * it never 404s — and contentLocale records which language is shown so the
 * page can render the correct dir/lang and a fallback notice.
 */
export function getAllPosts(): Post[] {
  if (cache) return cache;

  const bySlug = new Map<string, Partial<Record<Locale, PostFile>>>();
  for (const file of fs.readdirSync(POSTS_DIR)) {
    const match = file.match(/^(.+)\.(en|ar)\.md$/);
    if (!match) continue;
    const [, slug, locale] = match;
    const entry = bySlug.get(slug) ?? {};
    entry[locale as Locale] = parseFile(path.join(POSTS_DIR, file));
    bySlug.set(slug, entry);
  }

  const posts: Post[] = [];
  for (const [slug, versions] of bySlug) {
    const availableIn = locales.filter((l) => versions[l]);
    if (availableIn.length === 0) continue;

    const pick = (l: Locale): { file: PostFile; from: Locale } => {
      const from = versions[l] ? l : availableIn[0];
      return { file: versions[from]!, from };
    };

    const localized = <K extends keyof PostFile>(key: K): Localized =>
      Object.fromEntries(
        locales.map((l) => [l, pick(l).file[key]])
      ) as Localized;

    posts.push({
      slug,
      date: availableIn
        .map((l) => versions[l]!.date)
        .sort()
        .reverse()[0],
      availableIn,
      contentLocale: Object.fromEntries(
        locales.map((l) => [l, pick(l).from])
      ) as Localized<Locale>,
      pillar: localized("pillar"),
      title: localized("title"),
      excerpt: localized("excerpt"),
      html: Object.fromEntries(
        locales.map((l) => [l, localizeInternalLinks(pick(l).file.html, l)])
      ) as Localized,
    });
  }

  posts.sort((a, b) => b.date.localeCompare(a.date));
  cache = posts;
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
