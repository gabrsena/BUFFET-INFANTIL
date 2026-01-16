
import React, { useEffect, useState } from 'react';
import { PartyPopper, Sparkles } from 'lucide-react';
import { Button } from '../UI/Button';

const COLORS = ['#FF007F', '#00F3FF', '#FFF200', '#BC13FE', '#FF9F43', '#1DD1A1'];

const HeroBalloon = ({ color, size, left, top, delay, duration }: any) => (
  <div 
    className="absolute pointer-events-none animate-float-gentle z-0"
    style={{ 
      left: `${left}%`, 
      top: `${top}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`
    }}
  >
    <div 
      className="relative"
      style={{
        backgroundColor: color,
        width: `${size}px`,
        height: `${size * 1.3}px`,
        borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
        opacity: 0.3,
        boxShadow: `0 0 20px ${color}88`,
      }}
    >
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-white opacity-20"></div>
    </div>
  </div>
);

export const Hero: React.FC = () => {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPos(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const decorativeBalloons = [
    { color: COLORS[0], size: 40, left: 10, top: 15, delay: 0, duration: 6 },
    { color: COLORS[1], size: 60, left: 85, top: 25, delay: 1, duration: 7 },
    { color: COLORS[2], size: 30, left: 20, top: 60, delay: 2, duration: 5 },
    { color: COLORS[3], size: 50, left: 75, top: 70, delay: 0.5, duration: 8 },
  ];

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-[#0d0111] via-[#1a0525] to-[#0d0111]">
      {/* Balões */}
      {decorativeBalloons.map((b, i) => (
        <HeroBalloon key={i} {...b} />
      ))}

      {/* Parallax Blobs */}
      <div 
        className="absolute top-0 -left-4 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-[100px] opacity-10 transition-transform duration-1000"
        style={{ transform: `translateY(${scrollPos * 0.2}px)` }}
      ></div>
      <div 
        className="absolute bottom-20 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px] opacity-10 transition-transform duration-1000"
        style={{ transform: `translateY(${scrollPos * -0.2}px)` }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md text-cyan-400 text-sm font-bold mb-8 shadow-[0_0_15px_rgba(0,243,255,0.3)] border border-cyan-500/30">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>O Futuro da Diversão Chegou!</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black leading-tight mb-8">
            <span className="neon-text-pink block mb-2">FESTA</span>
            <span className="neon-text-blue">INTERGALÁCTICA</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-purple-200/80 mb-12 leading-relaxed font-medium">
            No Magic World, a festa do seu filho se transforma em uma 
            experiência neon imersiva com tecnologia de ponta.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button size="lg" className="w-full sm:w-auto bg-pink-600 hover:bg-pink-500 text-white shadow-[0_0_20px_rgba(255,0,127,0.5)] border-none px-12 py-6 text-xl">
              Garantir Minha Data
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-transparent border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
              Ver Fotos Reais
            </Button>
          </div>
        </div>

        <div className="mt-20 relative px-4">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0111] via-transparent to-transparent z-10 h-32 bottom-0"></div>
          <div className="relative group overflow-hidden rounded-[3rem]">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-cyan-500 to-purple-500 opacity-20 blur-2xl group-hover:opacity-40 transition duration-1000"></div>
            <img 
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80" 
              alt="Festa Neon Infantil" 
              className="rounded-[2.5rem] shadow-2xl relative w-full object-cover h-[400px] md:h-[600px] brightness-75 contrast-125"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
