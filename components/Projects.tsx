import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import ContentModal from './ui/ContentModal';
import { ProjectDetailContent } from './ProjectDetailContent';
import { Reveal } from './ui/Reveal';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ArchiveLine } from './ui/ArchiveLine';
import { motion } from 'framer-motion';

const MotionImg = motion.img as any;
const MotionDiv = motion.div as any;

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  // Layout logic
  const getLayoutClass = (index: number) => index % 3;

  return (
    <section id="projects" className="relative bg-paper py-32 z-10 overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        
        {/* Archive Header */}
        <div className="mb-24">
          <ArchiveLine index="01" label="SELECTED WORKS" className="mb-8" />
          <Reveal>
             <h2 className="text-6xl md:text-8xl font-serif font-medium text-petrol-base font-heading-tight mb-6">
               Arquivo <br/> <span className="text-petrol-base/40 italic">de Obras</span>
             </h2>
          </Reveal>
        </div>

        {/* --- ASYMMETRIC EDITORIAL LAYOUT --- */}
        <div className="flex flex-col gap-32 md:gap-48">
          {PROJECTS.map((project, index) => {
             const layout = getLayoutClass(index);
             
             return (
               <div key={index} className="w-full relative group">
                  
                  {index > 0 && <div className="w-full h-px bg-petrol-base/10 mb-24 md:mb-32"></div>}

                  {/* LAYOUT 0: Large Left Image, Text Right */}
                  {layout === 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                        <div className="lg:col-span-8">
                           <div 
                                className="relative aspect-[16/10] overflow-hidden cursor-pointer"
                                onClick={() => setSelectedProject(project)}
                              >
                                  <Reveal width="100%" className="h-full">
                                    <MotionDiv
                                       initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                       whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                                       transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                       className="w-full h-full"
                                    >
                                      <MotionImg 
                                        layoutId={`project-image-${project.title}`}
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                                      />
                                    </MotionDiv>
                                  </Reveal>
                              </div>
                        </div>
                        <div className="lg:col-span-4 flex flex-col items-start pt-4 sticky top-32 h-fit">
                           <Reveal delay={100}>
                              <div className="flex flex-col gap-6 border-l border-doc pl-6">
                                  <div>
                                     <span className="text-micro text-petrol-base/40 block mb-1">Index</span>
                                     <span className="font-mono text-lg text-petrol-base">PRJ-0{index+1}</span>
                                  </div>
                                  <div>
                                     <span className="text-micro text-petrol-base/40 block mb-1">Cliente</span>
                                     <h3 className="text-3xl font-serif font-medium text-petrol-base cursor-pointer hover:text-petrol-mid transition-colors" onClick={() => setSelectedProject(project)}>
                                        {project.title}
                                     </h3>
                                  </div>
                                  <div>
                                     <span className="text-micro text-petrol-base/40 block mb-1">Role</span>
                                     <span className="text-sm font-light text-petrol-ink">{project.category}</span>
                                  </div>
                                  <button onClick={() => setSelectedProject(project)} className="mt-4 flex items-center gap-2 text-micro text-petrol-base hover:text-petrol-accent transition-colors">
                                     [ Abrir Ficha ] <ArrowUpRight size={14} />
                                  </button>
                              </div>
                           </Reveal>
                        </div>
                    </div>
                  )}

                  {/* LAYOUT 1: Small Image Right, Text Left */}
                  {layout === 1 && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                         <div className="lg:col-span-5 order-2 lg:order-1 pt-4 sticky top-32 h-fit">
                           <Reveal delay={100}>
                              <div className="flex flex-col gap-6 border-l border-doc pl-6">
                                  <div>
                                     <span className="text-micro text-petrol-base/40 block mb-1">Index</span>
                                     <span className="font-mono text-lg text-petrol-base">PRJ-0{index+1}</span>
                                  </div>
                                  <div>
                                     <span className="text-micro text-petrol-base/40 block mb-1">Cliente</span>
                                     <h3 className="text-3xl font-serif font-medium text-petrol-base cursor-pointer hover:text-petrol-mid transition-colors" onClick={() => setSelectedProject(project)}>
                                        {project.title}
                                     </h3>
                                  </div>
                                  <div>
                                     <span className="text-micro text-petrol-base/40 block mb-1">Role</span>
                                     <span className="text-sm font-light text-petrol-ink">{project.category}</span>
                                  </div>
                                  <button onClick={() => setSelectedProject(project)} className="mt-4 flex items-center gap-2 text-micro text-petrol-base hover:text-petrol-accent transition-colors">
                                     [ Abrir Ficha ] <ArrowUpRight size={14} />
                                  </button>
                              </div>
                           </Reveal>
                        </div>
                        <div className="lg:col-span-7 order-1 lg:order-2">
                           <div 
                                className="relative aspect-[4/5] lg:w-[80%] overflow-hidden cursor-pointer ml-auto"
                                onClick={() => setSelectedProject(project)}
                              >
                                  <Reveal width="100%" className="h-full">
                                    <MotionDiv
                                       initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                       whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                                       transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                       className="w-full h-full"
                                    >
                                      <MotionImg 
                                        layoutId={`project-image-${project.title}`}
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                                      />
                                    </MotionDiv>
                                  </Reveal>
                              </div>
                        </div>
                    </div>
                  )}

                  {/* LAYOUT 2: Panoramic Center */}
                  {layout === 2 && (
                    <div className="flex flex-col items-center">
                         <div 
                              className="relative w-full aspect-[2.4/1] overflow-hidden cursor-pointer mb-12"
                              onClick={() => setSelectedProject(project)}
                            >
                                <Reveal width="100%" className="h-full">
                                    <MotionDiv
                                       initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                       whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                                       transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                       className="w-full h-full"
                                    >
                                      <MotionImg 
                                        layoutId={`project-image-${project.title}`}
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                                        style={{ objectPosition: 'center 30%' }}
                                      />
                                    </MotionDiv>
                                </Reveal>
                            </div>

                         <Reveal delay={100}>
                            <div className="flex flex-col md:flex-row justify-between items-end w-full max-w-4xl border-t border-doc pt-6">
                                <div>
                                   <span className="text-micro text-petrol-base/40 block mb-2">PRJ-0{index+1}</span>
                                   <h3 
                                     onClick={() => setSelectedProject(project)}
                                     className="text-4xl md:text-5xl font-serif font-medium text-petrol-base cursor-pointer hover:text-petrol-mid transition-colors"
                                   >
                                     {project.title}
                                   </h3>
                                </div>
                                <div className="flex items-center gap-8 mt-6 md:mt-0">
                                   <div className="hidden md:block">
                                      <span className="text-micro text-petrol-base/40 block mb-1">Tech Stack</span>
                                      <div className="flex gap-2">
                                         {project.tags.slice(0, 2).map((t, i) => <span key={i} className="text-xs text-petrol-ink">{t}</span>)}
                                      </div>
                                   </div>
                                   <button onClick={() => setSelectedProject(project)} className="w-12 h-12 border border-petrol-base/20 rounded-full flex items-center justify-center hover:bg-petrol-base hover:text-white transition-all">
                                      <ArrowRight size={16} />
                                   </button>
                                </div>
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
        layoutId={selectedProject ? `project-image-${selectedProject.title}` : undefined}
      >
        {selectedProject && <ProjectDetailContent project={selectedProject} />}
      </ContentModal>
    </section>
  );
};

export default Projects;