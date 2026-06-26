import React from 'react';
import { cx } from './cx';

type Tone = 'primary' | 'secondary' | 'success' | 'error' | 'violet' | 'teal' | 'neutral';

interface BadgeProps {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const tones: Record<Tone, string> = {
  primary: 'bg-primary-soft text-primary-strong',
  secondary: 'bg-secondary-soft text-secondary-strong',
  success: 'bg-success-soft text-success-ink',
  error: 'bg-error-soft text-error-ink',
  violet: 'bg-violet-soft text-violet-ink',
  teal: 'bg-teal-soft text-teal-ink',
  neutral: 'bg-base text-ink-muted',
};

// Small rounded label. Soft tint + readable ink (all WCAG AA pairs).
export const Badge: React.FC<BadgeProps> = ({ tone = 'primary', icon, children, className }) => (
  <span
    className={cx(
      'inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-sm font-semibold font-sans',
      tones[tone],
      className,
    )}
  >
    {icon}
    {children}
  </span>
);
