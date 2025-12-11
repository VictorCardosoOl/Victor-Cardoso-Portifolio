
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ContentModal from './ui/ContentModal';
import { ProjectDetailContent } from './ProjectDetailContent';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <section id="projects" className="relative bg-slate-950 py-24 md:py-32 overflow-hidden">
      {/* Background Noise & Gradient */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50 contrast-150"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* COLUNA ESQUERDA: Título e Intro (Sticky no Desktop) */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-16rem)] flex flex-col">
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-[1px] bg-slate-700"></div>
                   <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                     Portfólio
                   </span>
                </div>
              </Reveal>
              
              <Reveal delay={100}>
                <h2 className="text-4xl md:text-6xl font-serif font-medium text-white mb-6 leading-tight">
                  Obras <br />
                  <span className="text-slate-600 italic">Selecionadas</span>
                </h2>
              </Reveal>
              
              <Reveal delay={200}>
                <p className="text-slate-400 font-light text-base leading-relaxed mb-8 max-w-sm border-l border-slate-800 pl-6">
                   Cada projeto é uma intersecção entre engenharia robusta e design narrativo. Soluções que não apenas funcionam, mas encantam.
                </p>
              </Reveal>

              <div className="mt-auto hidden lg:block">
                 <Reveal delay={300}>
                    <Button 
                      variant="outline" 
                      className="border-slate-700 text-slate-300 hover:text-white hover:border-white hover:bg-white/5"
                    >
                      Ver Arquivo Completo <MoveRight className="ml-2 w-4 h-4" />
                    </Button>
                 </Reveal>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: Lista de Projetos (Scrollable) */}
          <div className="lg:w-2/3 flex flex-col gap-12 md:gap-20">
             {PROJECTS.map((project, index) => (
                <Reveal key={index} width="100%" delay={index * 100}>
                   <div 
                      onClick={() => setSelectedProject(project)}
                      className="group cursor-pointer block"
                   >
                      {/* Card Container */}
                      <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl mb-6">
                         
                         {/* Imagem com Zoom Suave */}
                         <div className="absolute inset-0 bg-slate-800 animate-pulse" /> {/* Placeholder loading */}
                         <motion.img 
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                         />
                         
                         {/* Overlay Hover */}
                         <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                         {/* Botão Flutuante (Aparece no Hover) */}
                         <div className="absolute top-6 right-6 md:top-8 md:right-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-20">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg">
                               <ArrowUpRight size={24} />
                            </div>
                         </div>
                      </div>

                      {/* Informações do Projeto (Abaixo da imagem para limpeza visual) */}
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-8 group-hover:border-white/30 transition-colors duration-500">
                         <div>
                            <div className="flex items-center gap-3 mb-2">
                               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                 0{index + 1} &mdash; {project.year}
                               </span>
                               <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest bg-white/5 text-slate-300 border border-white/5">
                                 {project.category}
                               </span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-serif font-medium text-white group-hover:text-slate-200 transition-colors">
                              {project.title}
                            </h3>
                         </div>
                         
                         <div className="flex flex-wrap gap-2 md:justify-end max-w-xs">
                            {project.tags.slice(0, 3).map((tag, i) => (
                               <span key={i} className="text-xs text-slate-500 font-medium">
                                 #{tag}
                               </span>
                            ))}
                         </div>
                      </div>
                   </div>
                </Reveal>
             ))}

             {/* Mobile CTA */}
             <div className="block lg:hidden mt-8">
                <Button 
                  variant="outline" 
                  className="w-full justify-center border-slate-700 text-slate-300 hover:text-white hover:border-white hover:bg-white/5"
                >
                  Ver Arquivo Completo
                </Button>
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
