import { useEffect, useState } from "react";
import { Link, useRoute } from "../router";

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
  const [scrolled, setScrolled] = useState(false);

  // Glass density increases slightly once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

        <a className="btn btn-primary nv-cta" href="tel:+917070549845">
          Call Now <Phone size={14} />
        </a>
      </div>
    </header>
  );
}
