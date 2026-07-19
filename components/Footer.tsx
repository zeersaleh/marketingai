import Link from "next/link";
import { contactEmail, socialLinks, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import NewsletterForm from "@/components/NewsletterForm";
import CookiePrefsLink from "@/components/CookiePrefsLink";
import BrandMark from "@/components/BrandMark";
import LinkedInNewsletterLink from "@/components/LinkedInNewsletterLink";

export default function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 text-lg font-bold text-sand-50">
            <BrandMark size={26} />
            <span>
              {dict.brand.name}{" "}
              {locale === "en" && (
                <span className="text-gold-500">{dict.brand.nameArabic}</span>
              )}
            </span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-navy-100/80">
            {dict.footer.positioning}
          </p>
          <a
            href={`mailto:${contactEmail}`}
            dir="ltr"
            className="mt-3 inline-block text-sm text-gold-300 hover:text-sand-50"
          >
            {contactEmail}
          </a>
          <div className="mt-3 flex gap-4 text-sm">
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy-100/80 hover:text-sand-50"
            >
              LinkedIn
            </a>
            <a
              href={socialLinks.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy-100/80 hover:text-sand-50"
            >
              X
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-500">
            {dict.newsletter.heading}
          </p>
          <p className="mt-2 text-sm text-navy-100/80">{dict.newsletter.body}</p>
          <div className="mt-4">
            <NewsletterForm locale={locale} labels={dict.newsletter} />
          </div>
          <LinkedInNewsletterLink
            orFollowLabel={dict.newsletter.orFollow}
            ctaLabel={dict.newsletter.linkedinCta}
          />
        </div>

        <nav className="text-sm">
          <p className="font-semibold uppercase tracking-wide text-gold-500">
            {dict.footer.legal}
          </p>
          <ul className="mt-2 space-y-2">
            <li>
              <Link
                href={`/${locale}/entering-syria`}
                className="hover:text-sand-50"
              >
                {dict.nav.enteringSyria}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/gulf-marketing-ai`}
                className="hover:text-sand-50"
              >
                {dict.nav.gulfAi}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/sectors`} className="hover:text-sand-50">
                {dict.nav.sectors}
              </Link>
            </li>
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
            <li>
              <CookiePrefsLink label={dict.consent.preferences} />
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
