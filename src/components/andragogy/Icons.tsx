import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function baseProps({ size = 20, className, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true as const,
    ...rest,
  };
}

export function SparkIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
      <circle cx="12" cy="12" r="3.25" />
    </svg>
  );
}

export function GateIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4 20V6.5L12 3l8 3.5V20" />
      <path d="M9 20v-6h6v6" />
      <path d="M9 11h6" />
    </svg>
  );
}

export function ProgressIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4 19V9M10 19V5M16 19v-7M20 19v-3" />
    </svg>
  );
}

export function QuizIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M9 9a3 3 0 1 1 4.2 2.75c-.8.4-1.2.95-1.2 1.75V14" />
      <circle cx="12" cy="17.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

export function TrophyIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M8 4h8v3a4 4 0 0 1-8 0V4Z" />
      <path d="M8 5H5.5A2.5 2.5 0 0 0 5.5 10H8" />
      <path d="M16 5h2.5A2.5 2.5 0 0 1 18.5 10H16" />
      <path d="M10 14h4v2.5a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2V14Z" />
      <path d="M8 20h8" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16.5H7.5A2.5 2.5 0 0 0 5 22V5.5Z" />
      <path d="M5 19.5A2.5 2.5 0 0 1 7.5 17H19" />
    </svg>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 3.5 3.5 8 12 12.5 20.5 8 12 3.5Z" />
      <path d="M3.5 12.5 12 17l8.5-4.5" />
      <path d="M3.5 16.5 12 21l8.5-4.5" />
    </svg>
  );
}
