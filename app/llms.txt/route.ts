import {
  siteUrl,
  siteName,
  founderName,
  contactEmail,
  socialLinks,
} from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { services } from "@/content/services";
import { sectors } from "@/content/sectors";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

const MAX_POSTS = 20;
const MAX_DESCRIPTION_LENGTH = 160;

function escapeMarkdownLink(value: string): string {
  return value.replace(/\[/g, "(").replace(/\]/g, ")");
}

/** Trim to a whole-word boundary so descriptions never cut mid-word. */
function truncateAtBoundary(value: string, maxLength: number): string {
  const trimmed = value.trim();
  if (trimmed.length <= maxLength) return trimmed;
  const slice = trimmed.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(" ");
  const clipped = (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).replace(
    /[\s.,;:—-]+$/,
    ""
  );
  return `${clipped}…`;
}

/**
 * A single llms.txt file-list item. Per the llmstxt.org spec, entries are
 * markdown bullet-list items: `- [name](url): optional description`.
 */
function entry(title: string, url: string, description?: string): string {
  const link = `[${escapeMarkdownLink(title)}](${url})`;
  if (!description) return `- ${link}`;
  const desc = escapeMarkdownLink(
    truncateAtBoundary(description, MAX_DESCRIPTION_LENGTH)
  );
  return `- ${link}: ${desc}`;
}

export function GET() {
  const dict = getDictionary("en");
  const dictAr = getDictionary("ar");

  const serviceLines = services
    .map((service) =>
      entry(service.name.en, `${siteUrl}/en/services/${service.slug}`, service.short.en)
    )
    .join("\n");

  const sectorLines = sectors
    .map((sector) =>
      entry(sector.name.en, `${siteUrl}/en/sectors/${sector.slug}`, sector.context.en)
    )
    .join("\n");

  const postLines = getAllPosts()
    .slice(0, MAX_POSTS)
    .map((post) =>
      entry(post.title.en, `${siteUrl}/en/insights/${post.slug}`, post.excerpt.en)
    )
    .join("\n");

  const arServiceLines = services
    .map((service) =>
      entry(service.name.ar, `${siteUrl}/ar/services/${service.slug}`, service.short.ar)
    )
    .join("\n");

  const arSectorLines = sectors
    .map((sector) =>
      entry(sector.name.ar, `${siteUrl}/ar/sectors/${sector.slug}`, sector.context.ar)
    )
    .join("\n");

  const arPostLines = getAllPosts()
    .slice(0, MAX_POSTS)
    .map((post) =>
      entry(post.title.ar, `${siteUrl}/ar/insights/${post.slug}`, post.excerpt.ar)
    )
    .join("\n");

  const md = `# ${siteName.en} (${siteName.ar})

> ${dict.brand.tagline} ${dict.brand.subline}

${dict.hero.credibility}

Founder: ${founderName.en} · Contact: ${contactEmail} · English pages first, Arabic pages in the sections marked (العربية) below. Full article text: [llms-full.txt](${siteUrl}/llms-full.txt).

## Services

${entry(dict.sections.allServices, `${siteUrl}/en/services`, "Overview of all service lines.")}
${serviceLines}

## Sectors

${entry(dict.sections.allSectors, `${siteUrl}/en/sectors`, "Overview of all sectors served.")}
${sectorLines}

## Insights

${entry(dict.sections.allInsights, `${siteUrl}/en/insights`, "All articles on marketing, AI, and Syria's reconstruction economy.")}
${postLines}

## Tools

${entry(dict.tools.scorecardTitle, `${siteUrl}/en/tools/readiness-scorecard`, dict.tools.scorecardDesc)}
${entry("All tools", `${siteUrl}/en/tools`, "Interactive, evidence-based instruments.")}

## Company

${entry("About", `${siteUrl}/en/about`, "Who Tibyan is, and how we work.")}
${entry("Book a Call", `${siteUrl}/en/book-a-call`, "Schedule an introductory consultation.")}
${entry("Contact", `${siteUrl}/en/contact`, "Get in touch with the team.")}
${entry("LinkedIn", socialLinks.linkedin)}
${entry("X (Twitter)", socialLinks.x)}

## Services (الخدمات بالعربية)

${entry(dictAr.sections.allServices, `${siteUrl}/ar/services`, "نظرة عامة على جميع الخدمات.")}
${arServiceLines}

## Sectors (القطاعات بالعربية)

${entry(dictAr.sections.allSectors, `${siteUrl}/ar/sectors`, "نظرة عامة على جميع القطاعات.")}
${arSectorLines}

## Insights (الرؤى بالعربية)

${entry(dictAr.sections.allInsights, `${siteUrl}/ar/insights`, "جميع المقالات في التسويق والذكاء الاصطناعي واقتصاد إعادة إعمار سوريا.")}
${arPostLines}

## Tools (الأدوات بالعربية)

${entry(dictAr.tools.scorecardTitle, `${siteUrl}/ar/tools/readiness-scorecard`, dictAr.tools.scorecardDesc)}

## Optional

${entry("Home", `${siteUrl}/en`, "Homepage.")}
${entry("الرئيسية", `${siteUrl}/ar`, "الصفحة الرئيسية بالعربية.")}
${entry("About (عن تبيان)", `${siteUrl}/ar/about`, "من هي تبيان وكيف نعمل.")}
${entry("Subscribe", `${siteUrl}/en/subscribe`, "Get new insights by email.")}
${entry("RSS feed (EN)", `${siteUrl}/en/feed.xml`, "Insights RSS feed.")}
${entry("RSS feed (AR)", `${siteUrl}/ar/feed.xml`, "خلاصة RSS بالعربية.")}
${entry("Full article text", `${siteUrl}/llms-full.txt`, "All insights in full, both languages, one file.")}
${entry("Privacy Policy", `${siteUrl}/en/privacy`)}
${entry("Terms", `${siteUrl}/en/terms`)}
`;

  return new Response(md, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
