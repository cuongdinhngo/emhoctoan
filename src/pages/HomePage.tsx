import React from 'react';
import { Link } from 'react-router-dom';
import { GRADES, GradeConfig } from '../constants/grades';

const GradeCard: React.FC<{ grade: GradeConfig }> = ({ grade }) => {
  const colorClasses: Record<string, { bg: string; hover: string; border: string; text: string }> = {
    blue: {
      bg: 'bg-blue-50',
      hover: 'hover:bg-blue-100 hover:border-blue-300',
      border: 'border-blue-200',
      text: 'text-blue-600'
    },
    green: {
      bg: 'bg-green-50',
      hover: 'hover:bg-green-100 hover:border-green-300',
      border: 'border-green-200',
      text: 'text-green-600'
    },
    purple: {
      bg: 'bg-purple-50',
      hover: 'hover:bg-purple-100 hover:border-purple-300',
      border: 'border-purple-200',
      text: 'text-purple-600'
    }
  };

  const colors = colorClasses[grade.color] || colorClasses.blue;

  if (!grade.isAvailable) {
    return (
      <div className={`relative p-6 rounded-2xl border-2 ${colors.bg} ${colors.border} opacity-60 cursor-not-allowed`}>
        <div className="absolute top-3 right-3 bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
          Sắp ra mắt
        </div>
        <div className="text-center">
          <div className="text-5xl mb-4">
            {grade.id === 'grade3' ? '3' : grade.id === 'grade4' ? '4' : '5'}
          </div>
          <h2 className={`text-xl font-bold mb-2 ${colors.text}`}>{grade.label}</h2>
          <p className="text-gray-500 text-sm">{grade.description}</p>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={grade.route}
      className={`block p-6 rounded-2xl border-2 ${colors.bg} ${colors.border} ${colors.hover} transition-all duration-200 transform hover:scale-105 hover:shadow-lg`}
    >
      <div className="text-center">
        <div className={`text-5xl mb-4 font-bold ${colors.text}`}>
          {grade.id === 'grade3' ? '3' : grade.id === 'grade4' ? '4' : '5'}
        </div>
        <h2 className={`text-xl font-bold mb-2 ${colors.text}`}>{grade.label}</h2>
        <p className="text-gray-600 text-sm">{grade.description}</p>
      </div>
    </Link>
  );
};

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="text-3xl">&#129518;</div>
            <h1 className="text-2xl font-bold text-gray-800">Em Học Toán</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Chọn lớp của con</h2>
          <p className="text-gray-600">Luyện tập toán theo chương trình học</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GRADES.map((grade) => (
            <GradeCard key={grade.id} grade={grade} />
          ))}
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Ứng dụng giúp các em học sinh luyện tập toán theo chương trình SGK</p>
        </div>
      </main>
    </div>
  );
};
