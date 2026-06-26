import React, { useMemo } from 'react';
import { SessionData, ProblemType } from '../types';
import { PROBLEM_TYPE_LABELS } from '../constants/problemTypes';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { CheckIcon, XIcon, RefreshIcon, SparkIcon } from './ui/icons';
import { cx } from './ui/cx';

interface TestResultsProps {
  sessionData: SessionData;
  onReviewQuestion: (questionId: string) => void;
  onRetake: () => void;
  onNewTest: () => void;
}

export const TestResults: React.FC<TestResultsProps> = ({
  sessionData,
  onReviewQuestion,
  onRetake,
  onNewTest
}) => {
  const { problems, currentScore, settings } = sessionData;
  const percentage = Math.round((currentScore.correct / currentScore.total) * 100);

  // Calculate per-type statistics
  const typeStats = useMemo(() => {
    const stats: Record<string, { total: number; correct: number }> = {};

    problems.forEach(problem => {
      // Use originalType for review_semester_1, otherwise use type
      const actualType = problem.originalType || problem.type;

      if (!stats[actualType]) {
        stats[actualType] = { total: 0, correct: 0 };
      }
      stats[actualType].total++;
      if (problem.isCorrect) {
        stats[actualType].correct++;
      }
    });

    return Object.entries(stats)
      .map(([type, data]) => ({
        type,
        label: PROBLEM_TYPE_LABELS[type as ProblemType] || type,
        ...data,
        percentage: Math.round((data.correct / data.total) * 100)
      }))
      .sort((a, b) => b.total - a.total); // Sort by most questions
  }, [problems]);

  const getGradeMessage = (percentage: number) => {
    if (percentage >= 90) return { message: 'Xuất sắc! Con rất giỏi 🌟', color: 'text-success-ink' };
    if (percentage >= 80) return { message: 'Giỏi lắm! Tiếp tục nhé 👏', color: 'text-primary-strong' };
    if (percentage >= 70) return { message: 'Khá tốt rồi! 👍', color: 'text-secondary-strong' };
    if (percentage >= 60) return { message: 'Cần cố gắng thêm chút nữa 💪', color: 'text-secondary-strong' };
    return { message: 'Mình cùng ôn lại nhé! 📚', color: 'text-error-ink' };
  };

  const gradeInfo = getGradeMessage(percentage);

  // Token color for a per-type score
  const statTone = (p: number) =>
    p >= 80 ? { text: 'text-success-ink', bar: 'bg-success' }
    : p >= 60 ? { text: 'text-secondary-strong', bar: 'bg-secondary' }
    : { text: 'text-error-ink', bar: 'bg-error' };

  // Helper function to clean question text for display
  const cleanQuestionText = (question: string): string => {
    let cleaned = question;
    cleaned = cleaned.replace(/\[CLOCK:\d+:\d+\]\s*/, '');
    cleaned = cleaned.replace(/\[FRACTION_OPTIONS:\[.*?\]\]\s*/, '');
    return cleaned;
  };

  return (
    <Card className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <div className="mb-2 flex items-center justify-center text-secondary">
          <SparkIcon size={28} className="animate-bounce-soft" aria-hidden="true" />
        </div>
        <h1 className="mb-2 font-display text-3xl font-bold text-ink">Kết quả kiểm tra</h1>
        <p className="text-ink-muted">Học sinh: <span className="font-semibold text-ink">{settings.studentName}</span></p>
      </div>

      {/* Score Summary */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-primary-soft p-6 text-center">
          <div className="font-display text-5xl font-extrabold tabular-nums text-primary-strong">{currentScore.correct}</div>
          <div className="mt-1 text-ink-muted">Câu đúng</div>
        </div>
        <div className="rounded-lg bg-success-soft p-6 text-center">
          <div className="font-display text-5xl font-extrabold tabular-nums text-success-ink">{percentage}%</div>
          <div className="mt-1 text-ink-muted">Điểm số</div>
        </div>
        <div className="rounded-lg bg-violet-soft p-6 text-center">
          <div className="font-display text-5xl font-extrabold tabular-nums text-violet-ink">{currentScore.total}</div>
          <div className="mt-1 text-ink-muted">Tổng câu</div>
        </div>
      </div>

      {/* Grade Message */}
      <div className={cx('mb-8 text-center font-display text-2xl font-bold', gradeInfo.color)}>
        {gradeInfo.message}
      </div>

      {/* Question Type Statistics */}
      <div className="mb-8">
        <h3 className="mb-4 font-display text-xl font-bold text-ink">Thống kê theo dạng bài</h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {typeStats.map(stat => {
            const tone = statTone(stat.percentage);
            return (
              <div key={stat.type} className="rounded-md bg-base p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-ink">{stat.label}</span>
                  <span className={cx('font-bold tabular-nums', tone.text)}>
                    {stat.correct}/{stat.total} ({stat.percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-pill bg-line">
                  <div className={cx('h-2 rounded-pill transition-[width] duration-500', tone.bar)} style={{ width: `${stat.percentage}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question Review */}
      <div className="mb-8">
        <h3 className="mb-4 font-display text-xl font-bold text-ink">Chi tiết từng câu hỏi</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <button
              key={problem.id}
              onClick={() => onReviewQuestion(problem.id)}
              className={cx(
                'flex min-h-touch items-center justify-between gap-3 rounded-md border-2 p-4 text-left',
                'transition-[transform,box-shadow] duration-200 hover:shadow-card focus-visible:outline-none focus-visible:shadow-focus',
                problem.isCorrect
                  ? 'border-success bg-success-soft text-success-ink'
                  : 'border-error bg-error-soft text-error-ink',
              )}
            >
              <div className="min-w-0">
                <div className="font-semibold">Câu {index + 1}</div>
                <div className="truncate text-sm text-ink-muted">{cleanQuestionText(problem.question)}</div>
              </div>
              <span
                className={cx(
                  'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-pill text-white',
                  problem.isCorrect ? 'bg-success' : 'bg-error',
                )}
                aria-label={problem.isCorrect ? 'Đúng' : 'Sai'}
              >
                {problem.isCorrect ? <CheckIcon size={18} /> : <XIcon size={18} />}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Button variant="secondary" size="lg" onClick={onRetake}>
          <RefreshIcon size={20} /> Làm lại bài này
        </Button>
        <Button variant="primary" size="lg" onClick={onNewTest}>
          <SparkIcon size={20} /> Bài kiểm tra mới
        </Button>
      </div>
    </Card>
  );
};
