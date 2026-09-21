"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { getNextWebinarDateOnDays } from "@/lib/date";

const WISTIA_MEDIA_ID = "2yyxfjrgkv";
const WISTIA_ASPECT = "1.8045112781954886";
const INSTAGRAM_URL = "https://www.instagram.com/therealbrianmark/";

// Wednesdays at 4:30 PM PST, matching the landing page.
const webinar = getNextWebinarDateOnDays([3]);

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
    <div className="live-conf">
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script
        src={`https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`}
        strategy="afterInteractive"
        type="module"
      />

      <div className="topbar">
        You&rsquo;re registered &nbsp;·&nbsp; <span>Check your email for the Zoom link</span>
      </div>

      {/* HERO */}
      <div className="hero">
        <div className="wrap center">
          <div className="eyebrow">You&rsquo;re In</div>
          <h1>Your Seat Is Saved. Watch This First</h1>
          <p className="sub">
            Your spot on <b>{webinar.longDisplay}</b> is confirmed. Watch this short video from Brian, then
            do the one thing below so you get everything out of the training.
          </p>
          <div className="hero-shot">
            <div
              ref={videoRef}
              className="video"
              style={{
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
      <section className="steps">
        <div className="wrap center">
          <div className="kicker">One Thing Before The Training</div>
          <h2>Do This Now, It Takes A Minute</h2>

          <div className="step-card">
            <div className="num">1</div>
            <div className="step-body">
              <h3>DM Brian the word &ldquo;BOOKED&rdquo;</h3>
              <p>
                Send him <b>BOOKED</b> on Instagram so he knows you&rsquo;re coming, and he&rsquo;ll send you
                something to work through before the training starts.
              </p>
              <a className="btn ghost" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                DM &lsquo;BOOKED&rsquo; ON INSTAGRAM
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT DETAILS */}
      <section className="details">
        <div className="wrap center">
          <div className="kicker">Event Details</div>
          <h2>The Conversation Engine: Live</h2>
          <div className="detail-grid">
            <div className="card">
              <div className="lbl">When</div>
              <div className="val">
                {webinar.longDisplay}
                <br />
                7:30 PM ET / 4:30 PM PT
              </div>
            </div>
            <div className="card">
              <div className="lbl">Where</div>
              <div className="val">
                Live on Zoom <em>(the link is in your confirmation email)</em>
              </div>
            </div>
            <div className="card">
              <div className="lbl">Bring</div>
              <div className="val">
                Your phone, your Instagram open, and something to write with.{" "}
                <em>This is a working session, not a listening session.</em>
              </div>
            </div>
          </div>
          <div className="replay">
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

      <style jsx global>{`
        body {
          background: #ffffff !important;
        }
      `}</style>

      <style jsx>{`
        .live-conf {
          --ink: #0d0d0f;
          --body: #3a3a3e;
          --muted: #77737a;
          --accent: #009fee;
          --accent-dark: #0080d6;
          --accent-soft: #5fd0ff;
          --panel: #f6f5f3;
          --line: #e6e3dd;
          --paper: #ffffff;

          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: var(--body);
          background: var(--paper);
          line-height: 1.6;
          font-size: 17px;
        }
        .live-conf :global(*) {
          box-sizing: border-box;
        }
        .wrap {
          max-width: 840px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .center {
          text-align: center;
        }

        .topbar {
          background: var(--ink);
          color: #fff;
          text-align: center;
          padding: 10px 16px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .topbar span {
          color: var(--accent-soft);
        }

        .hero {
          padding: 56px 0 52px;
          background: radial-gradient(1200px 500px at 50% -10%, #1d1d22 0%, var(--ink) 60%);
          color: #fff;
        }
        .eyebrow {
          display: inline-block;
          font-size: 12.5px;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent-soft);
          border: 1px solid rgba(95, 208, 255, 0.45);
          border-radius: 999px;
          padding: 8px 18px;
          margin-bottom: 24px;
        }
        h1 {
          font-size: clamp(28px, 4.6vw, 42px);
          line-height: 1.13;
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.01em;
          max-width: 18em;
          margin: 0 auto 18px;
        }
        .sub {
          font-size: clamp(16px, 2.2vw, 19px);
          line-height: 1.65;
          color: #c9c7cf;
          max-width: 42em;
          margin: 0 auto;
        }
        .sub b {
          color: #fff;
        }

        .hero-shot {
          max-width: 680px;
          margin: 36px auto 0;
        }
        .video {
          position: relative;
          width: 100%;
          aspect-ratio: ${WISTIA_ASPECT};
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #34323a;
          background: #232228;
        }
        .video :global(wistia-player) {
          width: 100%;
          height: 100%;
        }

        section {
          padding: 60px 0;
        }
        .kicker {
          font-size: 12.5px;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 14px;
        }
        h2 {
          font-size: clamp(24px, 3.6vw, 33px);
          line-height: 1.2;
          font-weight: 900;
          color: var(--ink);
          letter-spacing: -0.01em;
          margin-bottom: 18px;
        }

        /* steps */
        .step-card {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          text-align: left;
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 24px 26px;
          max-width: 640px;
          margin: 18px auto 0;
        }
        .num {
          flex: 0 0 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--accent);
          color: #fff;
          font-weight: 900;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .step-body h3 {
          font-size: 19px;
          font-weight: 900;
          color: var(--ink);
          margin-bottom: 8px;
        }
        .step-body p {
          font-size: 16px;
          margin-bottom: 16px;
        }
        .step-body b {
          color: var(--ink);
        }

        .btn {
          display: inline-block;
          background: var(--accent);
          color: #fff;
          text-decoration: none;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.03em;
          padding: 14px 28px;
          border-radius: 10px;
          box-shadow: 0 8px 20px rgba(0, 159, 238, 0.28);
          transition: transform 0.1s ease, background 0.15s ease;
        }
        .btn:hover {
          background: var(--accent-dark);
          transform: translateY(-1px);
        }
        .btn.ghost {
          background: #fff;
          color: var(--accent);
          border: 1px solid var(--accent);
          box-shadow: none;
        }
        .btn.ghost:hover {
          background: var(--accent);
          color: #fff;
        }

        /* event details */
        .details {
          background: var(--panel);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 14px;
          margin: 30px 0 6px;
          text-align: left;
        }
        .card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 20px 22px;
        }
        .card .lbl {
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 6px;
        }
        .card .val {
          font-size: 16.5px;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.45;
        }
        .card .val em {
          font-weight: 400;
          font-style: normal;
          color: var(--body);
          font-size: 15px;
        }
        .replay {
          max-width: 44em;
          margin: 26px auto 0;
          font-size: 15.5px;
          color: var(--body);
          background: #fff;
          border: 1px solid var(--line);
          border-left: 4px solid var(--accent);
          border-radius: 10px;
          padding: 18px 22px;
          text-align: left;
        }
        .replay b {
          color: var(--ink);
        }

        footer {
          border-top: 1px solid var(--line);
          padding: 26px 24px;
          text-align: center;
          font-size: 12.5px;
          color: var(--muted);
        }

        @media (max-width: 640px) {
          section {
            padding: 46px 0;
          }
          .hero {
            padding: 44px 0 40px;
          }
          .step-card {
            flex-direction: column;
            gap: 14px;
          }
        }
      `}</style>
    </div>
  );
}
