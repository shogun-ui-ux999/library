import { useCallback, useEffect, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

/**
 * Magnetic hover: the element drifts gently toward the cursor while also
 * exposing --mx/--my (cursor position inside the element) for fill effects.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.28, maxShift = 14) {
  const ref = useRef<T | null>(null);
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const onMouseMove = useCallback(
    (e: ReactMouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const tx = Math.max(-maxShift, Math.min(maxShift, dx * strength));
        const ty = Math.max(-maxShift, Math.min(maxShift, dy * strength));
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    },
    [strength, maxShift]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.transform = "";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
