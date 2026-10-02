"use client";

import ApplicationReceived from "@/components/ApplicationReceived";

// Where Calendly sends people once they book: the application-received page
// with call-confirmation copy, its own video, this cohort's launch date, and a
// Schedule conversion rather than an application submit.
export default function Page() {
  return (
    <ApplicationReceived
      variant="booking"
      joinDate="this October"
      pixelEvent="Schedule"
      wistiaId="mnqixwsgqw"
    />
  );
}
