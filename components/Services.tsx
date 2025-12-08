import React from 'react';
import { SERVICES, PROCESS_STEPS } from '../constants';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Magnetic from './ui/Magnetic';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-slate-950 text-white overflow-hidden relative rounded-[3rem] -mt-10 z-10 pb-40">
      {/* Refined Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#050505]"></div>
      <div className="absolute top-[-20%] right-0 w-[600px] h-[600px] bg-slate-800/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen opacity-50"></div>
      
      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        
        {/* Services Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24">
          <Reveal>
            <div>
              <div className="inline-block px-4 py-1.5 bg-white/5 rounded-full mb-6 border border-white/10 backdrop-blur-sm">
                <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase block">
                  O que entregamos
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif font-medium text-white tracking-tight">
                Soluções Digitais
              </h2>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="mt-8 md:mt-0 max-w-md text-slate-400 text-sm md:text-base leading-relaxed font-light">
                Do design à implementação. Foco em resolver problemas reais do seu negócio com tecnologia de ponta.
            </p>
          </Reveal>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={index} delay={index * 150} width="100%">
                  <Magnetic strength={0.05}>
                    <div className="h-full glass-panel-dark p-10 rounded-[2.5rem] hover:bg-slate-900 transition-all duration-500 border border-white/10 group hover:-translate-y-2">
                       <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 text-white transition-colors">
                          <Icon size={28} strokeWidth={1.5} />
                       </div>
                       <h3 className="text-2xl font-serif font-medium mb-4 text-white">{service.title}</h3>
                       <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
                         {service.description}
                       </p>
                       <div className="flex flex-wrap gap-2 mt-auto">
                          {service.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] uppercase tracking-wider px-3 py-1 bg-black/40 border border-white/5 text-slate-500 rounded-full">
                               {tag}
                            </span>
                          ))}
                       </div>
                    </div>
                  </Magnetic>
              </Reveal>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="border-t border-white/10 pt-24">
           <Reveal>
              <div className="text-center mb-20">
                 <h3 className="text-3xl md:text-5xl font-serif text-white mb-6">Como trabalhamos</h3>
                 <p className="text-slate-400 font-light max-w-lg mx-auto">Transparência e organização em cada etapa do projeto. Seu produto é construído com previsibilidade.</p>
              </div>
           </Reveal>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {PROCESS_STEPS.map((step, idx) => {
                 const Icon = step.icon;
                 return (
                   <Reveal key={idx} delay={idx * 100} width="100%">
                      <div className="relative pl-8 border-l border-white/10 h-full group hover:border-white/30 transition-colors duration-500">
                         <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-950 border border-slate-700 group-hover:border-white transition-colors flex items-center justify-center text-[8px] text-white font-bold">
                           {idx + 1}
                         </span>
                         <div className="mb-6 text-slate-500 group-hover:text-white transition-colors">
                            <Icon size={24} strokeWidth={1.5} />
                         </div>
                         <h4 className="text-lg font-bold text-white mb-3">{step.title}</h4>
                         <p className="text-sm text-slate-400 font-light leading-relaxed">
                            {step.description}
                         </p>
                      </div>
                   </Reveal>
                 )
              })}
           </div>

           <div className="mt-24 text-center">
              <Reveal delay={400}>
                <Magnetic strength={0.3}>
                   <a href="#contact" className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-widest border-b border-white pb-1 hover:text-slate-300 hover:border-slate-300 transition-colors">
                      Começar meu projeto <ArrowRight size={16} />
                   </a>
                </Magnetic>
              </Reveal>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Services;