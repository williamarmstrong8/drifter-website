import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/journal", label: "Journal" },
    { to: "/destinations", label: "Destinations" },
    { to: "/about", label: "About" },
  ];

  const baseStyles = isHomePage && !isScrolled
    ? "text-warm-white/80 hover:text-warm-white"
    : "text-foreground/80 hover:text-foreground";

  const bgStyles = isScrolled
    ? "bg-background/95 backdrop-blur-md shadow-sm"
    : isHomePage
    ? "bg-transparent"
    : "bg-background";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgStyles}`}
    >
      <div className="px-6 md:px-12 lg:px-20 py-4 md:py-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={`font-serif text-lg md:text-xl transition-colors ${baseStyles}`}
        >
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
