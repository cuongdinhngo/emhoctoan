import React from 'react';
import { cx } from './cx';

type Variant = 'primary' | 'secondary' | 'success' | 'ghost';
type Size = 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

// Big, tappable button. Always >= 48px tall (min-h-touch) for small fingers.
// Tactile :active push + clear focus ring. All colors come from tokens.
const base =
  'inline-flex items-center justify-center gap-2 font-display font-bold rounded-pill ' +
  'min-h-touch select-none transition-[transform,background-color,box-shadow] duration-200 ' +
  'focus-visible:outline-none focus-visible:shadow-focus active:translate-y-[2px] ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0';

const variants: Record<Variant, string> = {
  primary: 'bg-primary hover:bg-primary-strong text-white shadow-card',
  secondary: 'bg-secondary hover:bg-secondary-strong text-white shadow-card',
  success: 'bg-success hover:bg-success-strong text-white shadow-card',
  ghost: 'bg-surface hover:bg-primary-soft text-ink border-2 border-line',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-3 text-base',
  lg: 'px-7 py-4 text-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...rest
}) => (
  <button
    className={cx(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
    {...rest}
  >
    {children}
  </button>
);
