import Image from "next/image";

type PostCoverImageProps = {
  src: string;
  srcDark?: string;
  alt: string;
  sizes: string;
  className?: string;
  /** Порядок загрузки: у первых картинок списка "high", у остальных "low" (грузятся после них). */
  fetchPriority?: "high" | "low" | "auto";
};

/**
 * `<img>` sources can't see the page's CSS variables, so a theme-aware cover
 * illustration ships as two files. Both render; `dark:` classes (same trick
 * as the theme toggle) pick the right one for the site's active theme.
 */
export function PostCoverImage({
  src,
  srcDark,
  alt,
  sizes,
  className = "object-cover",
  fetchPriority,
}: PostCoverImageProps) {
  if (!srcDark) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        fetchPriority={fetchPriority}
        className={className}
      />
    );
  }
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        fetchPriority={fetchPriority}
        className={`${className} dark:hidden`}
      />
      <Image
        src={srcDark}
        alt=""
        fill
        sizes={sizes}
        fetchPriority={fetchPriority}
        className={`hidden ${className} dark:block`}
      />
    </>
  );
}
