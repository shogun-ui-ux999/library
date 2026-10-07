import { useEffect, useRef, useState } from "react";
import { useMagnetic } from "../hooks/useMagnetic";
import { Reveal } from "./Reveal";
import { Phone, MapPin, ArrowUpRight } from "./Icons";
import { Link } from "../router";
import "./Footer.css";

const NAV_LINKS: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Facilities", to: "/facilities" },
  { label: "Membership", to: "/membership" },
  { label: "Gallery", to: "/gallery" },
  { label: "Reviews", to: "/reviews" },
  { label: "Location", to: "/location" },
  { label: "Contact", to: "/contact" },
];

const SOCIALS = [
  { label: "Google Maps", href: "https://maps.app.goo.gl/W3mpeq8EDtGj3rn9A", short: "GM" },
  { label: "Justdial", href: "https://www.justdial.com/Ranchi/AR-Smart-Library-in-Namkum", short: "JD" },
  { label: "WhatsApp", href: "https://wa.me/917070549845", short: "WA" },
];

function BackToTop() {
  const [visible, setVisible] = useState(false);
  const mag = useMagnetic<HTMLButtonElement>(0.25, 6);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      ref={mag.ref}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={mag.onMouseLeave}
      className={`back-top mono ${visible ? "show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <span className="bt-arrow" aria-hidden="true">↑</span>
      <span className="bt-label">Top</span>
    </button>
  );
}

export function Footer() {
  const wmRef = useRef<HTMLSpanElement | null>(null);

  // Watermark drifts slightly as the footer scrolls into view.
  useEffect(() => {
    const el = wmRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        el.style.transform = `translate3d(${((p - 0.5) * 6).toFixed(2)}%, 0, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <footer className="footer" aria-label="Footer">
      <div className="container">
        <Reveal variant="fade" className="footer-grid">
          {/* Brand */}
          <div className="f-col f-brand">
            <p className="f-wordmark">
              <span className="f-ar serif">AR</span>
              <span className="f-rest mono">
                Smart <em>Library</em>
              </span>
            </p>
            <p className="f-mission">
              Your 24/7 study space in Namkum, Ranchi.
              <br />
              Serving students since 2024.
            </p>
            <div className="f-socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.short}
                  className="f-social mono"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                >
                  {s.short}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <nav className="f-col f-nav" aria-label="Footer navigation">
            <p className="f-heading mono">Navigate</p>
            <ul className="f-links">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <Link className="f-link mono" to={l.to}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact & hours */}
          <div className="f-col f-contact">
            <p className="f-heading mono">Contact &amp; Hours</p>
            <a className="f-phone" href="tel:+917070549845">
              <Phone size={16} /> +91 70705 49845
            </a>
            <a
              className="f-address"
              href="https://maps.app.goo.gl/W3mpeq8EDtGj3rn9A"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin size={16} />
              <span>
                1st Floor, Kamla Enclave,
                <br />
                Sadabahar Chowk, Namkum,
                <br />
                Ranchi, Jharkhand 834010
              </span>
              <ArrowUpRight size={13} className="f-addr-arrow" />
            </a>
            <p className="f-hours">
              <span className="f-open-pill">
                <span className="f-open-dot" aria-hidden="true" />
                Open Now
              </span>
              <span className="f-hours-text mono">Open 24 Hours · 7 Days a Week</span>
            </p>
          </div>
        </Reveal>
      </div>

      {/* Watermark */}
      <div className="footer-watermark" aria-hidden="true">
        <span ref={wmRef} className="wm-text">
          AR Smart Library
        </span>
      </div>

      {/* Legal bar */}
      <div className="footer-legal">
        <div className="container footer-legal-row">
          <p className="mono">© 2024 AR Smart Library. All rights reserved.</p>
          <p className="mono f-built">Built for deep focus.</p>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}
