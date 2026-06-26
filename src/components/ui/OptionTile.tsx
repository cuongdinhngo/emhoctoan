import React from 'react';
import { cx } from './cx';
import { CheckIcon, XIcon } from './icons';

export type OptionState = 'idle' | 'selected' | 'correct' | 'wrong' | 'muted';

interface OptionTileProps {
  state?: OptionState;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

// Multiple-choice answer tile. Correct/wrong are signalled by COLOR + ICON +
// TEXT together (never color alone) so colorblind kids get the same feedback.
const stateStyles: Record<OptionState, string> = {
  idle: 'bg-surface border-line text-ink hover:border-primary hover:bg-primary-soft',
  selected: 'bg-primary-soft border-primary text-ink',
  correct: 'bg-success-soft border-success text-success-ink',
  wrong: 'bg-error-soft border-error text-error-ink',
  muted: 'bg-base border-line text-ink-muted',
};

export const OptionTile: React.FC<OptionTileProps> = ({
  state = 'idle',
  disabled = false,
  onClick,
  children,
  className,
}) => {
  const showCorrect = state === 'correct';
  const showWrong = state === 'wrong';
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={state === 'selected'}
      className={cx(
        'relative flex min-h-touch w-full items-center justify-center gap-2 rounded-lg border-2',
        'px-4 py-4 font-display text-answer font-bold tabular-nums',
        'transition-[transform,background-color,border-color,color] duration-200',
        'focus-visible:outline-none focus-visible:shadow-focus',
        !disabled && 'cursor-pointer active:translate-y-[2px]',
        disabled && 'cursor-default',
        stateStyles[state],
        className,
      )}
    >
      {(showCorrect || showWrong) && (
        <span
          className={cx(
            'absolute left-3 inline-flex h-7 w-7 items-center justify-center rounded-pill text-white',
            showCorrect ? 'bg-success' : 'bg-error',
          )}
        >
          {showCorrect ? <CheckIcon size={18} /> : <XIcon size={18} />}
        </span>
      )}
      <span>{children}</span>
      {(showCorrect || showWrong) && (
        <span className="absolute right-3 text-sm font-semibold font-sans">
          {showCorrect ? 'Đúng' : 'Chưa đúng'}
        </span>
      )}
    </button>
  );
};
