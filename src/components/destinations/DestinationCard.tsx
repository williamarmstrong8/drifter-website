import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import type { Destination } from "@/lib/destinations";
import { formatCoords } from "@/lib/journal";

interface DestinationCardProps {
  destination: Destination | null;
  onClose: () => void;
}

const DestinationCard = ({ destination, onClose }: DestinationCardProps) => {
  if (!destination) return null;

  return (
    <div className="pointer-events-none absolute left-4 top-4 z-raised w-[min(22rem,calc(100%-2rem))]">
      <div className="surface-paper pointer-events-auto relative overflow-hidden shadow-[var(--shadow-float)]" role="dialog" aria-label={destination.title}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-raised grid h-9 w-9 place-items-center rounded-full bg-paper/85 text-ink backdrop-blur-sm"
          aria-label="Close destination card"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>

        <div className="relative aspect-[3/2]">
          <Image src={destination.image} alt="" fill sizes="352px" className="object-cover" />
        </div>

        <div className="p-5">
          <p className="label muted">{destination.country}</p>
          <p className="display mt-2 text-step-3">{destination.title}</p>
          <p className="mt-3 line-clamp-3 font-serif text-step-0 leading-snug">{destination.excerpt}</p>
          <p className="label muted mt-4">{formatCoords(destination)}</p>
          <Link href={`/journal/${destination.journalId}`} className="btn btn-solid mt-5 w-full justify-between">
            Read the story <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
