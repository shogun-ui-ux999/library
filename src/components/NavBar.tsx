/* ============================================================
   Fixed top navigation — dark glass, thin amber-lined, minimal
   Desktop: wordmark | 8 nav links.
   Mobile (< 1180px): wordmark | compact toggle pill.
   Tapping the toggle reveals the SAME nav links as a compact row
   directly under the bar (inline drop-down, amber active underline).
   Tapping a link navigates and closes the drop-down.
   ============================================================ */

import { useEffect, useState } from "react";
import { Link, useRoute } from "../router";

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
      <Logo size={30} className="nv-mark" />
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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Glass density increases slightly once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="nv-row">
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

          <span className="nv-toggle-wrap">
            <button
              type="button"
              className="nv-toggle"
              aria-expanded={open}
              aria-controls="nv-inline-links"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="nv-toggle-icons" aria-hidden="true">
                <svg
                  className={`nv-t-icon nv-t-menu ${open ? "is-hidden" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
                <svg
                  className={`nv-t-icon nv-t-close ${open ? "" : "is-hidden"}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </span>
            </button>
            <span className="nv-toggle-label mono" aria-live="polite">
              {open ? "Close" : "Menu"}
            </span>
          </span>
        </div>

        {/* Full-width row directly under the bar: the SAME links. */}
        {open && (
          <nav
            className="nv-companion"
            id="nv-inline-links"
            aria-label="Mobile navigation"
          >
            {PAGES.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className={`nv-link mono ${path === p.to ? "active" : ""}`}
                aria-current={path === p.to ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {p.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
