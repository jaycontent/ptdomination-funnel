"use client";

import ApplicationReceived from "@/components/ApplicationReceived";

// Qualified applicants from /cashflowcontent land here. The URL stays /booked
// so the Typeform redirect does not have to change, but there is no calendar
// step any more: this is the application-received confirmation.
//
// Two conversions fire: the standard SubmitApplication, and the custom
// Qualified_Application. Unqualified applicants go to /applied, which reports
// no conversion, so either event counts qualified applications only.
// The Calendly version of this page is in git history if the call step comes back.
export default function BookedPage() {
  return (
    <ApplicationReceived
      variant="application"
      joinDate="this October"
      pixelEvent="SubmitApplication"
      customPixelEvent="Qualified_Application"
    />
  );
}
