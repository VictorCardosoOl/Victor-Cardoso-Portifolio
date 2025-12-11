
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ContentModal from './ui/ContentModal';
import { ProjectDetailContent } from './ProjectDetailContent';
import { Reveal } from './ui/Reveal';

const MotionImg = motion.img as any;

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <section id="projects" className="relative bg-slate-950 text-white py-32 md:py-48 z-10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute inset-0 z-[0] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 fixed"></div>
      
      {/* Decorative Glow */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-slate-800/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        
        {/* Header Elegante */}
        <div className="mb-32 md:mb-48 flex flex-col md:flex-row items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div className="max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400">
                  Obras Selecionadas
                </span>
              </div>
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif font-medium text-white leading-[0.9] tracking-tight">
                Design <span className="text-slate-600 font-serif italic">&</span> <br/>
                Engenharia
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div className="max-w-xs text-right md:text-right hidden md:block">
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                Cada projeto é uma intersecção entre estética refinada e arquitetura de software robusta.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Lista de Projetos - Estilo Editorial */}
        <div className="flex flex-col gap-32 md:gap-48">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 lg:gap-32 ${!isEven ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* Coluna da Imagem */}
                <div 
                  className="w-full md:w-3/5 group cursor-pointer" 
                  onClick={() => setSelectedProject(project)}
                >
                  <Reveal width="100%" variant="scale" duration={0.8}>
                    <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.05)]">
                      {/* Imagem */}
                      <MotionImg 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover opacity-90 transition-all duration-1000 ease-[0.22,1,0.36,1] group-hover:scale-105 group-hover:opacity-100"
                        whileHover={{ scale: 1.03 }}
                      />
                      
                      {/* Overlay Gradiente Sutil */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                      {/* Botão Flutuante (Aparece no Hover) */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 text-white shadow-lg">
                           <ArrowUpRight size={24} strokeWidth={1.5} />
                         </div>
                      </div>
                    </div>
                  </Reveal>
                </div>

                {/* Coluna de Texto */}
                <div className="w-full md:w-2/5 flex flex-col">
                  <Reveal width="100%" delay={100}>
                    <div className="flex items-center gap-4 mb-8">
                       <span className="text-xs font-mono font-bold text-slate-600">0{index + 1}</span>
                       <div className="h-px w-8 bg-slate-800"></div>
                       <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{project.category}</span>
                    </div>
                  </Reveal>
                  
                  <Reveal width="100%" delay={200}>
                    <h3 
                      onClick={() => setSelectedProject(project)}
                      className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-6 leading-none cursor-pointer hover:text-slate-300 transition-colors"
                    >
                      {project.title}
                    </h3>
                  </Reveal>

                  <Reveal width="100%" delay={300}>
                    <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base mb-10 max-w-sm">
                       {project.description}
                    </p>
                  </Reveal>

                  <Reveal width="100%" delay={400}>
                    <div className="flex flex-wrap gap-2 mb-10">
                       {project.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            {tag}
                          </span>
                       ))}
                    </div>
                  </Reveal>

                  <Reveal width="100%" delay={500}>
                    <button 
                       onClick={() => setSelectedProject(project)}
                       className="group flex items-center gap-3 text-white text-xs font-bold uppercase tracking-widest hover:text-slate-300 transition-colors"
                    >
                       <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all">
                          <ArrowRight size={12} />
                       </span>
                       Ver Case Study
                    </button>
                  </Reveal>
                </div>

              </div>
            );
          })}
        </div>

        {/* Footer da Seção */}
        <Reveal className="mt-40 md:mt-60 border-t border-white/5 pt-12 flex justify-center">
            <a 
              href="#contact" 
              className="text-center group"
            >
               <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">Gostou do que viu?</p>
               <h4 className="text-3xl md:text-5xl font-serif text-white group-hover:text-slate-300 transition-colors">
                 Vamos construir o seu próximo projeto
               </h4>
            </a>
        </Reveal>

      </div>

      {/* Modal de Detalhes */}
      <ContentModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        category={selectedProject?.category}
      >
        {selectedProject && <ProjectDetailContent project={selectedProject} />}
      </ContentModal>
    </section>
  );
};

export default Projects;
