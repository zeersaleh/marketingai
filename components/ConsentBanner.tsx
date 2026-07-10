"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const STORAGE_KEY = "tibyan-consent";

export default function ConsentBanner({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only: localStorage is unavailable during SSR
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* storage blocked — don't show, don't track */
    }
    const reopen = () => setVisible(true);
    window.addEventListener("tibyan:open-consent", reopen);
    return () => window.removeEventListener("tibyan:open-consent", reopen);
  }, []);

  function choose(granted: boolean) {
    const v = granted ? "granted" : "denied";
    window.dataLayer = window.dataLayer || [];
    // Mirror Google's gtag(): push the arguments object, which is the form
    // GTM's Consent Mode reads. Typed so callers pass the gtag signature.
    const gtag: (...args: unknown[]) => void = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    gtag("consent", "update", {
      ad_storage: v,
      analytics_storage: v,
      ad_user_data: v,
      ad_personalization: v,
    });
    try {
      localStorage.setItem(STORAGE_KEY, v);
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-800 bg-navy-950/98 p-4 text-sand-50 backdrop-blur">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-navy-100/90">
          {dict.consent.message}{" "}
          <Link
            href={`/${locale}/privacy`}
            className="underline hover:text-gold-300"
          >
            {dict.footer.privacy}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose(false)}
            className="rounded-md border border-navy-100/40 px-4 py-2 text-sm font-semibold hover:border-gold-500"
          >
            {dict.consent.reject}
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="rounded-md bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-gold-300"
          >
            {dict.consent.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
