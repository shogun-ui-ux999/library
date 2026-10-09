import { Reveal } from "./Reveal";
import { Check, Phone } from "./Icons";
import "./TransparencyBoard.css";

type Facility = { t: string; d: string };

/**
 * CONFIRMED facilities — provided directly by the library.
 * Nothing here is assumed; anything the library hasn't confirmed is
 * simply left out, with a direct call-to-confirm fallback beside the list.
 */
const CONFIRMED: Facility[] = [
  {
    t: "24/7 Access",
    d: "Open 24 hours a day, 7 days a week — including late nights and early mornings.",
  },
  {
    t: "Air Conditioning",
    d: "Yes — the reading hall is air-conditioned, with fans for extra airflow.",
  },
  {
    t: "High-Speed Wi-Fi",
    d: "Yes — wireless internet is available for members.",
  },
  {
    t: "Individual Cabins",
    d: "Yes — dedicated individual study cabins.",
  },
  {
    t: "Study Lamps",
    d: "Yes — a study lamp on every desk.",
  },
  {
    t: "Charging Points",
    d: "Yes — charging points at every desk.",
  },
  {
    t: "Locker Facilities",
    d: "Yes — lockers are available for members.",
  },
  {
    t: "Power Backup",
    d: "Yes — high-capacity battery backup keeps the space running through power cuts.",
  },
  {
    t: "CCTV Surveillance",
    d: "Yes — the space is kept under continuous CCTV surveillance.",
  },
  {
    t: "Drinking Water",
    d: "Yes — drinking water is available.",
  },
  {
    t: "Separate Washrooms",
    d: "Yes — separate male and female washrooms.",
  },
  {
    t: "Parking",
    d: "Yes — parking is available.",
  },
  {
    t: "Convenient Namkum Location",
    d: "1st floor, Kamla Enclave at Sadabahar Chowk — an easy-to-find landmark spot.",
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

export function TransparencyBoard() {
  return (
    <section
      className="section transparency"
      id="facilities"
      aria-label="Facilities and study environment"
    >
      <div className="container">
        <div className="t-grid">
          {/* ---------- Confirmed & Known ---------- */}
          <div className="t-col">
            <Reveal as="h2" variant="up" className="t-heading">
              <span className="t-badge t-badge-verified mono">Confirmed &amp; Known</span>
            </Reveal>

            <ul className="t-list t-list-dense">
              {CONFIRMED.map((item, i) => (
                <Reveal as="li" variant="up" delay={Math.min(i, 8) * 60} className="t-item verified-item" key={item.t}>
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

          {/* ---------- Call to confirm ---------- */}
          <div className="t-col t-col-confirm">
            <Reveal as="h2" variant="up" className="t-heading">
              <span className="t-badge t-badge-call mono">One Quick Call</span>
            </Reveal>

            <Reveal variant="up" delay={140} className="t-confirm-box">
              <p className="t-confirm-copy">
                Every confirmed item above was checked directly with the
                library. If anything you need isn&rsquo;t listed, one quick
                call settles it.
              </p>
              <a className="btn btn-primary" href="tel:+917070549845">
                Call to Confirm Facilities <Phone size={15} />
              </a>
              <p className="mono t-confirm-num">+91 70705 49845</p>
            </Reveal>
          </div>
        </div>

        <Reveal variant="fade" delay={150} as="p" className="footnote t-footnote">
          Status as of October 2026 · Confirmed items were verified directly
          with the library · Amenities may change; always call ahead for the
          latest.
        </Reveal>
      </div>
    </section>
  );
}
