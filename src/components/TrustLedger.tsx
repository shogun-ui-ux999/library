import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";
import { Reveal } from "./Reveal";
import { Star, ArrowUpRight } from "./Icons";
import "./TrustLedger.css";

const GOOGLE_URL = "https://maps.app.goo.gl/W3mpeq8EDtGj3rn9A";
const JUSTDIAL_URL = "https://www.justdial.com/Ranchi/AR-Smart-Library-in-Namkum";

function GoogleRating() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const v = useCountUp(4.7, inView, 1900);

  return (
    <div ref={ref} className="ledger-anchor">
      <div className="anchor-score">
        <span className="anchor-num mono">{v.toFixed(1)}</span>
        <span className="anchor-star" aria-hidden="true">
          <Star size={44} />
        </span>
      </div>
      <p className="anchor-source mono">Google · 4.7 / 5 · 50 Reviews</p>

      <div
        className="anchor-bar"
        role="img"
        aria-label="Google rating: 4.7 out of 5"
      >
        <span className="anchor-bar-fill" style={{ width: inView ? "94%" : "0%" }} />
        <span className="anchor-bar-target" style={{ left: "94%" }} aria-hidden="true" />
      </div>

      <div className="anchor-meta mono">
        <span>0.0</span>
        <span>out of 5.0</span>
      </div>
    </div>
  );
}

function JustdialRating() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const v = useCountUp(4.6, inView, 1900);

  return (
    <div ref={ref} className="ledger-justdial">
      <div className="jd-score">
        <span className="jd-num mono">{v.toFixed(1)}</span>
        <span className="jd-star" aria-hidden="true">
          <Star size={20} />
        </span>
      </div>
      <p className="jd-src mono">Justdial · 4.6 / 5 · 39 Ratings</p>
      <div className="jd-bar" role="img" aria-label="Justdial rating: 4.6 out of 5">
        <span className="jd-bar-fill" style={{ width: inView ? "92%" : "0%" }} />
      </div>
    </div>
  );
}

export function TrustLedger() {
  return (
    <section className="section ledger" id="reviews" aria-label="Ratings and reviews">
      <div className="container">
        <div className="ledger-grid">
          <div className="ledger-right">
            <GoogleRating />
            <JustdialRating />

            <Reveal variant="up" delay={200} className="ledger-links">
              <a
                className="text-link"
                href={GOOGLE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Google Reviews <ArrowUpRight size={14} />
              </a>
              <a
                className="text-link"
                href={JUSTDIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Justdial <ArrowUpRight size={14} />
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal variant="fade" delay={150} as="p" className="footnote ledger-footnote">
          *Ratings and review counts are sourced from public directories (Google,
          Justdial) and may change over time. This page does not host reviews.
          Read our latest reviews on Google.
        </Reveal>
      </div>
    </section>
  );
}
