"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { Check, MessageSquareText, Instagram } from "lucide-react";

const WISTIA_MEDIA_ID = "edhhehvssc";
const SMS_NUMBER_DISPLAY = "+1 (424) 766-4510";
// Cross-platform SMS deep link with a pre-filled body ("cash flow").
const SMS_HREF = "sms:+14247664510?&body=cash%20flow";
const INSTAGRAM_URL = "https://www.instagram.com/therealbrianmark";

const IF_LINES = [
  "If you know that you need social media to grow your business…",
  "If you understand that you need to use AI to make your content creation easier…",
  "If you KNOW that you need to build a personal brand…",
  "And if you’re READY TO LEARN how to turn the attention you get on social media into paying customers…",
];

export default function ApplicationReceivedPage() {
  const [done, setDone] = useState<boolean[]>([false, false]);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const hasLoadedVideo = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cfc_steps_done");
      if (saved) setDone(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    if (videoContainerRef.current && !hasLoadedVideo.current) {
      hasLoadedVideo.current = true;
      videoContainerRef.current.innerHTML = `<wistia-player media-id="${WISTIA_MEDIA_ID}" aspect="1.7777777777777777"></wistia-player>`;
    }
  }, []);

  const complete = (i: number) => {
    setDone((prev) => {
      const next = [...prev];
      next[i] = true;
      try {
        localStorage.setItem("cfc_steps_done", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  return (
    <div className="ar-page">
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script
        src={`https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`}
        strategy="afterInteractive"
        type="module"
      />

      <div className="wrap">
        {/* Header */}
        <div className="badge">
          <Check size={18} strokeWidth={3} />
          Application Received
        </div>
        <div className="logo-row">
          <Image src="/ptd-logo-sm.webp" alt="PT Domination" width={150} height={50} className="logo" />
        </div>
        <h1>
          You’re on the list — now <span className="accent">2 quick steps</span> to confirm it.
        </h1>
        <p className="sub">
          Complete both to lock in your spot and make sure Brian gets your application.
        </p>

        {/* Welcome video */}
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

        {/* To-do checklist */}
        <div className="todo">
          <div className="todo-head">Your next steps</div>

          {/* Step 1 — SMS */}
          <div className={`step ${done[0] ? "step-done" : ""}`}>
            <div className="step-check" aria-hidden>
              {done[0] ? <Check size={20} strokeWidth={3} /> : <span className="step-num">1</span>}
            </div>
            <div className="step-body">
              <div className="step-title">
                Text <span className="accent">“CASH FLOW”</span> to {SMS_NUMBER_DISPLAY}
              </div>
              <p className="step-desc">
                Opens a text message with “cash flow” already written — just hit send.
              </p>
              <a className="step-btn sms" href={SMS_HREF} onClick={() => complete(0)}>
                <MessageSquareText size={19} />
                Send the text
              </a>
            </div>
          </div>

          {/* Step 2 — Instagram DM */}
          <div className={`step ${done[1] ? "step-done" : ""}`}>
            <div className="step-check" aria-hidden>
              {done[1] ? <Check size={20} strokeWidth={3} /> : <span className="step-num">2</span>}
            </div>
            <div className="step-body">
              <div className="step-title">
                DM <span className="accent">“CASH FLOW”</span> to @therealbrianmark on Instagram
              </div>
              <p className="step-desc">
                Opens Brian’s Instagram — send him a DM that says “cash flow” to confirm your application.
              </p>
              <a
                className="step-btn ig"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => complete(1)}
              >
                <Instagram size={19} />
                DM on Instagram
              </a>
            </div>
          </div>

          {done[0] && done[1] && (
            <div className="all-done">
              <Check size={18} strokeWidth={3} /> Nice — both steps done. Keep an eye on your texts &amp; email.
            </div>
          )}
        </div>

        {/* Letter copy */}
        <div className="letter">
          <p>
            For the first time EVER we are pulling back the curtain on the engine that has generated{" "}
            <strong>$50,000,000 in sales</strong> and over <strong>6 million followers</strong> combined
            across all social media platforms.
          </p>
          <p>
            You’ve just applied, but application does not guarantee entry. We are capping enrollment for a
            reason — our intention is to ensure that the clients that we work with grow on social media,
            make more money, and have raving things to say about us as a result of this experience.
          </p>
          <p>
            Over the course of the next 7 days you will receive 7 text messages and emails.{" "}
            <strong>Read them all.</strong> They will not only give you an insight into how we can help you
            make money from social media, but how our principles will allow you to become a well-known,
            respected, and admired personal brand.
          </p>

          <div className="if-block">
            {IF_LINES.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <p>Then this is the moment that you’ve been waiting for.</p>
          <p>
            Cash Flow Content is the solution that you’ve been waiting for, and we’re excited to invite the
            founding members to join us on <strong>August 07th</strong>.
          </p>
          <p className="highlight">
            DM me “CASH FLOW” on Instagram so that I can confirm that I’ve received your application and be
            on the lookout for my emails.
          </p>
          <p>Talk soon.</p>
          <p className="signature">— Brian Mark</p>
        </div>
      </div>

      <style jsx global>{`
        body {
          background: #030712 !important;
        }
        wistia-player {
          width: 100%;
          display: block;
        }
        wistia-player[media-id='${WISTIA_MEDIA_ID}']:not(:defined) {
          background: center / contain no-repeat
            url('https://fast.wistia.com/embed/medias/${WISTIA_MEDIA_ID}/swatch');
          display: block;
          filter: blur(5px);
          padding-top: 56.25%;
        }
      `}</style>

      <style jsx>{`
        .ar-page {
          --black: #030712;
          --card: #111827;
          --card-border: #1f2937;
          --blue: #00d9ff;
          --blue-dim: #0088ff;
          --white: #f5f2ed;
          --muted: #9ca3af;
          --body: #d1d5db;
          --green: #22c55e;
          background: var(--black);
          color: var(--body);
          min-height: 100vh;
          line-height: 1.7;
          padding: 48px 20px 72px;
        }
        .wrap {
          max-width: 680px;
          margin: 0 auto;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.45);
          color: #4ade80;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 8px 16px;
          border-radius: 999px;
          letter-spacing: 0.02em;
        }
        .logo-row {
          margin: 26px 0 18px;
        }
        .logo {
          height: auto;
        }
        h1 {
          color: var(--white);
          font-weight: 800;
          font-size: clamp(1.7rem, 4.6vw, 2.5rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 14px;
        }
        .accent {
          background: linear-gradient(135deg, var(--blue) 0%, var(--blue-dim) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .sub {
          color: var(--muted);
          font-size: 1.1rem;
          margin-bottom: 30px;
        }

        /* Video */
        .video-wrapper {
          margin: 0 auto 34px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--card-border);
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 217, 255, 0.08);
          background: #0a1120;
        }
        .wistia-embed {
          width: 100%;
          aspect-ratio: 16 / 9;
        }

        /* To-do */
        .todo {
          background: var(--card);
          border: 1px solid var(--card-border);
          border-radius: 18px;
          padding: 26px 22px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
        }
        .todo-head {
          color: var(--blue);
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-size: 0.78rem;
          margin-bottom: 20px;
        }
        .step {
          display: flex;
          gap: 16px;
          padding: 18px 0;
          border-top: 1px solid var(--card-border);
          transition: opacity 0.3s ease;
        }
        .step:first-of-type {
          border-top: none;
          padding-top: 0;
        }
        .step-check {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 217, 255, 0.1);
          border: 1.5px solid rgba(0, 217, 255, 0.5);
          color: var(--blue);
          font-weight: 800;
          transition: all 0.3s ease;
        }
        .step-num {
          font-size: 1.1rem;
        }
        .step-done .step-check {
          background: rgba(34, 197, 94, 0.15);
          border-color: var(--green);
          color: #4ade80;
        }
        .step-body {
          flex: 1;
          min-width: 0;
        }
        .step-title {
          color: var(--white);
          font-weight: 700;
          font-size: 1.12rem;
          margin-bottom: 6px;
        }
        .step-desc {
          color: var(--muted);
          font-size: 0.96rem;
          margin-bottom: 14px;
        }
        .step-done .step-title {
          text-decoration: line-through;
          text-decoration-color: rgba(156, 163, 175, 0.6);
          color: var(--muted);
        }
        .step-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-weight: 800;
          font-size: 1rem;
          padding: 13px 26px;
          border-radius: 999px;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }
        .step-btn.sms {
          background: linear-gradient(135deg, var(--blue) 0%, var(--blue-dim) 100%);
          color: #041016;
          box-shadow: 0 10px 26px rgba(0, 217, 255, 0.28);
        }
        .step-btn.ig {
          background: linear-gradient(135deg, #f9ce34 0%, #ee2a7b 45%, #6228d7 100%);
          color: #fff;
          box-shadow: 0 10px 26px rgba(238, 42, 123, 0.32);
        }
        .step-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.05);
        }
        .all-done {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          padding: 14px 18px;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.4);
          border-radius: 12px;
          color: #4ade80;
          font-weight: 600;
          font-size: 0.95rem;
        }

        /* Letter */
        .letter {
          margin-top: 46px;
          font-size: 1.1rem;
        }
        .letter p {
          margin-bottom: 20px;
          color: var(--body);
        }
        .letter strong {
          color: var(--white);
        }
        .if-block {
          border-left: 3px solid var(--blue);
          padding: 6px 0 6px 22px;
          margin: 28px 0;
        }
        .if-block p {
          color: var(--white);
          margin-bottom: 14px;
        }
        .if-block p:last-child {
          margin-bottom: 0;
        }
        .highlight {
          background: linear-gradient(180deg, rgba(0, 217, 255, 0.08) 0%, transparent 100%);
          border: 1px solid var(--card-border);
          border-radius: 14px;
          padding: 20px 22px;
          color: var(--white) !important;
          font-weight: 600;
        }
        .signature {
          color: var(--white);
          font-weight: 700;
          font-size: 1.15rem;
          margin-top: 4px;
        }

        @media (max-width: 520px) {
          .step-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
