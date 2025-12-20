import { MathProblem } from '../../../types';
import { Difficulty, getRandomInt, createProblem } from '../helpers';

// Diem o giua - Trung diem cua doan thang
export function generateGeometryMidpoint(difficulty: Difficulty = 'medium'): MathProblem {
  let length: number;

  switch (difficulty) {
    case 'easy':
      length = getRandomInt(4, 20);
      break;
    case 'medium':
      length = getRandomInt(10, 40);
      break;
    case 'hard':
      length = getRandomInt(20, 80);
      break;
    default:
      length = getRandomInt(4, 40);
  }

  const answer = Math.floor(length / 2);
  const question = `Đoạn thẳng AB dài ${length}cm. Điểm M là trung điểm của AB. Hỏi AM dài bao nhiêu cm?`;

  return createProblem('geometry_midpoint', question, answer);
}

// Hinh tron: tam, ban kinh, duong kinh
export function generateGeometryCircle(difficulty: Difficulty = 'medium'): MathProblem {
  const isRadiusToDiameter = Math.random() < 0.5;
  let radius: number;

  switch (difficulty) {
    case 'easy':
      radius = getRandomInt(2, 10);
      break;
    case 'medium':
      radius = getRandomInt(5, 20);
      break;
    case 'hard':
      radius = getRandomInt(10, 40);
      break;
    default:
      radius = getRandomInt(2, 20);
  }

  if (isRadiusToDiameter) {
    const answer = radius * 2;
    const question = `Hình tròn có bán kính ${radius}cm. Hỏi đường kính của hình tròn là bao nhiêu cm?`;
    return createProblem('geometry_circle', question, answer);
  } else {
    const diameter = radius * 2;
    const answer = radius;
    const question = `Hình tròn có đường kính ${diameter}cm. Hỏi bán kính của hình tròn là bao nhiêu cm?`;
    return createProblem('geometry_circle', question, answer);
  }
}

// Hinh chu nhat, chu vi, dien tich hinh chu nhat
export function generateGeometryRectangle(difficulty: Difficulty = 'medium'): MathProblem {
  const isPerimeter = Math.random() < 0.5;
  let length: number, width: number;

  switch (difficulty) {
    case 'easy':
      length = getRandomInt(3, 10);
      width = getRandomInt(2, 8);
      break;
    case 'medium':
      length = getRandomInt(5, 20);
      width = getRandomInt(4, 15);
      break;
    case 'hard':
      length = getRandomInt(10, 40);
      width = getRandomInt(8, 30);
      break;
    default:
      length = getRandomInt(3, 20);
      width = getRandomInt(2, 15);
  }

  if (isPerimeter) {
    const answer = 2 * (length + width);
    const question = `Hình chữ nhật có chiều dài ${length}cm, chiều rộng ${width}cm. Hỏi chu vi hình chữ nhật là bao nhiêu cm?`;
    return createProblem('geometry_rectangle', question, answer);
  } else {
    const answer = length * width;
    const question = `Hình chữ nhật có chiều dài ${length}cm, chiều rộng ${width}cm. Hỏi diện tích hình chữ nhật là bao nhiêu cm²?`;
    return createProblem('geometry_rectangle', question, answer);
  }
}

// Hinh vuong, chu vi, dien tich hinh vuong
export function generateGeometrySquare(difficulty: Difficulty = 'medium'): MathProblem {
  const isPerimeter = Math.random() < 0.5;
  let side: number;

  switch (difficulty) {
    case 'easy':
      side = getRandomInt(3, 10);
      break;
    case 'medium':
      side = getRandomInt(5, 20);
      break;
    case 'hard':
      side = getRandomInt(10, 40);
      break;
    default:
      side = getRandomInt(3, 20);
  }

  if (isPerimeter) {
    const answer = 4 * side;
    const question = `Hình vuông có cạnh ${side}cm. Hỏi chu vi hình vuông là bao nhiêu cm?`;
    return createProblem('geometry_square', question, answer);
  } else {
    const answer = side * side;
    const question = `Hình vuông có cạnh ${side}cm. Hỏi diện tích hình vuông là bao nhiêu cm²?`;
    return createProblem('geometry_square', question, answer);
  }
}
