
import React from 'react';
import { 
  Gamepad2, 
  PartyPopper, 
  ShieldCheck, 
  UtensilsCrossed, 
  Baby, 
  Tv2,
  Pizza,
  CakeSlice,
  Users
} from 'lucide-react';
import { Feature, NavItem, Testimonial } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'O Buffet', href: '#gastronomia' },
  { label: 'Diversão', href: '#atrações' },
  { label: 'Confiança', href: '#segurança' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Localização', href: '#local' }
];

export const THEMES = [
  "Heróis Marvel",
  "Princesas Disney",
  "Mundo Bita",
  "Safari",
  "Fazendinha",
  "Minecraft/Roblox",
  "Astronauta/Espaço",
  "Barbie",
  "Dino Park"
];

export const FEATURES: Feature[] = [
  {
    id: '1',
    title: 'Brinquedão Gigante',
    description: 'Um circuito de aventuras que as crianças amam explorar.',
    icon: <Gamepad2 className="w-10 h-10" />
  },
  {
    id: '2',
    title: 'Área Baby Segura',
    description: 'Espaço totalmente espumado para os pequenos de até 3 anos se divertirem sem riscos.',
    icon: <Baby className="w-10 h-10" />
  },
  {
    id: '3',
    title: 'Games Modernos',
    description: 'Simuladores e consoles de última geração para os maiores e adultos.',
    icon: <Tv2 className="w-10 h-10" />
  }
];

export const GASTRONOMIA = [
  {
    title: 'Salgados Gourmet',
    description: 'Fritos e assados na hora, crocantes e sequinhos.',
    icon: <Pizza className="text-yellow-500" />
  },
  {
    title: 'Confeitaria Artesanal',
    description: 'Bolos e doces feitos com ingredientes premium e muito carinho.',
    icon: <CakeSlice className="text-pink-500" />
  },
  {
    title: 'Equipe de Garçons',
    description: 'Serviço ágil e cordial para que os pais só se preocupem em curtir.',
    icon: <Users className="text-blue-500" />
  }
];

export const DEPOIMENTOS: Testimonial[] = [
  { 
    id: '1', 
    name: 'Juliana M.', 
    text: 'Festa impecável! Os monitores são super atenciosos e a comida estava deliciosa. Meu filho amou o brinquedão!', 
    rating: 5 
  },
  { 
    id: '2', 
    name: 'Ricardo S.', 
    text: 'Melhor custo-benefício da região. O salão é lindo e a organização é nota 10. Recomendo de olhos fechados!', 
    rating: 5 
  },
  { 
    id: '3', 
    name: 'Amanda C.', 
    text: 'Simplesmente mágico! A decoração ficou linda e todos os convidados elogiaram muito. Voltaremos com certeza.', 
    rating: 5 
  },
];
