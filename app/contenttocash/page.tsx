"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import { CheckCircle2 } from "lucide-react";
import { getNextWebinarDate, calculateTimeRemaining } from "@/lib/date";
import { useFbTrack } from "@/lib/useFbTrack";

const WISTIA_MEDIA_ID = "4jk4bimnaw";
const webinar = getNextWebinarDate();

const LEARN = [
  "The Instagram Marketing Funnel: connection content, conversion value, and social proof, plus exactly what to post at each stage",
  "Why the 2026 algorithm suppresses your content, and the one metric that actually makes you go viral",
  "What to post to get followers vs. what to post to get clients",
  "How to turn 30M+ views into DMs, and DMs into booked, qualified sales calls",
  "The 3 content mistakes keeping you stuck: the conversion trap, the viral trap, and generic posting",
];

type UtmParams = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
};

const STATS = [
  { end: 700, prefix: "", suffix: "K+", label: "Followers" },
  { end: 30, prefix: "", suffix: "M+", label: "Monthly Views" },
  { end: 50, prefix: "$", suffix: "M+", label: "In Sales" },
];

// Animates a number from 0 to `end` when it scrolls into view.
function CountUp({ end, prefix = "", suffix = "", duration = 1600 }: { end: number; prefix?: string; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const run = () => {
      if (started.current) return;
      started.current = true;
      let t0: number | null = null;
      const tick = (now: number) => {
        if (t0 === null) t0 = now;
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(end * eased);
        if (p < 1) requestAnimationFrame(tick);
        else setVal(end);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect(); } }),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {Math.round(val)}
      {suffix}
    </span>
  );
}

