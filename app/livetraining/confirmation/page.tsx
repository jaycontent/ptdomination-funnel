"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getNextWebinarDate } from "@/lib/date";

const INSTAGRAM_DM_URL = "https://www.instagram.com/therealbrianmark/";

const ZOOM_LINK = "https://us02web.zoom.us/j/5173145585";
const CAL_DETAILS = `Join+Zoom+Meeting%3A+${encodeURIComponent(ZOOM_LINK)}%0A%0AHow+Online+Fitness+Coaches+Are+Using+AI+to+Add+%241K%E2%80%932K%2FWeek`;

const webinar = getNextWebinarDate();

const GOOGLE_CAL_URL =
  `https://www.google.com/calendar/render?action=TEMPLATE&text=Free+AI+Masterclass+for+Fitness+Coaches&dates=${webinar.utcStart}/${webinar.utcEnd}&details=${CAL_DETAILS}&location=${encodeURIComponent(ZOOM_LINK)}`;

const APPLE_CAL_URL = "/api/calendar";

const OUTLOOK_CAL_URL =
  `https://outlook.live.com/calendar/0/deeplink/compose?subject=Free+AI+Masterclass+for+Fitness+Coaches&startdt=${webinar.utcStartFull}&enddt=${webinar.utcEndFull}&body=Join+Zoom%3A+${encodeURIComponent(ZOOM_LINK)}&location=${encodeURIComponent(ZOOM_LINK)}`;

function CalendarButtons({ onAdd, size = "default" }: { onAdd: () => void; size?: "default" | "large" }) {
  const btnClass = size === "large"
    ? "flex items-center justify-center gap-2.5 font-bold text-sm sm:text-base px-5 py-3.5 rounded-xl border transition-all duration-200 cursor-pointer"
    : "cal-btn";

  const largeStyle = {
    background: "rgba(0,159,238,0.12)",
    border: "1px solid rgba(0,159,238,0.5)",
    color: "#fff",
  };

  const largeHover = "hover:bg-[rgba(0,159,238,0.22)] hover:border-[rgba(0,159,238,0.9)]";

  if (size === "large") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
        <a
          href={GOOGLE_CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onAdd}
          className={`${btnClass} ${largeHover}`}
          style={largeStyle}
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          Google Calendar
        </a>
        <a
          href={APPLE_CAL_URL}
          onClick={onAdd}
          className={`${btnClass} ${largeHover}`}
          style={largeStyle}
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          Apple Calendar
        </a>
        <a
          href={OUTLOOK_CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onAdd}
          className={`${btnClass} ${largeHover}`}
          style={largeStyle}
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          Outlook
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <a href={GOOGLE_CAL_URL} target="_blank" rel="noopener noreferrer" onClick={onAdd} className={btnClass}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        Add to Google Calendar
      </a>
      <a href={APPLE_CAL_URL} onClick={onAdd} className={btnClass}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        Add to Apple Calendar
      </a>
      <a href={OUTLOOK_CAL_URL} target="_blank" rel="noopener noreferrer" onClick={onAdd} className={btnClass}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        Add to Outlook
      </a>
    </div>
  );
}

