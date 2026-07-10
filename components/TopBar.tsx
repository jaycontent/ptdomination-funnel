"use client";

import { useState, useEffect } from "react";
import { calculateTimeRemaining } from "@/lib/date";

interface TopBarProps {
  eventDate: string;
}

export function TopBar({ eventDate }: TopBarProps) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

  useEffect(() => {
    const update = () => setTime(calculateTimeRemaining(eventDate));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [eventDate]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className="w-full text-black text-center py-2 px-4 text-xs font-semibold tracking-wide flex items-center justify-center gap-2 sm:gap-3"
      style={{ background: "linear-gradient(90deg, #009fee, #00FFFF)" }}
    >
      {time.isExpired ? (
        <span className="font-bold uppercase">Live Training Has Started — Join Now</span>
      ) : (
        <>
          <span className="uppercase tracking-wider font-bold hidden sm:inline">Live Class Starts In:</span>
          <span className="uppercase tracking-wider font-bold sm:hidden">Starts In:</span>
          <span className="inline-flex items-center gap-1 font-mono font-bold text-sm">
            <span>{pad(time.days)}<span className="text-[10px] font-semibold ml-0.5 opacity-80">d</span></span>
            <span className="opacity-60">:</span>
            <span>{pad(time.hours)}<span className="text-[10px] font-semibold ml-0.5 opacity-80">h</span></span>
            <span className="opacity-60">:</span>
            <span>{pad(time.minutes)}<span className="text-[10px] font-semibold ml-0.5 opacity-80">m</span></span>
            <span className="opacity-60">:</span>
            <span>{pad(time.seconds)}<span className="text-[10px] font-semibold ml-0.5 opacity-80">s</span></span>
          </span>
        </>
      )}
    </div>
  );
}
