import type { ReactNode } from "react";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { Phone, MapPin, WhatsApp, Clock, SweetsIcon } from "../components/Icons";
import { useRanchiClock } from "../hooks/useRanchiClock";
import { useMagnetic } from "../hooks/useMagnetic";
import "./ContactPage.css";

const PHONE_DISPLAY = "+91 70705 49845";
const PHONE_HREF = "tel:+917070549845";
const MAPS_URL = "https://maps.app.goo.gl/W3mpeq8EDtGj3rn9A";
const WHATSAPP_URL = "https://wa.me/917070549845";

function StatusBanner() {
  const { time } = useRanchiClock();
  return (
    <Reveal variant="up" delay={140} className="ct-status">
      <span className="ct-status-dot" aria-hidden="true" />
      <span className="ct-status-label serif">Open 24 / 7</span>
      <span className="ct-status-sub mono">
        Open now · {time} IST · 7 days a week
      </span>
    </Reveal>
  );
}

function Tile({
  icon,
  kicker,
  title,
  note,
  href,
  external = false,
  delay = 0,
}: {
  icon: ReactNode;
  kicker: string;
  title: string;
  note: string;
  href: string;
  external?: boolean;
  delay?: number;
}) {
  const mag = useMagnetic<HTMLAnchorElement>(0.08, 4);
  return (
    <Reveal variant="up" delay={delay}>
      <a
        ref={mag.ref}
        onMouseMove={mag.onMouseMove}
        onMouseLeave={mag.onMouseLeave}
        className="ct-tile"
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span className="ct-tile-icon" aria-hidden="true">
          {icon}
        </span>
        <span className="ct-tile-body">
          <span className="ct-tile-kicker mono">{kicker}</span>
          <span className="ct-tile-title serif">{title}</span>
          <span className="ct-tile-note mono">{note}</span>
        </span>
        <span className="ct-tile-arrow" aria-hidden="true">→</span>
      </a>
    </Reveal>
  );
}

export function ContactPage() {
  return (
    <main id="main">
      <PageHeader
        idx="C"
        kicker="Contact"
        titleSans="Contact"
        titleSerif="AR Smart Library."
        lede="One number, one address, one promise — the doors are open. Reach out any time, at any hour."
        meta={
          <>
            <span>Open 24/7</span>
            <span>Namkum · Ranchi</span>
          </>
        }
      />

      <section className="section contact" aria-label="Contact details and actions">
        <div className="container">
          <StatusBanner />

          <div className="ct-tiles">
            <Tile
              icon={<Phone size={22} />}
              kicker="Call Now"
              title="Call the Library"
              note={PHONE_DISPLAY}
              href={PHONE_HREF}
              delay={0}
            />
            <Tile
              icon={<WhatsApp size={22} />}
              kicker="WhatsApp"
              title="Message on WhatsApp"
              note="Chat with the library"
              href={WHATSAPP_URL}
              external
              delay={90}
            />
            <Tile
              icon={<MapPin size={22} />}
              kicker="Get Directions"
              title="Open in Google Maps"
              note="Sadabahar Chowk · Namkum"
              href={MAPS_URL}
              external
              delay={180}
            />
            <Tile
              icon={<Clock size={22} />}
              kicker="Enquire About Membership"
              title="Ask About Study Plans"
              note={`Call ${PHONE_DISPLAY}`}
              href={PHONE_HREF}
              delay={270}
            />
          </div>

          <div className="ct-details">
            <Reveal variant="up" delay={120} className="ct-detail">
              <p className="ct-detail-kicker mono">The Address</p>
              <p className="ct-detail-lines">
                1st Floor, Kamla Enclave,
                <br />
                Sadabahar Chowk,
                <br />
                <span className="ct-landmark">
                  <SweetsIcon size={14} /> beside Katyayni Sweets
                </span>
                ,
                <br />
                Namkum, Ranchi,
                <br />
                Jharkhand — 834010, India
              </p>
            </Reveal>

            <Reveal variant="up" delay={220} className="ct-detail">
              <p className="ct-detail-kicker mono">Hours</p>
              <p className="ct-detail-lines">
                Open 24 hours,
                <br />
                7 days a week<span className="ct-dot accent">.</span>
              </p>
              <p className="ct-detail-note">
                Walk in at any hour — the desk lamp is always on.
              </p>
            </Reveal>
          </div>

          <Reveal variant="fade" delay={200} as="p" className="footnote ct-footnote">
            *AR Smart Library does not operate any other phone numbers, email
            addresses or chat channels — the details above are the only official
            ones.
          </Reveal>
        </div>
      </section>
    </main>
  );
}
