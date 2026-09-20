"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import { getNextWebinarDate } from "@/lib/date";
import { useFbTrack } from "@/lib/useFbTrack";

const WISTIA_MEDIA_ID = "fcoxhrm1hr";
const WISTIA_ASPECT = "1.8090452261306533";

const webinar = getNextWebinarDate();

// Webinar-start fields for CRM mapping, matching the format the other PT
// Domination webinar pages send (webinar_display + a GHL "webinar<month><day>" tag).
function buildWebinarFields(w: ReturnType<typeof getNextWebinarDate>) {
  const d = new Date(w.iso);
  const tzAbbr = (tz: string) =>
    new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "short" })
      .formatToParts(d)
      .find((p) => p.type === "timeZoneName")?.value || "";
  const pt = tzAbbr("America/Los_Angeles"); // PDT / PST
  const et = tzAbbr("America/New_York"); // EDT / EST
  const afterComma = w.longDisplay.split(", ")[1] || ""; // e.g. "September 24th"
  const parts = afterComma.split(" ");
  const monthName = parts[0] || "";
  const day = (parts[1] || "").replace(/\D/g, "");
  return {
    webinar_datetime: w.iso,
    webinar_display: `${w.dayName}, ${monthName} ${day}, at 4:30 PM ${pt} and 7:30 PM ${et}`,
    webinar_month_and_date: `webinar${monthName.toLowerCase()}${day}`,
  };
}
const webinarFields = buildWebinarFields(webinar);

const LEARN = [
  {
    lead: "The real reason your content isn’t turning into clients",
    rest: " — it’s not your hooks, your lighting, or your work ethic. It’s one thing, nobody ever told you about it, and it’s fixable the same week you see it.",
  },
  {
    lead: "The “Influencer Playbook” trap",
    rest: " — why the growth advice you’ve been following was built to sell ads, not your offer, and why following it harder actually pushes buyers away.",
  },
  {
    lead: "The Conversation Engine, drawn on one slide",
    rest: " — the 3-part machine that turns a normal Instagram account into booked sales calls. What each gear does, why it works when funnels don’t, and when to run each one.",
  },
  {
    lead: "Why 598 followers beat 500,000",
    rest: " — the math of tiny audiences that buy versus big audiences that watch, and how to know which one you’re building right now.",
  },
  {
    lead: "The crystal ball",
    rest: " — Brian will read your prospects’ minds on the call, live, and show you where your next month of content is already sitting (you’re currently ignoring it).",
  },
  {
    lead: "Why this machine gets stronger every week you run it",
    rest: " — while everybody else’s marketing gets more expensive every week they run it.",
  },
];

type UtmParams = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
};

