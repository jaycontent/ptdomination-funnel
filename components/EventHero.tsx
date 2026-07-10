"use client";

import { CountdownTimer } from "./CountdownTimer";
import { EventConfig } from "@/lib/event";
import { ArrowDown } from "lucide-react";

interface EventHeroProps {
  config: EventConfig;
  videoEmbedUrl?: string;
}

export function EventHero({ config, videoEmbedUrl }: EventHeroProps) {
  const scrollToTickets = () => {
    const ticketsSection = document.getElementById("tickets");
    if (ticketsSection) {
      ticketsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const autoplayVideoUrl = videoEmbedUrl
    ? `${videoEmbedUrl}${videoEmbedUrl.includes('?') ? '&' : '?'}autoplay=1&muted=1`
    : undefined;

  return (
    <section className="relative w-full bg-gradient-to-b from-black via-gray-900 to-black py-6 md:py-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800/20 via-transparent to-transparent"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 md:space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase mb-1.5 bg-gradient-to-r from-[#009fee] to-[#00FFFF] bg-clip-text text-transparent" style={{ letterSpacing: '0.15em' }}>
              3 Day Live Virtual Challenge for Online Trainers
            </p>

            <p className="text-sm md:text-base font-semibold tracking-wide mb-3 bg-gradient-to-r from-[#009fee] to-[#00FFFF] bg-clip-text text-transparent">
              March 12th – 14th
            </p>

            <div className="mx-auto px-6 md:px-8 mb-3" style={{ maxWidth: '1100px' }}>
              <h1
                className="font-extrabold text-white text-center"
                style={{
                  fontSize: 'clamp(20px, 2.5vw, 36px)',
                  lineHeight: '1.15',
                  letterSpacing: '-0.02em',
                  textShadow: '0 6px 24px rgba(0,0,0,0.35)'
                }}
              >
                Learn the Blueprint to Turn Your Content into a <span className="bg-gradient-to-r from-[#009fee] to-[#00FFFF] bg-clip-text text-transparent">Client Generating Machine</span> Using the Same Systems Our Students Used to hit <span className="text-yellow-400">$50,000 / month</span>
              </h1>
            </div>

            <p
              className="text-gray-300 font-normal max-w-3xl mx-auto"
              style={{
                fontSize: 'clamp(13px, 1.2vw, 16px)',
                lineHeight: '1.4'
              }}
            >
              Without ANY tech experience, funnels or fancy websites…
            </p>
          </div>

          {autoplayVideoUrl && (
            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-950 border border-gray-800">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={autoplayVideoUrl}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Event Video"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-5 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
              <div className="flex-1 w-full md:w-auto text-center">
                <p className="text-xs text-yellow-400 uppercase tracking-wider font-semibold mb-2 md:mb-3">
                  Early Bird Pricing Ends In
                </p>
                <CountdownTimer targetDate={config.earlyBirdEndsAt} size="compact" />
              </div>

              <div className="flex-shrink-0 flex justify-center">
                <button
                  onClick={scrollToTickets}
                  className="group relative inline-flex items-center gap-2 text-black text-base md:text-lg font-bold px-8 md:px-10 py-4 md:py-5 rounded-full transition-all duration-300 shadow-lg hover:scale-105"
                  style={{ background: "linear-gradient(90deg, #009fee, #00FFFF)", boxShadow: "0 0 20px rgba(0,159,238,0.4)" }}
                >
                  Secure Your Spot Now
                  <ArrowDown className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
