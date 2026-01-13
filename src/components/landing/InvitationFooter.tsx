import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

const InvitationFooter = () => {
  return (
    <footer className="relative pt-32 md:pt-48 pb-16 md:pb-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed film-grain"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-deep-earth/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 text-center">
        <Compass className="w-12 h-12 text-warm-white/40 mx-auto mb-8" />
        
        <p className="font-handwriting text-xl md:text-2xl text-warm-white/60 mb-4">
          The journey continues
        </p>
        
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-warm-white mb-8 max-w-3xl mx-auto leading-tight">
          Every destination has a story.
          <br />
          <span className="italic">What's yours?</span>
        </h2>

        <Link
          to="/journal"
          className="inline-flex items-center gap-3 text-warm-white/80 hover:text-warm-white transition-colors group text-lg"
        >
          <span className="font-medium">Keep drifting</span>
          <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-2xl">
            →
          </span>
        </Link>

        {/* Bottom Links */}
        <div className="mt-24 pt-8 border-t border-warm-white/10">
          <nav className="flex flex-wrap justify-center gap-8 text-warm-white/50 text-sm">
            <Link to="/journal" className="hover:text-warm-white/80 transition-colors">
              Journal
            </Link>
            <Link to="/destinations" className="hover:text-warm-white/80 transition-colors">
              Destinations
            </Link>
            <Link to="/about" className="hover:text-warm-white/80 transition-colors">
              About
            </Link>
          </nav>
          
          <p className="mt-8 text-warm-white/30 text-sm font-handwriting">
            © 2024 Destination Drifters — Made for wanderers, by wanderers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default InvitationFooter;
