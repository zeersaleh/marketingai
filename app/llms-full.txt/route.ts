import { siteName, siteUrl, founderName, contactEmail } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

/**
 * llms-full.txt: the full text of every insight, both languages, in one
 * markdown file — for answer engines that ingest whole-site context rather
 * than following the llms.txt link index.
 */
export function GET() {
  const dict = getDictionary("en");
  const posts = getAllPosts();

  const sections = posts
    .map((post) => {
      const parts: string[] = [];
      for (const locale of ["en", "ar"] as const) {
        // Skip fallback duplicates: only emit languages the post was written in.
        if (!post.availableIn.includes(locale)) continue;
        parts.push(
          `## ${post.title[locale]}

- URL: ${siteUrl}/${locale}/insights/${post.slug}
- Language: ${locale === "ar" ? "Arabic (العربية)" : "English"}
- Published: ${post.date}
- Pillar: ${post.pillar[locale]}

${post.markdown[locale]}`
        );
      }
      return parts.join("\n\n---\n\n");
    })
    .join("\n\n---\n\n");

  const md = `# ${siteName.en} (${siteName.ar}) — full article text

> ${dict.brand.tagline} ${dict.brand.subline}

Founder: ${founderName.en} · Contact: ${contactEmail} · Site index: ${siteUrl}/llms.txt

Every insight published on ${siteUrl}, in full, in each language it was written in. Relative links inside articles resolve against ${siteUrl}/en or ${siteUrl}/ar per the article's URL.

---

${sections}
`;

  return new Response(md, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