export default function ContentCashFlowLivePage() {
  useFbTrack("PageView");
  const router = useRouter();
  const videoRef = useRef<HTMLDivElement>(null);
  const hasLoaded = useRef(false);
  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
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
      videoRef.current.innerHTML = `<wistia-player media-id="${WISTIA_MEDIA_ID}" aspect="${WISTIA_ASPECT}"></wistia-player>`;
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

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    let ok = false;
    try {
      const res = await fetch("/api/submit-contentcashflowlive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          ...webinarFields,
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
    router.push("/contentcashflowlive/confirmation");
  };

  return (
    <div className="live">
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script
        src={`https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`}
        strategy="afterInteractive"
        type="module"
      />

      <div className="topbar">
        Free live training for business owners &nbsp;·&nbsp;{" "}
        <span>
          {webinar.longDisplay} at 7:30 PM ET
        </span>
      </div>

      {/* HERO */}
      <div className="hero">
        <div className="wrap center">
          <div className="eyebrow">Free Live Training for Business Owners</div>
          <h1>
            How to Turn the Instagram Account You Already Have Into High&#8209;Ticket Clients —{" "}
            <span className="u">Without Funnels, Email Lists, Ads, or Tech</span>
          </h1>
          <p className="sub">
            On this free training, Brian Mark — <b>$50M+ in sales, all from Instagram</b> — will draw out
            the exact 3-part machine his clients use to turn everyday content into booked sales calls with
            people who already want to buy… including how a client with <b>598 followers</b> used it to
            have a <b>$15,000 month</b>.
          </p>
          <a className="btn" href="#register" onClick={scrollToForm}>
            SAVE MY SEAT — FREE
          </a>
          <div className="micro">Live on Zoom. No replay guaranteed — see event details below.</div>
          <p className="teaser">
            On this training Brian is drawing his entire “Conversation Engine” on one slide — the machine
            behind every dollar above. Once you see it, you can’t unsee it.
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
            <div className="caption">
              “Every one of these calls started as a DM. Not one came from a funnel.”
            </div>
          </div>
        </div>
      </div>

      {/* EVENT DETAILS */}
      <section className="details">
        <div className="wrap center">
          <div className="kicker">Event Details</div>
          <h2>The Conversation Engine — Live</h2>
          <div className="detail-grid">
            <div className="card">
              <div className="lbl">What</div>
              <div className="val">
                A free, live 60-minute training <em>+ live Q&amp;A after</em>
              </div>
            </div>
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
                Live on Zoom <em>— link arrives by email the moment you register</em>
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
            <b>A word about the replay:</b> we may send a limited replay, we may not — Brian teaches with
            live audience answers on screen, and half of what makes this work can’t be replicated on a
            recording. Plan to be in the room.
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section className="learn">
        <div className="wrap center">
          <div className="kicker">On This Free Training</div>
          <h2>What You’ll Learn</h2>
          <ul>
            {LEARN.map((item) => (
              <li key={item.lead}>
                <b>{item.lead}</b>
                {item.rest}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOST */}
      <section className="host">
        <div className="wrap">
          <div className="center">
            <div className="kicker">Meet Your Host</div>
            <h2>Brian Mark</h2>
          </div>
          <div className="host-flex">
            <div className="host-photo">
              <Image src="/brianimage2.png" alt="Brian Mark" width={250} height={250} className="host-img" />
            </div>
            <div className="host-copy">
              <p>
                Eleven years ago, Brian was a personal trainer posting into the void — no funnels, no email
                list, no tech skills, no interest in learning any. What he figured out instead became the
                machine his sales team now runs <b>thirty booked calls a day</b> on: content that starts
                conversations, and conversations that become clients.
              </p>
              <p>
                Since then: <b>over $50 million in sales</b>, every dollar of it traceable to a post and a DM
                on an app that’s already on your phone. He built PT Domination into one of the largest
                coaching companies for fitness coaches on the planet, and today he teaches business owners of
                every kind to run the same machine — from six-figure coaches to a client with 598 followers
                who had a $15K month.
              </p>
              <p>
                He’s also sober, which matters here for one reason: Brian doesn’t do complicated. He does
                simple, repeatable, and every single day. That’s exactly how he’ll teach you.
              </p>
              <div className="stat-row">
                <div className="stat">
                  <div className="n">$50M+</div>
                  <div className="l">In Sales</div>
                </div>
                <div className="stat">
                  <div className="n">30/day</div>
                  <div className="l">Booked Calls</div>
                </div>
                <div className="stat">
                  <div className="n">0</div>
                  <div className="l">Funnels Used</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA + REGISTRATION */}
      <section className="final" id="register" ref={formRef}>
        <div className="wrap center">
          <div className="kicker">Last Call</div>
          <h2>One More Time, Plainly</h2>
          <p className="disq">
            If you’re a <b>business owner with a real offer and an Instagram account</b>, this training will
            show you the machine. If you want to go viral and land brand deals — this isn’t for you, with
            love.
          </p>

          <form className="form-card" onSubmit={handleSubmit}>
            <h3>Save Your Seat on the Live Training</h3>
            <div className="field-row">
              <input
                type="text"
                placeholder="First name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Last name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <button className="btn submit" type="submit" disabled={submitting}>
              {submitting ? "SAVING YOUR SEAT…" : "SAVE MY SEAT — FREE"}
            </button>
            {submitError && <div className="form-error">{submitError}</div>}
            <div className="form-micro">
              We’ll text and email you the Zoom link. No spam, unsubscribe any time.
            </div>
          </form>

          <div className="micro muted">
            Live on Zoom · {webinar.longDisplay} at 7:30 PM ET · Free
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
        .live {
          /* Red from the original comp swapped for the site's blue (#009fee). */
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
        .live :global(*) {
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

        /* top bar */
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

        /* hero */
        .hero {
          padding: 64px 0 56px;
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
          margin-bottom: 28px;
        }
        h1 {
          font-size: clamp(30px, 5vw, 46px);
          line-height: 1.13;
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.01em;
          max-width: 20em;
          margin: 0 auto 22px;
        }
        h1 .u {
          box-shadow: inset 0 -0.32em 0 rgba(0, 159, 238, 0.55);
        }
        .sub {
          font-size: clamp(16px, 2.2vw, 19.5px);
          line-height: 1.65;
          color: #c9c7cf;
          max-width: 44em;
          margin: 0 auto 34px;
        }
        .sub b {
          color: #fff;
        }

        .btn {
          display: inline-block;
          background: var(--accent);
          color: #fff;
          text-decoration: none;
          font-size: 19px;
          font-weight: 800;
          letter-spacing: 0.03em;
          padding: 19px 44px;
          border-radius: 12px;
          box-shadow: 0 10px 26px rgba(0, 159, 238, 0.38);
          transition: transform 0.1s ease, background 0.15s ease;
          border: none;
          cursor: pointer;
        }
        .btn:hover {
          background: var(--accent-dark);
          transform: translateY(-1px);
        }
        .micro {
          font-size: 13px;
          color: #8f8c96;
          margin-top: 14px;
        }
        .micro.muted {
          color: var(--muted);
        }
        .teaser {
          font-size: 15px;
          color: #c9c7cf;
          max-width: 38em;
          margin: 26px auto 0;
          font-style: italic;
        }

        /* hero video */
        .hero-shot {
          max-width: 680px;
          margin: 44px auto 0;
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
        .caption {
          font-size: 14px;
          font-style: italic;
          color: #a5a2ab;
          margin-top: 12px;
        }

        /* sections */
        section {
          padding: 64px 0;
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

        /* learn */
        .learn ul {
          list-style: none;
          max-width: 720px;
          margin: 34px auto 0;
          text-align: left;
          padding: 0;
        }
        .learn li {
          position: relative;
          padding: 0 0 0 46px;
          margin-bottom: 26px;
          font-size: 16.5px;
        }
        .learn li:last-child {
          margin-bottom: 0;
        }
        .learn li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 2px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.12;
        }
        .learn li::after {
          content: "✓";
          position: absolute;
          left: 7px;
          top: 1px;
          color: var(--accent);
          font-weight: 900;
          font-size: 16px;
        }
        .learn b {
          color: var(--ink);
        }

        /* host */
        .host {
          background: var(--ink);
          color: #cfccd4;
        }
        .host h2 {
          color: #fff;
        }
        .host-flex {
          display: flex;
          gap: 40px;
          align-items: flex-start;
          margin-top: 34px;
          text-align: left;
        }
        .host-photo {
          flex: 0 0 250px;
        }
        .host-photo :global(.host-img) {
          width: 100%;
          height: auto;
          border-radius: 14px;
        }
        .host-copy p {
          margin-bottom: 16px;
          font-size: 16.5px;
        }
        .host-copy b {
          color: #fff;
        }
        .stat-row {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 24px;
        }
        .stat {
          background: #1c1b21;
          border: 1px solid #34323a;
          border-radius: 12px;
          padding: 14px 20px;
          min-width: 140px;
        }
        .stat .n {
          font-size: 22px;
          font-weight: 900;
          color: #fff;
        }
        .stat .l {
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8f8c96;
          margin-top: 2px;
        }

        /* final cta + form */
        .final .disq {
          max-width: 40em;
          margin: 0 auto 30px;
          font-size: 17.5px;
          color: var(--body);
        }
        .final .disq b {
          color: var(--ink);
        }
        .form-card {
          max-width: 460px;
          margin: 0 auto;
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 28px 26px;
          text-align: left;
        }
        .form-card h3 {
          font-size: 20px;
          font-weight: 900;
          color: var(--ink);
          margin-bottom: 18px;
          text-align: center;
        }
        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .form-card input {
          width: 100%;
          font-family: inherit;
          font-size: 16px;
          color: var(--ink);
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 13px 14px;
          margin-bottom: 10px;
        }
        .form-card input::placeholder {
          color: #a9a5ab;
        }
        .form-card input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(0, 159, 238, 0.15);
        }
        .btn.submit {
          width: 100%;
          margin-top: 6px;
          font-size: 17px;
          padding: 17px 24px;
        }
        .btn.submit:disabled {
          opacity: 0.65;
          cursor: default;
          transform: none;
        }
        .form-error {
          margin-top: 10px;
          font-size: 14px;
          font-weight: 700;
          color: #c9331e;
          text-align: center;
        }
        .form-micro {
          margin-top: 12px;
          font-size: 12.5px;
          color: var(--muted);
          text-align: center;
        }

        footer {
          border-top: 1px solid var(--line);
          padding: 26px 24px;
          text-align: center;
          font-size: 12.5px;
          color: var(--muted);
        }

        @media (max-width: 640px) {
          .host-flex {
            flex-direction: column;
          }
          .host-photo {
            flex: none;
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
          }
          section {
            padding: 48px 0;
          }
          .hero {
            padding: 48px 0 44px;
          }
          .field-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
