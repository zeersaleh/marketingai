import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";
import NewsletterForm from "@/components/NewsletterForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata(
    locale,
    "/subscribe",
    dict.newsletter.heading,
    dict.newsletter.body
  );
}

export default async function SubscribePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <section className="mx-auto max-w-2xl px-4 py-20">
      <h1 className="text-4xl font-bold text-navy-900">
        {dict.newsletter.heading}
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-ink-600">
        {dict.newsletter.body}
      </p>
      <div className="mt-8 rounded-xl bg-navy-950 p-6">
        <NewsletterForm locale={locale} labels={dict.newsletter} />
      </div>
    </section>
  );
}
