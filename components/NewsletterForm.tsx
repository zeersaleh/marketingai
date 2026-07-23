"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { track } from "@/lib/analytics";

interface Labels {
  emailPlaceholder: string;
  languagePref: string;
  langEn: string;
  langAr: string;
  langBoth: string;
  subscribe: string;
  success: string;
  pending: string;
  error: string;
}

export default function NewsletterForm({
  locale,
  labels,
}: {
  locale: Locale;
  labels: Labels;
}) {
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState<string>(locale);
  const [status, setStatus] = useState<
    "idle" | "busy" | "done" | "pending" | "error"
  >("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("busy");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, locale, languagePreference: language }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      const data = (await res.json()) as { status?: string };
      setStatus(data.status === "pending" ? "pending" : "done");
      track("newsletter_subscribe", {
        locale,
        language_preference: language,
        double_optin: data.status === "pending",
      });
    } catch {
      setStatus("error");
    }
  }

  if (status === "done" || status === "pending") {
    return (
      <p className="text-sm font-medium text-gold-300">
        {status === "pending" ? labels.pending : labels.success}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={labels.emailPlaceholder}
          dir="ltr"
          className="w-full rounded-md border border-navy-700 bg-navy-800 px-3 py-2 text-sm text-sand-50 placeholder:text-navy-100/50 focus:border-gold-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "busy"}
          className="rounded-md bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-300 disabled:opacity-60"
        >
          {labels.subscribe}
        </button>
      </div>
      <label className="flex items-center gap-2 text-xs text-navy-100/80">
        <span>{labels.languagePref}:</span>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded border border-navy-700 bg-navy-800 px-2 py-1 text-navy-100"
        >
          <option value="en">{labels.langEn}</option>
          <option value="ar">{labels.langAr}</option>
          <option value="both">{labels.langBoth}</option>
        </select>
      </label>
      {status === "error" && (
        <p className="text-xs text-red-300">{labels.error}</p>
      )}
    </form>
  );
}
