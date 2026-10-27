"use client";

import { useEffect, type RefObject } from "react";

/**
 * Writes the element's scroll progress (0 → 1) to the `--p` CSS variable so styles can drive
 * transforms from it. Only runs while the element is near the viewport; one rAF per frame.
 *
 * - "sticky": 0 when the element's top reaches the viewport top, 1 when its bottom reaches the
 *   viewport bottom. Use on tall wrappers around a `position: sticky` stage.
 * - "through": 0 when the top enters at the bottom, 1 when the bottom leaves at the top.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  mode: "sticky" | "through" = "sticky",
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "0");
      return;
    }

    let frame = 0;
    let active = false;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const distance = mode === "sticky" ? rect.height - vh : rect.height + vh;
      const travelled = mode === "sticky" ? -rect.top : vh - rect.top;
      const p = distance > 0 ? Math.min(1, Math.max(0, travelled / distance)) : 0;
      el.style.setProperty("--p", p.toFixed(4));
    };

    const onScroll = () => {
      if (active && !frame) frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(([entry]) => {
      active = !!entry?.isIntersecting;
      if (active) onScroll();
    });
    io.observe(el);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ref, mode]);
}
