import { useCallback, useEffect, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

/**
 * 3D tilt on mouse position — used by the Member Pass and the address card.
 * Applies perspective + rotateX/rotateY, springs back to flat on leave.
 */
export function useTilt<T extends HTMLElement>(maxDeg = 8, scale = 1) {
  const ref = useRef<T | null>(null);
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const onMouseMove = useCallback(
    (e: ReactMouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${(-py * maxDeg).toFixed(
          2
        )}deg) rotateY(${(px * maxDeg).toFixed(2)}deg)${
          scale !== 1 ? ` scale(${scale})` : ""
        }`;
      });
    },
    [maxDeg, scale]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.transform = "";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
