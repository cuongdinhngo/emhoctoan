import { MathProblem } from '../../../../types';
import { Difficulty, getRandomInt, createProblem } from '../../helpers';

// Helper to generate large numbers based on digit count
function generateLargeNumber(minDigits: number, maxDigits: number): number {
  const digits = getRandomInt(minDigits, maxDigits);
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return getRandomInt(min, max);
}

// Addition of large numbers (5-6 digits)
export function generateLargeNumberAddition(difficulty: Difficulty): MathProblem {
  let minDigits: number, maxDigits: number;

  switch (difficulty) {
    case 'easy':
      minDigits = 4; maxDigits = 5;
      break;
    case 'medium':
      minDigits = 5; maxDigits = 6;
      break;
    case 'hard':
      minDigits = 6; maxDigits = 6;
      break;
    default:
      minDigits = 4; maxDigits = 5;
  }

  const num1 = generateLargeNumber(minDigits, maxDigits);
  const num2 = generateLargeNumber(minDigits, maxDigits);
  const answer = num1 + num2;

  const question = `${num1.toLocaleString('vi-VN')} + ${num2.toLocaleString('vi-VN')} = ?`;

  return createProblem('large_number_addition', question, answer);
}

// Subtraction of large numbers
export function generateLargeNumberSubtraction(difficulty: Difficulty): MathProblem {
  let minDigits: number, maxDigits: number;

  switch (difficulty) {
    case 'easy':
      minDigits = 4; maxDigits = 5;
      break;
    case 'medium':
      minDigits = 5; maxDigits = 6;
      break;
    case 'hard':
      minDigits = 6; maxDigits = 6;
      break;
    default:
      minDigits = 4; maxDigits = 5;
  }

  let num1 = generateLargeNumber(minDigits, maxDigits);
  let num2 = generateLargeNumber(minDigits, maxDigits);

  // Ensure num1 > num2 for positive result
  if (num1 < num2) {
    [num1, num2] = [num2, num1];
  }

  const answer = num1 - num2;
  const question = `${num1.toLocaleString('vi-VN')} - ${num2.toLocaleString('vi-VN')} = ?`;

  return createProblem('large_number_subtraction', question, answer);
}

// Multiplication with large numbers (3-4 digit x 2 digit)
export function generateLargeNumberMultiply(difficulty: Difficulty): MathProblem {
  let num1MinDigits: number, num1MaxDigits: number, num2MinDigits: number, num2MaxDigits: number;

  switch (difficulty) {
    case 'easy':
      num1MinDigits = 3; num1MaxDigits = 3;
      num2MinDigits = 1; num2MaxDigits = 2;
      break;
    case 'medium':
      num1MinDigits = 3; num1MaxDigits = 4;
      num2MinDigits = 2; num2MaxDigits = 2;
      break;
    case 'hard':
      num1MinDigits = 4; num1MaxDigits = 5;
      num2MinDigits = 2; num2MaxDigits = 2;
      break;
    default:
      num1MinDigits = 3; num1MaxDigits = 4;
      num2MinDigits = 1; num2MaxDigits = 2;
  }

  const num1 = generateLargeNumber(num1MinDigits, num1MaxDigits);
  const num2 = generateLargeNumber(num2MinDigits, num2MaxDigits);
  const answer = num1 * num2;

  const question = `${num1.toLocaleString('vi-VN')} x ${num2} = ?`;

  return createProblem('large_number_multiply', question, answer);
}

// Division with large numbers (result should be exact)
export function generateLargeNumberDivide(difficulty: Difficulty): MathProblem {
  let quotientMin: number, quotientMax: number, divisorMin: number, divisorMax: number;

  switch (difficulty) {
    case 'easy':
      quotientMin = 100; quotientMax = 500;
      divisorMin = 10; divisorMax = 30;
      break;
    case 'medium':
      quotientMin = 200; quotientMax = 999;
      divisorMin = 20; divisorMax = 50;
      break;
    case 'hard':
      quotientMin = 500; quotientMax = 2000;
      divisorMin = 30; divisorMax = 99;
      break;
    default:
      quotientMin = 100; quotientMax = 500;
      divisorMin = 10; divisorMax = 50;
  }

  const quotient = getRandomInt(quotientMin, quotientMax);
  const divisor = getRandomInt(divisorMin, divisorMax);
  const dividend = quotient * divisor;

  const question = `${dividend.toLocaleString('vi-VN')} : ${divisor} = ?`;

  return createProblem('large_number_divide', question, quotient);
}
