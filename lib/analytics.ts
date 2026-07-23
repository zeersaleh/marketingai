// Lightweight, consent-safe analytics helper.
// Pushes a named event to the GTM dataLayer. GTM's Consent Mode still gates
// whether GA4 ultimately sends the hit, so this never bypasses consent.
type Params = Record<string, unknown>;

export function track(event: string, params: Params = {}): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Params[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}
