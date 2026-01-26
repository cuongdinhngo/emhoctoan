import { MathProblem } from '../../../../types';
import { Difficulty, getRandomInt, createProblem } from '../../helpers';

// Helper to generate random decimal with specified decimal places
function generateDecimal(min: number, max: number, decimalPlaces: number): number {
  const multiplier = Math.pow(10, decimalPlaces);
  const value = getRandomInt(min * multiplier, max * multiplier) / multiplier;
  return parseFloat(value.toFixed(decimalPlaces));
}

// Helper to round to specified decimal places
function roundTo(num: number, places: number): number {
  return parseFloat(num.toFixed(places));
}

// Decimal read/write - identify place value
export function generateDecimalReadWrite(difficulty: Difficulty): MathProblem {
  let decimalPlaces: number;
  let maxWhole: number;

  switch (difficulty) {
    case 'easy':
      decimalPlaces = 1;
      maxWhole = 10;
      break;
    case 'medium':
      decimalPlaces = 2;
      maxWhole = 100;
      break;
    case 'hard':
      decimalPlaces = 3;
      maxWhole = 1000;
      break;
    default:
      decimalPlaces = 2;
      maxWhole = 100;
  }

  const decimal = generateDecimal(1, maxWhole, decimalPlaces);
  const decimalStr = decimal.toFixed(decimalPlaces);
  const parts = decimalStr.split('.');
  const decimalPart = parts[1];

  const placeNames = ['phan muoi', 'phan tram', 'phan nghin'];
  const placeIndex = getRandomInt(0, Math.min(decimalPlaces - 1, 2));
  const digit = parseInt(decimalPart[placeIndex]);

  const question = `Trong so thap phan ${decimalStr}, chu so ${digit} o hang ${placeNames[placeIndex]}. Gia tri cua no la bao nhieu phan cua 1?\nVi du: phan muoi = 10, phan tram = 100, phan nghin = 1000. Dien so:`;

  const answer = Math.pow(10, placeIndex + 1);

  return createProblem('decimal_read_write', question, answer, 'input');
}

// Compare decimals
export function generateDecimalCompare(difficulty: Difficulty): MathProblem {
  let decimalPlaces: number;
  let maxWhole: number;

  switch (difficulty) {
    case 'easy':
      decimalPlaces = 1;
      maxWhole = 10;
      break;
    case 'medium':
      decimalPlaces = 2;
      maxWhole = 50;
      break;
    case 'hard':
      decimalPlaces = 3;
      maxWhole = 100;
      break;
    default:
      decimalPlaces = 2;
      maxWhole = 50;
  }

  let num1 = generateDecimal(1, maxWhole, decimalPlaces);
  let num2 = generateDecimal(1, maxWhole, decimalPlaces);

  // Ensure they're different
  while (num1 === num2) {
    num2 = generateDecimal(1, maxWhole, decimalPlaces);
  }

  // 1 = first is larger, 2 = second is larger
  const answer = num1 > num2 ? 1 : 2;

  const question = `So sanh: ${num1.toFixed(decimalPlaces)} va ${num2.toFixed(decimalPlaces)}.\nNeu so thu nhat lon hon, dien 1. Neu so thu hai lon hon, dien 2:`;

  return createProblem('decimal_compare', question, answer, 'input');
}

// Add decimals
export function generateDecimalAddition(difficulty: Difficulty): MathProblem {
  let decimalPlaces: number;
  let maxVal: number;

  switch (difficulty) {
    case 'easy':
      decimalPlaces = 1;
      maxVal = 10;
      break;
    case 'medium':
      decimalPlaces = 2;
      maxVal = 50;
      break;
    case 'hard':
      decimalPlaces = 2;
      maxVal = 100;
      break;
    default:
      decimalPlaces = 2;
      maxVal = 50;
  }

  const num1 = generateDecimal(1, maxVal, decimalPlaces);
  const num2 = generateDecimal(1, maxVal, decimalPlaces);
  const answer = roundTo(num1 + num2, decimalPlaces);

  // For decimals, we multiply by 10^decimalPlaces to get integer answer
  const multiplier = Math.pow(10, decimalPlaces);
  const intAnswer = Math.round(answer * multiplier);

  // Ask for the answer multiplied to avoid decimal input issues
  const questionWithHint = `${num1.toFixed(decimalPlaces)} + ${num2.toFixed(decimalPlaces)} = ?\nDien ket qua nhan voi ${multiplier} (vi du: 3.5 -> dien 35):`;

  return createProblem('decimal_addition', questionWithHint, intAnswer, 'input');
}

