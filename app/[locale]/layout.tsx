import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { dirOf, isLocale, locales, siteName, siteUrl } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${siteName[locale]} — ${dict.brand.tagline}`,
      template: `%s | ${siteName[locale]}`,
    },
    description: dict.brand.subline,
    // Set GOOGLE_SITE_VERIFICATION to the token from Search Console's
    // "HTML tag" method to verify ownership without a DNS record.
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={`${plex.variable} ${plexArabic.variable}`}
    >
      <body className="font-sans antialiased">
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
