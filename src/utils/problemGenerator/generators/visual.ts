import { MathProblem, QuestionType } from '../../../types';
import { Difficulty, getRandomInt, generateUniqueId } from '../helpers';

interface FractionGridOption {
  rows: number;
  cols: number;
  circledCount: number;
  label: string;
}

// Visual Fraction Identification
// Question: "Hình nào đã khoanh vào 1/n số chấm tròn?"
export function generateVisualFraction(difficulty: Difficulty = 'medium'): MathProblem {
  // Define grid configurations based on difficulty
  let rows: number;
  let cols: number;
  let denominator: number;

  switch (difficulty) {
    case 'easy':
      // Simple fractions: 1/2, 1/4
      denominator = [2, 4][getRandomInt(0, 1)];
      if (denominator === 2) {
        rows = 2;
        cols = getRandomInt(2, 4);
      } else {
        rows = 2;
        cols = 4;
      }
      break;
    case 'medium':
      // Medium fractions: 1/2, 1/3, 1/4
      denominator = [2, 3, 4][getRandomInt(0, 2)];
      if (denominator === 3) {
        rows = 3;
        cols = getRandomInt(2, 4);
      } else {
        rows = 2;
        cols = denominator === 2 ? getRandomInt(3, 5) : 4;
      }
      break;
    case 'hard':
      // Hard fractions: 1/3, 1/4, 1/5
      denominator = [3, 4, 5][getRandomInt(0, 2)];
      if (denominator === 5) {
        rows = getRandomInt(2, 3);
        cols = 5;
      } else if (denominator === 3) {
        rows = 3;
        cols = getRandomInt(3, 5);
      } else {
        rows = 4;
        cols = getRandomInt(3, 4);
      }
      break;
    default:
      denominator = [2, 3, 4][getRandomInt(0, 2)];
      rows = denominator;
      cols = getRandomInt(2, 4);
  }

  const totalDots = rows * cols;
  // Ensure totalDots is divisible by denominator
  const adjustedTotal = Math.floor(totalDots / denominator) * denominator;
  if (adjustedTotal < denominator) {
    // Fallback to safe values
    rows = denominator;
    cols = 2;
  }
  const finalTotal = rows * cols;
  const correctCircled = finalTotal / denominator;

  // Generate 4 options with different circled counts
  const labels = ['A', 'B', 'C', 'D'];
  const correctIndex = getRandomInt(0, 3);

  const options: FractionGridOption[] = [];
  const usedCounts = new Set<number>();
  usedCounts.add(correctCircled);

  for (let i = 0; i < 4; i++) {
    if (i === correctIndex) {
      options.push({
        rows,
        cols,
        circledCount: correctCircled,
        label: labels[i]
      });
    } else {
      // Generate a wrong answer
      let wrongCircled: number;
      let attempts = 0;
      do {
        // Generate wrong options that are plausible
        const variation = getRandomInt(-2, 2);
        wrongCircled = Math.max(1, Math.min(finalTotal - 1, correctCircled + variation));
        attempts++;
      } while (usedCounts.has(wrongCircled) && attempts < 10);

      usedCounts.add(wrongCircled);
      options.push({
        rows,
        cols,
        circledCount: wrongCircled,
        label: labels[i]
      });
    }
  }

  const question = `[FRACTION_OPTIONS:${JSON.stringify(options)}] Hình nào đã khoanh vào 1/${denominator} số chấm tròn?`;
  const correctLabel = labels[correctIndex];

  return {
    id: generateUniqueId(),
    type: 'visual_fraction',
    question,
    answer: correctIndex, // Index of correct answer
    questionType: 'multiple_choice' as QuestionType,
    textAnswer: correctLabel,
    textOptions: labels,
    isAnswered: false
  };
}

