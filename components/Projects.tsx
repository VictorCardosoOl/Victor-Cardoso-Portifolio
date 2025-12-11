
import React, { useRef } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ContentModal from './ui/ContentModal';
import { ProjectDetailContent } from './ProjectDetailContent';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = React.useState<typeof PROJECTS[0] | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-24 bg-slate-950 relative overflow-hidden border-t border-white/5">
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50 contrast-150"></div>
      
      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        
        {/* Header e Controles */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <Reveal>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 block">
                Portfólio Selecionado
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-4 tracking-tight">
                Obras <span className="italic text-slate-600">Recentes</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-slate-400 font-light text-sm md:text-base leading-relaxed max-w-lg">
                 Design e engenharia convergem para resolver problemas complexos.
              </p>
            </Reveal>
          </div>

          {/* Botões de Navegação Desktop */}
          <div className="hidden md:flex gap-3">
             <button 
               onClick={() => scroll('left')}
               className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all active:scale-95"
               aria-label="Scroll Left"
             >
               <ChevronLeft size={20} />
             </button>
             <button 
               onClick={() => scroll('right')}
               className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all active:scale-95"
               aria-label="Scroll Right"
             >
               <ChevronRight size={20} />
             </button>
          </div>
        </div>

        {/* 
            Carrossel Horizontal Nativo 
            - data-lenis-prevent: Impede conflito com o scroll vertical da página
            - snap-x: Garante que pare no lugar certo
        */}
        <div 
          ref={sliderRef}
          className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-12 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar"
          data-lenis-prevent
        >
          {PROJECTS.map((project, index) => (
            <div 
              key={index} 
              className="snap-center shrink-0 w-[85vw] md:w-[600px] lg:w-[700px] first:pl-0 last:pr-6 md:last:pr-0"
            >
              <Reveal delay={index * 100} width="100%" variant="scale">
                <div 
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer relative aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10 bg-slate-900 shadow-2xl"
                >
                  <div className="absolute inset-0 z-10 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                  
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />

                  {/* Conteúdo Sobreposto */}
                  <div className="absolute inset-0 z-20 p-6 md:p-10 flex flex-col justify-end">
                     <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex justify-between items-end border-b border-white/20 pb-4 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                             {project.category}
                           </span>
                           <div className="flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest">
                              Ver Detalhes <ArrowUpRight size={14} />
                           </div>
                        </div>
                        
                        <h3 className="text-2xl md:text-4xl font-serif font-medium text-white mb-2 drop-shadow-md">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] font-medium text-slate-300">#{tag}</span>
                          ))}
                        </div>
                     </div>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
          
          {/* Card Final de Chamada */}
          <div className="snap-center shrink-0 w-[85vw] md:w-[400px] flex items-center">
             <div className="w-full h-[60%] border border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center gap-6 text-center p-8 hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth'})}>
                <div className="w-16 h-16 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                   <ArrowUpRight className="text-white" />
                </div>
                <div>
                   <h3 className="text-xl font-serif text-white">Seu Projeto</h3>
                   <p className="text-xs text-slate-500 mt-2">Vamos criar o próximo?</p>
                </div>
             </div>
          </div>
        </div>

      </div>

      <ContentModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        category="Estudo de Caso"
      >
        {selectedProject && <ProjectDetailContent project={selectedProject} />}
      </ContentModal>
    </section>
  );
};

export default Projects;
