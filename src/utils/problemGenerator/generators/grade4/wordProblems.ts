import { MathProblem } from '../../../../types';
import { Difficulty, getRandomInt, createProblem } from '../../helpers';

// Word problem: Ratio (Find two numbers given sum and ratio)
export function generateWordProblemRatio(difficulty: Difficulty): MathProblem {
  let ratio1: number, ratio2: number, multiplier: number;

  switch (difficulty) {
    case 'easy':
      ratio1 = getRandomInt(1, 3);
      ratio2 = getRandomInt(1, 3);
      multiplier = getRandomInt(2, 5);
      break;
    case 'medium':
      ratio1 = getRandomInt(2, 5);
      ratio2 = getRandomInt(2, 5);
      multiplier = getRandomInt(3, 8);
      break;
    case 'hard':
      ratio1 = getRandomInt(3, 7);
      ratio2 = getRandomInt(3, 7);
      multiplier = getRandomInt(5, 12);
      break;
    default:
      ratio1 = getRandomInt(1, 4);
      ratio2 = getRandomInt(1, 4);
      multiplier = getRandomInt(2, 6);
  }

  // Ensure ratio1 != ratio2 for interesting problems
  while (ratio1 === ratio2) {
    ratio2 = getRandomInt(1, 7);
  }

  const num1 = ratio1 * multiplier;
  const num2 = ratio2 * multiplier;
  const sum = num1 + num2;

  const items = [
    { item1: 'ga', item2: 'vit', context: 'Mot trang trai nuoi' },
    { item1: 'cam', item2: 'tao', context: 'Mot cua hang co' },
    { item1: 'bi do', item2: 'bi xanh', context: 'Mot tui co' },
    { item1: 'nam', item2: 'nu', context: 'Mot lop co' }
  ];

  const selected = items[getRandomInt(0, items.length - 1)];
  const askFirst = Math.random() < 0.5;

  const question = `${selected.context} ${sum} con ${selected.item1} va ${selected.item2}. Ti so giua so ${selected.item1} va so ${selected.item2} la ${ratio1}/${ratio2}. Hoi co bao nhieu con ${askFirst ? selected.item1 : selected.item2}?`;

  return createProblem('word_problem_ratio', question, askFirst ? num1 : num2);
}

// Word problem: Average
export function generateWordProblemAverage(difficulty: Difficulty): MathProblem {
  let count: number, minVal: number, maxVal: number;

  switch (difficulty) {
    case 'easy':
      count = 3;
      minVal = 5; maxVal = 20;
      break;
    case 'medium':
      count = 4;
      minVal = 10; maxVal = 50;
      break;
    case 'hard':
      count = 5;
      minVal = 20; maxVal = 100;
      break;
    default:
      count = 3;
      minVal = 5; maxVal = 30;
  }

  // Generate numbers that have an integer average
  let numbers: number[] = [];
  let target = getRandomInt(minVal, maxVal);

  // Generate count-1 numbers, then calculate the last one
  for (let i = 0; i < count - 1; i++) {
    numbers.push(getRandomInt(minVal, maxVal));
  }

  // Calculate what the last number should be for integer average
  const currentSum = numbers.reduce((a, b) => a + b, 0);
  const neededSum = target * count;
  const lastNumber = neededSum - currentSum;

  // If last number is out of range, recalculate
  if (lastNumber < minVal || lastNumber > maxVal) {
    numbers = Array.from({ length: count }, () => getRandomInt(minVal, maxVal));
    // Adjust to make average an integer
    const sum = numbers.reduce((a, b) => a + b, 0);
    const remainder = sum % count;
    if (remainder !== 0) {
      numbers[0] += (count - remainder);
    }
  } else {
    numbers.push(lastNumber);
  }

  const sum = numbers.reduce((a, b) => a + b, 0);
  const average = sum / count;

  const numStr = numbers.join(', ');

  const question = `Tim so trung binh cong cua cac so: ${numStr}.`;

  return createProblem('word_problem_average', question, average);
}

// Word problem: Fraction
export function generateWordProblemFraction(difficulty: Difficulty): MathProblem {
  let denominator: number, totalMin: number, totalMax: number;

  switch (difficulty) {
    case 'easy':
      denominator = getRandomInt(2, 5);
      totalMin = denominator * 5;
      totalMax = denominator * 15;
      break;
    case 'medium':
      denominator = getRandomInt(3, 8);
      totalMin = denominator * 8;
      totalMax = denominator * 25;
      break;
    case 'hard':
      denominator = getRandomInt(4, 10);
      totalMin = denominator * 12;
      totalMax = denominator * 40;
      break;
    default:
      denominator = getRandomInt(2, 6);
      totalMin = denominator * 5;
      totalMax = denominator * 20;
  }

  // Ensure total is divisible by denominator
  const multiplier = getRandomInt(Math.ceil(totalMin / denominator), Math.floor(totalMax / denominator));
  const total = multiplier * denominator;
  const numerator = getRandomInt(1, denominator - 1);
  const answer = (total / denominator) * numerator;

  const problems = [
    {
      question: `Mot cua hang co ${total} qua tao. Da ban ${numerator}/${denominator} so tao. Hoi cua hang da ban bao nhieu qua tao?`,
      answer: answer
    },
    {
      question: `Lop 4A co ${total} hoc sinh. So hoc sinh nu chiem ${numerator}/${denominator} so hoc sinh ca lop. Hoi lop 4A co bao nhieu hoc sinh nu?`,
      answer: answer
    },
    {
      question: `Me mua ${total} met vai. Me dung ${numerator}/${denominator} so vai de may quan ao. Hoi me da dung bao nhieu met vai?`,
      answer: answer
    },
    {
      question: `Mot quang duong dai ${total} km. Mot o to da di duoc ${numerator}/${denominator} quang duong. Hoi o to da di duoc bao nhieu km?`,
      answer: answer
    }
  ];

  const selected = problems[getRandomInt(0, problems.length - 1)];

  return createProblem('word_problem_fraction', selected.question, selected.answer);
}
