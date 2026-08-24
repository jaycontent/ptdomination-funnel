"use client";

import { useEffect } from "react";
import ContentToCashConfirmation from "@/components/ContentToCashConfirmation";

export default function ContentToCashConfirmationPage() {
  // Fire CompleteRegistration — only for registrants who checked the invest box.
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "CompleteRegistration");
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return <ContentToCashConfirmation />;
}
