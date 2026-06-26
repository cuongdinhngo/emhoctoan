import React from 'react';
import { MathProblem } from '../types';
import { PROBLEM_TYPE_LABELS } from '../constants/problemTypes';
import { AnalogClock } from './AnalogClock';
import { FractionOptions } from './FractionGrid';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { ProgressPill } from './ui/ProgressPill';
import { CheckIcon, XIcon } from './ui/icons';
import { cx } from './ui/cx';

interface ProblemDisplayProps {
  problem: MathProblem;
  questionNumber: number;
  totalQuestions: number;
  showResult?: boolean;
}

// Light confetti burst on a correct answer (MOTION_INTENSITY=5). Pure
// decoration — collapses to nothing under prefers-reduced-motion (handled
// globally in index.css).
const CONFETTI = [
  { left: '12%', color: 'bg-secondary', delay: '0ms' },
  { left: '30%', color: 'bg-primary', delay: '80ms' },
  { left: '50%', color: 'bg-success', delay: '40ms' },
  { left: '70%', color: 'bg-violet', delay: '120ms' },
  { left: '88%', color: 'bg-teal', delay: '60ms' },
];

export const ProblemDisplay: React.FC<ProblemDisplayProps> = ({
  problem,
  questionNumber,
  totalQuestions,
  showResult = false
}) => {
  const getTypeLabel = (type: string) => {
    return PROBLEM_TYPE_LABELS[type as keyof typeof PROBLEM_TYPE_LABELS] || 'Toán học';
  };

  const getQuestionTypeLabel = (questionType: string) => {
    return questionType === 'multiple_choice' ? 'Trắc nghiệm' : 'Tự luận';
  };

  // Parse clock data from question if present
  const clockMatch = problem.question.match(/\[CLOCK:(\d+):(\d+)\]/);
  const clockData = clockMatch ? { hour: parseInt(clockMatch[1]), minute: parseInt(clockMatch[2]) } : null;

  // Parse fraction options data if present
  const fractionMatch = problem.question.match(/\[FRACTION_OPTIONS:(\[.*?\])\]/);
  const fractionOptions = fractionMatch ? JSON.parse(fractionMatch[1]) : null;

  // Remove special tags from display question
  let displayQuestion = problem.question;
  if (clockData) displayQuestion = displayQuestion.replace(/\[CLOCK:\d+:\d+\]\s*/, '');
  if (fractionOptions) displayQuestion = displayQuestion.replace(/\[FRACTION_OPTIONS:\[.*?\]\]\s*/, '');

  // Longer questions get a smaller (but still large) type scale.
  const isLongQuestion = displayQuestion.length > 50;
  const questionFontSize = isLongQuestion
    ? 'text-question-sm md:text-question leading-relaxed'
    : 'text-question md:text-question-lg';

  const badges = (
    <div className="flex flex-wrap items-center gap-2">
      <Badge tone="primary">{getTypeLabel(problem.type)}</Badge>
      {problem.originalType && <Badge tone="violet">{getTypeLabel(problem.originalType)}</Badge>}
      <Badge tone="teal">{getQuestionTypeLabel(problem.questionType)}</Badge>
    </div>
  );

  return (
    <Card>
      {/* Header */}
      <div className="mb-6">
        {/* Web Layout */}
        <div className="hidden items-center justify-between gap-4 lg:flex">
          <ProgressPill current={questionNumber} total={totalQuestions} className="max-w-xs" />
          {badges}
        </div>
        {/* Mobile Layout */}
        <div className="lg:hidden">
          <ProgressPill current={questionNumber} total={totalQuestions} className="mb-3" />
          {badges}
        </div>
      </div>

      {/* Question */}
      <div className="mb-8 text-center">
        {clockData && (
          <div className="mb-6">
            <AnalogClock hour={clockData.hour} minute={clockData.minute} size={200} />
          </div>
        )}
        {fractionOptions && (
          <div className="mb-6">
            <FractionOptions
              options={fractionOptions}
              selectedLabel={problem.userTextAnswer}
              correctLabel={problem.textAnswer}
              showResult={problem.isAnswered}
            />
          </div>
        )}
        <div className={cx('mb-6 font-display font-bold text-ink', questionFontSize)}>
          {displayQuestion}
        </div>
      </div>

      {/* Answer Display Block - shown once the question is answered */}
      {problem.isAnswered && (
        <div className="mt-6 border-t-2 border-line pt-6">
          <div
            className={cx(
              'relative overflow-hidden rounded-lg p-6 animate-pop',
              problem.isCorrect ? 'bg-success-soft' : 'bg-error-soft',
            )}
          >
            {/* Confetti (correct only) */}
            {showResult && problem.isCorrect && (
              <div className="pointer-events-none absolute inset-x-0 top-0 h-0" aria-hidden="true">
                {CONFETTI.map((c, i) => (
                  <span
                    key={i}
                    className={cx('absolute top-0 h-2.5 w-2.5 rounded-sm animate-confetti', c.color)}
                    style={{ left: c.left, animationDelay: c.delay }}
                  />
                ))}
              </div>
            )}

            {/* User's Answer */}
            <div className="flex items-center justify-center gap-4">
              <span className="text-lg font-medium text-ink-muted">Đáp án của con:</span>
              <span className={cx('font-display text-answer md:text-question-sm tabular-nums', problem.isCorrect ? 'text-success-ink' : 'text-error-ink')}>
                {problem.userTextAnswer || problem.userAnswer}
              </span>
            </div>

            {/* Correct Answer (if wrong) */}
            {!problem.isCorrect && (
              <div className="mt-2 flex items-center justify-center gap-4 border-t border-error/30 pt-2">
                <span className="text-lg font-medium text-ink-muted">Đáp án đúng:</span>
                <span className="font-display text-answer md:text-question-sm tabular-nums text-success-ink">
                  {problem.textAnswer || problem.answer}
                </span>
              </div>
            )}

            {/* Result Message — icon + text + color (not color alone) */}
            {showResult && (
              <div
                className={cx(
                  'mt-3 flex items-center justify-center gap-2 text-center text-xl font-bold md:text-2xl',
                  problem.isCorrect ? 'text-success-ink' : 'text-error-ink',
                )}
                role="status"
              >
                <span
                  className={cx(
                    'inline-flex h-9 w-9 items-center justify-center rounded-pill text-white',
                    problem.isCorrect ? 'bg-success animate-bounce-soft' : 'bg-error',
                  )}
                >
                  {problem.isCorrect ? <CheckIcon size={22} /> : <XIcon size={22} />}
                </span>
                {problem.isCorrect ? 'Đúng rồi! Giỏi lắm!' : 'Chưa đúng, cố gắng nhé!'}
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};
