import { MathProblem } from '../../../../types';
import { Difficulty, getRandomInt, createProblem } from '../../helpers';

// Word problem with percentages (discount, interest, etc.)
export function generateWordProblemPercentG5(difficulty: Difficulty): MathProblem {
  let maxPrice: number;
  let percentOptions: number[];

  switch (difficulty) {
    case 'easy':
      maxPrice = 200;
      percentOptions = [10, 20, 25, 50];
      break;
    case 'medium':
      maxPrice = 500;
      percentOptions = [5, 10, 15, 20, 25, 30];
      break;
    case 'hard':
      maxPrice = 1000;
      percentOptions = [5, 8, 10, 12, 15, 20, 25];
      break;
    default:
      maxPrice = 300;
      percentOptions = [10, 20, 25];
  }

  const problemType = getRandomInt(0, 2);
  const percent = percentOptions[getRandomInt(0, percentOptions.length - 1)];

  if (problemType === 0) {
    // Discount problem
    const originalPrice = getRandomInt(50, maxPrice);
    const discount = (originalPrice * percent) / 100;
    const finalPrice = originalPrice - discount;

    const items = ['ao', 'quan', 'giay', 'cap sach', 'dong ho'];
    const item = items[getRandomInt(0, items.length - 1)];

    const question = `Mot chiec ${item} co gia ${originalPrice} nghin dong. Cua hang giam gia ${percent}%. Hoi gia ban cua chiec ${item} sau khi giam la bao nhieu nghin dong?`;

    return createProblem('word_problem_percent_g5', question, finalPrice);
  } else if (problemType === 1) {
    // Increase problem
    const original = getRandomInt(100, maxPrice);
    const increase = (original * percent) / 100;
    const final = original + increase;

    const question = `Mot nong trai nam ngoai thu duoc ${original} tan lua. Nam nay san luong tang ${percent}%. Hoi nam nay nong trai thu duoc bao nhieu tan lua?`;

    return createProblem('word_problem_percent_g5', question, final);
  } else {
    // Find original after percentage
    const percent2 = percentOptions[getRandomInt(0, percentOptions.length - 1)];
    const original = getRandomInt(50, maxPrice);
    const part = (original * percent2) / 100;

    const question = `Mot lop co ${original} hoc sinh. So hoc sinh gioi chiem ${percent2}% so hoc sinh ca lop. Hoi lop co bao nhieu hoc sinh gioi?`;

    return createProblem('word_problem_percent_g5', question, part);
  }
}

// Word problem about motion (two vehicles)
export function generateWordProblemSpeed(difficulty: Difficulty): MathProblem {
  let maxSpeed: number;

  switch (difficulty) {
    case 'easy':
      maxSpeed = 50;
      break;
    case 'medium':
      maxSpeed = 70;
      break;
    case 'hard':
      maxSpeed = 100;
      break;
    default:
      maxSpeed = 60;
  }

  const problemType = getRandomInt(0, 1);

  if (problemType === 0) {
    // Two vehicles moving towards each other
    const speed1 = getRandomInt(30, maxSpeed);
    const speed2 = getRandomInt(20, maxSpeed - 10);
    const combinedSpeed = speed1 + speed2;
    const time = getRandomInt(2, 5);
    const distance = combinedSpeed * time;

    const question = `Hai o to khoi hanh cung mot luc tu hai thanh pho A va B di nguoc chieu nhau. O to thu nhat di voi van toc ${speed1} km/gio, o to thu hai di voi van toc ${speed2} km/gio. Sau ${time} gio hai o to gap nhau. Hoi quang duong AB dai bao nhieu km?`;

    return createProblem('word_problem_speed', question, distance);
  } else {
    // One vehicle catching up to another
    const speed1 = getRandomInt(40, maxSpeed);
    const speed2 = getRandomInt(20, speed1 - 10);

    // Time for faster vehicle to catch up
    const speedDiff = speed1 - speed2;
    // Ensure clean division
    const time = getRandomInt(1, 3);
    const headStart = speedDiff * time;

    const question = `Mot xe may di voi van toc ${speed2} km/gio. Sau do ${time} gio, mot o to bat dau duoi theo voi van toc ${speed1} km/gio. Hoi luc o to bat dau di, xe may da di duoc bao nhieu km?`;

    return createProblem('word_problem_speed', question, headStart);
  }
}

// Word problem about work (productivity)
export function generateWordProblemWork(difficulty: Difficulty): MathProblem {
  let maxWorkers: number;
  let maxDays: number;

  switch (difficulty) {
    case 'easy':
      maxWorkers = 10;
      maxDays = 10;
      break;
    case 'medium':
      maxWorkers = 20;
      maxDays = 15;
      break;
    case 'hard':
      maxWorkers = 30;
      maxDays = 20;
      break;
    default:
      maxWorkers = 15;
      maxDays = 12;
  }

  const problemType = getRandomInt(0, 1);

  if (problemType === 0) {
    // Find total work or time
    const workers = getRandomInt(5, maxWorkers);
    const days = getRandomInt(3, maxDays);
    const totalWork = workers * days;

    const question = `${workers} cong nhan lam xong mot cong viec trong ${days} ngay. Hoi muon lam xong cong viec do trong 1 ngay thi can bao nhieu cong nhan? (Gia su moi cong nhan co nang suat nhu nhau)`;

    return createProblem('word_problem_work', question, totalWork);
  } else {
    // Find workers or days needed
    const workers1 = getRandomInt(5, maxWorkers);
    const days1 = getRandomInt(4, maxDays);
    const totalWork = workers1 * days1;

    // New scenario
    const workers2 = getRandomInt(3, maxWorkers);
    const days2 = totalWork / workers2;

    // Ensure clean division
    const adjustedWorkers2 = totalWork / Math.round(days2);
    const adjustedDays2 = Math.round(days2);

    if (adjustedDays2 !== totalWork / adjustedWorkers2) {
      // Fallback to simpler problem
      const simpleWorkers = getRandomInt(4, 12);
      const simpleDays = getRandomInt(3, 8);
      const simpleTotal = simpleWorkers * simpleDays;
      const halfWorkers = Math.round(simpleTotal / 2);
      const answerDays = Math.round(simpleTotal / halfWorkers);

      const question = `${simpleWorkers} cong nhan lam xong mot cong viec trong ${simpleDays} ngay. Hoi ${halfWorkers} cong nhan lam xong cong viec do trong may ngay?`;

      return createProblem('word_problem_work', question, answerDays);
    }

    const question = `${workers1} cong nhan lam xong mot cong viec trong ${days1} ngay. Hoi ${adjustedWorkers2} cong nhan lam xong cong viec do trong may ngay?`;

    return createProblem('word_problem_work', question, adjustedDays2);
  }
}
