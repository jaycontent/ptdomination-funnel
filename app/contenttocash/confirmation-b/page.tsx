"use client";

import ContentToCashConfirmation from "@/components/ContentToCashConfirmation";

// Duplicate confirmation WITHOUT the Facebook pixel event, for registrants who
// did NOT check the invest box (no conversion reported to Meta).
export default function ContentToCashConfirmationBPage() {
  return <ContentToCashConfirmation />;
}
