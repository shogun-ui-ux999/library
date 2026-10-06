import type { CSSProperties } from "react";
import { useTilt } from "../hooks/useTilt";
import { useMagnetic } from "../hooks/useMagnetic";
import { Reveal } from "./Reveal";
import { Phone } from "./Icons";
import "./Membership.css";

/** Glowing membership pass graphic — pure CSS/SVG, no fake numbers. */
function MemberPass() {
  return (
    <div className="pass-stage" aria-hidden="true">
      <div className="pass">
        <div className="pass-sheen" />
        <div className="pass-head">
          <span className="pass-brand">
            <span className="pass-ar serif">AR</span>
            <span className="pass-name mono">Smart Library</span>
          </span>
          <span className="pass-247 mono">24 / 7</span>
        </div>

        <div className="pass-mid">
          <span className="pass-title serif-i">Member Pass</span>
          <div className="pass-lines" aria-hidden="true">
            <span className="pass-line" style={{ width: "72%" }} />
            <span className="pass-line" style={{ width: "48%" }} />
          </div>
        </div>

        <div className="pass-foot">
          <span className="pass-chip" aria-hidden="true">
            <span />
          </span>
          <span className="pass-note mono">Namkum · Ranchi · Est. 2024</span>
        </div>
      </div>
      <div className="pass-shadow" aria-hidden="true" />
    </div>
  );
}

export function Membership() {
  const pass = useTilt<HTMLDivElement>(9);
  const cta = useMagnetic<HTMLAnchorElement>(0.22, 9);

  return (
    <section className="section membership" id="membership" aria-label="Membership">
      <div className="container">
        <Reveal variant="fade" as="p" className="kicker">
          <span className="k-idx">04</span> Membership
        </Reveal>

        <div className="m-pass-card">
          <div className="m-copy">
            <Reveal as="h2" variant="clip" className="h2">
              <span className="line-mask">
                <span className="line-inner" style={{ "--i": 0 } as CSSProperties}>
                  <span className="m-h-sans">Flexible</span>
                </span>
              </span>
              <span className="line-mask">
                <span className="line-inner" style={{ "--i": 1 } as CSSProperties}>
                  <span className="m-h-serif accent serif">Study Plans.</span>
                </span>
              </span>
            </Reveal>

            <Reveal variant="up" delay={140} as="p" className="m-sub serif">
              Contact AR Smart Library for current membership plans, availability,
              and pricing.
            </Reveal>

            <Reveal variant="up" delay={230} as="p" className="m-note">
              We don&rsquo;t publish prices we can&rsquo;t verify. Plans are
              confirmed directly with the library — by phone or in person.
            </Reveal>

            <Reveal variant="up" delay={320} className="m-cta-row">
              <a
                ref={cta.ref}
                onMouseMove={cta.onMouseMove}
                onMouseLeave={cta.onMouseLeave}
                className="btn btn-primary m-cta"
                href="tel:+917070549845"
              >
                Call for Membership Details <Phone size={17} />
              </a>
              <span className="m-hours mono">Open now · 24/7</span>
            </Reveal>
          </div>

          <div className="m-visual">
            <div
              ref={pass.ref}
              onMouseMove={pass.onMouseMove}
              onMouseLeave={pass.onMouseLeave}
              className="pass-tilt"
            >
              <MemberPass />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
