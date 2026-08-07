"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { CheckCircle2, Mail, Instagram, CalendarDays, Check } from "lucide-react";
import { getNextWebinarDate } from "@/lib/date";

const WISTIA_MEDIA_ID = "a5356enkcj";
const INSTAGRAM_URL = "https://www.instagram.com/therealbrianmark/";

const webinar = getNextWebinarDate();

const EXPECT = [
  "How to use AI to write content that converts — not generic ChatGPT slop",
  "The personal branding system my clients use to get consistent inbound leads",
  "How to turn followers into booked high-ticket sales calls",
  "LIVE audit — I'll pull up 5 attendees' profiles live. If you're there, you're eligible. If you're not, you're not.",
];

const BONUSES = [
  {
    n: 1,
    eyebrow: "Bonus 1",
    value: "$197 value",
    title: "Full Masterclass Slide Deck",
    desc: "The complete reference deck from this training so you can revisit every framework and strategy at any time.",
  },
  {
    n: 2,
    eyebrow: "Bonus 2",
    value: "$297 value",
    title: "90-Minute DM Sales Training",
    desc: "Recorded live at a private event — the exact DM framework our top coaches use to close high-ticket clients without feeling pushy.",
  },
];

export default function ConfirmationContent() {
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
        {/* Sticky registered bar */}
        <div className="sticky-bar">
          <Check size={16} strokeWidth={3} />
          <span>You&apos;re registered — check your inbox for your join link.</span>
        </div>

        <div className="wrap">
          {/* Hero */}
          <div className="hero">
            <div className="check-badge">
              <CheckCircle2 size={38} strokeWidth={2.5} />
            </div>
            <h1>
              Watch This Video to Get Ahead of the <span className="accent">Live Class</span>
            </h1>
            <p className="hero-sub">
              Watch this 2-min video — I&apos;m picking 5 attendees live for profile audits. If
              you&apos;re there, you&apos;re eligible. If you&apos;re not, you&apos;re not.
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

          {/* Email confirmation card */}
          <div className="email-card">
            <div className="icon-circle">
              <Mail size={22} />
            </div>
            <h2>We Emailed You Your Join Link</h2>
            <p>
              Your unique Zoom join link is on its way to your inbox right now. Check your email to
              grab it — that&apos;s how you&apos;ll get into the masterclass on{" "}
              <strong>{webinar.dayName}</strong>.
            </p>
            <div className="date-pill">
              <CalendarDays size={16} />
              {webinar.longDisplay} at 4:30 PM PST
            </div>
            <p className="spam-note">Can&apos;t find it? Check your spam or promotions folder.</p>
          </div>

          {/* Pre-masterclass training */}
          <div className="section">
            <div className="section-head">
              <span className="num-badge">2</span>
              <h2>Now Grab Your Pre-Masterclass Training</h2>
            </div>
            <p className="section-body">
              You&apos;re on the list — now get ahead. I recorded a training on using AI to make more
              money with your coaching right now. DM me the word <strong>BOOKED</strong> on Instagram
              and I&apos;ll send it to you free so you hit the ground running on{" "}
              <strong>{webinar.dayName}</strong>.
            </p>
            <a className="cta-btn primary" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <Instagram size={19} />
              Send Me &apos;BOOKED&apos; on Instagram &rarr;
            </a>
          </div>

          {/* What to expect */}
          <div className="section">
            <h2 className="expect-title">What to Expect at the Masterclass</h2>
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
              &ldquo;One coaching call changed one thing for my client Sammy. 3 days later — 2 inbound
              applications and <strong>$13.7K in the first 5 days of the month.</strong> I&apos;m
              giving you the same frameworks in this free masterclass.&rdquo;
            </p>
            <cite>— Brian Mark, PT Domination</cite>
          </blockquote>

          {/* Bonuses */}
          <div className="section">
            <h2>Just for Showing Up Live, You&apos;ll Also Get:</h2>
            <div className="bonus-eyebrow">$500+ in bonuses — live attendees only</div>
            <div className="bonus-list">
              {BONUSES.map((b) => (
                <div key={b.n} className="bonus-card">
                  <span className="num-badge">{b.n}</span>
                  <div>
                    <div className="bonus-meta">
                      {b.eyebrow} <span className="dot">·</span> <span className="value">{b.value}</span>
                    </div>
                    <div className="bonus-title">{b.title}</div>
                    <p className="bonus-desc">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="bonus-note">These are only available to live attendees. Miss it, lose it.</p>
          </div>

          {/* Final CTA */}
          <div className="final">
            <p>
              The masterclass is <strong>free</strong>. The frameworks are <strong>proven</strong>. But
              none of it works if you don&apos;t show up.
            </p>
            <a className="cta-btn ghost" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <Instagram size={18} />
              Or DM &apos;BOOKED&apos; on Instagram for your prep training &rarr;
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
        .wrap {
          max-width: 640px;
          margin: 0 auto;
          padding: 40px 20px 72px;
        }

        .hero { text-align: center; }
        .check-badge {
          width: 74px;
          height: 74px;
          border-radius: 50%;
          margin: 0 auto 24px;
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
          font-size: clamp(1.7rem, 5vw, 2.5rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        .accent {
          background: linear-gradient(135deg, #00d9ff, #009fee);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-sub {
          color: var(--muted);
          font-style: italic;
          max-width: 500px;
          margin: 0 auto 30px;
          font-size: 1rem;
        }
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
          font-size: clamp(1.35rem, 3.6vw, 1.75rem);
          letter-spacing: -0.01em;
        }

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
        .spam-note { color: var(--muted); font-size: 0.86rem; margin-top: 16px !important; }

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
          text-align: center;
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

        .bonus-eyebrow {
          color: var(--blue);
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin: 6px 0 18px;
        }
        .bonus-list { display: grid; gap: 14px; }
        .bonus-card {
          display: flex;
          gap: 14px;
          padding: 20px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 14px;
        }
        .bonus-meta { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--blue); margin-bottom: 6px; }
        .bonus-meta .dot { color: var(--muted); }
        .bonus-meta .value { color: var(--muted); }
        .bonus-title { color: var(--white); font-weight: 800; font-size: 1.08rem; margin-bottom: 6px; }
        .bonus-desc { color: var(--muted); font-size: 0.94rem; }
        .bonus-note { text-align: center; color: var(--muted); font-size: 0.86rem; margin-top: 18px; }

        .final { margin-top: 48px; text-align: center; }
        .final p { color: var(--body); font-size: 1.05rem; max-width: 460px; margin: 0 auto; }
        .final strong { color: var(--white); }
        .final .cta-btn { max-width: 460px; margin-left: auto; margin-right: auto; }
      `}</style>
    </>
  );
}
