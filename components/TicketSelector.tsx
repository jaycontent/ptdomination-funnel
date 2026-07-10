"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Sparkles, ExternalLink } from "lucide-react";
import { EventConfig } from "@/lib/event";

interface TicketSelectorProps {
  tickets: EventConfig["tickets"];
}

export function TicketSelector({ tickets }: TicketSelectorProps) {
  const [selectedTicket, setSelectedTicket] = useState<"ga" | "vip">("vip");

  const currentTicket = selectedTicket === "ga" ? tickets.ga : tickets.vip;
  const isVIP = selectedTicket === "vip";

  return (
    <section id="tickets" className="w-full bg-gradient-to-b from-black via-gray-900 to-black py-6 md:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4 md:mb-6">
          <div className="inline-flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-xs uppercase tracking-wider text-yellow-400 font-semibold">
              Limited Time Offer
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
            Choose Your Experience
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            Select the ticket that best fits your goals and budget
          </p>
        </div>

        <div className="flex justify-center mb-4 md:mb-6">
          <div className="inline-flex items-center bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full p-1">
            <button
              onClick={() => setSelectedTicket("ga")}
              className={`px-4 md:px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedTicket === "ga"
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              General Admission
            </button>
            <button
              onClick={() => setSelectedTicket("vip")}
              className={`px-4 md:px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedTicket === "vip"
                  ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              VIP All-Access
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div
            className="relative bg-gradient-to-br from-gray-800 to-gray-900 border-2 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300"
            style={{
              borderColor: isVIP ? "#eab308" : "#3b82f6",
              boxShadow: isVIP
                ? "0 25px 50px -12px rgba(234, 179, 8, 0.25)"
                : "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
            }}
          >
            {isVIP && tickets.vip.badge && (
              <div className="absolute top-3 right-3 bg-yellow-500 text-black text-xs font-bold px-2.5 py-1 rounded-full shadow-lg z-10">
                {tickets.vip.badge}
              </div>
            )}

            <div className="relative w-full aspect-[16/6] overflow-hidden bg-gray-950">
              <Image
                src={currentTicket.image}
                alt={currentTicket.name}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                {currentTicket.name}
              </h3>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl md:text-4xl font-bold text-white">
                  ${currentTicket.price}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${currentTicket.compareAtPrice.toFixed(2)}
                </span>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: isVIP ? "#eab30820" : "#3b82f620",
                    color: isVIP ? "#eab308" : "#3b82f6"
                  }}
                >
                  Save ${(currentTicket.compareAtPrice - currentTicket.price).toFixed(0)}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {currentTicket.inclusions.map((inclusion, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div
                      className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5"
                      style={{
                        backgroundColor: isVIP ? "#eab30820" : "#3b82f620"
                      }}
                    >
                      <Check
                        className="w-3 h-3"
                        style={{
                          color: isVIP ? "#eab308" : "#3b82f6"
                        }}
                      />
                    </div>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                      {inclusion}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href={currentTicket.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full inline-flex items-center justify-center gap-2 text-sm md:text-base font-bold py-3 md:py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                style={{
                  backgroundColor: isVIP ? "#eab308" : "#3b82f6",
                  color: isVIP ? "#000000" : "#ffffff"
                }}
              >
                Get {currentTicket.name} Ticket
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <p className="text-center text-xs text-gray-400 mt-3">
                Secure checkout powered by trusted payment processing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
