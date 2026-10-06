import { useRanchiClock } from "../hooks/useRanchiClock";
import "./TimeAura.css";

/**
 * Phase palettes — the hero "sky" shifts with the real hour in Ranchi:
 * deep purples at midnight, cool steel blues by day, warm ambers at evening.
 */
const PHASES: { key: string; hours: number[]; blobs: [string, string, string] }[] = [
  { key: "deep-night", hours: [23, 0, 1, 2, 3, 4], blobs: ["#1c1233", "#0d1030", "#2a1a45"] },
  { key: "dawn", hours: [5, 6, 7], blobs: ["#12304f", "#2b2c5e", "#4a2a4e"] },
  { key: "day", hours: [8, 9, 10, 11, 12, 13, 14, 15, 16], blobs: ["#0e2433", "#13324c", "#1b3a4e"] },
  { key: "evening", hours: [17, 18, 19, 20], blobs: ["#3a2412", "#4a2c14", "#6b3a12"] },
  { key: "night", hours: [21, 22], blobs: ["#1a1230", "#241638", "#33203a"] },
];

function phaseForHour(hour: number) {
  return PHASES.find((p) => p.hours.includes(hour)) ?? PHASES[2];
}

export function TimeAura() {
  const { hour } = useRanchiClock();
  const activeKey = phaseForHour(hour).key;

  return (
    <div className="aura" aria-hidden="true">
      {PHASES.map((phase) => (
        <div
          key={phase.key}
          className={`aura-phase ${phase.key === activeKey ? "active" : ""}`}
        >
          <div className="aura-blob b1" style={{ background: `radial-gradient(circle, ${phase.blobs[0]} 0%, transparent 68%)` }} />
          <div className="aura-blob b2" style={{ background: `radial-gradient(circle, ${phase.blobs[1]} 0%, transparent 68%)` }} />
          <div className="aura-blob b3" style={{ background: `radial-gradient(circle, ${phase.blobs[2]} 0%, transparent 68%)` }} />
        </div>
      ))}
      <div className="aura-vignette" />
    </div>
  );
}
