interface WordmarkProps {
  text: string;
  className?: string;
  /** Expanded or condensed display cut. */
  cut?: "wide" | "condensed";
}

// Average uppercase advance per em for each cut, so the font size lands close to the target
// width before textLength makes the final, tiny correction (no visible glyph distortion).
const ADVANCE = { wide: 0.8, condensed: 0.5 };
const CAP_HEIGHT = 0.72;

/**
 * Uppercase type that exactly fills its container's width at any viewport, via SVG textLength.
 * Decorative: pair it with real text for assistive tech.
 */
export default function Wordmark({ text, className = "", cut = "wide" }: WordmarkProps) {
  const width = 1000;
  const fontSize = width / (text.length * ADVANCE[cut]);
  const height = fontSize * CAP_HEIGHT;

  return (
    <svg
      viewBox={`0 0 ${width} ${height.toFixed(1)}`}
      className={`block w-full overflow-visible ${className}`}
      aria-hidden
      focusable="false"
    >
      <text
        x="0"
        y={height.toFixed(1)}
        textLength={width}
        lengthAdjust="spacingAndGlyphs"
        fill="currentColor"
        className={cut === "wide" ? "display-wide" : "display"}
        style={{ fontSize, lineHeight: 1 }}
      >
        {text}
      </text>
    </svg>
  );
}
