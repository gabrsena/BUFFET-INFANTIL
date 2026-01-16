
import React from 'react';
import { X, Gift, PartyPopper, Zap, Star } from 'lucide-react';
import { Button } from './Button';
import { ConfettiBackground } from './ConfettiBackground';

interface PromoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromoModal: React.FC<PromoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleWhatsApp = () => {
    window.open('https://wa.me/5515999999999?text=UAU! Vi a oferta secreta de R$ 940 reais e quero garantir minha festa com brindes exclusivos!', '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-purple-900/60 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-2xl rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-8 border-yellow-400 overflow-hidden animate-in zoom-in duration-500">
        <ConfettiBackground count={50} />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 bg-purple-100 text-purple-900 rounded-full hover:bg-pink-100 hover:text-pink-600 transition-colors shadow-lg"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative z-10 p-8 md:p-12 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-pink-500 text-white text-xs font-black mb-6 shadow-lg animate-bounce-gentle">
            <Zap className="w-4 h-4" />
            <span>OFERTA SECRETA DESBLOQUEADA!</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-purple-900 mb-8 leading-tight">
            Festa Mágica <br />
            <span className="text-pink-500">Por Tempo Limitado!</span>
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
            <div className="relative">
              <span className="absolute -top-4 -left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full rotate-[-12deg] shadow-lg">DE R$ 1.200</span>
              <div className="bg-purple-50 px-8 py-4 rounded-3xl border-2 border-purple-100 opacity-50 line-through">
                <span className="text-2xl font-black text-purple-300">R$ 1.200,00</span>
              </div>
            </div>
            
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl rotate-12">
               <Star className="w-6 h-6 text-purple-900 fill-current" />
            </div>

            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative bg-white px-10 py-6 rounded-3xl border-4 border-yellow-400 shadow-2xl">
                <p className="text-purple-900 font-black text-sm uppercase tracking-widest mb-1">POR APENAS</p>
                <p className="text-5xl md:text-6xl font-black text-pink-600 tracking-tighter">R$ 940,00</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-900 rounded-[2.5rem] p-8 mb-10 relative overflow-hidden group hover:scale-105 transition-transform">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Gift className="w-20 h-20 text-white rotate-12" />
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="p-4 bg-pink-500 rounded-2xl shadow-xl rotate-[-6deg]">
                <Gift className="w-10 h-10 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-white text-2xl font-black tracking-tight leading-none mb-2">E TEM MAIS! ✨</h3>
                <p className="text-purple-200 font-bold text-lg uppercase tracking-widest leading-none">Brindes Exclusivos Inclusos</p>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleWhatsApp}
            size="lg" 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-6 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(219,39,119,0.3)] bouncy-hover text-2xl"
          >
            EU QUERO ESSA OFERTA! 🚀
          </Button>
          
          <p className="text-purple-300 font-bold text-xs mt-6 uppercase tracking-widest">Oferta exclusiva para quem encontrou o segredo!</p>
        </div>
      </div>
    </div>
  );
};
