import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";
  const isJournalEntryPage = location.pathname.startsWith("/journal/") && location.pathname !== "/journal";
  const hasTransparentNav = (isHomePage || isAboutPage || isJournalEntryPage) && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setScrollDirection("up");
      }
      
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/journal", label: "Journal" },
    { to: "/destinations", label: "Destinations" },
    { to: "/about", label: "About" },
  ];

  const baseStyles = hasTransparentNav
    ? "text-warm-white/80 hover:text-warm-white"
    : "text-foreground/80 hover:text-foreground";

  const bgStyles = isScrolled
    ? "bg-background/95 backdrop-blur-md shadow-sm"
    : hasTransparentNav
    ? "bg-transparent"
    : "bg-background";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      } ${bgStyles}`}
    >
      <div className="px-6 md:px-12 lg:px-20 py-4 md:py-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={`flex items-center gap-2 font-serif text-lg md:text-xl transition-colors ${baseStyles}`}
        >
          <img
            src="/drifters-logo-web.svg"
            alt="Destination Drifters Logo"
            className={`h-8 w-8 md:h-10 md:w-10 transition-colors`}
            style={{
              filter: hasTransparentNav
                ? "brightness(0) invert(1)"
                : "brightness(0)"
            }}
          />
          Destination Drifters
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm uppercase tracking-wider transition-colors ${baseStyles} ${
                location.pathname === link.to ? "font-medium" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden transition-colors ${baseStyles}`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background shadow-lg transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block text-foreground/80 hover:text-foreground transition-colors ${
                location.pathname === link.to ? "font-medium text-primary" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
