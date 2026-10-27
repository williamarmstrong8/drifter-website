import Photo from "@/components/media/Photo";
import type { ArticleContent, ArticleNote, ArticlePhoto } from "@/data/journalEntries";

const noteLabels: Record<NonNullable<ArticleNote["type"]>, string> = {
  tip: "Field tip",
  fact: "Good to know",
  reflection: "Reflection",
};

/** One photo, laid out by orientation: landscapes break out full-bleed, portraits sit inset. */
function PhotoBlock({ photo, single }: { photo: ArticlePhoto; single: boolean }) {
  const vertical = photo.orientation === "vertical" || (photo.orientation === undefined && single);
  const square = photo.orientation === "square";
  const alt = photo.alt || photo.caption || "";

  if (vertical || square) {
    return (
      <figure className="mx-auto my-14 w-full max-w-md md:my-20">
        <div className={`relative overflow-hidden ${square ? "aspect-square" : "aspect-[4/5]"}`}>
          <Photo src={photo.url} alt={alt} fill sizes="(min-width: 768px) 448px, 100vw" className="object-cover" />
        </div>
        {photo.caption && <figcaption className="label muted mt-3">{photo.caption}</figcaption>}
      </figure>
    );
  }

  return (
    <figure className="full-bleed relative z-raised my-16 bg-paper md:my-24">
      <div className="relative aspect-[3/2] max-h-[90svh] w-full overflow-hidden md:aspect-[21/10]">
        <Photo src={photo.url} alt={alt} fill sizes="100vw" className="object-cover" />
      </div>
      {photo.caption && <figcaption className="label muted container-x mt-3">{photo.caption}</figcaption>}
    </figure>
  );
}

/** Two or more photos: a wider-than-text pair/grid. */
function PhotoGrid({ photos }: { photos: ArticlePhoto[] }) {
  return (
    <div className="relative left-1/2 z-raised my-16 w-[min(100vw_-_2*var(--gutter),72rem)] -translate-x-1/2 bg-paper md:my-24">
      <div className="grid grid-cols-2 gap-3 md:gap-5">
        {photos.map((photo, index) => (
          <figure key={photo.url} className={photos.length % 2 === 1 && index === 0 ? "col-span-2" : ""}>
            <div className={`relative overflow-hidden ${photos.length % 2 === 1 && index === 0 ? "aspect-[3/2]" : "aspect-[4/5]"}`}>
              <Photo
                src={photo.url}
                alt={photo.alt || photo.caption || ""}
                fill
                sizes="(min-width: 1152px) 576px, 50vw"
                className="object-cover"
              />
            </div>
            {photo.caption && <figcaption className="label muted mt-3">{photo.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  );
}

/**
 * Renders structured article content for reading: a ~68ch measure, numbered section heads,
 * pull quotes and full-bleed photo breaks. No scroll animation in the body.
 */
export default function ArticleBody({ content }: { content: ArticleContent }) {
  return (
    <div className="font-serif text-step-1 leading-[1.7]">
      {content.paragraphs.map((para, index) => {
        const section = content.sections.find((s) => s.id === para.sectionId);
        const isFirstInSection = index === 0 || content.paragraphs[index - 1]?.sectionId !== para.sectionId;
        const sectionNumber = section ? content.sections.indexOf(section) + 1 : 0;

        return (
          <div key={index}>
            {isFirstInSection && section && (
              <h2 id={section.id} className="mb-8 mt-20 first:mt-0 md:mt-28">
                <span className="label block text-accent">{String(sectionNumber).padStart(2, "0")}</span>
                <span className="display mt-3 block text-balance text-step-3">{section.title}</span>
              </h2>
            )}

            <p className="mb-7 whitespace-pre-line text-pretty">{para.content}</p>

            {para.photos && para.photos.length === 1 && para.photos[0] && <PhotoBlock photo={para.photos[0]} single />}
            {para.photos && para.photos.length > 1 && <PhotoGrid photos={para.photos} />}

            {para.quotes?.map((quote, quoteIndex) => (
              <figure key={quoteIndex} className="relative my-16 md:-mx-[12%] md:my-24">
                <span aria-hidden className="mb-6 block h-px w-16 bg-accent" />
                <blockquote className="font-serif text-step-3 italic leading-[1.15] text-balance">
                  &ldquo;{quote.text}&rdquo;
                </blockquote>
                {quote.author && <figcaption className="label muted mt-5">{quote.author}</figcaption>}
              </figure>
            ))}

            {para.notes?.map((note, noteIndex) => (
              <aside key={noteIndex} className="my-10 border-l-2 border-accent bg-paper-sunk/70 px-6 py-5 font-sans text-step-0 leading-relaxed">
                <p className="label mb-2 text-accent">{noteLabels[note.type ?? "reflection"]}</p>
                <p>{note.text}</p>
              </aside>
            ))}
          </div>
        );
      })}
    </div>
  );
}
