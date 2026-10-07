import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import {
  DeskIcon,
  ShelfIcon,
  DoorIcon,
  LampIcon,
  BookIcon,
} from "./Icons";
import "./Gallery.css";

type Plate = {
  icon: ReactNode;
  label: string;
  plate: string;
};

const ROW_A: Plate[] = [
  { icon: <DeskIcon size={44} />, label: "Study Area", plate: "Plate 01" },
  { icon: <BookIcon size={44} />, label: "Reading Desks", plate: "Plate 02" },
  { icon: <LampIcon size={44} />, label: "Quiet Zones", plate: "Plate 03" },
];

const ROW_B: Plate[] = [
  { icon: <DoorIcon size={44} />, label: "Entrance", plate: "Plate 04" },
  { icon: <ShelfIcon size={44} />, label: "Library Atmosphere", plate: "Plate 05" },
  { icon: <LampIcon size={44} />, label: "Night Study Space", plate: "Plate 06" },
];

function PlateCard({ plate }: { plate: Plate }) {
  return (
    <figure className="plate" data-cursor>
      <span className="plate-corner tl" aria-hidden="true" />
      <span className="plate-corner br" aria-hidden="true" />
      <span className="plate-icon" aria-hidden="true">
        {plate.icon}
      </span>
      <figcaption className="plate-caption">
        <span className="plate-label">{plate.label}</span>
        <span className="plate-meta mono">{plate.plate} · photography coming soon</span>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({ plates, reverse = false }: { plates: Plate[]; reverse?: boolean }) {
  const doubled = [...plates, ...plates];
  return (
    <div className={`marquee ${reverse ? "marquee-reverse" : ""}`}>
      <div className="marquee-track">
        {doubled.map((p, i) => (
          <PlateCard key={`${p.plate}-${i}`} plate={p} />
        ))}
      </div>
    </div>
  );
}

export function Gallery() {
  return (
    <section className="section gallery" id="gallery" aria-label="Concept gallery">
      <Reveal variant="fade" delay={180} className="marquee-stack">
        <MarqueeRow plates={ROW_A} />
        <MarqueeRow plates={ROW_B} reverse />
      </Reveal>

      <div className="container">
        <Reveal variant="fade" delay={220} as="p" className="footnote gallery-footnote">
          *Photography of the space coming soon. Plates are intentional
          placeholders — not stock images.
        </Reveal>
      </div>
    </section>
  );
}
