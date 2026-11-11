"use client";

import { CheckCircle2, CalendarDays, Instagram } from "lucide-react";
import { useFbTrack } from "@/lib/useFbTrack";
import styles from "./confirmation.module.css";

const INSTAGRAM_URL = "https://www.instagram.com/therealbrianmark/";

// ───────────────────────────────────────────────────────────────────────────
// EVENT CONFIG — keep these in step with app/summit/page.tsx.
// Calendar links are only rendered once CAL_START is set, so an unset date
// never ships a wrong "add to calendar" to a registrant.
// ───────────────────────────────────────────────────────────────────────────
const CAL_START = ""; // first day, YYYYMMDD, e.g. "20261203"
const CAL_END_EXCLUSIVE = ""; // day AFTER the last day, e.g. "20261205"
const EVENT_WHEN = ""; // human-readable, e.g. "December 3rd & 4th · 9:00 AM PST"

const CAL_TITLE = "Online Trainer Virtual Summit";
const CAL_DETAILS =
  "Free 2-day Online Trainer Virtual Summit with Brian Mark. Your Zoom link is in your email and texts.";

const dashed = (d: string) => `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;

const GOOGLE_CAL =
  "https://www.google.com/calendar/render?action=TEMPLATE&text=" +
  encodeURIComponent(CAL_TITLE) +
  `&dates=${CAL_START}/${CAL_END_EXCLUSIVE}&details=` +
  encodeURIComponent(CAL_DETAILS);

const OUTLOOK_CAL =
  "https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=" +
  encodeURIComponent(CAL_TITLE) +
  `&allday=true&startdt=${CAL_START && dashed(CAL_START)}&enddt=${
    CAL_END_EXCLUSIVE && dashed(CAL_END_EXCLUSIVE)
  }&body=` +
  encodeURIComponent(CAL_DETAILS);

const ICS = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//PT Domination//Virtual Summit//EN",
  "BEGIN:VEVENT",
  "UID:online-trainer-virtual-summit-2026@ptdomination",
  `DTSTART;VALUE=DATE:${CAL_START}`,
  `DTEND;VALUE=DATE:${CAL_END_EXCLUSIVE}`,
  "SUMMARY:" + CAL_TITLE,
  "DESCRIPTION:" + CAL_DETAILS,
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");
const APPLE_CAL = "data:text/calendar;charset=utf8," + encodeURIComponent(ICS);

const STEPS = [
  {
    title: "Check your email and texts",
    body: "Your Zoom link is on its way now. If it is not in your inbox in a few minutes, check promotions and spam.",
  },
  {
    title: "Show up live",
    body: "A replay is not guaranteed. The whole blueprint — content, lead generation, high-ticket sales — is delivered live over the two days.",
  },
  {
    title: "Bring a notepad",
    body: "You are getting exactly what to post, what to say in the DMs, and what to say on sales calls. Come ready to write it down.",
  },
];

export default function SummitConfirmationPage() {
  useFbTrack("CompleteRegistration");

  const hasDates = Boolean(CAL_START && CAL_END_EXCLUSIVE);

  return (
    <div className={styles.sc}>
      <div className={styles.wrap}>
        <div className={styles.hero}>
          <div className={styles.checkBadge}>
            <CheckCircle2 size={38} strokeWidth={2.5} />
          </div>
          <h1>You&rsquo;re Registered!</h1>
          <p className={styles.sub}>
            Your seat for the free 2-day Online Trainer Virtual Summit is confirmed. Check your
            email and texts for the Zoom link.
          </p>
        </div>

        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <div className={styles.step} key={s.title}>
              <div className={styles.stepNum}>{i + 1}</div>
              <div className={styles.stepBody}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        {hasDates && (
          <div className={styles.calCard}>
            <div className={styles.calHead}>
              <CalendarDays size={20} strokeWidth={2.5} />
              Add It to Your Calendar
            </div>
            <p className={styles.calWhen}>{EVENT_WHEN}</p>
            <div className={styles.calLinks}>
              <a className={styles.calLink} href={GOOGLE_CAL} target="_blank" rel="noopener noreferrer">
                Google
              </a>
              <a className={styles.calLink} href={OUTLOOK_CAL} target="_blank" rel="noopener noreferrer">
                Outlook
              </a>
              <a className={styles.calLink} href={APPLE_CAL} download="virtual-summit.ics">
                Apple
              </a>
            </div>
          </div>
        )}

        <div className={styles.igCard}>
          <Instagram size={26} strokeWidth={2.2} color="#00d9ff" />
          <h2>Follow Brian in the Meantime</h2>
          <p>
            Six posts a day, seven days a week &mdash; the same content system you&rsquo;ll learn at
            the summit, in action.
          </p>
          <a className={styles.igBtn} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            <Instagram size={18} strokeWidth={2.5} />
            @therealbrianmark
          </a>
        </div>

        <p className={styles.footNote}>
          Questions? Reply to the confirmation email and our team will get back to you.
        </p>
      </div>
    </div>
  );
}
