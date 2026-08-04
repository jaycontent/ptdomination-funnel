"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Script from "next/script";

const WISTIA_MEDIA_ID = "3avlzggbbw";
const TYPEFORM_ID = "01KZ76X4Q55CP4QBPXZHMH1SPQ";

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
  "The Cash Flow Content system is an inside look into social media on a level that 99% of people do not have the experience and the credentials to speak on.",
  "See just 12 years ago I was living in a trailer park addicted to substances sleeping on my grandmother's couch.",
  "I didn't come from money.",
  "I had to find a way to make money — and if I didn't make money — that would mean that I'd be working at a 9-5 job for the rest of my life and that simply wasn't an option.",
];

const STORY_2: string[] = [
  "And to this point — the only opportunity you got to work with me outside of the fitness industry is through my VIP 1-1 Coaching Program that's $100,000 USD for 12 months.",
  "And the results of me working 1-1? Insane.",
  "My client @kaycapitals on Instagram started out with 15k followers, making 80k per month. 2 years later he's got over 1 million followers and he's doing 2 million dollars a month.",
  "My client @realtordrdotcom started with me with 30,000 followers on Instagram but getting ZERO leads from social media. Their business had done 24 million in sales in 2024 before working with me. As of today, they're over 60,000 followers and they've done over 50 million dollars in sales in 2025 and Instagram is now their #1 source of leads.",
  "But hey — you don't even need to have a big following or go viral in order to make this system work for you. My client @ryanthewindowcleaner worked with me late 2024 and he started with 4,000 followers doing 25k per month. Now, as of June 2026, he hit his first $100,000 month with only 9,450 followers.",
  "This system works, and it works for people just like you.",
  "And listen — I know you've already heard all the advice from all of the gurus.",
  "“Post more, more hooks, go viral,” but nobody's ever explained to you what it actually takes to turn someone who follows you into a paying customer.",
  "No one's ever explained how the Instagram algorithm and the attention economy actually work and because of that every time you sit down to create content you're stuck there staring at your phone with no idea what to say.",
  "That's exactly what Cash Flow Content was created for.",
  "It was created for the business owner who understands how important social media is and how imperative it is to build a personal brand in 2026 that stands out from the crowd.",
  "In an age where the world is craving authenticity, no one ever explained to you how to speak on camera in a way that's authentic and real for you, that allows you to share your message in a way that connects with your audience and converts people from “interested,” to “committed.”",
];

const CLOSING: string[] = [
  "Understand that application does not guarantee entry.",
  "We will be receiving hundreds of applications for this launch and we are only looking to take on those who are ready, committed, and prepared to do whatever it takes to get their social media to the next level.",
  "This is for business owners who want to grow and sell on social media. Business owners that are prepared to do the work required. Business owners that we don't have to CONVINCE that social media is the engine that will dramatically transform their lives, their families' lives, and the lives of everyone you get to impact and reach because of social media.",
  "This isn't just about you. It's about all the people in the world that need to hear your message.",
];

