import { useTilt } from "../hooks/useTilt";
import { useMagnetic } from "../hooks/useMagnetic";
import { Reveal } from "./Reveal";
import { MapPin, Phone, Compass, SweetsIcon, ArrowUpRight } from "./Icons";
import "./Location.css";

const MAPS_URL = "https://maps.app.goo.gl/W3mpeq8EDtGj3rn9A";
const PHONE_HREF = "tel:+917070549845";

/** Stylized dark "navigation interface" — roads, blocks, landmark, glowing pin. */
function StylizedMap() {
  return (
    <div className="map-canvas" aria-hidden="true">
      <div className="map-grid" />

      <svg className="map-svg" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice">
        {/* Roads */}
        <path d="M-20 300 C 160 288, 320 296, 440 284 S 700 262, 830 270" className="m-road main" />
        <path d="M240 -20 C 248 120, 236 260, 244 380 S 252 480, 246 540" className="m-road main" />
        <path d="M-20 160 C 140 170, 300 152, 430 164 S 690 178, 830 162" className="m-road" />
        <path d="M540 -20 C 548 110, 536 240, 544 360 S 552 470, 546 540" className="m-road" />
        <path d="M-20 430 C 180 418, 380 440, 580 428 S 780 436, 830 428" className="m-road" />
        {/* City blocks */}
        <rect x="300" y="180" width="150" height="80" className="m-block" />
        <rect x="320" y="330" width="120" height="66" className="m-block" />
        <rect x="600" y="300" width="140" height="90" className="m-block" />
        <rect x="90" y="330" width="110" height="70" className="m-block" />
        <rect x="60" y="70" width="120" height="60" className="m-block" />
        {/* Connector: landmark → library */}
        <path d="M330 250 L368 286" className="m-road connector" />
      </svg>

      {/* Landmark: Katyayni Sweets */}
      <div className="map-landmark" style={{ left: "36%", top: "44%" }}>
        <span className="landmark-dot" />
        <span className="landmark-label">
          <SweetsIcon size={12} /> Katyayni Sweets
        </span>
      </div>

      {/* Library pin */}
      <div className="map-pin" style={{ left: "48.5%", top: "57%" }}>
        <span className="pin-halo" />
        <span className="pin-core">
          <MapPin size={15} />
        </span>
        <span className="pin-label mono">AR Smart Library · 1st Floor</span>
      </div>

      {/* Street labels */}
      <div className="map-street mono" style={{ left: "10%", top: "55.5%" }}>
        Sadabahar Chowk
      </div>
      <div className="map-street mono alt" style={{ left: "25.5%", top: "12%" }}>
        Namkum
      </div>

      {/* Compass */}
      <div className="map-compass">
        <Compass size={18} />
      </div>
    </div>
  );
}

export function Location() {
  const mapTilt = useTilt<HTMLDivElement>(4);
  const cardTilt = useTilt<HTMLDivElement>(5);
  const ctaMaps = useMagnetic<HTMLAnchorElement>(0.2, 8);
  const ctaCall = useMagnetic<HTMLAnchorElement>(0.18, 6);

  return (
    <section className="section location" id="location" aria-label="Location and directions">
      <div className="container">
        <div className="loc-grid">
          {/* Interactive stylized map */}
          <Reveal variant="left" delay={100} className="loc-map-wrap">
            <div
              ref={mapTilt.ref}
              onMouseMove={mapTilt.onMouseMove}
              onMouseLeave={mapTilt.onMouseLeave}
              className="map-frame"
              data-cursor
            >
              <StylizedMap />
            </div>
            <p className="map-caption mono">
              Stylized map · not to scale — open in Google Maps for live navigation
            </p>
          </Reveal>

          {/* Address card */}
          <Reveal variant="right" delay={180} className="loc-card-col">
            <div
              ref={cardTilt.ref}
              onMouseMove={cardTilt.onMouseMove}
              onMouseLeave={cardTilt.onMouseLeave}
              className="address-card"
            >
              <p className="addr-kicker mono">The Address</p>

              <p className="addr-lines">
                1st Floor, Kamla Enclave,
                <br />
                Sadabahar Chowk,
                <br />
                <span className="addr-landmark">
                  <SweetsIcon size={14} /> beside Katyayni Sweets
                </span>
                ,
                <br />
                Namkum, Ranchi,
                <br />
                Jharkhand — 834010, India
              </p>

              <p className="footnote addr-footnote">
                *Approximately 130 metres from Hotel O Shiv Residency — for
                reference only.
              </p>

              <div className="addr-cta">
                <a
                  ref={ctaMaps.ref}
                  onMouseMove={ctaMaps.onMouseMove}
                  onMouseLeave={ctaMaps.onMouseLeave}
                  className="btn btn-primary"
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps <ArrowUpRight size={15} />
                </a>
                <a
                  ref={ctaCall.ref}
                  onMouseMove={ctaCall.onMouseMove}
                  onMouseLeave={ctaCall.onMouseLeave}
                  className="btn btn-glass"
                  href={PHONE_HREF}
                >
                  Call the Library <Phone size={15} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
