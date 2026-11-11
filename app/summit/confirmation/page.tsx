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
const WISTIA_MEDIA_ID = "";
const WISTIA_ASPECT = "1.7777777777777777";

// Saturday Nov 21 and Sunday Nov 22, 2026. The calendar end date is exclusive,
// so it is the day after the last day.
const CAL_START = "20261121";
const CAL_END_EXCLUSIVE = "20261123";
const EVENT_WHEN = "Saturday, November 21st & Sunday, November 22nd, 2026";

// Brian asks registrants to DM the word SUMMIT to confirm. ig.me opens the
// message thread directly instead of dropping them on the profile.
const INSTAGRAM_DM_URL = "https://ig.me/m/therealbrianmark";
const INSTAGRAM_HANDLE = "@therealbrianmark";

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
  `&allday=true&startdt=${dashed(CAL_START)}&enddt=${dashed(CAL_END_EXCLUSIVE)}&body=` +
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
            <a className={styles.calLink} href={OUTLOOK_CAL} target="_blank" rel="noopener noreferrer">
              Outlook
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
