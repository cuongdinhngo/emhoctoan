import React from 'react';

interface FractionGridProps {
  rows: number;
  cols: number;
  circledCount: number;
  size?: number;
  label?: string;
  isSelected?: boolean;
  isCorrect?: boolean;
  showResult?: boolean;
}

export const FractionGrid: React.FC<FractionGridProps> = ({
  rows,
  cols,
  circledCount,
  size = 120,
  label,
  isSelected = false,
  isCorrect,
  showResult = false
}) => {
  const dotRadius = size / (Math.max(rows, cols) * 3);
  const spacing = size / (Math.max(rows, cols) + 1);
  const startX = (size - (cols - 1) * spacing) / 2;
  const startY = (size - (rows - 1) * spacing) / 2;

  const dots = [];
  let circledSoFar = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = startX + col * spacing;
      const y = startY + row * spacing;
      const isCircled = circledSoFar < circledCount;
      if (isCircled) circledSoFar++;

      dots.push(
        <g key={`${row}-${col}`}>
          {/* Main dot */}
          <circle
            cx={x}
            cy={y}
            r={dotRadius}
            fill={isCircled ? '#3b82f6' : '#1f2937'}
          />
          {/* Circle around selected dots */}
          {isCircled && (
            <circle
              cx={x}
              cy={y}
              r={dotRadius * 2}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="4 2"
            />
          )}
        </g>
      );
    }
  }

  const borderColor = showResult
    ? isCorrect
      ? '#22c55e'
      : isSelected
        ? '#ef4444'
        : '#e5e7eb'
    : isSelected
      ? '#3b82f6'
      : '#e5e7eb';

  const bgColor = showResult
    ? isCorrect
      ? '#f0fdf4'
      : isSelected
        ? '#fef2f2'
        : 'white'
    : isSelected
      ? '#eff6ff'
      : 'white';

  return (
    <div
      className="flex flex-col items-center p-2 rounded-lg border-2 transition-all"
      style={{
        borderColor,
        backgroundColor: bgColor
      }}
    >
      {label && (
        <div className="text-lg font-bold text-gray-700 mb-1">{label}</div>
      )}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background */}
        <rect
          x={0}
          y={0}
          width={size}
          height={size}
          fill="transparent"
        />
        {/* Dots */}
        {dots}
      </svg>
      {showResult && isCorrect && (
        <div className="text-green-600 text-sm font-medium mt-1">Đúng</div>
      )}
    </div>
  );
};

interface FractionOptionsProps {
  options: Array<{
    rows: number;
    cols: number;
    circledCount: number;
    label: string;
  }>;
  selectedLabel?: string;
  correctLabel?: string;
  showResult?: boolean;
  onSelect?: (label: string) => void;
}

export const FractionOptions: React.FC<FractionOptionsProps> = ({
  options,
  selectedLabel,
  correctLabel,
  showResult = false,
  onSelect
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
      {options.map((option) => (
        <button
          key={option.label}
          onClick={() => onSelect?.(option.label)}
          disabled={showResult}
          className="cursor-pointer hover:scale-105 transition-transform disabled:cursor-default disabled:hover:scale-100"
        >
          <FractionGrid
            rows={option.rows}
            cols={option.cols}
            circledCount={option.circledCount}
            label={option.label}
            isSelected={selectedLabel === option.label}
            isCorrect={correctLabel === option.label}
            showResult={showResult}
          />
        </button>
      ))}
    </div>
  );
};
