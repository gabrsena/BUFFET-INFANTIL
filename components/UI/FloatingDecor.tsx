
import React, { useEffect, useState } from 'react';

const DECOR_ITEMS = [
  { char: '🎈', speed: 0.15, size: 'text-4xl' },
  { char: '🎂', speed: 0.08, size: 'text-3xl' },
  { char: '🎮', speed: 0.12, size: 'text-2xl' },
  { char: '✨', speed: 0.2, size: 'text-xl' },
  { char: '🍕', speed: 0.1, size: 'text-3xl' },
  { char: '🍭', speed: 0.05, size: 'text-4xl' },
  { char: '🎁', speed: 0.18, size: 'text-2xl' },
  { char: '🧁', speed: 0.07, size: 'text-3xl' },
];

export const FloatingDecor: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [positions, setPositions] = useState<{ x: number; y: number; item: typeof DECOR_ITEMS[0]; id: number }[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Gerar posições aleatórias uma única vez
    const items = [];
    for (let i = 0; i < 25; i++) {
      items.push({
        id: i,
        x: Math.random() * 95, // Porcentagem
        y: Math.random() * 5000, // Pixels estimados da página
        item: DECOR_ITEMS[Math.floor(Math.random() * DECOR_ITEMS.length)],
      });
    }
    setPositions(items);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ height: '100%' }}>
      {positions.map((p) => (
        <div
          key={p.id}
          className={`absolute ${p.item.size} opacity-20 transition-transform duration-100 ease-out animate-float-slow`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}px`,
            transform: `translateY(-${scrollY * p.item.speed}px)`,
          }}
        >
          {p.item.char}
        </div>
      ))}
    </div>
  );
};
