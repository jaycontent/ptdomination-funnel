"use client";

import { useEffect } from "react";

/**
 * Fires a Meta (Facebook) pixel standard event once on mount.
 * The base pixel is initialized in the root layout; this waits for `fbq`
 * to be available (the pixel script loads async) before tracking.
 */
export function useFbTrack(event: string) {
  useEffect(() => {
    const fire = () => {
      const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
      if (typeof fbq === "function") {
        fbq("track", event);
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
  }, [event]);
}
