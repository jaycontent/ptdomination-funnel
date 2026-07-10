"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Script from "next/script";

const CALENDLY_URL = 'https://calendly.com/d/cyrh-p48-nnb/strategy-meeting-with-pt-dom';

function openCalendly() {
  // @ts-ignore
  if (window.Calendly) {
    // @ts-ignore
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  }
}

export default function DMSalesTrainingPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const hasLoadedVideo = useRef(false);

  useEffect(() => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 5);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = expiryDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (videoContainerRef.current && !hasLoadedVideo.current) {
      hasLoadedVideo.current = true;
      videoContainerRef.current.innerHTML = '<wistia-player media-id="pfviuc4tud" aspect="1.7777777777777777"></wistia-player>';
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.parentElement?.classList.toggle('open');
  };

  return (
    <>
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script src="https://fast.wistia.com/embed/pfviuc4tud.js" strategy="afterInteractive" type="module" />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />

      <div className="replay-page">
        {/* Sticky Bar */}
        <div className="sticky-bar">
          <span className="sticky-text">Want Brian&apos;s team to build your DM Sales game plan? &rarr;</span>
          <button className="sticky-btn" onClick={openCalendly}>Claim My Free Call</button>
        </div>

        {/* Hero */}
        <section className="hero">
          <div className="logo-container">
            <Image src="/ptd-logo-sm.webp" alt="PT Domination" width={180} height={60} className="logo" />
          </div>
          <div className="badge">
            Free DM Sales Training Replay
            <span className="timer-text">
              🔴 Expires In: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </span>
          </div>
          <div className="hero-content">
            <h1>How Coaches Are Closing <span className="blue">$2K–$5K</span> Clients Directly in the <span className="blue">DMs</span> — Without Ever Getting on a Cold Call</h1>
            <p className="sub">Watch the exact DM sales framework <strong>12,000+ coaches</strong> are using to turn warm followers into paying clients in under 24 hours — no awkward pitches, no ghosting, no chasing.</p>
          </div>
        </section>

        {/* Video + Calendar Stacked */}
        <section className="video-cal-section">
          <div className="video-cal-grid">
            {/* Video */}
            <div className="video-col">
              <div className="video-wrapper" ref={videoContainerRef}></div>
              <p className="video-note">⏱ Approximately 60 minutes — Grab a pen and paper.</p>
            </div>

            {/* Calendar below video */}
            <div className="cal-col">
              <div className="cal-cta-header">
                <div className="cal-eyebrow">Free 30-Min Strategy Call</div>
                <h3 className="cal-headline">Ready to build your DM Sales game plan?</h3>
                <p className="cal-sub">Pick a time below. Brian&apos;s team will audit your current DM process and map out the exact conversation framework to close high-ticket clients in the DMs — no pressure, no pitch-fest.</p>
                <ul className="cal-bullets">
                  <li>Custom DM script tailored to your offer</li>
                  <li>Identify why prospects are going cold on you</li>
                  <li>Map your path to closing 4–6 clients/month via DMs</li>
                </ul>
              </div>
              <div className="cal-embed-wrapper">
                <iframe
                  src={`${CALENDLY_URL}?embed_type=inline&hide_event_type_details=1&hide_gdpr_banner=1&background_color=111827&text_color=f5f2ed&primary_color=00d9ff`}
                  className="cal-iframe"
                  frameBorder="0"
                  title="Book a Free Strategy Call"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Proof Strip */}
        <div className="proof-strip reveal">
          <div className="proof-item">
            <div className="proof-number">12,000+</div>
            <div className="proof-label">Coaches Trained</div>
          </div>
          <div className="proof-item">
            <div className="proof-number">41</div>
            <div className="proof-label">Coaches Over $100K/Mo</div>
          </div>
          <div className="proof-item">
            <div className="proof-number">8</div>
            <div className="proof-label">Years In Business</div>
          </div>
          <div className="proof-item">
            <div className="proof-number">$2–5K</div>
            <div className="proof-label">Avg DM Close Value</div>
          </div>
        </div>

        {/* Pre-CTA Section */}
        <section className="section reveal">
          <div className="section-label">The Truth Nobody Says Out Loud</div>
          <h2>Watching Doesn&apos;t Close Clients.<br />Sending The Right Message Does.</h2>
          <p className="body-text">You just watched the DM sales blueprint. Now here&apos;s the truth nobody likes to say out loud:</p>
          <p className="body-text">Watching a training doesn&apos;t close clients. <strong>Sending the right message at the right moment does.</strong> And if you&apos;re like most of the 12,000+ coaches we&apos;ve worked with, you already have warm leads in your inbox — you just don&apos;t have the framework to convert them without coming across as pushy or desperate.</p>
          <p className="body-text">That&apos;s exactly what this call is for.</p>
          <p className="body-text">In 30 minutes, one of Brian&apos;s senior coaches will:</p>

          <ul className="check-list">
            <li>Audit your current DM conversations and pinpoint exactly where prospects go cold</li>
            <li>Build you a custom DM script and follow-up sequence for your specific offer</li>
            <li>Show you how to go from first touch to closed client in under 48 hours</li>
          </ul>

          <p className="body-text" style={{ marginTop: '28px' }}>If we&apos;re a fit to work together, we&apos;ll tell you. If we&apos;re not, you&apos;ll walk away with a DM sales process you can run yourself. Either way, you win.</p>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button className="cta-btn" onClick={openCalendly}>&rarr; Book My Free Strategy Call</button>
            <div className="cta-subtext" style={{ marginTop: '12px' }}>Spots are limited and our calendar fills fast — especially after replays drop.</div>
          </div>
        </section>

        {/* Results */}
        <section className="section results-section reveal">
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div className="section-label">Proven Results</div>
            <h2>These Are Real Coaches.<br />Real Revenue. Real Timelines.</h2>
            <p className="body-text">Every one of these transformations happened by installing the same DM sales systems you just watched in the training.</p>

            <div className="results-grid">
              <div className="result-card">
                <div className="result-name">Marie</div>
                <div className="result-before-after">
                  <span className="result-val before">$25K</span>
                  <span className="result-arrow">→</span>
                  <span className="result-val after">$112K</span>
                </div>
                <div className="result-timeline">In 8 Months</div>
              </div>
              <div className="result-card">
                <div className="result-name">Zach Smith</div>
                <div className="result-before-after">
                  <span className="result-val before">$30K</span>
                  <span className="result-arrow">→</span>
                  <span className="result-val after">$100K+</span>
                </div>
                <div className="result-timeline">In 3 Months</div>
              </div>
              <div className="result-card">
                <div className="result-name">Mina</div>
                <div className="result-before-after">
                  <span className="result-val before">$22K</span>
                  <span className="result-arrow">→</span>
                  <span className="result-val after">$105K</span>
                </div>
                <div className="result-timeline">Consistent Monthly</div>
              </div>
              <div className="result-card">
                <div className="result-name">Holly</div>
                <div className="result-before-after">
                  <span className="result-val before">$25K</span>
                  <span className="result-arrow">→</span>
                  <span className="result-val after">$104K</span>
                </div>
                <div className="result-timeline">Within 12 Months</div>
              </div>
              <div className="result-card">
                <div className="result-name">Dr. Connie</div>
                <div className="result-before-after">
                  <span className="result-val before">$100K</span>
                  <span className="result-arrow">→</span>
                  <span className="result-val after">$143K</span>
                </div>
                <div className="result-timeline">New Record in 60 Days</div>
              </div>
              <div className="result-card">
                <div className="result-name">Sage</div>
                <div className="result-before-after">
                  <span className="result-val before">$75K</span>
                  <span className="result-arrow">→</span>
                  <span className="result-val after">$100K</span>
                </div>
                <div className="result-timeline">In 48 Hours</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA After Results */}
        <div className="cta-block reveal">
          <h2>Ready To Start Closing in the DMs?</h2>
          <p>Book a free strategy call with our team. We&apos;ll audit your DM conversations and build your personalized sales framework.</p>
          <button className="cta-btn" onClick={openCalendly}>Book My Free Strategy Call &rarr;</button>
          <div className="cta-subtext">No obligation. Limited spots available.</div>
        </div>

        {/* This Is For You If */}
        <section className="section reveal">
          <div className="section-label">Is This Right For You?</div>
          <h2>This Call Is For You If…</h2>

          <ul className="check-list">
            <li>You&apos;re an online coach who wants to close $2K–$5K clients directly in the DMs</li>
            <li>You have warm leads in your inbox but don&apos;t know how to move them to a buying decision</li>
            <li>You&apos;re tired of chasing cold leads or filling your calendar with unqualified calls</li>
            <li>You want a repeatable, low-pressure DM framework built specifically for your offer</li>
            <li>You know conversation is where clients are won — you just need the right process</li>
            <li>You&apos;re ready to implement and want a coach who guarantees results</li>
          </ul>

          <h2 style={{ marginTop: '48px' }}>This Is NOT For You If…</h2>
          <ul className="check-list x-list">
            <li>You&apos;re a complete beginner with no coaching business yet</li>
            <li>You&apos;re looking for a magic button with zero effort required</li>
            <li>You&apos;re not willing to have real conversations with your audience</li>
            <li>You want a cheap, cookie-cutter program</li>
          </ul>
        </section>

        {/* CTA After Who It's For */}
        <div className="cta-block reveal">
          <h2>See If You Qualify</h2>
          <p>Not sure if this is the right fit? Book a call and let&apos;s figure it out together. Either way, you walk away with a plan.</p>
          <button className="cta-btn" onClick={openCalendly}>Book My Free Strategy Call &rarr;</button>
          <div className="cta-subtext">No obligation. Limited spots available.</div>
        </div>

        {/* Guarantee */}
        <section className="section reveal" style={{ paddingTop: 0 }}>
          <div className="guarantee-box">
            <div className="shield">🛡️</div>
            <h3>The &quot;Beat Your Record&quot; Guarantee</h3>
            <p>If Brian and his team don&apos;t help you beat your highest-ever revenue month as an online coach, you get a full refund of every dollar you paid — plus $1,000 sent to you for wasting your time. He assumes all the risk so you don&apos;t have to.</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="section reveal">
          <div className="section-label">Common Questions</div>
          <h2>Frequently Asked Questions</h2>

          <div className="faq-item">
            <div className="faq-q" onClick={toggleFAQ}>Still on the fence?</div>
            <div className="faq-a">Totally fair. Here&apos;s what the call is not: a high-pressure sales pitch or a generic &quot;let me tell you about our program&quot; spiel. Here&apos;s what it is: a working session. You bring your current DM conversations, your offer, and your biggest bottleneck. We bring 8 years of scaling coaches and a refund guarantee on the back end of any program we&apos;d recommend. Worst case, you get a free DM audit from someone who&apos;s closed millions of dollars in the DMs.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q" onClick={toggleFAQ}>What happens on the strategy call?</div>
            <div className="faq-a">It&apos;s a free, no-obligation 30-minute call with a member of Brian&apos;s team. They&apos;ll review your DM process, build you a custom conversation script for your offer, and show you how to go from first message to closed client in under 48 hours. If it&apos;s a fit to work together, they&apos;ll walk you through what that looks like — no pressure either way.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q" onClick={toggleFAQ}>How is this DM framework different from what I&apos;m already doing?</div>
            <div className="faq-a">Most coaches either pitch too fast and get ghosted, or they warm up forever and never ask. Brian&apos;s DM framework uses a specific 5-step conversation arc — built around your avatar, your offer, and your voice — that moves people naturally from curious to committed without awkward pressure or scripted sales language.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q" onClick={toggleFAQ}>I&apos;m not a fitness coach — does this work for me?</div>
            <div className="faq-a">The system is built for online coaches in the health and fitness space, but the DM sales framework has worked across nutrition, golf, peak performance, and detox coaching. Book a call and we&apos;ll tell you honestly whether it&apos;s the right fit.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q" onClick={toggleFAQ}>Do you offer payment plans?</div>
            <div className="faq-a">Yes. Payment plans are available for the right fit. Book a strategy call and the team will walk you through all options.</div>
          </div>
        </section>

        {/* Final CTA */}
        <div className="cta-block reveal">
          <h2>You&apos;ve Seen The Framework.<br />Now Let&apos;s Build Yours.</h2>
          <p>The DM sales system works. 12,000+ coaches have proven it. The only question is whether you&apos;re going to keep guessing in the DMs — or let someone who&apos;s done this 12,000 times map out exactly what to say next.</p>
          <button className="cta-btn" onClick={openCalendly}>&rarr; Book My Free Call Now</button>
          <div className="cta-subtext">No pitch-fest. No pressure. Just a real conversation about your business.</div>
        </div>

        {/* Footer */}
        <footer>
          &copy; 2026 PT Domination. All rights reserved. Results vary. Individual results depend on effort and execution.<br />
          This site is not a part of the Facebook/Meta website or Facebook/Meta Inc.
        </footer>

        <style jsx global>{`
          :root {
            --black: #030712;
            --rich-black: #0a0a0a;
            --card: #111827;
            --card-border: #1f2937;
            --blue: #00d9ff;
            --blue-dim: #0088ff;
            --blue-glow: rgba(0, 217, 255, 0.15);
            --white: #f5f2ed;
            --muted: #9ca3af;
            --body: #d1d5db;
            --red: #e04040;
            --green: #3dbd5c;
          }

          body {
            background: #030712 !important;
          }
        `}</style>

        <style jsx>{`
          .replay-page {
            background: #030712;
            color: #d1d5db;
            line-height: 1.7;
            min-height: 100vh;
          }

          /* Sticky Bar */
          .sticky-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100;
            background: var(--card);
            border-top: 1px solid var(--blue-dim);
            padding: 14px 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
          }

          .sticky-text {
            font-size: 14px;
            font-weight: 600;
            color: var(--white);
          }

          .sticky-btn {
            background: linear-gradient(135deg, var(--blue) 0%, var(--blue-dim) 100%);
            color: var(--black);
            font-family: 'Bebas Neue', sans-serif;
            font-size: 16px;
            letter-spacing: 1px;
            padding: 10px 28px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            white-space: nowrap;
          }

          .sticky-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px var(--blue-glow);
          }

          /* Hero */
          .hero {
            position: relative;
            padding: 40px 24px 40px;
            text-align: center;
            max-width: 1000px;
            margin: 0 auto;
          }

          .hero-content {
            max-width: 920px;
            margin: 0 auto;
          }

          .hero::before {
            content: '';
            position: absolute;
            top: -200px;
            left: 50%;
            transform: translateX(-50%);
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, var(--blue-glow) 0%, transparent 70%);
            pointer-events: none;
          }

          .logo-container {
            margin-bottom: 32px;
            display: flex;
            justify-content: center;
          }

          .logo {
            width: auto;
            height: auto;
            filter: drop-shadow(0 4px 12px rgba(0, 217, 255, 0.3));
          }

          .badge {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            border: 1px solid var(--blue-dim);
            color: var(--blue);
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            padding: 10px 24px;
            border-radius: 100px;
            margin-bottom: 28px;
            animation: fadeUp 0.8s ease both;
          }

          .timer-text {
            font-size: 10px;
            font-weight: 500;
            color: var(--white);
            letter-spacing: 0.3px;
            font-family: 'DM Sans', sans-serif;
            text-transform: none;
          }

          .hero h1 {
            font-family: 'Bebas Neue', sans-serif;
            color: var(--white);
            font-size: clamp(36px, 6vw, 64px);
            line-height: 1.05;
            letter-spacing: -0.5px;
            margin-bottom: 10px;
            animation: fadeUp 0.8s ease 0.1s both;
          }

          .hero h1 .blue {
            background: linear-gradient(135deg, var(--blue) 0%, var(--blue-dim) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .hero .sub {
            font-size: clamp(16px, 2vw, 19px);
            color: var(--muted);
            max-width: 620px;
            margin: 20px auto 0;
            line-height: 1.5;
            animation: fadeUp 0.8s ease 0.2s both;
          }

          .hero .sub strong { color: var(--white); font-weight: 600; }

          /* Video + Calendar Section */
          .video-cal-section {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 32px 40px;
            animation: fadeUp 0.8s ease 0.3s both;
          }

          .video-cal-grid {
            display: flex;
            flex-direction: column;
            gap: 28px;
          }

          .video-col {
            min-width: 0;
          }

          .video-wrapper {
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid var(--card-border);
            background: var(--card);
            aspect-ratio: 16/9;
          }

          .video-wrapper wistia-player {
            width: 100%;
            height: 100%;
          }

          .video-note {
            text-align: center;
            margin-top: 16px;
            font-size: 14px;
            color: var(--muted);
          }

          /* Calendar Column */
          .cal-col {
            background: var(--card);
            border: 1px solid var(--card-border);
            border-radius: 14px;
            overflow: hidden;
            position: sticky;
            top: 24px;
          }

          .cal-cta-header {
            padding: 24px 24px 0;
            background: linear-gradient(180deg, rgba(0,217,255,0.06) 0%, transparent 100%);
            border-bottom: 1px solid var(--card-border);
            padding-bottom: 20px;
          }

          .cal-eyebrow {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 2.5px;
            color: var(--blue);
            font-weight: 700;
            margin-bottom: 8px;
          }

          .cal-headline {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 26px;
            color: var(--white);
            line-height: 1.1;
            margin-bottom: 8px;
          }

          .cal-sub {
            font-size: 13px;
            color: var(--muted);
            line-height: 1.6;
            margin-bottom: 12px;
          }

          .cal-bullets {
            list-style: none;
            display: grid;
            gap: 6px;
          }

          .cal-bullets li {
            font-size: 13px;
            color: var(--body);
            padding-left: 20px;
            position: relative;
          }

          .cal-bullets li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--blue);
            font-weight: 700;
          }

          .cal-embed-wrapper {
            background: #111827;
          }

          .cal-iframe {
            width: 100%;
            height: 640px;
            display: block;
            border: none;
          }

          @media (max-width: 900px) {
            .cal-col {
              position: static;
            }

            .cal-iframe {
              height: 660px;
            }
          }

          /* Proof Strip */
          .proof-strip {
            border-top: 1px solid var(--card-border);
            border-bottom: 1px solid var(--card-border);
            padding: 36px 24px;
            display: flex;
            justify-content: center;
            gap: clamp(32px, 6vw, 80px);
            flex-wrap: wrap;
            background: var(--rich-black);
          }

          .proof-item { text-align: center; }

          .proof-number {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(36px, 5vw, 52px);
            background: linear-gradient(135deg, var(--blue) 0%, var(--blue-dim) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1;
          }

          .proof-label {
            font-size: 13px;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-top: 4px;
          }

          /* Section */
          .section {
            max-width: 780px;
            margin: 0 auto;
            padding: 80px 24px;
          }

          .section-label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 3px;
            color: var(--blue);
            font-weight: 700;
            margin-bottom: 16px;
          }

          .section h2 {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(32px, 5vw, 48px);
            color: var(--white);
            line-height: 1.05;
            margin-bottom: 24px;
          }

          .body-text {
            font-size: 16px;
            color: var(--body);
            line-height: 1.75;
            margin-bottom: 16px;
          }

          .body-text strong { color: var(--white); font-weight: 600; }

          /* Results Section */
          .results-section {
            background: var(--rich-black);
            border-top: 1px solid var(--card-border);
            border-bottom: 1px solid var(--card-border);
          }

          .results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 16px;
            margin-top: 36px;
          }

          .result-card {
            background: var(--card);
            border: 1px solid var(--card-border);
            border-radius: 10px;
            padding: 28px;
            text-align: center;
            transition: border-color 0.3s;
          }

          .result-card:hover { border-color: var(--blue-dim); }

          .result-name {
            font-weight: 700;
            color: var(--white);
            font-size: 16px;
            margin-bottom: 12px;
          }

          .result-before-after {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-bottom: 14px;
          }

          .result-val {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 28px;
            line-height: 1;
          }

          .result-val.before { color: var(--muted); }
          .result-val.after {
            background: linear-gradient(135deg, var(--blue) 0%, var(--blue-dim) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .result-arrow { color: var(--green); font-size: 20px; }

          .result-timeline {
            font-size: 13px;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          /* Check List */
          .check-list {
            list-style: none;
            margin-top: 28px;
            display: grid;
            gap: 14px;
          }

          .check-list li {
            padding-left: 32px;
            position: relative;
            font-size: 16px;
            color: var(--body);
          }

          .check-list li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--blue);
            font-weight: 700;
          }

          .x-list li::before {
            content: '✕';
            color: var(--red);
          }

          /* CTA Block */
          .cta-block {
            text-align: center;
            padding: 80px 24px;
            position: relative;
          }

          .cta-block::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 600px;
            height: 400px;
            background: radial-gradient(circle, var(--blue-glow) 0%, transparent 70%);
            pointer-events: none;
          }

          .cta-block h2 {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(36px, 6vw, 56px);
            color: var(--white);
            line-height: 1.05;
            margin-bottom: 16px;
          }

          .cta-block p {
            font-size: 17px;
            color: var(--muted);
            max-width: 560px;
            margin: 0 auto 32px;
          }

          .cta-btn {
            display: inline-block;
            background: linear-gradient(135deg, var(--blue) 0%, var(--blue-dim) 100%);
            color: var(--black);
            font-family: 'Bebas Neue', sans-serif;
            font-size: 22px;
            letter-spacing: 1.5px;
            padding: 18px 52px;
            border-radius: 8px;
            text-decoration: none;
            border: none;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 0 0 0 var(--blue-glow);
            cursor: pointer;
          }

          .cta-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px var(--blue-glow);
          }

          .cta-subtext {
            margin-top: 14px;
            font-size: 13px;
            color: var(--muted);
          }

          /* Mid CTA */
          .mid-cta {
            background: var(--rich-black);
            border-top: 1px solid var(--card-border);
            border-bottom: 1px solid var(--card-border);
          }

          /* Guarantee */
          .guarantee-box {
            max-width: 680px;
            margin: 0 auto;
            background: var(--card);
            border: 1px solid var(--blue-dim);
            border-radius: 12px;
            padding: 40px 36px;
            text-align: center;
          }

          .guarantee-box .shield { font-size: 48px; margin-bottom: 16px; }

          .guarantee-box h3 {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 28px;
            background: linear-gradient(135deg, var(--blue) 0%, var(--blue-dim) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 12px;
          }

          .guarantee-box p {
            font-size: 15px;
            color: var(--body);
            max-width: 520px;
            margin: 0 auto;
            line-height: 1.7;
          }

          /* FAQ */
          .faq-item { border-bottom: 1px solid var(--card-border); padding: 24px 0; }

          .faq-q {
            font-weight: 700;
            color: var(--white);
            font-size: 16px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
          }

          .faq-q::after {
            content: '+';
            font-family: 'Bebas Neue', sans-serif;
            font-size: 24px;
            color: var(--blue);
            flex-shrink: 0;
            transition: transform 0.3s;
          }

          .faq-item.open .faq-q::after { transform: rotate(45deg); }

          .faq-a {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease, padding 0.3s;
            font-size: 15px;
            color: var(--muted);
            line-height: 1.7;
          }

          .faq-item.open .faq-a { max-height: 300px; padding-top: 14px; }

          /* Footer */
          footer {
            text-align: center;
            padding: 40px 24px 80px;
            font-size: 13px;
            color: #555;
            border-top: 1px solid var(--card-border);
          }

          /* Animations */
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.7s ease, transform 0.7s ease;
          }

          .reveal.visible { opacity: 1; transform: translateY(0); }

          /* Mobile */
          @media (max-width: 640px) {
            .hero { padding: 30px 20px 30px; }
            .section { padding: 60px 20px; }
            .guarantee-box { padding: 32px 24px; }
            .proof-strip { gap: 24px; }
            .cta-btn { padding: 16px 36px; font-size: 20px; }
            .sticky-bar { gap: 12px; padding: 12px 16px; }
            .sticky-text { font-size: 13px; text-align: center; }
          }
        `}</style>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      </div>
    </>
  );
}
