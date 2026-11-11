"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { CheckCircle2, CalendarDays, Instagram, MessageCircle, MessagesSquare } from "lucide-react";
import { useFbTrack } from "@/lib/useFbTrack";
import styles from "./confirmation.module.css";

// ───────────────────────────────────────────────────────────────────────────
// EVENT CONFIG — keep in step with app/summit/page.tsx.
// ───────────────────────────────────────────────────────────────────────────

// The confirmation-page video. Leave empty and the frame shows a neutral
// placeholder rather than a broken embed.
const WISTIA_MEDIA_ID = "czmuvggzj0";
const WISTIA_ASPECT = "1.7777777777777777";

// Saturday Nov 21 and Sunday Nov 22, 2026. The calendar end date is exclusive,
// so it is the day after the last day.
const CAL_START = "20261121";
const CAL_END_EXCLUSIVE = "20261123";
const EVENT_WHEN = "Saturday, November 21st & Sunday, November 22nd, 2026";

// The Zoom room registrants join. It rides along in every calendar event, as
// the location and in the notes, so the link is on the invite itself.
const ZOOM_URL = "https://us02web.zoom.us/j/5173145585";

// Start time in Pacific, as "HH:MM" on a 24-hour clock, plus how many minutes
// each day runs. Leave START_TIME_PT empty and the calendar entries stay
// all-day events covering both days — which is what they are until the start
// time is known, rather than a guessed hour in someone's calendar.
const START_TIME_PT = "";
const DURATION_MINUTES = 240;

// Nov 21-22 2026 is after US daylight saving ends on Nov 1, so Pacific is
// UTC-8 on both days. Fixed offset is safe for these two dates.
const PT_OFFSET_HOURS = 8;

