import { MathProblem } from '../../../../types';
import { Difficulty, getRandomInt, createProblem } from '../../helpers';

// Unit mass conversion (kg, g, tan, ta, yen)
// 1 tan = 10 ta = 100 yen = 1000 kg
// 1 ta = 10 yen = 100 kg
// 1 yen = 10 kg
// 1 kg = 1000 g
export function generateUnitMassConvert(difficulty: Difficulty): MathProblem {
  const conversions = [
    // Easy conversions
    { from: 'kg', to: 'g', factor: 1000, level: 'easy' },
    { from: 'g', to: 'kg', factor: 1/1000, level: 'easy' },
    { from: 'tan', to: 'kg', factor: 1000, level: 'easy' },
    { from: 'ta', to: 'kg', factor: 100, level: 'easy' },
    // Medium conversions
    { from: 'tan', to: 'ta', factor: 10, level: 'medium' },
    { from: 'ta', to: 'yen', factor: 10, level: 'medium' },
    { from: 'yen', to: 'kg', factor: 10, level: 'medium' },
    // Hard conversions
    { from: 'tan', to: 'yen', factor: 100, level: 'hard' },
    { from: 'tan', to: 'g', factor: 1000000, level: 'hard' }
  ];

  // Filter by difficulty
  let available = conversions;
  switch (difficulty) {
    case 'easy':
      available = conversions.filter(c => c.level === 'easy');
      break;
    case 'medium':
      available = conversions.filter(c => c.level === 'easy' || c.level === 'medium');
      break;
    case 'hard':
      available = conversions;
      break;
  }

  const conv = available[getRandomInt(0, available.length - 1)];

  let value: number;
  if (conv.factor >= 1) {
    value = getRandomInt(1, difficulty === 'hard' ? 10 : 5);
  } else {
    // For division, use multiples
    value = getRandomInt(1, 5) * (1 / conv.factor);
  }

  const answer = Math.round(value * conv.factor);
  const question = `${value} ${conv.from} = ? ${conv.to}`;

  return createProblem('unit_mass_convert', question, answer);
}

// Unit time conversion (gio, phut, giay, ngay)
// 1 ngay = 24 gio
// 1 gio = 60 phut
// 1 phut = 60 giay
export function generateUnitTimeConvert(difficulty: Difficulty): MathProblem {
  const conversions = [
    // Easy
    { from: 'gio', to: 'phut', factor: 60, level: 'easy' },
    { from: 'phut', to: 'giay', factor: 60, level: 'easy' },
    { from: 'ngay', to: 'gio', factor: 24, level: 'easy' },
    // Medium
    { from: 'gio', to: 'giay', factor: 3600, level: 'medium' },
    { from: 'ngay', to: 'phut', factor: 1440, level: 'medium' },
    // Hard - combined
    { from: 'ngay', to: 'giay', factor: 86400, level: 'hard' }
  ];

  let available = conversions;
  switch (difficulty) {
    case 'easy':
      available = conversions.filter(c => c.level === 'easy');
      break;
    case 'medium':
      available = conversions.filter(c => c.level === 'easy' || c.level === 'medium');
      break;
    case 'hard':
      available = conversions;
      break;
  }

  const conv = available[getRandomInt(0, available.length - 1)];
  const value = getRandomInt(1, difficulty === 'hard' ? 5 : 3);
  const answer = value * conv.factor;

  const question = `${value} ${conv.from} = ? ${conv.to}`;

  return createProblem('unit_time_convert', question, answer);
}

// Unit area conversion (m2, dm2, cm2, km2, ha)
// 1 km2 = 100 ha = 1,000,000 m2
// 1 ha = 10,000 m2
// 1 m2 = 100 dm2 = 10,000 cm2
// 1 dm2 = 100 cm2
export function generateUnitAreaConvert(difficulty: Difficulty): MathProblem {
  const conversions = [
    // Easy
    { from: 'm2', to: 'dm2', factor: 100, level: 'easy' },
    { from: 'dm2', to: 'cm2', factor: 100, level: 'easy' },
    { from: 'ha', to: 'm2', factor: 10000, level: 'easy' },
    // Medium
    { from: 'm2', to: 'cm2', factor: 10000, level: 'medium' },
    { from: 'km2', to: 'ha', factor: 100, level: 'medium' },
    { from: 'km2', to: 'm2', factor: 1000000, level: 'medium' },
    // Hard
    { from: 'km2', to: 'dm2', factor: 100000000, level: 'hard' }
  ];

  let available = conversions;
  switch (difficulty) {
    case 'easy':
      available = conversions.filter(c => c.level === 'easy');
      break;
    case 'medium':
      available = conversions.filter(c => c.level === 'easy' || c.level === 'medium');
      break;
    case 'hard':
      available = conversions;
      break;
  }

  const conv = available[getRandomInt(0, available.length - 1)];
  const value = getRandomInt(1, difficulty === 'hard' ? 3 : 5);
  const answer = value * conv.factor;

  const question = `${value} ${conv.from} = ? ${conv.to}`;

  return createProblem('unit_area_convert', question, answer);
}
