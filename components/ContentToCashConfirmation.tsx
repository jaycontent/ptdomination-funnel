"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { CheckCircle2, Mail, Instagram, CalendarDays, Check } from "lucide-react";
import { getNextWebinarDate } from "@/lib/date";

const WISTIA_MEDIA_ID = "ts9063p5qr";
const INSTAGRAM_URL = "https://www.instagram.com/therealbrianmark/";

const webinar = getNextWebinarDate();

const CAL_TITLE = "The Instagram Marketing Funnel — Free Masterclass";
const CAL_DETAILS = "Your Zoom link is in your email and texts. Show up live for the slides + live Q&A.";
const GOOGLE_CAL =
  "https://www.google.com/calendar/render?action=TEMPLATE&text=" +
  encodeURIComponent(CAL_TITLE) +
  `&dates=${webinar.utcStart}/${webinar.utcEnd}&details=` +
  encodeURIComponent(CAL_DETAILS);
const OUTLOOK_CAL =
  "https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=" +
  encodeURIComponent(CAL_TITLE) +
  `&startdt=${webinar.utcStartFull}&enddt=${webinar.utcEndFull}&body=` +
  encodeURIComponent(CAL_DETAILS);
const ICS = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//PT Domination//Masterclass//EN",
  "BEGIN:VEVENT",
  "UID:content-to-cash-masterclass@ptdomination",
  `DTSTART:${webinar.utcStart}`,
  `DTEND:${webinar.utcEnd}`,
  "SUMMARY:" + CAL_TITLE,
  "DESCRIPTION:" + CAL_DETAILS,
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");
const APPLE_CAL = "data:text/calendar;charset=utf8," + encodeURIComponent(ICS);

const EXPECT = [
  "The Instagram Marketing Funnel — connection content, conversion value, and social proof — and what to post at each stage",
  "What to post to get followers vs. what to post to get clients",
  "How to turn views into DMs, and DMs into booked, qualified sales calls",
  "Why the 2026 algorithm suppresses your reach — and the metric that makes you go viral",
];

const BONUSES = [
  {
    n: 1,
    eyebrow: "Live-only bonus",
    title: "The Masterclass Slide Deck",
    desc: "Show up live and you'll get the complete slides so you can revisit every framework and strategy any time.",
  },
  {
    n: 2,
    eyebrow: "Live-only bonus",
    title: "Live Q&A at the End",
    desc: "Stick around and Brian answers your content questions live — how to grow and sell on social media, tailored to your business.",
  },
];

