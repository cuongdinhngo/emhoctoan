import React from 'react';

// One consistent geometric icon set (strokeWidth 2.5, round caps). Used for
// status semantics that must NOT rely on color or emoji alone (colorblind
// a11y). On-brand and minimal — see DESIGN.md.

type IconProps = {
  className?: string;
  size?: number;
  'aria-hidden'?: React.AriaAttributes['aria-hidden'];
};

const svgBase = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
};

const make = (path: React.ReactNode) => {
  const Icon: React.FC<IconProps> = ({ className, size = 24, ...rest }) => (
    <svg className={className} width={size} height={size} {...svgBase} aria-hidden={rest['aria-hidden'] ?? true}>
      {path}
    </svg>
  );
  return Icon;
};

export const CheckIcon = make(<path d="M20 6 9 17l-5-5" />);
export const XIcon = make(<path d="M18 6 6 18M6 6l12 12" />);
export const DotIcon = make(<circle cx="12" cy="12" r="6" />);
export const MarkerIcon = make(<><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></>);
export const MenuIcon = make(<path d="M4 6h16M4 12h16M4 18h16" />);
export const ChevronDownIcon = make(<path d="m6 9 6 6 6-6" />);
export const RefreshIcon = make(<path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v4h-4" />);
export const SparkIcon = make(<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />);
