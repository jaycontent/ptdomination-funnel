"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import styles from "./summit.module.css";

// ───────────────────────────────────────────────────────────────────────────
// EVENT CONFIG — the only things that need setting before this page goes live.
// ───────────────────────────────────────────────────────────────────────────

// Brian's new summit VSL. Leave empty and the page shows a neutral placeholder
// in the video frame instead of a broken embed; paste the Wistia media id here
// and the player takes over. Set the aspect to the one the Wistia embed snippet
// gives for that video.
const WISTIA_MEDIA_ID = "4upcy8tgvw";
const WISTIA_ASPECT = "1.8045112781954886";

// Dates and times as they should read on the page. Leave a value empty and the
// page simply omits it rather than printing a placeholder at a visitor.
const EVENT_DATES_SHORT = ""; // e.g. "Dec 3–4"
const EVENT_DATES_LONG = ""; // e.g. "December 3rd & 4th"
const EVENT_TIME = ""; // e.g. "9:00 AM PST / 12:00 PM EST"

// Tag the registration carries into GHL. Keeps this summit's contacts apart
// from the ones last year's events left behind.
const SUMMIT_TAG = "virtualsummit2026";
const EVENT_KEY = "online-trainer-virtual-summit-2026";

// ───────────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    label: "Day 1 · Session 1",
    title: "Content Creation",
    body: "How to stay ahead of the 2026 algorithm changes, and exactly what content is working on social media right now to attract high-ticket clients.",
  },
  {
    label: "Day 1 · Session 2",
    title: "Lead Generation",
    body: "How to book qualified sales calls from the people who actually choose to follow you and the people who engage with your lead magnets.",
  },
  {
    label: "Day 2 · Session 1",
    title: "High-Ticket Sales",
    body: "How to get clients to actually pay you on the phone, instead of hearing “I need to think about it” or “I’ll get back to you.”",
  },
  {
    label: "Day 2 · Session 2",
    title: "The $100K/Month Panel",
    body: "Two of Brian’s clients who have scaled past $100,000 a month pull back the curtain on what they are doing inside their coaching businesses right now.",
  },
];

const STATS = [
  { num: "11", lbl: "Years in business online" },
  { num: "13,000+", lbl: "Coaches worked with" },
  { num: "6×/day", lbl: "Posting, 7 days a week" },
  { num: "1,100", lbl: "Sales calls from Instagram" },
];

const STORY = [
  "In 2026, the Instagram algorithm changed — and if we’re being honest, you can already feel it. The content you’re posting that used to get a lot of views is no longer getting as many, and you’re having a hard time figuring out what to post to attract high-ticket clients.",
  "My name is Brian Mark. I’ve been a business owner online for the last 11 years, and we’ve worked with over 13,000 online fitness coaches to help them start and scale their coaching businesses. On my own personal Instagram account I post six times a day, seven days a week — so I have a ton of data on what’s working right now.",
  "Over two days, I’m pulling back the curtain on everything I’m doing inside the coaching businesses I work with: content, lead generation, and high-ticket sales. Then I’m bringing on two clients who have scaled past $100,000 a month to give you the latest and greatest on what’s working to get there.",
  "This summit is completely free, and there’s no catch. What I’d love to do is give you a ton of value in advance, to show you there are business coaches who genuinely care about your success. This will be the most valuable two days you’ve ever spent on your business.",
  "If you’re an online personal trainer who has wanted to scale your coaching business from $10,000 to $100,000 a month, this is the moment you’ve been waiting for. You’ll get the entire blueprint from start to finish — what content to post, what to say in the DMs, and what to say on sales calls.",
];

type UtmParams = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
};

