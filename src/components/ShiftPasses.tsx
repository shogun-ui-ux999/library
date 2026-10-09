import { useRef, useState } from "react";
import { useTilt } from "../hooks/useTilt";
import { Reveal } from "./Reveal";
import { ArrowUpRight } from "./Icons";
import "./ShiftPasses.css";

export type ShiftKey = "morning" | "afternoon" | "night";

export type ShiftPass = {
  key: ShiftKey;
  title: string;
  range: string;
  sub: string;
  metric: string;
  seats: number;
  dayRate: string;
  monthRate: string;
};

/** The three study shifts offered as tactile hero cards. */
export const SHIFT_PASSES: ShiftPass[] = [
  {
    key: "morning",
    title: "Morning Tranquility",
    range: "06:00 – 14:00",
    sub: "Soft daylight, fresh mind, complimentary morning tea/coffee setup.",
    metric: "95% Silent Zone",
    seats: 12,
    dayRate: "₹49 / Shift",
    monthRate: "Monthly: ₹799",
  },
  {
    key: "afternoon",
    title: "Afternoon Focus",
    range: "14:00 – 22:00",
    sub: "Full climate control, high-speed 5G Wi-Fi, ergonomic desk focus.",
    metric: "Peak productivity shift",
    seats: 9,
    dayRate: "₹49 / Shift",
    monthRate: "Monthly: ₹799",
  },
  {
    key: "night",
    title: "Night Owl Graveyard",
    range: "22:00 – 06:00",
    sub: "Deep midnight quiet, dedicated security, warm individual desk lamps.",
    metric: "Ultra-silent deep work",
    seats: 15,
    dayRate: "₹49 / Shift",
    monthRate: "Monthly: ₹799",
  },
];

function ShiftPassCard({
  pass,
  onReserve,
}: {
  pass: ShiftPass;
  onReserve: (key: ShiftKey) => void;
}) {
  // Subtle 3D parallax on hover: perspective(1000px) rotateX/rotateY.
  const tilt = useTilt<HTMLDivElement>(7, 1, 1000);
  const [flipped, setFlipped] = useState(false);
  const frontRef = useRef<HTMLButtonElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);
  const reduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const flipTo = (next: boolean) => {
    setFlipped(next);
    // Keep keyboard focus on the face that is now visible.
    requestAnimationFrame(() =>
      (next ? backRef.current : frontRef.current)?.focus()
    );
  };

  return (
    <div className="sp-slot" role="listitem">
      <div
        ref={tilt.ref}
        onMouseMove={reduced.current ? undefined : tilt.onMouseMove}
        onMouseLeave={reduced.current ? undefined : tilt.onMouseLeave}
        className={`sp-card${flipped ? " is-flipped" : ""}`}
      >
        <div className="sp-inner">
          <button
            ref={frontRef}
            type="button"
            className="sp-face sp-front"
            aria-expanded={flipped}
            aria-label={`View seats and pricing for the ${pass.title} shift`}
            tabIndex={flipped ? -1 : 0}
            aria-hidden={flipped}
            onClick={() => flipTo(true)}
          >
            <span className="sp-arrow" aria-hidden="true">
              <ArrowUpRight size={17} />
            </span>
            <span className="sp-range mono">{pass.range}</span>
            <span className="sp-title">{pass.title}</span>
            <span className="sp-sub">{pass.sub}</span>
            <span className="sp-foot">
              <span className="sp-metric mono">{pass.metric}</span>
              <span className="sp-hint mono">tap to flip</span>
            </span>
          </button>

          <div
            ref={backRef}
            className="sp-face sp-back"
            role="group"
            aria-label={`${pass.title} shift details`}
            aria-hidden={!flipped}
            tabIndex={flipped ? 0 : -1}
          >
            <span className="sp-range mono">{pass.range}</span>
            <span className="sp-back-title">{pass.title}</span>
            <span className="sp-seats">
              <strong>{pass.seats} Desks Open</strong> for this shift
            </span>
            <span className="sp-price">
              <span className="sp-day">{pass.dayRate}</span>
              <span className="sp-month mono">{pass.monthRate}</span>
            </span>
            <button
              type="button"
              className="sp-cta"
              tabIndex={flipped ? 0 : -1}
              onClick={() => onReserve(pass.key)}
            >
              [ Reserve This Seat ]
            </button>
            <span className="sp-back-foot">
              <button
                type="button"
                className="sp-unflip mono"
                tabIndex={flipped ? 0 : -1}
                onClick={() => flipTo(false)}
              >
                ← back
              </button>
              <span className="sp-note mono">Indicative rates · confirm at the desk</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Row of three tactile "Study Shift Pass" cards for the hero: 3D tilt on
 * hover, amber glow on the arrow/border, a press effect on tap, and a 180°
 * flip that reveals seats, pricing, and a reserve CTA. On mobile the row
 * becomes a horizontal snap-scroller.
 */
export function StudyShiftPasses({
  onReserve,
}: {
  onReserve: (key: ShiftKey) => void;
}) {
  return (
    <Reveal variant="up" delay={950} className="shift-passes-shell container">
      <p className="sp-kicker mono">
        <span className="sp-kicker-diamond" aria-hidden="true" />
        Study Shift Passes — pick your hours
      </p>
      <div className="shift-passes" role="list" aria-label="Study shift passes">
        {SHIFT_PASSES.map((pass) => (
          <ShiftPassCard key={pass.key} pass={pass} onReserve={onReserve} />
        ))}
      </div>
      <p className="sp-swipe mono" aria-hidden="true">
        swipe →
      </p>
    </Reveal>
  );
}
