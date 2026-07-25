"use client";

import { useEffect, useState } from "react";

const ADELAIDE_TIME_ZONE = "Australia/Adelaide";
const weekdayNumbers: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function getAdelaideParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: ADELAIDE_TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    weekday: weekdayNumbers[values.weekday] ?? 0,
  };
}

function getAdelaideOffset(date: Date) {
  const offset =
    new Intl.DateTimeFormat("en-AU", {
      timeZone: ADELAIDE_TIME_ZONE,
      timeZoneName: "longOffset",
    })
      .formatToParts(date)
      .find((part) => part.type === "timeZoneName")?.value ?? "GMT+09:30";
  const match = offset.match(/GMT([+-])(\d{2}):(\d{2})/);

  if (!match) return 9.5 * 60 * 60 * 1_000;

  const direction = match[1] === "-" ? -1 : 1;
  return (
    direction *
    (Number(match[2]) * 60 + Number(match[3])) *
    60 *
    1_000
  );
}

function getNextSundayNight(now: Date) {
  const adelaide = getAdelaideParts(now);
  const daysUntilSunday = (7 - adelaide.weekday) % 7;
  const localTarget = Date.UTC(
    adelaide.year,
    adelaide.month - 1,
    adelaide.day + daysUntilSunday,
    23,
    59,
    59,
    999,
  );
  let target = localTarget - getAdelaideOffset(new Date(localTarget));

  target = localTarget - getAdelaideOffset(new Date(target));
  return target;
}

function getTimeRemaining() {
  const now = new Date();
  const difference = Math.max(0, getNextSundayNight(now) - now.getTime());

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
    urgent: difference <= 48 * 60 * 60 * 1_000,
  };
}

export function OfferCountdown() {
  const [remaining, setRemaining] = useState<ReturnType<
    typeof getTimeRemaining
  > | null>(null);

  useEffect(() => {
    const updateCountdown = () => setRemaining(getTimeRemaining());

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1_000);

    return () => window.clearInterval(timer);
  }, []);

  if (!remaining) {
    return <div className="h-[3.75rem]" aria-hidden="true" />;
  }

  const units = [
    ["day", "days", remaining.days],
    ["hour", "hours", remaining.hours],
    ["min", "mins", remaining.minutes],
    ["sec", "secs", remaining.seconds],
  ] as const;

  return (
    <div>
      <p className="mb-2 text-xs font-bold text-slate-400">
        Ends Sunday, 11:59 pm Adelaide time
      </p>
      {remaining.urgent && (
        <p className="mb-2 text-xs font-black uppercase tracking-[0.12em] text-orange-300">
          Act fast—offer ends soon
        </p>
      )}
      <div
        className="flex flex-wrap gap-2"
        role="timer"
        aria-label={`${remaining.days} ${remaining.days === 1 ? "day" : "days"}, ${remaining.hours} ${remaining.hours === 1 ? "hour" : "hours"}, ${remaining.minutes} ${remaining.minutes === 1 ? "minute" : "minutes"}, and ${remaining.seconds} ${remaining.seconds === 1 ? "second" : "seconds"} remaining`}
      >
        {units.map(([singular, plural, value]) => (
          <div
            key={singular}
            className={`min-w-[3.5rem] rounded-xl px-2.5 py-2 text-center backdrop-blur ${
              remaining.urgent
                ? "border border-orange-300/30 bg-gradient-to-br from-orange-500 to-rose-500 shadow-lg shadow-orange-500/15"
                : "border border-white/10 bg-white/[0.07]"
            }`}
          >
            <span className="block font-mono text-lg font-black leading-none text-white">
              {String(value).padStart(2, "0")}
            </span>
            <span
              className={`mt-1 block text-[0.58rem] font-black uppercase tracking-[0.12em] ${
                remaining.urgent ? "text-white/80" : "text-slate-400"
              }`}
            >
              {value === 1 ? singular : plural}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
