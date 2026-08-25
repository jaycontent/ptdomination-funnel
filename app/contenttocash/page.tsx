"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { CheckCircle2 } from "lucide-react";
import { getNextWebinarDate, calculateTimeRemaining } from "@/lib/date";
import { useFbTrack } from "@/lib/useFbTrack";

const WISTIA_MEDIA_ID = "4jk4bimnaw";
const webinar = getNextWebinarDate();

// Webinar-start fields for CRM mapping, matching the format used by the other
// PT Domination webinar pages (webinar_display + a GHL "webinar<month><day>" tag).
function buildWebinarFields(w: ReturnType<typeof getNextWebinarDate>) {
  const d = new Date(w.iso);
  const tzAbbr = (tz: string) =>
    new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "short" })
      .formatToParts(d)
      .find((p) => p.type === "timeZoneName")?.value || "";
  const pt = tzAbbr("America/Los_Angeles"); // PDT / PST
  const et = tzAbbr("America/New_York"); // EDT / EST
  const afterComma = w.longDisplay.split(", ")[1] || ""; // e.g. "August 27th"
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
  "The Instagram Marketing Funnel: connection content, conversion value, and social proof, plus exactly what to post at each stage",
  "Why the 2026 algorithm suppresses your content, and the one metric that actually makes you go viral",
  "What to post to get followers vs. what to post to get clients",
  "How to turn 30M+ views into DMs, and DMs into booked, qualified sales calls",
  "The 3 content mistakes keeping you stuck: the conversion trap, the viral trap, and generic posting",
];

// Social proof + story, brought over from the Cash Flow Content page.
const ANALYTICS_IMAGES = [
  "https://res.cloudinary.com/p70n6k9m/image/upload/v1785529361/Photo_2026-07-27_9_01_20_AM_lmhnbv.jpg",
  "https://res.cloudinary.com/p70n6k9m/image/upload/v1785529360/Photo_2026-07-24_12_39_04_PM_cmkx9q.jpg",
  "https://res.cloudinary.com/p70n6k9m/image/upload/v1785529363/Screenshot_2026-07-27_085942_ucivun.png",
  "https://res.cloudinary.com/p70n6k9m/image/upload/v1785529363/Screenshot_2026-07-24_115630_yq5aol.png",
  "https://res.cloudinary.com/p70n6k9m/image/upload/v1785529363/Screenshot_2026-07-24_115442_evtv4k.png",
  "https://res.cloudinary.com/p70n6k9m/image/upload/v1785529363/Screenshot_2026-07-24_115612_tw9do7.png",
  "https://res.cloudinary.com/p70n6k9m/image/upload/v1785529363/Screenshot_2026-07-27_090451_wx5gsd.png",
  "https://res.cloudinary.com/p70n6k9m/image/upload/v1785529363/Screenshot_2026-07-27_090001_uu6lpq.png",
  "https://res.cloudinary.com/p70n6k9m/image/upload/v1785529362/Screenshot_2026-07-24_115425_yphaiy.png",
  "https://res.cloudinary.com/p70n6k9m/image/upload/v1785529362/Screenshot_2026-07-24_115356_ctxi9k.png",
  "https://res.cloudinary.com/p70n6k9m/image/upload/v1785529362/Photo_2026-07-27_9_04_02_AM_ruzx2y.jpg",
  "https://res.cloudinary.com/p70n6k9m/image/upload/v1785529362/Photo_2026-07-27_9_04_30_AM_pxmeld.jpg",
  "https://res.cloudinary.com/p70n6k9m/image/upload/v1785529361/Photo_2026-07-24_12_41_09_PM_icpznc.jpg",
  "https://res.cloudinary.com/p70n6k9m/image/upload/v1785529361/Photo_2026-07-27_9_02_06_AM_o8rw1m.jpg",
  "https://res.cloudinary.com/p70n6k9m/image/upload/v1785529361/Photo_2026-07-24_12_40_49_PM_hst6js.jpg",
  "https://res.cloudinary.com/p70n6k9m/image/upload/v1785529361/Photo_2026-07-24_12_39_45_PM_jt6wfx.jpg",
  "https://res.cloudinary.com/p70n6k9m/image/upload/v1785529360/Photo_2026-07-24_12_39_34_PM_zg4i3k.jpg",
];

