import type { CSSProperties, ReactNode } from "react";
import { Reveal, Line } from "./Reveal";
import "./PageHeader.css";

/**
 * Shared page header for all routed pages: mono kicker, clip-revealed
 * serif/sans editorial headline (h1), supporting lede, and an optional
 * meta slot rendered to the right (e.g. coordinates / est. stamp).
 */
export function PageHeader({
  kicker,
  idx,
  titleSans,
  titleSerif,
  lede,
  meta,
  children,
}: {
  kicker: string;
  idx: string;
  titleSans: string;
  titleSerif?: string;
  lede?: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="page-head">
      <div className="container page-head-grid">
        <div className="page-head-main">
          <Reveal variant="fade" as="p" className="kicker">
            <span className="k-idx">{idx}</span> {kicker}
          </Reveal>

          <Reveal as="h1" variant="clip" className="h2 page-head-h1" threshold={0.1}>
            <Line index={0}>
              <span className="ph-sans">{titleSans}</span>
            </Line>
            {titleSerif && (
              <Line index={1}>
                <span className="ph-serif serif accent">{titleSerif}</span>
              </Line>
            )}
          </Reveal>

          {lede && (
            <Reveal variant="up" delay={160} as="p" className="section-lede">
              {lede}
            </Reveal>
          )}
          {children}
        </div>

        {meta && (
          <Reveal variant="right" delay={220} as="div" className="page-head-meta" aria-hidden="true">
            {meta}
          </Reveal>
        )}
      </div>
      <span className="page-head-rule" style={{ "--i": 0 } as CSSProperties} aria-hidden="true" />
    </header>
  );
}
