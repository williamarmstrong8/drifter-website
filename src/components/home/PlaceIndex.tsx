"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface PlaceRow {
  id: string;
  place: string;
  country: string;
  date: string;
  image: string;
  blur?: string;
}

/**
 * A typographic index. On devices with a fine pointer, hovering a name brings its photo along
 * with the cursor and dims the other rows; keyboard focus pins the photo beside the row.
 * Touch devices get an inline thumbnail instead.
 */
export default function PlaceIndex({ rows }: { rows: PlaceRow[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFinePointer(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Follow the cursor with a little lag; transform only, one rAF per frame.
  useEffect(() => {
    const list = listRef.current;
    const float = floatRef.current;
    if (!list || !float || !finePointer) return;
    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let frame = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = () => {
      cx += (x - cx) * (reduced ? 1 : 0.16);
      cy += (y - cy) * (reduced ? 1 : 0.16);
      float.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(2rem, -50%)`;
      frame = Math.abs(x - cx) + Math.abs(y - cy) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (event: PointerEvent) => {
      const rect = list.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    list.addEventListener("pointermove", onMove);
    return () => {
      list.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [finePointer]);

  // Keyboard focus: park the preview beside the focused row.
  const pinTo = (row: HTMLElement) => {
    const list = listRef.current;
    const float = floatRef.current;
    if (!list || !float) return;
    const listRect = list.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();
    float.style.transform = `translate3d(${listRect.width * 0.7}px, ${rowRect.top - listRect.top + rowRect.height / 2}px, 0) translate(-50%, -50%)`;
  };

  return (
    <div className="relative">
      <ol ref={listRef} className="relative" onPointerLeave={() => setActive(null)}>
        {rows.map((row, index) => (
          <li key={row.id} className="border-b border-line first:border-t">
            <Link
              href={`/journal/${row.id}`}
              onPointerEnter={() => setActive(index)}
              onFocus={(event) => {
                setActive(index);
                pinTo(event.currentTarget);
              }}
              onBlur={() => setActive(null)}
              className={`group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-3 transition-opacity duration-3 ease-glide md:grid-cols-[4rem_1fr_12rem_8rem] md:gap-6 md:py-4 ${
                active !== null && active !== index ? "md:opacity-25" : "opacity-100"
              }`}
            >
              <span className="label text-stone">{String(index + 1).padStart(2, "0")}</span>
              <span className="display min-w-0 text-step-3 transition-transform duration-3 ease-glide md:text-step-4 md:group-hover:translate-x-4 md:group-focus-visible:translate-x-4">
                {row.place}
              </span>
              <span className="relative block h-14 w-11 overflow-hidden md:hidden" aria-hidden>
                <Image src={row.image} alt="" fill sizes="44px" className="object-cover" placeholder={row.blur ? "blur" : "empty"} blurDataURL={row.blur} />
              </span>
              <span className="label hidden text-stone md:block">{row.country}</span>
              <span className="label hidden text-right text-stone md:block">{row.date}</span>
            </Link>
          </li>
        ))}
      </ol>

      {/* Floating preview (fine pointers only). */}
      <div
        ref={floatRef}
        aria-hidden
        className={`pointer-events-none absolute left-0 top-0 z-raised hidden aspect-[4/5] w-[min(22vw,320px)] md:block ${
          finePointer ? "" : "!hidden"
        }`}
      >
        {rows.map((row, index) => (
          <div
            key={row.id}
            className={`absolute inset-0 overflow-hidden transition-[opacity,transform] duration-3 ease-glide ${
              active === index ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            <Image src={row.image} alt="" fill sizes="320px" className="object-cover" placeholder={row.blur ? "blur" : "empty"} blurDataURL={row.blur} />
          </div>
        ))}
      </div>
    </div>
  );
}
