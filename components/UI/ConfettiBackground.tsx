
import React from 'react';

const COLORS = ['#FF6B6B', '#48DBFB', '#FF9F43', '#1DD1A1', '#FECA57', '#FF9FF3', '#9333ea'];

export const ConfettiBackground: React.FC<{ count?: number }> = ({ count = 30 }) => {
  const pieces = Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: 3 + Math.random() * 5,
    delay: Math.random() * 5,
    size: 5 + Math.random() * 10,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
};
