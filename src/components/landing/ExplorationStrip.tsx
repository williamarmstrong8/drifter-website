import { useRef, useState } from "react";
import { journalEntries } from "@/data/journalEntries";
import { Link } from "react-router-dom";

const ExplorationStrip = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <section id="exploration" className="py-20 md:py-32 bg-background">
      <div className="px-6 md:px-12 lg:px-20 mb-10">
        <p className="font-handwriting text-xl text-muted-foreground mb-2">
          Recent wanderings
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-foreground">
          From the Journal
        </h2>
      </div>

      {/* Horizontal Scroll Strip */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-6 overflow-x-auto scrollbar-hide px-6 md:px-12 lg:px-20 pb-4 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
      >
        {journalEntries.map((entry, index) => (
          <Link
            to={`/journal/${entry.id}`}
            key={entry.id}
            className="group flex-shrink-0 relative"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative w-72 md:w-80 lg:w-96 aspect-[4/5] overflow-hidden rounded-sm">
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 film-grain"
                style={{ backgroundImage: `url('${entry.image}')` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-earth/80 via-deep-earth/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Content - Hidden by default, shown on hover */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-handwriting text-warm-white/70 text-lg mb-1">
                  {entry.date}
                </p>
                <h3 className="font-serif text-warm-white text-xl md:text-2xl mb-1">
                  {entry.title}
                </h3>
                <p className="text-warm-white/60 text-sm">
                  {entry.location}, {entry.country}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Drag hint */}
      <p className="text-center text-muted-foreground/50 text-sm mt-6 hidden md:block">
        Drag to explore more →
      </p>
    </section>
  );
};

export default ExplorationStrip;
