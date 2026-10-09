import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { SHIFT_PASSES } from "./ShiftPasses";
import type { ShiftKey } from "./ShiftPasses";
import { Reveal } from "./Reveal";
import { Phone, WhatsApp, Check } from "./Icons";
import "./BookingForm.css";

const PHONE_HREF = "tel:+917070549845";
const WHATSAPP_URL = "https://wa.me/917070549845";

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

/**
 * Reservation section ("#reserve") for the Study Shift Passes. The hero's
 * [ Reserve This Seat ] CTA scrolls here and pre-selects the shift through
 * `selectedShift`. No backend exists yet — submitting prepares the request
 * and hands it to the library's real channels (WhatsApp / phone).
 */
export function BookingForm({ selectedShift }: { selectedShift: ShiftKey | null }) {
  const [shift, setShift] = useState<ShiftKey | "">("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (selectedShift) {
      setShift(selectedShift);
      setSent(false);
    }
  }, [selectedShift]);

  const chosen = SHIFT_PASSES.find((p) => p.key === shift);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!chosen) return;
    setSent(true);
  };

  const waLink = chosen
    ? `${WHATSAPP_URL}?text=${encodeURIComponent(
        `Hi AR Smart Library! I'd like to reserve a seat.\n\n` +
          `Shift: ${chosen.title} (${chosen.range})\n` +
          `Date: ${date || "Today"}\n` +
          `Name: ${name}\n` +
          `Phone: ${phone}` +
          (note ? `\nNote: ${note}` : "")
      )}`
    : WHATSAPP_URL;

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
          Pick a shift, tell us who you are, and send the request — the
          library confirms every seat by phone. No payment online.
        </Reveal>

        <Reveal variant="up" delay={250} className="reserve-card">
          {sent && chosen ? (
            <div className="reserve-done" role="status">
              <span className="rd-icon" aria-hidden="true">
                <Check size={15} />
              </span>
              <p className="rd-title serif">
                Seat request ready{name ? `, ${name.split(" ")[0]}` : ""}.
              </p>
              <p className="rd-sub">
                Send it across and the library will confirm your{" "}
                <strong>{chosen.title}</strong> seat ({chosen.range}) by phone
                — no payment online.
              </p>
              <div className="rd-actions">
                <a
                  className="btn btn-primary"
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Send on WhatsApp <WhatsApp size={16} />
                </a>
                <a className="btn btn-glass" href={PHONE_HREF}>
                  Call now <Phone size={16} />
                </a>
              </div>
              <button
                type="button"
                className="text-link rd-again"
                onClick={() => setSent(false)}
              >
                Edit request
              </button>
            </div>
          ) : (
            <form className="reserve-form" onSubmit={onSubmit}>
              <div className="rf-field rf-wide">
                <label className="mono" htmlFor="rf-shift">
                  Study shift
                </label>
                <select
                  id="rf-shift"
                  required
                  value={shift}
                  onChange={(e) => setShift(e.target.value as ShiftKey | "")}
                >
                  <option value="" disabled>
                    Choose a shift…
                  </option>
                  {SHIFT_PASSES.map((p) => (
                    <option key={p.key} value={p.key}>
                      {p.title} · {p.range}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rf-field">
                <label className="mono" htmlFor="rf-date">
                  Preferred date
                </label>
                <input
                  id="rf-date"
                  type="date"
                  min={todayIso()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="rf-field">
                <label className="mono" htmlFor="rf-name">
                  Your name
                </label>
                <input
                  id="rf-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="e.g. Ananya Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="rf-field">
                <label className="mono" htmlFor="rf-phone">
                  Phone number
                </label>
                <input
                  id="rf-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+91 …"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="rf-field">
                <label className="mono" htmlFor="rf-note">
                  Note <span className="rf-optional">(optional)</span>
                </label>
                <input
                  id="rf-note"
                  type="text"
                  placeholder="Window seat, locker needed…"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary rf-submit">
                Send Reservation Request
              </button>

              <p className="footnote rf-note-text">
                Seats and rates shown on the shift passes are indicative —
                confirmed directly with the library when they reply.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
