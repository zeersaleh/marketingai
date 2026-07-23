"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionary";
import { track } from "@/lib/analytics";

export default function ContactForm({
  locale,
  labels,
}: {
  locale: Locale;
  labels: Dictionary["contact"];
}) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "busy" | "done" | "error">(
    "idle"
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("busy");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      if (res.ok) {
        setStatus("done");
        track("contact_submit", { locale });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="rounded-md border-s-4 border-gold-500 bg-white p-4 text-sm font-medium text-navy-900 shadow-sm">
        {labels.sent}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-ink-900">
          {labels.name}
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-md border border-sand-200 bg-white px-3 py-2 text-sm focus:border-gold-500 focus:outline-none"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-ink-900">
          {labels.email}
          <input
            type="email"
            required
            dir="ltr"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full rounded-md border border-sand-200 bg-white px-3 py-2 text-sm focus:border-gold-500 focus:outline-none"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-ink-900">
          {labels.message}
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="mt-1 w-full rounded-md border border-sand-200 bg-white px-3 py-2 text-sm focus:border-gold-500 focus:outline-none"
          />
        </label>
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">{labels.error}</p>
      )}
      <button
        type="submit"
        disabled={status === "busy"}
        className="rounded-md bg-navy-900 px-5 py-3 text-sm font-semibold text-sand-50 hover:bg-navy-800 disabled:opacity-60"
      >
        {labels.send}
      </button>
    </form>
  );
}