export default function ConfirmationPage() {
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "CompleteRegistration");
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  function handleCalendarAdd() {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 4000);
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-sans">
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script src="https://fast.wistia.com/embed/a5356enkcj.js" strategy="afterInteractive" type="module" />
      <Script src="//embed.typeform.com/next/embed.js" strategy="afterInteractive" />

      {/* Toast */}
      <div
        className="fixed bottom-6 left-1/2 z-50 transition-all duration-500 pointer-events-none"
        style={{
          transform: toastVisible ? "translate(-50%, 0)" : "translate(-50%, 20px)",
          opacity: toastVisible ? 1 : 0,
        }}
      >
        <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-semibold text-black"
          style={{ background: "linear-gradient(90deg, #009fee, #00FFFF)", minWidth: 280 }}>
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Link saved to your calendar — you&apos;re all set for {webinar.dayName}.
        </div>
      </div>

      {/* Confirmation Banner */}
      <div className="w-full text-black text-center py-3 px-4 font-semibold flex items-center justify-center gap-2 fade-in-up"
        style={{ background: "linear-gradient(90deg, #009fee, #00FFFF)" }}>
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-sm font-bold tracking-wide uppercase">You&apos;re registered — watch the video, then grab your join link.</span>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-12">

        {/* Hero confirmation */}
        <section className="text-center mb-10 fade-in-up delay-1">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: "linear-gradient(135deg, #009fee, #00FFFF)" }}>
            <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
            Watch This Video to Get Ahead of the Live Class
          </h1>
        </section>

        {/* Video — Watch before the live class */}
        <section className="mb-12 fade-in-up delay-2">
          <p className="text-center text-slate-400 text-sm mb-5 italic">
            Watch this 2-min video — I&apos;m picking 5 attendees live for profile audits. If you&apos;re there, you&apos;re eligible. If you&apos;re not, you&apos;re not.
          </p>
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl" style={{ background: "#0d1221" }}>
            {/* @ts-ignore */}
            <wistia-player media-id="a5356enkcj" aspect="1.7777777777777777"></wistia-player>
          </div>
        </section>

        {/* Step 1 — Calendar CTA */}
        <section className="mb-12 fade-in-up delay-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-extrabold text-black text-sm"
              style={{ background: "linear-gradient(135deg, #009fee, #00FFFF)" }}>1</div>
            <h2 className="text-2xl font-extrabold">Grab Your Join Link:</h2>
          </div>
          <p className="text-slate-300 text-base leading-relaxed mb-6">
            Your unique join link is delivered inside the calendar invite — that&apos;s how you&apos;ll get into the masterclass on {webinar.dayName}. One click from your calendar at 4:30 PM PST and you&apos;re in.
          </p>

          {/* Primary glowing calendar CTA box — wider on desktop */}
          <div className="rounded-2xl p-6 mb-4 sm:-mx-16 lg:-mx-24"
            style={{
              background: "linear-gradient(135deg, rgba(0,159,238,0.12), rgba(0,255,255,0.06))",
              border: "1.5px solid rgba(0,159,238,0.5)",
              boxShadow: "0 0 40px rgba(0,159,238,0.15)",
            }}>
            {/* Date + link prompt above buttons */}
            <div className="flex flex-col items-center gap-1 mb-5">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" style={{ color: "#009fee" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <span className="text-white font-bold text-sm">{webinar.longDisplay} at 4:30 PM PST</span>
              </div>
              <p className="text-xs" style={{ color: "#009fee" }}>
                Your join link will be inside your calendar invite
              </p>
            </div>
            <CalendarButtons onAdd={handleCalendarAdd} size="large" />
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#009fee" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Join link included
              </span>
            </div>
          </div>
        </section>

        {/* Typeform — IG Content Audit */}
        <section className="mb-12 fade-in-up delay-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-extrabold text-black text-sm"
              style={{ background: "linear-gradient(135deg, #009fee, #00FFFF)" }}>2</div>
            <h2 className="text-2xl font-extrabold">Fill This Out to Get Your IG Content Audited Live</h2>
          </div>
          <p className="text-slate-300 text-base leading-relaxed mb-5">
            Submit your info below and you&apos;ll be eligible for a live IG content audit during the masterclass. Only attendees who fill this out qualify — don&apos;t skip it.
          </p>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: "1.5px solid rgba(0,159,238,0.4)",
              background: "rgba(0,159,238,0.05)",
            }}
          >
            <div data-tf-live="01KWCJPE0PTVRET73JVS3MRYCX" style={{ width: "100%" }}></div>
          </div>
        </section>

        {/* Step 3 — Pre-Masterclass Training */}
        <section className="mb-14 fade-in-up delay-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-extrabold text-black text-sm"
              style={{ background: "linear-gradient(135deg, #009fee, #00FFFF)" }}>3</div>
            <h2 className="text-2xl font-extrabold">Now Grab Your Pre-Masterclass Training</h2>
          </div>
          <p className="text-slate-300 text-base leading-relaxed mb-6">
            You&apos;re on the calendar — now get ahead. I recorded a training on using AI to make more money with your coaching right now. DM me the word <span className="text-white font-bold">BOOKED</span> on Instagram and I&apos;ll send it to you free so you hit the ground running on {webinar.dayName}.
          </p>
          <a
            href={INSTAGRAM_DM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-bold text-base px-8 py-4 rounded-xl tracking-wide w-full text-center transition-all duration-200 border"
            style={{
              background: "rgba(0,159,238,0.1)",
              borderColor: "rgba(0,159,238,0.4)",
              color: "#fff",
            }}
          >
            Send Me &apos;BOOKED&apos; on Instagram →
          </a>
        </section>

        {/* What to Expect */}
        <section className="mb-14 fade-in-up delay-5">
          <h2 className="text-2xl font-extrabold mb-6">What to Expect at the Masterclass</h2>
          <ul className="space-y-4">
            {[
              "How to use AI to write content that converts — not generic ChatGPT slop",
              "The personal branding system my clients use to get consistent inbound leads",
              "How to turn followers into booked high-ticket sales calls",
              "LIVE audit — I'll pull up 5 attendees' profiles live. If you're there, you're eligible. If you're not, you're not.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: "linear-gradient(135deg, #009fee, #00FFFF)" }}>
                  <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-slate-200 text-base leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Social Proof */}
        <section className="mb-14 rounded-2xl p-7 fade-in-up" style={{ background: "#0d1221", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed italic border-l-4 pl-5"
            style={{ borderColor: "#009fee" }}>
            &ldquo;One coaching call changed one thing for my client Sammy. 3 days later — 2 inbound applications and <span className="text-white font-bold">$13.7K in the first 5 days of the month.</span> I&apos;m giving you the same frameworks in this free masterclass.&rdquo;
          </p>
          <p className="text-slate-400 text-sm mt-4 pl-5 font-semibold">— Brian Mark, PT Domination</p>
        </section>

        {/* Bonuses */}
        <section className="mb-14 fade-in-up">
          <h2 className="text-2xl font-extrabold mb-1">
            Just for Showing Up Live, You&apos;ll Also Get:
          </h2>
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-6">$500+ in bonuses — live attendees only</p>
          <div className="space-y-4">
            {[
              {
                label: "BONUS 1",
                title: "Full Masterclass Slide Deck",
                value: "$197 value",
                desc: "The complete reference deck from this training so you can revisit every framework and strategy at any time.",
              },
              {
                label: "BONUS 2",
                title: "90-Minute DM Sales Training",
                value: "$297 value",
                desc: "Recorded live at a private event — the exact DM framework our top coaches use to close high-ticket clients without feeling pushy.",
              },
            ].map((bonus, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl p-5 accent-border border">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border accent-border">
                  <span className="accent-text font-extrabold text-xs">{bonus.label.split(" ")[1]}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs accent-text font-semibold uppercase tracking-widest">{bonus.label}</p>
                    <span className="text-xs text-slate-500">· {bonus.value}</span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-1">{bonus.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{bonus.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-xs text-center mt-4 italic">These are only available to live attendees. Miss it, lose it.</p>
        </section>

        {/* Final CTA */}
        <section className="text-center border-t border-white/10 pt-12 pb-8 fade-in-up">
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
            The masterclass is <span className="text-white font-bold">free</span>. The frameworks are <span className="text-white font-bold">proven</span>. But none of it works if you don&apos;t show up.
          </p>
          <div className="rounded-2xl p-5 mb-4"
            style={{
              background: "linear-gradient(135deg, rgba(0,159,238,0.12), rgba(0,255,255,0.06))",
              border: "1.5px solid rgba(0,159,238,0.5)",
              boxShadow: "0 0 40px rgba(0,159,238,0.15)",
            }}>
            <CalendarButtons onAdd={handleCalendarAdd} size="large" />
          </div>
          <a
            href={INSTAGRAM_DM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 border mt-2"
            style={{
              background: "rgba(0,159,238,0.08)",
              borderColor: "rgba(0,159,238,0.3)",
              color: "#94a3b8",
            }}
          >
            Or DM &apos;BOOKED&apos; on Instagram for your prep training →
          </a>
        </section>

      </div>
    </div>
  );
}
