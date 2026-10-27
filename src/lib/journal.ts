import { journalEntries, type JournalEntry, type JournalRegion, type JournalTag } from "@/data/journalEntries";

// The fields list views need. Client components get these instead of full entries so the
// article bodies never ship in the browser bundle.
export type JournalCard = Pick<
  JournalEntry,
  "id" | "title" | "location" | "country" | "date" | "datePosted" | "excerpt" | "image" | "author" | "readTime" | "tags" | "region"
> & { name: string; blur?: string };

export const toCard = (entry: JournalEntry, blur?: string): JournalCard => ({
  id: entry.id,
  title: entry.title,
  location: entry.location,
  country: entry.country,
  date: entry.date,
  datePosted: entry.datePosted,
  excerpt: entry.excerpt,
  image: entry.image,
  author: entry.author,
  readTime: entry.readTime,
  tags: entry.tags,
  region: entry.region,
  name: displayName(entry),
  blur,
});

export const getEntries = () => journalEntries;

export const getEntry = (id: string) => journalEntries.find((entry) => entry.id === id);

export const postedTime = (entry: Pick<JournalEntry, "datePosted">) =>
  new Date(entry.datePosted).getTime();

/** All entries, newest first. */
export const getEntriesByDate = () => [...journalEntries].sort((a, b) => postedTime(b) - postedTime(a));

export const allTags: JournalTag[] = ["Study Abroad", "Europe Guides", "Travel Tips", "Accommodation Reviews"];
export const allRegions: JournalRegion[] = ["Across Europe", "Central Europe", "Mediterranean", "Nordics", "Atlantic Islands"];

/** Stories that share the most tags and region with `entry`, newest first on ties. */
export function getRelated(entry: JournalEntry, count = 3) {
  return getEntriesByDate()
    .filter((other) => other.id !== entry.id)
    .map((other) => ({
      other,
      score: other.tags.filter((tag) => entry.tags.includes(tag)).length + (other.region === entry.region ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ other }) => other);
}

/** The next-older story, wrapping to the newest. */
export function getNextStory(entry: JournalEntry) {
  const ordered = getEntriesByDate();
  const index = ordered.findIndex((other) => other.id === entry.id);
  return ordered[(index + 1) % ordered.length];
}

// Short names for stories whose `location` is generic, condensed from their titles.
const shortNames: Record<string, string> = {
  "favorite-weekend-trips-abroad": "Weekend Trips Abroad",
  "tips-for-weekend-trips-abroad": "Weekend Trip Tips",
  "packing-like-a-pro": "Packing Like a Pro",
  "best-apps-hacks-european-adventures": "Apps & Hacks for Europe",
};

/** The name a story goes by in indexes and large display type. */
export const displayName = (entry: Pick<JournalEntry, "id" | "location">) => shortNames[entry.id] ?? entry.location;

/** Formats coordinates as "44.1625° N, 9.8228° E". */
export const formatCoords = ({ lat, lng }: { lat: number; lng: number }) =>
  `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}, ${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? "E" : "W"}`;
