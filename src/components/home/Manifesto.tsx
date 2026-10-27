import Link from "next/link";
import Lines from "@/components/motion/Lines";
import Photo from "@/components/media/Photo";

/** Brand statement as type-as-image, set off-grid against two small photos. */
export default function Manifesto() {
  return (
    <section className="surface-paper relative overflow-hidden py-section" data-nav="paper" aria-labelledby="manifesto-title">
      <div className="container-x relative grid gap-y-12 md:grid-cols-12">
        <p className="label text-accent md:col-span-12">(01) What we do</p>

        <Lines
          as="h2"
          id="manifesto-title"
          className="display relative z-raised text-step-5 md:col-span-11 md:col-start-2"
          lines={[
            "We document",
            <>
              the <span className="accent-serif lowercase">spaces</span>
            </>,
            <span key="b" className="block md:pl-[18%]">
              between
            </span>,
            "destinations.",
          ]}
        />

        <div className="relative md:col-span-4 md:col-start-2 md:-mt-[6vw]">
          <div className="relative aspect-[4/5] w-2/3 md:w-full">
            <Photo
              src="/about/william-yosemite.jpeg"
              alt="A traveler with arms outstretched above Yosemite Valley"
              fill
              reveal
              sizes="(min-width: 768px) 30vw, 66vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-5 md:col-start-7 md:mt-16">
          <p className="font-serif text-step-2 leading-snug text-pretty" data-reveal="fade">
            Not guides, not listicles. Field notes from the trail and the train platform: the
            texture of a place, the people we met, and what changed us on the way.
          </p>
          <div className="mt-10 flex flex-wrap gap-4" data-reveal="fade" style={{ "--i": 2 } as React.CSSProperties}>
            <Link href="/journal" className="btn btn-ghost">
              <span>Read the journal</span>
            </Link>
            <Link href="/about" className="btn btn-ghost">
              <span>Who we are</span>
            </Link>
          </div>
          <div className="relative ml-auto mt-16 aspect-[3/2] w-3/4">
            <Photo
              src="/journal/stop-thinking-canary-islands/friends-on-dune.JPG"
              alt="Friends crossing a sand dune in the Canary Islands"
              fill
              reveal
              sizes="(min-width: 768px) 30vw, 75vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
