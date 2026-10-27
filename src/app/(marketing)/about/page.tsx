import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Photo from "@/components/media/Photo";
import Lines from "@/components/motion/Lines";
import Wordmark from "@/components/shell/Wordmark";
import { films } from "@/data/films";
import { getEntries } from "@/lib/journal";

export const metadata: Metadata = {
  title: "About",
  description:
    "We document the spaces between destinations, the quiet moments, and the stories that shape us.",
  alternates: { canonical: "/about" },
};

const moments = [
  { src: "/journal/adjusting-to-abroad-lifestyle/karoake.jpg", alt: "Friends singing karaoke in Prague", className: "md:col-span-5 md:row-span-2 aspect-[4/5]" },
  { src: "/journal/breaking-boundaries-solo-trip-cinque-terre/new-friends-2.jpeg", alt: "New friends met while traveling solo in Italy", className: "md:col-span-4 md:col-start-7 aspect-[3/2] md:mt-24" },
  { src: "/journal/croatia-coast-favorite-warm-weather-destination/backflip.JPG", alt: "A backflip off the rocks into the Adriatic", className: "md:col-span-3 aspect-[3/4] md:-mt-10" },
  { src: "/journal/favorite-weekend-trips-abroad/morocoo-camel-ride.jpeg", alt: "A camel ride in the Moroccan desert", className: "md:col-span-4 md:col-start-6 aspect-square" },
  { src: "/journal/favorite-weekend-trips-abroad/trampoline-jump-copenhagen.JPG", alt: "Jumping on a harbor trampoline in Copenhagen", className: "md:col-span-3 aspect-[4/5] md:mt-32" },
];

export default function AboutPage() {
  const entries = getEntries();

  // Writers and how many stories each has filed, straight from the journal.
  const writers = Object.values(
    entries.reduce<Record<string, { name: string; avatar: string; count: number }>>((acc, entry) => {
      const current = acc[entry.author.name] ?? { name: entry.author.name, avatar: entry.author.avatar, count: 0 };
      current.count += 1;
      acc[entry.author.name] = current;
      return acc;
    }, {}),
  );
  const pins = new Set(entries.flatMap((e) => (e.coordinates ? `${e.coordinates.lat},${e.coordinates.lng}` : [])));

  const stats = [
    { value: entries.length, label: "Stories filed" },
    { value: films.length, label: "Films" },
    { value: pins.size, label: "Pins on the map" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[100svh] min-h-[36rem] overflow-hidden" aria-labelledby="about-title">
        <Photo src="/about/hero.jpeg" alt="" fill preload sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="container-x relative flex h-full flex-col justify-between pb-10 pt-[calc(var(--nav-h)+2rem)] text-paper">
          <div className="flex justify-between">
            <p className="label">About</p>
            <p className="label text-right">Yellowstone, 44.4605° N</p>
          </div>
          <div>
            <h1 id="about-title" className="sr-only">
              We are drifters
            </h1>
            <Lines as="p" className="font-serif text-step-4 italic" lines={["We are"]} onLoad />
            <Wordmark text="DRIFTERS" cut="condensed" className="mt-2" />
          </div>
        </div>
      </section>

      {/* Story: text set against off-grid images */}
      <section className="surface-paper py-section" data-nav="paper" aria-labelledby="story-title">
        <div className="container-x grid gap-y-14 md:grid-cols-12 md:gap-x-8">
          <p className="label text-accent md:col-span-12">(01) Our story</p>
          <Lines
            as="h2"
            id="story-title"
            className="display text-step-5 md:col-span-9"
            lines={["Born from", <span key="w" className="accent-serif lowercase">wanderlust</span>]}
          />

          <div className="md:col-span-4 md:col-start-1 md:row-span-2">
            <div className="relative aspect-[3/4]">
              <Photo src="/about/yosemite.jpeg" alt="Granite walls of Yosemite Valley" fill reveal sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
          </div>

          <div className="space-y-6 font-serif text-step-1 leading-relaxed md:col-span-6 md:col-start-6">
            <p className="text-step-2 italic leading-snug" data-reveal="fade">
              What started as scattered notes in travel journals has become something more: a
              collective memory of places visited, people met, and moments that changed us.
            </p>
            <p data-reveal="fade">
              We&apos;re not travel influencers. We&apos;re documentarians of the human experience,
              capturing the texture of a place, the rhythm of a city, the silence of a mountain trail.
            </p>
            <p data-reveal="fade">
              Every entry is a snapshot of time, a reflection of how travel shapes perspective and how
              perspective shapes travel.
            </p>
            <blockquote className="border-l-2 border-accent pl-6 text-step-2 italic" data-reveal="fade">
              &ldquo;We collect moments, not things. Each journey is a chapter in a story that never ends.&rdquo;
            </blockquote>
          </div>

          <div className="md:col-span-5 md:col-start-8 md:-mt-8">
            <div className="relative aspect-[16/10]">
              <Photo src="/about/snapshot.jpeg" alt="A snapshot from the road" fill reveal sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>

        {/* Numbers, counted from the content itself */}
        <dl className="container-x mt-section grid grid-cols-3 border-t border-line">
          {stats.map((stat) => (
            <div key={stat.label} className="border-r border-line pt-8 last:border-r-0 md:px-6 md:first:pl-0">
              <dt className="label muted">{stat.label}</dt>
              <dd className="display mt-3 text-step-5">{String(stat.value).padStart(2, "0")}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Writers */}
      <section className="container-x py-section" aria-labelledby="writers-title">
        <p className="label mb-6 text-ember">(02) The writers</p>
        <h2 id="writers-title" className="display mb-14 text-step-5">
          Who&apos;s <span className="accent-serif lowercase">writing</span>
        </h2>
        <ul className="grid gap-px bg-line md:grid-cols-2">
          {writers.map((writer) => (
            <li key={writer.name} className="flex items-center gap-6 bg-ink py-8 md:px-8 md:first:pl-0">
              <Image src={writer.avatar} alt="" width={96} height={96} className="h-20 w-20 rounded-full object-cover md:h-24 md:w-24" />
              <div>
                <p className="display text-step-3">{writer.name}</p>
                <p className="label mt-2 text-stone">
                  {writer.count} {writer.count === 1 ? "story" : "stories"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Moments */}
      <section className="container-x pb-section" aria-labelledby="moments-title">
        <p className="label mb-6 text-ember">(03) The journey so far</p>
        <h2 id="moments-title" className="display mb-14 text-step-5">
          Moments <span className="accent-serif lowercase">captured</span>
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
          {moments.map((moment) => (
            <div key={moment.src} className={`relative ${moment.className}`}>
              <Photo src={moment.src} alt={moment.alt} fill reveal sizes="(min-width: 768px) 40vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-section flex flex-col items-start gap-8 border-t border-line pt-14 md:flex-row md:items-end md:justify-between">
          <p className="display text-step-4">
            Join the <span className="accent-serif lowercase">drift</span>
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/journal" className="btn btn-solid">
              Read the journal
            </Link>
            <Link href="/destinations" className="btn btn-ghost">
              <span>Explore destinations</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
