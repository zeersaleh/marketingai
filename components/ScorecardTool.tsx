"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import {
  scorecardVariants,
  type ScorecardAnswers,
  type ScorecardVariantId,
} from "@/lib/scorecard-config";
import type { Dictionary } from "@/content/dictionary";
import { track } from "@/lib/analytics";

interface ResultPayload {
  overall: number;
  dimensions: { id: string; label: string; score: number }[];
  risks: string[];
}

export default function ScorecardTool({
  locale,
  labels,
  variant = "readiness",
}: {
  locale: Locale;
  labels: Dictionary["tools"];
  variant?: ScorecardVariantId;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ScorecardAnswers>({});
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultPayload | null>(null);

  const questions = scorecardVariants[variant].questions;
  const total = questions.length;
  const atEmailGate = step === total;
  const question = questions[step];

  function choose(value: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    setStep((s) => s + 1);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/tools/score", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tool: variant, answers, email, locale, subscribe }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setError(body.error === "invalid-email" ? labels.invalidEmail : labels.errorGeneric);
        return;
      }
      const payload = (await res.json()) as ResultPayload;
      setResult(payload);
      track("scorecard_complete", {
        score: payload.overall,
        locale,
        subscribed: subscribe,
      });
    } catch {
      setError(labels.errorGeneric);
    } finally {
      setBusy(false);
    }
  }

  if (result) {
    return (
      <div className="rounded-xl border border-sand-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
          {labels.yourScore}
        </p>
        <p className="mt-2 text-6xl font-bold text-navy-900">
          {result.overall}
          <span className="text-2xl font-medium text-ink-600">/100</span>
        </p>

        <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-gold-600">
          {labels.dimensionScores}
        </h3>
        <ul className="mt-3 space-y-3">
          {result.dimensions.map((d) => (
            <li key={d.id}>
              <div className="flex items-center justify-between text-sm font-medium text-ink-900">
                <span>{d.label}</span>
                <span>{d.score}</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-sand-100">
                <div
                  className="h-2 rounded-full bg-navy-800"
                  style={{ width: `${d.score}%` }}
                />
              </div>
            </li>
          ))}
        </ul>

        {result.risks.length > 0 && (
          <>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-gold-600">
              {labels.flaggedRisks}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-600">
              {result.risks.map((risk) => (
                <li
                  key={risk}
                  className="rounded-md border-s-4 border-gold-500 bg-sand-100 p-3"
                >
                  {risk}
                </li>
              ))}
            </ul>
          </>
        )}

        <Link
          href={`/${locale}/book-a-call`}
          className="mt-8 inline-block rounded-md bg-navy-900 px-5 py-3 text-sm font-semibold text-sand-50 hover:bg-navy-800"
        >
          {labels.discussCta}
        </Link>
        <p className="mt-4 text-xs text-ink-600">{labels.methodologyNote}</p>
      </div>
    );
  }

  if (atEmailGate) {
    return (
      <form
        onSubmit={submit}
        className="rounded-xl border border-sand-200 bg-white p-6 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-navy-900">
          {labels.emailGateHeading}
        </h3>
        <p className="mt-2 text-sm text-ink-600">{labels.emailGateBody}</p>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={labels.emailPlaceholder}
          dir="ltr"
          className="mt-4 w-full rounded-md border border-sand-200 px-3 py-2 text-sm focus:border-gold-500 focus:outline-none"
        />
        <label className="mt-3 flex items-center gap-2 text-sm text-ink-600">
          <input
            type="checkbox"
            checked={subscribe}
            onChange={(e) => setSubscribe(e.target.checked)}
          />
          {labels.alsoSubscribe}
        </label>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-md border border-sand-200 px-4 py-2 text-sm font-medium text-ink-600 hover:border-gold-500"
          >
            {labels.back}
          </button>
          <button
            type="submit"
            disabled={busy}
            className="rounded-md bg-navy-900 px-5 py-2 text-sm font-semibold text-sand-50 hover:bg-navy-800 disabled:opacity-60"
          >
            {labels.seeResults}
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="rounded-xl border border-sand-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
        {step + 1} / {total}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-navy-900">
        {question.label[locale]}
      </h3>
      <div className="mt-4 grid gap-2">
        {question.options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => choose(option.value)}
            className={`rounded-md border px-4 py-3 text-start text-sm font-medium transition-colors ${
              answers[question.id] === option.value
                ? "border-gold-500 bg-sand-100 text-navy-900"
                : "border-sand-200 text-ink-600 hover:border-gold-500 hover:text-navy-900"
            }`}
          >
            {option.label[locale]}
          </button>
        ))}
      </div>
      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep((s) => s - 1)}
          className="mt-5 rounded-md border border-sand-200 px-4 py-2 text-sm font-medium text-ink-600 hover:border-gold-500"
        >
          {labels.back}
        </button>
      )}
    </div>
  );
}
