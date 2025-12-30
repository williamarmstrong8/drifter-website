import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Globe from "@/components/Globe";
import DestinationCard from "@/components/DestinationCard";

const Destinations = () => {
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [isGlobeRotating, setIsGlobeRotating] = useState(true);

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
          <div className="relative h-[600px] md:h-[800px] bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 rounded-lg overflow-visible border border-border/50">
            <Globe 
              onPinClick={handlePinClick} 
              isRotating={isGlobeRotating}
              onRotationChange={handleRotationChange}
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
