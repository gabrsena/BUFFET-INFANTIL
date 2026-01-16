
import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  PartyPopper, 
  CheckCircle2, 
  Image as ImageIcon, 
  Upload, 
  Wand2, 
  Star, 
  Gift, 
  Zap,
  Gamepad2,
  Tent,
  Loader2
} from 'lucide-react';
import { Button } from '../UI/Button';
import { generatePartyPlan, generatePartyMockup } from '../../services/geminiService';
import { PartyPlanResponse } from '../../types';

const LOADING_MESSAGES = [
  "Iniciando a mágica...",
  "Inflando os balões...",
  "Colocando a cobertura no bolo...",
  "Arrumando os brinquedos...",
  "Preparando os salgadinhos...",
  "Contratando os monitores...",
  "Finalizando os detalhes..."
];

export const AIPreview: React.FC = () => {
  const [theme, setTheme] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [result, setResult] = useState<PartyPlanResponse | null>(null);
  const [mockupUrl, setMockupUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Efeito para simular progresso e trocar mensagens
  useEffect(() => {
    let interval: number;
    if (imgLoading) {
      setProgress(0);
      setCurrentMessageIndex(0);
      interval = window.setInterval(() => {
        setProgress(prev => Math.min(prev + (Math.random() * 5), 98));
        setCurrentMessageIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
      }, 1500);
    } else {
      setProgress(100);
    }
    return () => clearInterval(interval);
  }, [imgLoading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFullGenerate = async () => {
    if (!theme) return;
    setLoading(true);
    try {
      const plan = await generatePartyPlan(theme, age || "5", "40");
      setResult(plan);

      if (selectedFile) {
        setImgLoading(true);
        const base64 = await fileToBase64(selectedFile);
        const imgUrl = await generatePartyMockup(theme, base64, selectedFile.type);
        setMockupUrl(imgUrl);
      }
    } catch (error) {
      alert("Houve um erro na magia! Tente novamente.");
    } finally {
      setLoading(false);
      setImgLoading(false);
    }
  };

  return (
    <section id="ai-tools" className="py-24 bg-gradient-to-b from-[#fffcf9] to-purple-50 text-purple-900 overflow-hidden relative border-t border-purple-100">
      <div className="absolute top-0 right-0 p-20 opacity-5 rotate-12">
        <PartyPopper className="w-80 h-80 text-pink-400" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-pink-500 font-black uppercase tracking-widest text-sm mb-4">Tecnologia Exclusiva</h2>
            <h3 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-glow-purple">
              Visualizador <br />
              <span className="text-pink-500">Mágico 3D</span>
            </h3>
            <p className="text-purple-800/70 text-lg mb-10 leading-relaxed font-medium">
              Envie uma foto do seu pequeno e nossa IA criará uma prévia da festa dos sonhos dele em nosso salão Atelie Kids!
            </p>

            <div className="space-y-8 max-w-md relative">
              <input 
                type="text" 
                placeholder="Tema (ex: Homem-Aranha, Unicórnios)"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full bg-white border-2 border-purple-100 rounded-3xl py-5 px-6 text-purple-900 focus:ring-4 focus:ring-pink-200 focus:border-pink-500 outline-none transition-all placeholder:text-purple-300 shadow-sm font-bold"
              />
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative cursor-pointer group"
              >
                {/* Ícones Decorativos ao redor do Upload */}
                <div className="absolute -top-4 -right-4 text-yellow-400 animate-bounce-gentle z-20 transition-transform group-hover:scale-125">
                  <Star className="w-12 h-12 fill-current shadow-lg" />
                </div>
                <div className="absolute -bottom-6 -left-6 text-pink-500 animate-float-slow z-20">
                  <PartyPopper className="w-10 h-10" />
                </div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-cyan-400 animate-pulse z-20">
                  <Sparkles className="w-8 h-8" />
                </div>

                <div className={`w-full h-48 border-4 border-dashed ${previewUrl ? 'border-pink-400' : 'border-purple-200'} rounded-[2.5rem] flex flex-col items-center justify-center bg-white group-hover:bg-purple-50 transition-all shadow-xl relative overflow-hidden`}>
                  {previewUrl ? (
                    <img src={previewUrl} className="h-full w-full object-cover rounded-[2rem] opacity-80" alt="Preview" />
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                        <Upload className="w-8 h-8 text-purple-600" />
                      </div>
                      <span className="text-sm text-purple-900 font-black uppercase tracking-widest">CARREGAR FOTO</span>
                      <p className="text-xs text-purple-400 mt-2 font-bold">Ver magia acontecer!</p>
                    </>
                  )}
                  {previewUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-pink-500/20 backdrop-blur-[2px]">
                      <span className="bg-white text-pink-600 text-sm px-6 py-2 rounded-full font-black shadow-2xl border-2 border-pink-500">FOTO PRONTA ✨</span>
                    </div>
                  )}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              </div>

              <Button 
                onClick={handleFullGenerate} 
                isLoading={loading}
                className="w-full py-6 text-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(219,39,119,0.3)] bouncy-hover"
              >
                {loading ? 'Sincronizando com a IA...' : 'GERAR PRÉVIA AGORA! ✨'}
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            {/* Bloco de Mockup de Imagem com Efeitos Mágicos */}
            <div className="bg-white rounded-[3rem] border-4 border-white overflow-hidden shadow-2xl relative group/mockup min-h-[400px]">
               {/* Partículas Mágicas ao Redor do Mockup (Aparecem no Hover) */}
               <div className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-10 left-10 text-yellow-300 animate-float-slow"><Sparkles className="w-6 h-6" /></div>
                  <div className="absolute bottom-10 right-10 text-pink-300 animate-bounce-gentle"><Sparkles className="w-8 h-8" /></div>
                  <div className="absolute top-1/2 left-5 text-cyan-300 animate-pulse"><Star className="w-5 h-5 fill-current" /></div>
                  <div className="absolute top-5 right-12 text-purple-300 animate-float-slow"><Zap className="w-4 h-4" /></div>
               </div>

               <div className="p-6 bg-purple-50 border-b border-purple-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm group-hover/mockup:rotate-12 transition-transform">
                      <Wand2 className="w-5 h-5 text-pink-500" />
                    </div>
                    <span className="text-sm font-black tracking-widest uppercase text-purple-900">Prévia da Festa Atelie Kids</span>
                  </div>
               </div>
               
               <div className="aspect-video relative bg-purple-50 flex items-center justify-center overflow-hidden">
                  {mockupUrl ? (
                    <div className="w-full h-full relative">
                      <img 
                        src={mockupUrl} 
                        className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000 transition-transform duration-1000 group-hover/mockup:scale-110 brightness-105" 
                        alt="Mockup da Festa" 
                      />
                      
                      {/* Overlay Interativo */}
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-transparent to-transparent opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                        <div className="transform translate-y-8 group-hover/mockup:translate-y-0 transition-transform duration-500">
                          <p className="text-yellow-400 font-black text-xs mb-1 tracking-widest uppercase">Mesa dos Sonhos</p>
                          <h4 className="text-2xl md:text-3xl font-black mb-4 leading-tight">Uau! Ficou Incrível! ✨</h4>
                          <p className="text-sm font-medium opacity-80 mb-6">Imagine a alegria do seu filho(a) ao ver isso ao vivo no Wanel Ville.</p>
                          <Button size="sm" className="bg-white text-purple-900 hover:bg-yellow-400 border-none px-6 font-black rounded-xl">
                            Reservar Esta Mesa
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : !imgLoading ? (
                    <div className="text-center p-12 group-hover/mockup:scale-105 transition-transform duration-500">
                      <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl rotate-6 group-hover/mockup:rotate-0 transition-transform">
                        <Wand2 className="w-12 h-12 text-purple-200" />
                      </div>
                      <p className="text-purple-300 font-black text-lg max-w-[240px]">Envie o tema e a foto para ver a magia!</p>
                    </div>
                  ) : null}
                  
                  {imgLoading && (
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center z-30 p-12">
                      <div className="relative mb-12">
                        <div className="w-24 h-24 border-8 border-purple-100 rounded-full"></div>
                        <div className="absolute inset-0 border-8 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <Loader2 className="w-8 h-8 text-pink-500 animate-pulse" />
                        </div>
                      </div>
                      
                      <p className="text-pink-600 font-black text-xl uppercase tracking-widest mb-2 animate-pulse transition-all">
                        {LOADING_MESSAGES[currentMessageIndex]}
                      </p>
                      
                      {/* Barra de Progresso Visual */}
                      <div className="w-full max-w-xs bg-purple-100 h-4 rounded-full overflow-hidden shadow-inner relative">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-1000 ease-out relative"
                          style={{ width: `${progress}%` }}
                        >
                          <div className="absolute inset-0 progress-shimmer"></div>
                        </div>
                      </div>
                      <p className="text-purple-300 font-black text-xs mt-3 tracking-tighter uppercase">{Math.round(progress)}% Concluído</p>
                    </div>
                  )}
               </div>
            </div>

            {/* Bloco de Plano Gerado */}
            {result && (
              <div className="bg-white rounded-[3.5rem] p-10 border-4 border-white shadow-2xl animate-in slide-in-from-bottom-8 duration-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Gift className="w-32 h-32 text-purple-900 rotate-12" />
                </div>
                <div className="mb-8 relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Tent className="w-4 h-4 text-pink-500" />
                    <h4 className="text-pink-500 font-black text-xs uppercase tracking-[0.3em]">Sugestão Atelie Kids</h4>
                  </div>
                  <p className="text-4xl font-black text-purple-900">{result.partyTheme}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                   <div className="p-6 bg-purple-50 rounded-[2.5rem] border-2 border-purple-100 group transition-all hover:shadow-lg">
                      <h5 className="font-black text-sm text-purple-900 mb-4 uppercase tracking-widest flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        Menu Temático
                      </h5>
                      <ul className="text-sm space-y-3 text-purple-800/70 font-bold">
                        {result.suggestedMenu.slice(0, 4).map((m, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            {m}
                          </li>
                        ))}
                      </ul>
                   </div>
                   <div className="p-6 bg-purple-50 rounded-[2.5rem] border-2 border-purple-100 group transition-all hover:shadow-lg">
                      <h5 className="font-black text-sm text-purple-900 mb-4 uppercase tracking-widest flex items-center gap-2">
                        <Gamepad2 className="w-4 h-4 text-cyan-500" />
                        Atividades
                      </h5>
                      <ul className="text-sm space-y-3 text-purple-800/70 font-bold">
                        {result.activities.slice(0, 4).map((m, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                            {m}
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>
                
                <div className="mt-8 p-6 bg-pink-50 rounded-[2rem] border-2 border-pink-100 flex items-center gap-4">
                   <Sparkles className="w-10 h-10 text-pink-500 flex-shrink-0" />
                   <p className="text-sm font-bold text-pink-700 leading-relaxed italic">
                    "O Toque Especial: {result.surpriseFactor}"
                   </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
