import { useState, useRef, useEffect } from "react";
import Navigation from "@/components/layout/Navigation";
import Globe from "@/components/Globe";
import DestinationCard from "@/components/DestinationCard";
import { Maximize, Minimize } from "lucide-react";

const Destinations = () => {
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [isGlobeRotating, setIsGlobeRotating] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const globeContainerRef = useRef<HTMLDivElement>(null);

  const handlePinClick = (destination: any) => {
    setSelectedDestination(destination);
  };

  const handleRotationChange = (rotating: boolean) => {
    setIsGlobeRotating(rotating);
  };

  const handleCloseCard = () => {
    setSelectedDestination(null);
    setIsGlobeRotating(true); // Resume rotation when modal closes
  };

  const toggleFullscreen = async () => {
    if (!globeContainerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await globeContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error);
    }
  };

  // Listen for fullscreen changes (user might exit via ESC key)
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
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Header */}
      <header className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl">
          <p className="font-handwriting text-xl md:text-2xl text-muted-foreground mb-3">
            Explore the world
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            Destinations
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Click on the glowing pins scattered across our spinning globe to discover
            the destinations that have shaped our journey and stories.
          </p>
        </div>
      </header>

      {/* Globe Section */}
      <main className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Globe Container */}
          <div 
            ref={globeContainerRef}
            className={`relative h-[600px] md:h-[800px] bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 rounded-lg overflow-visible border border-border/50 ${
              isFullscreen ? "h-screen rounded-none border-0" : ""
            }`}
          >
            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="absolute bottom-4 right-4 z-50 p-2 bg-background/80 backdrop-blur-sm hover:bg-background border border-border/50 rounded-sm transition-all duration-200 hover:border-primary/50 group"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <Minimize className="w-5 h-5 text-foreground/80 group-hover:text-foreground" />
              ) : (
                <Maximize className="w-5 h-5 text-foreground/80 group-hover:text-foreground" />
              )}
            </button>

            <Globe 
              onPinClick={handlePinClick} 
              isRotating={isGlobeRotating}
              onRotationChange={handleRotationChange}
              isFullscreen={isFullscreen}
            />
            
            {/* Destination Card Modal - positioned in top left of globe container */}
            <DestinationCard
              destination={selectedDestination}
              onClose={handleCloseCard}
            />
          </div>

          {/* Instructions */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Drag to rotate the globe • Click on the glowing destination pins to learn more.
            </p>
          </div>
        </div>
      </main>


      {/* Simple Footer */}
      <footer className="border-t border-border py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <a href="/" className="font-serif text-foreground hover:text-primary transition-colors">
            Destination Drifters
          </a>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <a href="/journal" className="hover:text-foreground transition-colors">
              Journal
            </a>
            <a href="/about" className="hover:text-foreground transition-colors">
              About
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Destinations;
