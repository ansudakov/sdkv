import Image from "next/image";

type PostCoverImageProps = {
  src: string;
  srcDark?: string;
  alt: string;
  sizes: string;
  className?: string;
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
}: PostCoverImageProps) {
  if (!srcDark) {
    return <Image src={src} alt={alt} fill sizes={sizes} className={className} />;
  }
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`${className} dark:hidden`}
      />
      <Image
        src={srcDark}
        alt=""
        fill
        sizes={sizes}
        className={`hidden ${className} dark:block`}
      />
    </>
  );
}
