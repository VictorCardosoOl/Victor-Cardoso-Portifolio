import React from 'react';
import { CASE_STUDIES } from '../constants';
import { ArrowUpRight, Cpu, Zap, Database } from 'lucide-react';
import { Reveal } from './ui/Reveal';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-slate-950 text-white overflow-hidden relative rounded-[3rem] -mt-10 z-10 pb-40">
      {/* Refined Background Elements - Darker, cleaner */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#050505]"></div>
      <div className="absolute top-[-20%] right-0 w-[600px] h-[600px] bg-slate-800/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen opacity-50"></div>
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-slate-900/30 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-40"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24">
          <Reveal>
            <div>
              <div className="inline-block px-3 py-1 bg-white/5 rounded-full mb-4 border border-white/10 backdrop-blur-sm">
                <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase block">
                  Deep Dives & Análises
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-medium text-white tracking-tight">
                Bastidores Técnicos
              </h2>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="mt-6 md:mt-0 max-w-md text-slate-400 text-sm md:text-base leading-relaxed font-light">
                Soluções onde a engenharia encontra o negócio. Estudos detalhados sobre como desafios complexos foram superados.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {CASE_STUDIES.map((study, index) => (
            <Reveal key={index} delay={index * 150} width="100%">
                <div 
                className="group relative glass-panel-dark rounded-[2.5rem] transition-all duration-500 overflow-hidden hover:bg-slate-900/80 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
                >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="p-8 md:p-12 flex flex-col lg:flex-row gap-12 relative z-10">
                    
                    {/* Header (Left) */}
                    <div className="lg:w-1/3 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-slate-200 shadow-inner">
                            {index === 0 ? <Zap size={20} strokeWidth={1.5} /> : index === 1 ? <Cpu size={20} strokeWidth={1.5} /> : <Database size={20} strokeWidth={1.5} />}
                            </div>
                            <span className="text-xs uppercase tracking-widest font-bold text-slate-500">
                            {study.client}
                            </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif font-medium mb-6 leading-tight text-white group-hover:text-slate-200 transition-colors">
                            {study.title}
                        </h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-auto pt-6 lg:pt-0">
                        {study.tech.map((t, i) => (
                        <span key={i} className="text-[10px] uppercase tracking-wider px-4 py-2 bg-black/40 border border-white/5 text-slate-400 rounded-full font-medium">
                            {t}
                        </span>
                        ))}
                    </div>
                    </div>

                    {/* Body (Right) */}
                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    {/* Vertical divider */}
                    <div className="absolute left-[-1.5rem] top-4 bottom-4 w-px bg-gradient-to-b from-white/5 via-white/10 to-white/5 hidden lg:block"></div>
                    
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> O Desafio
                        </h4>
                        <p className="text-slate-300 text-sm leading-relaxed font-light">
                            {study.challenge}
                        </p>
                    </div>
                    
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span> A Solução
                        </h4>
                        <p className="text-slate-300 text-sm leading-relaxed font-light">
                            {study.solution}
                        </p>
                    </div>
                    
                    <div className="md:col-span-2 mt-4 pt-6 border-t border-white/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Impacto</h4>
                                <p className="text-xl md:text-2xl font-serif text-white tracking-tight">
                                {study.result}
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 group-hover:scale-110">
                                <ArrowUpRight size={20} strokeWidth={1.5} />
                            </div>
                        </div>
                    </div>
                    </div>

                </div>
                </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;