const STORY: string[] = [
  "For the business owners who want to grow and sell on social media,",
  "In the last 5 years I've grown my Instagram account @therealbrianmark from 0 to 700k+ followers and generated over 50 million dollars in sales.",
  "My business partner Cole DaSilva has amassed a following of 5 million social media followers across Instagram, Youtube, Facebook, Snapchat and TikTok.",
  "And for the first time ever we are pulling back the curtains and revealing the strategies and the systems behind our content cash generating machine.",
  "Whether you're a business owner that films on nothing but your iPhone…",
  "Or you're a business owner that rolls with a videographer and some editors…",
  "This is an inside look into social media on a level that 99% of people do not have the experience and the credentials to speak on.",
  "See just 12 years ago I was living in a trailer park addicted to substances sleeping on my grandmother's couch.",
  "I didn't come from money.",
  "I had to find a way to make money, and if I didn't make money, that would mean that I'd be working at a 9-5 job for the rest of my life and that simply wasn't an option.",
];

const STORY_2: string[] = [
  "And to this point, the only opportunity you got to work with me outside of the fitness industry is through my VIP 1-1 Coaching Program that's $100,000 USD for 12 months.",
  "And the results of me working 1-1? Insane.",
  "My client @kaycapitals on Instagram started out with 15k followers, making 80k per month. 2 years later he's got over 1 million followers and he's doing 2 million dollars a month.",
  "My client @realtordrdotcom started with me with 30,000 followers on Instagram but getting ZERO leads from social media. Their business had done 24 million in sales in 2024 before working with me. As of today, they're over 60,000 followers and they've done over 50 million dollars in sales in 2025 and Instagram is now their #1 source of leads.",
  "But hey, you don't even need to have a big following or go viral in order to make this system work for you. My client @ryanthewindowcleaner worked with me late 2024 and he started with 4,000 followers doing 25k per month. Now, as of June 2026, he hit his first $100,000 month with only 9,450 followers.",
  "This system works, and it works for people just like you.",
  "And listen, I know you've already heard all the advice from all of the gurus.",
  "“Post more, more hooks, go viral,” but nobody's ever explained to you what it actually takes to turn someone who follows you into a paying customer.",
  "No one's ever explained how the Instagram algorithm and the attention economy actually work and because of that every time you sit down to create content you're stuck there staring at your phone with no idea what to say.",
  "That's exactly what this masterclass was created for.",
  "It was created for the business owner who understands how important social media is and how imperative it is to build a personal brand in 2026 that stands out from the crowd.",
  "In an age where the world is craving authenticity, no one ever explained to you how to speak on camera in a way that's authentic and real for you, that allows you to share your message in a way that connects with your audience and converts people from “interested,” to “committed.”",
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
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const headlineInnerRef = useRef<HTMLSpanElement>(null);

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    invest: "",
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

  // Keep the hero headline to exactly two lines by shrinking the font until it
  // fits in at most two line boxes. Re-runs on resize and after the font loads.
  useEffect(() => {
    const h1 = headlineRef.current;
    const inner = headlineInnerRef.current;
    if (!h1 || !inner) return;
    const MAX_PX = 50;
    const MIN_PX = 15;
    let raf = 0;
    const lineCount = () => {
      const tops = new Set<number>();
      const rects = inner.getClientRects();
      for (let i = 0; i < rects.length; i++) tops.add(Math.round(rects[i].top));
      return tops.size;
    };
    const fit = () => {
      let size = MAX_PX;
      h1.style.fontSize = size + "px";
      while (lineCount() > 2 && size > MIN_PX) {
        size -= 1;
        h1.style.fontSize = size + "px";
      }
    };
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(fit);
    };
    fit();
    window.addEventListener("resize", onResize);
    // @ts-ignore - fonts API not in older TS DOM libs
    if (document.fonts?.ready) document.fonts.ready.then(fit).catch(() => {});
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Keep the form heading ("Save Your Spot on the Zoom Call") to a single line by
  // shrinking its font until it no longer overflows the form width.
  useEffect(() => {
    const fit = () => {
      document.querySelectorAll<HTMLHeadingElement>(".form-card h2").forEach((el) => {
        if (el.offsetParent === null) return; // skip the hidden (other-breakpoint) copy
        el.style.whiteSpace = "nowrap";
        let size = 26;
        el.style.fontSize = size + "px";
        while (el.scrollWidth > el.clientWidth && size > 12) {
          size -= 1;
          el.style.fontSize = size + "px";
        }
      });
    };
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(fit);
    };
    fit();
    window.addEventListener("resize", onResize);
    // @ts-ignore - fonts API not in older TS DOM libs
    if (document.fonts?.ready) document.fonts.ready.then(fit).catch(() => {});
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
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
          would_invest:
            form.invest === "yes"
              ? "Yes, I would happily invest."
              : form.invest === "no"
              ? "No, I don't have money to invest."
              : "No answer",
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
    // Checked the invest box -> pixel-tracked confirmation; unchecked -> no-pixel duplicate.
    router.push(form.invest === "yes" ? "/contenttocash/confirmation" : "/contenttocash/confirmation-b");
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
        <div className="page-layout">
          <div className="scroll-col">
            {/* Hero */}
            <div className="hero">
              <div className="badge">
                Live on Zoom · {webinar.longDisplay}
                {!countdown.isExpired && (
                  <span className="timer">
                    &nbsp;·&nbsp;starts in {countdown.days}d {pad(countdown.hours)}h {pad(countdown.minutes)}m{" "}
                    {pad(countdown.seconds)}s
                  </span>
                )}
              </div>
              <h1 ref={headlineRef}>
                <span ref={headlineInnerRef} className="headline-inner">
                  How to Turn Your Instagram Content Into an Extra <span className="accent">$10K+/Month</span>
                </span>
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

            {/* Form — inline on mobile only */}
            <div className="form-card form-mobile" ref={formRef}>
              <div className="form-eyebrow">Registration</div>
              <h2>Save Your Spot on the Zoom Call</h2>
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
                <div className="invest-block">
                  <p className="invest-q">
                    Would you invest in building out this content system if it means growing your business?
                  </p>
                  {[
                    { value: "yes", label: "Yes, I would happily invest." },
                    { value: "no", label: "No, I don't have money to invest." },
                  ].map((opt) => {
                    const selected = form.invest === opt.value;
                    return (
                      <button key={opt.value} type="button" role="radio" aria-checked={selected}
                        onClick={() => setForm((f) => ({ ...f, invest: opt.value }))}
                        className={`invest-opt ${selected ? "sel" : ""}`}>
                        <span className="radio-dot" data-checked={selected}>
                          {selected && <span className="radio-inner" />}
                        </span>
                        <span className="invest-opt-label">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
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

            {/* Social proof */}
            <div className="social-proof">
              <div className="eyebrow reveal">Learn the System Behind 6M+ Followers</div>
              <h2 className="reveal">Real Analytics. Real Results.</h2>
              <div className="analytics-grid">
                {ANALYTICS_IMAGES.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={src} alt={`Analytics screenshot ${i + 1}`} loading="lazy" className="analytics-img reveal" />
                ))}
              </div>
            </div>

            {/* Story */}
            <div className="story">
              {STORY.map((p, i) => (
                <p key={`s1-${i}`} className="reveal">{p}</p>
              ))}

              <div className="phases">
                <p className="reveal">
                  <span className="phase-label">First</span>, I worked on my fitness. I got so good that
                  people asked me how I looked the way I looked.
                </p>
                <p className="reveal">
                  <span className="phase-label">Then</span>, I turned that into a business. I got so good
                  that fitness coaches kept asking me how to build a fitness business.
                </p>
                <p className="reveal">
                  <span className="phase-label">Now</span>, I&apos;m the best business coach in the space for
                  online fitness coaches. And in 2026 I&apos;ve received thousands of messages that all say the
                  same thing:
                </p>
              </div>

              <div className="quotes reveal">
                <p>&ldquo;How did you do it?&rdquo;</p>
                <p>&ldquo;How did you build your social media?&rdquo;</p>
                <p>&ldquo;Do you work with people outside of the fitness industry?&rdquo;</p>
              </div>

              {STORY_2.map((p, i) => (
                <p key={`s2-${i}`} className="reveal">{p}</p>
              ))}

              <button className="ghost-btn story-cta" onClick={scrollToForm}>
                Save My Spot on the Zoom Call →
              </button>
            </div>
          </div>

          {/* Sticky form — desktop only */}
          <aside className="form-col">
            <div className="form-card form-sticky">
              <div className="form-eyebrow">Registration</div>
              <h2>Save Your Spot on the Zoom Call</h2>
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
                <div className="invest-block">
                  <p className="invest-q">
                    Would you invest in building out this content system if it means growing your business?
                  </p>
                  {[
                    { value: "yes", label: "Yes, I would happily invest." },
                    { value: "no", label: "No, I don't have money to invest." },
                  ].map((opt) => {
                    const selected = form.invest === opt.value;
                    return (
                      <button key={opt.value} type="button" role="radio" aria-checked={selected}
                        onClick={() => setForm((f) => ({ ...f, invest: opt.value }))}
                        className={`invest-opt ${selected ? "sel" : ""}`}>
                        <span className="radio-dot" data-checked={selected}>
                          {selected && <span className="radio-inner" />}
                        </span>
                        <span className="invest-opt-label">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
                {submitError && <p className="err">{submitError}</p>}
                <button type="submit" disabled={submitting} className="submit-btn">
                  {submitting ? "Registering…" : "Register Free →"}
                </button>
                <p className="form-note">100% free. For business owners doing $10K+/month who want to scale.</p>
              </form>
            </div>
          </aside>
        </div>
      </div>

      <style jsx global>{`
        body { background: #0a0e1a !important; }
        /* Global because lucide icons are components — styled-jsx won't scope them. */
        .li-check { color: #00d9ff; flex-shrink: 0; width: 20px; height: 20px; margin-top: 2px; }
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
        .scroll-col { min-width: 0; }
        .form-col { display: none; }

        .hero { text-align: center; }
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
          /* Fallback size; JS fits the exact size so it stays on two lines. */
          font-size: clamp(2rem, 5.4vw, 3.1rem);
          line-height: 1.12;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
          text-wrap: balance;
        }
        .headline-inner { display: inline; }
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

        .invest-block {
          text-align: left;
          background: rgba(0, 159, 238, 0.08);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 14px;
          display: grid;
          gap: 8px;
        }
        .invest-q { color: var(--white); font-weight: 600; font-size: 0.92rem; margin: 0 0 2px; line-height: 1.4; }
        .invest-opt {
          display: flex;
          align-items: center;
          gap: 10px;
          text-align: left;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 11px 12px;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease;
        }
        .invest-opt.sel { background: rgba(0, 159, 238, 0.14); border-color: #009fee; }
        .radio-dot {
          flex-shrink: 0;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .radio-dot[data-checked="true"] { border-color: #009fee; }
        .radio-inner { width: 9px; height: 9px; border-radius: 50%; background: linear-gradient(135deg, #009fee, #00ffff); }
        .invest-opt-label { font-size: 0.9rem; color: var(--white); font-weight: 500; }

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

        /* Social proof + story (brought from Cash Flow Content) */
        .social-proof { margin-top: 56px; text-align: center; }
        .eyebrow {
          color: var(--blue);
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-size: 0.9rem;
          margin-bottom: 12px;
        }
        .social-proof h2 {
          color: var(--white);
          font-weight: 800;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          letter-spacing: -0.02em;
          margin-bottom: 24px;
        }
        .analytics-grid { columns: 2 220px; column-gap: 14px; }
        .analytics-img {
          width: 100%;
          margin-bottom: 14px;
          border-radius: 12px;
          border: 1px solid var(--border);
          display: block;
          break-inside: avoid;
          background: var(--card);
        }
        .story { margin-top: 56px; max-width: 680px; margin-left: auto; margin-right: auto; font-size: 1.1rem; }
        .story p { margin-bottom: 20px; color: var(--body); }
        .phase-label { color: var(--blue); font-weight: 800; }
        .phases { margin: 8px 0; }
        .quotes { border-left: 3px solid var(--blue); padding: 4px 0 4px 22px; margin: 26px 0; }
        .quotes p { color: var(--white); font-style: italic; font-size: 1.2rem; margin-bottom: 8px; }
        .story-cta { margin-top: 30px; }

        @media (max-width: 480px) {
          .grid2 { grid-template-columns: 1fr; }
          .analytics-grid { columns: 2 140px; }
        }

        /* Desktop: two-column layout with a sticky form on the right */
        @media (min-width: 1024px) {
          .wrap { max-width: 1140px; }
          .page-layout {
            display: grid;
            grid-template-columns: 1fr 400px;
            gap: 44px;
            align-items: start;
          }
          .form-mobile { display: none; }
          .form-col {
            display: block;
            position: sticky;
            top: 24px;
          }
          .form-sticky { margin-top: 0; }
        }
      `}</style>
    </div>
  );
}
