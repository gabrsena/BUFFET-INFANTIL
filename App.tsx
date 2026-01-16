
import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from './components/Layout/Navbar';
import { 
  Sparkles, 
  Upload, 
  Wand2, 
  MessageCircle, 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Camera, 
  PartyPopper,
  ChevronRight,
  Shield,
  ShieldCheck,
  Zap,
  Users,
  Wind,
  Accessibility,
  Quote
} from 'lucide-react';
import { Button } from './components/UI/Button';
import { FEATURES, GASTRONOMIA, THEMES, DEPOIMENTOS } from './constants';
import { generatePartyMockup } from './services/geminiService';
import { FloatingDecor } from './components/UI/FloatingDecor';
import { ConfettiBackground } from './components/UI/ConfettiBackground';

const App: React.FC = () => {
  const [theme, setTheme] = useState(THEMES[0]);
  const [loading, setLoading] = useState(false);
  const [mockupUrl, setMockupUrl] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const atracoesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);

      if (atracoesRef.current) {
        const atracoesTop = atracoesRef.current.offsetTop - 400;
        setShowWhatsApp(currentScroll > atracoesTop);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const setPreviewUrl = (url: string) => setPreviewFile(url);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      let base64 = "";
      if (selectedFile) {
        const reader = new FileReader();
        base64 = await new Promise((resolve) => {
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(selectedFile);
        });
      }
      
      const url = await generatePartyMockup(theme, base64 || undefined, selectedFile?.type);
      setMockupUrl(url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/5515999999999?text=Olá! Gostaria de um orçamento para festa temática no Atelie Kids.', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#fffcf9]">
      <FloatingDecor />
      <Navbar />
      
      {/* 1. HERO SECTION & IA GENERATOR */}
      <section className="relative pt-32 pb-20 lg:pt-48 overflow-hidden">
        <ConfettiBackground count={40} />
        <div className="absolute inset-0 bg-confetti"></div>
        
        <div 
          className="absolute top-20 -left-20 w-80 h-80 bg-purple-200 rounded-full blur-[100px] opacity-30"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        <div 
          className="absolute bottom-40 -right-20 w-96 h-96 bg-pink-200 rounded-full blur-[100px] opacity-30"
          style={{ transform: `translateY(${scrollY * -0.15}px)` }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-yellow-400 text-yellow-900 text-sm font-black mb-8 shadow-lg animate-bounce-gentle">
              <Zap className="w-4 h-4" />
              <span>O MELHOR BUFFET DO WANEL VILLE!</span>
            </div>
            
            {/* NOVO TÍTULO COM ANIMAÇÃO DISPERSIVA (SHATTER EFFECT) */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-purple-900 leading-tight mb-8 cursor-default group select-none">
              <span className="block mb-4 overflow-visible">
                <span className="inline-block transition-all duration-500 ease-out group-hover:-translate-x-12 group-hover:-translate-y-6 group-hover:-rotate-12 text-glow-purple mr-3">A</span>
                <span className="inline-block transition-all duration-500 ease-out group-hover:translate-x-4 group-hover:-translate-y-12 group-hover:rotate-6 text-glow-purple mr-3">Festa</span>
                <span className="inline-block transition-all duration-500 ease-out group-hover:-translate-x-4 group-hover:translate-y-8 group-hover:-rotate-6 text-glow-purple mr-3">dos</span>
                <span className="inline-block transition-all duration-500 ease-out group-hover:translate-x-16 group-hover:translate-y-4 group-hover:rotate-12 text-glow-purple">Sonhos</span>
              </span>
              <span className="block text-pink-500 overflow-visible">
                <span className="inline-block transition-all duration-500 ease-out group-hover:-translate-x-16 group-hover:translate-y-12 group-hover:-rotate-12 text-glow-pink mr-3">Começa</span>
                <span className="inline-block transition-all duration-500 ease-out group-hover:translate-x-12 group-hover:-translate-y-10 group-hover:rotate-6 text-glow-pink mr-3">Aqui!</span>
                <span className="inline-block transition-all duration-500 ease-out group-hover:scale-150 group-hover:rotate-[360deg] transition-transform">🎈</span>
              </span>
            </h1>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(147,51,234,0.15)] overflow-hidden p-8 md:p-12 border-4 border-white/50 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 opacity-5 blur-xl group-hover:opacity-10 transition duration-1000"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-8">
                  <h3 className="text-3xl font-black text-purple-900 flex items-center gap-3 text-glow-purple">
                    <Wand2 className="text-pink-500 w-8 h-8" />
                    Simulador IA
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-black text-purple-900/40 mb-2 uppercase tracking-[0.2em]">Tema da Festa</label>
                      <select 
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        className="w-full bg-white border-2 border-purple-100 rounded-2xl p-4 font-bold text-purple-900 focus:border-pink-500 shadow-sm transition-all outline-none appearance-none"
                      >
                        {THEMES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-purple-900/40 mb-2 uppercase tracking-[0.2em]">Foto do Aniversariante</label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-purple-200 rounded-2xl p-8 text-center cursor-pointer hover:bg-purple-50/50 hover:border-pink-300 transition-all group"
                      >
                        {previewFile ? (
                          <div className="flex items-center justify-center space-x-4">
                            <img src={previewFile} className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-xl rotate-3" alt="Preview" loading="lazy" />
                            <span className="text-pink-600 font-black text-sm">PRONTO PARA A MAGIA!</span>
                          </div>
                        ) : (
                          <>
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                              <Camera className="w-6 h-6 text-purple-500" />
                            </div>
                            <p className="text-sm font-bold text-purple-400 uppercase tracking-widest">Enviar Foto (Opcional)</p>
                          </>
                        )}
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleGenerate} 
                    isLoading={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-6 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(219,39,119,0.3)] bouncy-hover text-xl"
                  >
                    {loading ? 'CONVOCANDO A IA...' : 'GERAR PRÉVIA MÁGICA ✨'}
                  </Button>
                </div>

                <div className="relative aspect-square lg:aspect-auto lg:h-[450px] bg-purple-50 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl flex items-center justify-center group/mockup cursor-pointer">
                  {loading ? (
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 border-8 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="font-black text-purple-900 animate-pulse text-lg tracking-widest uppercase">Preparando os Docinhos...</p>
                    </div>
                  ) : mockupUrl ? (
                    <div className="animate-in fade-in zoom-in duration-700 w-full h-full relative">
                      <img src={mockupUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover/mockup:scale-110" alt="Prévia da Festa" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/20 to-transparent opacity-0 group-hover/mockup:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 text-white">
                        <div className="transform translate-y-8 group-hover/mockup:translate-y-0 transition-transform duration-500 delay-100">
                          <p className="text-yellow-400 font-black text-sm mb-2 tracking-[0.3em] uppercase">Resultado Mágico</p>
                          <h4 className="text-white text-3xl font-black mb-4 leading-tight">Uau! Imagine isso ao vivo no Atelie Kids!</h4>
                          <Button onClick={openWhatsApp} size="sm" className="bg-white text-purple-900 hover:bg-yellow-400 border-none px-6">
                            Garantir esta data!
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-12">
                      <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center mx-auto mb-6 rotate-6 group-hover:rotate-0 transition-transform duration-500">
                        <PartyPopper className="w-12 h-12 text-purple-300" />
                      </div>
                      <p className="text-purple-300 font-black text-lg">Sua prévia mágica <br/>aparecerá aqui!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ATRAÇÕES - DIVERSÃO SEM FIM */}
      <section id="atrações" ref={atracoesRef} className="py-32 bg-white relative overflow-hidden">
        <ConfettiBackground count={30} />
        <div 
          className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-100 rounded-full blur-[100px] opacity-40"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-purple-900 mb-6 text-glow-purple hover:scale-105 transition-transform">Diversão sem Fim!</h2>
            <div className="h-3 w-40 bg-gradient-to-r from-yellow-400 to-yellow-200 mx-auto rounded-full shadow-lg"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FEATURES.map((item, idx) => (
              <div key={idx} className="group p-12 rounded-[3.5rem] bg-purple-50/50 hover:bg-purple-600 transition-all duration-500 hover:-translate-y-4 border-2 border-transparent hover:border-purple-300 hover:shadow-[0_40px_80px_-20px_rgba(147,51,234,0.3)]">
                <div className="mb-8 w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-pink-500 group-hover:text-purple-600 group-hover:scale-110 shadow-xl transition-all duration-500 -rotate-3 group-hover:rotate-6">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-black text-purple-900 group-hover:text-white mb-6 transition-colors">{item.title}</h3>
                <p className="text-purple-900/60 group-hover:text-white/80 font-medium text-lg leading-relaxed transition-colors">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. O BUFFET */}
      <section id="gastronomia" className="py-32 bg-pink-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2">
              <h2 className="text-5xl md:text-7xl font-black text-purple-900 mb-10 leading-tight text-glow-pink">
                O Buffet que <br />
                <span className="text-pink-600">Dá Água na Boca!</span>
              </h2>
              <div className="space-y-10">
                {GASTRONOMIA.map((item, i) => (
                  <div key={i} className="flex items-start gap-6 group cursor-default">
                    <div className="bg-white p-4 rounded-3xl shadow-xl group-hover:scale-110 transition-transform group-hover:rotate-6">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-purple-900 mb-2 group-hover:text-pink-600 transition-colors">{item.title}</h4>
                      <p className="text-purple-900/60 font-medium text-lg">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={openWhatsApp} className="mt-16 bg-pink-600 text-white px-12 py-6 rounded-[2rem] font-black bouncy-hover shadow-2xl text-xl">
                PEDIR MENU COMPLETO 🍽️
              </Button>
            </div>
            <div className="lg:w-1/2 relative group">
              <div className="absolute -inset-6 bg-yellow-400 rounded-[4rem] rotate-3 group-hover:-rotate-3 transition-transform duration-700 shadow-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1535254973040-607b474cb80d?auto=format&fit=crop&w=800&q=80" 
                alt="Coxinha e Salgados" 
                className="relative rounded-[3.5rem] shadow-2xl object-cover h-[600px] w-full brightness-110"
                loading="lazy"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-[2.5rem] shadow-2xl rotate-12 group-hover:rotate-0 transition-all flex items-center gap-4 border-4 border-pink-500 overflow-hidden min-w-[280px]">
                <img 
                  src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=150&q=80" 
                  className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                  alt="Salgadinho"
                  loading="lazy"
                />
                <p className="text-pink-600 font-black text-2xl">Fritos na hora! 🔥</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEGURANÇA E ESTRUTURA */}
      <section id="segurança" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-purple-900 rounded-[5rem] p-16 md:p-24 text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(30,27,75,0.4)]">
            <div 
              className="absolute top-0 right-0 p-10 opacity-5"
              style={{ transform: `rotate(${scrollY * 0.05}deg)` }}
            >
              <Shield className="w-96 h-96 text-white" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 relative z-10 text-glow-purple">SEGURANÇA E ESTRUTURA</h2>
            <p className="text-purple-100 text-2xl max-w-3xl mx-auto mb-16 font-medium relative z-10 leading-relaxed opacity-80">
              Tranquilidade total para os pais. Monitoramento constante e cuidado com cada detalhe para uma festa sem preocupações.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {[
                { label: 'Monitores Treinados', icon: <Users className="mx-auto mb-6 w-14 h-14 text-cyan-400 group-hover:scale-110 transition-transform" /> },
                { label: 'Ambiente Climatizado', icon: <Wind className="mx-auto mb-6 w-14 h-14 text-cyan-400 group-hover:scale-110 transition-transform" /> },
                { label: 'Segurança Total', icon: <ShieldCheck className="mx-auto mb-6 w-14 h-14 text-cyan-400 group-hover:scale-110 transition-transform" /> },
                { label: 'Acessibilidade', icon: <Accessibility className="mx-auto mb-6 w-14 h-14 text-cyan-400 group-hover:scale-110 transition-transform" /> },
              ].map((item, i) => (
                <div key={i} className="group text-white hover:scale-110 transition-all duration-300">
                  <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 group-hover:bg-white/10 group-hover:border-cyan-400/50 transition-all">
                    {item.icon}
                    <p className="font-black text-sm uppercase tracking-[0.2em]">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEPOIMENTOS - PROVA SOCIAL */}
      <section id="depoimentos" className="py-32 bg-[#fffcf9] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-purple-900 mb-6 text-glow-purple">Quem Faz a Festa Aqui, Ama!</h2>
            <div className="h-3 w-40 bg-pink-500 mx-auto rounded-full shadow-lg"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {DEPOIMENTOS.map((review, i) => (
              <div key={review.id} className="bg-white p-10 rounded-[3.5rem] shadow-xl border-2 border-purple-50 group hover:-translate-y-4 transition-all duration-500 relative">
                <div className="absolute top-10 right-10 text-purple-100 group-hover:text-pink-100 transition-colors">
                  <Quote className="w-16 h-16 rotate-180" />
                </div>
                
                <div className="flex mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-purple-900/80 font-bold text-xl mb-10 leading-relaxed italic relative z-10">
                  "{review.text}"
                </p>
                
                <div className="flex items-center gap-4 border-t border-purple-50 pt-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-purple-900 text-lg">{review.name}</h4>
                    <div className="flex items-center gap-1">
                      <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" className="h-3 object-contain opacity-50 grayscale" alt="Google" loading="lazy" />
                      <span className="text-[10px] text-purple-300 font-black uppercase tracking-widest">Google Review</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selo do Google flutuante decorativo */}
          <div className="mt-16 flex justify-center">
             <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-lg border border-purple-50">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-6 h-6" alt="G" loading="lazy" />
                <span className="text-purple-900 font-black text-sm uppercase tracking-widest">4.9/5 estrelas no Google</span>
                <div className="flex">
                   {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />)}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 6. LOCALIZAÇÃO - ONDE ESTAMOS */}
      <section id="local" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black text-purple-900 mb-6 text-glow-purple hover:scale-110 transition-transform cursor-default inline-block animate-bounce-gentle">
              Onde Estamos 📍
            </h2>
            <div className="h-2 w-32 bg-pink-500 mx-auto rounded-full shadow-lg"></div>
          </div>

          <div className="w-full h-[600px] rounded-[5rem] overflow-hidden relative shadow-2xl group border-8 border-white">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14633.243572836262!2d-47.51478542031027!3d-23.52187313837494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf5f956d22d25f%3A0xc66089769324d27!2sWanel%20Ville%2C%20Sorocaba%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1715876543210!5m2!1spt-BR!2sbr" 
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000" 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
             <div className="absolute top-10 left-10 z-20 pointer-events-none">
                <div className="bg-white/90 backdrop-blur p-6 rounded-3xl shadow-2xl border-2 border-pink-100">
                   <div className="flex items-center gap-3 mb-2">
                      <MapPin className="text-pink-500 w-6 h-6" />
                      <h4 className="font-black text-purple-900 text-lg uppercase tracking-widest">Wanel Ville</h4>
                   </div>
                   <p className="text-purple-900/60 font-bold text-sm">Av. Elias Maluf, 000 - Sorocaba/SP</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {showWhatsApp && (
        <button 
          onClick={openWhatsApp}
          className="fixed bottom-10 right-10 z-50 bg-green-500 text-white p-6 rounded-full shadow-[0_20px_40px_-10px_rgba(34,197,94,0.5)] bouncy-hover border-4 border-white transition-all hover:rotate-12 animate-in fade-in slide-in-from-bottom-10 duration-500"
        >
          <MessageCircle className="w-10 h-10" />
        </button>
      )}

      <footer className="bg-purple-900 py-20 mt-auto relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center space-x-3 mb-10">
            <PartyPopper className="w-10 h-10 text-pink-400" />
            <span className="text-4xl font-black tracking-tighter text-white text-glow-purple">ATELIE <span className="text-pink-400">KIDS</span> 🎈</span>
          </div>
          <p className="text-purple-300 font-black text-xl mb-8 uppercase tracking-[0.3em]">Wanel Ville - Sorocaba/SP</p>
          <p className="text-purple-400 text-xs font-medium uppercase tracking-[0.1em] opacity-60 mt-10">
            © {new Date().getFullYear()} Atelie Kids Buffet Infantil.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
