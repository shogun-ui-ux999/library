/* ============================================================
   Fixed top navigation — dark glass, thin amber-lined, minimal
   Desktop: wordmark | 8 nav links.
   Mobile (< 1180px): wordmark | compact toggle pill.
   The toggle sits on the right side of the navbar. Tap it to push
   the SAME nav links down inline inside the navbar (a single compact
   row beneath the bar), with the amber active underline, instead of
   a scrollstrip or separate menu. The bar stays one row.
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
  const isNarrow = typeof window !== "undefined" && window.innerWidth < 1180;

  // Glass density increases slightly once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Define isNarrow only for SSR safety.
  if (typeof window === "undefined") {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    void isNarrow;
  }

  return (
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
          {isNarrow && (
            <span className="nv-toggle-wrap">
              <button
                type="button"
                className="nv-toggle"
                aria-expanded={open}
                aria-controls="nv-inline-links"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
              >
                <span aria-hidden="true" />
              </button>
              <span className="nv-toggle-label mono" aria-live="polite">
                {open ? "Close" : "Menu"}
              </span>
            </span>
          )}

          {isNarrow && open && (
            <div
              className="nv-companion"
              id="nv-inline-links"
              role="navigation"
              aria-label="Mobile navigation"
              hidden={false}
            />
          )}
        </div>
      </div>
    </header>
  );
}
