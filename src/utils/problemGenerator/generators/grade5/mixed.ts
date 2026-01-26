import { MathProblem } from '../../../../types';
import { Difficulty, getRandomInt, createProblem } from '../../helpers';

// Mixed decimal and fraction calculations
export function generateMixedDecimalFraction(difficulty: Difficulty): MathProblem {
  let maxNum: number;

  switch (difficulty) {
    case 'easy':
      maxNum = 10;
      break;
    case 'medium':
      maxNum = 20;
      break;
    case 'hard':
      maxNum = 50;
      break;
    default:
      maxNum = 15;
  }

  // Generate problems with clean answers
  const problemType = getRandomInt(0, 2);

  if (problemType === 0) {
    // Decimal + fraction with same denominator equivalent
    // e.g., 0.5 + 1/2 = 1
    const fractions = [
      { decimal: 0.5, num: 1, den: 2 },
      { decimal: 0.25, num: 1, den: 4 },
      { decimal: 0.75, num: 3, den: 4 },
      { decimal: 0.2, num: 1, den: 5 },
      { decimal: 0.4, num: 2, den: 5 }
    ];

    const frac1 = fractions[getRandomInt(0, fractions.length - 1)];
    const frac2 = fractions[getRandomInt(0, fractions.length - 1)];

    const sum = frac1.decimal + frac2.decimal;
    const answer = Math.round(sum * 100); // Multiply by 100 for integer answer

    const question = `${frac1.decimal} + ${frac2.num}/${frac2.den} = ?\nDien ket qua nhan voi 100 (vi du: 0.75 -> dien 75):`;

    return createProblem('mixed_decimal_fraction', question, answer, 'input');
  } else if (problemType === 1) {
    // Fraction of a decimal number
    const denominators = [2, 4, 5];
    const den = denominators[getRandomInt(0, denominators.length - 1)];
    const num = getRandomInt(1, den - 1);

    // Generate decimal that gives clean result
    const wholeMultiple = getRandomInt(2, Math.floor(maxNum / den)) * den;
    const decimal = wholeMultiple / 10;

    const result = (decimal * num) / den;
    const answer = Math.round(result * 10); // One decimal place

    const question = `Tim ${num}/${den} cua ${decimal.toFixed(1)}.\nDien ket qua nhan voi 10:`;

    return createProblem('mixed_decimal_fraction', question, answer, 'input');
  } else {
    // Simple decimal x fraction
    const whole = getRandomInt(2, maxNum);
    const denominators = [2, 4, 5, 10];
    const den = denominators[getRandomInt(0, denominators.length - 1)];
    const num = getRandomInt(1, den - 1);

    // e.g., 10 x 1/2 = 5
    const result = (whole * num) / den;

    // Ensure clean result
    if (result !== Math.floor(result)) {
      // Adjust whole to get clean result
      const adjustedWhole = den * getRandomInt(1, 5);
      const adjustedResult = (adjustedWhole * num) / den;

      const question = `${adjustedWhole} x ${num}/${den} = ?`;
      return createProblem('mixed_decimal_fraction', question, adjustedResult);
    }

    const question = `${whole} x ${num}/${den} = ?`;
    return createProblem('mixed_decimal_fraction', question, result);
  }
}

// Order of operations (PEMDAS/BODMAS)
export function generateOrderOfOperations(difficulty: Difficulty): MathProblem {
  let maxNum: number;
  let useParentheses: boolean;

  switch (difficulty) {
    case 'easy':
      maxNum = 10;
      useParentheses = false;
      break;
    case 'medium':
      maxNum = 15;
      useParentheses = true;
      break;
    case 'hard':
      maxNum = 20;
      useParentheses = true;
      break;
    default:
      maxNum = 12;
      useParentheses = Math.random() < 0.5;
  }

  if (!useParentheses) {
    // Simple order: multiply/divide before add/subtract
    const a = getRandomInt(2, maxNum);
    const b = getRandomInt(2, 9);
    const c = getRandomInt(2, maxNum);

    const problemType = getRandomInt(0, 3);

    switch (problemType) {
      case 0: {
        // a + b x c
        const result = a + b * c;
        const question = `${a} + ${b} x ${c} = ?`;
        return createProblem('order_of_operations', question, result);
      }
      case 1: {
        // a x b + c
        const result = a * b + c;
        const question = `${a} x ${b} + ${c} = ?`;
        return createProblem('order_of_operations', question, result);
      }
      case 2: {
        // a - b x c (ensure positive result)
        const product = b * c;
        const adjustedA = product + getRandomInt(1, 20);
        const result = adjustedA - product;
        const question = `${adjustedA} - ${b} x ${c} = ?`;
        return createProblem('order_of_operations', question, result);
      }
      default: {
        // a x b - c
        const product = a * b;
        const adjustedC = getRandomInt(1, product - 1);
        const result = product - adjustedC;
        const question = `${a} x ${b} - ${adjustedC} = ?`;
        return createProblem('order_of_operations', question, result);
      }
    }
  } else {
    // With parentheses
    const a = getRandomInt(2, maxNum);
    const b = getRandomInt(2, 9);
    const c = getRandomInt(2, maxNum);

    const problemType = getRandomInt(0, 3);

    switch (problemType) {
      case 0: {
        // (a + b) x c
        const result = (a + b) * c;
        const question = `(${a} + ${b}) x ${c} = ?`;
        return createProblem('order_of_operations', question, result);
      }
      case 1: {
        // a x (b + c)
        const result = a * (b + c);
        const question = `${a} x (${b} + ${c}) = ?`;
        return createProblem('order_of_operations', question, result);
      }
      case 2: {
        // (a - b) x c (ensure a > b)
        const adjustedA = b + getRandomInt(1, 10);
        const result = (adjustedA - b) * c;
        const question = `(${adjustedA} - ${b}) x ${c} = ?`;
        return createProblem('order_of_operations', question, result);
      }
      default: {
        // a x (b - c) (ensure b > c)
        const adjustedB = c + getRandomInt(1, 10);
        const result = a * (adjustedB - c);
        const question = `${a} x (${adjustedB} - ${c}) = ?`;
        return createProblem('order_of_operations', question, result);
      }
    }
  }
}