export default function CashFlowContentOrganicPage() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const hasLoadedVideo = useRef(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const headlineInnerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (videoContainerRef.current && !hasLoadedVideo.current) {
      hasLoadedVideo.current = true;
      videoContainerRef.current.innerHTML = `<wistia-player media-id="${WISTIA_MEDIA_ID}" aspect="1.7777777777777777"></wistia-player>`;
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Keep the hero headline to exactly two lines by shrinking the font until the
  // text fits in at most two line boxes. Re-runs on resize and after the web
  // font loads (Inter changes text metrics once swapped in).
  useEffect(() => {
    const h1 = headlineRef.current;
    const inner = headlineInnerRef.current;
    if (!h1 || !inner) return;

    const MAX_PX = 62;
    const MIN_PX = 15;
    let raf = 0;

    // Count visual lines by distinct row tops — getClientRects() returns one
    // rect per inline fragment (the accent spans split each line), so we can't
    // just use its length.
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

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script
        src={`https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`}
        strategy="afterInteractive"
        type="module"
      />
      <Script src="https://embed.typeform.com/next/embed.js" strategy="afterInteractive" />

      <div className="cfc-page">
        {/* Hero */}
        <section className="hero">
          <div className="logo-container">
            <Image src="/ptd-logo-sm.webp" alt="PT Domination" width={170} height={56} className="logo" />
          </div>
          <h1 ref={headlineRef}>
            <span ref={headlineInnerRef} className="headline-inner">
              The system that grew over <span className="accent">6M followers</span> &amp; generated{" "}
              <span className="accent">$50M</span> in revenue.
            </span>
          </h1>

          <div className="video-wrapper">
            <div
              ref={videoContainerRef}
              className="wistia-embed"
              style={{
                background:
                  "center / contain no-repeat url('https://fast.wistia.com/embed/medias/" +
                  WISTIA_MEDIA_ID +
                  "/swatch')",
              }}
            />
          </div>

          <button className="cta-btn" onClick={scrollToWaitlist}>
            Apply For The System
          </button>
        </section>

        {/* Eligibility */}
        <section className="eligibility reveal">
          <p>
            For business owners doing at least <strong>$5,000 in revenue per month</strong>. You must
            already have something to sell. We&apos;re not going to teach you offer creation. We are going
            to show you how to generate mass amounts of attention and then turn those eyeballs into paying
            customers consistently and predictably.
          </p>
          <p className="form-callout">Fill out the form below to join the waitlist 👇🏽</p>
        </section>

        {/* Waitlist (Typeform) */}
        <section id="waitlist" className="waitlist">
          <div className="typeform-wrapper">
            <div data-tf-live={TYPEFORM_ID}></div>
          </div>
        </section>

        {/* Social proof */}
        <section className="social-proof">
          <div className="eyebrow reveal">Learn the System Behind 6M+ Followers</div>
          <h2 className="reveal">Real Analytics. Real Results.</h2>
          <div className="analytics-grid">
            {ANALYTICS_IMAGES.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt={`Analytics screenshot ${i + 1}`} loading="lazy" className="analytics-img reveal" />
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="story">
          {STORY.map((p, i) => (
            <p key={`s1-${i}`} className="reveal">
              {p}
            </p>
          ))}

          <div className="phases">
            <p className="reveal">
              <span className="phase-label">First</span> — I worked on my fitness. I got so good that
              people asked me how I looked the way I looked.
            </p>
            <p className="reveal">
              <span className="phase-label">Then</span> — I turned that into a business. I got so good
              that fitness coaches kept asking me how to build a fitness business.
            </p>
            <p className="reveal">
              <span className="phase-label">Now</span> — I&apos;m the best business coach in the space for
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
            <p key={`s2-${i}`} className="reveal">
              {p}
            </p>
          ))}
        </section>

        {/* Final CTA */}
        <section className="final-cta">
          <h2 className="reveal">Welcome to Cash Flow Content.</h2>
          <p className="reveal first-step">
            <span className="phase-label">First step</span> — put your name on the waitlist.
          </p>
          {CLOSING.map((p, i) => (
            <p key={`c-${i}`} className="reveal">
              {p}
            </p>
          ))}

          <div className="reassurance reveal">
            <p>You&apos;re not lazy.</p>
            <p>You&apos;re not bad at social media.</p>
            <p>The algorithm doesn&apos;t hate you.</p>
            <p>
              You&apos;ve just never learned the actual system that is required in order to reach the
              clients you want to reach through social media and get them to follow you, book a
              consultation, and become a paying client.
            </p>
          </div>

          <h3 className="reveal welcome-2">Welcome to Cash Flow Content.</h3>
          <p className="reveal">
            We will be reviewing applications starting <strong>August 07</strong> and we will be reaching
            out to those people who we believe will be the best fit for the program.
          </p>
          <p className="reveal stay-tuned">Stay tuned. Can&apos;t wait to see you on the inside.</p>

          <button className="cta-btn" onClick={scrollToWaitlist}>
            Apply For The System
          </button>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>© 2026 PT Domination. All rights reserved.</p>
          <p className="disclaimer">Results vary. Individual results depend on effort and execution.</p>
          <p className="disclaimer">This site is not a part of the Facebook/Meta website or Facebook/Meta Inc.</p>
        </footer>
      </div>

      <style jsx global>{`
        body { background: #030712 !important; }
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
        .cfc-page {
          --black: #030712;
          --card: #111827;
          --card-border: #1f2937;
          --blue: #00d9ff;
          --blue-dim: #0088ff;
          --white: #f5f2ed;
          --muted: #9ca3af;
          --body: #d1d5db;
          background: var(--black);
          color: var(--body);
          line-height: 1.7;
          min-height: 100vh;
          font-family: inherit;
          overflow-x: hidden;
        }
        section { padding: 0 20px; }

        /* Hero */
        .hero {
          max-width: 900px;
          margin: 0 auto;
          padding-top: 56px;
          padding-bottom: 20px;
          text-align: center;
        }
        .logo-container { margin-bottom: 34px; }
        .logo { display: inline-block; height: auto; }
        .hero h1 {
          /* Fallback size; JS fits the exact size so it stays on two lines. */
          font-size: clamp(2rem, 5.2vw, 3.4rem);
          font-weight: 800;
          line-height: 1.12;
          color: var(--white);
          letter-spacing: -0.02em;
          margin-bottom: 20px;
          text-wrap: balance;
        }
        .headline-inner {
          display: inline;
        }
        .accent {
          background: linear-gradient(135deg, var(--blue) 0%, var(--blue-dim) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero .sub {
          font-size: clamp(1.05rem, 2.2vw, 1.3rem);
          color: var(--muted);
          max-width: 620px;
          margin: 0 auto 36px;
        }
        .video-wrapper {
          max-width: 860px;
          margin: 0 auto 32px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--card-border);
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 217, 255, 0.08);
          background: #0a1120;
        }
        .wistia-embed { width: 100%; aspect-ratio: 16 / 9; }

        /* CTA button */
        .cta-btn {
          display: inline-block;
          background: linear-gradient(135deg, var(--blue) 0%, var(--blue-dim) 100%);
          color: #041016;
          font-weight: 800;
          font-size: clamp(1rem, 2.2vw, 1.2rem);
          padding: 18px 44px;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
          box-shadow: 0 10px 30px rgba(0, 217, 255, 0.28);
          text-transform: uppercase;
        }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(0, 217, 255, 0.42); }

        /* Eligibility */
        .eligibility {
          max-width: 720px;
          margin: 30px auto 0;
          text-align: center;
          font-size: 1.1rem;
        }
        .eligibility strong { color: var(--white); }
        .form-callout {
          margin-top: 22px;
          font-weight: 700;
          color: var(--white);
          font-size: 1.2rem;
        }

        /* Waitlist / Typeform */
        .waitlist { max-width: 780px; margin: 28px auto 0; scroll-margin-top: 20px; }
        .typeform-wrapper {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--card-border);
          background: var(--card);
        }
        .typeform-wrapper [data-tf-live] {
          width: 100%;
          height: clamp(620px, 86vh, 860px);
        }
        /* Typeform injects the inner div + iframe at runtime, so they don't get
           styled-jsx's scoped class — use :global() to reach them and force both
           to fill the container (no dead space, no inner scroll). */
        .typeform-wrapper :global([data-tf-live] > div),
        .typeform-wrapper :global([data-tf-live] iframe) {
          width: 100% !important;
          height: 100% !important;
          display: block;
          border: 0;
        }

        /* Social proof */
        .social-proof { max-width: 1100px; margin: 72px auto 0; text-align: center; }
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
          font-size: clamp(1.7rem, 4vw, 2.6rem);
          letter-spacing: -0.02em;
          margin-bottom: 14px;
        }
        .sp-sub { color: var(--muted); max-width: 640px; margin: 0 auto 40px; }
        .analytics-grid {
          columns: 3 240px;
          column-gap: 16px;
        }
        .analytics-img {
          width: 100%;
          margin-bottom: 16px;
          border-radius: 12px;
          border: 1px solid var(--card-border);
          display: block;
          break-inside: avoid;
          background: var(--card);
        }

        /* Story + final */
        .story, .final-cta {
          max-width: 720px;
          margin: 0 auto;
          font-size: 1.12rem;
        }
        .story { margin-top: 72px; }
        .final-cta { margin-top: 20px; text-align: center; padding-bottom: 20px; }
        .story p, .final-cta p { margin-bottom: 20px; }
        .story p { color: var(--body); }
        .phase-label { color: var(--blue); font-weight: 800; }
        .phases { margin: 8px 0; }
        .quotes {
          border-left: 3px solid var(--blue);
          padding: 4px 0 4px 22px;
          margin: 26px 0;
        }
        .quotes p { color: var(--white); font-style: italic; font-size: 1.2rem; margin-bottom: 8px; }
        .final-cta h2 {
          color: var(--white);
          font-weight: 800;
          font-size: clamp(1.6rem, 4vw, 2.3rem);
          margin: 40px 0 20px;
        }
        .first-step, .stay-tuned { font-weight: 700; color: var(--white); }
        .reassurance {
          background: linear-gradient(180deg, rgba(0, 217, 255, 0.06) 0%, transparent 100%);
          border: 1px solid var(--card-border);
          border-radius: 16px;
          padding: 28px 24px;
          margin: 34px 0;
        }
        .reassurance p { margin-bottom: 12px; color: var(--white); }
        .reassurance p:last-child { color: var(--body); font-weight: 400; margin-bottom: 0; }
        .welcome-2 {
          color: var(--white);
          font-weight: 800;
          font-size: 1.5rem;
          margin: 36px 0 18px;
        }
        .final-cta .cta-btn { margin-top: 30px; }

        /* Footer */
        .footer {
          max-width: 720px;
          margin: 60px auto 0;
          padding: 40px 20px 56px;
          border-top: 1px solid var(--card-border);
          text-align: center;
          color: var(--muted);
          font-size: 0.9rem;
        }
        .footer p { margin-bottom: 8px; }
        .disclaimer { font-size: 0.82rem; opacity: 0.8; }

        /* Reveal animation */
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        @media (max-width: 640px) {
          .analytics-grid { columns: 2 150px; }
          .hero { padding-top: 40px; }
          .typeform-wrapper iframe { height: 520px; }
        }
      `}</style>
    </>
  );
}
