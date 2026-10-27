import Image, { type ImageProps } from "next/image";
import { getBlurDataURL } from "@/lib/blur";

type PhotoProps = Omit<ImageProps, "src" | "placeholder" | "blurDataURL"> & {
  src: string;
  /** Wraps the image in the image-reveal curtain. */
  reveal?: boolean;
  frameClassName?: string;
};

/**
 * next/image with a generated blur placeholder. Server component. With `fill`, the frame is
 * positioned absolutely; size it from the parent.
 */
export default async function Photo({ src, alt, reveal = false, frameClassName = "", fill, ...props }: PhotoProps) {
  const blurDataURL = await getBlurDataURL(src);
  const image = (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      {...props}
    />
  );

  if (!reveal) return image;

  return (
    <div data-reveal="image" className={`${fill ? "absolute inset-0" : "relative"} ${frameClassName}`}>
      <div className={fill ? "absolute inset-0" : "relative"}>{image}</div>
    </div>
  );
}
