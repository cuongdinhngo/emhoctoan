import React from 'react';
import { cx } from './cx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section';
  padding?: 'sm' | 'md' | 'lg';
}

const paddings = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-6 md:p-8',
};

// Surface container. One radius (xl) + one soft, ink-tinted shadow across the
// app — see Shape Consistency Lock in DESIGN.md.
export const Card: React.FC<CardProps> = ({
  as: Tag = 'div',
  padding = 'lg',
  className,
  children,
  ...rest
}) => (
  <Tag className={cx('bg-surface rounded-xl shadow-card', paddings[padding], className)} {...rest}>
    {children}
  </Tag>
);
