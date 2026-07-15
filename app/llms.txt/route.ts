import { siteUrl } from "@/lib/i18n";
import { services } from "@/content/services";
import { sectors } from "@/content/sectors";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

const MAX_POSTS = 20;
const MAX_DESCRIPTION_LENGTH = 140;

function escapeMarkdownLink(value: string): string {
  return value.replace(/\[/g, "(").replace(/\]/g, ")");
}

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

function entry(title: string, url: string, description?: string): string {
  const link = `[${escapeMarkdownLink(title)}](${url})`;
  if (!description) return link;
  return `${link}: ${escapeMarkdownLink(truncate(description, MAX_DESCRIPTION_LENGTH))}`;
}

export function GET() {
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

  const md = `# Tibyan

> Bilingual (English/Arabic) marketing and brand-strategy platform helping international investors enter Syria's reconstruction economy, plus applied-AI marketing enablement for KSA/Gulf teams. Every English page has an Arabic equivalent at the corresponding /ar/ path.

## Services

${serviceLines}

## Sectors

${sectorLines}

## Insights

${postLines}

## Tools

${entry("AI Readiness Scorecard", `${siteUrl}/en/tools/readiness-scorecard`, "Self-assessment tool for AI marketing readiness.")}

## Company

${entry("About", `${siteUrl}/en/about`)}
${entry("Book a Call", `${siteUrl}/en/book-a-call`)}
${entry("Contact", `${siteUrl}/en/contact`)}
`;

  return new Response(md, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
