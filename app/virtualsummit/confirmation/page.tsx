"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { CheckCircle2, Heart, Instagram, CalendarDays } from "lucide-react";

const WISTIA_MEDIA_ID = "6yzfwy9zz6";
const INSTAGRAM_URL = "https://www.instagram.com/therealbrianmark/";

const GOFUNDME_URL = "https://gofund.me/7f4d1dbde";

// Two-day, all-day event (Aug 20–21, 2026). End date is exclusive (Aug 22).
const CAL_TITLE = "Online Trainer Virtual Summit";
const CAL_DETAILS =
  "Free Online Trainer Virtual Summit. Starts 9:00 AM PST each day. Your Zoom link is in your email and texts.";

const GOOGLE_CAL =
  "https://www.google.com/calendar/render?action=TEMPLATE&text=" +
  encodeURIComponent(CAL_TITLE) +
  "&dates=20260820/20260822&details=" +
  encodeURIComponent(CAL_DETAILS);

const OUTLOOK_CAL =
  "https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=" +
  encodeURIComponent(CAL_TITLE) +
  "&allday=true&startdt=2026-08-20&enddt=2026-08-22&body=" +
  encodeURIComponent(CAL_DETAILS);

const ICS = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//PT Domination//Virtual Summit//EN",
  "BEGIN:VEVENT",
  "UID:online-trainer-virtual-summit-2026@ptdomination",
  "DTSTART;VALUE=DATE:20260820",
  "DTEND;VALUE=DATE:20260822",
  "SUMMARY:" + CAL_TITLE,
  "DESCRIPTION:" + CAL_DETAILS,
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");
const APPLE_CAL = "data:text/calendar;charset=utf8," + encodeURIComponent(ICS);

