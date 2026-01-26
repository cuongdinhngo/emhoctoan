import { MathProblem } from '../../../../types';
import { Difficulty, getRandomInt, createProblem } from '../../helpers';

// Parallelogram perimeter: P = 2 * (a + b)
export function generateParallelogramPerimeter(difficulty: Difficulty): MathProblem {
  let sideAMin: number, sideAMax: number, sideBMin: number, sideBMax: number;

  switch (difficulty) {
    case 'easy':
      sideAMin = 3; sideAMax = 10;
      sideBMin = 3; sideBMax = 10;
      break;
    case 'medium':
      sideAMin = 10; sideAMax = 30;
      sideBMin = 5; sideBMax = 25;
      break;
    case 'hard':
      sideAMin = 20; sideAMax = 50;
      sideBMin = 15; sideBMax = 45;
      break;
    default:
      sideAMin = 5; sideAMax = 20;
      sideBMin = 5; sideBMax = 20;
  }

  const sideA = getRandomInt(sideAMin, sideAMax);
  const sideB = getRandomInt(sideBMin, sideBMax);
  const perimeter = 2 * (sideA + sideB);

  const question = `Tinh chu vi hinh binh hanh co do dai hai canh ke nhau la ${sideA} cm va ${sideB} cm.`;

  return createProblem('parallelogram_perimeter', question, perimeter);
}

// Parallelogram area: S = base * height
export function generateParallelogramArea(difficulty: Difficulty): MathProblem {
  let baseMin: number, baseMax: number, heightMin: number, heightMax: number;

  switch (difficulty) {
    case 'easy':
      baseMin = 3; baseMax = 10;
      heightMin = 2; heightMax = 8;
      break;
    case 'medium':
      baseMin = 8; baseMax = 20;
      heightMin = 5; heightMax = 15;
      break;
    case 'hard':
      baseMin = 15; baseMax = 40;
      heightMin = 10; heightMax = 30;
      break;
    default:
      baseMin = 5; baseMax = 15;
      heightMin = 4; heightMax = 12;
  }

  const base = getRandomInt(baseMin, baseMax);
  const height = getRandomInt(heightMin, heightMax);
  const area = base * height;

  const question = `Tinh dien tich hinh binh hanh co do dai day ${base} cm va chieu cao ${height} cm.`;

  return createProblem('parallelogram_area', question, area);
}

// Rhombus perimeter: P = 4 * side
export function generateRhombusPerimeter(difficulty: Difficulty): MathProblem {
  let sideMin: number, sideMax: number;

  switch (difficulty) {
    case 'easy':
      sideMin = 3; sideMax = 15;
      break;
    case 'medium':
      sideMin = 10; sideMax = 30;
      break;
    case 'hard':
      sideMin = 20; sideMax = 50;
      break;
    default:
      sideMin = 5; sideMax = 25;
  }

  const side = getRandomInt(sideMin, sideMax);
  const perimeter = 4 * side;

  const question = `Tinh chu vi hinh thoi co canh ${side} cm.`;

  return createProblem('rhombus_perimeter', question, perimeter);
}

// Rhombus area: S = (d1 * d2) / 2
export function generateRhombusArea(difficulty: Difficulty): MathProblem {
  let diagMin: number, diagMax: number;

  switch (difficulty) {
    case 'easy':
      diagMin = 4; diagMax = 12;
      break;
    case 'medium':
      diagMin = 8; diagMax = 20;
      break;
    case 'hard':
      diagMin = 12; diagMax = 30;
      break;
    default:
      diagMin = 6; diagMax = 16;
  }

  // Ensure even diagonals for integer area
  let diag1 = getRandomInt(diagMin, diagMax);
  let diag2 = getRandomInt(diagMin, diagMax);
  // Make at least one diagonal even
  if (diag1 % 2 !== 0 && diag2 % 2 !== 0) {
    diag1 = diag1 + 1;
  }

  const area = (diag1 * diag2) / 2;

  const question = `Tinh dien tich hinh thoi co do dai hai duong cheo la ${diag1} cm va ${diag2} cm.`;

  return createProblem('rhombus_area', question, area);
}

// Angle types: acute (< 90), right (= 90), obtuse (> 90 and < 180), straight (= 180)
export function generateAngleTypes(_difficulty: Difficulty): MathProblem {
  const angleTypes = [
    { name: 'nhon', range: [1, 89], answer: 1 },
    { name: 'vuong', range: [90, 90], answer: 2 },
    { name: 'tu', range: [91, 179], answer: 3 },
    { name: 'bet', range: [180, 180], answer: 4 }
  ];

  const selectedType = angleTypes[getRandomInt(0, angleTypes.length - 1)];
  const angle = getRandomInt(selectedType.range[0], selectedType.range[1]);

  const question = `Goc ${angle} do la loai goc gi?\nDien 1 neu goc nhon, 2 neu goc vuong, 3 neu goc tu, 4 neu goc bet:`;

  return createProblem('angle_types', question, selectedType.answer, 'input');
}
