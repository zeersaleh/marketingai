import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import LanguageToggle from "@/components/LanguageToggle";
import BrandMark from "@/components/BrandMark";

export default function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const nav = [
    { href: `/${locale}/entering-syria`, label: dict.nav.enteringSyria },
    { href: `/${locale}/gulf-marketing-ai`, label: dict.nav.gulfAi },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/insights`, label: dict.nav.insights },
    { href: `/${locale}/tools`, label: dict.nav.tools },
    { href: `/${locale}/about`, label: dict.nav.about },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-sand-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 text-xl font-bold text-navy-900"
        >
          <BrandMark size={30} />
          <span className="flex items-baseline gap-2">
            <span>{dict.brand.name}</span>
            {locale === "en" && (
              <span className="text-base font-semibold text-gold-600">
                {dict.brand.nameArabic}
              </span>
            )}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-ink-600 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-navy-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle locale={locale} />
          <Link
            href={`/${locale}/book-a-call`}
            className="rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-sand-50 transition-colors hover:bg-navy-800"
          >
            {dict.nav.bookACall}
          </Link>
        </div>
      </div>

      {/* Mobile nav row */}
      <nav className="flex gap-4 overflow-x-auto px-4 pb-2 text-sm font-medium text-ink-600 md:hidden">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap hover:text-navy-900"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
