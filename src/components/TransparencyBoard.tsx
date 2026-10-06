import { Reveal } from "./Reveal";
import { Check } from "./Icons";
import "./TransparencyBoard.css";

const VERIFIED = [
  {
    t: "24/7 Access",
    d: "Open 24 hours a day, 7 days a week — including late nights and early mornings.",
  },
  {
    t: "Convenient Namkum Location",
    d: "1st floor, Kamla Enclave at Sadabahar Chowk, beside Katyayni Sweets.",
  },
  {
    t: "Dedicated Environment",
    d: "A quiet, focused room built for study — not a café, not a co-working hub.",
  },
  {
    t: "Highly Rated",
    d: "4.7★ on Google and 4.6★ on Justdial, from public directory listings.",
  },
];

const UNVERIFIED = ["Air Conditioning", "Wi-Fi", "Lockers", "Parking", "Washrooms"];

export function TransparencyBoard() {
  return (
    <section
      className="section transparency"
      id="facilities"
      aria-label="Facilities and transparency board"
    >
      <div className="container">
        <Reveal variant="fade" as="p" className="kicker">
          <span className="k-idx">03</span> Facilities · Transparency Board
        </Reveal>

        <Reveal variant="up" as="h2" className="h2 t-h2">
          <span className="h2-sans-line">
            What you can <span className="accent serif">count on.</span>
          </span>
        </Reveal>
        <Reveal variant="up" delay={120} as="p" className="section-lede">
          Every claim on this page is either confirmed or openly marked as unverified.
          Nothing here is padded with assumptions — that&rsquo;s the point.
        </Reveal>

        <div className="t-grid">
          {/* ---------- Verified column ---------- */}
          <div className="t-col">
            <Reveal as="h3" variant="up" className="t-heading">
              <span className="t-badge t-badge-verified mono">Verified &amp; Confirmed</span>
            </Reveal>

            <ul className="t-list">
              {VERIFIED.map((item, i) => (
                <Reveal as="li" variant="up" delay={i * 90} className="t-item verified-item" key={item.t}>
                  <span className="t-check" aria-hidden="true">
                    <Check size={13} />
                  </span>
                  <div className="t-body">
                    <p className="t-title">{item.t}</p>
                    <p className="t-desc">{item.d}</p>
                  </div>
                  <span className="t-status mono" aria-hidden="true">OK</span>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* ---------- Awaiting confirmation column ---------- */}
          <div className="t-col t-col-tbc">
            <Reveal as="h3" variant="up" className="t-heading">
              <span className="t-badge t-badge-tbc mono">Awaiting Confirmation</span>
            </Reveal>

            <ul className="t-list">
              {UNVERIFIED.map((name, i) => (
                <Reveal
                  as="li"
                  variant="up"
                  delay={i * 90}
                  className="t-item tbc-item"
                  key={name}
                  tabIndex={0}
                >
                  <span className="t-dash" aria-hidden="true" />
                  <div className="t-body">
                    <p className="t-title">{name}</p>
                    <div className="t-tooltip" role="tooltip">
                      Facility status is currently being verified with management. Call{" "}
                      <a href="tel:+917070549845">+91 70705 49845</a> to confirm specific amenities.
                    </div>
                  </div>
                  <span className="t-status t-status-tbc mono" aria-hidden="true">TBC</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <Reveal variant="fade" delay={150} as="p" className="footnote t-footnote">
          Status as of October 2026 · Sourced from public directory listings ·
          Amenities may change; always call ahead for the latest.
        </Reveal>
      </div>
    </section>
  );
}
