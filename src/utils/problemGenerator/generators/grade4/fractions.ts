import { MathProblem } from '../../../../types';
import { Difficulty, getRandomInt, createProblem } from '../../helpers';

// Helper to find GCD
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

// Helper to simplify fraction
function simplifyFraction(num: number, den: number): [number, number] {
  const g = gcd(Math.abs(num), Math.abs(den));
  return [num / g, den / g];
}

// Fraction basics - identify numerator, denominator
export function generateFractionBasics(difficulty: Difficulty): MathProblem {
  let numerator: number, denominator: number;

  switch (difficulty) {
    case 'easy':
      numerator = getRandomInt(1, 5);
      denominator = getRandomInt(2, 6);
      break;
    case 'medium':
      numerator = getRandomInt(1, 10);
      denominator = getRandomInt(2, 12);
      break;
    case 'hard':
      numerator = getRandomInt(1, 20);
      denominator = getRandomInt(2, 20);
      break;
    default:
      numerator = getRandomInt(1, 10);
      denominator = getRandomInt(2, 10);
  }

  // Ensure numerator < denominator for proper fractions most of the time
  if (Math.random() < 0.7 && numerator >= denominator) {
    [numerator, denominator] = [denominator, numerator + 1];
  }

  const questionTypes = [
    {
      question: `Cho phan so ${numerator}/${denominator}. Tu so cua phan so la bao nhieu?`,
      answer: numerator
    },
    {
      question: `Cho phan so ${numerator}/${denominator}. Mau so cua phan so la bao nhieu?`,
      answer: denominator
    }
  ];

  const selected = questionTypes[getRandomInt(0, questionTypes.length - 1)];

  return createProblem('fraction_basics', selected.question, selected.answer);
}

// Equivalent fractions
export function generateFractionEquivalent(difficulty: Difficulty): MathProblem {
  let numerator: number, denominator: number, multiplier: number;

  switch (difficulty) {
    case 'easy':
      numerator = getRandomInt(1, 3);
      denominator = getRandomInt(2, 4);
      multiplier = getRandomInt(2, 3);
      break;
    case 'medium':
      numerator = getRandomInt(1, 5);
      denominator = getRandomInt(2, 6);
      multiplier = getRandomInt(2, 5);
      break;
    case 'hard':
      numerator = getRandomInt(1, 8);
      denominator = getRandomInt(2, 10);
      multiplier = getRandomInt(3, 7);
      break;
    default:
      numerator = getRandomInt(1, 5);
      denominator = getRandomInt(2, 6);
      multiplier = getRandomInt(2, 4);
  }

  // Ensure proper fraction
  if (numerator >= denominator) {
    numerator = denominator - 1;
  }

  const newNum = numerator * multiplier;
  const newDen = denominator * multiplier;

  // Either find equivalent or simplify
  if (Math.random() < 0.5) {
    // Find equivalent
    const question = `Tim x sao cho: ${numerator}/${denominator} = x/${newDen}`;
    return createProblem('fraction_equivalent', question, newNum);
  } else {
    // Simplify
    const question = `Rut gon phan so ${newNum}/${newDen}. Tu so sau khi rut gon la:`;
    return createProblem('fraction_equivalent', question, numerator);
  }
}

// Compare fractions
export function generateFractionCompare(difficulty: Difficulty): MathProblem {
  let num1: number, den1: number, num2: number, den2: number;

  switch (difficulty) {
    case 'easy':
      // Same denominator
      den1 = den2 = getRandomInt(2, 6);
      num1 = getRandomInt(1, den1 - 1);
      num2 = getRandomInt(1, den1 - 1);
      while (num2 === num1) num2 = getRandomInt(1, den1 - 1);
      break;
    case 'medium':
      // One denominator is multiple of other
      den1 = getRandomInt(2, 6);
      den2 = den1 * getRandomInt(2, 3);
      num1 = getRandomInt(1, den1 - 1);
      num2 = getRandomInt(1, den2 - 1);
      break;
    case 'hard':
      // Different denominators
      den1 = getRandomInt(2, 8);
      den2 = getRandomInt(2, 8);
      while (den2 === den1) den2 = getRandomInt(2, 8);
      num1 = getRandomInt(1, den1 - 1);
      num2 = getRandomInt(1, den2 - 1);
      break;
    default:
      den1 = den2 = getRandomInt(2, 6);
      num1 = getRandomInt(1, den1 - 1);
      num2 = getRandomInt(1, den1 - 1);
  }

  const val1 = num1 / den1;
  const val2 = num2 / den2;

  // 1 = first is larger, 2 = second is larger, 0 = equal
  let answer: number;
  if (Math.abs(val1 - val2) < 0.0001) {
    answer = 0;
  } else if (val1 > val2) {
    answer = 1;
  } else {
    answer = 2;
  }

  const question = `So sanh hai phan so: ${num1}/${den1} va ${num2}/${den2}.\nNeu ${num1}/${den1} > ${num2}/${den2} dien 1, neu ${num1}/${den1} < ${num2}/${den2} dien 2, neu bang nhau dien 0:`;

  return createProblem('fraction_compare', question, answer, 'input');
}

