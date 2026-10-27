import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FilmFacade from "@/components/media/FilmFacade";
import Lines from "@/components/motion/Lines";
import { films, youtubeChannel } from "@/data/films";
import { displayName, getEntry } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Films",
  description: "Short films from the road by Destination Drifters.",
  alternates: { canonical: "/films" },
};

export default function FilmsPage() {
  return (
    <>
      <header className="container-x grid gap-8 pb-16 pt-[calc(var(--nav-h)+10vh)] md:grid-cols-12">
        <p className="label text-ember md:col-span-12">Moving pictures</p>
        <Lines as="h1" className="display text-step-6 md:col-span-8" lines={["Films"]} onLoad />
        <div className="self-end md:col-span-4" data-reveal="fade-load">
          <p className="font-serif text-step-2 italic leading-snug">What the camera caught between the stories.</p>
          <a href={youtubeChannel} target="_blank" rel="noreferrer" className="label link-wipe mt-6 inline-flex items-center gap-2">
            Subscribe on YouTube <ArrowUpRight className="h-3 w-3" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </header>

      <ol className="container-x space-y-24 pb-section md:space-y-36">
        {films.map((film, index) => {
          const story = film.journalId ? getEntry(film.journalId) : undefined;
          // Alternate width and alignment down the page.
          const wide = index % 3 === 0;
          const right = index % 2 === 1;
          return (
            <li
              key={film.youtubeId}
              id={film.youtubeId}
              className="grid gap-6 md:grid-cols-12"
            >
              <div
                className={
                  wide ? "md:col-span-12" : right ? "md:col-span-8 md:col-start-5" : "md:col-span-8"
                }
                // The first film is above the fold, so it never waits on a scroll reveal.
                data-reveal={index === 0 ? undefined : "fade"}
              >
                <FilmFacade
                  youtubeId={film.youtubeId}
                  title={film.title}
                  sizes={wide ? "100vw" : "(min-width: 768px) 66vw, 100vw"}
                  showTitle={false}
                  preload={index === 0}
                />
                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-4">
                  <h2 className="flex items-baseline gap-4">
                    <span className="label text-stone">{String(index + 1).padStart(2, "0")}</span>
                    <span className="display text-step-3">{film.title}</span>
                  </h2>
                  {story && (
                    <Link href={`/journal/${story.id}`} className="label link-wipe text-ember">
                      Read the story · {displayName(story)}
                    </Link>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
