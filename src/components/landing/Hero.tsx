import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToContent = () => {
    const element = document.getElementById("exploration");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat film-grain"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80')`,
          transform: "scale(1.1)",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-earth/40 via-transparent to-deep-earth/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-earth/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-8 md:px-12 lg:px-20">
        {/* Top - Brand */}
        <header
          className={`transition-all duration-1000 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <h1 className="font-serif text-xl md:text-2xl text-warm-white/90 tracking-wide">
            Destination Drifters
          </h1>
        </header>

        {/* Middle - Tagline (Asymmetric positioning) */}
        <div className="flex-1 flex items-center">
          <div className="max-w-2xl lg:max-w-3xl">
            <p
              className={`font-handwriting text-lg md:text-xl text-warm-white/70 mb-4 transition-all duration-1000 delay-500 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              A living travel journal
            </p>
            <h2
              className={`font-serif text-4xl md:text-5xl lg:text-7xl text-warm-white leading-[1.1] tracking-tight transition-all duration-1000 delay-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Every journey leaves
              <br />
              <span className="italic">a story worth telling</span>
            </h2>
            <p
              className={`mt-6 md:mt-8 text-warm-white/60 text-lg md:text-xl max-w-md font-light transition-all duration-1000 delay-900 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Wander with intention. Document with heart. Share the moments that shaped you.
            </p>
          </div>
        </div>

        {/* Bottom - Scroll Indicator */}
        <div
          className={`flex justify-center transition-all duration-1000 delay-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={scrollToContent}
            className="flex flex-col items-center gap-2 text-warm-white/50 hover:text-warm-white/80 transition-colors cursor-pointer group"
            aria-label="Scroll to explore"
          >
            <span className="text-sm tracking-widest uppercase font-light">
              Explore
            </span>
            <ChevronDown className="w-5 h-5 animate-scroll-hint" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
