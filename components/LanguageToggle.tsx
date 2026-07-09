"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { otherLocale, type Locale } from "@/lib/i18n";

export default function LanguageToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;
  const target = otherLocale(locale);
  const switched = pathname.replace(new RegExp(`^/${locale}`), `/${target}`);

  return (
    <Link
      href={switched}
      lang={target}
      dir={target === "ar" ? "rtl" : "ltr"}
      className="rounded-md border border-sand-200 px-3 py-2 text-sm font-semibold text-navy-900 transition-colors hover:border-gold-500"
      aria-label={target === "ar" ? "التبديل إلى العربية" : "Switch to English"}
    >
      {target === "ar" ? "العربية" : "EN"}
    </Link>
  );
}
