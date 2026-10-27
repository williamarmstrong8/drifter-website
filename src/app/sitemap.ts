import type { MetadataRoute } from "next";
import { getEntries, postedTime } from "@/lib/journal";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteUrl).href;
  const entries = getEntries();
  const latestPost = new Date(Math.max(...entries.map(postedTime)));

  return [
    { url: url("/"), lastModified: latestPost, priority: 1 },
    { url: url("/journal"), lastModified: latestPost, priority: 0.9 },
    { url: url("/destinations"), priority: 0.7 },
    { url: url("/films"), priority: 0.6 },
    { url: url("/about"), priority: 0.6 },
    ...entries.map((entry) => ({
      url: url(`/journal/${entry.id}`),
      lastModified: new Date(entry.datePosted),
      priority: 0.8,
    })),
  ];
}
