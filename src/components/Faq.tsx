import { useState } from "react";
import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { Phone } from "./Icons";
import "./Faq.css";

type Faq = { q: string; a: string; confirm?: boolean };

const FAQS: Faq[] = [
  {
    q: "Is AR Smart Library open 24 hours?",
    a: "Yes. Public business listings show AR Smart Library as open 24 hours a day, 7 days a week.",
  },
  {
    q: "Where is AR Smart Library located?",
    a: "AR Smart Library is located on the 1st floor of Kamla Enclave at Sadabahar Chowk, Namkum, Ranchi, beside Katyayni Sweets.",
  },
  {
    q: "What is the phone number?",
    a: "The publicly listed phone number is +91 70705 49845.",
  },
  {
    q: "When was AR Smart Library established?",
    a: "Public directory information lists the establishment year as 2024.",
  },
  {
    q: "How can I get membership?",
    a: "Current membership plans and prices are not publicly verified. Visitors should contact the library directly for current availability and pricing.",
  },
  {
    q: "Is parking available?",
    a: "Yes — parking is available. For specific vehicle types or peak-hour availability, call the library to confirm details.",
  },
  {
    q: "Does the library have Wi-Fi?",
    a: "Yes — high-speed Wi-Fi is available for members.",
  },
  {
    q: "Does the library have AC?",
    a: "Yes — the library is air-conditioned, with fans for extra airflow.",
  },
  {
    q: "Does the library provide lockers?",
    a: "Yes — locker facilities are available for members.",
  },
];

function Answer({ item }: { item: Faq }) {
  return (
    <>
      <p className="faq-answer">{item.a}</p>
      {item.confirm && (
        <a className="btn btn-glass faq-confirm" href="tel:+917070549845">
          <Phone size={14} /> Call to Confirm
        </a>
      )}
    </>
  );
}

export function Faq() {
  const [active, setActive] = useState(0);

  return (
    <section className="section faq" id="faq" aria-label="Frequently asked questions">
      <div className="container">
        <Reveal variant="fade" as="p" className="kicker">
          <span className="k-idx">07</span> FAQ
        </Reveal>

        <Reveal as="h2" variant="up" className="h2 faq-h2">
          Frequently Asked <span className="accent serif">Questions.</span>
        </Reveal>
        <Reveal variant="up" delay={120} as="p" className="section-lede">
          Everything you need to know about AR Smart Library — confirmed
          directly with the library, and clearly marked where we
          can&rsquo;t verify.
        </Reveal>

        <div className="faq-layout">
          {/* ---------- Question rail ---------- */}
          <ul className="faq-list" role="tablist" aria-label="Questions">
            {FAQS.map((f, i) => (
              <Reveal
                as="li"
                variant="up"
                delay={i * 55}
                key={f.q}
                className="faq-row"
              >
                <button
                  type="button"
                  role="tab"
                  id={`faq-tab-${i}`}
                  aria-selected={active === i}
                  aria-controls="faq-panel"
                  className={`faq-q mono ${active === i ? "active" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="faq-q-text">{f.q}</span>
                  <span className="faq-plus" aria-hidden="true" />
                </button>

                {/* Mobile / inline answer */}
                <div
                  className={`faq-inline ${active === i ? "open" : ""}`}
                  id={`faq-inline-${i}`}
                  role="region"
                  aria-labelledby={`faq-tab-${i}`}
                >
                  <div className="faq-inline-inner">
                    <Answer item={f} />
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          {/* ---------- Desktop answer panel ---------- */}
          <Reveal variant="right" delay={150} className="faq-panel-col">
            <div className="faq-panel" id="faq-panel" role="tabpanel" aria-labelledby={`faq-tab-${active}`} key={active} style={{ "--panel-i": active } as CSSProperties}>
              <p className="faq-panel-num mono">{String(active + 1).padStart(2, "0")}</p>
              <h3 className="faq-panel-q serif">{FAQS[active].q}</h3>
              <Answer item={FAQS[active]} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
