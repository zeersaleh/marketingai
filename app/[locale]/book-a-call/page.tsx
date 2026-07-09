import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/content/dictionary";

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
    "/book-a-call",
    dict.booking.heading,
    dict.booking.body
  );
}

export default async function BookACallPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold text-navy-900">
        {dict.booking.heading}
      </h1>
      <p className="mt-3 leading-relaxed text-ink-600">{dict.booking.body}</p>

      {bookingUrl ? (
        <iframe
          src={bookingUrl}
          title={dict.booking.heading}
          className="mt-8 h-[720px] w-full rounded-xl border border-sand-200 bg-white"
        />
      ) : (
        <div className="mt-8 rounded-xl border border-sand-200 bg-white p-6 shadow-sm">
          <p className="leading-relaxed text-ink-900">
            {dict.booking.fallback}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="mt-4 inline-block rounded-md bg-navy-900 px-5 py-3 text-sm font-semibold text-sand-50 hover:bg-navy-800"
          >
            {dict.nav.contact}
          </Link>
        </div>
      )}
    </section>
  );
}
