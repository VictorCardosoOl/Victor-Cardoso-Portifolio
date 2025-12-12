import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import ContentModal from './ui/ContentModal';
import { ProjectDetailContent } from './ProjectDetailContent';
import { Reveal } from './ui/Reveal';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  // Helper to determine layout class based on index
  const getLayoutClass = (index: number) => {
    // 0: Large Image Left, Text Right
    // 1: Small Image Right, Text Left
    // 2: Centered Large Image, Text Bottom
    const pattern = index % 3;
    return pattern;
  };

  return (
    <section id="projects" className="relative bg-paper py-32 md:py-48 z-10 overflow-hidden">
      
      {/* Decorative Blueprint Grid */}
      <div className="absolute top-0 inset-x-0 h-px bg-petrol-base/5"></div>
      
      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        
        {/* Header */}
        <div className="mb-32">
          <Reveal>
             <span className="font-mono text-petrol-accent text-[10px] uppercase tracking-widest mb-3 block">
                / Archive.01
             </span>
             <h2 className="text-6xl md:text-8xl font-serif font-medium text-petrol-base font-heading-tight">
               Projetos <br/> <span className="text-petrol-mid/60 italic">Selecionados</span>
             </h2>
          </Reveal>
        </div>

        {/* --- ASYMMETRIC EDITORIAL LAYOUT --- */}
        <div className="flex flex-col gap-32 md:gap-48">
          {PROJECTS.map((project, index) => {
             const layout = getLayoutClass(index);
             
             return (
               <div key={index} className="w-full">
                  
                  {/* LAYOUT 0: Large Left Image, Text Right */}
                  {layout === 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                        <div className="lg:col-span-7">
                           <Reveal width="100%">
                              <div 
                                className="relative aspect-[16/10] overflow-hidden cursor-pointer"
                                onClick={() => setSelectedProject(project)}
                              >
                                  <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                                  />
                              </div>
                           </Reveal>
                        </div>
                        <div className="lg:col-span-5 flex flex-col items-start">
                           <Reveal delay={100}>
                              <div className="flex items-center gap-3 mb-6">
                                 <span className="font-mono text-[10px] uppercase tracking-widest text-petrol-base/40">0{index+1}</span>
                                 <span className="w-8 h-[1px] bg-petrol-base/20"></span>
                                 <span className="font-mono text-[10px] uppercase tracking-widest text-petrol-base/60">{project.category}</span>
                              </div>
                              <h3 
                                onClick={() => setSelectedProject(project)}
                                className="text-4xl md:text-5xl font-serif font-medium text-petrol-base mb-6 cursor-pointer hover:text-petrol-mid transition-colors"
                              >
                                {project.title}
                              </h3>
                              <p className="text-ink-300 font-light leading-relaxed mb-8 max-w-sm">
                                {project.description}
                              </p>
                              <button onClick={() => setSelectedProject(project)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-petrol-base hover:text-petrol-accent transition-colors group">
                                 Explorar <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                              </button>
                           </Reveal>
                        </div>
                    </div>
                  )}

                  {/* LAYOUT 1: Small Image Right (Portrait-ish), Text Left */}
                  {layout === 1 && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                         <div className="lg:col-span-5 order-2 lg:order-1 lg:pl-12 flex flex-col items-start lg:items-end lg:text-right">
                           <Reveal delay={100}>
                              <div className="flex items-center gap-3 mb-6 lg:justify-end">
                                 <span className="font-mono text-[10px] uppercase tracking-widest text-petrol-base/60">{project.category}</span>
                                 <span className="w-8 h-[1px] bg-petrol-base/20"></span>
                                 <span className="font-mono text-[10px] uppercase tracking-widest text-petrol-base/40">0{index+1}</span>
                              </div>
                              <h3 
                                onClick={() => setSelectedProject(project)}
                                className="text-4xl md:text-5xl font-serif font-medium text-petrol-base mb-6 cursor-pointer hover:text-petrol-mid transition-colors"
                              >
                                {project.title}
                              </h3>
                              <p className="text-ink-300 font-light leading-relaxed mb-8 max-w-sm">
                                {project.description}
                              </p>
                              <button onClick={() => setSelectedProject(project)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-petrol-base hover:text-petrol-accent transition-colors group">
                                 Explorar <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                              </button>
                           </Reveal>
                        </div>
                        <div className="lg:col-span-7 order-1 lg:order-2">
                           <Reveal width="100%">
                              <div 
                                className="relative aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/5] lg:w-[80%] overflow-hidden cursor-pointer ml-auto"
                                onClick={() => setSelectedProject(project)}
                              >
                                  <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                                  />
                              </div>
                           </Reveal>
                        </div>
                    </div>
                  )}

                  {/* LAYOUT 2: Centered Large Image */}
                  {layout === 2 && (
                    <div className="flex flex-col items-center text-center">
                         <Reveal width="100%" className="w-full">
                            <div 
                              className="relative w-full aspect-[2/1] overflow-hidden cursor-pointer mb-12"
                              onClick={() => setSelectedProject(project)}
                            >
                                <img 
                                  src={project.image} 
                                  alt={project.title} 
                                  className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                                />
                            </div>
                         </Reveal>

                         <Reveal delay={100}>
                            <div className="flex flex-col items-center max-w-2xl mx-auto">
                                <div className="flex items-center gap-3 mb-4">
                                   <span className="font-mono text-[10px] uppercase tracking-widest text-petrol-base/40">0{index+1}</span>
                                   <span className="font-mono text-[10px] uppercase tracking-widest text-petrol-base/60">{project.category}</span>
                                </div>
                                <h3 
                                  onClick={() => setSelectedProject(project)}
                                  className="text-5xl md:text-7xl font-serif font-medium text-petrol-base mb-6 cursor-pointer hover:text-petrol-mid transition-colors font-heading-tight"
                                >
                                  {project.title}
                                </h3>
                                <p className="text-ink-300 font-light leading-relaxed mb-8">
                                  {project.description}
                                </p>
                                <button onClick={() => setSelectedProject(project)} className="px-8 py-3 border border-petrol-base/10 rounded-full text-xs font-bold uppercase tracking-widest text-petrol-base hover:bg-petrol-base hover:text-white transition-all">
                                   Ver Detalhes
                                </button>
                            </div>
                         </Reveal>
                    </div>
                  )}

               </div>
             );
          })}
        </div>

      </div>

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