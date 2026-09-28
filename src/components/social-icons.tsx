import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M21 3 10.5 13.5" />
      <path d="M21 3 14.2 21 10.5 13.5 3 9.8 21 3Z" />
    </Base>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="16.2" cy="7.8" r="0.6" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function TiktokIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14 4v10.2a3.2 3.2 0 1 1-2.4-3.1" />
      <path d="M14 4c.3 2.2 2 3.9 4.2 4.1" />
    </Base>
  );
}
