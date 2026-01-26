import { MathProblem } from '../../../../types';
import { Difficulty, getRandomInt, createProblem } from '../../helpers';

// Find speed: v = s / t (speed = distance / time)
export function generateSpeedFindSpeed(difficulty: Difficulty): MathProblem {
  let maxDistance: number;
  let maxTime: number;

  switch (difficulty) {
    case 'easy':
      maxDistance = 100;
      maxTime = 5;
      break;
    case 'medium':
      maxDistance = 200;
      maxTime = 8;
      break;
    case 'hard':
      maxDistance = 500;
      maxTime = 10;
      break;
    default:
      maxDistance = 150;
      maxTime = 6;
  }

  // Generate clean division
  const time = getRandomInt(2, maxTime);
  const speed = getRandomInt(10, Math.floor(maxDistance / time));
  const distance = speed * time;

  const vehicles = ['o to', 'xe may', 'xe dap', 'tau hoa', 'thuyen'];
  const vehicle = vehicles[getRandomInt(0, vehicles.length - 1)];

  const question = `Mot ${vehicle} di duoc ${distance} km trong ${time} gio. Tinh van toc cua ${vehicle} (km/gio).`;

  return createProblem('speed_find_speed', question, speed);
}

// Find distance: s = v * t (distance = speed * time)
export function generateSpeedFindDistance(difficulty: Difficulty): MathProblem {
  let maxSpeed: number;
  let maxTime: number;

  switch (difficulty) {
    case 'easy':
      maxSpeed = 50;
      maxTime = 4;
      break;
    case 'medium':
      maxSpeed = 80;
      maxTime = 6;
      break;
    case 'hard':
      maxSpeed = 120;
      maxTime = 8;
      break;
    default:
      maxSpeed = 60;
      maxTime = 5;
  }

  const speed = getRandomInt(20, maxSpeed);
  const time = getRandomInt(2, maxTime);
  const distance = speed * time;

  const vehicles = ['o to', 'xe may', 'nguoi di bo', 'xe dap', 'may bay'];
  const vehicle = vehicles[getRandomInt(0, vehicles.length - 1)];

  const question = `Mot ${vehicle} di voi van toc ${speed} km/gio trong ${time} gio. Tinh quang duong ${vehicle} di duoc (km).`;

  return createProblem('speed_find_distance', question, distance);
}

// Find time: t = s / v (time = distance / speed)
export function generateSpeedFindTime(difficulty: Difficulty): MathProblem {
  let maxDistance: number;
  let maxSpeed: number;

  switch (difficulty) {
    case 'easy':
      maxDistance = 100;
      maxSpeed = 40;
      break;
    case 'medium':
      maxDistance = 200;
      maxSpeed = 60;
      break;
    case 'hard':
      maxDistance = 400;
      maxSpeed = 80;
      break;
    default:
      maxDistance = 150;
      maxSpeed = 50;
  }

  // Generate clean division
  const speed = getRandomInt(20, maxSpeed);
  const time = getRandomInt(2, Math.floor(maxDistance / speed));
  const distance = speed * time;

  const vehicles = ['o to', 'xe buyt', 'tau', 'xe may'];
  const vehicle = vehicles[getRandomInt(0, vehicles.length - 1)];

  const question = `Mot ${vehicle} di voi van toc ${speed} km/gio. Hoi ${vehicle} di quang duong ${distance} km het bao nhieu gio?`;

  return createProblem('speed_find_time', question, time);
}
