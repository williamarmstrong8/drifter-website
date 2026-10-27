import { getEntries } from "@/lib/journal";

export interface Destination {
  title: string;
  country: string;
  lat: number;
  lng: number;
  journalId: string;
  image: string;
  excerpt: string;
}

// Globe pins come from journal entries that carry coordinates.
export const getDestinations = (): Destination[] =>
  getEntries().flatMap((entry) =>
    entry.coordinates
      ? [
          {
            lat: entry.coordinates.lat,
            lng: entry.coordinates.lng,
            title: entry.location,
            country: entry.country,
            journalId: entry.id,
            image: entry.image,
            excerpt: entry.excerpt,
          },
        ]
      : [],
  );
