import React from 'react';
import { Reveal } from './ui/Reveal';
import { EDUCATION } from '../constants';
import { ArrowDownRight, Globe, Mail, Circle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 md:py-48 bg-paper relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 xl:px-24">
        
        {/* --- HEADER TITLE --- */}
        <div className="mb-24 md:mb-32 border-b border-petrol-base/10 pb-12">
           <Reveal width="100%">
              <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                 <h2 className="text-6xl md:text-8xl font-serif font-light text-petrol-base tracking-tighter leading-[0.9]">
                    Victor <br/> Cardoso
                 </h2>
                 <div className="flex flex-col items-end text-right">
                    <span className="text-xs font-mono uppercase tracking-widest text-petrol-base/40 mb-2">Engenharia & Design</span>
                    <p className="text-sm text-petrol-ink/60 font-light max-w-xs">
                       Transformando complexidade técnica em narrativas digitais fluidas.
                    </p>
                 </div>
              </div>
           </Reveal>
        </div>

        {/* --- GRID LAYOUT (SLIM) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
           
           {/* COL 1: IMAGE / AVATAR (Subtle) */}
           <div className="lg:col-span-4 hidden lg:block relative">
               <Reveal variant="scale" delay={200}>
                  <div className="w-full aspect-[3/4] bg-petrol-base/5 grayscale overflow-hidden relative">
                      <img 
                        src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800" 
                        alt="Profile" 
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700"
                      />
                      {/* Decorative Lines */}
                      <div className="absolute inset-4 border border-white/20 pointer-events-none mix-blend-overlay"></div>
                  </div>
                  <div className="mt-4 flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-petrol-base/40">
                      <span>Ref. 01</span>
                      <span>São Paulo, BR</span>
                  </div>
               </Reveal>
           </div>

           {/* COL 2: CONTENT (Manifesto & Lists) */}
           <div className="lg:col-span-8">
              
              {/* MANIFESTO */}
              <div className="mb-24">
                 <Reveal>
                    <div className="flex items-start gap-4 mb-8">
                        <ArrowDownRight className="text-petrol-electric mt-2" size={24} />
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-petrol-base/40 mt-3">Manifesto</h3>
                    </div>
                    <div className="space-y-8 text-2xl md:text-4xl font-serif font-light text-petrol-base leading-tight">
                        <p>
                           Não acredito em código sem propósito. Meu trabalho reside na interseção exata entre <span className="italic text-petrol-electric/80">engenharia robusta</span> e design emocional.
                        </p>
                        <p className="text-petrol-base/60">
                           Elimino a barreira técnica entre sua visão e o mercado, criando produtos que não apenas funcionam, mas respiram.
                        </p>
                    </div>
                 </Reveal>
              </div>

              {/* SLIM LISTS CONTAINER */}
              <div className="space-y-24">
                 
                 {/* PRINCIPLES LIST */}
                 <div>
                    <Reveal>
                        <div className="flex items-center gap-4 mb-8 border-b border-petrol-base/10 pb-4">
                            <span className="w-2 h-2 rounded-full bg-petrol-electric"></span>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-petrol-base">Princípios do Estúdio</h3>
                        </div>
                    </Reveal>
                    
                    <div className="flex flex-col">
                       {[
                           { title: "Visão de Negócio", desc: "Código é meio, não fim. Foco total no ROI." },
                           { title: "Performance", desc: "Obsessão por Core Web Vitals e latência zero." },
                           { title: "Autonomia", desc: "Entregas modulares, documentadas e escaláveis." }
                       ].map((item, idx) => (
                           <Reveal key={idx} delay={idx * 100} width="100%">
                               <div className="group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-petrol-base/10 hover:border-petrol-base/30 transition-colors">
                                   <div className="flex items-baseline gap-4">
                                       <span className="text-xs font-mono text-petrol-base/30">0{idx + 1}</span>
                                       <span className="text-xl font-serif text-petrol-base group-hover:pl-2 transition-all duration-300">{item.title}</span>
                                   </div>
                                   <span className="text-sm font-light text-petrol-ink/60 mt-2 md:mt-0 max-w-xs text-right">
                                       {item.desc}
                                   </span>
                               </div>
                           </Reveal>
                       ))}
                    </div>
                 </div>

                 {/* EDUCATION LIST */}
                 <div>
                    <Reveal>
                        <div className="flex items-center gap-4 mb-8 border-b border-petrol-base/10 pb-4">
                            <span className="w-2 h-2 rounded-full bg-petrol-base/20"></span>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-petrol-base">Formação Acadêmica</h3>
                        </div>
                    </Reveal>

                    <div className="flex flex-col">
                       {EDUCATION.map((edu, idx) => (
                           <Reveal key={idx} delay={idx * 100} width="100%">
                               <div className="group flex flex-col md:flex-row md:items-baseline justify-between py-6 border-b border-petrol-base/10 hover:border-petrol-base/30 transition-colors">
                                   <div>
                                       <h4 className="text-lg font-serif text-petrol-base mb-1">{edu.degree}</h4>
                                       <span className="text-xs font-bold uppercase tracking-widest text-petrol-base/40">{edu.institution}</span>
                                   </div>
                                   <span className="text-xs font-mono text-petrol-base/40 mt-2 md:mt-0">
                                       {edu.period}
                                   </span>
                               </div>
                           </Reveal>
                       ))}
                    </div>
                 </div>

                 {/* METADATA STRIP (Status) */}
                 <Reveal width="100%">
                    <div className="p-8 bg-petrol-base/5 rounded-sm flex flex-col md:flex-row justify-between items-center gap-6 mt-12">
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-xs font-bold uppercase tracking-widest text-petrol-base">Disponível para novos projetos</span>
                        </div>
                        
                        <div className="flex gap-8">
                            <a href="mailto:contato@victor.dev" className="flex items-center gap-2 text-xs font-mono text-petrol-base hover:text-petrol-electric transition-colors">
                                <Mail size={12} /> Email
                            </a>
                            <span className="flex items-center gap-2 text-xs font-mono text-petrol-base/40">
                                <Globe size={12} /> Remoto / Híbrido
                            </span>
                        </div>
                    </div>
                 </Reveal>

              </div>
           </div>

        </div>
      </div>
    </section>
  );
};

export default About;