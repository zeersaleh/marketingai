"use client";

export default function CookiePrefsLink({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("tibyan:open-consent"))}
      className="text-start hover:text-sand-50"
    >
      {label}
    </button>
  );
}
