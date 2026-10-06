import { useEffect, useMemo, useState } from "react";

const TIME_FMT = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

const DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  weekday: "short",
  day: "2-digit",
  month: "short",
});

export type RanchiClock = {
  /** HH:MM:SS in IST */
  time: string;
  /** e.g. "Tue, 06 Oct" in IST */
  date: string;
  /** 0–23 current hour in IST */
  hour: number;
};

/** Live clock pinned to Ranchi (Asia/Kolkata), ticking every second. */
export function useRanchiClock(): RanchiClock {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return useMemo(() => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    }).formatToParts(now);
    const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0") % 24;
    return {
      time: TIME_FMT.format(now),
      date: DATE_FMT.format(now),
      hour,
    };
  }, [now]);
}
