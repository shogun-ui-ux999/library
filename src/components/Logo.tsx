import { useId } from "react";
import "./Logo.css";

/**
 * AR Smart Library brand mark — a glowing desk lamp over an open book,
 * on an obsidian plate. Matches the site favicon. Pure SVG, no assets.
 */
export function Logo({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  // Unique gradient id per instance (several marks render per page).
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const glowId = `logo-glow-${uid}`;

  return (
    <svg
      className={`logo-mark ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="rgba(229,169,59,0.85)" />
          <stop offset="55%" stopColor="rgba(229,169,59,0.25)" />
          <stop offset="100%" stopColor="rgba(229,169,59,0)" />
        </radialGradient>
      </defs>

      {/* Obsidian plate */}
      <rect
        x="1"
        y="1"
        width="46"
        height="46"
        rx="12"
        fill="#0A0A0B"
        stroke="rgba(229,169,59,0.55)"
        strokeWidth="1.5"
      />

      {/* Lamp glow + bulb */}
      <circle cx="24" cy="19" r="13" fill={`url(#${glowId})`} />
      <circle cx="24" cy="19" r="6.5" fill="#E5A93B" />

      {/* Rays */}
      <path
        d="M24 6.5v3.4M24 28v3.4M11.5 19h3.4M33 19h3.4"
        stroke="#E5A93B"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Open book */}
      <path
        d="M13.5 36.5c3.5-2.4 6.9-2.4 10.5 0 3.6-2.4 7-2.4 10.5 0"
        stroke="#F3F4F6"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M17 40.5c2.4-1.4 4.7-1.4 7 0"
        stroke="rgba(243,244,246,0.55)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
