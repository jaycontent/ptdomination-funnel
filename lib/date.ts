// Webinar days: 1 = Monday, 4 = Thursday. Time: 4:30 PM PST (UTC-7).
const WEBINAR_DAYS = [1, 4]; // Mon, Thu
const WEBINAR_HOUR_PST = 16;
const WEBINAR_MINUTE_PST = 30;
const WEBINAR_DURATION_MINUTES = 60;
const PST_OFFSET_HOURS = -7;

export interface WebinarDate {
  iso: string;         // Full ISO string with tz offset, for countdown
  utcStart: string;   // UTC ISO for calendar links, e.g. "20260601T233000Z"
  utcEnd: string;     // UTC ISO for calendar end, e.g. "20260602T003000Z"
  utcStartFull: string; // "2026-06-01T23:30:00Z" for Outlook
  utcEndFull: string;   // "2026-06-02T00:30:00Z" for Outlook
  shortDisplay: string; // "Mon Jun 1"
  longDisplay: string;  // "Monday, June 1st"
  dayName: string;      // "Monday" or "Thursday"
}

export function getNextWebinarDate(): WebinarDate {
  const now = new Date();

  // Work in PST by offsetting UTC
  const pstOffset = PST_OFFSET_HOURS * 60; // minutes
  const nowPstMs = now.getTime() + pstOffset * 60 * 1000;
  const nowPst = new Date(nowPstMs);

  // Find the next Mon or Thu that hasn't passed 4:30 PM PST yet
  for (let daysAhead = 0; daysAhead <= 7; daysAhead++) {
    const candidatePstMs = nowPstMs + daysAhead * 24 * 60 * 60 * 1000;
    const candidatePst = new Date(candidatePstMs);
    const dow = candidatePst.getUTCDay(); // 0=Sun in UTC but shifted by PST

    if (!WEBINAR_DAYS.includes(dow)) continue;

    // Build the candidate start time in PST
    const candidateStart = new Date(Date.UTC(
      candidatePst.getUTCFullYear(),
      candidatePst.getUTCMonth(),
      candidatePst.getUTCDate(),
      WEBINAR_HOUR_PST - PST_OFFSET_HOURS, // convert PST hour to UTC
      WEBINAR_MINUTE_PST
    ));

    if (candidateStart.getTime() > now.getTime()) {
      const candidateEnd = new Date(candidateStart.getTime() + WEBINAR_DURATION_MINUTES * 60 * 1000);

      const pstOffsetStr = "-07:00";
      const y = candidatePst.getUTCFullYear();
      const m = String(candidatePst.getUTCMonth() + 1).padStart(2, "0");
      const d = String(candidatePst.getUTCDate()).padStart(2, "0");

      const pad = (n: number) => String(n).padStart(2, "0");
      const fmtCompact = (dt: Date) =>
        `${dt.getUTCFullYear()}${pad(dt.getUTCMonth() + 1)}${pad(dt.getUTCDate())}T${pad(dt.getUTCHours())}${pad(dt.getUTCMinutes())}00Z`;
      const fmtFull = (dt: Date) =>
        `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}T${pad(dt.getUTCHours())}:${pad(dt.getUTCMinutes())}:00Z`;

      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const longMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const dayName = dayNames[dow];
      const shortDay = dayNames[dow].slice(0, 3);
      const dayNum = candidatePst.getUTCDate();
      const suffix = dayNum === 1 || dayNum === 21 || dayNum === 31 ? "st"
        : dayNum === 2 || dayNum === 22 ? "nd"
        : dayNum === 3 || dayNum === 23 ? "rd"
        : "th";

      return {
        iso: `${y}-${m}-${d}T${pad(WEBINAR_HOUR_PST)}:${pad(WEBINAR_MINUTE_PST)}:00${pstOffsetStr}`,
        utcStart: fmtCompact(candidateStart),
        utcEnd: fmtCompact(candidateEnd),
        utcStartFull: fmtFull(candidateStart),
        utcEndFull: fmtFull(candidateEnd),
        shortDisplay: `${shortDay} ${shortMonths[candidatePst.getUTCMonth()]} ${dayNum}`,
        longDisplay: `${dayName}, ${longMonths[candidatePst.getUTCMonth()]} ${dayNum}${suffix}`,
        dayName,
      };
    }
  }

  // Fallback: recurse with a clean slate (should never reach here)
  return getNextWebinarDate();
}

export function formatDateRange(startDate: string, endDate: string, timezone: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: timezone
  });

  const startParts = formatter.formatToParts(start);
  const endParts = formatter.formatToParts(end);

  const startMonth = startParts.find(p => p.type === 'month')?.value;
  const startDay = startParts.find(p => p.type === 'day')?.value;
  const startYear = startParts.find(p => p.type === 'year')?.value;

  const endMonth = endParts.find(p => p.type === 'month')?.value;
  const endDay = endParts.find(p => p.type === 'day')?.value;
  const endYear = endParts.find(p => p.type === 'year')?.value;

  if (startMonth === endMonth && startYear === endYear) {
    return `${startMonth} ${startDay}–${endDay}, ${startYear}`;
  } else if (startYear === endYear) {
    return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${startYear}`;
  } else {
    return `${startMonth} ${startDay}, ${startYear} – ${endMonth} ${endDay}, ${endYear}`;
  }
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function calculateTimeRemaining(targetDate: string): TimeRemaining {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const difference = target - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false
  };
}
