import { describe, expect, test } from "bun:test";

import {
  arcDashArray,
  formatHour,
  hourFromClientPoint,
  markerPosition,
  matchPreset,
  nextHourOnKey,
  noiseAt,
  noiseBarPercent,
  noiseLabel,
  occupancyAt,
  parseClockToHour,
  seriesAt,
  shiftFor,
} from "./dayExplorer";

/**
 * Regression suite for the Day/Night Explorer model. These are the same
 * parity assertions used to verify the refactor that extracted the model
 * out of BentoFacts.tsx — they pin the exact values the shipped UI renders.
 */

describe("seriesAt", () => {
  test("interpolates between samples", () => {
    expect(+seriesAt([[0, 18], [3, 15]], 1.5).toFixed(4)).toBe(16.5);
  });

  test("returns the last value beyond the final sample", () => {
    expect(seriesAt([[0, 18], [3, 15]], 5)).toBe(15);
  });
});

describe("occupancy", () => {
  test("peaks mid-afternoon (3 PM = 88%)", () => {
    expect(occupancyAt(15)).toBe(88);
  });

  test("interpolates the early-morning ramp (4 AM = 19%)", () => {
    expect(occupancyAt(4)).toBe(19);
  });
});

describe("noise", () => {
  test("peaks mid-afternoon (3 PM = 46 dB)", () => {
    expect(noiseAt(15)).toBe(46);
  });

  test("is quietest at midnight (26 dB)", () => {
    expect(noiseAt(0)).toBe(26);
  });

  test("labels match the shipped readouts", () => {
    expect(noiseLabel(28)).toBe("Deep Silence");
    expect(noiseLabel(38)).toBe("Gentle White Noise");
    expect(noiseLabel(42)).toBe("Lively Murmur");
    expect(noiseLabel(46)).toBe("Full-Swing Hum");
  });
});

describe("formatHour", () => {
  test("formats the preset and shift-boundary hours", () => {
    expect(formatHour(7)).toBe("7:00 AM");
    expect(formatHour(15.5)).toBe("3:30 PM");
    expect(formatHour(15)).toBe("3:00 PM");
    expect(formatHour(12)).toBe("12:00 PM");
  });

  test("wraps midnight correctly", () => {
    expect(formatHour(0)).toBe("12:00 AM");
    expect(formatHour(24)).toBe("12:00 AM");
  });
});

describe("shiftFor", () => {
  test("returns the shift whose window contains the hour", () => {
    expect(shiftFor(7).name).toBe("Morning Focus");
    expect(shiftFor(15).name).toBe("Peak Study Hours");
    expect(shiftFor(20).name).toBe("Evening Deep Work");
    expect(shiftFor(3).name).toBe("Night Owl Shift");
  });

  test("falls back to the Night Owl shift at the 24h edge", () => {
    expect(shiftFor(24).name).toBe("Night Owl Shift");
  });
});

describe("markerPosition", () => {
  test("places midnight at the top of the dial", () => {
    expect(markerPosition(0)).toEqual({ x: 120, y: 24 });
  });

  test("runs clockwise through the day", () => {
    expect(markerPosition(6)).toEqual({ x: 216, y: 120 });
    expect(markerPosition(12)).toEqual({ x: 120, y: 216 });
    expect(+markerPosition(18).x.toFixed(6)).toBe(24);
    expect(+markerPosition(18).y.toFixed(6)).toBe(120);
  });
});

describe("arcDashArray", () => {
  test("covers a quarter of the track at 6h", () => {
    expect(arcDashArray(6)).toBe("25.00 100");
  });
});

describe("hourFromClientPoint", () => {
  const rect = { left: 0, top: 0, width: 240, height: 240 };

  test("maps the compass points to clock hours", () => {
    expect(hourFromClientPoint(120, 4, rect)).toBe(0);
    expect(+hourFromClientPoint(236, 120, rect).toFixed(4)).toBe(6);
    expect(+hourFromClientPoint(120, 236, rect).toFixed(4)).toBe(12);
    expect(+hourFromClientPoint(4, 120, rect).toFixed(4)).toBe(18);
  });
});

describe("nextHourOnKey", () => {
  test("steps 15 minutes with plain arrows", () => {
    expect(nextHourOnKey("ArrowRight", false, 7)).toBe(7.25);
  });

  test("steps a full hour with Shift", () => {
    expect(nextHourOnKey("ArrowRight", true, 7)).toBe(8);
  });

  test("clamps at the 0h edge", () => {
    expect(nextHourOnKey("ArrowLeft", false, 0.1)).toBe(0);
  });

  test("Home and End jump to the boundaries", () => {
    expect(nextHourOnKey("Home", false, 5)).toBe(0);
    expect(nextHourOnKey("End", false, 5)).toBe(24);
  });

  test("ignores non-scrub keys", () => {
    expect(nextHourOnKey("Enter", false, 5)).toBeNull();
  });
});

describe("parseClockToHour", () => {
  test('parses a 24-hour "HH:MM" clock string', () => {
    expect(parseClockToHour("15:45")).toBe(15.75);
  });
});

describe("matchPreset", () => {
  test("matches the selected hour to a preset", () => {
    expect(matchPreset(15)?.h).toBe(15);
  });

  test("returns undefined for non-preset hours", () => {
    expect(matchPreset(9)).toBeUndefined();
  });
});

describe("noiseBarPercent", () => {
  test("scales dB onto the 20–50 display range", () => {
    expect(+noiseBarPercent(35).toFixed(4)).toBe(50);
  });
});