export default function ContentToCashPage() {
  useFbTrack("PageView");
  const router = useRouter();
  const videoRef = useRef<HTMLDivElement>(null);
  const hasLoaded = useRef(false);
  const formRef = useRef<HTMLDivElement>(null);

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    invest: false,
  });
  const [utm, setUtm] = useState<UtmParams>({
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_content: null,
    utm_term: null,
  });
  const [pagePath, setPagePath] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (videoRef.current && !hasLoaded.current) {
      hasLoaded.current = true;
      videoRef.current.innerHTML = `<wistia-player media-id="${WISTIA_MEDIA_ID}" aspect="1.7777777777777777"></wistia-player>`;
    }
  }, []);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setUtm({
      utm_source: p.get("utm_source"),
      utm_medium: p.get("utm_medium"),
      utm_campaign: p.get("utm_campaign"),
      utm_content: p.get("utm_content"),
      utm_term: p.get("utm_term"),
    });
    setPagePath(window.location.pathname);
  }, []);

  useEffect(() => {
    const tick = () => setCountdown(calculateTimeRemaining(webinar.iso));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const pad = (n: number) => String(n).padStart(2, "0");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    let ok = false;
    try {
      const res = await fetch("/api/submit-contenttocash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          would_invest: form.invest ? "Yes, I would invest" : "No",
          page_path: pagePath,
          ...utm,
        }),
      });
      ok = res.ok;
    } catch {
      ok = false;
    }
    setSubmitting(false);
    if (!ok) {
      setSubmitError("Something went wrong. Please try again.");
      return;
    }
    // Checked the invest box -> pixel-tracked confirmation; unchecked -> no-pixel duplicate.
    router.push(form.invest ? "/contenttocash/confirmation" : "/contenttocash/confirmation-b");
  };

  return (
    <div className="ctc">
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script
        src={`https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`}
        strategy="afterInteractive"
        type="module"
      />

      <div className="wrap">
        {/* Hero */}
        <div className="hero">
          <div className="logo-wrap">
            <Image src="/ptd-logo-sm.webp" alt="PT Domination" width={168} height={55} className="logo" />
          </div>
          <div className="badge">
            Live on Zoom · {webinar.longDisplay}
            {!countdown.isExpired && (
              <span className="timer">
                &nbsp;·&nbsp;starts in {countdown.days}d {pad(countdown.hours)}h {pad(countdown.minutes)}m{" "}
                {pad(countdown.seconds)}s
              </span>
            )}
          </div>
          <h1>
            How to Turn Your Instagram Content Into an Extra <span className="accent">$10K+/Month</span>
          </h1>
          <p className="stats-lead">
            A free 60-minute masterclass on the exact <strong>Instagram Marketing Funnel</strong> behind:
          </p>
          <div className="stats">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <div className="stat-num">
                  <CountUp end={s.end} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Video */}
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

        {/* Form */}
        <div className="form-card" ref={formRef}>
          <div className="form-eyebrow">Registration</div>
          <h2>Save Your Free Seat</h2>
          <p className="form-when">{webinar.longDisplay} · 4:30 PM PST</p>
          <form onSubmit={handleSubmit} className="reg-form">
            <div className="grid2">
              <div>
                <label>First Name</label>
                <input type="text" required placeholder="Jane" value={form.firstName}
                  onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} />
              </div>
              <div>
                <label>Last Name</label>
                <input type="text" required placeholder="Smith" value={form.lastName}
                  onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} />
              </div>
            </div>
            <div>
              <label>Email</label>
              <input type="email" required placeholder="jane@example.com" value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <label>Phone Number</label>
              <input type="tel" required placeholder="+1 (555) 000-0000" value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
            </div>

            {/* Invest checkbox — unchecked by default; drives pixel routing */}
            <button type="button" role="checkbox" aria-checked={form.invest}
              onClick={() => setForm((f) => ({ ...f, invest: !f.invest }))} className="check-row invest">
              <span className="box" data-checked={form.invest}>
                {form.invest && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="check-text invest-text">
                Would you invest in building out this content system if it means growing your business?
              </span>
            </button>

            {submitError && <p className="err">{submitError}</p>}

            <button type="submit" disabled={submitting} className="submit-btn">
              {submitting ? "Registering…" : "Register Free →"}
            </button>
            <p className="form-note">100% free. For business owners doing $10K+/month who want to scale.</p>
          </form>
        </div>

        {/* What you'll learn */}
        <div className="learn">
          <h2>What You&apos;ll Learn on the Masterclass</h2>
          <ul>
            {LEARN.map((item, i) => (
              <li key={i}>
                <CheckCircle2 size={20} className="li-check" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <button className="ghost-btn" onClick={scrollToForm}>
            Save My Free Seat →
          </button>
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
        .ctc {
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
        .wrap { max-width: 720px; margin: 0 auto; padding: 44px 20px 72px; }

        .hero { text-align: center; }
        .logo-wrap { display: flex; justify-content: center; padding-bottom: 24px; }
        .logo { height: auto; }
        .badge {
          display: inline-block;
          margin-bottom: 18px;
          padding: 8px 16px;
          border-radius: 999px;
          font-weight: 800;
          font-size: 0.78rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--blue);
          background: rgba(0, 217, 255, 0.1);
          border: 1px solid rgba(0, 217, 255, 0.3);
        }
        .timer { color: var(--white); }
        h1 {
          color: var(--white);
          font-weight: 800;
          font-size: clamp(2rem, 5.4vw, 3.1rem);
          line-height: 1.12;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        .accent {
          background: linear-gradient(135deg, #00d9ff, #009fee);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .stats-lead {
          color: var(--muted);
          font-size: clamp(1rem, 2.2vw, 1.18rem);
          max-width: 560px;
          margin: 0 auto 16px;
        }
        .stats-lead strong { color: var(--white); }
        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          max-width: 420px;
          margin: 0 auto 34px;
        }
        .stat {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px 6px;
          text-align: center;
        }
        .stat-num {
          font-weight: 800;
          font-size: clamp(1.15rem, 4.6vw, 1.6rem);
          line-height: 1;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #00d9ff, #009fee);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-variant-numeric: tabular-nums;
        }
        .stat-label {
          margin-top: 6px;
          color: var(--muted);
          font-weight: 700;
          font-size: 0.6rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .video-wrapper {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(0, 217, 255, 0.08);
          background: #0a1120;
        }
        .wistia-embed { width: 100%; aspect-ratio: 16 / 9; }

        .form-card {
          margin-top: 34px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 30px 24px;
          scroll-margin-top: 20px;
        }
        .form-eyebrow {
          color: var(--blue);
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-size: 0.78rem;
          text-align: center;
        }
        .form-card h2 {
          color: var(--white);
          font-weight: 800;
          font-size: 1.7rem;
          text-align: center;
          margin: 8px 0 4px;
        }
        .form-when { text-align: center; color: var(--blue); font-weight: 700; margin: 0 0 22px; font-size: 0.95rem; }
        .reg-form { display: grid; gap: 14px; }
        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        label {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
          margin-bottom: 6px;
        }
        input {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 13px 14px;
          color: var(--white);
          font-size: 1rem;
          outline: none;
          transition: border-color 0.15s ease;
        }
        input:focus { border-color: var(--blue-dim); }
        input::placeholder { color: #55617a; }

        .check-row {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          text-align: left;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 14px;
          cursor: pointer;
        }
        .check-row.invest { background: rgba(0, 159, 238, 0.08); border-color: var(--border); }
        .box {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          border-radius: 5px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #041016;
          margin-top: 1px;
        }
        .box[data-checked="true"] { background: linear-gradient(135deg, #009fee, #00ffff); border-color: #009fee; }
        .check-text { font-size: 0.8rem; color: var(--muted); line-height: 1.5; }
        .invest-text { font-size: 0.95rem; color: var(--white); font-weight: 600; }

        .err { color: #ff6b6b; font-size: 0.9rem; text-align: center; margin: 0; }
        .submit-btn {
          margin-top: 4px;
          padding: 16px;
          border: none;
          border-radius: 12px;
          font-weight: 800;
          font-size: 1.05rem;
          color: #041016;
          background: linear-gradient(135deg, #009fee, #00ffff);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.2s ease, opacity 0.2s ease;
          box-shadow: 0 12px 30px rgba(0, 159, 238, 0.3);
        }
        .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(0, 159, 238, 0.45); }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .form-note { text-align: center; color: var(--muted); font-size: 0.8rem; margin: 4px 0 0; }

        .learn { margin-top: 48px; }
        .learn h2 { color: var(--white); font-weight: 800; font-size: clamp(1.5rem, 4vw, 2rem); text-align: center; margin-bottom: 22px; }
        .learn ul { list-style: none; padding: 0; margin: 0 0 28px; display: grid; gap: 14px; max-width: 600px; margin-left: auto; margin-right: auto; }
        .learn li { display: flex; gap: 12px; align-items: flex-start; color: var(--body); }
        .li-check { color: var(--blue); flex-shrink: 0; margin-top: 2px; }
        .ghost-btn {
          display: block;
          width: 100%;
          max-width: 460px;
          margin: 0 auto;
          padding: 16px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 1.02rem;
          color: var(--white);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .ghost-btn:hover { background: rgba(0, 159, 238, 0.12); border-color: rgba(0, 217, 255, 0.6); }

        @media (max-width: 480px) { .grid2 { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
