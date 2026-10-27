import type { Metadata } from "next";
import { ViewTransition } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JournalBrowser from "@/components/journal/JournalBrowser";
import Photo from "@/components/media/Photo";
import Lines from "@/components/motion/Lines";
import { getBlurMap } from "@/lib/blur";
import { allRegions, allTags, displayName, getEntriesByDate, toCard } from "@/lib/journal";

export const metadata: Metadata = {
  title: "The Journal",
  description:
    "Stories from the road, moments of wonder, and the quiet discoveries that remind us why we wander.",
  alternates: { canonical: "/journal" },
};

export default async function JournalPage() {
  const [lead, ...rest] = getEntriesByDate();
  const blurs = await getBlurMap(rest.map((entry) => entry.image));
  if (!lead) return null;

  return (
    <>
      <header className="container-x pb-16 pt-[calc(var(--nav-h)+10vh)]">
        <p className="label mb-6 text-ember">Field notes &amp; reflections</p>
        <div className="flex items-end justify-between gap-6">
          <Lines as="h1" className="display text-step-6" lines={["Journal"]} onLoad />
          <p className="display mb-[0.6em] text-step-3 text-stone" aria-label={`${rest.length + 1} stories`}>
            ({String(rest.length + 1).padStart(2, "0")})
          </p>
        </div>
      </header>

      {/* Lead story: full bleed, title over the image. */}
      <section aria-label="Latest story" className="group relative">
        <ViewTransition name={`story-${lead.id}`} share="morph" default="none">
          <div className="hover-media relative h-[85svh] overflow-hidden">
            <Photo src={lead.image} alt="" fill preload sizes="100vw" className="object-cover" />
          </div>
        </ViewTransition>
        <div className="scrim-bottom pointer-events-none absolute inset-0" />
        <div className="container-x absolute inset-x-0 bottom-0 grid items-end gap-8 pb-10 md:grid-cols-12 md:pb-14">
          <div className="md:col-span-8">
            <p className="label mb-4 text-paper">Latest · {lead.region} · {lead.date}</p>
            <h2 className="display text-balance text-step-5 text-paper">
              <Link href={`/journal/${lead.id}`} className="after:absolute after:inset-0">
                {displayName(lead)}
              </Link>
            </h2>
          </div>
          <div className="text-paper md:col-span-4">
            <p className="font-serif text-step-1 italic">{lead.title}</p>
            <p className="label mt-5 inline-flex items-center gap-2 text-ember">
              Read · {lead.readTime}
              <ArrowRight className="h-4 w-4 transition-transform duration-2 ease-snap group-hover:translate-x-1" aria-hidden />
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-section" aria-label="All stories">
        <JournalBrowser cards={rest.map((entry) => toCard(entry, blurs[entry.image]))} tags={allTags} regions={allRegions} />
      </section>
    </>
  );
}
