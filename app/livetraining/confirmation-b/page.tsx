"use client";

import ConfirmationContent from "@/components/ConfirmationContent";

// Duplicate of the confirmation page WITHOUT the Facebook pixel event, used for
// "No, just exploring" leads so no conversion is reported to Meta.
export default function ConfirmationBPage() {
  return <ConfirmationContent />;
}
