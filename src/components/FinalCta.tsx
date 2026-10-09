import { useCallback, useRef, useState } from "react";
import { useMagnetic } from "../hooks/useMagnetic";
import { useRanchiClock } from "../hooks/useRanchiClock";
import { Reveal, Line } from "./Reveal";
import { Phone, MapPin, Copy, Check } from "./Icons";
import "./FinalCta.css";

const PHONE_DISPLAY = "+91 70705 49845";
const PHONE_HREF = "tel:+917070549845";
const PHONE_RAW = "+917070549845";
const MAPS_URL = "https://maps.app.goo.gl/W3mpeq8EDtGj3rn9A";
const WHATSAPP_URL = "https://wa.me/917070549845";

/** Drifting dust particles — pure CSS, GPU-friendly. */
function Particles() {
  const parts = Array.from({ length: 14 }, (_, i) => ({
    left: (i * 37 + 13) % 100,
    delay: (i * 1.7) % 12,
    dur: 14 + (i % 5) * 4,
    size: i % 3 === 0 ? 3 : 2,
  }));
  return (
    <div className="cta-particles" aria-hidden="true">
      {parts.map((p, i) => (
        <span
          key={i}
          className="cta-particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}

export function FinalCta() {
  const call = useMagnetic<HTMLAnchorElement>(0.22, 10);
  const dir = useMagnetic<HTMLAnchorElement>(0.2, 8);
  const wa = useMagnetic<HTMLAnchorElement>(0.18, 6);
  const { time } = useRanchiClock();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copyPhone = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PHONE_RAW);
    } catch {
      // Fallback for non-secure contexts
      const ta = document.createElement("textarea");
      ta.value = PHONE_RAW;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* no-op */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  }, []);

  return (
    <section className="section final-cta" id="contact" aria-label="Join AR Smart Library">
      <div className="cta-glow" aria-hidden="true" />
      <Particles />

      <div className="container cta-inner">
        <Reveal variant="fade" as="p" className="kicker">
          <span className="k-idx">09</span> Begin · Contact
        </Reveal>

        <Reveal as="h2" variant="clip" className="h2 cta-h2">
          <Line index={0}>
            <span className="cta-h-sans">Study Whenever You Need —</span>
          </Line>
          <Line index={1}>
            <span className="cta-h-serif serif">
              Open <em className="cta-247 glow-amber">24/7</em>
            </span>
          </Line>
        </Reveal>

        <Reveal variant="up" delay={140} as="p" className="cta-sub">
          AR Smart Library is open 24 hours a day, 7 days a week, giving
          students a dedicated place to study according to their own schedule.
        </Reveal>

        {/* Copyable phone number */}
        <Reveal variant="up" delay={220} className="cta-phone-row">
          <button
            type="button"
            className="cta-phone"
            onClick={copyPhone}
            aria-label={`Copy phone number ${PHONE_DISPLAY}`}
          >
            <span className="cta-phone-num serif">{PHONE_DISPLAY}</span>
            <span className="cta-copy-hint mono" aria-hidden="true">
              {copied ? (
                <>
                  <Check size={14} /> Copied
                </>
              ) : (
                <>
                  <Copy size={14} /> Click to copy
                </>
              )}
            </span>
          </button>
          <span className="sr-only" role="status">
            {copied ? "Phone number copied to clipboard" : ""}
          </span>
        </Reveal>

        <Reveal variant="up" delay={300} className="cta-buttons">
          <a
            ref={call.ref}
            onMouseMove={call.onMouseMove}
            onMouseLeave={call.onMouseLeave}
            className="btn btn-primary cta-btn-lg"
            href={PHONE_HREF}
          >
            Join AR Smart Library <Phone size={17} />
          </a>
          <a
            ref={dir.ref}
            onMouseMove={dir.onMouseMove}
            onMouseLeave={dir.onMouseLeave}
            className="btn btn-glass cta-btn-lg"
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={16} /> Get Directions
          </a>
          <a
            ref={wa.ref}
            onMouseMove={wa.onMouseMove}
            onMouseLeave={wa.onMouseLeave}
            className="btn btn-glass"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Us
          </a>
        </Reveal>

        <Reveal variant="fade" delay={380} className="cta-status">
          <span className="status-dot" aria-hidden="true" />
          <span className="mono">Open Now · {time} IST</span>
        </Reveal>
      </div>
    </section>
  );
}
