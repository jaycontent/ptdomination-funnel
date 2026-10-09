"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { getNextWebinarDate } from "@/lib/date";
import styles from "./ContentCashFlowLiveConfirmation.module.css";

const WISTIA_MEDIA_ID = "2yyxfjrgkv";
const WISTIA_ASPECT = "1.8045112781954886";
const INSTAGRAM_URL = "https://www.instagram.com/therealbrianmark/";

// Mondays and Thursdays at 4:30 PM PT / 7:30 PM ET, matching the landing page.
const webinar = getNextWebinarDate();

// No add-to-calendar button here: Zoom issues each registrant their own join
// link, so there is no shared URL a calendar event could point at.

// trackPixel is true only on the /confirmation page, which registrants reach
// by answering yes to the qualifier. The /confirmation-b duplicate renders the
// same thing without reporting a conversion to Meta.
export default function ContentCashFlowLiveConfirmation({
  trackPixel = false,
}: {
  trackPixel?: boolean;
}) {
  const videoRef = useRef<HTMLDivElement>(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (videoRef.current && !hasLoaded.current) {
      hasLoaded.current = true;
      videoRef.current.innerHTML = `<wistia-player media-id="${WISTIA_MEDIA_ID}" aspect="${WISTIA_ASPECT}"></wistia-player>`;
    }
  }, []);

  // Fire CompleteRegistration once the pixel is on the page.
  useEffect(() => {
    if (!trackPixel) return;
    const interval = setInterval(() => {
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "CompleteRegistration");
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [trackPixel]);

  return (
    <div className={styles.liveConf}>
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script
        src={`https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`}
        strategy="afterInteractive"
        type="module"
      />

      <div className={styles.topbar}>
        You&rsquo;re registered &nbsp;·&nbsp; <span>Check your email for the Zoom link</span>
      </div>

      {/* HERO */}
      <div className={styles.hero}>
        <div className={`${styles.wrap} ${styles.center}`}>
          <div className={styles.eyebrow}>You&rsquo;re In</div>
          <h1>Your Seat Is Saved. Watch This First</h1>
          <p className={styles.sub}>
            Your spot on <b>{webinar.longDisplay}</b> is confirmed. Watch this short video from Brian, then
            do the one thing below so you get everything out of the training.
          </p>
          <div className={styles.heroShot}>
            <div
              ref={videoRef}
              className={styles.video}
              style={{
                aspectRatio: WISTIA_ASPECT,
                background:
                  "center / contain no-repeat url('https://fast.wistia.com/embed/medias/" +
                  WISTIA_MEDIA_ID +
                  "/swatch')",
              }}
            />
          </div>
        </div>
      </div>

      {/* NEXT STEPS */}
      <section className={styles.steps}>
        <div className={`${styles.wrap} ${styles.center}`}>
          <div className={styles.kicker}>One Thing Before The Training</div>
          <h2>Do This Now, It Takes A Minute</h2>

          <div className={styles.stepCard}>
            <div className={styles.num}>1</div>
            <div className={styles.stepBody}>
              <h3>DM Brian the word &ldquo;BOOKED&rdquo;</h3>
              <p>
                Send him <b>BOOKED</b> on Instagram so he knows you&rsquo;re coming, and he&rsquo;ll send you
                something to work through before the training starts.
              </p>
              <a className={`${styles.btn} ${styles.ghost}`} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                DM &lsquo;BOOKED&rsquo; ON INSTAGRAM
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT DETAILS */}
      <section className={styles.details}>
        <div className={`${styles.wrap} ${styles.center}`}>
          <div className={styles.kicker}>Event Details</div>
          <h2>The Conversation Engine: Live</h2>
          <div className={styles.detailGrid}>
            <div className={styles.card}>
              <div className={styles.lbl}>When</div>
              <div className={styles.val}>
                {webinar.longDisplay}
                <br />
                7:30 PM ET / 4:30 PM PT
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.lbl}>Where</div>
              <div className={styles.val}>
                Live on Zoom <em>(the link is in your confirmation email)</em>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.lbl}>Bring</div>
              <div className={styles.val}>
                Your phone, your Instagram open, and something to write with.{" "}
                <em>This is a working session, not a listening session.</em>
              </div>
            </div>
          </div>
          <div className={styles.replay}>
            <b>A word about the replay:</b> we may send a limited replay, we may not. Brian teaches with
            live audience answers on screen, and half of what makes this work can&rsquo;t be replicated on a
            recording. Plan to be in the room.
          </div>
        </div>
      </section>

      <footer>
        &copy; 2026 Brian Mark · PT Domination &nbsp;·&nbsp; Privacy Policy &nbsp;·&nbsp; Terms &nbsp;·&nbsp;
        Earnings Disclaimer
        <br />
        This site is not a part of the Facebook/Instagram website or Meta Platforms, Inc. Results shared are
        client-reported and not typical.
      </footer>


    </div>
  );
}
