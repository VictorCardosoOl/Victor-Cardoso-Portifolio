
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import ContentModal from './ui/ContentModal';
import { ProjectDetailContent } from './ProjectDetailContent';
import { Reveal } from './ui/Reveal';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <section id="projects" className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
      {/* Background Noise/Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50 contrast-150"></div>
      
      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        
        {/* Header Simples */}
        <div className="mb-16 md:mb-24 max-w-3xl">
          <Reveal>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 block">
              Portfólio Selecionado
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl md:text-6xl font-serif font-medium text-white mb-6 tracking-tight">
              Projetos <span className="italic text-slate-600">Recentes</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-slate-400 font-light text-lg leading-relaxed max-w-xl">
               Uma seleção de trabalhos onde design e engenharia convergem para resolver problemas complexos.
            </p>
          </Reveal>
        </div>

        {/* Grid Layout - A estrutura mais robusta e simples possível */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {PROJECTS.map((project, index) => (
            <Reveal key={index} delay={index * 100} width="100%" variant="scale">
              <div 
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer flex flex-col gap-4"
              >
                {/* Image Card */}
                <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl">
                  <div className="absolute inset-0 z-10 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-500" />
                  
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />

                  {/* Hover Overlay Button */}
                  <div className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                {/* Info */}
                <div className="px-2">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl md:text-3xl font-serif font-medium text-white group-hover:text-slate-200 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-800 px-2 py-1 rounded-full">
                      {project.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {project.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    <span className="text-xs text-slate-500 truncate max-w-[200px]">
                      {project.tags.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Placeholder Card para "Seu Projeto" (Opcional, mantém o grid equilibrado) */}
          <Reveal delay={PROJECTS.length * 100} width="100%" variant="scale">
            <a href="#contact" className="group cursor-pointer flex flex-col gap-4 h-full">
              <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[2rem] border border-dashed border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex flex-col items-center justify-center gap-4 text-center p-8">
                 <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-300">
                    <Plus size={24} className="text-white" />
                 </div>
                 <div>
                    <h3 className="text-xl font-serif text-white mb-1">Seu Projeto Aqui</h3>
                    <p className="text-xs text-slate-500 font-light max-w-[200px] mx-auto">
                      Vamos construir o próximo case de sucesso juntos.
                    </p>
                 </div>
              </div>
            </a>
          </Reveal>

        </div>
      </div>

      {/* Modal Fullscreen - Mantido pois funciona bem */}
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
