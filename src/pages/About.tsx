import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section - Full Screen with Parallax */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat film-grain"
          style={{
            backgroundImage: `url('/about/hero.jpeg')`,
            transform: "scale(1.1)",
          }}
        >
          {/* Black Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
        </div>

        {/* Floating Content */}
        <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-4xl text-center">
          <p
            className={`font-handwriting text-xl md:text-2xl text-warm-white/70 mb-6 transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            We are drifters
          </p>
          <h1
            className={`font-serif text-5xl md:text-6xl lg:text-8xl text-warm-white leading-[1.1] mb-8 transition-all duration-1000 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Every journey
            <br />
            <span className="italic">leaves a mark</span>
          </h1>
          <p
            className={`text-warm-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light transition-all duration-1000 delay-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            We document the spaces between destinations, the quiet moments, and the stories that shape us.
          </p>
        </div>
      </section>

      {/* Asymmetric Story Section */}
      <section className="py-32 md:py-40 px-6 md:px-12 lg:px-20 bg-card/30">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 md:mb-20">
            <p className="font-handwriting text-xl md:text-2xl text-muted-foreground mb-4">
              Our story
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight max-w-3xl">
              Born from wanderlust
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Large Image - Narrower */}
            <div className="lg:col-span-5 space-y-8">
              <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-sm image-lift">
                <div
                  className="absolute inset-0 bg-cover bg-center film-grain"
                  style={{
                    backgroundImage: `url('/about/yosemite.jpeg')`,
                  }}
                />
                <div className="absolute inset-0 bg-primary/10" />
                {/* Decorative corner element */}
                <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-primary/30" />
              </div>
              
              {/* Quote under image */}
              <div className="relative pl-8 md:pl-12 border-l-2 border-primary/30">
                <p className="font-serif text-xl md:text-2xl text-foreground/70 italic leading-relaxed">
                  "We collect moments, not things. Each journey is a chapter in a story that never ends."
                </p>
              </div>
            </div>

            {/* Text Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Decorative line */}
              <div className="w-20 h-px bg-primary mb-4" />

              <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
                <p className="text-xl md:text-2xl font-serif text-foreground/90 italic">
                  What started as scattered notes in travel journals has become something more—a collective
                  memory of places visited, people met, and moments that changed us.
                </p>
                <p>
                  We're not travel influencers. We're documentarians of the human experience, capturing
                  the texture of a place, the rhythm of a city, the silence of a mountain trail.
                </p>
                <p>
                  Every entry in our almanac is a snapshot of time, a reflection of how travel shapes
                  perspective and how perspective shapes travel.
                </p>
              </div>

              {/* Small Image Break */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm image-lift">
                <div
                  className="absolute inset-0 bg-cover bg-center film-grain"
                  style={{
                    backgroundImage: `url('/about/snapshot.jpeg')`,
                  }}
                />
                <div className="absolute inset-0 bg-primary/5" />
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                <div className="text-center md:text-left">
                  <div className="font-serif text-4xl md:text-5xl text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Destinations</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="font-serif text-4xl md:text-5xl text-primary mb-2">100+</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Stories</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="font-serif text-4xl md:text-5xl text-primary mb-2">∞</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Memories</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Journey - Horizontal Scroll Preview */}
      <section className="py-32 md:py-40 px-6 md:px-12 lg:px-20">
        <div className="mb-12">
          <p className="font-handwriting text-xl text-muted-foreground mb-2">
            The journey so far
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
            Moments captured
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80",
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
          ].map((image, index) => (
            <div
              key={index}
              className={`relative aspect-square overflow-hidden rounded-sm image-lift ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center film-grain"
                style={{ backgroundImage: `url('${image}')` }}
              />
              <div className="absolute inset-0 bg-primary/0 hover:bg-primary/10 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action - Minimal */}
      <section className="py-32 md:py-40 px-6 md:px-12 lg:px-20 border-t border-border">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Join the drift
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Explore our journal, discover destinations, and become part of a community
            that values depth, authenticity, and the stories that travel tells.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              to="/journal"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Read the Journal
            </Link>
            <Link
              to="/destinations"
              className="px-8 py-4 border border-border text-foreground rounded-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              Explore Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-border py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="font-serif text-foreground hover:text-primary transition-colors">
            Destination Drifters
          </Link>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/journal" className="hover:text-foreground transition-colors">
              Journal
            </Link>
            <Link to="/destinations" className="hover:text-foreground transition-colors">
              Destinations
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default About;
