import { MathProblem } from '../../../types';
import { Difficulty, getRandomInt, createProblem } from '../helpers';

// Phep cong trong pham vi 1000
export function generateAddition(difficulty: Difficulty = 'medium'): MathProblem {
  let a: number, b: number;

  switch (difficulty) {
    case 'easy':
      a = getRandomInt(1, 50);
      b = getRandomInt(1, 50);
      break;
    case 'medium':
      a = getRandomInt(10, 200);
      b = getRandomInt(10, 200);
      break;
    case 'hard':
      a = getRandomInt(100, 500);
      b = getRandomInt(100, 500);
      break;
    default:
      a = getRandomInt(0, 1000);
      b = getRandomInt(0, 1000 - a);
  }

  const answer = a + b;
  return createProblem('addition', `${a} + ${b} = ?`, answer);
}

// Phep tru trong pham vi 1000
export function generateSubtraction(difficulty: Difficulty = 'medium'): MathProblem {
  let a: number, b: number;

  switch (difficulty) {
    case 'easy':
      a = getRandomInt(10, 50);
      b = getRandomInt(1, a - 1);
      break;
    case 'medium':
      a = getRandomInt(50, 200);
      b = getRandomInt(10, a - 10);
      break;
    case 'hard':
      a = getRandomInt(200, 800);
      b = getRandomInt(50, a - 50);
      break;
    default:
      a = getRandomInt(0, 1000);
      b = getRandomInt(0, a);
  }

  const answer = a - b;
  return createProblem('subtraction', `${a} - ${b} = ?`, answer);
}

// Phep nhan trong pham vi 100
export function generateMultiplication(difficulty: Difficulty = 'medium'): MathProblem {
  let a: number, b: number;

  switch (difficulty) {
    case 'easy':
      a = getRandomInt(2, 5);
      b = getRandomInt(2, 5);
      break;
    case 'medium':
      a = getRandomInt(3, 8);
      b = getRandomInt(3, 8);
      break;
    case 'hard':
      a = getRandomInt(6, 10);
      b = getRandomInt(6, 10);
      break;
    default:
      a = getRandomInt(1, 10);
      b = getRandomInt(1, 10);
  }

  const answer = a * b;
  return createProblem('multiplication', `${a} × ${b} = ?`, answer);
}

// Phep chia trong pham vi 100
export function generateDivision(difficulty: Difficulty = 'medium'): MathProblem {
  let a: number, b: number;

  switch (difficulty) {
    case 'easy':
      a = getRandomInt(2, 5);
      b = getRandomInt(2, 5);
      break;
    case 'medium':
      a = getRandomInt(3, 8);
      b = getRandomInt(3, 8);
      break;
    case 'hard':
      a = getRandomInt(6, 10);
      b = getRandomInt(6, 10);
      break;
    default:
      a = getRandomInt(1, 10);
      b = getRandomInt(1, 10);
  }

  const product = a * b;
  const answer = b;
  return createProblem('division', `${product} : ${a} = ?`, answer);
}
