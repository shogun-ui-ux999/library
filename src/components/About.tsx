import { useState } from "react";
import { Reveal } from "./Reveal";
import { SweetsIcon, Clock, MapPin, ArrowUpRight } from "./Icons";
import { useTilt } from "../hooks/useTilt";
import { Link } from "../router";
import "./About.css";

/** Abstract architectural line-art of a quiet study hall. */
function HallLines() {
  return (
    <svg className="hall-lines" viewBox="0 0 520 640" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="hall-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(229,169,59,0.55)" />
          <stop offset="1" stopColor="rgba(243,244,246,0.14)" />
        </linearGradient>
        <radialGradient id="lamp-glow">
          <stop offset="0" stopColor="rgba(229,169,59,0.9)" />
          <stop offset="1" stopColor="rgba(229,169,59,0)" />
        </radialGradient>
      </defs>

      {/* Perspective floor */}
      <path d="M0 640 L260 380 L520 640" className="hl-line" />
      <path d="M60 640 L260 428 L460 640" className="hl-line dim" />
      <path d="M130 640 L260 470 L390 640" className="hl-line dim" />

      {/* Ceiling beams */}
      <path d="M0 0 L260 250 L520 0" className="hl-line" />
      <path d="M80 0 L260 210 L440 0" className="hl-line dim" />

      {/* Reading alcoves */}
      {[0, 1, 2].map((i) => (
        <g key={i} className={`hl-alcove a${i}`}>
          <rect x={56 + i * 150} y={180} width={92} height={128} className="hl-frame" />
          <path
            d={`M${64 + i * 150} 308 L${102 + i * 150} 252 L${140 + i * 150} 308`}
            className="hl-line dim"
          />
          <circle cx={102 + i * 150} cy={228} r={26} fill="url(#lamp-glow)" className="hl-glow" />
          <path d={`M${102 + i * 150} 232 l0 -26 m-10 6 l10 -10 l10 10`} className="hl-lamp" />
        </g>
      ))}

      {/* Horizon line */}
      <path d="M0 380 L520 380" stroke="url(#hall-fade)" strokeWidth="1" />
    </svg>
  );
}

const ABOUT_FACTS = [
  { icon: <MapPin size={14} />, label: "Serving students in Namkum since 2024" },
  { icon: <SweetsIcon size={14} />, label: "Beside Katyayni Sweets, Sadabahar Chowk" },
  { icon: <Clock size={14} />, label: "Open 24 hours, 7 days a week" },
];

/** The three pillars — interactive cards with the architectural line look. */
const PILLARS = [
  {
    title: "24/7 Access",
    desc: "Dedicated round-the-clock study environment for day & night aspirants",
  },
  {
    title: "Zero Distraction",
    desc: "Soundproofed silent zones, strict noise discipline, ergonomic seating",
  },
  {
    title: "Modern Amenities",
    desc: "High-speed optical fiber, power sockets at every desk, full power backup",
  },
];

function Pillar({ title, desc, index }: { title: string; desc: string; index: number }) {
  const tilt = useTilt<HTMLDivElement>(4);
  const [open, setOpen] = useState(false);

  return (
    <Reveal variant="up" delay={index * 110} className="pillar-slot">
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="pillar-lift"
      >
        <button
          type="button"
          className={`pillar${open ? " is-open" : ""}`}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="pillar-top">
            <span className="pillar-idx mono">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="pillar-arrow" aria-hidden="true">
              <ArrowUpRight size={16} />
            </span>
          </span>
          <span className="pillar-title">{title}</span>
          <span className="pillar-desc">
            <span className="pillar-desc-inner">{desc}</span>
          </span>
        </button>
      </div>
    </Reveal>
  );
}

export function About() {
  return (
    <section className="section about" id="about" aria-label="About AR Smart Library">
      <div className="container about-grid">
        {/* Sticky visual */}
        <div className="about-visual">
          <div className="about-visual-inner">
            <HallLines />
            <Reveal variant="fade" delay={250} className="est-badge" as="span">
              <span className="est-badge-year serif">Est. 2024</span>
              <span className="est-badge-sub mono">Namkum · Ranchi</span>
            </Reveal>
          </div>
        </div>

        {/* Editorial copy */}
        <div className="about-copy">
          <Reveal variant="up" as="p" className="about-p">
            AR Smart Library is a dedicated reading and study space located at{" "}
            <strong>Sadabahar Chowk, Namkum, Ranchi</strong>. Established in{" "}
            <strong>2024</strong>, the library provides students and learners
            with a place to focus on their studies around the clock.
          </Reveal>

          <Reveal variant="up" delay={120} as="p" className="about-p">
            Located on the first floor of <strong>Kamla Enclave</strong>, beside{" "}
            <span className="landmark-chip">
              <SweetsIcon size={14} /> Katyayni Sweets
            </span>
            , AR Smart Library is easily identifiable from Sadabahar Chowk and
            remains open 24 hours a day, 7 days a week.
          </Reveal>

          <Reveal variant="up" delay={220} as="p" className="about-p">
            No frills, no distractions — just a calm, dedicated room for
            students, exam aspirants and anyone chasing deep, uninterrupted
            work. Whether it&rsquo;s a late-night revision session or a 5&nbsp;AM
            start, the doors are open.
          </Reveal>

          <ul className="about-facts">
            {ABOUT_FACTS.map((f, i) => (
              <Reveal as="li" variant="up" delay={280 + i * 90} className="about-fact" key={f.label}>
                <span className="af-icon" aria-hidden="true">
                  {f.icon}
                </span>
                <span>{f.label}</span>
              </Reveal>
            ))}
          </ul>

          <Reveal variant="fade" delay={200} as="blockquote" className="about-quote">
            <span className="quote-mark serif" aria-hidden="true">&ldquo;</span>
            <span className="quote-text serif">
              The desk lamp is <em>always</em> on.
            </span>
          </Reveal>

          <Reveal variant="up" delay={120} className="about-cta-row">
            <Link to="/location" className="btn btn-glass">
              Visit the Library <MapPin size={15} />
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Three interactive pillars — hover or tap to reveal */}
      <div className="container about-pillars-wrap">
        <Reveal variant="fade" as="p" className="kicker pillars-kicker">
          Est. 2024 · Namkum · Ranchi — in three pillars
        </Reveal>
        <div className="about-pillars">
          {PILLARS.map((p, i) => (
            <Pillar key={p.title} title={p.title} desc={p.desc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
