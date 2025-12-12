import React, { useState } from 'react';
import { SERVICES } from '../constants';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Tilt from './ui/Tilt';
import { usePageTransition } from './ui/PageTransition';
import ContentModal from './ui/ContentModal';

const Services: React.FC = () => {
  const { transitionTo } = usePageTransition();
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);

  return (
    // Background updated to Deep Petrol Blue (Slate 900)
    <section id="services" className="py-32 md:py-48 bg-[#0F172A] text-[#F8FAFC] relative -mt-10 z-10 rounded-t-[3rem] md:rounded-t-[4rem] overflow-hidden">
      
      {/* Subtle Gradient Atmosphere inside the dark section */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0ea5e9]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-5 md:px-12 xl:px-20 relative z-10">
        
        {/* Header - Layout Assimétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 md:mb-32 border-b border-white/10 pb-12">
          <div className="lg:col-span-5">
            <Reveal variant="translate">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#38bdf8] uppercase block mb-4">
                Capabilities
              </span>
              <h2 className="text-5xl md:text-7xl font-serif font-medium text-white tracking-tight leading-[0.9]">
                Expertise <br/> <span className="text-white/40 italic">& Toolkit</span>
              </h2>
            </Reveal>
          </div>
          
          <div className="lg:col-span-7 flex items-end justify-end">
             <Reveal delay={200} variant="blur">
                <p className="max-w-md text-white/60 text-sm leading-relaxed font-light text-right md:text-left">
                    Uma abordagem integral. Unifico engenharia de software robusta com design estratégico para eliminar a lacuna entre código e produto.
                </p>
             </Reveal>
          </div>
        </div>

        {/* Services List */}
        <div className="flex flex-col gap-8 md:gap-12">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={index} delay={index * 100} width="100%" variant="translate">
                  <div 
                    onClick={() => setSelectedService(service)}
                    className="group relative bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/20 rounded-[2rem] p-8 md:p-12 transition-all duration-500 cursor-pointer overflow-hidden"
                  >
                       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                           
                           {/* Icon & Title */}
                           <div className="lg:col-span-4">
                               <div className="w-12 h-12 flex items-center justify-center text-white/40 group-hover:text-[#38bdf8] transition-colors duration-500 mb-6">
                                  <Icon size={32} strokeWidth={1} />
                               </div>
                               <h3 className="text-3xl md:text-4xl font-serif font-medium text-slate-200 group-hover:text-white transition-colors">
                                 {service.title}
                               </h3>
                           </div>

                           {/* Description & Tech Stack */}
                           <div className="lg:col-span-5">
                               <p className="text-white/60 text-sm leading-relaxed mb-8 font-light">
                                 {service.description}
                               </p>
                               
                               {/* Tech Stack Mini-Grid */}
                               <div className="pt-6 border-t border-white/10">
                                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/30 block mb-3">Toolkit</span>
                                  <div className="flex flex-wrap gap-2">
                                     {service.techStack?.map((tech, t) => (
                                         <span key={t} className="px-3 py-1.5 rounded-full bg-white/5 text-white/70 text-[10px] uppercase tracking-wide border border-white/5 group-hover:border-white/20 transition-colors">
                                            {tech}
                                         </span>
                                     ))}
                                  </div>
                               </div>
                           </div>

                           {/* Arrow Action */}
                           <div className="lg:col-span-3 flex justify-end items-start h-full">
                              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-[#0F172A] transition-all duration-500">
                                  <ArrowUpRight size={20} />
                              </div>
                           </div>

                       </div>
                  </div>
              </Reveal>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-32 md:mt-48 text-center">
           <Reveal delay={200} variant="scale">
              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); transitionTo('#contact'); }}
                className="inline-block relative group"
              >
                 <span className="text-xl font-serif text-white/40 italic mr-4">Pronto para começar?</span>
                 <span className="text-4xl md:text-6xl font-serif text-white transition-colors duration-500">
                     Solicitar Proposta
                 </span>
                 <div className="h-[1px] w-0 group-hover:w-full bg-white transition-all duration-500 mt-2"></div>
              </a>
           </Reveal>
        </div>

        {/* Modal de Detalhes */}
        <ContentModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService?.title}
          category="Expertise"
        >
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">
              <div className="mb-12">
                 <h3 className="text-3xl md:text-5xl font-serif font-medium text-[#0F172A] mb-6 leading-tight">
                    {selectedService?.title}
                 </h3>
                 <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed border-l-2 border-slate-200 pl-6">
                   {selectedService?.description}
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                 <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Stack Tecnológico</h4>
                    <ul className="space-y-2">
                        {selectedService?.techStack?.map((tech, i) => (
                            <li key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> {tech}
                            </li>
                        ))}
                    </ul>
                 </div>
                 
                 <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Entregáveis</h4>
                    <div className="space-y-3">
                         {['Código Fonte Documentado', 'Sessão de Treinamento', '30 Dias de Suporte'].map((item, i) => (
                             <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-lg">
                                <CheckCircle2 size={14} className="text-[#0F172A]" />
                                <span className="text-xs font-bold uppercase text-slate-700">{item}</span>
                             </div>
                         ))}
                    </div>
                 </div>
              </div>
              
              <div className="bg-[#0F172A] text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                 <div>
                     <h4 className="text-xl font-serif">Precisa desta expertise?</h4>
                     <p className="text-white/60 text-sm">Vamos aplicar esta tecnologia no seu próximo projeto.</p>
                 </div>
                 <a 
                   href="#contact" 
                   onClick={(e) => { 
                      e.preventDefault(); 
                      setSelectedService(null);
                      setTimeout(() => transitionTo('#contact'), 300);
                   }}
                   className="px-6 py-3 bg-white text-[#0F172A] rounded-full font-bold uppercase tracking-widest text-xs hover:bg-slate-200 transition-colors"
                 >
                   Conversar
                 </a>
              </div>
            </div>
        </ContentModal>

      </div>
    </section>
  );
};

export default Services;