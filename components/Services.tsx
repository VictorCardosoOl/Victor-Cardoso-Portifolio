import React, { useState } from 'react';
import { SERVICES } from '../constants';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { usePageTransition } from './ui/PageTransition';
import ContentModal from './ui/ContentModal';
import { motion, AnimatePresence } from 'framer-motion';

const Services: React.FC = () => {
  const { transitionTo } = usePageTransition();
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-32 md:py-48 bg-paper text-petrol-base relative z-10 overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        
        {/* Header Minimalista */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 pb-8 border-b border-petrol-base/10">
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-serif font-medium text-petrol-base tracking-tight leading-[0.9]">
                Expertise
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <span className="text-xs font-mono text-petrol-base/40 uppercase tracking-widest block mt-4 md:mt-0">
                Abordagem Técnica & Estratégica
              </span>
            </Reveal>
        </div>

        {/* --- EDITORIAL LIST LAYOUT --- */}
        <div className="flex flex-col">
          {SERVICES.map((service, index) => {
             const isHovered = hoveredIndex === index;

             return (
               <Reveal key={index} width="100%" delay={index * 50}>
                 <div 
                    className="group relative border-b border-petrol-base/10 transition-colors duration-500 hover:bg-white"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setSelectedService(service)}
                 >
                    <div className="py-12 md:py-16 flex flex-col md:flex-row gap-8 md:gap-0 cursor-pointer items-baseline">
                        
                        {/* 01. Index */}
                        <div className="md:w-1/12">
                            <span className="text-xs font-mono text-petrol-base/30 group-hover:text-petrol-electric transition-colors">
                                0{index + 1}.
                            </span>
                        </div>

                        {/* 02. Title */}
                        <div className="md:w-4/12">
                            <h3 className="text-3xl md:text-5xl font-serif text-petrol-base transition-transform duration-500 group-hover:translate-x-2">
                               {service.title}
                            </h3>
                        </div>

                        {/* 03. Description & Tech (Reveals/Highlights on Hover) */}
                        <div className="md:w-5/12 pr-8 relative">
                            <p className="text-sm md:text-base font-light leading-relaxed text-petrol-ink/60 group-hover:text-petrol-ink transition-colors">
                               {service.description}
                            </p>
                            
                            {/* Tech Stack Animated Reveal */}
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                        animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                        className="overflow-hidden hidden md:block"
                                    >
                                        <div className="flex flex-wrap gap-2">
                                            {service.techStack?.map((tech, i) => (
                                                <span key={i} className="text-[10px] font-mono border border-petrol-base/10 px-2 py-1 rounded-full text-petrol-base/60 bg-paper">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* 04. Action Icon */}
                        <div className="md:w-2/12 flex justify-end items-center">
                           <div className={`w-12 h-12 rounded-full border border-petrol-base/10 flex items-center justify-center transition-all duration-500 ${isHovered ? 'bg-petrol-base text-white rotate-[-45deg]' : 'text-petrol-base/30'}`}>
                               <ArrowRight size={18} />
                           </div>
                        </div>

                    </div>
                 </div>
               </Reveal>
             );
          })}
        </div>

        {/* Footer / CTA */}
        <div className="mt-24 text-center">
            <Reveal variant="scale">
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); transitionTo('#contact'); }}
                  className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-petrol-base hover:text-petrol-electric transition-colors border-b border-transparent hover:border-petrol-electric pb-1"
                >
                    Iniciar um Projeto <ArrowRight size={14} />
                </a>
            </Reveal>
        </div>

        {/* Modal Logic */}
        <ContentModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService?.title}
          category="Expertise"
        >
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">
              <div className="mb-12">
                 <h3 className="text-3xl md:text-5xl font-serif font-medium text-petrol-base mb-6 leading-tight">
                    {selectedService?.title}
                 </h3>
                 <p className="text-lg md:text-xl text-petrol-ink font-light leading-relaxed border-l-2 border-petrol-base/10 pl-6">
                   {selectedService?.description}
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                 <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-petrol-base/40 mb-4">Stack Tecnológico</h4>
                    <ul className="space-y-2">
                        {selectedService?.techStack?.map((tech, i) => (
                            <li key={i} className="flex items-center gap-2 text-petrol-base font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-petrol-electric"></span> {tech}
                            </li>
                        ))}
                    </ul>
                 </div>
                 
                 <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-petrol-base/40 mb-4">Metodologia</h4>
                     <p className="text-sm text-petrol-ink/80 font-light leading-relaxed">
                        Abordagem modular focada em desacoplamento e escalabilidade. Cada componente é desenhado para sobreviver a mudanças de requisitos.
                     </p>
                 </div>
              </div>
              
              <div className="bg-petrol-base text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
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
                   className="px-6 py-3 bg-white text-petrol-base rounded-full font-bold uppercase tracking-widest text-xs hover:bg-paper transition-colors"
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