// Add fractions
export function generateFractionAddition(difficulty: Difficulty): MathProblem {
  let num1: number, den1: number, num2: number, den2: number;

  switch (difficulty) {
    case 'easy':
      // Same denominator
      den1 = den2 = getRandomInt(3, 8);
      num1 = getRandomInt(1, den1 - 2);
      num2 = getRandomInt(1, den1 - num1 - 1);
      break;
    case 'medium':
      // One denominator is multiple of other
      den1 = getRandomInt(2, 5);
      den2 = den1 * 2;
      num1 = getRandomInt(1, den1 - 1);
      num2 = getRandomInt(1, den2 - 1);
      break;
    case 'hard':
      // Different denominators - need common denominator
      den1 = getRandomInt(2, 6);
      den2 = getRandomInt(2, 6);
      while (den2 === den1) den2 = getRandomInt(2, 6);
      num1 = getRandomInt(1, den1 - 1);
      num2 = getRandomInt(1, den2 - 1);
      break;
    default:
      den1 = den2 = getRandomInt(3, 8);
      num1 = getRandomInt(1, den1 - 2);
      num2 = getRandomInt(1, den1 - num1 - 1);
  }

  // Calculate result
  const commonDen = (den1 * den2) / gcd(den1, den2);
  const resultNum = num1 * (commonDen / den1) + num2 * (commonDen / den2);
  const [simplifiedNum, simplifiedDen] = simplifyFraction(resultNum, commonDen);

  const question = `${num1}/${den1} + ${num2}/${den2} = ?/${simplifiedDen}\nDien tu so:`;

  return createProblem('fraction_addition', question, simplifiedNum);
}

// Subtract fractions
export function generateFractionSubtraction(difficulty: Difficulty): MathProblem {
  let num1: number, den1: number, num2: number, den2: number;

  switch (difficulty) {
    case 'easy':
      // Same denominator
      den1 = den2 = getRandomInt(3, 8);
      num1 = getRandomInt(2, den1 - 1);
      num2 = getRandomInt(1, num1 - 1);
      break;
    case 'medium':
      // One denominator is multiple of other
      den1 = getRandomInt(2, 5);
      den2 = den1 * 2;
      num1 = getRandomInt(den1 - 1, den1);
      num2 = getRandomInt(1, den2 / 2);
      break;
    case 'hard':
      // Different denominators
      den1 = getRandomInt(2, 6);
      den2 = getRandomInt(2, 6);
      while (den2 === den1) den2 = getRandomInt(2, 6);
      // Ensure first fraction > second
      const commonDen = (den1 * den2) / gcd(den1, den2);
      const maxNum1 = commonDen - 1;
      num1 = getRandomInt(Math.ceil(commonDen / 2 / (commonDen / den1)), Math.floor(maxNum1 / (commonDen / den1)));
      const num1InCommon = num1 * (commonDen / den1);
      num2 = getRandomInt(1, Math.floor((num1InCommon - 1) / (commonDen / den2)));
      break;
    default:
      den1 = den2 = getRandomInt(3, 8);
      num1 = getRandomInt(2, den1 - 1);
      num2 = getRandomInt(1, num1 - 1);
  }

  // Calculate result
  const commonDen = (den1 * den2) / gcd(den1, den2);
  const resultNum = num1 * (commonDen / den1) - num2 * (commonDen / den2);
  const [simplifiedNum, simplifiedDen] = simplifyFraction(Math.abs(resultNum), commonDen);

  const question = `${num1}/${den1} - ${num2}/${den2} = ?/${simplifiedDen}\nDien tu so:`;

  return createProblem('fraction_subtraction', question, simplifiedNum);
}

