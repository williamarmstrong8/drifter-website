// Films from youtube.com/@Destination_drifters. `journalId` links a film to the story it belongs to.
export interface Film {
  youtubeId: string;
  title: string;
  journalId?: string;
}

export const youtubeChannel = "https://www.youtube.com/@Destination_drifters";

export const films: Film[] = [
  { youtubeId: "lcTgrAmyKkM", title: "Origins" },
  { youtubeId: "wFq2yY71QDc", title: "Surfing San Francisco" },
  { youtubeId: "R73Psft5pe0", title: "California Summer, Caught on Camcorder" },
  { youtubeId: "bP1FjBtjurg", title: "3000 Mile Friendship" },
  {
    youtubeId: "gKhbJz5rF8g",
    title: "Solo Travel Is Different Than Expected",
    journalId: "breaking-boundaries-solo-trip-cinque-terre",
  },
  { youtubeId: "EHkqQNvstGU", title: "Stop Thinking", journalId: "stop-thinking-canary-islands" },
];

export const filmPoster = (film: Film) => `https://i.ytimg.com/vi/${film.youtubeId}/maxresdefault.jpg`;

export const filmForEntry = (journalId: string) => films.find((film) => film.journalId === journalId);
