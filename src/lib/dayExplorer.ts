/**
 * Pure model for the 24-Hour Day/Night Explorer (see BentoFacts.tsx).
 *
 * Everything in this module is plain data + functions — no React — so the
 * dial's shift schedule, metric interpolation, formatting, and dial geometry
 * can be understood and unit-tested in isolation from the UI.
 */

export type Shift = {
  from: number;
  to: number;
  icon: string;
  name: string;
  vibe: string;
};

/** Shift personality for a given hour of the day. */
export const SHIFTS: Shift[] = [
  { from: 6, to: 12, icon: "☀️", name: "Morning Focus", vibe: "Fresh daylight, natural coffee aroma, crisp focus." },
  { from: 12, to: 18, icon: "⚡", name: "Peak Study Hours", vibe: "Full focus mode, active AC, group discussion pods active." },
  { from: 18, to: 24, icon: "🌙", name: "Evening Deep Work", vibe: "Warm desk lamps on, pin-drop silence, high energy." },
  { from: 0, to: 6, icon: "🦉", name: "Night Owl Shift", vibe: "Ultra-silent graveyard shift, dedicated night security, minimal distractions." },
];

/** Typical occupancy (%) sampled across the day. */
export const OCCUPANCY: [number, number][] = [
  [0, 18], [3, 15], [5, 22], [7, 45], [9, 62], [12, 72], [15, 88], [18, 78], [20, 65], [22, 42], [24, 18],
];

/** Ambient noise (dB) sampled across the day. */
export const NOISE: [number, number][] = [
  [0, 26], [5, 28], [6, 32], [8, 36], [12, 42], [15, 46], [18, 38], [21, 32], [24, 26],
];

/** One-tap hour jumps beneath the dial. */
export const PRESETS: { h: number; label: string }[] = [
  { h: 7, label: "☀️ Early Bird · 7 AM" },
  { h: 15, label: "⚡ Peak Crunch · 3 PM" },
  { h: 0, label: "🌙 Night Owl · 12 AM" },
];

/** Dial geometry in viewBox units (viewBox is 240×240). */
export const DIAL_CENTER = 120;
export const DIAL_RADIUS = 96;

/** "HH:MM" 24-hour clock string → fractional hour ("15:45" → 15.75). */
export function parseClockToHour(time: string): number {
  return Number(time.slice(0, 2)) + Number(time.slice(3, 5)) / 60;
}

/** Piecewise-linear interpolation over ascending [hour, value] samples. */
export function seriesAt(series: [number, number][], h: number): number {
  for (let i = 1; i < series.length; i++) {
    const [h0, v0] = series[i - 1];
    const [h1, v1] = series[i];
    if (h <= h1) {
      const t = h1 === h0 ? 0 : (h - h0) / (h1 - h0);
      return v0 + (v1 - v0) * t;
    }
  }
  return series[series.length - 1][1];
}

/** Typical occupancy (%) at a fractional hour, rounded for display. */
export function occupancyAt(h: number): number {
  return Math.round(seriesAt(OCCUPANCY, h));
}

/** Ambient noise (dB) at a fractional hour, rounded for display. */
export function noiseAt(h: number): number {
  return Math.round(seriesAt(NOISE, h));
}

/** Human label for a rounded dB reading. */
export function noiseLabel(db: number): string {
  if (db <= 30) return "Deep Silence";
  if (db <= 38) return "Gentle White Noise";
  if (db <= 44) return "Lively Murmur";
  return "Full-Swing Hum";
}

/** Noise-bar fill width as a % of the displayed 20–50 dB range. */
export function noiseBarPercent(db: number): number {
  return ((db - 20) / 30) * 100;
}

/** Fractional hour → "3:15 PM"-style 12-hour clock label. */
export function formatHour(h: number): string {
  const mins = Math.round(h * 60) % 1440;
  const hh = Math.floor(mins / 60);
  const mm = mins % 60;
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}:${String(mm).padStart(2, "0")} ${hh < 12 ? "AM" : "PM"}`;
}

/** The shift whose window contains the fractional hour. */
export function shiftFor(h: number): Shift {
  const hh = ((h % 24) + 24) % 24;
  return SHIFTS.find((s) => hh >= s.from && hh < s.to) ?? SHIFTS[SHIFTS.length - 1];
}

/**
 * Position of the dial marker for a fractional hour, in viewBox units.
 * Midnight (0h) sits at the top of the dial; hours run clockwise.
 */
export function markerPosition(hour: number): { x: number; y: number } {
  const angle = (hour / 24) * 2 * Math.PI - Math.PI / 2;
  return {
    x: DIAL_CENTER + DIAL_RADIUS * Math.cos(angle),
    y: DIAL_CENTER + DIAL_RADIUS * Math.sin(angle),
  };
}

/** stroke-dasharray (pathLength 100) for the amber arc covering `hour`. */
export function arcDashArray(hour: number): string {
  return `${((hour / 24) * 100).toFixed(2)} 100`;
}

/**
 * Pointer coordinates (client space) → fractional hour on the dial,
 * clamped to 0–24. `rect` is the SVG element's bounding rect.
 */
export function hourFromClientPoint(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number },
): number {
  const x = ((clientX - rect.left) / rect.width) * 240 - DIAL_CENTER;
  const y = ((clientY - rect.top) / rect.height) * 240 - DIAL_CENTER;
  let f = (Math.atan2(y, x) + Math.PI / 2) / (2 * Math.PI);
  f = ((f % 1) + 1) % 1;
  return Math.min(24, Math.max(0, f * 24));
}

/**
 * Arrow-key scrubbing → the new hour, or null when the key is not a
 * scrub key. Shift steps a full hour; plain arrows step 15 minutes.
 */
export function nextHourOnKey(key: string, coarse: boolean, hour: number): number | null {
  const step = coarse ? 1 : 0.25;
  if (key === "ArrowRight" || key === "ArrowUp") return Math.min(24, hour + step);
  if (key === "ArrowLeft" || key === "ArrowDown") return Math.max(0, hour - step);
  if (key === "Home") return 0;
  if (key === "End") return 24;
  return null;
}

/** The preset (if any) whose hour matches the selected hour. */
export function matchPreset(hour: number): { h: number; label: string } | undefined {
  return PRESETS.find((p) => Math.round(hour) % 24 === p.h);
}
