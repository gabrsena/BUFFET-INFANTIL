
import React, { useEffect, useRef } from 'react';
import { FEATURES } from '../../constants';

export const Features: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-[#0d0111] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 reveal">
          <h2 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-4">Inovação Magic World</h2>
          <p className="text-4xl md:text-6xl font-black text-white neon-text-blue">
            Diversão de Outro Planeta
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div 
              key={feature.id} 
              className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-pink-500/50 transition-all group reveal"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {/* Added <any> to ensure cloneElement accepts 'className' prop when the element type is not strictly defined */}
                {React.cloneElement(feature.icon as React.ReactElement<any>, { className: "w-8 h-8 text-pink-400" })}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">{feature.title}</h3>
              <p className="text-purple-200/60 leading-relaxed font-medium">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
