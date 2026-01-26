import { MathProblem } from '../../../../types';
import { Difficulty, getRandomInt, createProblem } from '../../helpers';

// Helper to get sum of digits
function sumOfDigits(n: number): number {
  return n.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
}

// Generate a number divisible by n
function generateDivisibleBy(n: number, minDigits: number, maxDigits: number): number {
  const min = Math.pow(10, minDigits - 1);
  const max = Math.pow(10, maxDigits) - 1;
  const baseNum = getRandomInt(Math.ceil(min / n), Math.floor(max / n));
  return baseNum * n;
}

// Generate a number NOT divisible by n
function generateNotDivisibleBy(n: number, minDigits: number, maxDigits: number): number {
  const min = Math.pow(10, minDigits - 1);
  const max = Math.pow(10, maxDigits) - 1;
  let num = getRandomInt(min, max);
  while (num % n === 0) {
    num = getRandomInt(min, max);
  }
  return num;
}

// Divisible by 2 (even numbers - last digit is 0, 2, 4, 6, 8)
export function generateDivisibleBy2(difficulty: Difficulty): MathProblem {
  let minDigits: number, maxDigits: number;

  switch (difficulty) {
    case 'easy':
      minDigits = 2; maxDigits = 3;
      break;
    case 'medium':
      minDigits = 3; maxDigits = 4;
      break;
    case 'hard':
      minDigits = 4; maxDigits = 5;
      break;
    default:
      minDigits = 2; maxDigits = 4;
  }

  const questionTypes = [
    () => {
      // Check if number is divisible by 2
      const isDivisible = Math.random() < 0.5;
      const num = isDivisible
        ? generateDivisibleBy(2, minDigits, maxDigits)
        : generateNotDivisibleBy(2, minDigits, maxDigits);
      return {
        question: `So ${num} co chia het cho 2 khong?\nNeu co, dien 1. Neu khong, dien 0:`,
        answer: isDivisible ? 1 : 0
      };
    },
    () => {
      // Find the digit to make number divisible by 2
      const base = getRandomInt(Math.pow(10, minDigits - 2), Math.pow(10, minDigits - 1) - 1);
      const options = [0, 2, 4, 6, 8];
      const correctDigit = options[getRandomInt(0, options.length - 1)];
      return {
        question: `Dien chu so vao o trong de ${base}_ chia het cho 2:`,
        answer: correctDigit
      };
    }
  ];

  const selected = questionTypes[getRandomInt(0, questionTypes.length - 1)]();
  return createProblem('divisible_by_2', selected.question, selected.answer);
}

// Divisible by 5 (last digit is 0 or 5)
export function generateDivisibleBy5(difficulty: Difficulty): MathProblem {
  let minDigits: number, maxDigits: number;

  switch (difficulty) {
    case 'easy':
      minDigits = 2; maxDigits = 3;
      break;
    case 'medium':
      minDigits = 3; maxDigits = 4;
      break;
    case 'hard':
      minDigits = 4; maxDigits = 5;
      break;
    default:
      minDigits = 2; maxDigits = 4;
  }

  const questionTypes = [
    () => {
      const isDivisible = Math.random() < 0.5;
      const num = isDivisible
        ? generateDivisibleBy(5, minDigits, maxDigits)
        : generateNotDivisibleBy(5, minDigits, maxDigits);
      return {
        question: `So ${num} co chia het cho 5 khong?\nNeu co, dien 1. Neu khong, dien 0:`,
        answer: isDivisible ? 1 : 0
      };
    },
    () => {
      const base = getRandomInt(Math.pow(10, minDigits - 2), Math.pow(10, minDigits - 1) - 1);
      const options = [0, 5];
      const correctDigit = options[getRandomInt(0, options.length - 1)];
      return {
        question: `Dien chu so vao o trong de ${base}_ chia het cho 5:`,
        answer: correctDigit
      };
    }
  ];

  const selected = questionTypes[getRandomInt(0, questionTypes.length - 1)]();
  return createProblem('divisible_by_5', selected.question, selected.answer);
}

