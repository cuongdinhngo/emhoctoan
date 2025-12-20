import { MathProblem } from '../../../types';
import { Difficulty, getDifficultyRange, getRandomInt, createProblem } from '../helpers';

// Bang nhan tu 1 den 9
export function generateMultiplicationTable(difficulty: Difficulty = 'medium'): MathProblem {
  const range = getDifficultyRange(difficulty);
  const a = getRandomInt(range.min, range.max);
  const b = getRandomInt(range.min, range.max);
  const answer = a * b;

  return createProblem('multiplication_table', `${a} × ${b} = ?`, answer);
}

// Bang chia tu 1 den 9
export function generateDivisionTable(difficulty: Difficulty = 'medium'): MathProblem {
  const range = getDifficultyRange(difficulty);
  const a = getRandomInt(range.min, range.max);
  const b = getRandomInt(range.min, range.max);
  const product = a * b;
  const answer = b;

  return createProblem('division_table', `${product} : ${a} = ?`, answer);
}
