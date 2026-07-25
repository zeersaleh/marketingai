import taxonomy from "@/content/taxonomy.json";
import type { Localized } from "@/lib/i18n";
import type { Post } from "@/lib/posts";

/**
 * An insights category. The registry lives in content/taxonomy.json so the
 * CI content validator (scripts/validate-content.mjs) can read the same
 * source of truth without a TypeScript toolchain.
 */
export interface Category {
  /** URL segment under /insights/ and the `category` frontmatter value. */
  id: string;
  name: Localized;
  description: Localized;
  /** Canonical English pillar strings that map into this category. */
  pillars: string[];
  /** Which CategoryArt composition represents the category. */
  art: "syria" | "ai";
}

export const categories: Category[] = taxonomy.categories as Category[];

/** Every canonical English pillar string, across all categories. */
export const canonicalPillars: string[] = categories.flatMap((c) => c.pillars);

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

/**
 * The category a post belongs to. A `category` frontmatter override wins;
 * otherwise the English pillar string decides (it is canonical — Arabic
 * pillar strings vary across posts). Falls back to the first category so
 * the UI never crashes on an off-list pillar; CI validation makes that
 * state unreachable on main.
 */
export function categoryOf(post: Post): Category {
  if (post.categoryOverride) {
    const override = getCategory(post.categoryOverride);
    if (override) return override;
  }
  return (
    categories.find((c) => c.pillars.includes(post.pillar.en)) ?? categories[0]
  );
}

/** Posts in a category, preserving getAllPosts()'s newest-first order. */
export function postsInCategory(posts: Post[], category: Category): Post[] {
  return posts.filter((p) => categoryOf(p).id === category.id);
}
