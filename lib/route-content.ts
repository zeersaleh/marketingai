import type { Post } from "@/lib/posts";

/**
 * Pillar allowlists for the two audience routes. Filtering keys on the
 * English pillar string — it is the canonical value; Arabic pillar
 * strings vary for the same pillar across posts.
 */
export const SYRIA_PILLARS = [
  "Syria market entry",
  "Regulatory & Market Tracker",
  "Bilingual & cross-cultural craft",
];

export const GULF_PILLARS = [
  "AI marketing in practice",
  "Bilingual & cross-cultural craft",
];

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
