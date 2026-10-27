import Link from "next/link";
import Image from "next/image";
import FilmFacade from "@/components/media/FilmFacade";
import Lines from "@/components/motion/Lines";
import { films } from "@/data/films";

export default function FilmsTeaser() {
  const [lead, ...rest] = films;
  if (!lead) return null;

  return (
    <section className="py-section" aria-labelledby="films-title">
      <div className="container-x">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="label mb-4 text-ember">(03) Films</p>
            <Lines as="h2" id="films-title" className="display text-step-5" lines={["Moving", <span key="p" className="accent-serif lowercase">pictures</span>]} />
          </div>
          <Link href="/films" className="label link-wipe hidden md:inline">
            All films ({films.length})
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <FilmFacade youtubeId={lead.youtubeId} title={lead.title} sizes="(min-width: 768px) 66vw, 100vw" showTitle={false} />
            <p className="mt-4 flex items-baseline gap-4">
              <span className="label text-stone">01</span>
              <span className="display text-step-2">{lead.title}</span>
            </p>
          </div>
          <ol className="md:col-span-4">
            {rest.map((film, index) => (
              <li key={film.youtubeId} className="border-b border-line first:border-t">
                <Link href={`/films#${film.youtubeId}`} className="group grid grid-cols-[5.5rem_1fr] items-center gap-4 py-4">
                  <span className="hover-media relative block aspect-video overflow-hidden">
                    <Image src={`https://i.ytimg.com/vi/${film.youtubeId}/hqdefault.jpg`} alt="" fill sizes="88px" className="object-cover" />
                  </span>
                  <span>
                    <span className="label block text-stone">{String(index + 2).padStart(2, "0")}</span>
                    <span className="display mt-1 block text-step-1 transition-colors duration-2 group-hover:text-ember">{film.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <Link href="/films" className="label link-wipe mt-10 inline-block md:hidden">
          All films ({films.length})
        </Link>
      </div>
    </section>
  );
}
