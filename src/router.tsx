import {
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

/**
 * Tiny History-API router — no dependencies, matches the site's
 * zero-framework approach. Vite's dev server (and any SPA host) serves
 * index.html for unknown paths, so deep links like /about work directly.
 */

export function getCurrentPath(): string {
  const p = window.location.pathname;
  return p.endsWith("/index.html") ? "/" : p;
}

type Listener = () => void;
const listeners = new Set<Listener>();
let currentPath = getCurrentPath();

function notify() {
  currentPath = getCurrentPath();
  listeners.forEach((l) => l());
}

export function navigate(to: string, replace = false) {
  if (to === currentPath) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  if (replace) window.history.replaceState({}, "", to);
  else window.history.pushState({}, "", to);
  notify();
}

/** Subscribe to the current path (works across all mounted components). */
export function useRoute(): string {
  const [path, setPath] = useState(currentPath);
  useEffect(() => {
    const update = () => setPath(getCurrentPath());
    listeners.add(update);
    window.addEventListener("popstate", update);
    return () => {
      listeners.delete(update);
      window.removeEventListener("popstate", update);
    };
  }, []);
  return path;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  children: ReactNode;
};

/** Internal link that uses client-side navigation (still a real <a>). */
export function Link({ to, children, onClick, ...rest }: LinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
