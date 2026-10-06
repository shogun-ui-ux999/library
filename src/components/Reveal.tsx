import { useInView } from "../hooks/useInView";
import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealVariant = "up" | "fade" | "left" | "right" | "clip";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  variant?: RevealVariant;
  delay?: number;
  threshold?: number;
  className?: string;
  tabIndex?: number;
};

/**
 * Scroll-triggered reveal. `variant="clip"` expects children made of
 * .line-mask > .line-inner spans (staggered via --i per line).
 */
export function Reveal({
  children,
  as,
  variant = "up",
  delay = 0,
  threshold = 0.2,
  className = "",
  tabIndex,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(threshold);
  const Tag = (as ?? "div") as ElementType;
  const style: CSSProperties =
    delay > 0 ? ({ "--rv-delay": `${delay}ms` } as CSSProperties) : {};

  return (
    <Tag
      ref={ref}
      style={style}
      tabIndex={tabIndex}
      className={`rv rv-${variant} ${inView ? "in" : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}

/** One masked line for clip reveals. `index` drives the stagger. */
export function Line({
  children,
  index = 0,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const style = { "--i": index } as CSSProperties;
  return (
    <span className="line-mask">
      <span className={`line-inner ${className}`.trim()} style={style}>
        {children}
      </span>
    </span>
  );
}
