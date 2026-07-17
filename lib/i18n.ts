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

export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@tibyanstrategy.com";

/** Public-facing contact/social identity (safe to bake in as defaults). */
export const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905317395933";

/**
 * Booking page for /book-a-call. A Google Calendar appointment-schedule
 * "Website embed" URL (calendar.google.com/...?gv=true) renders inline;
 * any other link (short link, Cal.com, Calendly) renders as a button.
 */
export const bookingUrl =
  process.env.NEXT_PUBLIC_BOOKING_URL ??
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0akSlaGpoH0NVINN4t4rB0m-5CwhXtAtlzUQ351u8wjeK939WnYD1Szh868NM3_KkPtcaBRUdo?gv=true";

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/salehzeer/",
  x: "https://x.com/Saleh_Zeer_",
  linkedinNewsletter:
    "https://www.linkedin.com/newsletters/tibyan-%D8%AA%D8%A8%D9%8A%D8%A7%D9%86-7137341583208726528/",
};

export const founderName: Localized = {
  en: "Saleh Zeer",
  ar: "صالح زير",
};
