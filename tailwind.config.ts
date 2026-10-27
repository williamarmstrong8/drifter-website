import type { Config } from "tailwindcss";

// Thin mapping onto the CSS tokens in src/app/globals.css. Add tokens there, not here.
const rgb = (token: string) => `rgb(var(--${token}) / <alpha-value>)`;

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: rgb("ink"), raised: rgb("ink-raised") },
        paper: { DEFAULT: rgb("paper"), sunk: rgb("paper-sunk") },
        stone: rgb("stone"),
        moss: rgb("moss"),
        water: rgb("water"),
        dusk: rgb("dusk"),
        ember: { DEFAULT: rgb("ember"), deep: rgb("ember-deep") },
        accent: "rgb(var(--accent))",
        line: "rgb(var(--line, var(--line-on-ink)))",
      },
      fontFamily: {
        sans: ["var(--font-display)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        "step--2": "var(--step--2)",
        "step--1": "var(--step--1)",
        "step-0": "var(--step-0)",
        "step-1": "var(--step-1)",
        "step-2": "var(--step-2)",
        "step-3": "var(--step-3)",
        "step-4": "var(--step-4)",
        "step-5": "var(--step-5)",
        "step-6": "var(--step-6)",
      },
      spacing: {
        gutter: "var(--gutter)",
        section: "var(--section)",
        nav: "var(--nav-h)",
      },
      maxWidth: {
        measure: "var(--measure)",
      },
      zIndex: {
        raised: "var(--z-raised)",
        sticky: "var(--z-sticky)",
        nav: "var(--z-nav)",
        overlay: "var(--z-overlay)",
        toast: "var(--z-toast)",
        cursor: "var(--z-cursor)",
      },
      transitionTimingFunction: {
        glide: "var(--ease-glide)",
        drift: "var(--ease-drift)",
        snap: "var(--ease-snap)",
      },
      transitionDuration: {
        1: "var(--dur-1)",
        2: "var(--dur-2)",
        3: "var(--dur-3)",
        4: "var(--dur-4)",
        5: "var(--dur-5)",
      },
    },
  },
} satisfies Config;
