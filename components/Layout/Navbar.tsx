
import React, { useState, useEffect } from 'react';
import { Menu, X, PartyPopper } from 'lucide-react';
import { NAV_ITEMS } from '../../constants';
import { Button } from '../UI/Button';
import { PromoModal } from '../UI/PromoModal';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsApp = () => {
    window.open('https://wa.me/5515999999999?text=Olá! Vi o site e gostaria de um orçamento.', '_blank');
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur shadow-xl py-2`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div 
              className="flex-shrink-0 flex items-center space-x-2 cursor-pointer group"
              onDoubleClick={() => setIsPromoOpen(true)}
              title="Dê um duplo clique para uma surpresa!"
            >
              <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white rotate-6 shadow-lg group-hover:rotate-12 transition-transform">
                 <PartyPopper className="w-8 h-8" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-purple-900">ATELIE <span className="text-pink-500">KIDS</span></span>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-purple-900/70 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-black transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <Button onClick={openWhatsApp} size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black px-6 rounded-xl bouncy-hover">
                  PEDIR ORÇAMENTO
                </Button>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-purple-900 focus:outline-none"
              >
                {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white border-b border-purple-100 animate-in slide-in-from-top duration-300">
            <div className="px-4 pt-4 pb-8 space-y-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-purple-900 block px-4 py-3 rounded-xl text-lg font-black hover:bg-purple-50"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4">
                <Button onClick={openWhatsApp} className="w-full bg-pink-500 py-4 text-white font-black">ORÇAMENTO NO WHATSAPP</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <PromoModal isOpen={isPromoOpen} onClose={() => setIsPromoOpen(false)} />
    </>
  );
};
