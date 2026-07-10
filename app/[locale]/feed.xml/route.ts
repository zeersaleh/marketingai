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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : "en";
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title[l])}</title>
      <link>${siteUrl}/${l}/insights/${post.slug}</link>
      <guid>${siteUrl}/${l}/insights/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt[l])}</description>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteName[l])}</title>
    <link>${siteUrl}/${l}/insights</link>
    <description>${escapeXml(
      l === "ar"
        ? "رؤى في التسويق والذكاء الاصطناعي واقتصاد إعادة إعمار سوريا"
        : "Insights on marketing, AI, and Syria's reconstruction economy"
    )}</description>
    <language>${l}</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
