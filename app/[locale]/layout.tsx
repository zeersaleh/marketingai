import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
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

  // Public, non-secret container ID. Override per-environment with
  // NEXT_PUBLIC_GTM_ID; empty string disables GTM entirely.
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-NSL66R33";

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={`${plex.variable} ${plexArabic.variable}`}
    >
      <body className="font-sans antialiased">
        {gtmId && (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="gtm"
              />
            </noscript>
          </>
        )}
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
