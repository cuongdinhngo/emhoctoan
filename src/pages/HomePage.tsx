import React from 'react';
import { Link } from 'react-router-dom';
import { GRADES, GradeConfig } from '../constants/grades';
import { Badge } from '../components/ui/Badge';
import { cx } from '../components/ui/cx';

// Each grade gets a friendly identity tint, all drawn from design tokens.
const gradeTheme: Record<string, { soft: string; text: string; ring: string }> = {
  blue: { soft: 'bg-primary-soft', text: 'text-primary-strong', ring: 'hover:border-primary' },
  green: { soft: 'bg-teal-soft', text: 'text-teal-ink', ring: 'hover:border-teal' },
  purple: { soft: 'bg-violet-soft', text: 'text-violet-ink', ring: 'hover:border-violet' },
};

const gradeNumber = (id: string) => (id === 'grade3' ? '3' : id === 'grade4' ? '4' : '5');

const GradeCard: React.FC<{ grade: GradeConfig }> = ({ grade }) => {
  const theme = gradeTheme[grade.color] || gradeTheme.blue;

  if (!grade.isAvailable) {
    return (
      <div className={cx('relative rounded-xl border-2 border-line p-6 opacity-70', theme.soft)}>
        <div className="absolute right-3 top-3">
          <Badge tone="neutral">Sắp ra mắt</Badge>
        </div>
        <div className="text-center">
          <div className={cx('mb-3 font-display text-7xl font-extrabold tabular-nums', theme.text)}>
            {gradeNumber(grade.id)}
          </div>
          <h2 className="mb-2 font-display text-2xl font-bold text-ink">{grade.label}</h2>
          <p className="text-sm text-ink-muted">{grade.description}</p>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={grade.route}
      className={cx(
        'block rounded-xl border-2 border-line p-6 transition-[transform,border-color,box-shadow] duration-200',
        'hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-none focus-visible:shadow-focus',
        theme.soft,
        theme.ring,
      )}
    >
      <div className="text-center">
        <div className={cx('mb-3 font-display text-7xl font-extrabold tabular-nums', theme.text)}>
          {gradeNumber(grade.id)}
        </div>
        <h2 className="mb-2 font-display text-2xl font-bold text-ink">{grade.label}</h2>
        <p className="text-sm text-ink-muted">{grade.description}</p>
      </div>
    </Link>
  );
};

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-[100dvh] bg-base">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-4">
          <span className="text-3xl" aria-hidden="true">&#129518;</span>
          <h1 className="font-display text-2xl font-bold text-ink">Em Học Toán</h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-display text-4xl font-bold text-ink">Chọn lớp của con</h2>
          <p className="text-ink-muted">Luyện tập toán theo chương trình học</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {GRADES.map((grade) => (
            <GradeCard key={grade.id} grade={grade} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-ink-muted">
          Ứng dụng giúp các em học sinh luyện tập toán theo chương trình SGK
        </p>
      </main>
    </div>
  );
};
