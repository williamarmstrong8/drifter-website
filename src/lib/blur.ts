import "server-only";
import path from "node:path";
import sharp from "sharp";

const cache = new Map<string, Promise<string | undefined>>();

/**
 * Tiny blurred preview of a local `/public` image for next/image's `blurDataURL`.
 * Runs at build time for the static pages; remote images get no placeholder.
 */
export function getBlurDataURL(src: string): Promise<string | undefined> {
  if (!src.startsWith("/")) return Promise.resolve(undefined);

  let pending = cache.get(src);
  if (!pending) {
    pending = sharp(path.join(process.cwd(), "public", src))
      .rotate()
      .resize(16, 16, { fit: "inside" })
      .webp({ quality: 40 })
      .toBuffer()
      .then((buffer) => `data:image/webp;base64,${buffer.toString("base64")}`)
      .catch(() => undefined);
    cache.set(src, pending);
  }
  return pending;
}

/** Resolves blur placeholders for a list of image paths, keyed by path. */
export async function getBlurMap(srcs: string[]): Promise<Record<string, string>> {
  const entries = await Promise.all(
    [...new Set(srcs)].map(async (src) => [src, await getBlurDataURL(src)] as const),
  );
  return Object.fromEntries(entries.filter((entry): entry is readonly [string, string] => !!entry[1]));
}
