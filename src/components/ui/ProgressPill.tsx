import React from 'react';
import { cx } from './cx';

interface ProgressPillProps {
  current: number;
  total: number;
  className?: string;
}

// "Câu x / y" with a slim progress track. Number is large + display font so
// kids can read where they are at a glance.
export const ProgressPill: React.FC<ProgressPillProps> = ({ current, total, className }) => {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div className={cx('flex items-center gap-3', className)}>
      <span className="font-display font-bold text-ink whitespace-nowrap tabular-nums">
        Câu <span className="text-primary text-xl">{current}</span>
        <span className="text-ink-muted"> / {total}</span>
      </span>
      <div
        className="relative h-3 flex-1 min-w-[80px] rounded-pill bg-primary-soft overflow-hidden"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Câu ${current} trên ${total}`}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-pill bg-primary transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};
