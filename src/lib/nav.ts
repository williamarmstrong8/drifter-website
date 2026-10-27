export interface NavItem {
  href: string;
  label: string;
  /** Preview shown beside the link in the full-screen menu. */
  preview: string;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Home", preview: "/about/hero2.jpeg" },
  { href: "/journal", label: "Journal", preview: "/journal/breaking-boundaries-solo-trip-cinque-terre/best-coast-shot.jpeg" },
  { href: "/destinations", label: "Destinations", preview: "/journal/favorite-weekend-trips-abroad/croatia-coastline.jpg" },
  { href: "/films", label: "Films", preview: "/journal/stop-thinking-canary-islands/friends-on-dune.JPG" },
  { href: "/about", label: "About", preview: "/about/william-yosemite.jpeg" },
];

export const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
