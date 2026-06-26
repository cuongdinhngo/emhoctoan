import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { cx } from './ui/cx';

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

  const answered = showResult && (userAnswer !== undefined || userTextAnswer !== undefined);

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md">
      <input
        id="answer-input"
        type={isTextInput ? 'text' : 'number'}
        inputMode={isTextInput ? 'text' : 'numeric'}
        autoComplete="off"
        aria-label="Đáp án của con"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        placeholder={isTextInput ? 'Ví dụ: 9 giờ 30 phút' : 'Nhập đáp án…'}
        className={cx(
          'min-h-touch w-full rounded-lg border-2 px-6 py-4 text-center font-display text-answer text-ink tabular-nums',
          'placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-ink-muted',
          'focus:outline-none focus-visible:shadow-focus disabled:bg-base disabled:cursor-not-allowed',
          answered ? 'border-success bg-success-soft' : 'border-line focus:border-primary',
        )}
      />

      {!showResult && (
        <Button type="submit" variant="primary" size="lg" fullWidth disabled={disabled || !input.trim()} className="mt-4">
          Kiểm tra
        </Button>
      )}
    </form>
  );
};
