import type { CSSProperties, ElementType, ReactNode } from "react";

interface LinesProps {
  /** One entry per visual line. Each rises out of its own mask, staggered. */
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  /** Offsets the stagger, e.g. to follow another reveal. */
  delay?: number;
  id?: string;
  /** Spoken text, when the visual lines split words. */
  ariaLabel?: string;
  /** Animate on page load (CSS only) instead of on scroll. Use above the fold. */
  onLoad?: boolean;
}

/** The text-reveal style. Line breaks are authored, not measured, so the HTML is final on the server. */
export default function Lines({ lines, as: Tag = "p", className, delay = 0, id, ariaLabel, onLoad = false }: LinesProps) {
  return (
    <Tag className={className} data-reveal={onLoad ? "lines-load" : "lines"} id={id} aria-label={ariaLabel}>
      {lines.map((line, index) => (
        <span className="line" key={index} aria-hidden={ariaLabel ? true : undefined}>
          <span style={{ "--i": index + delay } as CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
