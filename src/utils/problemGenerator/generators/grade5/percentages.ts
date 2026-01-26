import { MathProblem } from '../../../../types';
import { Difficulty, getRandomInt, createProblem } from '../../helpers';

// Find percentage of a number (e.g., 25% of 80 = 20)
export function generatePercentOfNumber(difficulty: Difficulty): MathProblem {
  let percentOptions: number[];
  let maxNumber: number;

  switch (difficulty) {
    case 'easy':
      percentOptions = [10, 20, 25, 50];
      maxNumber = 100;
      break;
    case 'medium':
      percentOptions = [5, 10, 15, 20, 25, 30, 50, 75];
      maxNumber = 200;
      break;
    case 'hard':
      percentOptions = [5, 10, 12, 15, 20, 25, 30, 35, 40, 50, 60, 75, 80];
      maxNumber = 500;
      break;
    default:
      percentOptions = [10, 20, 25, 50];
      maxNumber = 200;
  }

  const percent = percentOptions[getRandomInt(0, percentOptions.length - 1)];

  // Generate number that gives clean result
  const multiplier = 100 / percent;
  const baseMultiple = getRandomInt(1, Math.floor(maxNumber / multiplier));
  const number = baseMultiple * multiplier;

  const answer = (number * percent) / 100;

  const question = `Tim ${percent}% cua ${number} = ?`;

  return createProblem('percent_of_number', question, answer);
}

// Find percentage rate (e.g., 25 is what % of 100?)
export function generatePercentFindRate(difficulty: Difficulty): MathProblem {
  let maxTotal: number;
  let percentOptions: number[];

  switch (difficulty) {
    case 'easy':
      percentOptions = [10, 20, 25, 50];
      maxTotal = 100;
      break;
    case 'medium':
      percentOptions = [5, 10, 20, 25, 40, 50, 75];
      maxTotal = 200;
      break;
    case 'hard':
      percentOptions = [5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 80];
      maxTotal = 500;
      break;
    default:
      percentOptions = [10, 20, 25, 50];
      maxTotal = 200;
  }

  const percent = percentOptions[getRandomInt(0, percentOptions.length - 1)];
  const total = getRandomInt(20, maxTotal);
  const part = (total * percent) / 100;

  const question = `${part} la bao nhieu phan tram cua ${total}?\nDien so (khong co dau %):`;

  return createProblem('percent_find_rate', question, percent, 'input');
}

// Find total when percentage is known (e.g., 20% of X = 50, find X)
export function generatePercentFindTotal(difficulty: Difficulty): MathProblem {
  let percentOptions: number[];
  let maxPart: number;

  switch (difficulty) {
    case 'easy':
      percentOptions = [10, 20, 25, 50];
      maxPart = 50;
      break;
    case 'medium':
      percentOptions = [5, 10, 20, 25, 50];
      maxPart = 100;
      break;
    case 'hard':
      percentOptions = [5, 10, 15, 20, 25, 40, 50];
      maxPart = 200;
      break;
    default:
      percentOptions = [10, 20, 25, 50];
      maxPart = 100;
  }

  const percent = percentOptions[getRandomInt(0, percentOptions.length - 1)];

  // Generate clean result
  const total = getRandomInt(20, maxPart * (100 / percent));
  const part = (total * percent) / 100;

  // Ensure part is a whole number
  const adjustedTotal = Math.round(part) * (100 / percent);
  const adjustedPart = Math.round(part);

  const question = `Biet ${percent}% cua mot so la ${adjustedPart}. Tim so do.`;

  return createProblem('percent_find_total', question, adjustedTotal);
}

