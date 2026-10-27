"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { navItems, isActive } from "@/lib/nav";
import { youtubeChannel } from "@/data/films";

// Eased scrim: alpha follows a smooth curve rather than a straight line.
const scrim = (rgb: string) =>
  `linear-gradient(to bottom, ${[0.9, 0.86, 0.78, 0.66, 0.52, 0.38, 0.25, 0.14, 0.06, 0.02, 0]
    .map((a, i, arr) => `rgba(${rgb}, ${a}) ${Math.round((i / (arr.length - 1)) * 100)}%`)
    .join(", ")})`;

/**
 * Fixed, minimal header plus the full-screen menu. The header flips to dark text whenever a
 * light section (data-nav="paper") sits under it, so it stays legible without a background.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [onPaper, setOnPaper] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  // Track light sections passing under the header band.
  useEffect(() => {
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setOnPaper(visible.size > 0);
      },
      // A thin band where the header sits.
      { rootMargin: "-2% 0px -94% 0px" },
    );
    const observeAll = () => {
      // Sections from the previous page are removed without a final "not intersecting" entry.
      let pruned = false;
      for (const el of visible) {
        if (!el.isConnected) {
          visible.delete(el);
          io.unobserve(el);
          pruned = true;
        }
      }
      if (pruned) setOnPaper(visible.size > 0);
      document.querySelectorAll('[data-nav="paper"]').forEach((el) => io.observe(el));
    };
    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      setOnPaper(false);
    };
  }, [pathname]);

  const openMenu = () => {
    const current = navItems.findIndex((item) => isActive(pathname, item.href));
    setPreviewIndex(Math.max(0, current));
    dialogRef.current?.showModal();
  };
  const closeMenu = () => dialogRef.current?.close();

  const tone = onPaper ? "text-ink" : "text-paper";

  return (
    <>
      <a
        href="#main"
        className="label fixed left-4 top-4 z-overlay -translate-y-24 rounded-full bg-ember px-4 py-3 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        className={`container-x fixed inset-x-0 top-0 z-nav flex h-nav items-center justify-between transition-colors duration-2 ease-snap ${tone}`}
      >
        {/* Soft fade behind the header so content scrolling under it never collides with it.
            Eased (non-linear) stops avoid visible banding; the two tones cross-fade via opacity
            because gradients themselves can't be transitioned. */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[190%] transition-opacity duration-3 ease-out ${
            onPaper ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundImage: scrim("14, 19, 17") }}
        />
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[190%] transition-opacity duration-3 ease-out ${
            onPaper ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: scrim("238, 232, 221") }}
        />
        <Link href="/" className="flex items-center gap-3" aria-label="Destination Drifters, home">
          {/* eslint-disable-next-line @next/next/no-img-element -- small SVG mark */}
          <img
            src="/drifters-logo-web.svg"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 transition-[filter] duration-2"
            style={{ filter: onPaper ? "brightness(0)" : "brightness(0) invert(1)" }}
          />
          <span className="label hidden sm:block">Destination Drifters</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-6 md:gap-8">
          <ul className="hidden items-center gap-7 md:flex">
            {navItems.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="label link-wipe"
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={openMenu}
            className="label group flex items-center gap-3"
            aria-haspopup="dialog"
            aria-controls="site-menu"
          >
            Menu
            <span aria-hidden className="flex flex-col gap-[5px]">
              <span className="block h-px w-6 bg-current transition-transform duration-2 ease-snap group-hover:translate-x-1" />
              <span className="block h-px w-6 bg-current transition-transform duration-2 ease-snap group-hover:-translate-x-1" />
            </span>
          </button>
        </nav>
      </header>

      <dialog
        id="site-menu"
        ref={dialogRef}
        aria-label="Site menu"
        className="site-menu surface-ink m-0 h-[100dvh] max-h-none w-screen max-w-none p-0"
      >
        <div className="container-x flex h-full flex-col">
          <div className="flex h-nav shrink-0 items-center justify-between">
            <span className="label text-stone">Index</span>
            <button type="button" onClick={closeMenu} className="label link-wipe" autoFocus>
              Close
            </button>
          </div>

          <div className="grid flex-1 grid-cols-1 items-center gap-10 overflow-y-auto pb-8 md:grid-cols-[1.3fr_1fr]">
            <ol className="flex flex-col">
              {navItems.map((item, index) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="menu-item border-b border-line first:border-t" style={{ "--i": index } as CSSProperties}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      onMouseEnter={() => setPreviewIndex(index)}
                      onFocus={() => setPreviewIndex(index)}
                      aria-current={active ? "page" : undefined}
                      className="group flex items-baseline gap-4 py-2 md:gap-8 md:py-3"
                    >
                      <span className="label w-8 shrink-0 text-stone">{String(index + 1).padStart(2, "0")}</span>
                      <span className="overflow-hidden">
                        <span
                          className={`display block text-step-5 transition-[color,transform] duration-3 ease-glide group-hover:translate-x-3 ${
                            active ? "text-ember" : "group-hover:text-ember"
                          }`}
                        >
                          {item.label}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>

            <div className="relative hidden aspect-[4/5] overflow-hidden md:block" aria-hidden>
              {navItems.map((item, index) => (
                <Image
                  key={item.href}
                  src={item.preview}
                  alt=""
                  fill
                  sizes="40vw"
                  className={`object-cover transition-[opacity,transform] duration-4 ease-glide ${
                    index === previewIndex ? "scale-100 opacity-100" : "scale-110 opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-t border-line py-6">
            <a href={youtubeChannel} target="_blank" rel="noreferrer" className="label link-wipe inline-flex items-center gap-2">
              YouTube <ArrowUpRight className="h-3 w-3" aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <span className="label text-stone">Made for wanderers</span>
          </div>
        </div>
      </dialog>
    </>
  );
}
