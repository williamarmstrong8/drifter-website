import type { Metadata } from "next";
import Chapters from "@/components/home/Chapters";
import FilmsTeaser from "@/components/home/FilmsTeaser";
import HomeHero from "@/components/home/HomeHero";
import Manifesto from "@/components/home/Manifesto";
import PlaceIndex from "@/components/home/PlaceIndex";
import Lines from "@/components/motion/Lines";
import { heroFrames } from "@/data/media";
import { getBlurMap } from "@/lib/blur";
import { displayName, getEntries, getEntry, postedTime } from "@/lib/journal";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Editors' picks for the stacked chapters, in order.
const chapterIds = [
  "croatia-coast-favorite-warm-weather-destination",
  "breaking-boundaries-solo-trip-cinque-terre",
  "stop-thinking-canary-islands",
  "exploring-authentic-cultures-turkey-greece",
];

export default async function HomePage() {
  const entries = [...getEntries()].sort((a, b) => postedTime(b) - postedTime(a));
  const chapters = chapterIds.flatMap((id) => getEntry(id) ?? []);
  const blurs = await getBlurMap([...heroFrames.map((f) => f.src), ...entries.map((e) => e.image)]);

  const rows = entries.map((entry) => ({
    id: entry.id,
    place: displayName(entry),
    country: entry.country,
    date: entry.date,
    image: entry.image,
    blur: blurs[entry.image],
  }));

  return (
    <>
      <HomeHero frames={heroFrames} blurs={blurs} storyCount={entries.length} />
      <Manifesto />
      <Chapters entries={chapters} />

      <section className="py-section" aria-labelledby="index-title">
        <div className="container-x">
          <div className="mb-12 grid gap-6 md:grid-cols-12">
            <p className="label text-ember md:col-span-12">(02) Index of places</p>
            <Lines
              as="h2"
              id="index-title"
              className="display text-step-5 md:col-span-8"
              lines={["Every place", <span key="w" className="accent-serif lowercase">we&apos;ve written</span>]}
            />
            <p className="self-end text-stone md:col-span-4" data-reveal="fade">
              {entries.length} stories, newest first. Hover a name to see where it took us.
            </p>
          </div>
          <PlaceIndex rows={rows} />
        </div>
      </section>

      <FilmsTeaser />
    </>
  );
}
