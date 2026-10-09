import { useState } from "react";
import type { FormEvent } from "react";
import { Reveal } from "./Reveal";
import { Check } from "./Icons";
import "./BookingForm.css";

const WHATSAPP_NUMBER = "917070549845";

type ShiftKey = "morning" | "afternoon" | "night" | "day";

type ShiftPill = {
  key: ShiftKey;
  emoji: string;
  title: string;
  range: string;
  /** Short name used inside the WhatsApp message text. */
  wa: string;
};

/** The four study shifts offered as tactile pills. */
const SHIFT_PILLS: ShiftPill[] = [
  {
    key: "morning",
    emoji: "☀️",
    title: "Morning",
    range: "06:00 – 14:00",
    wa: "Morning",
  },
  {
    key: "afternoon",
    emoji: "🌤️",
    title: "Afternoon",
    range: "14:00 – 22:00",
    wa: "Afternoon",
  },
  {
    key: "night",
    emoji: "🌙",
    title: "Night Owl",
    range: "22:00 – 06:00",
    wa: "Night Owl",
  },
  {
    key: "day",
    emoji: "⚡",
    title: "24-Hour Pass",
    range: "Full day",
    wa: "24-Hour",
  },
];

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function prettyDate(iso: string) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/**
 * Reservation section ("#reserve") — a printed "admittance slip" in place of
 * the old dropdown form. Four tactile shift pills, hairline ticket styling, a
 * live preview stub, and an instant WhatsApp shortcut. There is no backend:
 * the slip prepares the request and WhatsApp / phone carry it to the library.
 */
export function BookingForm() {
  const [serial] = useState(() => String(Math.floor(1000 + Math.random() * 9000)));
  const [shift, setShift] = useState<ShiftKey | "">("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [needsShift, setNeedsShift] = useState(false);

  const chosen = SHIFT_PILLS.find((p) => p.key === shift);

  const pickShift = (key: ShiftKey) => {
    setShift(key);
    setNeedsShift(false);
    setSubmitted(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!chosen) {
      setNeedsShift(true);
      return;
    }
    setSubmitted(true);
  };

  const waText = chosen
    ? `Hi, I would like to reserve a seat at AR Smart Library for the ${chosen.wa} shift.`
    : "Hi, I would like to reserve a seat at AR Smart Library.";
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

  return (
    <section className="section reserve" id="reserve" aria-label="Reserve a study shift">
      <div className="container">
        <Reveal variant="fade" as="p" className="kicker">
          <span className="k-idx">07</span> Reserve
        </Reveal>

        <Reveal as="h2" variant="up" delay={110} className="h2 reserve-h2">
          Hold your seat <span className="accent serif">in seconds.</span>
        </Reveal>

        <Reveal variant="up" delay={190} as="p" className="section-lede">
          Pick a shift, fill the slip, and send it across — the library confirms
          every seat by phone. No payment online.
        </Reveal>

        <Reveal variant="up" delay={250} className="reserve-card slip">
          <p className="slip-serial mono" aria-hidden="true">
            SLIP NO. <span>#AR-2024-{serial}</span>
          </p>

          <form className="slip-form" onSubmit={onSubmit}>
            <div className="slip-shift" role="group" aria-labelledby="slip-shift-label">
              <span id="slip-shift-label" className="slip-label">
                Study shift
              </span>
              <div className="slip-pills">
                {SHIFT_PILLS.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    className={`slip-pill${shift === p.key ? " is-active" : ""}`}
                    aria-pressed={shift === p.key}
                    onClick={() => pickShift(p.key)}
                  >
                    <span className="slip-pill-emoji" aria-hidden="true">
                      {p.emoji}
                    </span>
                    <span className="slip-pill-copy">
                      <span className="slip-pill-name">{p.title}</span>
                      <span className="slip-pill-range mono">{p.range}</span>
                    </span>
                    <span className="slip-pill-lamp" aria-hidden="true" />
                  </button>
                ))}
              </div>
              {needsShift && (
                <p className="slip-hint" role="alert">
                  Pick a shift first — then the slip is ready to send.
                </p>
              )}
            </div>

            <div className="slip-grid">
              <label className="slip-field">
                <span className="slip-label">Preferred date</span>
                <input
                  type="date"
                  min={todayIso()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>

              <label className="slip-field">
                <span className="slip-label">Your name</span>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="e.g. Ananya Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label className="slip-field">
                <span className="slip-label">Phone number</span>
                <input
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+91 …"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>

              <label className="slip-field slip-field-wide">
                <span className="slip-label">
                  Note <span className="slip-optional">(optional)</span>
                </span>
                <input
                  type="text"
                  placeholder="Window seat, locker needed…"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </label>
            </div>

            <div className="slip-actions">
              <button type="submit" className="btn btn-primary slip-send">
                Send Reservation Request
              </button>
              <a
                className="btn btn-glass slip-wa"
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span aria-hidden="true">💬</span> Reserve Instantly via WhatsApp
              </a>
            </div>

            {submitted && (
              <p className="slip-ready" role="status">
                <Check size={14} /> Request ready — send it on WhatsApp, or call
                and quote slip <strong>#AR-2024-{serial}</strong>.
              </p>
            )}

            <p className="footnote slip-note">
              The slip is a request, not a confirmed booking — the library
              replies on WhatsApp or by phone.
            </p>
          </form>

          <div className="slip-tear" aria-hidden="true" />

          <div className="slip-preview" aria-label="Live request preview">
            <div className="slip-preview-head">
              <span className="slip-preview-title mono">Admittance Preview</span>
              <span className="slip-preview-serial mono">#AR-2024-{serial}</span>
            </div>
            <dl className="slip-preview-rows">
              <div className="slip-row">
                <dt>Name</dt>
                <dd>{name.trim() || "—"}</dd>
              </div>
              <div className="slip-row">
                <dt>Shift</dt>
                <dd>{chosen ? `${chosen.title} · ${chosen.range}` : "Not selected yet"}</dd>
              </div>
              <div className="slip-row">
                <dt>Date</dt>
                <dd>{date ? prettyDate(date) : "Flexible"}</dd>
              </div>
              <div className="slip-row">
                <dt>Status</dt>
                <dd className={`slip-status${submitted ? " is-ready" : ""}`}>
                  <span className="slip-status-dot" aria-hidden="true" />
                  {submitted ? "Ready to send" : "Awaiting details"}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
