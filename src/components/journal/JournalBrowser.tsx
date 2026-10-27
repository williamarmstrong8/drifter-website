"use client";

import { useMemo, useState } from "react";
import StoryCard from "@/components/journal/StoryCard";
import type { JournalRegion, JournalTag } from "@/data/journalEntries";
import type { JournalCard } from "@/lib/journal";

interface JournalBrowserProps {
  cards: JournalCard[];
  tags: JournalTag[];
  regions: JournalRegion[];
}

// Magazine rhythm: column spans, vertical offsets and photo shapes repeat every four cards.
const layout = [
  { col: "md:col-span-7", offset: "", aspect: "landscape", size: "lg", sizes: "(min-width: 768px) 58vw, 100vw" },
  { col: "md:col-span-4 md:col-start-9", offset: "md:mt-40", aspect: "portrait", size: "md", sizes: "(min-width: 768px) 33vw, 100vw" },
  { col: "md:col-span-4 md:col-start-2", offset: "md:-mt-16", aspect: "portrait", size: "md", sizes: "(min-width: 768px) 33vw, 100vw" },
  { col: "md:col-span-6 md:col-start-7", offset: "md:mt-24", aspect: "square", size: "md", sizes: "(min-width: 768px) 50vw, 100vw" },
] as const;

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  counts,
}: {
  label: string;
  options: T[];
  value: T | null;
  onChange: (value: T | null) => void;
  counts: Record<string, number>;
}) {
  return (
    <fieldset className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
      <legend className="label muted mb-3 w-full">{label}</legend>
      {[null, ...options].map((option) => {
        const selected = value === option;
        return (
          <button
            key={option ?? "all"}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option)}
            className={`display text-step-2 transition-colors duration-2 ease-snap ${
              selected ? "text-ember" : "text-paper/45 hover:text-paper"
            }`}
          >
            {option ?? "All"}
            <sup className="label ml-1 align-super">{option ? counts[option] ?? 0 : counts.all}</sup>
          </button>
        );
      })}
    </fieldset>
  );
}

/** Category and region filters over a magazine-style grid. */
export default function JournalBrowser({ cards, tags, regions }: JournalBrowserProps) {
  const [tag, setTag] = useState<JournalTag | null>(null);
  const [region, setRegion] = useState<JournalRegion | null>(null);

  const filtered = useMemo(
    () => cards.filter((card) => (!tag || card.tags.includes(tag)) && (!region || card.region === region)),
    [cards, tag, region],
  );

  const tagCounts = useMemo(() => {
    const pool = cards.filter((card) => !region || card.region === region);
    return Object.fromEntries([["all", pool.length], ...tags.map((t) => [t, pool.filter((c) => c.tags.includes(t)).length])]);
  }, [cards, tags, region]);

  const regionCounts = useMemo(() => {
    const pool = cards.filter((card) => !tag || card.tags.includes(tag));
    return Object.fromEntries([["all", pool.length], ...regions.map((r) => [r, pool.filter((c) => c.region === r).length])]);
  }, [cards, regions, tag]);

  return (
    <div>
      <div className="grid gap-10 border-y border-line py-10 md:grid-cols-2">
        <FilterGroup label="Category" options={tags} value={tag} onChange={setTag} counts={tagCounts} />
        <FilterGroup label="Region" options={regions} value={region} onChange={setRegion} counts={regionCounts} />
      </div>

      <p className="label muted mt-8" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "story" : "stories"}
        {tag || region ? ` · ${[tag, region].filter(Boolean).join(" · ")}` : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-serif text-step-2 italic">Nothing here yet.</p>
          <button type="button" className="btn btn-ghost mt-8" onClick={() => (setTag(null), setRegion(null))}>
            <span>Clear filters</span>
          </button>
        </div>
      ) : (
        <div className="mt-12 grid gap-x-8 gap-y-20 md:grid-cols-12 md:gap-y-28">
          {filtered.map((card, index) => {
            const slot = layout[index % layout.length]!;
            return (
              <StoryCard
                key={card.id}
                card={card}
                index={index}
                aspect={slot.aspect}
                size={slot.size}
                sizes={slot.sizes}
                className={`${slot.col} ${slot.offset}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
