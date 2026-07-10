import { NextResponse } from "next/server";
import { getNextWebinarDate } from "@/lib/date";

export async function GET() {
  const webinar = getNextWebinarDate();

  // Build compact local date strings for DTSTART/DTEND (America/Los_Angeles)
  // iso format: "2026-06-01T16:30:00-07:00" -> "20260601T163000"
  const startLocal = webinar.iso.replace(/[-:]/g, "").replace("T", "T").slice(0, 15);
  // end = start + 1 hour
  const startDate = new Date(webinar.iso);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  // Convert end back to local PST for DTEND
  const pstEndMs = endDate.getTime() + (-7 * 60 * 60 * 1000);
  const pstEnd = new Date(pstEndMs);
  const endLocal = `${pstEnd.getUTCFullYear()}${pad(pstEnd.getUTCMonth() + 1)}${pad(pstEnd.getUTCDate())}T${pad(pstEnd.getUTCHours())}${pad(pstEnd.getUTCMinutes())}00`;

  const now = new Date();
  const dtstamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}00Z`;

  const uid = `ai-masterclass-${webinar.utcStart.toLowerCase()}@ptdomination.com`;
  const zoom = "https://us02web.zoom.us/j/5173145585";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PT Domination//Masterclass//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=America/Los_Angeles:${startLocal}`,
    `DTEND;TZID=America/Los_Angeles:${endLocal}`,
    "SUMMARY:Free AI Masterclass for Fitness Coaches",
    `DESCRIPTION:Join Zoom: ${zoom}\\n\\nHow Online Fitness Coaches Are Using AI to Add $1K-$2K/Week\\n\\nOne click on the Zoom link above at 4:30 PM PST on ${webinar.dayName} and you're in.\\n\\nBonuses are only available to live attendees.`,
    `LOCATION:${zoom}`,
    `URL:${zoom}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: AI Masterclass tomorrow at 4:30 PM PST",
    "END:VALARM",
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    "DESCRIPTION:AI Masterclass starts in 1 hour — join link is inside this event",
    "END:VALARM",
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    "DESCRIPTION:AI Masterclass starts in 15 minutes — tap the Zoom link to join",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="masterclass.ics"',
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