// Multiply fractions
export function generateFractionMultiply(difficulty: Difficulty): MathProblem {
  let num1: number, den1: number, num2: number, den2: number;

  switch (difficulty) {
    case 'easy':
      // Fraction times whole number
      num1 = getRandomInt(1, 3);
      den1 = getRandomInt(2, 5);
      num2 = getRandomInt(2, 5);
      den2 = 1;
      break;
    case 'medium':
      // Two fractions, simple
      num1 = getRandomInt(1, 4);
      den1 = getRandomInt(2, 6);
      num2 = getRandomInt(1, 4);
      den2 = getRandomInt(2, 6);
      break;
    case 'hard':
      // Two fractions, may need simplification
      num1 = getRandomInt(2, 6);
      den1 = getRandomInt(3, 8);
      num2 = getRandomInt(2, 6);
      den2 = getRandomInt(3, 8);
      break;
    default:
      num1 = getRandomInt(1, 4);
      den1 = getRandomInt(2, 6);
      num2 = getRandomInt(1, 4);
      den2 = getRandomInt(2, 6);
  }

  const resultNum = num1 * num2;
  const resultDen = den1 * den2;
  const [simplifiedNum, simplifiedDen] = simplifyFraction(resultNum, resultDen);

  let question: string;
  if (den2 === 1) {
    question = `${num1}/${den1} x ${num2} = ?/${simplifiedDen}\nDien tu so:`;
  } else {
    question = `${num1}/${den1} x ${num2}/${den2} = ?/${simplifiedDen}\nDien tu so:`;
  }

  return createProblem('fraction_multiply', question, simplifiedNum);
}

// Divide fractions
export function generateFractionDivide(difficulty: Difficulty): MathProblem {
  let num1: number, den1: number, num2: number, den2: number;

  switch (difficulty) {
    case 'easy':
      // Fraction divided by whole number
      num1 = getRandomInt(2, 6);
      den1 = getRandomInt(2, 5);
      num2 = getRandomInt(2, 4);
      den2 = 1;
      break;
    case 'medium':
      // Two fractions, simple
      num1 = getRandomInt(1, 5);
      den1 = getRandomInt(2, 6);
      num2 = getRandomInt(1, 4);
      den2 = getRandomInt(2, 5);
      break;
    case 'hard':
      // Two fractions
      num1 = getRandomInt(2, 8);
      den1 = getRandomInt(3, 8);
      num2 = getRandomInt(2, 6);
      den2 = getRandomInt(3, 8);
      break;
    default:
      num1 = getRandomInt(1, 5);
      den1 = getRandomInt(2, 6);
      num2 = getRandomInt(1, 4);
      den2 = getRandomInt(2, 5);
  }

  // a/b : c/d = a/b x d/c = (a*d)/(b*c)
  const resultNum = num1 * den2;
  const resultDen = den1 * num2;
  const [simplifiedNum, simplifiedDen] = simplifyFraction(resultNum, resultDen);

  let question: string;
  if (den2 === 1) {
    question = `${num1}/${den1} : ${num2} = ?/${simplifiedDen}\nDien tu so:`;
  } else {
    question = `${num1}/${den1} : ${num2}/${den2} = ?/${simplifiedDen}\nDien tu so:`;
  }

  return createProblem('fraction_divide', question, simplifiedNum);
}

// Find fraction of a number
export function generateFractionOfNumber(difficulty: Difficulty): MathProblem {
  let numerator: number, denominator: number, number: number;

  switch (difficulty) {
    case 'easy':
      denominator = getRandomInt(2, 5);
      numerator = getRandomInt(1, denominator - 1);
      // Ensure number is divisible by denominator
      number = denominator * getRandomInt(2, 5);
      break;
    case 'medium':
      denominator = getRandomInt(2, 8);
      numerator = getRandomInt(1, denominator - 1);
      number = denominator * getRandomInt(3, 8);
      break;
    case 'hard':
      denominator = getRandomInt(3, 10);
      numerator = getRandomInt(2, denominator - 1);
      number = denominator * getRandomInt(4, 12);
      break;
    default:
      denominator = getRandomInt(2, 6);
      numerator = getRandomInt(1, denominator - 1);
      number = denominator * getRandomInt(2, 6);
  }

  const answer = (number / denominator) * numerator;
  const question = `Tim ${numerator}/${denominator} cua ${number} = ?`;

  return createProblem('fraction_of_number', question, answer);
}