export default function SummitPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLDivElement>(null);
  const hasLoaded = useRef(false);
  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consent: false,
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
    if (!WISTIA_MEDIA_ID) return;
    if (videoRef.current && !hasLoaded.current) {
      hasLoaded.current = true;
      videoRef.current.innerHTML = `<wistia-player media-id="${WISTIA_MEDIA_ID}" aspect="${WISTIA_ASPECT}"></wistia-player>`;
    }
  }, []);

  // Capture the UTMs for the lead record, and log the visit once per session so
  // paid traffic and the paid opt-in rate can be reported on.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const params: UtmParams = {
      utm_source: p.get("utm_source"),
      utm_medium: p.get("utm_medium"),
      utm_campaign: p.get("utm_campaign"),
      utm_content: p.get("utm_content"),
      utm_term: p.get("utm_term"),
    };
    setUtm(params);
    setPagePath(window.location.pathname);

    try {
      const KEY = "summit_view_logged";
      if (!sessionStorage.getItem(KEY)) {
        const sid =
          crypto.randomUUID?.() ?? String(Date.now()) + Math.random().toString(36).slice(2);
        sessionStorage.setItem(KEY, sid);
        fetch("/api/track-view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          body: JSON.stringify({
            ...params,
            path: window.location.pathname,
            session_id: sid,
          }),
        }).catch(() => {});
      }
    } catch {}
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
          event: EVENT_KEY,
          summit_tag: SUMMIT_TAG,
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
    router.push("/summit/confirmation");
  };

  const badgeText = EVENT_DATES_SHORT
    ? `Free 2-Day Virtual Summit · ${EVENT_DATES_SHORT}`
    : "Free 2-Day Virtual Summit";

  return (
    <div className={styles.vs}>
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
          <Image
            src="/ptd-logo-sm.webp"
            alt="PT Domination"
            width={170}
            height={56}
            className={styles.logo}
            priority
          />
          <div className={styles.badge}>{badgeText}</div>
          <h1>
            A FREE 2-Day Virtual Summit for Online Coaches Who Want to Scale From{" "}
            <span className={styles.accent}>$10K to $100K Per Month</span>
          </h1>
          <p className={styles.sub}>
            The Instagram algorithm changed in 2026. Get the entire blueprint from start to finish
            &mdash; what content to post, what to say in the DMs, and what to say on sales calls.
          </p>
        </div>

        {/* VSL */}
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

        {/* Registration form */}
        <div className={styles.formCard} ref={formRef} id="register">
          <div className={styles.formEyebrow}>Registration Form</div>
          <h2>Save Your Free Seat</h2>
          <form onSubmit={handleSubmit} className={styles.regForm}>
            <div className={styles.grid2}>
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  required
                  placeholder="Jane"
                  value={form.firstName}
                  onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  required
                  placeholder="Smith"
                  value={form.lastName}
                  onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                placeholder="jane@example.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
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
              className={styles.consent}
            >
              <span className={styles.box} data-checked={form.consent}>
                {form.consent && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className={styles.consentText}>
                I agree to receive event reminders and the Zoom link by email and text (SMS).
                Message &amp; data rates may apply. Reply STOP to opt out.
              </span>
            </button>

            {submitError && <p className={styles.err}>{submitError}</p>}

            <button
              type="submit"
              disabled={submitting || !form.consent}
              className={styles.submitBtn}
            >
              {submitting ? "Registering…" : "Register Free →"}
            </button>
            <p className={styles.formNote}>
              100% free. Zoom link sent to your email &amp; phone.
            </p>
          </form>
        </div>

        {/* What we're covering */}
        <div className={styles.section}>
          <div className={styles.kicker}>What We&rsquo;re Covering</div>
          <h2>Two Days. Four Sessions. The Whole Blueprint.</h2>
          <div className={styles.pillars}>
            {PILLARS.map((p) => (
              <div className={styles.pillar} key={p.title}>
                <div className={styles.pillarNum}>{p.label}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>

          <div className={styles.stats}>
            {STATS.map((s) => (
              <div className={styles.stat} key={s.lbl}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLbl}>{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Story */}
        <div className={styles.story}>
          {STORY.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <div className={styles.noReplay}>
            I am not going to guarantee a replay. This is broadcast live
            {EVENT_DATES_LONG ? ` on ${EVENT_DATES_LONG}` : ""}
            {EVENT_TIME ? `, ${EVENT_TIME}` : ""} &mdash; show up live to get the full blueprint.
          </div>

          <button className={styles.ghostBtn} onClick={scrollToForm}>
            Reserve My Free Seat &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
