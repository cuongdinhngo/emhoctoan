import React, { useState, useEffect } from 'react';

interface AnswerInputProps {
  onSubmit: (answer: number) => void;
  onTextSubmit?: (answer: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  userAnswer?: number;
  userTextAnswer?: string;
  showResult?: boolean;
  isTextInput?: boolean;
}

export const AnswerInput: React.FC<AnswerInputProps> = ({
  onSubmit,
  onTextSubmit,
  disabled = false,
  autoFocus = true,
  userAnswer,
  userTextAnswer,
  showResult = false,
  isTextInput = false
}) => {
  const [input, setInput] = useState(
    isTextInput
      ? (userTextAnswer || '')
      : (userAnswer?.toString() || '')
  );

  useEffect(() => {
    if (autoFocus && !disabled) {
      const inputElement = document.getElementById('answer-input');
      inputElement?.focus();
    }
  }, [autoFocus, disabled]);

  useEffect(() => {
    if (isTextInput && userTextAnswer !== undefined) {
      setInput(userTextAnswer);
    } else if (!isTextInput && userAnswer !== undefined) {
      setInput(userAnswer.toString());
    }
  }, [userAnswer, userTextAnswer, isTextInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTextInput && onTextSubmit) {
      if (input.trim()) {
        onTextSubmit(input.trim());
      }
    } else {
      const answer = parseInt(input.trim());
      if (!isNaN(answer)) {
        onSubmit(answer);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const getInputStyle = () => {
    if (showResult && (userAnswer !== undefined || userTextAnswer !== undefined)) {
      return 'border-green-500 bg-green-50';
    }
    return 'border-gray-300 focus:border-blue-500';
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative">
        <input
          id="answer-input"
          type={isTextInput ? 'text' : 'number'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          placeholder={isTextInput ? 'Ví dụ: 9 giờ 30 phút' : 'Nhập đáp án...'}
          className={`w-full px-6 py-4 text-2xl text-center border-2 rounded-xl focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed ${getInputStyle()}`}
        />
      </div>

      {!showResult && (
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
        >
          Kiểm tra
        </button>
      )}
    </form>
  );
};
