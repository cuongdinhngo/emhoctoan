import { MathProblem } from '../../../../types';
import { Difficulty, getRandomInt, createProblem } from '../../helpers';

const PI = 3.14;

// Circle circumference: C = d * PI or C = 2 * r * PI
export function generateCircleCircumference(difficulty: Difficulty): MathProblem {
  let maxRadius: number;

  switch (difficulty) {
    case 'easy':
      maxRadius = 10;
      break;
    case 'medium':
      maxRadius = 20;
      break;
    case 'hard':
      maxRadius = 50;
      break;
    default:
      maxRadius = 15;
  }

  const useRadius = Math.random() < 0.5;
  const radius = getRandomInt(2, maxRadius);
  const diameter = radius * 2;

  let question: string;
  if (useRadius) {
    question = `Tinh chu vi hinh tron co ban kinh r = ${radius} cm.\n(Lay PI = 3.14, dien ket qua nhan voi 100, vi du: 31.4 -> dien 3140)`;
  } else {
    question = `Tinh chu vi hinh tron co duong kinh d = ${diameter} cm.\n(Lay PI = 3.14, dien ket qua nhan voi 100)`;
  }

  const circumference = diameter * PI;
  const answer = Math.round(circumference * 100);

  return createProblem('circle_circumference', question, answer, 'input');
}

// Circle area: S = r * r * PI
export function generateCircleArea(difficulty: Difficulty): MathProblem {
  let maxRadius: number;

  switch (difficulty) {
    case 'easy':
      maxRadius = 5;
      break;
    case 'medium':
      maxRadius = 10;
      break;
    case 'hard':
      maxRadius = 20;
      break;
    default:
      maxRadius = 8;
  }

  const radius = getRandomInt(2, maxRadius);
  const area = radius * radius * PI;
  const answer = Math.round(area * 100);

  const question = `Tinh dien tich hinh tron co ban kinh r = ${radius} cm.\n(Lay PI = 3.14, dien ket qua nhan voi 100)`;

  return createProblem('circle_area', question, answer, 'input');
}

// Rectangular prism volume: V = length * width * height
export function generateRectangularPrismVolume(difficulty: Difficulty): MathProblem {
  let maxDim: number;

  switch (difficulty) {
    case 'easy':
      maxDim = 10;
      break;
    case 'medium':
      maxDim = 15;
      break;
    case 'hard':
      maxDim = 25;
      break;
    default:
      maxDim = 12;
  }

  const length = getRandomInt(3, maxDim);
  const width = getRandomInt(2, maxDim - 1);
  const height = getRandomInt(2, maxDim - 2);

  const volume = length * width * height;

  const question = `Tinh the tich hinh hop chu nhat co:\n- Chieu dai: ${length} cm\n- Chieu rong: ${width} cm\n- Chieu cao: ${height} cm`;

  return createProblem('rectangular_prism_volume', question, volume);
}

// Cube volume: V = a * a * a
export function generateCubeVolume(difficulty: Difficulty): MathProblem {
  let maxSide: number;

  switch (difficulty) {
    case 'easy':
      maxSide = 8;
      break;
    case 'medium':
      maxSide = 12;
      break;
    case 'hard':
      maxSide = 20;
      break;
    default:
      maxSide = 10;
  }

  const side = getRandomInt(2, maxSide);
  const volume = side * side * side;

  const question = `Tinh the tich hinh lap phuong co canh a = ${side} cm.`;

  return createProblem('cube_volume', question, volume);
}

// Composite area - combined shapes
export function generateCompositeArea(difficulty: Difficulty): MathProblem {
  let maxDim: number;

  switch (difficulty) {
    case 'easy':
      maxDim = 10;
      break;
    case 'medium':
      maxDim = 15;
      break;
    case 'hard':
      maxDim = 20;
      break;
    default:
      maxDim = 12;
  }

  // Generate L-shaped figure (rectangle with rectangle cut out, or two rectangles joined)
  const type = getRandomInt(0, 1);

  if (type === 0) {
    // Two rectangles joined (L-shape)
    const rect1Length = getRandomInt(5, maxDim);
    const rect1Width = getRandomInt(3, maxDim - 2);
    const rect2Length = getRandomInt(3, rect1Length - 1);
    const rect2Width = getRandomInt(2, rect1Width - 1);

    const totalArea = rect1Length * rect1Width + rect2Length * rect2Width;

    const question = `Tinh dien tich hinh ghep tu 2 hinh chu nhat:\n- Hinh chu nhat 1: dai ${rect1Length} cm, rong ${rect1Width} cm\n- Hinh chu nhat 2: dai ${rect2Length} cm, rong ${rect2Width} cm`;

    return createProblem('composite_area', question, totalArea);
  } else {
    // Rectangle with square cut out
    const rectLength = getRandomInt(8, maxDim);
    const rectWidth = getRandomInt(6, maxDim - 2);
    const squareSide = getRandomInt(2, Math.min(rectLength, rectWidth) - 2);

    const area = rectLength * rectWidth - squareSide * squareSide;

    const question = `Mot hinh chu nhat co chieu dai ${rectLength} cm, chieu rong ${rectWidth} cm. Nguoi ta cat bo mot hinh vuong co canh ${squareSide} cm. Tinh dien tich phan con lai.`;

    return createProblem('composite_area', question, area);
  }
}
