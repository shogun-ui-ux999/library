import { Reveal, Line } from "./Reveal";
import { SweetsIcon } from "./Icons";
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

        {/* Scrolling editorial text */}
        <div className="about-copy">
          <Reveal variant="fade" as="p" className="kicker">
            <span className="k-idx">02</span> About
          </Reveal>

          <Reveal as="h2" variant="clip" className="h2 about-h2">
            <Line index={0}>
              <span className="h2-sans">A Dedicated Space</span>
            </Line>
            <Line index={1}>
              <span className="h2-serif accent">for Deep Focus.</span>
            </Line>
          </Reveal>

          <Reveal variant="up" delay={120} as="p" className="about-p">
            Established in <strong>March 2024</strong>, AR Smart Library was built
            around a single idea: focus shouldn&rsquo;t keep office hours. Whether
            it&rsquo;s a late-night revision session or a 5&nbsp;AM start, the
            library stays open — 24 hours a day, 7 days a week — including the
            hours most libraries close.
          </Reveal>

          <Reveal variant="up" delay={220} as="p" className="about-p">
            You&rsquo;ll find it on the first floor of <strong>Kamla Enclave</strong>,
            right at <strong>Sadabahar Chowk</strong> in Namkum —{" "}
            <span className="landmark-chip">
              <SweetsIcon size={14} /> beside Katyayni Sweets
            </span>
            . It&rsquo;s the kind of landmark you can&rsquo;t miss, so the only
            thing left to think about is the page in front of you.
          </Reveal>

          <Reveal variant="up" delay={300} as="p" className="about-p">
            No frills, no distractions — just a calm, dedicated room for
            students, exam aspirants and anyone chasing deep, uninterrupted work.
          </Reveal>

          <Reveal variant="fade" delay={200} as="blockquote" className="about-quote">
            <span className="quote-mark serif" aria-hidden="true">&ldquo;</span>
            <span className="quote-text serif">
              The desk lamp is <em>always</em> on.
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
