import type { ReactNode } from "react";
import { useRanchiClock } from "../hooks/useRanchiClock";
import { useMagnetic } from "../hooks/useMagnetic";
import { useInView } from "../hooks/useInView";
import { Reveal } from "./Reveal";
import { Star } from "./Icons";
import "./BentoFacts.css";

/** Live 24-hour dial: a glowing dot marks the current time of day. */
function DayDial() {
  const { time } = useRanchiClock();
  const hh = Number(time.slice(0, 2));
  const mm = Number(time.slice(3, 5));
  const frac = (hh + mm / 60) / 24;
  const angle = frac * 2 * Math.PI - Math.PI / 2;
  const cx = 120 + 96 * Math.cos(angle);
  const cy = 120 + 96 * Math.sin(angle);

  return (
    <svg className="dial" viewBox="0 0 240 240" aria-hidden="true">
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
      <circle cx={cx} cy={cy} r="5" className="dial-dot" />
      <circle cx={cx} cy={cy} r="10" className="dial-dot-halo" />
    </svg>
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
          {/* Box 1 — 24/7 dial */}
          <BentoBox className="box-dial">
            <DayDial />
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
