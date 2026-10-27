import type { Metadata } from "next";
import Link from "next/link";
import DestinationsExplorer from "@/components/destinations/DestinationsExplorer";
import JourneyTrack from "@/components/destinations/JourneyTrack";
import Lines from "@/components/motion/Lines";
import { getBlurMap } from "@/lib/blur";
import { getDestinations } from "@/lib/destinations";
import { displayName, formatCoords, getEntriesByDate } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Every place we've written about, in the order we found them, plus a globe of the whole journey.",
  alternates: { canonical: "/destinations" },
};

export default async function DestinationsPage() {
  // Only stories tied to a place belong on the route.
  const chronological = getEntriesByDate().filter((entry) => entry.coordinates).reverse();
  const destinations = getDestinations();
  const blurs = await getBlurMap(chronological.map((entry) => entry.image));

  const stops = chronological.map((entry) => ({
    id: entry.id,
    name: displayName(entry),
    country: entry.country,
    date: entry.date,
    coords: entry.coordinates ? formatCoords(entry.coordinates) : entry.region,
    image: entry.image,
    blur: blurs[entry.image],
  }));

  return (
    <>
      <header className="container-x grid gap-8 pb-12 pt-[calc(var(--nav-h)+10vh)] md:grid-cols-12">
        <p className="label text-ember md:col-span-12">The route so far</p>
        <Lines
          as="h1"
          className="display whitespace-nowrap text-[length:min(var(--step-6),calc((100vw-2*var(--gutter))/5.9))] md:col-span-12"
          ariaLabel="Destinations"
          onLoad
          lines={["Destinations"]}
        />
        <p className="font-serif text-step-2 italic leading-snug md:col-span-5 md:col-start-8" data-reveal="fade-load">
          {stops.length} stops, from {stops[0]?.date} to {stops.at(-1)?.date}. Keep scrolling to travel the route.
        </p>
      </header>

      <section aria-label="Journey, oldest to newest">
        <JourneyTrack stops={stops} />
      </section>

      <section className="py-section" aria-labelledby="atlas-title">
        <div className="container-x mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label mb-4 text-ember">The atlas</p>
            <h2 id="atlas-title" className="display text-step-5">
              Spin the <span className="accent-serif lowercase">globe</span>
            </h2>
          </div>
          <p className="max-w-sm text-stone">Drag to turn it. Pick a glowing pin to open that story.</p>
        </div>
        <div className="container-x">
          <DestinationsExplorer destinations={destinations} />
        </div>

        {/* The globe isn't keyboard-navigable; this list is the accessible equivalent. */}
        <nav aria-label="Destinations on the globe" className="sr-only">
          <ul>
            {destinations.map((destination) => (
              <li key={destination.journalId}>
                <Link href={`/journal/${destination.journalId}`}>
                  {destination.title}, {destination.country}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </>
  );
}
