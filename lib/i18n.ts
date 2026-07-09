export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}

/** A value that exists in both languages. */
export type Localized<T = string> = Record<Locale, T>;

export const siteName: Localized = {
  en: "Tibyan",
  ar: "تبيان",
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tibyanstrategy.com";
