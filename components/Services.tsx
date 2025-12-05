import React from 'react';
import { CASE_STUDIES } from '../constants';
import { ArrowUpRight, Cpu, Zap, Database } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-slate-950 text-white overflow-hidden relative rounded-[3rem] -mt-10 z-10 pb-40">
      {/* Decorative Background Elements with Black/White Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-900 to-black opacity-90 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-slate-800/20 rounded-full blur-[120px] pointer-events-none mix-blend-overlay"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24">
          <div>
            <div className="inline-block px-3 py-1 bg-white/10 rounded-full mb-4 border border-white/10">
              <span className="text-[10px] font-bold tracking-widest text-white uppercase block">
                Deep Dives & Análises
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-white">
              Bastidores Técnicos
            </h2>
          </div>
          <p className="mt-6 md:mt-0 max-w-md text-slate-300 text-sm md:text-base leading-relaxed font-light">
            Soluções onde a engenharia encontra o negócio. Estudos detalhados sobre como desafios complexos foram superados.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {CASE_STUDIES.map((study, index) => (
            <div 
              key={index} 
              className="group relative bg-slate-900/60 backdrop-blur-md border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden rounded-[2rem] hover:bg-slate-900/80"
            >
              
              <div className="p-8 md:p-12 flex flex-col lg:flex-row gap-12">
                
                {/* Header (Left) */}
                <div className="lg:w-1/3 flex flex-col justify-between">
                   <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-white/5 rounded-full border border-white/10 text-white">
                           {index === 0 ? <Zap size={18} /> : index === 1 ? <Cpu size={18} /> : <Database size={18} />}
                        </div>
                        <span className="text-xs uppercase tracking-widest font-bold text-slate-400">
                          {study.client}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-serif font-medium mb-6 leading-tight text-white group-hover:text-slate-200 transition-colors">
                        {study.title}
                      </h3>
                   </div>
                   
                   <div className="flex flex-wrap gap-2 mt-auto pt-6 lg:pt-0">
                    {study.tech.map((t, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-wider px-3 py-1.5 bg-black/40 border border-white/10 text-slate-300 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Body (Right) */}
                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                   {/* Vertical divider */}
                   <div className="absolute left-[-1.5rem] top-4 bottom-4 w-px bg-white/10 hidden lg:block"></div>
                   
                   <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">O Desafio</h4>
                      <p className="text-slate-200 text-sm leading-relaxed p-4 bg-black/20 rounded-2xl border border-white/5">
                        {study.challenge}
                      </p>
                   </div>
                   
                   <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">A Solução</h4>
                      <p className="text-slate-200 text-sm leading-relaxed p-4 bg-black/20 rounded-2xl border border-white/5">
                        {study.solution}
                      </p>
                   </div>
                   
                   <div className="md:col-span-2 mt-4 pt-6 border-t border-white/5">
                      <div className="flex items-center justify-between">
                         <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Impacto</h4>
                            <p className="text-lg md:text-xl font-serif text-white">
                               {study.result}
                            </p>
                         </div>
                         <div className="p-3 rounded-full bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                            <ArrowUpRight size={20} />
                         </div>
                      </div>
                   </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;