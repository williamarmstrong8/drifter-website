"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Maximize, Minimize } from "lucide-react";
import DestinationCard from "@/components/destinations/DestinationCard";
import type { Destination } from "@/lib/destinations";

// three.js is large and needs WebGL, so the globe loads in the browser, on this route only,
// and only once the section approaches the viewport.
const Globe = dynamic(() => import("@/components/destinations/Globe"), { ssr: false });

const DestinationsExplorer = ({ destinations }: { destinations: Destination[] }) => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isGlobeRotating, setIsGlobeRotating] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [near, setNear] = useState(false);
  const globeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = globeContainerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "150px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleCloseCard = () => {
    setSelectedDestination(null);
    setIsGlobeRotating(true); // Resume rotation when the card closes
  };

  const toggleFullscreen = async () => {
    if (!globeContainerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await globeContainerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error);
    }
  };

  // Track fullscreen changes, including exits via the Escape key
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div
      ref={globeContainerRef}
      className={`relative overflow-hidden bg-ink-raised ${isFullscreen ? "h-screen" : "h-[75svh] min-h-[28rem] md:h-[88svh]"}`}
    >
      <button
        type="button"
        onClick={toggleFullscreen}
        className="label absolute bottom-4 right-4 z-raised inline-flex items-center gap-2 rounded-full bg-ink/60 px-4 py-2 text-paper backdrop-blur-sm hover:bg-paper hover:text-ink"
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? <Minimize className="h-4 w-4" aria-hidden /> : <Maximize className="h-4 w-4" aria-hidden />}
        {isFullscreen ? "Exit" : "Fullscreen"}
      </button>

      {near ? (
        <Globe
          destinations={destinations}
          onPinClick={setSelectedDestination}
          isRotating={isGlobeRotating}
          onRotationChange={setIsGlobeRotating}
          isFullscreen={isFullscreen}
        />
      ) : (
        <p className="label absolute inset-0 grid place-items-center text-stone">Loading the atlas…</p>
      )}

      <DestinationCard destination={selectedDestination} onClose={handleCloseCard} />
    </div>
  );
};

export default DestinationsExplorer;
