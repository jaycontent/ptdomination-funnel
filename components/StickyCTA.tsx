"use client";

import { useEffect, useState } from "react";
import { CountdownTimer } from "./CountdownTimer";
import { ArrowUp } from "lucide-react";

interface StickyCTAProps {
  earlyBirdEndsAt: string;
}

export function StickyCTA({ earlyBirdEndsAt }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTickets = () => {
    const ticketsSection = document.getElementById("tickets");
    if (ticketsSection) {
      ticketsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-black/95 backdrop-blur-lg border-t border-gray-800 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full md:w-auto">
              <div className="text-center md:text-left mb-2 md:mb-0">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">
                  Early Bird Ends In
                </p>
              </div>
              <div className="scale-75 md:scale-90 origin-center md:origin-left">
                <CountdownTimer targetDate={earlyBirdEndsAt} size="compact" />
              </div>
            </div>

            <button
              onClick={scrollToTickets}
              className="group flex items-center gap-2 text-black font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 whitespace-nowrap"
              style={{ background: "linear-gradient(90deg, #009fee, #00FFFF)", boxShadow: "0 0 20px rgba(0,159,238,0.4)" }}
            >
              Get Your Ticket
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