export default function SummitConfirmationPage() {
  const videoRef = useRef<HTMLDivElement>(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (videoRef.current && !hasLoaded.current) {
      hasLoaded.current = true;
      videoRef.current.innerHTML = `<wistia-player media-id="${WISTIA_MEDIA_ID}" aspect="1.7777777777777777"></wistia-player>`;
    }
  }, []);

  return (
    <div className="sc">
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script
        src={`https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`}
        strategy="afterInteractive"
        type="module"
      />

      <div className="wrap">
        {/* Hero */}
        <div className="hero">
          <div className="check-badge">
            <CheckCircle2 size={38} strokeWidth={2.5} />
          </div>
          <h1>Thanks for Registering!</h1>
          <p className="sub">
            Check your email and texts for the Zoom link. Donate to the families affected by the
            wildfires below…
          </p>
          <div className="video-wrapper">
            <div
              ref={videoRef}
              className="wistia-embed"
              style={{
                background:
                  "center / contain no-repeat url('https://fast.wistia.com/embed/medias/" +
                  WISTIA_MEDIA_ID +
                  "/swatch')",
              }}
            />
          </div>
        </div>

        {/* Donate */}
        <div className="donate-card">
          <div className="icon-circle heart">
            <Heart size={22} />
          </div>
          <h2>Donate to the Wildfire Relief</h2>
          <p>
            100% of donations go directly to the families affected by the Kelowna &amp; British Columbia
            wildfires. Every bit helps.
          </p>
          <a className="cta-btn donate" href={GOFUNDME_URL} target="_blank" rel="noopener noreferrer">
            <Heart size={18} />
            Donate on GoFundMe →
          </a>
        </div>

        {/* Save the date + calendar */}
        <div className="section">
          <h2>Save the Date</h2>
          <p className="section-body">
            Thanks so much for registering. Save the date: it&apos;s <strong>August 20th and 21st</strong>.
            We&apos;re going to start at <strong>9:00 a.m. PST</strong>. Block it off in your calendar.
          </p>
          <p className="section-body">
            It will be the most valuable virtual event you&apos;ve ever attended{" "}
            <span className="hashtag">#DOMINATE</span>
          </p>
          <div className="cal-label">
            <CalendarDays size={16} /> Add to your calendar
          </div>
          <div className="cal-buttons">
            <a href={GOOGLE_CAL} target="_blank" rel="noopener noreferrer">Google</a>
            <a href={APPLE_CAL} download="virtual-summit.ics">Apple</a>
            <a href={OUTLOOK_CAL} target="_blank" rel="noopener noreferrer">Outlook</a>
          </div>
        </div>

        {/* DM SUMMIT */}
        <div className="section dm">
          <p className="section-body">
            DM me the word <strong>SUMMIT</strong> on Instagram.
          </p>
          <a className="cta-btn ig" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            <Instagram size={19} />
            DM &apos;SUMMIT&apos; on Instagram →
          </a>
        </div>
      </div>

      <style jsx global>{`
        body { background: #0a0e1a !important; }
        wistia-player { width: 100%; display: block; }
        wistia-player[media-id='${WISTIA_MEDIA_ID}']:not(:defined) {
          background: center / contain no-repeat
            url('https://fast.wistia.com/embed/medias/${WISTIA_MEDIA_ID}/swatch');
          display: block;
          filter: blur(5px);
          padding-top: 56.25%;
        }
      `}</style>

      <style jsx>{`
        .sc {
          --bg: #0a0e1a;
          --card: #111827;
          --border: rgba(0, 159, 238, 0.22);
          --blue: #00d9ff;
          --blue-dim: #009fee;
          --white: #f5f7fa;
          --muted: #9aa4b2;
          --body: #cbd2dc;
          --pink: #ff5a7a;
          background: var(--bg);
          color: var(--body);
          min-height: 100vh;
          line-height: 1.65;
        }
        .wrap { max-width: 640px; margin: 0 auto; padding: 50px 20px 72px; }

        .hero { text-align: center; }
        .check-badge {
          width: 74px;
          height: 74px;
          border-radius: 50%;
          margin: 0 auto 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #041016;
          background: linear-gradient(135deg, #009fee, #00ffff);
          box-shadow: 0 0 0 8px rgba(0, 217, 255, 0.08), 0 12px 34px rgba(0, 159, 238, 0.35);
        }
        h1 {
          color: var(--white);
          font-weight: 800;
          font-size: clamp(1.8rem, 5vw, 2.5rem);
          letter-spacing: -0.02em;
          margin-bottom: 14px;
        }
        .sub { color: var(--muted); max-width: 480px; margin: 0 auto 30px; font-size: 1.05rem; }
        .video-wrapper {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(0, 217, 255, 0.08);
          background: #0a1120;
        }
        .wistia-embed { width: 100%; aspect-ratio: 16 / 9; }

        h2 {
          color: var(--white);
          font-weight: 800;
          font-size: clamp(1.35rem, 3.6vw, 1.7rem);
        }

        .donate-card {
          margin-top: 40px;
          text-align: center;
          background: rgba(255, 90, 122, 0.07);
          border: 1px solid rgba(255, 90, 122, 0.32);
          border-radius: 18px;
          padding: 32px 24px;
        }
        .icon-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-circle.heart {
          color: var(--pink);
          border: 1.5px solid rgba(255, 90, 122, 0.5);
          background: rgba(255, 90, 122, 0.1);
        }
        .donate-card p { margin: 12px auto 0; max-width: 440px; }

        .cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          margin-top: 22px;
          padding: 16px 22px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 1.02rem;
          text-decoration: none;
          transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .cta-btn.donate {
          color: #fff;
          background: linear-gradient(135deg, #ff5a7a, #ff2e63);
          box-shadow: 0 12px 30px rgba(255, 46, 99, 0.3);
        }
        .cta-btn.donate:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(255, 46, 99, 0.45); }
        .cta-btn.ig {
          color: #041016;
          background: linear-gradient(135deg, #009fee, #00ffff);
          box-shadow: 0 12px 30px rgba(0, 159, 238, 0.3);
        }
        .cta-btn.ig:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(0, 159, 238, 0.45); }

        .section { margin-top: 44px; text-align: center; }
        .section-body { color: var(--body); max-width: 500px; margin: 0 auto 14px; }
        .section-body strong { color: var(--white); }
        .hashtag { color: var(--blue); font-weight: 800; }

        .cal-label {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin: 18px 0 12px;
          color: var(--muted);
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .cal-buttons { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        .cal-buttons a {
          flex: 1;
          min-width: 96px;
          max-width: 160px;
          padding: 12px 14px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 700;
          color: var(--white);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .cal-buttons a:hover { background: rgba(0, 159, 238, 0.12); border-color: rgba(0, 217, 255, 0.6); }

        .dm { margin-top: 40px; }
      `}</style>
    </div>
  );
}
