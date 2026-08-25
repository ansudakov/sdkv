import type { SVGProps } from "react";
import type { IconKey } from "@/lib/site";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

function TimewebIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 4v1.6M4.6 9H6M13.6 5.4l-1 1.1M4 13.5v-.02" />
      <circle cx="9.4" cy="8.6" r="2.4" />
      <path d="M7.2 17.5h9.8a3 3 0 0 0 .3-5.98A4.2 4.2 0 0 0 9.4 10 3.6 3.6 0 0 0 7.2 17.5Z" />
    </Base>
  );
}

function HostmanIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="5" y="8.5" width="14" height="9.5" rx="3" />
      <path d="M12 8.5V5.3M9.8 5.3h4.4" />
      <circle cx="9.6" cy="13.2" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.4" cy="13.2" r="1" fill="currentColor" stroke="none" />
      <path d="M9.5 16.2h5" />
    </Base>
  );
}

function AlfaIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 4.2 6.2 19.6M12 4.2l5.8 15.4M8.5 14.8h7" />
    </Base>
  );
}

function TbankIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="7.2" />
      <circle cx="9.3" cy="9.8" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="14.2" cy="13.6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="9.2" r="0.6" fill="currentColor" stroke="none" />
    </Base>
  );
}

function YandexIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3.6 19.5 8v8L12 20.4 4.5 16V8L12 3.6Z" />
      <path d="M4.7 8 12 12.3 19.3 8M12 12.3V20.2" />
    </Base>
  );
}

function AlpinaIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M19.8 4.2c-6.6 0-12.3 4.8-13.3 12.4l13.3-12.4Z" />
      <path d="M11 16.6 5.6 22M13.2 12.9l-3 3M16.3 9.7l-3 3" />
    </Base>
  );
}

function SkillboxIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="5" y="5" width="14" height="14" rx="3.2" />
      <path d="M9 15V9h6" />
    </Base>
  );
}

function VkIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3.6 14.4 8.7 20 9.3 15.8 13.1 17 18.7 12 15.8 7 18.7 8.2 13.1 4 9.3 9.6 8.7 12 3.6Z" />
    </Base>
  );
}

function CommunicatorIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 10.2v3.6h3.2l6 3.8V6.4l-6 3.8H4Z" />
      <path d="M16.2 9.4a4 4 0 0 1 0 5.2M18.7 7.3a7.4 7.4 0 0 1 0 9.4" />
    </Base>
  );
}

export const workIcons: Record<IconKey, (props: IconProps) => React.ReactElement> = {
  timeweb: TimewebIcon,
  hostman: HostmanIcon,
  alfa: AlfaIcon,
  tbank: TbankIcon,
  yandex: YandexIcon,
  alpina: AlpinaIcon,
  skillbox: SkillboxIcon,
  vk: VkIcon,
  communicator: CommunicatorIcon,
};

export function WorkIcon({
  icon,
  className,
}: {
  icon: IconKey;
  className?: string;
}) {
  const Cmp = workIcons[icon];
  return <Cmp className={className} />;
}