function toUtcStamp(yyyymmdd: string, hhmm: string, addMinutes = 0): string {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(
    Date.UTC(
      Number(yyyymmdd.slice(0, 4)),
      Number(yyyymmdd.slice(4, 6)) - 1,
      Number(yyyymmdd.slice(6, 8)),
      h + PT_OFFSET_HOURS,
      m
    )
  );
  d.setUTCMinutes(d.getUTCMinutes() + addMinutes);
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

const isTimed = Boolean(START_TIME_PT);

// RFC 5545 caps a content line at 75 octets; longer ones fold onto a
// continuation line beginning with a single space. Some calendar clients
// reject an over-long line outright, so fold before writing the file.
function foldIcsLine(line: string): string {
  const bytes = Array.from(new TextEncoder().encode(line));
  if (bytes.length <= 75) return line;
  const out: string[] = [];
  let i = 0;
  let limit = 75;
  while (i < bytes.length) {
    let take = Math.min(limit, bytes.length - i);
    // Never split a multi-byte character: back off to a boundary byte.
    while (take > 0 && i + take < bytes.length && (bytes[i + take] & 0xc0) === 0x80) take--;
    out.push(new TextDecoder().decode(new Uint8Array(bytes.slice(i, i + take))));
    i += take;
    limit = 74; // continuation lines carry a leading space
  }
  return out.join("\r\n ");
}

// Brian asks registrants to DM the word SUMMIT to confirm. ig.me opens the
// message thread directly instead of dropping them on the profile.
const INSTAGRAM_DM_URL = "https://ig.me/m/therealbrianmark";
const INSTAGRAM_HANDLE = "@therealbrianmark";

const CAL_TITLE = "Online Trainer Virtual Summit";
const CAL_DETAILS =
  "Free 2-day Online Trainer Virtual Summit with Brian Mark.\n\nJoin on Zoom: " +
  ZOOM_URL +
  "\n\nNo replay guaranteed \u2014 join live.";

const dashed = (d: string) => `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;

// Both days in one entry. Timed entries repeat daily twice (Sat and Sun) so a
// registrant gets both days from a single tap; all-day entries span the range.
const GOOGLE_DATES = isTimed
  ? `${toUtcStamp(CAL_START, START_TIME_PT)}/${toUtcStamp(CAL_START, START_TIME_PT, DURATION_MINUTES)}`
  : `${CAL_START}/${CAL_END_EXCLUSIVE}`;

const GOOGLE_CAL =
  "https://www.google.com/calendar/render?action=TEMPLATE&text=" +
  encodeURIComponent(CAL_TITLE) +
  `&dates=${GOOGLE_DATES}` +
  (isTimed ? "&recur=" + encodeURIComponent("RRULE:FREQ=DAILY;COUNT=2") : "") +
  "&location=" +
  encodeURIComponent(ZOOM_URL) +
  "&details=" +
  encodeURIComponent(CAL_DETAILS);

// Apple reads the .ics, so it carries the Zoom link as LOCATION and URL as
// well as in the notes, and repeats daily twice when a start time is set.
const ICS = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "CALSCALE:GREGORIAN",
  "METHOD:PUBLISH",
  "PRODID:-//PT Domination//Virtual Summit//EN",
  "BEGIN:VEVENT",
  "UID:online-trainer-virtual-summit-2026@ptdomination",
  `DTSTAMP:${toUtcStamp(CAL_START, "00:00")}`,
  ...(isTimed
    ? [
        `DTSTART:${toUtcStamp(CAL_START, START_TIME_PT)}`,
        `DTEND:${toUtcStamp(CAL_START, START_TIME_PT, DURATION_MINUTES)}`,
        "RRULE:FREQ=DAILY;COUNT=2",
      ]
    : [
        `DTSTART;VALUE=DATE:${CAL_START}`,
        `DTEND;VALUE=DATE:${CAL_END_EXCLUSIVE}`,
      ]),
  "SUMMARY:" + CAL_TITLE,
  "LOCATION:" + ZOOM_URL,
  "URL:" + ZOOM_URL,
  // Literal \n is how a newline is escaped inside an ICS text value.
  "DESCRIPTION:" + CAL_DETAILS.replace(/\n/g, "\\n"),
  "END:VEVENT",
  "END:VCALENDAR",
]
  .map(foldIcsLine)
  .join("\r\n");
const APPLE_CAL = "data:text/calendar;charset=utf8," + encodeURIComponent(ICS);

export default function SummitConfirmationPage() {
  useFbTrack("CompleteRegistration");
  const videoRef = useRef<HTMLDivElement>(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!WISTIA_MEDIA_ID) return;
    if (videoRef.current && !hasLoaded.current) {
      hasLoaded.current = true;
      videoRef.current.innerHTML = `<wistia-player media-id="${WISTIA_MEDIA_ID}" aspect="${WISTIA_ASPECT}"></wistia-player>`;
    }
  }, []);

  return (
    <div className={styles.sc}>
      {WISTIA_MEDIA_ID && (
        <>
          <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
          <Script
            src={`https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`}
            strategy="afterInteractive"
            type="module"
          />
        </>
      )}

      <div className={styles.wrap}>
        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.checkBadge}>
            <CheckCircle2 size={38} strokeWidth={2.5} />
          </div>
          <h1>You Did It!</h1>
          <p className={styles.sub}>
            Welcome to the two-day Virtual Summit. Watch this quick video &mdash; there are two
            things to do before you leave this page.
          </p>
        </div>

        {/* Video */}
        <div className={styles.videoWrapper}>
          {WISTIA_MEDIA_ID ? (
            <div
              ref={videoRef}
              className={styles.wistiaEmbed}
              style={{
                aspectRatio: WISTIA_ASPECT,
                background:
                  "center / contain no-repeat url('https://fast.wistia.com/embed/medias/" +
                  WISTIA_MEDIA_ID +
                  "/swatch')",
              }}
            />
          ) : (
            <div className={styles.videoPlaceholder}>Video coming shortly</div>
          )}
        </div>

        {/* Step 1 — the DM. Brian calls this "thing number one" and points at the
            button right under the video, so it sits directly under the video. */}
        <div className={styles.dmCard}>
          <div className={styles.stepTag}>Step 1 &middot; Confirm your registration</div>
          <h2>
            DM Me the Word <span className={styles.accent}>&ldquo;SUMMIT&rdquo;</span> on Instagram
          </h2>
          <p>
            This is what confirms your spot. Tap the button, send the word{" "}
            <strong>SUMMIT</strong>, and you&rsquo;re locked in.
          </p>
          <a
            className={styles.dmBtn}
            href={INSTAGRAM_DM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={19} strokeWidth={2.5} />
            DM &ldquo;SUMMIT&rdquo; to {INSTAGRAM_HANDLE}
          </a>
        </div>

        {/* Step 2 — watch for the link */}
        <div className={styles.stepCard}>
          <div className={styles.stepIcon}>
            <MessagesSquare size={22} strokeWidth={2.3} />
          </div>
          <div className={styles.stepBody}>
            <div className={styles.stepTag}>Step 2</div>
            <h3>Watch for Your Zoom Link</h3>
            <p>
              We&rsquo;ll send the Zoom link by both <strong>text and email</strong> so you&rsquo;re
              certain to get the right one. If it&rsquo;s not in your inbox shortly, check
              promotions and spam.
            </p>
          </div>
        </div>

        {/* Save the date */}
        <div className={styles.calCard}>
          <div className={styles.calHead}>
            <CalendarDays size={20} strokeWidth={2.5} />
            Block Off the Weekend
          </div>
          <p className={styles.calWhen}>{EVENT_WHEN}</p>
          <p className={styles.calNote}>
            Yes, it&rsquo;s a Saturday and Sunday &mdash; and it will be the most valuable weekend
            you&rsquo;ve ever spent on your business.
          </p>
          <div className={styles.calLinks}>
            <a className={styles.calLink} href={GOOGLE_CAL} target="_blank" rel="noopener noreferrer">
              Google
            </a>
            <a className={styles.calLink} href={APPLE_CAL} download="virtual-summit.ics">
              Apple
            </a>
          </div>
        </div>

        {/* No replay / what you get */}
        <div className={styles.noReplay}>
          <div className={styles.noReplayHead}>
            <MessageCircle size={18} strokeWidth={2.5} />
            No replay guaranteed
          </div>
          <p>
            This is an event we&rsquo;re throwing in person and spending $100,000 on &mdash;
            we&rsquo;re broadcasting it live so you can attend. Show up live.
          </p>
          <p>
            You&rsquo;re getting the entire blueprint from start to finish: <strong>content</strong>,{" "}
            <strong>lead generation</strong>, <strong>sales</strong>, and <strong>mindset</strong>.
            Nothing held back, nothing gatekept behind a paywall.
          </p>
        </div>

        <p className={styles.footNote}>
          See you on the 21st. Questions? Reply to your confirmation email and our team will help.
        </p>
      </div>
    </div>
  );
}
