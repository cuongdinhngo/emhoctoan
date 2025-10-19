import React from 'react';

interface MultipleChoiceInputProps {
  options: number[];
  correctAnswer: number;
  userAnswer?: number;
  onAnswerSelect: (answer: number) => void;
  disabled?: boolean;
  showResult?: boolean;
}

export const MultipleChoiceInput: React.FC<MultipleChoiceInputProps> = ({ 
  options, 
  correctAnswer, 
  userAnswer, 
  onAnswerSelect, 
  disabled = false,
  showResult = false
}) => {
  const getOptionStyle = (option: number) => {
    if (!showResult) {
      return userAnswer === option 
        ? 'bg-blue-500 text-white border-blue-500' 
        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300';
    }
    
    if (option === correctAnswer) {
      return 'bg-green-500 text-white border-green-500';
    }
    
    if (userAnswer === option && option !== correctAnswer) {
      return 'bg-red-500 text-white border-red-500';
    }
    
    return 'bg-gray-100 text-gray-500 border-gray-300';
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => !disabled && onAnswerSelect(option)}
          disabled={disabled}
          className={`p-4 rounded-xl border-2 font-bold text-lg transition-all duration-200 ${
            disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-md'
          } ${getOptionStyle(option)}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
