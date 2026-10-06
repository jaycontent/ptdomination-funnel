"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import { getNextWebinarDateOnDays } from "@/lib/date";
import { useFbTrack } from "@/lib/useFbTrack";
import styles from "./ContentCashFlowLiveLanding.module.css";

const WISTIA_MEDIA_ID = "fcoxhrm1hr";
const WISTIA_ASPECT = "1.8090452261306533";

// This training runs Wednesdays at 4:30 PM PST. The other webinar pages keep
// the shared Mon/Thu schedule from getNextWebinarDate().
const WEBINAR_DAYS = [3]; // Wednesday
const webinar = getNextWebinarDateOnDays(WEBINAR_DAYS);

// Webinar-start fields for CRM mapping, matching the format the other PT
// Domination webinar pages send (webinar_display + a GHL "webinar<month><day>" tag).
function buildWebinarFields(w: ReturnType<typeof getNextWebinarDateOnDays>) {
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
    rest: ": it’s not your hooks, your lighting, or your work ethic. It’s one thing, nobody ever told you about it, and it’s fixable the same week you see it.",
  },
  {
    lead: "The “Influencer Playbook” trap",
    rest: ": why the growth advice you’ve been following was built to sell ads, not your offer, and why following it harder actually pushes buyers away.",
  },
  {
    lead: "The Conversation Engine, drawn on one slide",
    rest: ": the 3-part machine that turns a normal Instagram account into booked sales calls. What each gear does, why it works when funnels don’t, and when to run each one.",
  },
  {
    lead: "Why 598 followers beat 500,000",
    rest: ": the math of tiny audiences that buy versus big audiences that watch, and how to know which one you’re building right now.",
  },
  {
    lead: "The crystal ball",
    rest: ": Brian will read your prospects’ minds on the call, live, and show you where your next month of content is already sitting (you’re currently ignoring it).",
  },
  {
    lead: "Why this machine gets stronger every week you run it",
    rest: ", while everybody else’s marketing gets more expensive every week they run it.",
  },
];

type UtmParams = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
};

