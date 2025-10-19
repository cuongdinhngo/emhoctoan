import React, { useState, useEffect } from 'react';

interface AnswerInputProps {
  onSubmit: (answer: number) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  userAnswer?: number;
  showResult?: boolean;
}

export const AnswerInput: React.FC<AnswerInputProps> = ({ 
  onSubmit, 
  disabled = false, 
  autoFocus = true,
  userAnswer,
  showResult = false
}) => {
  const [input, setInput] = useState(userAnswer?.toString() || '');

  useEffect(() => {
    if (autoFocus && !disabled) {
      const inputElement = document.getElementById('answer-input');
      inputElement?.focus();
    }
  }, [autoFocus, disabled]);

  useEffect(() => {
    if (userAnswer !== undefined) {
      setInput(userAnswer.toString());
    }
  }, [userAnswer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answer = parseInt(input.trim());
    if (!isNaN(answer)) {
      onSubmit(answer);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const getInputStyle = () => {
    if (showResult && userAnswer !== undefined) {
      return 'border-green-500 bg-green-50';
    }
    return 'border-gray-300 focus:border-blue-500';
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative">
        <input
          id="answer-input"
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          placeholder="Nhập đáp án..."
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
