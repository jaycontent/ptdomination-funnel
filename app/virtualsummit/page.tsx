"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Script from "next/script";

const WISTIA_MEDIA_ID = "83nj9ijnkr";

const STORY = [
  "If you are a personal trainer or online fitness coach that has been wanting to learn how to grow and scale your online fitness coaching business, this is for you.",
  "We had an in-person event scheduled for August 20 and 21st, live in person in Kelowna, BC, and we were not gonna do a virtual…",
  "Due to the British Columbia wildfires and the travel restrictions that the BC government has placed, we have decided to cancel the in-person event and do everything 100% online.",
  "Because we are pivoting to online, this is an opportunity for us to open this up to the community and anybody that is interested in learning how to grow and scale a successful online fitness coaching business.",
  "Our intention with this event is to raise as much money as possible for those that have been affected by the Kelowna and British Columbia wildfires.",
  "So this is an opportunity for you to learn from us for free. We never do free online virtual events of this magnitude — and give back to the community and help out families that are in need.",
];

type UtmParams = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
};

export default function VirtualSummitPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLDivElement>(null);
  const hasLoaded = useRef(false);
  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", consent: false });
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

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    let ok = false;
    try {
      const res = await fetch("/api/submit-summit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          sms_consent: form.consent,
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
    router.push("/virtualsummit/confirmation");
  };

  return (
    <div className="vs">
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script
        src={`https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`}
        strategy="afterInteractive"
        type="module"
      />

      <div className="wrap">
        {/* Hero */}
        <div className="hero">
          <Image src="/ptd-logo-sm.webp" alt="PT Domination" width={170} height={56} className="logo" />
          <div className="badge">Free Virtual Summit · Aug 20–21</div>
          <h1>
            FREE Online Trainer Virtual Summit for Fitness Coaches Who Want to Scale from{" "}
            <span className="accent">10k – 100k+ per month</span>
          </h1>
          <p className="sub">From Guest Speakers With 20 Million Combined Social Media Followers</p>
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

        {/* Registration form */}
        <div className="form-card" ref={formRef}>
          <div className="form-eyebrow">Registration Form</div>
          <h2>Save Your Free Seat</h2>
          <form onSubmit={handleSubmit} className="reg-form">
            <div className="grid2">
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  required
                  placeholder="Jane"
                  value={form.firstName}
                  onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  required
                  placeholder="Smith"
                  value={form.lastName}
                  onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                required
                placeholder="jane@example.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div>
              <label>Phone Number</label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              />
            </div>

            <button
              type="button"
              role="checkbox"
              aria-checked={form.consent}
              onClick={() => setForm((f) => ({ ...f, consent: !f.consent }))}
              className="consent"
            >
              <span className="box" data-checked={form.consent}>
                {form.consent && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="consent-text">
                I agree to receive event reminders and the Zoom link by email and text (SMS). Message &amp;
                data rates may apply. Reply STOP to opt out.
              </span>
            </button>

            {submitError && <p className="err">{submitError}</p>}

            <button type="submit" disabled={submitting || !form.consent} className="submit-btn">
              {submitting ? "Registering…" : "Register Free →"}
            </button>
            <p className="form-note">100% free. Zoom link sent to your email &amp; phone.</p>
          </form>
        </div>

        {/* Story */}
        <div className="story">
          {STORY.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className="give-note">
            100% of the donations on the confirmation page will be sent to the families affected by the
            wildfires.
          </div>
          <button className="ghost-btn" onClick={scrollToForm}>
            Register Free for the Summit →
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
        .vs {
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
        .wrap { max-width: 720px; margin: 0 auto; padding: 46px 20px 72px; }

        .hero { text-align: center; }
        .logo { height: auto; margin-bottom: 22px; }
        .badge {
          display: inline-block;
          margin-bottom: 18px;
          padding: 7px 16px;
          border-radius: 999px;
          font-weight: 800;
          font-size: 0.78rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--blue);
          background: rgba(0, 217, 255, 0.1);
          border: 1px solid rgba(0, 217, 255, 0.3);
        }
        h1 {
          color: var(--white);
          font-weight: 800;
          font-size: clamp(1.9rem, 5.2vw, 3rem);
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
        .sub {
          color: var(--muted);
          font-size: clamp(1.05rem, 2.4vw, 1.3rem);
          max-width: 560px;
          margin: 0 auto 34px;
        }
        .video-wrapper {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(0, 217, 255, 0.08);
          background: #0a1120;
        }
        .wistia-embed { width: 100%; aspect-ratio: 16 / 9; }

        /* Form */
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
          margin: 8px 0 22px;
        }
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

        .consent {
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
        .box[data-checked="true"] {
          background: linear-gradient(135deg, #009fee, #00ffff);
          border-color: #009fee;
        }
        .consent-text { font-size: 0.78rem; color: var(--muted); line-height: 1.5; }

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

        /* Story */
        .story { margin-top: 48px; font-size: 1.08rem; }
        .story p { margin-bottom: 18px; color: var(--body); }
        .give-note {
          margin: 26px 0;
          padding: 18px 20px;
          border-radius: 14px;
          background: rgba(0, 159, 238, 0.08);
          border: 1px solid var(--border);
          color: var(--white);
          font-weight: 600;
          text-align: center;
        }
        .ghost-btn {
          display: block;
          width: 100%;
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

        @media (max-width: 480px) {
          .grid2 { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
