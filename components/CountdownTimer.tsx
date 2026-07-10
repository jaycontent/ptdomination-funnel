"use client";

import { useState, useEffect } from "react";
import { calculateTimeRemaining, TimeRemaining } from "@/lib/date";

interface CountdownTimerProps {
  targetDate: string;
  size?: "default" | "compact";
}

export function CountdownTimer({ targetDate, size = "default" }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const updateTimer = () => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeRemaining.isExpired) {
    return (
      <div className={`text-center ${size === "compact" ? "text-sm" : "text-base"}`}>
        <p className="text-yellow-400 font-medium">
          Early bird ended — standard pricing now active.
        </p>
      </div>
    );
  }

  const isCompact = size === "compact";
  const unitClass = isCompact ? "flex flex-col items-center" : "flex flex-col items-center";
  const numberClass = isCompact
    ? "text-xl md:text-2xl font-bold bg-gradient-to-r from-[#009fee] to-[#00FFFF] bg-clip-text text-transparent"
    : "text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#009fee] to-[#00FFFF] bg-clip-text text-transparent";
  const labelClass = isCompact
    ? "text-[10px] md:text-xs text-gray-400 uppercase tracking-wide mt-0.5"
    : "text-sm md:text-base text-gray-400 uppercase tracking-wide mt-2";

  return (
    <div className={`flex justify-center items-center ${isCompact ? "gap-2 md:gap-3" : "gap-4 md:gap-8"}`}>
      <div className={unitClass}>
        <div className={numberClass}>{String(timeRemaining.days).padStart(2, "0")}</div>
        <div className={labelClass}>Days</div>
      </div>
      <div className={`${isCompact ? "text-xl md:text-2xl" : "text-3xl md:text-5xl"} text-gray-600 font-bold`}>:</div>
      <div className={unitClass}>
        <div className={numberClass}>{String(timeRemaining.hours).padStart(2, "0")}</div>
        <div className={labelClass}>Hours</div>
      </div>
      <div className={`${isCompact ? "text-xl md:text-2xl" : "text-3xl md:text-5xl"} text-gray-600 font-bold`}>:</div>
      <div className={unitClass}>
        <div className={numberClass}>{String(timeRemaining.minutes).padStart(2, "0")}</div>
        <div className={labelClass}>Minutes</div>
      </div>
      <div className={`${isCompact ? "text-xl md:text-2xl" : "text-3xl md:text-5xl"} text-gray-600 font-bold`}>:</div>
      <div className={unitClass}>
        <div className={numberClass}>{String(timeRemaining.seconds).padStart(2, "0")}</div>
        <div className={labelClass}>Seconds</div>
      </div>
    </div>
  );
}
