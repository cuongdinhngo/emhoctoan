import React from 'react';
import { QuestionListItem } from '../types';
import { QuestionTile, QuestionLegend } from './QuestionTile';
import { XIcon } from './ui/icons';
import { cx } from './ui/cx';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  questions: QuestionListItem[];
  onQuestionSelect: (questionId: string) => void;
  currentQuestionId?: string;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  questions,
  onQuestionSelect
}) => {
  const handleQuestionClick = (questionId: string) => {
    onQuestionSelect(questionId);
    onClose(); // Close drawer after selection
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={cx(
        'fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col bg-surface shadow-card-hover',
        'transform transition-transform duration-300 ease-in-out lg:hidden',
        isOpen ? 'translate-x-0' : 'translate-x-full',
      )}>
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-line p-4">
          <h3 className="font-display text-lg font-bold text-ink">Danh sách câu hỏi</h3>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="flex h-touch w-touch items-center justify-center rounded-pill text-ink-muted transition-colors hover:bg-base hover:text-ink focus-visible:outline-none focus-visible:shadow-focus"
          >
            <XIcon />
          </button>
        </div>

        {/* Questions List */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 pb-20">
          <div className="space-y-2">
            {questions.map((question) => (
              <QuestionTile key={question.id} question={question} onSelect={handleQuestionClick} />
            ))}
          </div>

          <div className="mt-6">
            <QuestionLegend />
          </div>
        </div>
      </div>
    </>
  );
};
