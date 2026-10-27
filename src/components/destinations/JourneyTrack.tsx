"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollProgress } from "@/components/motion/useScrollProgress";

export interface JourneyStop {
  id: string;
  name: string;
  country: string;
  date: string;
  coords: string;
  image: string;
  blur?: string;
}

/**
 * The journey, left to right in time. On wide screens with motion allowed, vertical scroll
 * scrubs the track sideways while the stage is pinned (sticky). Elsewhere it's a native
 * swipeable row with scroll snapping, so nothing is ever hijacked.
 */
export default function JourneyTrack({ stops }: { stops: JourneyStop[] }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [pinned, setPinned] = useState(false);
  useScrollProgress(wrapper);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setPinned(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Size the wrapper so vertical travel equals the track's horizontal overflow.
  useEffect(() => {
    const el = wrapper.current;
    const list = track.current;
    if (!el || !list) return;
    if (!pinned) {
      el.style.height = "";
      return;
    }
    const measure = () => {
      const distance = Math.max(0, list.scrollWidth - window.innerWidth);
      el.style.setProperty("--dist", String(distance));
      el.style.height = `${distance + window.innerHeight}px`;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  return (
    <div ref={wrapper} className="relative" style={{ "--p": 0, "--dist": 0 } as CSSProperties}>
      <div className={pinned ? "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden" : ""}>
        <ol
          ref={track}
          className={`flex gap-[4vw] px-[var(--gutter)] ${
            pinned ? "w-max will-change-transform" : "snap-x snap-mandatory overflow-x-auto pb-6 scrollbar-none"
          }`}
          style={pinned ? { transform: "translate3d(calc(var(--p) * var(--dist) * -1px), 0, 0)" } : undefined}
        >
          {stops.map((stop, index) => (
            <li
              key={stop.id}
              className={`group relative shrink-0 snap-start ${index % 2 ? "md:mt-[12svh]" : "md:mb-[12svh]"} w-[82vw] md:w-[46vw] lg:w-[38vw]`}
            >
              <Link href={`/journal/${stop.id}`} className="block">
                <div className="hover-media relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
                  <Image
                    src={stop.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 38vw, (min-width: 768px) 46vw, 82vw"
                    loading={index < 2 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : undefined}
                    placeholder={stop.blur ? "blur" : "empty"}
                    blurDataURL={stop.blur}
                    className="object-cover"
                  />
                  <div className="scrim-bottom absolute inset-0" />
                  <p className="label absolute left-4 top-4 text-paper">
                    {String(index + 1).padStart(2, "0")} / {String(stops.length).padStart(2, "0")}
                  </p>
                </div>
                {/* Name overlaps the photo's bottom edge. */}
                <p className="display relative -mt-[0.55em] text-step-4 text-paper transition-colors duration-2 group-hover:text-ember">
                  {stop.name}
                </p>
                <div className="mt-3 flex justify-between gap-4">
                  <p className="label text-stone">{stop.country}</p>
                  <p className="label text-stone">{stop.date}</p>
                </div>
                <p className="label mt-1 text-stone/70">{stop.coords}</p>
              </Link>
            </li>
          ))}
        </ol>

        {pinned && (
          <div className="container-x absolute inset-x-0 bottom-6 flex items-center gap-4" aria-hidden>
            <span className="label text-stone">{stops[0]?.date}</span>
            <span className="relative h-px flex-1 bg-paper/15">
              <span className="absolute inset-0 origin-left bg-ember" style={{ transform: "scaleX(var(--p))" }} />
            </span>
            <span className="label text-stone">{stops.at(-1)?.date}</span>
          </div>
        )}
      </div>
    </div>
  );
}
