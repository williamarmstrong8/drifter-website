import type { Metadata } from "next";
import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import ArticleBody from "@/components/journal/ArticleBody";
import ReadingProgress from "@/components/journal/ReadingProgress";
import ShareLinks from "@/components/journal/ShareLinks";
import StoryCard from "@/components/journal/StoryCard";
import FilmFacade from "@/components/media/FilmFacade";
import Photo from "@/components/media/Photo";
import { filmForEntry } from "@/data/films";
import { getBlurMap } from "@/lib/blur";
import { displayName, formatCoords, getEntries, getEntry, getNextStory, getRelated, toCard } from "@/lib/journal";
import { site, siteUrl } from "@/lib/site";

type Props = { params: Promise<{ id: string }> };

// Every post is prerendered at build time; unknown slugs return a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getEntries().map((entry) => ({ id: entry.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getEntry((await params).id);
  if (!entry) return {};

  return {
    title: entry.title,
    description: entry.excerpt,
    authors: [{ name: entry.author.name }],
    alternates: { canonical: `/journal/${entry.id}` },
    openGraph: {
      type: "article",
      title: entry.title,
      description: entry.excerpt,
      publishedTime: new Date(entry.datePosted).toISOString(),
      authors: [entry.author.name],
      tags: entry.tags,
      images: [{ url: entry.image, alt: entry.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.excerpt,
      images: [entry.image],
    },
  };
}

export default async function JournalEntryPage({ params }: Props) {
  const entry = getEntry((await params).id);
  if (!entry) notFound();

  const related = getRelated(entry);
  const next = getNextStory(entry);
  const film = filmForEntry(entry.id);
  const blurs = await getBlurMap(related.map((r) => r.image));
  const url = new URL(`/journal/${entry.id}`, siteUrl).href;
  const { content } = entry;

  return (
    <>
      <ReadingProgress targetId="article" />

      {/* Hero: the card photo morphs into this on navigation. */}
      <header className="relative h-[92svh] min-h-[32rem] overflow-hidden">
        <ViewTransition name={`story-${entry.id}`} share="morph" default="none">
          <div className="absolute inset-0">
            <Photo src={entry.image} alt="" fill preload sizes="100vw" className="object-cover" />
          </div>
        </ViewTransition>
        <div className="absolute inset-0 bg-ink/25" />
        <div className="scrim-bottom absolute inset-0" />
        <div className="container-x relative flex h-full flex-col justify-end pb-10 text-paper md:pb-14">
          <p className="label mb-5">
            <Link href="/journal" className="link-wipe">
              Journal
            </Link>
            <span aria-hidden> / </span>
            {entry.region}
          </p>
          <p className="display text-step-5 text-balance" aria-hidden>
            {displayName(entry)}
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-step-2 italic leading-tight text-balance">{entry.title}</h1>
        </div>
      </header>

      <article id="article" className="surface-paper" data-nav="paper">
        {/* Meta strip */}
        <div className="container-x grid grid-cols-2 gap-6 border-b border-line py-8 md:grid-cols-4">
          <div className="flex items-center gap-3">
            <Image src={entry.author.avatar} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
            <div>
              <p className="label muted">Words</p>
              <p className="text-step--1 font-semibold">{entry.author.name}</p>
            </div>
          </div>
          <div>
            <p className="label muted">Published</p>
            <p className="text-step--1 font-semibold">
              <time dateTime={new Date(entry.datePosted).toISOString()}>{entry.datePosted}</time>
            </p>
          </div>
          <div>
            <p className="label muted">Reading time</p>
            <p className="text-step--1 font-semibold">{entry.readTime}</p>
          </div>
          <div>
            <p className="label muted">{entry.country}</p>
            <p className="text-step--1 font-semibold">{entry.coordinates ? formatCoords(entry.coordinates) : entry.location}</p>
          </div>
        </div>

        <div className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-[14rem_1fr_14rem]">
          {/* Contents rail */}
          {content && content.sections.length > 0 ? (
            <nav aria-label="In this story" className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
              <div>
                <p className="label muted">In this story</p>
                <ol className="mt-4 space-y-2 border-l border-line pl-4">
                  {content.sections.map((section, index) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="block text-step--1 leading-snug hover:text-accent">
                        <span className="label muted mr-2">{String(index + 1).padStart(2, "0")}</span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
          ) : (
            <div />
          )}

          <div className="mx-auto w-full max-w-measure">
            <p className="mb-14 font-serif text-step-2 leading-snug text-pretty">{entry.excerpt}</p>
            {content ? <ArticleBody content={content} /> : null}

            {film && (
              <section className="mt-20" aria-labelledby="film-title">
                <p className="label text-accent" id="film-title">
                  Watch the film · {film.title}
                </p>
                <div className="relative left-1/2 z-raised mt-5 w-[min(100vw_-_2*var(--gutter),64rem)] -translate-x-1/2">
                  <FilmFacade youtubeId={film.youtubeId} title={film.title} sizes="(min-width: 1024px) 64rem, 100vw" showTitle={false} />
                </div>
              </section>
            )}

            <div className="mt-20 flex flex-col gap-6 border-t border-line pt-8">
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span key={tag} className="label rounded-full border border-line px-3 py-1.5">
                    {tag}
                  </span>
                ))}
              </div>
              <ShareLinks url={url} title={entry.title} />
            </div>
          </div>
        </div>

        {/* Related */}
        <section className="container-x border-t border-line py-section" aria-labelledby="related-title">
          <h2 id="related-title" className="display mb-14 text-step-4">
            Keep <span className="accent-serif lowercase">reading</span>
          </h2>
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {related.map((story) => (
              <StoryCard
                key={story.id}
                card={toCard(story, blurs[story.image])}
                aspect="portrait"
                size="sm"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            ))}
          </div>
        </section>
      </article>

      {/* Next story: a full-bleed doorway */}
      {next && (
        <Link href={`/journal/${next.id}`} className="group relative block h-[70svh] overflow-hidden">
          <div className="hover-media absolute inset-0">
            <Photo src={next.image} alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="scrim-full absolute inset-0" />
          <div className="container-x relative flex h-full flex-col justify-end pb-12 text-paper">
            <p className="label inline-flex items-center gap-2">
              Next story <ArrowRight className="h-4 w-4 transition-transform duration-2 group-hover:translate-x-1" aria-hidden />
            </p>
            <p className="display mt-4 text-step-5 text-balance">{displayName(next)}</p>
          </div>
        </Link>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: entry.title,
          description: entry.excerpt,
          image: new URL(entry.image, siteUrl).href,
          datePublished: new Date(entry.datePosted).toISOString(),
          author: { "@type": "Person", name: entry.author.name },
          publisher: {
            "@type": "Organization",
            name: site.name,
            logo: { "@type": "ImageObject", url: new URL(site.logo, siteUrl).href },
          },
          mainEntityOfPage: url,
          url,
          keywords: entry.tags.join(", "),
          contentLocation: { "@type": "Place", name: `${entry.location}, ${entry.country}` },
        }}
      />
    </>
  );
}
