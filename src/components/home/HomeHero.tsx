"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import AmbientVideo from "@/components/media/AmbientVideo";
import Wordmark from "@/components/shell/Wordmark";
import { useScrollProgress } from "@/components/motion/useScrollProgress";
import { heroFilm, type HeroFrame } from "@/data/media";

const FRAME_MS = 6500;

interface HomeHeroProps {
  frames: HeroFrame[];
  blurs: Record<string, string>;
  storyCount: number;
}

/**
 * Opening scene. A tall wrapper drives `--p` (0 → 1) while the stage is pinned with sticky
 * positioning: the two words split apart and the footage recedes into a frame, handing over
 * to the next section. Transforms only; at --p: 0 (reduced motion) it's a still title card.
 */
export default function HomeHero({ frames, blurs, storyCount }: HomeHeroProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useScrollProgress(wrapper);

  // Cycle frames; respect the pause control, reduced motion and hidden tabs.
  useEffect(() => {
    if (heroFilm || paused || frames.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % frames.length);
    }, FRAME_MS);
    return () => window.clearInterval(id);
  }, [paused, frames.length]);

  const frame = frames[index] ?? frames[0];

  return (
    <div ref={wrapper} className="relative h-[190svh] md:h-[230svh]" style={{ "--p": 0 } as React.CSSProperties}>
      <section className="sticky top-0 h-[100svh] overflow-hidden" aria-labelledby="hero-title">
        <h1 id="hero-title" className="sr-only">
          Destination Drifters, a living travel journal
        </h1>

        {/* Footage frame: recedes and rounds as you scroll. */}
        <div
          className="absolute inset-0 isolate overflow-hidden bg-ink will-change-transform"
          style={{
            transform: "scale(calc(1 - var(--p) * 0.42)) translateY(calc(var(--p) * 6%))",
            borderRadius: "calc(var(--p) * 24px)",
          }}
        >
          {heroFilm ? (
            <AmbientVideo poster={heroFilm.poster} sources={heroFilm.sources} />
          ) : (
            frames.map((f, i) => (
              <div
                key={f.src}
                className={`absolute inset-0 transition-opacity duration-5 ease-drift ${i === index ? "opacity-100" : "opacity-0"}`}
                aria-hidden={i !== index}
              >
                <Image
                  src={f.src}
                  alt={f.alt}
                  fill
                  preload={i === 0}
                  loading={i === 0 ? undefined : "lazy"}
                  sizes="100vw"
                  placeholder={blurs[f.src] ? "blur" : "empty"}
                  blurDataURL={blurs[f.src]}
                  className={`object-cover motion-safe:transition-transform motion-safe:duration-[7000ms] motion-safe:ease-linear ${
                    i === index && !paused ? "scale-100" : "scale-[1.08]"
                  }`}
                />
              </div>
            ))
          )}
          {/* Overlays bleed 2px past the frame: the scaled, composited photos otherwise show a
              hairline of untinted image along the clipped, rounded edge. */}
          <div className="absolute -inset-0.5 bg-ink/35" />
          <div className="scrim-bottom absolute -inset-0.5" />
        </div>

        {/* Split wordmark */}
        <div className="pointer-events-none absolute inset-x-0 top-[calc(var(--nav-h)+4svh)] container-x text-paper">
          <div style={{ transform: "translateX(calc(var(--p) * -55vw))", opacity: "calc(1 - var(--p) * 1.6)" }}>
            <Wordmark text="DESTINATION" cut="condensed" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-[14svh] container-x text-paper md:bottom-[10svh]">
          <div
            className="ml-auto w-[78%] md:w-[62%]"
            style={{ transform: "translateX(calc(var(--p) * 55vw))", opacity: "calc(1 - var(--p) * 1.6)" }}
          >
            <Wordmark text="DRIFTERS" cut="condensed" />
          </div>
        </div>

        {/* Marginalia across the middle line, after the reference's quiet corner labels. */}
        <div
          className="container-x absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between gap-4 text-paper"
          style={{ opacity: "calc(1 - var(--p) * 2.5)" }}
        >
          <p className="label">A living travel journal</p>
          <p className="label hidden text-center sm:block" aria-live="polite">
            {heroFilm ? "" : `${frame?.place} — ${frame?.coords}`}
          </p>
          <p className="label text-right">{storyCount} stories</p>
        </div>

        {/* Hand-off line: surfaces inside the receding frame. */}
        <p
          className="pointer-events-none absolute inset-0 grid place-items-center px-8 text-center text-paper"
          style={{ opacity: "clamp(0, calc((var(--p) - 0.45) * 3), 1)", transform: "translateY(calc((1 - var(--p)) * 4rem))" }}
        >
          <span className="display text-step-4">
            Every journey leaves
            <br />
            <span className="accent-serif">a story worth telling</span>
          </span>
        </p>

        {!heroFilm && frames.length > 1 && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="label container-x absolute bottom-5 left-0 z-raised inline-flex items-center gap-2 text-paper/80 hover:text-paper"
          >
            {paused ? <Play className="h-3 w-3" aria-hidden /> : <Pause className="h-3 w-3" aria-hidden />}
            {paused ? "Play slideshow" : "Pause slideshow"}
          </button>
        )}
        <p className="label absolute bottom-5 right-[var(--gutter)] text-paper/80" aria-hidden style={{ opacity: "calc(1 - var(--p) * 3)" }}>
          Scroll
        </p>
      </section>
    </div>
  );
}
