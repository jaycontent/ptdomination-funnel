"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Script from "next/script";
import { useFbTrack } from "@/lib/useFbTrack";
import styles from "./CashFlowContentLanding.module.css";

const WISTIA_MEDIA_ID = "3avlzggbbw";


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
  "We receive hundreds of applications and we only take on those who are ready, committed, and prepared to do whatever it takes to get their social media to the next level.",
  "This is for business owners who want to grow and sell on social media. Business owners that are prepared to do the work required. Business owners that we don't have to CONVINCE that social media is the engine that will dramatically transform their lives, their families' lives, and the lives of everyone you get to impact and reach because of social media.",
  "This isn't just about you. It's about all the people in the world that need to hear your message.",
];

// typeformId is what separates the paid, organic and Cole versions of this page.
export default function CashFlowContentLanding({ typeformId }: { typeformId: string }) {
  useFbTrack("PageView");
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
    // CSS modules hash these class names, so the observer has to look them up
    // through `styles` — a literal ".reveal" matches nothing and would leave
    // every revealed block stuck at opacity 0.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add(styles.visible);
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(`.${styles.reveal}`).forEach((el) => observer.observe(el));
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

      <div className={styles.cfcPage}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.logoContainer}>
            <Image src="/ptd-logo-sm.webp" alt="PT Domination" width={170} height={56} className={styles.logo} />
          </div>
          <h1 ref={headlineRef}>
            <span ref={headlineInnerRef} className={styles.headlineInner}>
              The system that grew over <span className={styles.accent}>6M followers</span> &amp; generated{" "}
              <span className={styles.accent}>$50M</span> in revenue.
            </span>
          </h1>

          <div className={styles.videoWrapper}>
            <div
              ref={videoContainerRef}
              className={styles.wistiaEmbed}
              style={{
                background:
                  "center / contain no-repeat url('https://fast.wistia.com/embed/medias/" +
                  WISTIA_MEDIA_ID +
                  "/swatch')",
              }}
            />
          </div>

          <button className={styles.ctaBtn} onClick={scrollToWaitlist}>
            Apply For The System
          </button>
        </section>

        {/* Eligibility */}
        <section className={`${styles.eligibility} ${styles.reveal}`}>
          <p>
            For business owners doing at least <strong>$5,000 in revenue per month</strong>. You must
            already have something to sell. We&apos;re not going to teach you offer creation. We are going
            to show you how to generate mass amounts of attention and then turn those eyeballs into paying
            customers consistently and predictably.
          </p>
          <p className={styles.formCallout}>Fill out the application below 👇🏽</p>
        </section>

        {/* Waitlist (Typeform) */}
        <section id="waitlist" className={styles.waitlist}>
          <div className={styles.typeformWrapper}>
            <div data-tf-live={typeformId}></div>
          </div>
        </section>

        {/* Social proof */}
        <section className={styles.socialProof}>
          <div className={`${styles.eyebrow} ${styles.reveal}`}>Learn the System Behind 6M+ Followers</div>
          <h2 className={styles.reveal}>Real Analytics. Real Results.</h2>
          <div className={styles.analyticsGrid}>
            {ANALYTICS_IMAGES.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt={`Analytics screenshot ${i + 1}`} loading="lazy" className={`${styles.analyticsImg} ${styles.reveal}`} />
            ))}
          </div>
        </section>

        {/* Story */}
        <section className={styles.story}>
          {STORY.map((p, i) => (
            <p key={`s1-${i}`} className={styles.reveal}>
              {p}
            </p>
          ))}

          <div className={styles.phases}>
            <p className={styles.reveal}>
              <span className={styles.phaseLabel}>First</span> — I worked on my fitness. I got so good that
              people asked me how I looked the way I looked.
            </p>
            <p className={styles.reveal}>
              <span className={styles.phaseLabel}>Then</span> — I turned that into a business. I got so good
              that fitness coaches kept asking me how to build a fitness business.
            </p>
            <p className={styles.reveal}>
              <span className={styles.phaseLabel}>Now</span> — I&apos;m the best business coach in the space for
              online fitness coaches. And in 2026 I&apos;ve received thousands of messages that all say the
              same thing:
            </p>
          </div>

          <div className={`${styles.quotes} ${styles.reveal}`}>
            <p>&ldquo;How did you do it?&rdquo;</p>
            <p>&ldquo;How did you build your social media?&rdquo;</p>
            <p>&ldquo;Do you work with people outside of the fitness industry?&rdquo;</p>
          </div>

          {STORY_2.map((p, i) => (
            <p key={`s2-${i}`} className={styles.reveal}>
              {p}
            </p>
          ))}
        </section>

        {/* Final CTA */}
        <section className={styles.finalCta}>
          <h2 className={styles.reveal}>Welcome to Cash Flow Content.</h2>
          <p className={`${styles.reveal} ${styles.firstStep}`}>
            <span className={styles.phaseLabel}>First step</span> — fill out your application.
          </p>
          {CLOSING.map((p, i) => (
            <p key={`c-${i}`} className={styles.reveal}>
              {p}
            </p>
          ))}

          <div className={`${styles.reassurance} ${styles.reveal}`}>
            <p>You&apos;re not lazy.</p>
            <p>You&apos;re not bad at social media.</p>
            <p>The algorithm doesn&apos;t hate you.</p>
            <p>
              You&apos;ve just never learned the actual system that is required in order to reach the
              clients you want to reach through social media and get them to follow you, book a
              consultation, and become a paying client.
            </p>
          </div>

          <h3 className={`${styles.reveal} ${styles["welcome-2"]}`}>Welcome to Cash Flow Content.</h3>
          <p className={styles.reveal}>
            We&rsquo;re reviewing applications right now and reaching out to the people we believe will be
            the best fit for the program.
          </p>
          <p className={`${styles.reveal} ${styles.stayTuned}`}>Apply below &mdash; we&rsquo;ll be in touch soon.</p>

          <button className={styles.ctaBtn} onClick={scrollToWaitlist}>
            Apply For The System
          </button>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>© 2026 PT Domination. All rights reserved.</p>
          <p className={styles.disclaimer}>Results vary. Individual results depend on effort and execution.</p>
          <p className={styles.disclaimer}>This site is not a part of the Facebook/Meta website or Facebook/Meta Inc.</p>
        </footer>
      </div>


    </>
  );
}
