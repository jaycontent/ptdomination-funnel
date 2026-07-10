"use client";

import { useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "PageView");
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex flex-col items-center">
      <Script id="fb-page-view" strategy="afterInteractive">{`if(typeof fbq === 'function') { fbq('track','PageView'); }`}</Script>
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script src="https://fast.wistia.com/embed/6qxnq8mu9i.js" strategy="afterInteractive" />

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 159, 238, 0.45); }
          50% { box-shadow: 0 0 0 18px rgba(0, 255, 255, 0); }
        }
        .pulse-btn {
          animation: pulse-glow 2.2s infinite;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fade-in-up 0.7s ease both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.25s; }
        .delay-3 { animation-delay: 0.4s; }
        .accent-text {
          background: linear-gradient(90deg, #009fee, #00FFFF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        wistia-player { width: 100%; display: block; }
      `}</style>

      {/* Logo */}
      <div className="w-full flex justify-center pt-10 pb-6 fade-in-up">
        <Image
          src="/ptd-logo-sm.webp"
          alt="PT Domination"
          width={180}
          height={60}
          className="object-contain"
          priority
        />
      </div>

      {/* Headline */}
      <div className="w-full max-w-3xl px-5 text-center fade-in-up delay-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-3">
          How Online Fitness Coaches Are Using AI to Add{" "}
          <span className="accent-text">$1K–$2K/Week</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Free 60-Minute Masterclass — Watch the preview below, then grab your spot at the next live class.
        </p>
      </div>

      {/* VSL */}
      <div
        className="w-full max-w-3xl px-5 mt-8 rounded-2xl overflow-hidden shadow-2xl fade-in-up delay-2"
        style={{ background: "#0d1221" }}
      >
        {/* @ts-ignore */}
        <wistia-player media-id="6qxnq8mu9i" aspect="1.7777777777777777"></wistia-player>
      </div>

      {/* CTA */}
      <div className="w-full max-w-3xl px-5 mt-8 mb-16 text-center fade-in-up delay-3">
        <Link
          href="/livetraining"
          className="pulse-btn inline-flex flex-col items-center justify-center w-full sm:w-auto sm:px-16 py-5 rounded-2xl font-extrabold text-lg sm:text-xl tracking-wide text-black transition-all duration-200 shadow-lg"
          style={{ background: "linear-gradient(90deg, #009fee, #00FFFF)" }}
        >
          <span>Join the Next Live Class</span>
          <span className="text-xs font-normal opacity-75 mt-0.5 tracking-normal">Free 60-Minute Masterclass — Reserve Your Spot</span>
        </Link>
        <p className="text-slate-500 text-xs mt-4">No credit card required. 100% free training.</p>
      </div>
    </div>
  );
}
