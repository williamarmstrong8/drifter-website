import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import type { JournalCard } from "@/lib/journal";

interface StoryCardProps {
  card: JournalCard;
  index?: number;
  /** Aspect of the photo; the magazine grid mixes these. */
  aspect?: "portrait" | "landscape" | "square";
  sizes: string;
  /** Larger title for lead slots. */
  size?: "lg" | "md" | "sm";
  className?: string;
}

const aspects = { portrait: "aspect-[4/5]", landscape: "aspect-[3/2]", square: "aspect-square" };
const titles = { lg: "text-step-4", md: "text-step-3", sm: "text-step-2" };

/** The story card. Its photo morphs into the post hero on navigation (shared view transition). */
export default function StoryCard({ card, index, aspect = "portrait", sizes, size = "md", className = "" }: StoryCardProps) {
  return (
    <article className={`group relative ${className}`}>
      <ViewTransition name={`story-${card.id}`} share="morph" default="none">
        <div className={`hover-media relative overflow-hidden bg-ink-raised ${aspects[aspect]}`}>
          <Image
            src={card.image}
            alt=""
            fill
            sizes={sizes}
            placeholder={card.blur ? "blur" : "empty"}
            blurDataURL={card.blur}
            className="object-cover"
          />
        </div>
      </ViewTransition>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <p className="label muted">
          {index !== undefined && <span className="mr-3">{String(index + 1).padStart(2, "0")}</span>}
          {card.region}
        </p>
        <p className="label muted">{card.date}</p>
      </div>
      <h3 className={`display mt-3 text-balance ${titles[size]}`}>
        <Link href={`/journal/${card.id}`} className="after:absolute after:inset-0">
          <span className="transition-colors duration-2 group-hover:text-accent">{card.name}</span>
        </Link>
      </h3>
      <p className="mt-3 max-w-[46ch] font-serif text-step-1 italic leading-snug">{card.title}</p>
      <p className="label muted mt-4">{card.readTime}</p>
    </article>
  );
}
