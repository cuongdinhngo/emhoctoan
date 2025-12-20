import { MathProblem } from '../../../types';
import { Difficulty, getRandomInt, createProblem } from '../helpers';

// Nhan so co hai chu so voi so co mot chu so
export function generateTwoDigitMultiply(difficulty: Difficulty = 'medium'): MathProblem {
  let twoDigit: number, oneDigit: number;

  switch (difficulty) {
    case 'easy':
      twoDigit = getRandomInt(10, 25);
      oneDigit = getRandomInt(2, 5);
      break;
    case 'medium':
      twoDigit = getRandomInt(15, 50);
      oneDigit = getRandomInt(3, 8);
      break;
    case 'hard':
      twoDigit = getRandomInt(20, 99);
      oneDigit = getRandomInt(4, 9);
      break;
    default:
      twoDigit = getRandomInt(10, 99);
      oneDigit = getRandomInt(2, 9);
  }

  const answer = twoDigit * oneDigit;
  return createProblem('two_digit_multiply', `${twoDigit} × ${oneDigit} = ?`, answer);
}

// Chia so co hai chu so cho so co mot chu so
export function generateTwoDigitDivide(difficulty: Difficulty = 'medium'): MathProblem {
  let twoDigit: number, oneDigit: number, answer: number;

  switch (difficulty) {
    case 'easy':
      oneDigit = getRandomInt(2, 5);
      answer = getRandomInt(3, 12);
      twoDigit = oneDigit * answer;
      break;
    case 'medium':
      oneDigit = getRandomInt(3, 7);
      answer = getRandomInt(5, 20);
      twoDigit = oneDigit * answer;
      break;
    case 'hard':
      oneDigit = getRandomInt(4, 9);
      answer = getRandomInt(8, 25);
      twoDigit = oneDigit * answer;
      break;
    default:
      oneDigit = getRandomInt(2, 9);
      answer = getRandomInt(3, 30);
      twoDigit = oneDigit * answer;
  }

  return createProblem('two_digit_divide', `${twoDigit} : ${oneDigit} = ?`, answer);
}

// Nhan so co ba chu so voi so co mot chu so
export function generateThreeDigitMultiply(difficulty: Difficulty = 'medium'): MathProblem {
  let threeDigit: number, oneDigit: number;

  switch (difficulty) {
    case 'easy':
      threeDigit = getRandomInt(100, 200);
      oneDigit = getRandomInt(2, 5);
      break;
    case 'medium':
      threeDigit = getRandomInt(150, 400);
      oneDigit = getRandomInt(3, 7);
      break;
    case 'hard':
      threeDigit = getRandomInt(200, 999);
      oneDigit = getRandomInt(4, 9);
      break;
    default:
      threeDigit = getRandomInt(100, 999);
      oneDigit = getRandomInt(2, 9);
  }

  const answer = threeDigit * oneDigit;
  return createProblem('three_digit_multiply', `${threeDigit} × ${oneDigit} = ?`, answer);
}

// Chia so co ba chu so cho so co mot chu so
export function generateThreeDigitDivide(difficulty: Difficulty = 'medium'): MathProblem {
  let threeDigit: number, oneDigit: number, answer: number;

  switch (difficulty) {
    case 'easy':
      oneDigit = getRandomInt(2, 5);
      answer = getRandomInt(20, 50);
      threeDigit = oneDigit * answer;
      break;
    case 'medium':
      oneDigit = getRandomInt(3, 7);
      answer = getRandomInt(30, 100);
      threeDigit = oneDigit * answer;
      break;
    case 'hard':
      oneDigit = getRandomInt(4, 9);
      answer = getRandomInt(50, 200);
      threeDigit = oneDigit * answer;
      break;
    default:
      oneDigit = getRandomInt(2, 9);
      answer = getRandomInt(20, 300);
      threeDigit = oneDigit * answer;
  }

  return createProblem('three_digit_divide', `${threeDigit} : ${oneDigit} = ?`, answer);
}

// Phep chia co du
export function generateDivisionWithRemainder(difficulty: Difficulty = 'medium'): MathProblem {
  let dividend: number, divisor: number, quotient: number, remainder: number;

  switch (difficulty) {
    case 'easy':
      divisor = getRandomInt(2, 5);
      quotient = getRandomInt(3, 8);
      remainder = getRandomInt(1, divisor - 1);
      dividend = divisor * quotient + remainder;
      break;
    case 'medium':
      divisor = getRandomInt(3, 7);
      quotient = getRandomInt(5, 15);
      remainder = getRandomInt(1, divisor - 1);
      dividend = divisor * quotient + remainder;
      break;
    case 'hard':
      divisor = getRandomInt(4, 9);
      quotient = getRandomInt(8, 25);
      remainder = getRandomInt(1, divisor - 1);
      dividend = divisor * quotient + remainder;
      break;
    default:
      divisor = getRandomInt(2, 9);
      quotient = getRandomInt(3, 20);
      remainder = getRandomInt(1, divisor - 1);
      dividend = divisor * quotient + remainder;
  }

  return createProblem(
    'division_with_remainder',
    `${dividend} : ${divisor} = ? (dư ${remainder})`,
    quotient
  );
}