export default function ContentToCashConfirmation() {
  const videoRef = useRef<HTMLDivElement>(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (videoRef.current && !hasLoaded.current) {
      hasLoaded.current = true;
      videoRef.current.innerHTML = `<wistia-player media-id="${WISTIA_MEDIA_ID}" aspect="1.7777777777777777"></wistia-player>`;
    }
  }, []);

  return (
    <>
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script
        src={`https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`}
        strategy="afterInteractive"
        type="module"
      />

      <div className="conf">
        <div className="sticky-bar">
          <Check size={16} strokeWidth={3} />
          <span>You&apos;re registered — check your email &amp; texts for the Zoom link.</span>
        </div>

        <div className="wrap">
          {/* Hero */}
          <div className="hero">
            <div className="check-badge">
              <CheckCircle2 size={38} strokeWidth={2.5} />
            </div>
            <h1>You&apos;re Registered — Watch This First</h1>
            <p className="hero-sub">
              A couple of quick things to get the most out of the masterclass. Watch this short video, then
              do the two steps below.
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

          {/* Step 1 — DM BOOKED */}
          <div className="section">
            <div className="section-head">
              <span className="num-badge">1</span>
              <h2>Grab Your Free Pre-Masterclass Training</h2>
            </div>
            <p className="section-body">
              DM me the word <strong>BOOKED</strong> on Instagram and I&apos;ll send you a free training in
              advance — so I give you value before you even show up.
            </p>
            <a className="cta-btn primary" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <Instagram size={19} />
              DM &apos;BOOKED&apos; on Instagram &rarr;
            </a>
          </div>

          {/* Step 2 — Save the date / calendar */}
          <div className="email-card">
            <div className="icon-circle">
              <Mail size={22} />
            </div>
            <h2>We&apos;ll Text &amp; Email You the Zoom Link</h2>
            <p>
              Your Zoom link is on its way to your inbox and phone. Show up live on{" "}
              <strong>{webinar.dayName}</strong> — I&apos;ll reveal everything, no gatekeeping.
            </p>
            <div className="date-pill">
              <CalendarDays size={16} />
              {webinar.longDisplay} at 4:30 PM PST
            </div>
            <div className="cal-buttons">
              <a href={GOOGLE_CAL} target="_blank" rel="noopener noreferrer">Google</a>
              <a href={APPLE_CAL} download="masterclass.ics">Apple</a>
              <a href={OUTLOOK_CAL} target="_blank" rel="noopener noreferrer">Outlook</a>
            </div>
          </div>

          {/* What to expect */}
          <div className="section">
            <h2 className="expect-title">What You&apos;ll Learn on the Masterclass</h2>
            <ul className="expect-list">
              {EXPECT.map((item, i) => (
                <li key={i}>
                  <CheckCircle2 size={20} className="li-check" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonial */}
          <blockquote className="testimonial">
            <p>
              &ldquo;My client K Capital scaled from 15,000 followers to{" "}
              <strong>1.3 million — and from $80K/month to $2M/month.</strong> He&apos;s a business owner who
              wanted to learn how to grow and sell on social media. I&apos;ll give you the same funnel on the
              masterclass.&rdquo;
            </p>
            <cite>— Brian Mark, PT Domination</cite>
          </blockquote>

          {/* Bonuses */}
          <div className="section">
            <h2>Just for Showing Up Live, You&apos;ll Get:</h2>
            <div className="bonus-list">
              {BONUSES.map((b) => (
                <div key={b.n} className="bonus-card">
                  <span className="num-badge">{b.n}</span>
                  <div>
                    <div className="bonus-meta">{b.eyebrow}</div>
                    <div className="bonus-title">{b.title}</div>
                    <p className="bonus-desc">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="bonus-note">
              I respect your time — so show up live and every minute will be worth it.
            </p>
          </div>

          {/* Final CTA */}
          <div className="final">
            <p>
              First step — DM me <strong>BOOKED</strong> on Instagram for your free training. See you on the
              inside.
            </p>
            <a className="cta-btn ghost" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <Instagram size={18} />
              DM &apos;BOOKED&apos; on Instagram &rarr;
            </a>
          </div>
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
        .conf {
          --bg: #0a0e1a;
          --card: #111827;
          --border: rgba(0, 159, 238, 0.22);
          --blue: #00d9ff;
          --blue-dim: #009fee;
          --white: #f5f7fa;
          --muted: #9aa4b2;
          --body: #cbd2dc;
          background: var(--bg);
          color: var(--body);
          min-height: 100vh;
          line-height: 1.65;
        }
        .sticky-bar {
          position: sticky;
          top: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 16px;
          text-align: center;
          font-weight: 800;
          font-size: 0.82rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: #041016;
          background: linear-gradient(90deg, #009fee, #00ffff);
        }
        .wrap { max-width: 640px; margin: 0 auto; padding: 40px 20px 72px; }

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
          font-size: clamp(1.7rem, 5vw, 2.4rem);
          letter-spacing: -0.02em;
          margin-bottom: 14px;
        }
        .hero-sub { color: var(--muted); max-width: 500px; margin: 0 auto 30px; font-size: 1.02rem; }
        .video-wrapper {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(0, 217, 255, 0.08);
          background: #0a1120;
        }
        .wistia-embed { width: 100%; aspect-ratio: 16 / 9; }

        h2 { color: var(--white); font-weight: 800; font-size: clamp(1.3rem, 3.6vw, 1.7rem); letter-spacing: -0.01em; }

        .section { margin-top: 44px; }
        .section-head { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .num-badge {
          flex-shrink: 0;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.95rem;
          color: #041016;
          background: linear-gradient(135deg, #009fee, #00ffff);
        }
        .section-body { color: var(--body); }
        .section-body strong { color: var(--white); }

        .cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          margin-top: 20px;
          padding: 16px 22px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 1.02rem;
          text-decoration: none;
          transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .cta-btn.primary {
          color: #041016;
          background: linear-gradient(135deg, #009fee, #00ffff);
          box-shadow: 0 12px 30px rgba(0, 159, 238, 0.3);
        }
        .cta-btn.primary:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(0, 159, 238, 0.45); }
        .cta-btn.ghost {
          color: var(--white);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
        }
        .cta-btn.ghost:hover { background: rgba(0, 159, 238, 0.12); border-color: rgba(0, 217, 255, 0.6); }

        .email-card {
          margin-top: 40px;
          text-align: center;
          background: rgba(0, 159, 238, 0.06);
          border: 1px solid var(--border);
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
          color: var(--blue);
          border: 1.5px solid rgba(0, 217, 255, 0.5);
          background: rgba(0, 217, 255, 0.08);
        }
        .email-card p { margin: 12px auto 0; max-width: 440px; }
        .email-card strong { color: var(--white); }
        .date-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 18px;
          padding: 9px 16px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.92rem;
          color: var(--blue);
          background: rgba(0, 217, 255, 0.1);
          border: 1px solid rgba(0, 217, 255, 0.3);
        }
        .cal-buttons { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 18px; }
        .cal-buttons a {
          flex: 1;
          min-width: 92px;
          max-width: 150px;
          padding: 11px 14px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 700;
          color: var(--white);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .cal-buttons a:hover { background: rgba(0, 159, 238, 0.12); border-color: rgba(0, 217, 255, 0.6); }

        .expect-title { margin-bottom: 18px; }
        .expect-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 14px; }
        .expect-list li { display: flex; gap: 12px; align-items: flex-start; color: var(--body); }
        .li-check { color: var(--blue); flex-shrink: 0; margin-top: 2px; }

        .testimonial {
          margin: 44px 0 0;
          padding: 22px 24px;
          border-left: 3px solid var(--blue);
          background: linear-gradient(180deg, rgba(0, 217, 255, 0.06), transparent);
          border-radius: 0 14px 14px 0;
        }
        .testimonial p { color: var(--white); font-style: italic; font-size: 1.05rem; }
        .testimonial strong { color: var(--blue); font-style: normal; }
        .testimonial cite { display: block; margin-top: 12px; color: var(--muted); font-style: normal; font-size: 0.9rem; }

        .bonus-list { display: grid; gap: 14px; margin-top: 18px; }
        .bonus-card {
          display: flex;
          gap: 14px;
          padding: 20px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 14px;
        }
        .bonus-meta { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--blue); margin-bottom: 6px; }
        .bonus-title { color: var(--white); font-weight: 800; font-size: 1.08rem; margin-bottom: 6px; }
        .bonus-desc { color: var(--muted); font-size: 0.94rem; }
        .bonus-note { text-align: center; color: var(--muted); font-size: 0.9rem; margin-top: 18px; }

        .final { margin-top: 48px; text-align: center; }
        .final p { color: var(--body); font-size: 1.05rem; max-width: 460px; margin: 0 auto; }
        .final strong { color: var(--white); }
        .final .cta-btn { max-width: 460px; margin-left: auto; margin-right: auto; }
      `}</style>
    </>
  );
}