// True/False Multiply/Divide
// Question: "Đúng ghi Đ, sai ghi S: Gấp 6g lên 7 lần sẽ được 42g"
export function generateTrueFalseMultiplyDivide(difficulty: Difficulty = 'medium'): MathProblem {
  const isMultiply = Math.random() < 0.5;
  const isCorrectStatement = Math.random() < 0.5;

  const units = ['g', 'kg', 'km', 'm', 'cm', 'dm', 'l'];
  const unit = units[getRandomInt(0, units.length - 1)];

  let baseNumber: number;
  let multiplier: number;
  let result: number;
  let displayedResult: number;

  switch (difficulty) {
    case 'easy':
      baseNumber = getRandomInt(2, 10);
      multiplier = getRandomInt(2, 5);
      break;
    case 'medium':
      baseNumber = getRandomInt(5, 20);
      multiplier = getRandomInt(3, 8);
      break;
    case 'hard':
      baseNumber = getRandomInt(10, 50);
      multiplier = getRandomInt(4, 9);
      break;
    default:
      baseNumber = getRandomInt(5, 20);
      multiplier = getRandomInt(3, 8);
  }

  if (isMultiply) {
    result = baseNumber * multiplier;
    displayedResult = isCorrectStatement ? result : result + getRandomInt(1, 5) * (Math.random() < 0.5 ? 1 : -1);
    if (displayedResult <= 0) displayedResult = result + getRandomInt(1, 5);
  } else {
    // Division: ensure clean division
    result = baseNumber;
    baseNumber = baseNumber * multiplier;
    displayedResult = isCorrectStatement ? result : result + getRandomInt(1, 3) * (Math.random() < 0.5 ? 1 : -1);
    if (displayedResult <= 0) displayedResult = result + getRandomInt(1, 3);
  }

  const operationText = isMultiply
    ? `Gấp ${baseNumber}${unit} lên ${multiplier} lần sẽ được ${displayedResult}${unit}`
    : `Giảm ${baseNumber}${unit} đi ${multiplier} lần sẽ được ${displayedResult}${unit}`;

  const question = `Đúng ghi Đ, sai ghi S: ${operationText}`;
  const correctAnswer = isCorrectStatement ? 'Đ' : 'S';

  return {
    id: generateUniqueId(),
    type: 'true_false_multiply_divide',
    question,
    answer: isCorrectStatement ? 1 : 0, // 1 for Đ (true), 0 for S (false)
    questionType: 'multiple_choice' as QuestionType,
    textAnswer: correctAnswer,
    textOptions: ['Đ', 'S'],
    isAnswered: false
  };
}

// Unit Calculations
// Question: "Tính: 37g - 18g = ?g" or "15dm × 5 = ?dm"
export function generateUnitCalculation(difficulty: Difficulty = 'medium'): MathProblem {
  const operations = ['+', '-', '×', ':'] as const;
  const operation = operations[getRandomInt(0, 3)];

  const unitGroups = [
    ['g', 'kg'],
    ['m', 'dm', 'cm', 'mm'],
    ['l', 'ml']
  ];
  const unitGroup = unitGroups[getRandomInt(0, unitGroups.length - 1)];
  const unit = unitGroup[getRandomInt(0, unitGroup.length - 1)];

  let a: number;
  let b: number;
  let answer: number;

  switch (difficulty) {
    case 'easy':
      if (operation === '+' || operation === '-') {
        a = getRandomInt(10, 50);
        b = getRandomInt(5, 30);
        if (operation === '-' && b > a) [a, b] = [b, a];
      } else if (operation === '×') {
        a = getRandomInt(2, 10);
        b = getRandomInt(2, 5);
      } else {
        b = getRandomInt(2, 5);
        answer = getRandomInt(2, 10);
        a = b * answer;
      }
      break;
    case 'medium':
      if (operation === '+' || operation === '-') {
        a = getRandomInt(20, 100);
        b = getRandomInt(10, 50);
        if (operation === '-' && b > a) [a, b] = [b, a];
      } else if (operation === '×') {
        a = getRandomInt(5, 20);
        b = getRandomInt(2, 8);
      } else {
        b = getRandomInt(2, 8);
        answer = getRandomInt(5, 20);
        a = b * answer;
      }
      break;
    case 'hard':
      if (operation === '+' || operation === '-') {
        a = getRandomInt(50, 200);
        b = getRandomInt(20, 100);
        if (operation === '-' && b > a) [a, b] = [b, a];
      } else if (operation === '×') {
        a = getRandomInt(10, 50);
        b = getRandomInt(3, 9);
      } else {
        b = getRandomInt(3, 9);
        answer = getRandomInt(10, 50);
        a = b * answer;
      }
      break;
    default:
      a = getRandomInt(20, 100);
      b = getRandomInt(10, 50);
      if (operation === '-' && b > a) [a, b] = [b, a];
  }

  // Calculate answer if not already set (for division)
  switch (operation) {
    case '+':
      answer = a + b;
      break;
    case '-':
      answer = a - b;
      break;
    case '×':
      answer = a * b;
      break;
    case ':':
      // answer already set for division
      break;
  }

  const operationSymbol = operation === ':' ? ':' : operation;
  const question = `Tính: ${a}${unit} ${operationSymbol} ${operation === '×' || operation === ':' ? b : `${b}${unit}`} = ?${unit}`;

  return {
    id: generateUniqueId(),
    type: 'unit_calculation',
    question,
    answer: answer!,
    questionType: 'input' as QuestionType,
    isAnswered: false
  };
}