// Rendered at both /contenttocash and /contentcashflowlive. basePath decides
// which confirmation pair the form redirects into.
export default function ContentCashFlowLiveLanding({ basePath }: { basePath: string }) {
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
      // contenttocash_registrations plus the Content-to-Cash Zapier hook, the
      // same pipeline both URLs have always used. page_path is what tells the
      // two apart.
      const res = await fetch("/api/submit-contenttocash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          // The form no longer asks a qualifying question, so there is no
          // answer to send. The columns stay in the table for the older rows.
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
    // Every registrant goes to the pixel-tracked confirmation now.
    router.push(`${basePath}/confirmation`);
  };

  return (
    <div className={styles.live}>
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script
        src={`https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`}
        strategy="afterInteractive"
        type="module"
      />

      <div className={styles.topbar}>
        Free live training for business owners &nbsp;·&nbsp;{" "}
        <span>
          {webinar.longDisplay} at 7:30 PM ET
        </span>
      </div>

      {/* HERO */}
      <div className={styles.hero}>
        <div className={`${styles.wrap} ${styles.center}`}>
          {/* No eyebrow pill here: the top bar already says "Free live training
              for business owners", and repeating it pushed the video below the
              fold on phones. */}
          <h1>
            How to Turn the Instagram Account You Already Have Into High&#8209;Ticket Clients,{" "}
            <span className={styles.u}>Without Funnels, Email Lists, Ads, or Tech</span>
          </h1>
          <p className={styles.sub}>
            On this free training, Brian Mark (<b>$50M+ in sales, all from Instagram</b>) will draw out
            the exact 3-part machine his clients use to turn everyday content into booked sales calls with
            people who already want to buy… including how a client with <b>598 followers</b> used it to
            have a <b>$15,000 month</b>.
          </p>
          <p className={styles.teaser}>
            On this training Brian is drawing his entire “Conversation Engine” on one slide, the machine
            behind every dollar above. Once you see it, you can’t unsee it.
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
            <div className={styles.caption}>
              “Every one of these calls started as a DM. Not one came from a funnel.”
            </div>
          </div>
          <a className={styles.btn} href="#register" onClick={scrollToForm}>
            SAVE MY SEAT (FREE)
          </a>
          <div className={styles.micro}>Live on Zoom. No replay guaranteed. See event details below.</div>
        </div>
      </div>

      {/* EVENT DETAILS */}
      <section className={styles.details}>
        <div className={`${styles.wrap} ${styles.center}`}>
          <div className={styles.kicker}>Event Details</div>
          <h2>The Conversation Engine: Live</h2>
          <div className={styles.detailGrid}>
            <div className={styles.card}>
              <div className={styles.lbl}>What</div>
              <div className={styles.val}>
                A free, live 60-minute training <em>+ live Q&amp;A after</em>
              </div>
            </div>
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
                Live on Zoom <em>(link arrives by email the moment you register)</em>
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
            live audience answers on screen, and half of what makes this work can’t be replicated on a
            recording. Plan to be in the room.
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section className={styles.learn}>
        <div className={`${styles.wrap} ${styles.center}`}>
          <div className={styles.kicker}>On This Free Training</div>
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
      <section className={styles.host}>
        <div className={styles.wrap}>
          <div className={styles.center}>
            <div className={styles.kicker}>Meet Your Host</div>
            <h2>Brian Mark</h2>
          </div>
          <div className={styles.hostFlex}>
            <div className={styles.hostPhoto}>
              <Image src="/brianimage2.png" alt="Brian Mark" width={250} height={250} className={styles.hostImg} />
            </div>
            <div className={styles.hostCopy}>
              <p>
                Eleven years ago, Brian was a personal trainer posting into the void, with no funnels, no
                email list, no tech skills, and no interest in learning any. What he figured out instead became the
                machine his sales team now runs <b>thirty booked calls a day</b> on: content that starts
                conversations, and conversations that become clients.
              </p>
              <p>
                Since then: <b>over $50 million in sales</b>, every dollar of it traceable to a post and a DM
                on an app that’s already on your phone. He built PT Domination into one of the largest
                coaching companies for fitness coaches on the planet, and today he teaches business owners of
                every kind to run the same machine, from six-figure coaches to a client with 598 followers
                who had a $15K month.
              </p>
              <p>
                He’s also sober, which matters here for one reason: Brian doesn’t do complicated. He does
                simple, repeatable, and every single day. That’s exactly how he’ll teach you.
              </p>
              <div className={styles.statRow}>
                <div className={styles.stat}>
                  <div className={styles.n}>$50M+</div>
                  <div className={styles.l}>In Sales</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.n}>30/day</div>
                  <div className={styles.l}>Booked Calls</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.n}>0</div>
                  <div className={styles.l}>Funnels Used</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA + REGISTRATION */}
      <section className={styles.final} id="register" ref={formRef}>
        <div className={`${styles.wrap} ${styles.center}`}>
          <div className={styles.kicker}>Last Call</div>
          <h2>One More Time, Plainly</h2>
          <p className={styles.disq}>
            If you’re a <b>business owner with a real offer and an Instagram account</b>, this training will
            show you the machine. If you want to go viral and land brand deals, this isn’t for you, with
            love.
          </p>

          <form className={styles.formCard} onSubmit={handleSubmit}>
            <h3>Save Your Seat on the Live Training</h3>
            <div className={styles.fieldRow}>
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

            <button className={`${styles.btn} ${styles.submit}`} type="submit" disabled={submitting}>
              {submitting ? "SAVING YOUR SEAT…" : "SAVE MY SEAT (FREE)"}
            </button>
            {submitError && <div className={styles.formError}>{submitError}</div>}
            <div className={styles.formMicro}>
              We’ll text and email you the Zoom link. No spam, unsubscribe any time.
            </div>
          </form>

          <div className={`${styles.micro} ${styles.muted}`}>
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


    </div>
  );
}
