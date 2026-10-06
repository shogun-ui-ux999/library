import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 18, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export const ArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const Phone = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export const MapPin = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const Compass = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
  </svg>
);

export const Star = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m12 3 2.7 5.6 6.3.8-4.6 4.3 1.2 6.1L12 16.9l-5.6 2.9 1.2-6.1L3 9.4l6.3-.8L12 3Z" />
  </svg>
);

export const Check = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const Clock = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

export const Copy = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </svg>
);

export const WhatsApp = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" />
    <path d="M8.8 8.5c.3-.7.7-.7 1-.7h.5c.2 0 .4 0 .6.5l.7 1.6c.1.3 0 .5-.1.7l-.6.7c-.1.2-.2.4-.1.6a6 6 0 0 0 2.8 2.6c.3.1.5 0 .6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.2.4.3.4.5 0 .8-.4 1.5-.9 1.8-.5.3-1.2.4-3.4-.5a10 10 0 0 1-4.6-4.5c-.9-2-.8-3-.6-3.6Z" />
  </svg>
);

export const Spark = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
  </svg>
);

/* --- Gallery line-art --- */

export const DeskIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 13h18M5 13v6M19 13v6M8 13V9h8v4M12 9V6M9.5 6h5" />
  </svg>
);

export const ShelfIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 4v16M20 4v16M4 8h16M4 13h16M4 18h16M7 5.5v2.5M10 5.5v2.5M13.5 5.5v2.5M7 10v3M11 10v3M15 10v3M7.5 15v3M12 15v3M16 15v3" />
  </svg>
);

export const DoorIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 21h16M6 21V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v16M14.5 12h.01" />
    <path d="M3 21h18" opacity="0.4" />
  </svg>
);

export const LampIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v2M6.5 5.5l1.4 1.4M17.5 5.5l-1.4 1.4M9 14a3 3 0 1 1 6 0H9ZM12 14v6M9 21h6" />
  </svg>
);

export const SweetsIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.5c.8 1.4 1.3 2.3 1.3 3.1a1.3 1.3 0 0 1-2.6 0c0-.8.5-1.7 1.3-3.1Z" />
    <path d="M4.5 9h15l-1.4 10a2 2 0 0 1-2 1.7H7.9a2 2 0 0 1-2-1.7L4.5 9Z" />
    <path d="M8.5 13.5h.01M12 16h.01M15.5 13.5h.01" />
  </svg>
);

export const BookIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
    <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
  </svg>
);
