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
    confirm: true,
  },
  {
    q: "Is parking available?",
    a: "Yes — parking is available. For specific vehicle types or peak-hour availability, call the library to confirm details.",
    confirm: true,
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

export function Faq() {
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

        <div className="faq-list">
          {FAQS.map((f, i) => (
            <Reveal as="div" variant="up" delay={i * 45} key={f.q}>
              <details className="faq-item" name="faq">
                <summary className="faq-summary">
                  <span className="faq-q-wrap">
                    <span className="faq-num mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="faq-q-text">{f.q}</span>
                  </span>

                  <svg
                    className="faq-chevron"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>

                <div className="faq-body">
                  <p className="faq-answer">{f.a}</p>
                  {f.confirm && (
                    <a className="btn btn-glass faq-confirm" href="tel:+917070549845">
                      <Phone size={14} /> Call to Confirm
                    </a>
                  )}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
