import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-sand-50">
            {dict.brand.name}{" "}
            {locale === "en" && (
              <span className="text-gold-500">{dict.brand.nameArabic}</span>
            )}
          </p>
          <p className="mt-2 max-w-xs text-sm text-navy-100/80">
            {dict.footer.positioning}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-500">
            {dict.newsletter.heading}
          </p>
          <p className="mt-2 text-sm text-navy-100/80">{dict.newsletter.body}</p>
          <div className="mt-4">
            <NewsletterForm locale={locale} labels={dict.newsletter} />
          </div>
        </div>

        <nav className="text-sm">
          <p className="font-semibold uppercase tracking-wide text-gold-500">
            {dict.footer.legal}
          </p>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href={`/${locale}/privacy`} className="hover:text-sand-50">
                {dict.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/terms`} className="hover:text-sand-50">
                {dict.footer.terms}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/contact`} className="hover:text-sand-50">
                {dict.nav.contact}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-navy-800 py-4 text-center text-xs text-navy-100/60">
        © {year} {dict.brand.name}. {dict.footer.rights}
      </div>
    </footer>
  );
}
