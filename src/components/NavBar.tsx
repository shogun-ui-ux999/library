import { useEffect, useState, type CSSProperties } from "react";
import { Link, useRoute } from "../router";
import { useMagnetic } from "../hooks/useMagnetic";
import { Phone } from "./Icons";
import { Logo } from "./Logo";
import "./NavBar.css";

const PAGES: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Facilities", to: "/facilities" },
  { label: "Membership", to: "/membership" },
  { label: "Gallery", to: "/gallery" },
  { label: "Reviews", to: "/reviews" },
  { label: "Location", to: "/location" },
  { label: "Contact", to: "/contact" },
];

function Wordmark() {
  return (
    <Link to="/" className="nv-wordmark" aria-label="AR Smart Library — home">
      <Logo size={34} className="nv-mark" />
      <span className="nv-text">
        <span className="nv-ar serif">AR</span>
        <span className="nv-rest">
          Smart <em>Library</em>
        </span>
      </span>
    </Link>
  );
}

export function NavBar() {
  const path = useRoute();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cta = useMagnetic<HTMLAnchorElement>(0.2, 6);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [path]);

  // Glass density increases slightly once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the full-screen menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape closes the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container nv-row">
          <Wordmark />

          <nav className="nv-links" aria-label="Primary">
            {PAGES.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className={`nv-link mono ${path === p.to ? "active" : ""}`}
                aria-current={path === p.to ? "page" : undefined}
              >
                {p.label}
              </Link>
            ))}
          </nav>

          <div className="nv-right">
            <a
              ref={cta.ref}
              onMouseMove={cta.onMouseMove}
              onMouseLeave={cta.onMouseLeave}
              className="btn btn-primary nv-cta"
              href="tel:+917070549845"
            >
              Call Now <Phone size={14} />
            </a>

            <button
              type="button"
              className={`nv-burger ${open ? "open" : ""}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen editorial menu (mobile) */}
      {open && (
        <div className="mmenu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="mmenu-inner">
            <p className="mmenu-kicker mono" aria-hidden="true">
              Navigate — AR Smart Library
            </p>

            <ul className="mmenu-list">
              {PAGES.map((p, i) => (
                <li key={p.to} className="mmenu-item" style={{ "--i": i } as CSSProperties}>
                  <Link
                    to={p.to}
                    className={`mmenu-link ${path === p.to ? "active" : ""}`}
                    aria-current={path === p.to ? "page" : undefined}
                  >
                    <span className="mmenu-idx mono" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mmenu-label serif">{p.label}</span>
                    <span className="mmenu-arrow" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mmenu-foot">
              <a className="btn btn-primary" href="tel:+917070549845">
                Call Now · +91 70705 49845 <Phone size={16} />
              </a>
              <p className="mono mmenu-note">Open 24 hours · 7 days a week</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
