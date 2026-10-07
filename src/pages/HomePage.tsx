import { Hero } from "../components/Hero";
import { BentoFacts } from "../components/BentoFacts";
import { Faq } from "../components/Faq";
import { FinalCta } from "../components/FinalCta";
import { Reveal, Line } from "../components/Reveal";
import { Check, Star, MapPin, ArrowUpRight, SweetsIcon } from "../components/Icons";
import { Link } from "../router";
import { useMagnetic } from "../hooks/useMagnetic";
import "./Home.css";

const MAPS_URL = "https://maps.app.goo.gl/W3mpeq8EDtGj3rn9A";
const PHONE_HREF = "tel:+917070549845";

/* ------------------------------------------------------------------
   02 — About preview
------------------------------------------------------------------ */
function AboutPreview() {
  return (
    <section className="section hp-section" aria-label="About AR Smart Library">
      <div className="container hp-split">
        <div>
          <Reveal variant="fade" as="p" className="kicker">
            <span className="k-idx">02</span> About
          </Reveal>
          <Reveal as="h2" variant="clip" className="h2 hp-h2" threshold={0.15}>
            <Line index={0}>
              <span className="hp-h-sans">A quiet room that</span>
            </Line>
            <Line index={1}>
              <span className="hp-h-serif serif accent">never closes.</span>
            </Line>
          </Reveal>
        </div>

        <div className="hp-copy">
          <Reveal variant="up" delay={120} as="p" className="hp-p">
            AR Smart Library is a dedicated reading and study space at Sadabahar
            Chowk, Namkum, Ranchi. Established in 2024, it gives students and
            learners a place to focus around the clock — on the first floor of
            Kamla Enclave, beside Katyayni Sweets.
          </Reveal>
          <Reveal variant="up" delay={200} as="p" className="hp-p dim">
            Open 24 hours a day, 7 days a week — including the hours most
            libraries close.
          </Reveal>
          <Reveal variant="fade" delay={260}>
            <Link to="/about" className="text-link">
              Read the Full Story <ArrowUpRight size={14} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   03 — Facilities preview (confirmed benefits only)
------------------------------------------------------------------ */
const CONFIRMED_PREVIEW = [
  "24/7 access — open every day, all night",
  "Convenient Namkum location at Sadabahar Chowk",
  "A dedicated reading environment, built for study",
  "Highly rated by public reviewers",
];

function FacilitiesPreview() {
  return (
    <section className="section hp-section" aria-label="Facilities preview">
      <div className="container hp-split">
        <div>
          <Reveal variant="fade" as="p" className="kicker">
            <span className="k-idx">03</span> Facilities
          </Reveal>
          <Reveal as="h2" variant="clip" className="h2 hp-h2" threshold={0.15}>
            <Line index={0}>
              <span className="hp-h-sans">What you can</span>
            </Line>
            <Line index={1}>
              <span className="hp-h-serif serif accent">count on.</span>
            </Line>
          </Reveal>
          <Reveal variant="fade" delay={200}>
            <Link to="/facilities" className="btn btn-glass hp-btn">
              View Facilities <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>

        <ul className="hp-check-list">
          {CONFIRMED_PREVIEW.map((item, i) => (
            <Reveal as="li" variant="up" delay={i * 90} className="hp-check-row" key={item}>
              <span className="hp-check" aria-hidden="true">
                <Check size={12} />
              </span>
              <span>{item}</span>
            </Reveal>
          ))}
          <Reveal as="li" variant="fade" delay={380}>
            <p className="footnote">
              AC, Wi-Fi, cabins, lockers &amp; more on the Facilities page —
              each marked confirmed or pending verification.
            </p>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   04 — Membership preview (no pricing, ever)
------------------------------------------------------------------ */
function MembershipPreview() {
  const cta = useMagnetic<HTMLAnchorElement>(0.2, 8);
  return (
    <section className="section hp-section" aria-label="Membership preview">
      <div className="container">
        <Reveal variant="fade" as="p" className="kicker">
          <span className="k-idx">04</span> Membership
        </Reveal>

        <Reveal variant="up" delay={120} className="hp-banner">
          <div className="hp-banner-copy">
            <p className="hp-banner-title serif">
              Flexible study plans <em>may be available.</em>
            </p>
            <p className="hp-banner-sub">
              Contact AR Smart Library for current membership plans,
              availability and pricing — confirmed directly, never invented
              here.
            </p>
          </div>
          <div className="hp-banner-actions">
            <a
              ref={cta.ref}
              onMouseMove={cta.onMouseMove}
              onMouseLeave={cta.onMouseLeave}
              className="btn btn-primary"
              href={PHONE_HREF}
            >
              Call for Membership Details
            </a>
            <Link to="/membership" className="text-link">
              View Membership <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   05 — Reviews preview (compact trust strip)
------------------------------------------------------------------ */
function ReviewsPreview() {
  return (
    <section className="section hp-section" aria-label="Ratings preview">
      <div className="container">
        <Reveal variant="fade" as="p" className="kicker">
          <span className="k-idx">05</span> Reviews
        </Reveal>

        <div className="hp-trust">
          <Reveal variant="up" delay={100} className="hp-score">
            <span className="hp-score-num serif">4.7</span>
            <span className="hp-score-meta">
              <span className="hp-score-src mono">Google</span>
              <span className="hp-score-stars" aria-hidden="true">
                <Star size={13} /> <Star size={13} /> <Star size={13} />{" "}
                <Star size={13} /> <Star size={13} className="half" />
              </span>
              <span className="hp-score-count mono">4.7 / 5 · 50 reviews</span>
            </span>
          </Reveal>

          <span className="hp-trust-div" aria-hidden="true" />

          <Reveal variant="up" delay={200} className="hp-score">
            <span className="hp-score-num serif">4.6</span>
            <span className="hp-score-meta">
              <span className="hp-score-src mono">Justdial</span>
              <span className="hp-score-stars" aria-hidden="true">
                <Star size={13} /> <Star size={13} /> <Star size={13} />{" "}
                <Star size={13} /> <Star size={13} className="half" />
              </span>
              <span className="hp-score-count mono">4.6 / 5 · 39 ratings</span>
            </span>
          </Reveal>

          <Reveal variant="fade" delay={280} className="hp-trust-cta">
            <Link to="/reviews" className="text-link">
              Read the Trust Ledger <ArrowUpRight size={14} />
            </Link>
          </Reveal>
        </div>

        <Reveal variant="fade" delay={340} as="p" className="footnote hp-trust-note">
          *Ratings shown are based on public directory listings and may change.
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   06 — Location preview
------------------------------------------------------------------ */
function LocationPreview() {
  return (
    <section className="section hp-section" aria-label="Location preview">
      <div className="container hp-split">
        <div>
          <Reveal variant="fade" as="p" className="kicker">
            <span className="k-idx">06</span> Location
          </Reveal>
          <Reveal as="h2" variant="clip" className="h2 hp-h2" threshold={0.15}>
            <Line index={0}>
              <span className="hp-h-sans">Sadabahar Chowk,</span>
            </Line>
            <Line index={1}>
              <span className="hp-h-serif serif accent">Namkum.</span>
            </Line>
          </Reveal>
          <Reveal variant="up" delay={180} className="hp-loc-actions">
            <a className="btn btn-glass" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
              <MapPin size={15} /> Open in Google Maps
            </a>
            <Link to="/location" className="text-link">
              Location &amp; Directions <ArrowUpRight size={14} />
            </Link>
          </Reveal>
        </div>

        <Reveal variant="right" delay={140} as="address" className="hp-addr">
          <p className="hp-addr-kicker mono">The Address</p>
          <p className="hp-addr-lines">
            1st Floor, Kamla Enclave,
            <br />
            Sadabahar Chowk,
            <br />
            <span className="landmark-chip">
              <SweetsIcon size={14} /> beside Katyayni Sweets
            </span>
            ,
            <br />
            Namkum, Ranchi,
            <br />
            Jharkhand — 834010, India
          </p>
          <p className="footnote">Open 24 hours · 7 days a week</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function HomePage() {
  return (
    <>
      <Hero />
      <main id="main">
        <BentoFacts />
        <AboutPreview />
        <FacilitiesPreview />
        <MembershipPreview />
        <ReviewsPreview />
        <LocationPreview />
        <Faq />
        <FinalCta />
      </main>
    </>
  );
}
