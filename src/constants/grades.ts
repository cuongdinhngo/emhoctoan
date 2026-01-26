export type Grade = 'grade3' | 'grade4' | 'grade5';

export interface GradeConfig {
  id: Grade;
  label: string;
  shortLabel: string;
  route: string;
  description: string;
  color: string;
  bgColor: string;
  hoverColor: string;
  isAvailable: boolean;
}

export const GRADES: GradeConfig[] = [
  {
    id: 'grade3',
    label: 'Toán Lớp 3',
    shortLabel: 'Lớp 3',
    route: '/lop-3',
    description: 'Phép tính cơ bản, bảng nhân chia, hình học đơn giản',
    color: 'blue',
    bgColor: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    isAvailable: true
  },
  {
    id: 'grade4',
    label: 'Toán Lớp 4',
    shortLabel: 'Lớp 4',
    route: '/lop-4',
    description: 'Phân số, chia hết, số lớn, hình bình hành & hình thoi',
    color: 'green',
    bgColor: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    isAvailable: true
  },
  {
    id: 'grade5',
    label: 'Toán Lớp 5',
    shortLabel: 'Lớp 5',
    route: '/lop-5',
    description: 'Số thập phân, phần trăm, hình học nâng cao',
    color: 'purple',
    bgColor: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600',
    isAvailable: true
  }
];

export const getGradeConfig = (grade: Grade): GradeConfig | undefined => {
  return GRADES.find(g => g.id === grade);
};

export const getGradeByRoute = (route: string): GradeConfig | undefined => {
  return GRADES.find(g => g.route === route || g.route === `/${route}`);
};

export const DEFAULT_GRADE: Grade = 'grade3';
