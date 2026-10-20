"use client";

import { useEffect } from "react";

/**
 * Fires a Meta (Facebook) pixel event once on mount.
 * The base pixel is initialized in the root layout; this waits for `fbq`
 * to be available (the pixel script loads async) before tracking.
 *
 * Pass method "trackCustom" for an event that is not one of Meta's standard
 * events. Sending a custom name through plain "track" still records it, but
 * Meta reports it as an unrecognised standard event and Pixel Helper warns
 * about it.
 *
 * An empty event name is a no-op, so a caller can leave an optional event
 * unset without breaking the rule that hooks run unconditionally.
 */
export function useFbTrack(event: string, method: "track" | "trackCustom" = "track") {
  useEffect(() => {
    if (!event) return;

    const fire = () => {
      const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
      if (typeof fbq === "function") {
        fbq(method, event);
        return true;
      }
      return false;
    };

    if (fire()) return;
    const interval = setInterval(() => {
      if (fire()) clearInterval(interval);
    }, 100);
    const timeout = setTimeout(() => clearInterval(interval), 10000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [event, method]);
}