// Convert fraction/decimal to percentage
export function generatePercentConvert(difficulty: Difficulty): MathProblem {
  const convertType = Math.random() < 0.5 ? 'fraction' : 'decimal';

  if (convertType === 'fraction') {
    // Fraction to percentage
    let fractionOptions: { num: number; den: number; percent: number }[];

    switch (difficulty) {
      case 'easy':
        fractionOptions = [
          { num: 1, den: 2, percent: 50 },
          { num: 1, den: 4, percent: 25 },
          { num: 3, den: 4, percent: 75 },
          { num: 1, den: 5, percent: 20 }
        ];
        break;
      case 'medium':
        fractionOptions = [
          { num: 1, den: 2, percent: 50 },
          { num: 1, den: 4, percent: 25 },
          { num: 3, den: 4, percent: 75 },
          { num: 1, den: 5, percent: 20 },
          { num: 2, den: 5, percent: 40 },
          { num: 3, den: 5, percent: 60 },
          { num: 1, den: 10, percent: 10 },
          { num: 3, den: 10, percent: 30 }
        ];
        break;
      case 'hard':
        fractionOptions = [
          { num: 1, den: 8, percent: 12.5 },
          { num: 3, den: 8, percent: 37.5 },
          { num: 5, den: 8, percent: 62.5 },
          { num: 7, den: 8, percent: 87.5 },
          { num: 1, den: 20, percent: 5 },
          { num: 3, den: 20, percent: 15 },
          { num: 7, den: 20, percent: 35 }
        ];
        break;
      default:
        fractionOptions = [
          { num: 1, den: 2, percent: 50 },
          { num: 1, den: 4, percent: 25 },
          { num: 3, den: 4, percent: 75 }
        ];
    }

    const selected = fractionOptions[getRandomInt(0, fractionOptions.length - 1)];
    const question = `Doi phan so ${selected.num}/${selected.den} sang phan tram.\nDien so (khong co dau %):`;

    // Handle decimal percentages by multiplying by 10
    const answer = selected.percent % 1 === 0 ? selected.percent : Math.round(selected.percent * 10);
    const questionFinal = selected.percent % 1 === 0
      ? question
      : `Doi phan so ${selected.num}/${selected.den} sang phan tram.\nDien ket qua nhan voi 10 (vi du: 12.5% -> dien 125):`;

    return createProblem('percent_convert', questionFinal, answer, 'input');
  } else {
    // Decimal to percentage
    let decimalOptions: { decimal: number; percent: number }[];

    switch (difficulty) {
      case 'easy':
        decimalOptions = [
          { decimal: 0.5, percent: 50 },
          { decimal: 0.25, percent: 25 },
          { decimal: 0.75, percent: 75 },
          { decimal: 0.1, percent: 10 },
          { decimal: 0.2, percent: 20 }
        ];
        break;
      case 'medium':
        decimalOptions = [
          { decimal: 0.5, percent: 50 },
          { decimal: 0.25, percent: 25 },
          { decimal: 0.75, percent: 75 },
          { decimal: 0.15, percent: 15 },
          { decimal: 0.35, percent: 35 },
          { decimal: 0.45, percent: 45 },
          { decimal: 0.05, percent: 5 }
        ];
        break;
      case 'hard':
        decimalOptions = [
          { decimal: 0.125, percent: 12.5 },
          { decimal: 0.375, percent: 37.5 },
          { decimal: 0.625, percent: 62.5 },
          { decimal: 0.875, percent: 87.5 },
          { decimal: 0.08, percent: 8 },
          { decimal: 0.12, percent: 12 }
        ];
        break;
      default:
        decimalOptions = [
          { decimal: 0.5, percent: 50 },
          { decimal: 0.25, percent: 25 },
          { decimal: 0.1, percent: 10 }
        ];
    }

    const selected = decimalOptions[getRandomInt(0, decimalOptions.length - 1)];
    const answer = selected.percent % 1 === 0 ? selected.percent : Math.round(selected.percent * 10);
    const question = selected.percent % 1 === 0
      ? `Doi so thap phan ${selected.decimal} sang phan tram.\nDien so (khong co dau %):`
      : `Doi so thap phan ${selected.decimal} sang phan tram.\nDien ket qua nhan voi 10 (vi du: 12.5% -> dien 125):`;

    return createProblem('percent_convert', question, answer, 'input');
  }
}
