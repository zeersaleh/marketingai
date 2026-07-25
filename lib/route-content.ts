import type { Post } from "@/lib/posts";
import { getCategory } from "@/lib/categories";

/**
 * Pillar allowlists for the two audience routes, derived from the category
 * registry (content/taxonomy.json). Filtering keys on the English pillar
 * string — it is the canonical value; Arabic pillar strings vary for the
 * same pillar across posts. Unlike categories, these audience lists may
 * overlap: bilingual-craft posts are relevant to both routes.
 */
export const SYRIA_PILLARS = [
  ...getCategory("syria-market-entry")!.pillars,
  "Bilingual & cross-cultural craft",
];

export const GULF_PILLARS = [...getCategory("ai-marketing")!.pillars];

/**
 * Newest posts whose pillar is in the allowlist, topped up with the
 * remaining newest posts so the section never renders short.
 */
export function postsForPillars(
  posts: Post[],
  pillars: string[],
  count: number
): Post[] {
  const matched = posts.filter((p) => pillars.includes(p.pillar.en));
  const rest = posts.filter((p) => !pillars.includes(p.pillar.en));
  return [...matched, ...rest].slice(0, count);
}
