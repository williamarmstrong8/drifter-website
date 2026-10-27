"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface FilmFacadeProps {
  youtubeId: string;
  title: string;
  sizes: string;
  className?: string;
  /** Large label over the poster. */
  showTitle?: boolean;
  /** Preload the poster when it's the page's largest image. */
  preload?: boolean;
}

/**
 * Poster first, YouTube player on demand. Nothing from YouTube loads until the viewer presses
 * play, which keeps pages fast and cookie-free (youtube-nocookie.com).
 */
export default function FilmFacade({ youtubeId, title, sizes, className = "", showTitle = true, preload = false }: FilmFacadeProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`group relative aspect-video overflow-hidden bg-ink-raised ${className}`}>
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&cc_load_policy=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 h-full w-full text-left"
          aria-label={`Play film: ${title}`}
        >
          <span className="hover-media absolute inset-0 block">
            <Image
              src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
              alt=""
              fill
              preload={preload}
              sizes={sizes}
              className="object-cover"
            />
          </span>
          <span className="scrim-bottom absolute inset-0" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-paper/90 text-ink transition-transform duration-2 ease-snap group-hover:scale-110 md:h-20 md:w-20">
              <Play className="ml-1 h-6 w-6 fill-current" aria-hidden />
            </span>
          </span>
          {showTitle && (
            <span className="absolute bottom-0 left-0 p-5 md:p-8">
              <span className="label block text-stone">Film</span>
              <span className="display mt-2 block text-step-3 text-paper">{title}</span>
            </span>
          )}
        </button>
      )}
    </div>
  );
}