// Divisible by 3 (sum of digits divisible by 3)
export function generateDivisibleBy3(difficulty: Difficulty): MathProblem {
  let minDigits: number, maxDigits: number;

  switch (difficulty) {
    case 'easy':
      minDigits = 2; maxDigits = 3;
      break;
    case 'medium':
      minDigits = 3; maxDigits = 4;
      break;
    case 'hard':
      minDigits = 4; maxDigits = 5;
      break;
    default:
      minDigits = 2; maxDigits = 4;
  }

  const questionTypes = [
    () => {
      const isDivisible = Math.random() < 0.5;
      const num = isDivisible
        ? generateDivisibleBy(3, minDigits, maxDigits)
        : generateNotDivisibleBy(3, minDigits, maxDigits);
      const digitSum = sumOfDigits(num);
      return {
        question: `So ${num} co chia het cho 3 khong? (Tong cac chu so = ${digitSum})\nNeu co, dien 1. Neu khong, dien 0:`,
        answer: isDivisible ? 1 : 0
      };
    },
    () => {
      // Find missing digit to make divisible by 3
      const numDigits = getRandomInt(minDigits, maxDigits);
      const digits = Array.from({ length: numDigits - 1 }, () => getRandomInt(1, 9));
      const currentSum = digits.reduce((a, b) => a + b, 0);
      const missingDigitPos = getRandomInt(0, digits.length);

      // Find digit that makes sum divisible by 3
      const remainder = currentSum % 3;
      let correctDigit: number;
      if (remainder === 0) {
        const options = [0, 3, 6, 9];
        correctDigit = options[getRandomInt(0, options.length - 1)];
      } else if (remainder === 1) {
        const options = [2, 5, 8];
        correctDigit = options[getRandomInt(0, options.length - 1)];
      } else {
        const options = [1, 4, 7];
        correctDigit = options[getRandomInt(0, options.length - 1)];
      }

      const displayDigits = [...digits];
      displayDigits.splice(missingDigitPos, 0, -1); // -1 represents blank
      const numStr = displayDigits.map(d => d === -1 ? '_' : d).join('');

      return {
        question: `Dien chu so vao o trong de so ${numStr} chia het cho 3:`,
        answer: correctDigit
      };
    }
  ];

  const selected = questionTypes[getRandomInt(0, questionTypes.length - 1)]();
  return createProblem('divisible_by_3', selected.question, selected.answer);
}

// Divisible by 9 (sum of digits divisible by 9)
export function generateDivisibleBy9(difficulty: Difficulty): MathProblem {
  let minDigits: number, maxDigits: number;

  switch (difficulty) {
    case 'easy':
      minDigits = 2; maxDigits = 3;
      break;
    case 'medium':
      minDigits = 3; maxDigits = 4;
      break;
    case 'hard':
      minDigits = 4; maxDigits = 5;
      break;
    default:
      minDigits = 2; maxDigits = 4;
  }

  const questionTypes = [
    () => {
      const isDivisible = Math.random() < 0.5;
      const num = isDivisible
        ? generateDivisibleBy(9, minDigits, maxDigits)
        : generateNotDivisibleBy(9, minDigits, maxDigits);
      const digitSum = sumOfDigits(num);
      return {
        question: `So ${num} co chia het cho 9 khong? (Tong cac chu so = ${digitSum})\nNeu co, dien 1. Neu khong, dien 0:`,
        answer: isDivisible ? 1 : 0
      };
    },
    () => {
      // Find missing digit to make divisible by 9
      const numDigits = getRandomInt(minDigits, maxDigits);
      const digits = Array.from({ length: numDigits - 1 }, () => getRandomInt(1, 9));
      const currentSum = digits.reduce((a, b) => a + b, 0);
      const missingDigitPos = getRandomInt(0, digits.length);

      // Find digit that makes sum divisible by 9
      const remainder = currentSum % 9;
      let correctDigit = (9 - remainder) % 9;

      const displayDigits = [...digits];
      displayDigits.splice(missingDigitPos, 0, -1);
      const numStr = displayDigits.map(d => d === -1 ? '_' : d).join('');

      return {
        question: `Dien chu so vao o trong de so ${numStr} chia het cho 9:`,
        answer: correctDigit
      };
    }
  ];

  const selected = questionTypes[getRandomInt(0, questionTypes.length - 1)]();
  return createProblem('divisible_by_9', selected.question, selected.answer);
}

// Mixed divisibility - test multiple rules
export function generateDivisibilityMixed(difficulty: Difficulty): MathProblem {
  let minDigits: number, maxDigits: number;

  switch (difficulty) {
    case 'easy':
      minDigits = 2; maxDigits = 3;
      break;
    case 'medium':
      minDigits = 3; maxDigits = 4;
      break;
    case 'hard':
      minDigits = 4; maxDigits = 5;
      break;
    default:
      minDigits = 2; maxDigits = 4;
  }

  const divisors = [2, 3, 5, 9];
  const selectedDivisor = divisors[getRandomInt(0, divisors.length - 1)];

  // Generate numbers that divide/don't divide by selected divisor
  const isDivisible = Math.random() < 0.5;
  let num: number;

  if (isDivisible) {
    num = generateDivisibleBy(selectedDivisor, minDigits, maxDigits);
  } else {
    num = generateNotDivisibleBy(selectedDivisor, minDigits, maxDigits);
  }

  // Count how many of 2,3,5,9 the number is divisible by
  let count = 0;
  if (num % 2 === 0) count++;
  if (num % 3 === 0) count++;
  if (num % 5 === 0) count++;
  if (num % 9 === 0) count++;

  const question = `So ${num} chia het cho may so trong cac so 2, 3, 5, 9?`;

  return createProblem('divisibility_mixed', question, count);
}
