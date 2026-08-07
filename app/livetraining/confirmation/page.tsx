"use client";

import { useEffect } from "react";
import ConfirmationContent from "@/components/ConfirmationContent";

export default function ConfirmationPage() {
  // Fire the Facebook CompleteRegistration conversion event ("Yes" leads).
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "CompleteRegistration");
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return <ConfirmationContent />;
}
