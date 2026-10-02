"use client";

import ApplicationReceived from "@/components/ApplicationReceived";

// Where Calendly sends people once they book. Same page as
// /cashflowcontent/received, with the launch date for this cohort, and it
// reports a Schedule conversion rather than an application submit.
export default function Page() {
  return <ApplicationReceived joinDate="this October" pixelEvent="Schedule" />;
}
