import React from 'react';
import { OptionTile, OptionState } from './ui/OptionTile';

interface MultipleChoiceInputProps {
  options?: number[];
  textOptions?: string[];
  correctAnswer?: number;
  correctTextAnswer?: string;
  userAnswer?: number;
  userTextAnswer?: string;
  onAnswerSelect?: (answer: number) => void;
  onTextAnswerSelect?: (answer: string) => void;
  disabled?: boolean;
  showResult?: boolean;
}

export const MultipleChoiceInput: React.FC<MultipleChoiceInputProps> = ({
  options,
  textOptions,
  correctAnswer,
  correctTextAnswer,
  userAnswer,
  userTextAnswer,
  onAnswerSelect,
  onTextAnswerSelect,
  disabled = false,
  showResult = false
}) => {
  const formatNumberVi = (value: number) => value.toLocaleString('vi-VN');

  // Determine if this is a text-based MCQ
  const isTextMode = textOptions && textOptions.length > 0;

  // Map each option to an OptionTile state. Correct/wrong tiles render an
  // icon + label in OptionTile, so feedback never relies on color alone.
  const getState = (option: number | string, isText: boolean): OptionState => {
    const selectedAnswer = isText ? userTextAnswer : userAnswer;
    const correct = isText ? correctTextAnswer : correctAnswer;

    if (!showResult) {
      return selectedAnswer === option ? 'selected' : 'idle';
    }
    if (option === correct) return 'correct';
    if (selectedAnswer === option && option !== correct) return 'wrong';
    return 'muted';
  };

  const handleClick = (option: number | string, isText: boolean) => {
    if (disabled) return;
    if (isText && onTextAnswerSelect) {
      onTextAnswerSelect(option as string);
    } else if (!isText && onAnswerSelect) {
      onAnswerSelect(option as number);
    }
  };

  if (isTextMode) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {textOptions.map((option, index) => (
          <OptionTile
            key={index}
            state={getState(option, true)}
            disabled={disabled}
            onClick={() => handleClick(option, true)}
          >
            {option}
          </OptionTile>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {(options || []).map((option, index) => (
        <OptionTile
          key={index}
          state={getState(option, false)}
          disabled={disabled}
          onClick={() => handleClick(option, false)}
        >
          {formatNumberVi(option)}
        </OptionTile>
      ))}
    </div>
  );
};
