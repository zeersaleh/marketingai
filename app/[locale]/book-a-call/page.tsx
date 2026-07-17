import type { Metadata } from "next";
import Link from "next/link";
import { bookingUrl, isLocale, type Locale } from "@/lib/i18n";
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

/**
 * Google only allows framing of appointment schedules via the "Website embed"
 * URL on calendar.google.com; short links (calendar.app.google) and other
 * schedulers' plain links are rendered as a button instead.
 */
function embedUrl(url: string): string | null {
  if (!/calendar\.google\.com\/calendar\/appointments/.test(url)) {
    return /(calendly\.com|cal\.com)/.test(url) ? url : null;
  }
  return url.includes("gv=true")
    ? url
    : `${url}${url.includes("?") ? "&" : "?"}gv=true`;
}

export default async function BookACallPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const iframeSrc = bookingUrl ? embedUrl(bookingUrl) : null;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold text-navy-900">
        {dict.booking.heading}
      </h1>
      <p className="mt-3 leading-relaxed text-ink-600">{dict.booking.body}</p>

      {iframeSrc ? (
        <>
          <iframe
            src={iframeSrc}
            title={dict.booking.heading}
            className="mt-8 h-[720px] w-full rounded-xl border border-sand-200 bg-white"
          />
          <p className="mt-3 text-sm text-ink-600">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-navy-900"
            >
              {dict.booking.cta}
            </a>
          </p>
        </>
      ) : bookingUrl ? (
        <div className="mt-8 rounded-xl border border-sand-200 bg-white p-6 shadow-sm">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md bg-navy-900 px-6 py-3 text-base font-semibold text-sand-50 hover:bg-navy-800"
          >
            {dict.booking.cta}
          </a>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">
            {dict.booking.opensInNewTab}
          </p>
        </div>
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
