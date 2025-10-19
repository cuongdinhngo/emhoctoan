import React, { useState, useEffect } from 'react';

interface AnswerInputProps {
  onSubmit: (answer: number) => void;
  disabled?: boolean;
  autoFocus?: boolean;
}

export const AnswerInput: React.FC<AnswerInputProps> = ({ 
  onSubmit, 
  disabled = false, 
  autoFocus = true 
}) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (autoFocus) {
      const inputElement = document.getElementById('answer-input');
      inputElement?.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answer = parseInt(input.trim());
    if (!isNaN(answer)) {
      onSubmit(answer);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
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
          className="w-full px-6 py-4 text-2xl text-center border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>
      
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
      >
        Kiểm tra
      </button>
    </form>
  );
};
