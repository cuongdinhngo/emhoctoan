import React from 'react';

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
  // Determine if this is a text-based MCQ
  const isTextMode = textOptions && textOptions.length > 0;

  const getOptionStyle = (option: number | string, isText: boolean) => {
    const selectedAnswer = isText ? userTextAnswer : userAnswer;
    const correct = isText ? correctTextAnswer : correctAnswer;

    if (!showResult) {
      return selectedAnswer === option
        ? 'bg-blue-500 text-white border-blue-500'
        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300';
    }

    if (option === correct) {
      return 'bg-green-500 text-white border-green-500';
    }

    if (selectedAnswer === option && option !== correct) {
      return 'bg-red-500 text-white border-red-500';
    }

    return 'bg-gray-100 text-gray-500 border-gray-300';
  };

  const handleClick = (option: number | string, isText: boolean) => {
    if (disabled) return;
    if (isText && onTextAnswerSelect) {
      onTextAnswerSelect(option as string);
    } else if (!isText && onAnswerSelect) {
      onAnswerSelect(option as number);
    }
  };

  // Text options mode
  if (isTextMode) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {textOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleClick(option, true)}
            disabled={disabled}
            className={`p-4 rounded-xl border-2 font-bold text-lg transition-all duration-200 ${
              disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-md'
            } ${getOptionStyle(option, true)}`}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }

  // Numeric options mode (default)
  return (
    <div className="grid grid-cols-2 gap-3">
      {(options || []).map((option, index) => (
        <button
          key={index}
          onClick={() => handleClick(option, false)}
          disabled={disabled}
          className={`p-4 rounded-xl border-2 font-bold text-lg transition-all duration-200 ${
            disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-md'
          } ${getOptionStyle(option, false)}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
