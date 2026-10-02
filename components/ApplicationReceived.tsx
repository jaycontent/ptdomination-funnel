"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { useFbTrack } from "@/lib/useFbTrack";
import { Check, MessageSquareText, Instagram } from "lucide-react";
import styles from "./ApplicationReceived.module.css";

// Default is the application thank-you video; the post-booking page passes its own.
const DEFAULT_WISTIA_ID = "edhhehvssc";
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

// The booking variant blends the two: it confirms the call and points at the
// Zoom link, then runs the same two confirmation steps and letter.
const COPY = {
  application: {
    badge: "Application Received",
    headlineLead: "You’re on the list — now ",
    headlineAccent: "2 quick steps",
    headlineTail: " to confirm it.",
    sub: "Complete both to lock in your spot and make sure Brian gets your application.",
    stand: "You’ve just applied, but application does not guarantee entry.",
    confirmLine:
      "DM me “CASH FLOW” on Instagram so that I can confirm that I’ve received your application and be on the lookout for my emails.",
    dmStepDesc:
      "Opens Brian’s Instagram — send him a DM that says “cash flow” to confirm your application.",
  },
  booking: {
    badge: "Call Confirmed",
    headlineLead: "Your call is booked — now ",
    headlineAccent: "2 quick steps",
    headlineTail: " before we talk.",
    sub: "Check your email, we just sent you the Zoom link. Then finish both steps below so Brian knows you’re coming.",
    stand: "You’ve booked your call, but a booked call does not guarantee entry.",
    confirmLine:
      "DM me “CASH FLOW” on Instagram so that I can confirm your call and be on the lookout for my emails.",
    dmStepDesc:
      "Opens Brian’s Instagram — send him a DM that says “cash flow” to confirm your call.",
  },
} as const;

// joinDate is the launch date in the letter; variant switches between the
// application and post-booking copy; pixelEvent lets the booking confirmation
// report a Schedule instead of an application submit.
export default function ApplicationReceived({
  joinDate = "August 07th",
  variant = "application",
  pixelEvent = "SubmitApplication",
  wistiaId = DEFAULT_WISTIA_ID,
}: {
  joinDate?: string;
  variant?: keyof typeof COPY;
  pixelEvent?: string;
  wistiaId?: string;
}) {
  const copy = COPY[variant];
  useFbTrack(pixelEvent);
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
      videoContainerRef.current.innerHTML = `<wistia-player media-id="${wistiaId}" aspect="1.7777777777777777"></wistia-player>`;
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
    <div className={styles.arPage}>
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script
        src={`https://fast.wistia.com/embed/${wistiaId}.js`}
        strategy="afterInteractive"
        type="module"
      />

      <div className={styles.wrap}>
        {/* Header */}
        <div className={styles.badge}>
          <Check size={18} strokeWidth={3} />
          {copy.badge}
        </div>
        <div className={styles.logoRow}>
          <Image src="/ptd-logo-sm.webp" alt="PT Domination" width={150} height={50} className={styles.logo} />
        </div>
        <h1>
          {copy.headlineLead}
          <span className={styles.accent}>{copy.headlineAccent}</span>
          {copy.headlineTail}
        </h1>
        <p className={styles.sub}>
          {copy.sub}
        </p>

        {/* Welcome video */}
        <div className={styles.videoWrapper}>
          <div
            ref={videoContainerRef}
            className={styles.wistiaEmbed}
            style={{
              background:
                "center / contain no-repeat url('https://fast.wistia.com/embed/medias/" +
                wistiaId +
                "/swatch')",
            }}
          />
        </div>

        {/* To-do checklist */}
        <div className={styles.todo}>
          <div className={styles.todoHead}>Your next steps</div>

          {/* Step 1 — SMS */}
          <div className={`${styles.step} ${done[0] ? styles.stepDone : ""}`}>
            <div className={styles.stepCheck} aria-hidden>
              {done[0] ? <Check size={20} strokeWidth={3} /> : <span className={styles.stepNum}>1</span>}
            </div>
            <div className={styles.stepBody}>
              <div className={styles.stepTitle}>
                Text <span className={styles.accent}>“CASH FLOW”</span> to {SMS_NUMBER_DISPLAY}
              </div>
              <p className={styles.stepDesc}>
                Opens a text message with “cash flow” already written — just hit send.
              </p>
              <a className={`${styles.stepBtn} ${styles.sms}`} href={SMS_HREF} onClick={() => complete(0)}>
                <MessageSquareText size={19} />
                Send the text
              </a>
            </div>
          </div>

          {/* Step 2 — Instagram DM */}
          <div className={`${styles.step} ${done[1] ? styles.stepDone : ""}`}>
            <div className={styles.stepCheck} aria-hidden>
              {done[1] ? <Check size={20} strokeWidth={3} /> : <span className={styles.stepNum}>2</span>}
            </div>
            <div className={styles.stepBody}>
              <div className={styles.stepTitle}>
                DM <span className={styles.accent}>“CASH FLOW”</span> to @therealbrianmark on Instagram
              </div>
              <p className={styles.stepDesc}>
                {copy.dmStepDesc}
              </p>
              <a
                className={`${styles.stepBtn} ${styles.ig}`}
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
            <div className={styles.allDone}>
              <Check size={18} strokeWidth={3} /> Nice — both steps done. Keep an eye on your texts &amp; email.
            </div>
          )}
        </div>

        {/* Letter copy */}
        <div className={styles.letter}>
          <p>
            For the first time EVER we are pulling back the curtain on the engine that has generated{" "}
            <strong>$50,000,000 in sales</strong> and over <strong>6 million followers</strong> combined
            across all social media platforms.
          </p>
          <p>
            {copy.stand} We are capping enrollment for a reason — our intention is to ensure that the
            clients that we work with grow on social media, make more money, and have raving things to say
            about us as a result of this experience.
          </p>
          <p>
            Over the course of the next 7 days you will receive 7 text messages and emails.{" "}
            <strong>Read them all.</strong> They will not only give you an insight into how we can help you
            make money from social media, but how our principles will allow you to become a well-known,
            respected, and admired personal brand.
          </p>

          <div className={styles.ifBlock}>
            {IF_LINES.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <p>Then this is the moment that you’ve been waiting for.</p>
          <p>
            Cash Flow Content is the solution that you’ve been waiting for, and we’re excited to invite the
            founding members to join us on <strong>{joinDate}</strong>.
          </p>
          <p className={styles.highlight}>
            {copy.confirmLine}
          </p>
          <p>Talk soon.</p>
          <p className={styles.signature}>— Brian Mark</p>
        </div>
      </div>


    </div>
  );
}
