import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useRanchiClock } from "../hooks/useRanchiClock";
import { useMagnetic } from "../hooks/useMagnetic";
import { useInView } from "../hooks/useInView";
import { Reveal } from "./Reveal";
import { Star } from "./Icons";
import "./BentoFacts.css";

/** Shift personality for a given hour of the day. */
const SHIFTS: { from: number; to: number; icon: string; name: string; vibe: string }[] = [
  { from: 6, to: 12, icon: "☀️", name: "Morning Focus", vibe: "Fresh daylight, natural coffee aroma, crisp focus." },
  { from: 12, to: 18, icon: "⚡", name: "Peak Study Hours", vibe: "Full focus mode, active AC, group discussion pods active." },
  { from: 18, to: 24, icon: "🌙", name: "Evening Deep Work", vibe: "Warm desk lamps on, pin-drop silence, high energy." },
  { from: 0, to: 6, icon: "🦉", name: "Night Owl Shift", vibe: "Ultra-silent graveyard shift, dedicated night security, minimal distractions." },
];

/** Typical occupancy (%) and ambient noise (dB) sampled across the day. */
const OCCUPANCY: [number, number][] = [
  [0, 18], [3, 15], [5, 22], [7, 45], [9, 62], [12, 72], [15, 88], [18, 78], [20, 65], [22, 42], [24, 18],
];
const NOISE: [number, number][] = [
  [0, 26], [5, 28], [6, 32], [8, 36], [12, 42], [15, 46], [18, 38], [21, 32], [24, 26],
];

function seriesAt(series: [number, number][], h: number) {
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

function shiftFor(h: number) {
  const hh = ((h % 24) + 24) % 24;
  return SHIFTS.find((s) => hh >= s.from && hh < s.to) ?? SHIFTS[3];
}

function noiseLabel(db: number) {
  if (db <= 30) return "Deep Silence";
  if (db <= 38) return "Gentle White Noise";
  if (db <= 44) return "Lively Murmur";
  return "Full-Swing Hum";
}

function formatHour(h: number) {
  const mins = Math.round(h * 60) % 1440;
  const hh = Math.floor(mins / 60);
  const mm = mins % 60;
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}:${String(mm).padStart(2, "0")} ${hh < 12 ? "AM" : "PM"}`;
}

const PRESETS: { h: number; label: string }[] = [
  { h: 7, label: "☀️ Early Bird · 7 AM" },
  { h: 15, label: "⚡ Peak Crunch · 3 PM" },
  { h: 0, label: "🌙 Night Owl · 12 AM" },
];

/**
 * Interactive 24-Hour Day/Night Explorer: drag the glowing marker around
 * the dial (or tap the track), and the shift card updates live. Starts at
 * the visitor's current local (Ranchi/IST) time.
 */
function DayExplorer() {
  const { time } = useRanchiClock();
  const nowHour = () => Number(time.slice(0, 2)) + Number(time.slice(3, 5)) / 60;
  const [hour, setHour] = useState(nowHour);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragging = useRef(false);

  const frac = hour / 24;
  const angle = frac * 2 * Math.PI - Math.PI / 2;
  const mx = 120 + 96 * Math.cos(angle);
  const my = 120 + 96 * Math.sin(angle);

  const hourFromPointer = (e: ReactPointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 240 - 120;
    const y = ((e.clientY - rect.top) / rect.height) * 240 - 120;
    let f = (Math.atan2(y, x) + Math.PI / 2) / (2 * Math.PI);
    f = ((f % 1) + 1) % 1;
    setHour(Math.min(24, Math.max(0, f * 24)));
  };

  const shift = shiftFor(hour);
  const occ = Math.round(seriesAt(OCCUPANCY, hour));
  const db = Math.round(seriesAt(NOISE, hour));
  const activePreset = PRESETS.find((p) => Math.round(hour) % 24 === p.h);

  return (
    <>
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
          aria-valuetext={`${formatHour(hour)} — ${shift.name}`}
          onPointerDown={(e) => {
            e.preventDefault();
            dragging.current = true;
            svgRef.current?.setPointerCapture(e.pointerId);
            hourFromPointer(e);
          }}
          onPointerMove={(e) => {
            if (dragging.current) hourFromPointer(e);
          }}
          onPointerUp={() => {
            dragging.current = false;
          }}
          onPointerCancel={() => {
            dragging.current = false;
          }}
          onKeyDown={(e) => {
            const step = e.shiftKey ? 1 : 0.25;
            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              e.preventDefault();
              setHour((h) => Math.min(24, h + step));
            } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              e.preventDefault();
              setHour((h) => Math.max(0, h - step));
            } else if (e.key === "Home") {
              e.preventDefault();
              setHour(0);
            } else if (e.key === "End") {
              e.preventDefault();
              setHour(24);
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
            strokeDasharray={`${(frac * 100).toFixed(2)} 100`}
          />
          <circle cx="120" cy="24" r="2" className="dial-midnight" />
          <g className="dial-marker" style={{ transform: `translate(${mx}px, ${my}px)` }}>
            <circle r="10" className="dial-dot-halo" />
            <circle r="5.5" className="dial-dot" />
          </g>
        </svg>
        <div className="dial-center" aria-hidden="true">
          <span className="dial-time serif">{formatHour(hour)}</span>
          <span className="dial-hint mono">drag · tap · explore</span>
        </div>
      </div>

      <div className="explorer-panel">
        <div className="shift-card" aria-live="polite">
          <p className="shift-name">
            <span className="shift-icon" aria-hidden="true">{shift.icon}</span>
            {shift.name}
          </p>
          <p className="shift-vibe">{shift.vibe}</p>
          <div className="metric">
            <div className="metric-head mono">
              <span>Typical occupancy</span>
              <span>{occ}%</span>
            </div>
            <div className="metric-bar">
              <span className="metric-fill" style={{ width: `${occ}%` }} />
            </div>
          </div>
          <div className="metric">
            <div className="metric-head mono">
              <span>Noise level</span>
              <span>{db} dB — {noiseLabel(db)}</span>
            </div>
            <div className="metric-bar">
              <span className="metric-fill noise" style={{ width: `${((db - 20) / 30) * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="preset-row">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              className={`preset-pill ${activePreset?.h === p.h ? "active" : ""}`}
              onClick={() => setHour(p.h)}
            >
              {p.label}
            </button>
          ))}
          <button type="button" className="preset-pill now" onClick={() => setHour(nowHour())}>
            ● Now
          </button>
        </div>
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
