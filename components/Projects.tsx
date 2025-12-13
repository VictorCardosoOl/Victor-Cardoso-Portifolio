import React, { useState, useRef } from 'react';
import { PROJECTS } from '../constants';
import ContentModal from './ui/ContentModal';
import { ProjectDetailContent } from './ProjectDetailContent';
import { Reveal } from './ui/Reveal';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Card de Projeto Estilo Arquitetural ---
const ProjectCard: React.FC<{ 
  project: typeof PROJECTS[0], 
  index: number,
  onClick: () => void
}> = ({ project, index, onClick }) => {
  
  const containerRef = useRef(null);
  
  // Parallax Interno da Imagem
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Movimento sutil da imagem dentro do container
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]); 

  return (
    <div 
      ref={containerRef}
      className="group w-full cursor-pointer relative py-12 md:py-24 border-t border-petrol-base/10 first:border-t-0"
      onClick={onClick}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* 1. Coluna Esquerda: Metadados e Índice */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col justify-between items-baseline lg:sticky lg:top-32 transition-all duration-500">
             <div className="flex items-baseline gap-4">
                 <span className="text-sm font-mono text-petrol-base/40 group-hover:text-petrol-electric transition-colors">
                     ( {project.year} )
                 </span>
                 <span className="text-sm font-mono uppercase tracking-widest text-petrol-base/60">
                     {project.category}
                 </span>
             </div>
             
             {/* Número Gigante */}
             <div className="hidden lg:block mt-8 overflow-hidden">
                <span className="text-[8rem] leading-[0.8] font-serif text-petrol-base/5 group-hover:text-petrol-base/10 transition-colors duration-700">
                    {(index + 1).toString().padStart(2, '0')}
                </span>
             </div>
          </div>

          {/* 2. Coluna Direita: Imagem e Conteúdo */}
          <div className="lg:col-span-9">
              {/* Container da Imagem com Parallax e Máscara */}
              <div className="relative overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-petrol-base/5 mb-10 group-hover:shadow-2xl transition-shadow duration-700 rounded-sm">
                 <motion.div className="w-full h-full relative overflow-hidden">
                     <motion.img 
                        layoutId={`project-image-${project.title}`}
                        src={project.image} 
                        alt={project.title}
                        style={{ y, scale: 1.15 }} // Escala maior para permitir o parallax sem cortar
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 ease-out"
                     />
                 </motion.div>
                 
                 {/* Overlay de Hover */}
                 <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 pointer-events-none mix-blend-overlay" />
                 
                 {/* Botão Flutuante Central */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 z-20">
                    <ArrowUpRight className="text-white" size={32} />
                 </div>
              </div>

              {/* Título e Descrição */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                  <div className="max-w-2xl">
                      <motion.h3 
                        layoutId={`project-title-${project.title}`}
                        className="text-4xl md:text-6xl font-serif font-medium text-petrol-base mb-4 leading-tight group-hover:text-petrol-mid transition-colors"
                      >
                          {project.title}
                      </motion.h3>
                      <p className="text-petrol-ink/70 font-light leading-relaxed text-lg max-w-lg">
                          {project.description}
                      </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 md:justify-end">
                      {project.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="px-3 py-1 border border-petrol-base/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-petrol-base/60 bg-white">
                              {tag}
                          </span>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <section id="projects" className="relative bg-paper py-32 md:py-48 z-10 overflow-hidden">
      
      {/* Linhas Guia Decorativas */}
      <div className="absolute top-0 left-6 md:left-24 w-px h-full bg-petrol-base/[0.03] z-0 pointer-events-none" />
      <div className="absolute top-0 right-6 md:right-24 w-px h-full bg-petrol-base/[0.03] z-0 pointer-events-none hidden md:block" />

      <div className="container mx-auto px-6 md:px-12 xl:px-24 relative z-10">
        
        {/* Cabeçalho Editorial */}
        <div className="flex flex-col items-start mb-32 pl-0 md:pl-24">
           <Reveal>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-petrol-base/40 mb-4 block">
                 Arquivo Selecionado
              </span>
              <h2 className="text-7xl md:text-[9rem] leading-[0.85] font-serif font-light text-petrol-base tracking-tighter mix-blend-darken">
                 Obras <br/>
                 <span className="italic text-petrol-base/20 ml-16 md:ml-32">Recentes</span>
              </h2>
           </Reveal>
        </div>

        {/* Lista de Projetos */}
        <div className="flex flex-col">
          {PROJECTS.map((project, index) => (
             <Reveal key={index} width="100%" delay={index * 50}>
                <ProjectCard 
                   project={project} 
                   index={index} 
                   onClick={() => setSelectedProject(project)}
                />
             </Reveal>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-32 text-center">
            <Reveal variant="scale">
                <a href="#contact" className="inline-flex items-center gap-3 px-8 py-4 border border-petrol-base/10 hover:bg-petrol-base hover:text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 group">
                    Iniciar um projeto <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
            </Reveal>
        </div>

      </div>

      <ContentModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        category={selectedProject?.category}
        layoutId={selectedProject ? `project-image-${selectedProject.title}` : undefined}
      >
        {selectedProject && (
            <ProjectDetailContent 
                project={selectedProject} 
                layoutId={`project-image-${selectedProject.title}`}
            />
        )}
      </ContentModal>
    </section>
  );
};

export default Projects;