import { isLocale, locales, siteName, siteUrl } from "@/lib/i18n";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Wrap HTML for `content:encoded`, splitting any `]]>` so the CDATA stays valid. */
function cdata(value: string): string {
  return `<![CDATA[${value.replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : "en";
  const posts = getAllPosts();
  const feedUrl = `${siteUrl}/${l}/feed.xml`;

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title[l])}</title>
      <link>${siteUrl}/${l}/insights/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/${l}/insights/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt[l])}</description>
      <content:encoded>${cdata(post.html[l])}</content:encoded>
    </item>`
    )
    .join("\n");

  const lastBuildDate = posts.length
    ? new Date(posts[0].date).toUTCString()
    : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteName[l])}</title>
    <link>${siteUrl}/${l}/insights</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(
      l === "ar"
        ? "رؤى في التسويق والذكاء الاصطناعي واقتصاد إعادة إعمار سوريا"
        : "Insights on marketing, AI, and Syria's reconstruction economy"
    )}</description>
    <language>${l}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
