
import React, { useState } from 'react';
import { SERVICES, PROCESS_STEPS } from '../constants';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Tilt from './ui/Tilt';
import { usePageTransition } from './ui/PageTransition';
import ContentModal from './ui/ContentModal';

const Services: React.FC = () => {
  const { transitionTo } = usePageTransition();
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);

  return (
    <section id="services" className="py-32 md:py-48 bg-slate-950 text-white overflow-hidden relative -mt-10 z-10 rounded-t-[3rem] md:rounded-t-[4rem]">
      {/* Subtle Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#0A0A09] pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-slate-900/30 rounded-full blur-[150px] pointer-events-none opacity-40"></div>
      
      <div className="container mx-auto px-5 md:px-12 xl:px-20 relative z-10">
        
        {/* Services Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-32 border-b border-white/10 pb-12">
          <Reveal variant="translate">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase block mb-4">
                Expertise
              </span>
              <h2 className="text-5xl md:text-7xl font-serif font-medium text-white tracking-tight leading-[0.9]">
                Soluções <br/> <span className="text-slate-600 italic">Digitais</span>
              </h2>
            </div>
          </Reveal>
          
          <Reveal delay={200} variant="blur">
            <p className="mt-8 md:mt-0 max-w-sm text-slate-400 text-sm leading-relaxed font-light text-right md:text-left">
                Engenharia de software e design estratégico para resolver problemas complexos de negócio.
            </p>
          </Reveal>
        </div>

        {/* Services Grid - Premium "Glass Plates" Look */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-32 md:mb-48">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={index} delay={index * 150} width="100%" variant="scale">
                  <Tilt strength={5} className="h-full">
                    <div 
                      onClick={() => setSelectedService(service)}
                      className="h-full group relative p-10 md:p-12 rounded-[20px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-700 cursor-pointer overflow-hidden"
                    >
                       <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                       
                       <div className="relative z-10 flex flex-col h-full">
                           <div className="w-12 h-12 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors duration-500 mb-8 md:mb-12">
                              <Icon size={32} strokeWidth={1} />
                           </div>
                           
                           <h3 className="text-2xl font-serif font-medium mb-4 text-slate-200 group-hover:text-white transition-colors">
                             {service.title}
                           </h3>
                           
                           <p className="text-slate-500 text-sm leading-relaxed mb-10 font-light border-l border-white/10 pl-4 group-hover:border-white/30 transition-colors">
                             {service.description}
                           </p>

                           <div className="mt-auto flex justify-between items-end">
                              <div className="flex flex-col gap-1">
                                {service.tags.slice(0, 2).map((tag, i) => (
                                    <span key={i} className="text-[9px] uppercase tracking-widest text-slate-600">
                                       {tag}
                                    </span>
                                ))}
                              </div>
                              <ArrowUpRight size={20} className="text-slate-600 group-hover:text-white transition-colors duration-500 transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                           </div>
                       </div>
                    </div>
                  </Tilt>
              </Reveal>
            );
          })}
        </div>

        {/* Process Section - Minimalist Timeline */}
        <div className="pt-10">
           <Reveal>
              <div className="mb-20">
                 <h3 className="text-3xl md:text-4xl font-serif text-white mb-2">Metodologia</h3>
                 <p className="text-sm text-slate-500 font-light uppercase tracking-widest">Processo linear & Transparente</p>
              </div>
           </Reveal>

           <div className="grid grid-cols-1 md:grid-cols-4 border-t border-white/10">
              {PROCESS_STEPS.map((step, idx) => {
                 return (
                   <Reveal key={idx} delay={idx * 150} width="100%" variant="translate">
                      <div className="pt-8 md:pt-12 pr-8 md:border-r border-white/5 last:border-0 relative group">
                         <span className="text-[10px] font-bold text-slate-700 block mb-6 group-hover:text-slate-400 transition-colors">0{idx + 1}</span>
                         <h4 className="text-lg font-serif text-slate-200 mb-3 group-hover:text-white transition-colors">{step.title}</h4>
                         <p className="text-xs text-slate-500 font-light leading-relaxed max-w-[200px]">
                            {step.description}
                         </p>
                      </div>
                   </Reveal>
                 )
              })}
           </div>

           <div className="mt-32 md:mt-48 text-center">
              <Reveal delay={400} variant="scale">
                 <a 
                   href="#contact" 
                   onClick={(e) => { e.preventDefault(); transitionTo('#contact'); }}
                   className="inline-block relative group"
                 >
                    <span className="text-4xl md:text-6xl font-serif text-white/50 group-hover:text-white transition-colors duration-500">
                        Começar Projeto
                    </span>
                    <div className="h-[1px] w-0 group-hover:w-full bg-white transition-all duration-500 mt-2"></div>
                 </a>
              </Reveal>
           </div>
        </div>

        {/* Content Modal */}
        <ContentModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService?.title}
          category="Solução"
        >
          {selectedService && (
            <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">
              <div className="mb-16">
                 <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-900 mb-8">
                    <selectedService.icon size={24} strokeWidth={1.5} />
                 </div>
                 <h3 className="text-3xl md:text-5xl font-serif font-medium text-slate-900 mb-6 leading-tight">
                    {selectedService.title}
                 </h3>
                 <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed border-l-2 border-slate-200 pl-6">
                   {selectedService.description}
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                 {['Planejamento Estratégico', 'Desenvolvimento Ágil', 'Testes Automatizados', 'Suporte Contínuo'].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-6 bg-slate-50 border border-slate-100 rounded-xl">
                       <CheckCircle2 size={16} className="text-slate-400" />
                       <span className="text-sm font-bold uppercase tracking-wider text-slate-700">{item}</span>
                    </div>
                 ))}
              </div>
              
              <div className="bg-charcoal text-paper p-10 md:p-14 rounded-3xl text-center">
                 <h4 className="text-2xl font-serif mb-4">Interessado nesta solução?</h4>
                 <p className="text-white/60 mb-8 max-w-md mx-auto font-light text-sm">Vamos discutir como aplicar esta tecnologia ao seu negócio.</p>
                 <a 
                   href="#contact" 
                   onClick={(e) => { 
                      e.preventDefault(); 
                      setSelectedService(null);
                      setTimeout(() => transitionTo('#contact'), 300);
                   }}
                   className="inline-block px-8 py-4 bg-paper text-charcoal rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
                 >
                   Solicitar Orçamento
                 </a>
              </div>
            </div>
          )}
        </ContentModal>

      </div>
    </section>
  );
};

export default Services;
