import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Photo from "@/components/media/Photo";
import type { JournalEntry } from "@/data/journalEntries";
import { displayName } from "@/lib/journal";

/**
 * Selected stories as full-bleed panels that stack: each one is sticky, so the next slides up
 * over it like a cut. Pure CSS; scrolling stays native.
 */
export default function Chapters({ entries }: { entries: JournalEntry[] }) {
  return (
    <section aria-labelledby="chapters-title" className="relative">
      <h2 id="chapters-title" className="sr-only">
        Selected stories
      </h2>
      {entries.map((entry, index) => (
        <article
          key={entry.id}
          className="group sticky top-0 h-[100svh] overflow-hidden bg-ink"
          aria-labelledby={`chapter-${entry.id}`}
        >
          <div className="hover-media absolute inset-0">
            <Photo src={entry.image} alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-ink/30" />
          <div className="scrim-bottom absolute inset-0" />

          <div className="container-x relative flex h-full flex-col justify-between pb-10 pt-[calc(var(--nav-h)+1.5rem)] md:pb-14">
            <div className="flex items-start justify-between gap-6 text-paper">
              <p className="label">
                Chapter {String(index + 1).padStart(2, "0")} / {String(entries.length).padStart(2, "0")}
              </p>
              <p className="label text-right">
                {entry.country}
                <br />
                {entry.date}
              </p>
            </div>

            <div className="grid items-end gap-8 md:grid-cols-12">
              <h3 id={`chapter-${entry.id}`} className="display text-balance text-step-5 text-paper md:col-span-9">
                <Link href={`/journal/${entry.id}`} className="after:absolute after:inset-0">
                  {displayName(entry)}
                </Link>
              </h3>
              <div className="relative text-paper md:col-span-3">
                <p className="font-serif text-step-1 italic">{entry.title}</p>
                <p className="label mt-5 inline-flex items-center gap-2 text-ember">
                  Read the story
                  <ArrowRight className="h-4 w-4 transition-transform duration-2 ease-snap group-hover:translate-x-1" aria-hidden />
                </p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
