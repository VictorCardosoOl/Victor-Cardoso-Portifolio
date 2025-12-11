
import React from 'react';
import { SERVICES, PROCESS_STEPS } from '../constants';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Tilt from './ui/Tilt';
import { usePageTransition } from './ui/PageTransition';

const Services: React.FC = () => {
  const { transitionTo } = usePageTransition();

  return (
    <section id="services" className="py-24 md:py-40 bg-slate-950 text-white overflow-hidden relative rounded-[2rem] md:rounded-[3rem] -mt-10 z-10 pb-32 md:pb-48">
      {/* Refined Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#050505]"></div>
      <div className="absolute top-[-20%] right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-slate-800/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen opacity-50"></div>
      
      <div className="container mx-auto px-5 md:px-12 xl:px-20 relative z-10">
        
        {/* Services Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24">
          <Reveal variant="translate">
            <div>
              <div className="inline-block px-3 py-1 bg-white/5 rounded-full mb-4 border border-white/10 backdrop-blur-sm">
                <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-slate-300 uppercase block">
                  O que entregamos
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-medium text-white tracking-tight">
                Soluções Digitais
              </h2>
            </div>
          </Reveal>
          
          <Reveal delay={200} variant="blur">
            <p className="mt-4 md:mt-0 max-w-md text-slate-400 text-sm md:text-base leading-relaxed font-light">
                Do design à implementação. Foco em resolver problemas reais do seu negócio com tecnologia de ponta.
            </p>
          </Reveal>
        </div>

        {/* Services Grid with Tactile Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-24 md:mb-40">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={index} delay={index * 150} width="100%" variant="scale">
                  <Tilt strength={8} className="h-full">
                    {/* Increased padding for aggressive whitespace */}
                    <div className="h-full bg-slate-950/80 backdrop-blur-md p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] hover:bg-slate-900/90 transition-all duration-300 border border-white/10 hover:border-white/20 group shadow-xl">
                       <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 md:mb-10 text-white transition-colors border border-white/5 shadow-inner">
                          <Icon size={24} strokeWidth={1.5} className="md:w-7 md:h-7" />
                       </div>
                       <h3 className="text-xl md:text-2xl font-serif font-medium mb-4 text-slate-100">{service.title}</h3>
                       <p className="text-slate-300 text-base leading-relaxed mb-8 font-light">
                         {service.description}
                       </p>
                       <div className="flex flex-wrap gap-2 mt-auto">
                          {service.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] uppercase tracking-wider px-3 py-1.5 bg-black/60 border border-white/5 text-slate-400 rounded-full">
                               {tag}
                            </span>
                          ))}
                       </div>
                    </div>
                  </Tilt>
              </Reveal>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="border-t border-white/10 pt-20 md:pt-32">
           <Reveal>
              <div className="text-center mb-16 md:mb-24">
                 <h3 className="text-2xl md:text-5xl font-serif text-white mb-4">Como trabalhamos</h3>
                 <p className="text-sm md:text-base text-slate-400 font-light">Transparência e organização em cada etapa do projeto.</p>
              </div>
           </Reveal>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {PROCESS_STEPS.map((step, idx) => {
                 const Icon = step.icon;
                 return (
                   <Reveal key={idx} delay={idx * 100} width="100%" variant="translate">
                      <div className="relative pl-8 md:pl-10 border-l border-white/10 h-full">
                         <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center text-[8px] text-white font-bold">
                           {idx + 1}
                         </span>
                         <div className="mb-4 md:mb-6 text-slate-500">
                            <Icon size={24} />
                         </div>
                         <h4 className="text-lg md:text-xl font-bold text-white mb-3">{step.title}</h4>
                         <p className="text-sm text-slate-400 font-light leading-relaxed">
                            {step.description}
                         </p>
                      </div>
                   </Reveal>
                 )
              })}
           </div>

           <div className="mt-24 md:mt-32 text-center">
              <Reveal delay={400} variant="scale">
                 <a 
                   href="#contact" 
                   onClick={(e) => { e.preventDefault(); transitionTo('#contact'); }}
                   className="inline-flex items-center gap-2 text-white font-bold text-sm md:text-base uppercase tracking-widest border-b border-white pb-1 hover:text-slate-300 hover:border-slate-300 transition-colors cursor-pointer"
                 >
                    Começar meu projeto <ArrowRight size={16} />
                 </a>
              </Reveal>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
