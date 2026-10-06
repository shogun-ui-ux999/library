import { TimeAura } from "./TimeAura";
import { useRanchiClock } from "../hooks/useRanchiClock";
import { useMagnetic } from "../hooks/useMagnetic";
import { Reveal, Line } from "./Reveal";
import { ArrowRight, Phone } from "./Icons";
import "./Hero.css";

const MAPS_URL = "https://maps.app.goo.gl/W3mpeq8EDtGj3rn9A";
const PHONE_HREF = "tel:+917070549845";

const FACTS = [
  { idx: "01", value: "Namkum", label: "Neighbourhood" },
  { idx: "02", value: "Ranchi", label: "City" },
  { idx: "03", value: "Est. 2024", label: "Established" },
  { idx: "04", value: "24 · 7", label: "Always Open" },
];

const MARQUEE_WORDS = ["Open", "Always", "Focus", "Quiet", "Open", "Always", "Focus", "Quiet"];

function TickRing() {
  return (
    <svg className="hero-tick-ring" viewBox="0 0 500 500" aria-hidden="true">
      <circle cx="250" cy="250" r="236" pathLength="96" className="ring-ticks" />
      <circle cx="250" cy="250" r="196" className="ring-fine" />
      <circle cx="250" cy="250" r="236" className="ring-arc" pathLength="100" />
    </svg>
  );
}

export function Hero() {
  const { time, date } = useRanchiClock();
  const primary = useMagnetic<HTMLAnchorElement>(0.24, 10);
  const secondary = useMagnetic<HTMLAnchorElement>(0.2, 8);

  return (
    <section className="hero" id="top" aria-label="AR Smart Library — open 24/7 in Namkum, Ranchi">
      <TimeAura />
      <TickRing />

      <header className="hero-top">
        <div className="hero-brand">
          <a className="wordmark" href="#top" aria-label="AR Smart Library — home">
            <span className="wm-ar serif">AR</span>
            <span className="wm-rest">
              Smart <em>Library</em>
            </span>
          </a>
          <span className="open-pill" role="status">
            <span className="pulse-dot" aria-hidden="true" />
            Open Now
            <span className="pill-note">24 / 7</span>
          </span>
        </div>

        <div className="clock" aria-label={`Current time in Ranchi: ${time} IST`}>
          <span className="clock-time" aria-hidden="true">
            {time}
          </span>
          <span className="clock-sub">
            <span>{date}</span>
            <span className="clock-ist">IST · Ranchi</span>
          </span>
        </div>
      </header>

      <div className="hero-mid container">
        <div className="hero-editorial">
          <Reveal variant="fade" delay={100} as="p" className="hero-eyebrow">
            <span className="eyebrow-diamond" aria-hidden="true" />
            Namkum, Ranchi — Reading &amp; Study Library
          </Reveal>

          <Reveal as="h1" variant="clip" className="hero-h1" threshold={0.1}>
            <Line index={0}>
              <span className="h-sans">Study</span>
            </Line>
            <Line index={1}>
              <span className="h-sans">Without</span>
            </Line>
            <Line index={2}>
              <span className="h-serif">
                Time&nbsp;Limits<span className="h-dot">.</span>
              </span>
            </Line>
          </Reveal>

          <Reveal variant="up" delay={650} as="p" className="hero-sub">
            AR Smart Library is a dedicated reading &amp; study space in Namkum,
            Ranchi — open 24 hours a day, 7 days a week. Walk in at any hour.
            The desk lamp is always on.
          </Reveal>
        </div>

        <Reveal variant="right" delay={350} as="aside" className="hero-facts" aria-label="Quick facts">
          <div className="facts-marquee" aria-hidden="true">
            <div className="facts-marquee-track">
              {MARQUEE_WORDS.map((w, i) => (
                <span key={i} className="fm-word serif">
                  {w}
                  <span className="fm-sep">·</span>
                </span>
              ))}
            </div>
          </div>

          <ul className="facts-list">
            {FACTS.map((f) => (
              <li key={f.idx} className="fact-row">
                <span className="fact-idx mono">{f.idx}</span>
                <span className="fact-value">{f.value}</span>
                <span className="fact-label mono">{f.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal variant="up" delay={850} className="hero-cta container">
        <a
          ref={primary.ref}
          onMouseMove={primary.onMouseMove}
          onMouseLeave={primary.onMouseLeave}
          className="btn btn-primary"
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Directions <ArrowRight size={17} />
        </a>
        <a
          ref={secondary.ref}
          onMouseMove={secondary.onMouseMove}
          onMouseLeave={secondary.onMouseLeave}
          className="btn btn-glass"
          href={PHONE_HREF}
        >
          Call +91 70705 49845 <Phone size={16} />
        </a>
        <a className="text-link hero-cta-link" href="#membership">
          Enquire about membership
        </a>
      </Reveal>

      <div className="hero-scroll-cue mono" aria-hidden="true">
        <span>Scroll</span>
        <span className="cue-line" />
      </div>
    </section>
  );
}
