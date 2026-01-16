
import React, { useEffect, useState } from 'react';

const COLORS = ['#FF6B6B', '#48DBFB', '#FF9F43', '#1DD1A1', '#FECA57', '#FF9FF3'];

export const BalloonOverlay: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Geramos balões fixos em posições horizontais, mas que se movem verticalmente com o scroll
  const balloons = [
    { left: '5%', top: '20%', speed: 0.8, color: COLORS[0], size: 40 },
    { left: '15%', top: '60%', speed: 1.2, color: COLORS[1], size: 60 },
    { left: '85%', top: '15%', speed: 0.5, color: COLORS[2], size: 50 },
    { left: '92%', top: '75%', speed: 1.5, color: COLORS[3], size: 70 },
    { left: '10%', top: '120%', speed: 0.9, color: COLORS[4], size: 55 },
    { left: '80%', top: '150%', speed: 1.1, color: COLORS[5], size: 45 },
    { left: '40%', top: '220%', speed: 0.7, color: COLORS[0], size: 80 },
    { left: '25%', top: '300%', speed: 1.3, color: COLORS[2], size: 65 },
    { left: '70%', top: '350%', speed: 1.0, color: COLORS[1], size: 50 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ minHeight: '100%' }}>
      {balloons.map((b, i) => (
        <div
          key={i}
          className="balloon floating"
          style={{
            left: b.left,
            top: b.top,
            transform: `translateY(-${scrollY * b.speed}px)`,
            backgroundColor: b.color,
            width: `${b.size}px`,
            height: `${b.size * 1.3}px`,
            borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
          }}
        >
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-gray-400 opacity-30"></div>
        </div>
      ))}
    </div>
  );
};
