// Brand media that isn't tied to a single journal entry.

export interface HeroFrame {
  src: string;
  alt: string;
  place: string;
  coords: string;
}

// The home hero cycles through these until a hero film is set below.
export const heroFrames: HeroFrame[] = [
  { src: "/about/hero2.jpeg", alt: "Friends cycling toward Half Dome", place: "Yosemite Valley", coords: "37.7459° N, 119.5332° W" },
  { src: "/about/snapshot.jpeg", alt: "Two friends in a car's side mirror, one taking a film photo", place: "Sierra Nevada", coords: "38.9399° N, 119.9772° W" },
  { src: "/journal/breaking-boundaries-solo-trip-cinque-terre/coast.jpeg", alt: "Green cliffs dropping into the sea at Cinque Terre", place: "Cinque Terre", coords: "44.1461° N, 9.6439° E" },
  { src: "/journal/favorite-weekend-trips-abroad/croatia-coastline.jpg", alt: "Rocky Croatian coastline over clear blue water", place: "Dalmatian Coast", coords: "42.6507° N, 18.0944° E" },
  { src: "/about/hero.jpeg", alt: "Steam rising off a geyser basin", place: "Yellowstone", coords: "44.4605° N, 110.8281° W" },
];

/**
 * Self-hosted hero film. Leave `null` to use the photo sequence above. When set, the hero plays
 * this muted loop instead (host the files on Vercel Blob or a video CDN, not in the repo).
 * Provide AV1/WebM for modern browsers plus an MP4 fallback, and a lighter mobile cut.
 */
export const heroFilm: null | {
  poster: string;
  sources: { src: string; type: string; media?: string }[];
} = null;
