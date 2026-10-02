"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useFbTrack } from "@/lib/useFbTrack";
import styles from "./booked.module.css";

// Only qualified applicants from /cashflowcontent are sent here.
const CALENDLY_URL =
  "https://calendly.com/d/dtdh-xph-8sr/pt-dom-high-performance-content-strategy-meeting?utm_source=selfbooked";

// Dark theme to match the page, plus the params Calendly needs for an inline embed.
const CALENDLY_EMBED = `${CALENDLY_URL}&hide_gdpr_banner=1&background_color=111827&text_color=f5f2ed&primary_color=00d9ff`;

// Floor for the embed, so a short step cannot collapse the card.
const MIN_CAL_HEIGHT = 820;

export default function BookedPage() {
  useFbTrack("PageView");
  const router = useRouter();

  // Calendly reports how tall its content is on every step. Matching the
  // container to that is what keeps the widget from scrolling inside itself.
  // The initial value is a tall-enough guess for the first paint, before any
  // message arrives.
  const [calHeight, setCalHeight] = useState(1100);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (typeof e.origin !== "string" || !e.origin.includes("calendly.com")) return;

      // A booking sends people to the confirmation page, without relying on
      // Calendly's own redirect setting.
      if (e.data?.event === "calendly.event_scheduled") {
        router.push("/booked/confirmed");
        return;
      }

      if (e.data?.event === "calendly.page_height") {
        const reported = parseInt(String(e.data.payload?.height ?? ""), 10);
        // Calendly emits a couple of tiny heights while it boots, so floor the
        // value; the buffer absorbs rounding so no step ends up a few pixels short.
        if (!Number.isNaN(reported) && reported > 400) {
          setCalHeight(Math.max(reported + 24, MIN_CAL_HEIGHT));
        }
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [router]);

  return (
    <div className={styles.page}>
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />

      <section className={styles.hero}>
        <div className={styles.wrap}>
          <div className={styles.eyebrow}>You&rsquo;re Approved To Book</div>
          <h1>
            Pick A Time For Your <span className={styles.accent}>Strategy Call</span>
          </h1>
          <p className={styles.sub}>
            Your application came back a fit. Grab the time that works best for you below, and
            you&rsquo;ll get a calendar invite the moment you book.
          </p>
        </div>
      </section>

      <section className={styles.calSection}>
        <div className={styles.wrap}>
          <div className={styles.calCard}>
            <div className={styles.calHeader}>
              <h2>High Performance Content Strategy Meeting</h2>
              <p>Choose a day and time below</p>
            </div>
            <div
              className={`calendly-inline-widget ${styles.calEmbed}`}
              data-url={CALENDLY_EMBED}
              data-resize="true"
              style={{ height: calHeight }}
            />
          </div>
        </div>
      </section>

      <section className={styles.notes}>
        <div className={styles.wrap}>
          <div className={styles.notesGrid}>
            <div className={styles.note}>
              <div className={styles.noteLabel}>Where</div>
              <p className={styles.noteBody}>
                <strong>On Zoom.</strong> Your link arrives by email as soon as you book.
              </p>
            </div>
            <div className={styles.note}>
              <div className={styles.noteLabel}>Bring</div>
              <p className={styles.noteBody}>
                Your current numbers and your Instagram open. <strong>This is a working session.</strong>
              </p>
            </div>
            <div className={styles.note}>
              <div className={styles.noteLabel}>Heads Up</div>
              <p className={styles.noteBody}>
                Show up on time and be somewhere you can talk. <strong>No-shows lose the slot.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2026 PT Domination. All rights reserved.</p>
        <p>This site is not a part of the Facebook/Meta website or Facebook/Meta Inc.</p>
      </footer>
    </div>
  );
}
