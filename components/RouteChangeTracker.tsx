"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

/**
 * App Router navigations are client-side — the browser never reloads, so GTM's
 * container-load trigger fires once per session and GA4 only ever sees the
 * landing page. This pushes a `page_view` on every later route change.
 *
 * Needs a matching Custom Event trigger on `page_view` in GTM; without it the
 * pushes sit in the dataLayer unused. See docs/analytics.md.
 */
export default function RouteChangeTracker() {
  const pathname = usePathname();
  // Container load already counted the first render; without this guard the
  // landing page is reported twice.
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    track("page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
