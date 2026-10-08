import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useRanchiClock } from "../hooks/useRanchiClock";
import { useMagnetic } from "../hooks/useMagnetic";
import { useInView } from "../hooks/useInView";
import {
  PRESETS,
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
  shiftFor,
} from "../lib/dayExplorer";
import { Reveal } from "./Reveal";
import { Star } from "./Icons";
import "./BentoFacts.css";

/**
 * Interactive 24-Hour Day/Night Explorer: drag the glowing marker around
 * the dial (or tap the track), and the shift card updates live. Starts at
 * the visitor's current local (Ranchi/IST) time. All dial math lives in
 * `src/lib/dayExplorer.ts`; this file is presentation + interaction state.
 */

type DayDialProps = {
  hour: number;
  onHourChange: (hour: number) => void;
};

/** The circular 24-hour dial: scrubbing, amber arc, and glowing marker. */
function DayDial({ hour, onHourChange }: DayDialProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragging = useRef(false);

  const scrubTo = (e: ReactPointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    onHourChange(hourFromClientPoint(e.clientX, e.clientY, svg.getBoundingClientRect()));
  };

  const marker = markerPosition(hour);
  const activeShift = shiftFor(hour);

  return (
    <div className="dial-wrap">
      <svg
        ref={svgRef}
        className="dial"
        viewBox="0 0 240 240"
        role="slider"
        tabIndex={0}
        aria-label="Explore the library's 24 hours"
        aria-valuemin={0}
        aria-valuemax={24}
        aria-valuenow={Math.round(hour * 4) / 4}
        aria-valuetext={`${formatHour(hour)} — ${activeShift.name}`}
        onPointerDown={(e) => {
          e.preventDefault();
          dragging.current = true;
          svgRef.current?.setPointerCapture(e.pointerId);
          scrubTo(e);
        }}
        onPointerMove={(e) => {
          if (dragging.current) scrubTo(e);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
        onKeyDown={(e) => {
          const next = nextHourOnKey(e.key, e.shiftKey, hour);
          if (next !== null) {
            e.preventDefault();
            onHourChange(next);
          }
        }}
      >
        <circle cx="120" cy="120" r="96" className="dial-track" />
        <circle cx="120" cy="120" r="96" pathLength="48" className="dial-ticks" />
        <circle cx="120" cy="120" r="82" pathLength="100" className="dial-crosshair-h" />
        <circle
          cx="120"
          cy="120"
          r="96"
          pathLength="100"
          className="dial-progress"
          strokeDasharray={arcDashArray(hour)}
        />
        <circle cx="120" cy="24" r="2" className="dial-midnight" />
        <g
          className="dial-marker"
          style={{ transform: `translate(${marker.x}px, ${marker.y}px)` }}
        >
          <circle r="10" className="dial-dot-halo" />
          <circle r="5.5" className="dial-dot" />
        </g>
      </svg>
      <div className="dial-center" aria-hidden="true">
        <span className="dial-time serif">{formatHour(hour)}</span>
        <span className="dial-hint mono">drag · tap · explore</span>
      </div>
    </div>
  );
}

type MetricBarProps = {
  label: string;
  readout: ReactNode;
  fillPercent: number;
  noise?: boolean;
};

/** A single labelled horizontal meter (occupancy or noise). */
function MetricBar({ label, readout, fillPercent, noise = false }: MetricBarProps) {
  return (
    <div className="metric">
      <div className="metric-head mono">
        <span>{label}</span>
        <span>{readout}</span>
      </div>
      <div className="metric-bar">
        <span
          className={`metric-fill${noise ? " noise" : ""}`}
          style={{ width: `${fillPercent}%` }}
        />
      </div>
    </div>
  );
}

/** Shift name & vibe plus the live occupancy/noise meters. */
function ShiftCard({ hour }: { hour: number }) {
  const shift = shiftFor(hour);
  const occupancy = occupancyAt(hour);
  const db = noiseAt(hour);

  return (
    <div className="shift-card" aria-live="polite">
      <p className="shift-name">
        <span className="shift-icon" aria-hidden="true">{shift.icon}</span>
        {shift.name}
      </p>
      <p className="shift-vibe">{shift.vibe}</p>
      <MetricBar label="Typical occupancy" readout={`${occupancy}%`} fillPercent={occupancy} />
      <MetricBar
        label="Noise level"
        readout={<>{db} dB — {noiseLabel(db)}</>}
        fillPercent={noiseBarPercent(db)}
        noise
      />
    </div>
  );
}

type PresetRowProps = {
  hour: number;
  onSelectPreset: (hour: number) => void;
  onNow: () => void;
};

/** One-tap hour jumps for mobile users, plus a "back to now" pill. */
function PresetRow({ hour, onSelectPreset, onNow }: PresetRowProps) {
  const active = matchPreset(hour);

  return (
    <div className="preset-row">
      {PRESETS.map((preset) => (
        <button
          key={preset.label}
          type="button"
          className={`preset-pill ${active?.h === preset.h ? "active" : ""}`}
          onClick={() => onSelectPreset(preset.h)}
        >
          {preset.label}
        </button>
      ))}
      <button type="button" className="preset-pill now" onClick={onNow}>
        ● Now
      </button>
    </div>
  );
}

/** Stateful shell wiring the dial, shift card, and presets together. */
function DayExplorer() {
  const { time } = useRanchiClock();
  const nowHour = () => parseClockToHour(time);
  const [hour, setHour] = useState(nowHour);

  return (
    <>
      <DayDial hour={hour} onHourChange={setHour} />
      <div className="explorer-panel">
        <ShiftCard hour={hour} />
        <PresetRow
          hour={hour}
          onSelectPreset={setHour}
          onNow={() => setHour(nowHour())}
        />
      </div>
    </>
  );
}

/** Decorative topographic line-art for the Namkum box. */
function TopoLines() {
  return (
    <svg className="topo" viewBox="0 0 600 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          className="topo-line"
          d={`M-20 ${150 - i * 22} C 120 ${90 - i * 26}, 220 ${210 - i * 18}, 340 ${
            150 - i * 24
          } S 560 ${60 - i * 12}, 640 ${120 - i * 20}`}
        />
      ))}
      <circle cx="470" cy="96" r="4" className="topo-marker" />
      <circle cx="470" cy="96" r="12" className="topo-pulse" />
    </svg>
  );
}

