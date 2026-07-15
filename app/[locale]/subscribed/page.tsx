import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, type Locale, type Localized } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const content: Localized<{ title: string; body: string; home: string }> = {
  en: {
    title: "You're confirmed — welcome to the Briefing",
    body: "Your subscription to the Tibyan Briefing is confirmed. You'll receive our analysis on marketing, AI, and Syria's reconstruction economy.",
    home: "Back to home",
  },
  ar: {
    title: "تم تأكيد اشتراكك — أهلًا بك في النشرة",
    body: "تم تأكيد اشتراكك في نشرة تبيان. ستصلك تحليلاتنا في التسويق والذكاء الاصطناعي واقتصاد إعادة إعمار سوريا.",
    home: "العودة إلى الرئيسية",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  // Transactional confirmation page: kept out of the sitemap and
  // explicitly non-indexable so a stray crawl can't index it.
  return {
    ...pageMetadata(
      locale,
      "/subscribed",
      content[locale].title,
      content[locale].body
    ),
    robots: { index: false },
  };
}

export default async function SubscribedPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const page = content[locale];

  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-5xl">✓</p>
      <h1 className="mt-4 text-3xl font-bold text-navy-900">{page.title}</h1>
      <p className="mt-3 leading-relaxed text-ink-600">{page.body}</p>
      <Link
        href={`/${locale}`}
        className="mt-8 inline-block rounded-md bg-navy-900 px-5 py-3 text-sm font-semibold text-sand-50 hover:bg-navy-800"
      >
        {page.home}
      </Link>
    </section>
  );
}
