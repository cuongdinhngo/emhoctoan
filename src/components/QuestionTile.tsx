import React from 'react';
import { QuestionListItem } from '../types';
import { CheckIcon, XIcon, DotIcon, MarkerIcon } from './ui/icons';
import { cx } from './ui/cx';

// Shared status rendering for the question navigator (sidebar + mobile drawer).
// Status = icon shape + color + text, so it reads without color (colorblind a11y).
type Status = { icon: React.ReactNode; classes: string; label: string };

function statusFor(q: QuestionListItem): Status {
  if (q.isCurrent) {
    return { icon: <MarkerIcon size={20} />, classes: 'bg-primary-soft border-primary text-primary-strong', label: 'Câu hiện tại' };
  }
  if (q.isAnswered) {
    return q.isCorrect
      ? { icon: <CheckIcon size={20} />, classes: 'bg-success-soft border-success text-success-ink', label: 'Đã trả lời đúng' }
      : { icon: <XIcon size={20} />, classes: 'bg-error-soft border-error text-error-ink', label: 'Đã trả lời sai' };
  }
  return { icon: <DotIcon size={20} />, classes: 'bg-base border-line text-ink-muted', label: 'Chưa trả lời' };
}

export const QuestionTile: React.FC<{ question: QuestionListItem; onSelect: (id: string) => void }> = ({ question, onSelect }) => {
  const s = statusFor(question);
  return (
    <button
      onClick={() => onSelect(question.id)}
      className={cx(
        'flex min-h-touch w-full items-center justify-between rounded-md border-2 p-3 text-left',
        'transition-[transform,background-color,border-color,box-shadow] duration-200',
        'hover:shadow-card focus-visible:outline-none focus-visible:shadow-focus',
        s.classes,
      )}
    >
      <div className="flex items-center gap-3">
        <span aria-hidden="true">{s.icon}</span>
        <span className="font-semibold">Câu {question.questionNumber}</span>
        <span className="sr-only">— {s.label}</span>
      </div>
      {question.isAnswered && (
        <span className="text-sm font-bold tabular-nums">{question.isCorrect ? '+1' : '0'}</span>
      )}
    </button>
  );
};

export const QuestionLegend: React.FC = () => (
  <div className="rounded-md bg-primary-soft p-3 text-sm text-ink">
    <div className="mb-1 flex items-center gap-2"><MarkerIcon size={18} className="text-primary" /> Câu hiện tại</div>
    <div className="mb-1 flex items-center gap-2"><CheckIcon size={18} className="text-success-ink" /> Đã trả lời đúng</div>
    <div className="mb-1 flex items-center gap-2"><XIcon size={18} className="text-error-ink" /> Đã trả lời sai</div>
    <div className="flex items-center gap-2"><DotIcon size={18} className="text-ink-muted" /> Chưa trả lời</div>
  </div>
);
