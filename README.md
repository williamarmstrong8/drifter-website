# Destination Drifters

Travel journal and films, built on Next.js 16 (App Router) with React 19, TypeScript (strict) and
Tailwind CSS. Every page is statically generated.

## Setup

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (Turbopack)
npm run start      # serve the production build
npm run lint
npm run typecheck
```

### Environment

| Variable              | Purpose |
| --------------------- | ------- |
| `SITE_URL`            | Canonical origin for metadata, `sitemap.xml`, `robots.txt` and JSON-LD, e.g. `https://example.com`. Falls back to the Vercel production URL, then `http://localhost:3000`. |
| `BUTTONDOWN_API_KEY`  | Enables the newsletter form (Buttondown). Without it the form politely says sign-ups open soon. To use another provider, edit `src/app/actions/newsletter.ts`. |

## Structure

```
src/
  app/
    layout.tsx                 fonts, header/footer shell, page transitions, Organization JSON-LD
    (marketing)/               /, /about, /destinations, /films
    (journal)/journal/         index and /journal/[id] (static, one page per entry)
    actions/newsletter.ts      server action for sign-ups
    sitemap.ts, robots.ts, not-found.tsx, globals.css (design tokens + motion system)
  components/
    shell/      header + full-screen menu, footer, newsletter form, Wordmark
    motion/     Lines (text reveal), RevealObserver, useScrollProgress
    media/      Photo (blur placeholders), FilmFacade (YouTube on demand), AmbientVideo
    home/ journal/ destinations/
  data/         journalEntries.ts, films.ts, media.ts (hero frames + hero film)
  lib/          journal/destination helpers, blur placeholders, site config, nav
```

## Design system

All tokens are CSS variables in `src/app/globals.css`; `tailwind.config.ts` only maps onto them.

- **Color.** Night moss `ink` (#0E1311) and sand `paper` (#EEE8DD) surfaces, with `stone`, `moss`,
  `water` and `dusk` in support and one accent, `ember` (#E8572A). On paper, the accent uses
  `ember-deep` (#A33614) so it passes AA. Wrap sections in `.surface-ink` or `.surface-paper`; that
  sets text, line, muted and accent colors together. Add `data-nav="paper"` to light sections so the
  header switches to dark text over them.
- **Type.** Archivo (variable width axis) for display and UI, Newsreader for reading and italic
  accents. Fluid sizes `text-step--2` … `text-step-6`. Classes: `.display` (condensed uppercase),
  `.display-wide`, `.accent-serif` (italic word inside a display line), `.label` (micro caps).
  `<Wordmark>` sets uppercase type to exactly fill its container's width.
- **Space.** `container-x` (gutter), `py-section`, `h-nav`, `max-w-measure` (68ch).
- **Text over images.** Always add a scrim (`.scrim-bottom` or `.scrim-full`).

### Motion

Four easings (`--ease-glide`, `--ease-drift`, `--ease-snap`, linear for scroll-linked) and five
durations (`--dur-1`…`--dur-5`). One of each pattern, used everywhere:

| Pattern | How |
| --- | --- |
| Text reveal | `<Lines lines={[...]} />` — each line rises out of a mask. Add `onLoad` above the fold. |
| Image reveal | `<Photo reveal … />` — a curtain rise. |
| Fade | `data-reveal="fade"` on any element; stagger with `style={{ "--i": n }}`. |
| Hover | `.link-wipe` for text links, `.hover-media` for images. |
| Page transition | React `<ViewTransition>` in the root layout; story photos morph into the post hero. |
| Scroll-linked | `useScrollProgress(ref)` writes `--p` (0→1); drive transforms from it in CSS. |

Only `transform` and `opacity` animate. No animation library is used: CSS plus the two small hooks
cover every effect. Reveal start states apply only under `@media (scripting: enabled)`, so content is
never hidden without JavaScript. `prefers-reduced-motion` collapses all durations, disables scroll
scrubbing (the destinations journey becomes a swipeable row) and stops the hero slideshow.
Blog posts and the journal index have no scroll-driven motion.

## Content

### Add a journal post
1. Put photos in `public/journal/<slug>/`.
2. Add an entry to `src/data/journalEntries.ts`. `id` is the URL (`/journal/<id>`); never change an
   existing one without adding a redirect. Set `region` and, to appear on the globe and journey,
   `coordinates`.
3. If `location` is generic ("Study Abroad", "Europe"), add a short display name in
   `shortNames` in `src/lib/journal.ts`.

The page, metadata, Open Graph tags, Article JSON-LD, sitemap entry, index row and journey stop are
generated from the entry.

### Add a film
Add it to `src/data/films.ts` with its YouTube ID. Set `journalId` to show it inside that story.

### Use real video in the home hero
Upload short loops (AV1/WebM plus an MP4 fallback, and a lighter mobile cut) to a video host or
Vercel Blob, then fill in `heroFilm` in `src/data/media.ts`. The hero switches from the photo
sequence to `<AmbientVideo>`, which plays only on screen, respects reduced motion and data saver,
and has a pause control.

### Add a page
Create `src/app/(marketing)/<name>/page.tsx`, export `metadata` with a canonical URL, add it to
`src/lib/nav.ts` if it belongs in the menu, and add it to `src/app/sitemap.ts`.

## URLs

All URLs from the previous site are preserved: `/`, `/journal`, `/journal/<id>`, `/destinations`,
`/about`. `/films` is new. Unknown paths return a real 404.