// Subtract decimals
export function generateDecimalSubtraction(difficulty: Difficulty): MathProblem {
  let decimalPlaces: number;
  let maxVal: number;

  switch (difficulty) {
    case 'easy':
      decimalPlaces = 1;
      maxVal = 10;
      break;
    case 'medium':
      decimalPlaces = 2;
      maxVal = 50;
      break;
    case 'hard':
      decimalPlaces = 2;
      maxVal = 100;
      break;
    default:
      decimalPlaces = 2;
      maxVal = 50;
  }

  let num1 = generateDecimal(1, maxVal, decimalPlaces);
  let num2 = generateDecimal(1, maxVal, decimalPlaces);

  // Ensure num1 > num2
  if (num1 < num2) {
    [num1, num2] = [num2, num1];
  }

  const answer = roundTo(num1 - num2, decimalPlaces);
  const multiplier = Math.pow(10, decimalPlaces);
  const intAnswer = Math.round(answer * multiplier);

  const question = `${num1.toFixed(decimalPlaces)} - ${num2.toFixed(decimalPlaces)} = ?\nDien ket qua nhan voi ${multiplier}:`;

  return createProblem('decimal_subtraction', question, intAnswer, 'input');
}

// Multiply decimals
export function generateDecimalMultiply(difficulty: Difficulty): MathProblem {
  let decimalPlaces: number;
  let maxDecimal: number;
  let maxMultiplier: number;

  switch (difficulty) {
    case 'easy':
      // Decimal x whole number
      decimalPlaces = 1;
      maxDecimal = 10;
      maxMultiplier = 9;
      break;
    case 'medium':
      decimalPlaces = 1;
      maxDecimal = 20;
      maxMultiplier = 20;
      break;
    case 'hard':
      decimalPlaces = 2;
      maxDecimal = 10;
      maxMultiplier = 10;
      break;
    default:
      decimalPlaces = 1;
      maxDecimal = 15;
      maxMultiplier = 15;
  }

  const decimal = generateDecimal(1, maxDecimal, decimalPlaces);
  const multiplier = getRandomInt(2, maxMultiplier);
  const answer = roundTo(decimal * multiplier, decimalPlaces);

  const resultMultiplier = Math.pow(10, decimalPlaces);
  const intAnswer = Math.round(answer * resultMultiplier);

  const question = `${decimal.toFixed(decimalPlaces)} x ${multiplier} = ?\nDien ket qua nhan voi ${resultMultiplier}:`;

  return createProblem('decimal_multiply', question, intAnswer, 'input');
}

// Divide decimals
export function generateDecimalDivide(difficulty: Difficulty): MathProblem {
  let maxQuotient: number;
  let maxDivisor: number;
  let decimalPlaces: number;

  switch (difficulty) {
    case 'easy':
      maxQuotient = 10;
      maxDivisor = 5;
      decimalPlaces = 1;
      break;
    case 'medium':
      maxQuotient = 20;
      maxDivisor = 10;
      decimalPlaces = 1;
      break;
    case 'hard':
      maxQuotient = 50;
      maxDivisor = 20;
      decimalPlaces = 2;
      break;
    default:
      maxQuotient = 15;
      maxDivisor = 8;
      decimalPlaces = 1;
  }

  // Generate result first to ensure clean division
  const quotient = generateDecimal(1, maxQuotient, decimalPlaces);
  const divisor = getRandomInt(2, maxDivisor);
  const dividend = roundTo(quotient * divisor, decimalPlaces);

  const resultMultiplier = Math.pow(10, decimalPlaces);
  const intAnswer = Math.round(quotient * resultMultiplier);

  const question = `${dividend.toFixed(decimalPlaces)} : ${divisor} = ?\nDien ket qua nhan voi ${resultMultiplier}:`;

  return createProblem('decimal_divide', question, intAnswer, 'input');
}
