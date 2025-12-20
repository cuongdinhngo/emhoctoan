import React, { useRef, useEffect } from 'react';

interface AnalogClockProps {
  hour: number;      // 1-12
  minute: number;    // 0-59
  size?: number;     // default 200
}

export const AnalogClock: React.FC<AnalogClockProps> = ({ hour, minute, size = 200 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 10;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw clock face (white background)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw hour markers (small ticks)
    for (let i = 0; i < 60; i++) {
      const angle = (i * 6 - 90) * (Math.PI / 180);
      const innerRadius = i % 5 === 0 ? radius - 15 : radius - 8;
      const outerRadius = radius - 3;

      ctx.beginPath();
      ctx.moveTo(
        centerX + Math.cos(angle) * innerRadius,
        centerY + Math.sin(angle) * innerRadius
      );
      ctx.lineTo(
        centerX + Math.cos(angle) * outerRadius,
        centerY + Math.sin(angle) * outerRadius
      );
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = i % 5 === 0 ? 2 : 1;
      ctx.stroke();
    }

    // Draw hour numbers
    ctx.font = `bold ${size / 10}px Arial`;
    ctx.fillStyle = '#1f2937';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 1; i <= 12; i++) {
      const angle = (i * 30 - 90) * (Math.PI / 180);
      const numberRadius = radius - 30;
      const x = centerX + Math.cos(angle) * numberRadius;
      const y = centerY + Math.sin(angle) * numberRadius;
      ctx.fillText(i.toString(), x, y);
    }

    // Calculate hand angles
    // Hour hand: moves 30° per hour + 0.5° per minute
    const hourAngle = ((hour % 12) * 30 + minute * 0.5 - 90) * (Math.PI / 180);
    // Minute hand: moves 6° per minute
    const minuteAngle = (minute * 6 - 90) * (Math.PI / 180);

    // Draw hour hand (shorter, thicker)
    const hourHandLength = radius * 0.5;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(hourAngle) * hourHandLength,
      centerY + Math.sin(hourAngle) * hourHandLength
    );
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Draw minute hand (longer, thinner)
    const minuteHandLength = radius * 0.75;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(minuteAngle) * minuteHandLength,
      centerY + Math.sin(minuteAngle) * minuteHandLength
    );
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Draw center dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#1f2937';
    ctx.fill();

  }, [hour, minute, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="mx-auto"
    />
  );
};
