"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

interface AmbientVideoProps {
  poster: string;
  sources: { src: string; type: string; media?: string }[];
  className?: string;
  /** Text alternative when the footage carries meaning. Decorative loops leave it empty. */
  label?: string;
}

/**
 * Muted, looping background film. Plays only while on screen, never for reduced-motion or
 * data-saver users (they get the poster), and always offers a pause control (WCAG 2.2.2).
 * Put the AV1/WebM source first and the MP4 fallback last; `media` picks a lighter mobile cut.
 */
export default function AmbientVideo({ poster, sources, className = "", label }: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    // Deferred so the poster (the LCP element) paints before any video bytes are requested.
    const id = setTimeout(() => setAllowed(!reduced && !saveData), 300);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !allowed) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !paused) void video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, [allowed, paused]);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <video
        ref={ref}
        className="h-full w-full object-cover"
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        aria-hidden={label ? undefined : true}
      >
        {allowed && sources.map((source) => <source key={source.src} {...source} />)}
      </video>
      {allowed && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="label absolute bottom-6 right-6 z-raised inline-flex items-center gap-2 rounded-full bg-ink/60 px-4 py-2 text-paper backdrop-blur"
          aria-pressed={paused}
        >
          {paused ? <Play className="h-3 w-3" aria-hidden /> : <Pause className="h-3 w-3" aria-hidden />}
          {paused ? "Play" : "Pause"}
        </button>
      )}
    </div>
  );
}
