import { MathProblem, QuestionType } from '../../types';

export type Difficulty = 'easy' | 'medium' | 'hard';

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getDifficultyRange(difficulty: Difficulty): { min: number; max: number } {
  switch (difficulty) {
    case 'easy':
      return { min: 1, max: 5 };
    case 'medium':
      return { min: 3, max: 8 };
    case 'hard':
      return { min: 6, max: 9 };
    default:
      return { min: 1, max: 9 };
  }
}

export function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function generateMultipleChoiceOptions(correctAnswer: number): number[] {
  const options = [correctAnswer];
  const usedAnswers = new Set([correctAnswer]);

  // Generate 3 wrong answers
  while (options.length < 4) {
    let wrongAnswer;
    if (Math.random() < 0.5) {
      // Generate answer close to correct one
      wrongAnswer = correctAnswer + getRandomInt(-3, 3);
    } else {
      // Generate completely random answer
      wrongAnswer = getRandomInt(0, 100);
    }

    if (!usedAnswers.has(wrongAnswer) && wrongAnswer >= 0) {
      options.push(wrongAnswer);
      usedAnswers.add(wrongAnswer);
    }
  }

  // Shuffle the options
  return options.sort(() => Math.random() - 0.5);
}

// Helper to create a basic MathProblem structure
export function createProblem(
  type: MathProblem['type'],
  question: string,
  answer: number,
  questionType?: QuestionType
): MathProblem {
  const qType: QuestionType = questionType ?? (Math.random() < 0.5 ? 'multiple_choice' : 'input');

  return {
    id: generateUniqueId(),
    type,
    question,
    answer,
    questionType: qType,
    options: qType === 'multiple_choice' ? generateMultipleChoiceOptions(answer) : undefined,
    isAnswered: false
  };
}
