import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";

export default function CtaBand({
  locale,
  heading,
  sub,
  primaryHref,
  primaryLabel,
  showSecondary = true,
}: {
  locale: Locale;
  heading?: string;
  sub?: string;
  primaryHref?: string;
  primaryLabel?: string;
  showSecondary?: boolean;
}) {
  const dict = getDictionary(locale);
  return (
    <section className="bg-navy-900">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-sand-50">
            {heading ?? dict.cta.band}
          </h2>
          <p className="mt-1 text-navy-100/80">{sub ?? dict.cta.bandSub}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={primaryHref ?? `/${locale}/tools/readiness-scorecard`}
            className="rounded-md bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-300"
          >
            {primaryLabel ?? dict.hero.primaryCta}
          </Link>
          {showSecondary && (
            <Link
              href={`/${locale}/book-a-call`}
              className="rounded-md border border-navy-100/40 px-5 py-3 text-sm font-semibold text-sand-50 hover:border-gold-500"
            >
              {dict.hero.secondaryCta}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