type BentoBoxProps = {
  className?: string;
  children: ReactNode;
};

function BentoBox({ className = "", children }: BentoBoxProps) {
  const m = useMagnetic<HTMLDivElement>(0.05, 6);
  return (
    <div
      ref={m.ref}
      onMouseMove={m.onMouseMove}
      onMouseLeave={m.onMouseLeave}
      className={`bento-box ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function BentoFacts() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section className="section bento-section" aria-label="Quick facts">
      <div className="container">
        <Reveal variant="fade" as="p" className="kicker">
          <span className="k-idx">01</span> Quick Facts
        </Reveal>

        <div ref={ref} className={`bento ${inView ? "in" : ""}`}>
          {/* Box 1 — 24/7 day/night explorer */}
          <BentoBox className="box-dial">
            <DayExplorer />
            <div className="dial-copy">
              <p className="dial-big">
                Open
                <br />
                Every Day
              </p>
              <p className="dial-sub mono">24 hours · 7 days a week</p>
              <p className="footnote">As listed on public directories.</p>
            </div>
          </BentoBox>

          {/* Box 2 — Established stamp */}
          <BentoBox className="box-est">
            <span className="est-top mono">Established</span>
            <span className="est-year serif">2024</span>
            <span className="est-bottom mono">Namkum · Ranchi</span>
          </BentoBox>

          {/* Box 3 — Rating */}
          <BentoBox className="box-rating">
            <div className="rating-row">
              <span className="rating-num serif">4.7</span>
              <span className="rating-stars" data-cursor>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={19} className={`star s${i}`} />
                ))}
              </span>
            </div>
            <p className="rating-src mono">Google Rating</p>
            <p className="footnote">*Based on public directories. Counts may vary.</p>
          </BentoBox>

          {/* Box 4 — Location (wide) */}
          <BentoBox className="box-loc">
            <TopoLines />
            <div className="loc-copy">
              <p className="loc-big">
                Namkum<span className="loc-sep">,</span> Ranchi
              </p>
              <p className="loc-sub mono">Sadabahar Chowk · 23.35° N / 85.33° E</p>
            </div>
          </BentoBox>
        </div>
      </div>
    </section>
  );
}
