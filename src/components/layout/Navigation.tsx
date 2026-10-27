"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/journal", label: "Journal" },
  { to: "/destinations", label: "Destinations" },
  { to: "/about", label: "About" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isAboutPage = pathname === "/about";
  const isJournalEntryPage = pathname.startsWith("/journal/");
  const hasTransparentNav = (isHomePage || isAboutPage || isJournalEntryPage) && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection("up");
      }

      lastScrollY.current = currentScrollY;
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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
          href="/"
          className={`flex items-center gap-2 font-serif text-lg md:text-xl transition-colors ${baseStyles}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- small SVG, nothing for the optimizer to do */}
          <img
            src="/drifters-logo-web.svg"
            alt="Destination Drifters Logo"
            width={40}
            height={40}
            className="h-8 w-8 md:h-10 md:w-10 transition-colors"
            style={{
              filter: hasTransparentNav ? "brightness(0) invert(1)" : "brightness(0)",
            }}
          />
          Destination Drifters
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              aria-current={pathname === link.to ? "page" : undefined}
              className={`text-sm uppercase tracking-wider transition-colors ${baseStyles} ${
                pathname === link.to ? "font-medium" : ""
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
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        inert={!isMobileMenuOpen}
        className={`md:hidden absolute top-full left-0 right-0 bg-background shadow-lg transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              onClick={closeMobileMenu}
              aria-current={pathname === link.to ? "page" : undefined}
              className={`block text-foreground/80 hover:text-foreground transition-colors ${
                pathname === link.to ? "font-medium text-primary" : ""
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
