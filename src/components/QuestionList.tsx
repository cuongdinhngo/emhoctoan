import React from 'react';
import { QuestionListItem } from '../types';
import { Card } from './ui/Card';
import { QuestionTile, QuestionLegend } from './QuestionTile';

interface QuestionListProps {
  questions: QuestionListItem[];
  onQuestionSelect: (questionId: string) => void;
  currentQuestionId?: string;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  onQuestionSelect
}) => {
  return (
    <Card padding="sm" className="h-full">
      <h3 className="mb-4 font-display text-lg font-bold text-ink">Danh sách câu hỏi</h3>

      <div className="max-h-96 space-y-2 overflow-y-auto overscroll-contain">
        {questions.map((question) => (
          <QuestionTile key={question.id} question={question} onSelect={onQuestionSelect} />
        ))}
      </div>

      <div className="mt-4">
        <QuestionLegend />
      </div>
    </Card>
  );
};
