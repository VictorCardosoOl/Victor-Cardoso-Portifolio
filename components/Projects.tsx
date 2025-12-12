import React, { useState, useRef } from 'react';
import { PROJECTS } from '../constants';
import ContentModal from './ui/ContentModal';
import { ProjectDetailContent } from './ProjectDetailContent';
import { Reveal } from './ui/Reveal';
import { ArrowUpRight } from 'lucide-react';
import { ArchiveLine } from './ui/ArchiveLine';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const MotionImg = motion.img as any;
const MotionDiv = motion.div as any;

// Helper Component for Scroll-Linked Image Animation (Slit Scan Effect)
const ProjectImage: React.FC<{ 
  project: typeof PROJECTS[0], 
  onClick: () => void, 
  aspectClass?: string,
  style?: React.CSSProperties,
  layoutId?: string
}> = ({ project, onClick, aspectClass = "aspect-[16/10]", style, layoutId }) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "center center"] 
  });

  // Center-out reveal effect (Unmasking)
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1], 
    ["inset(15% 5% 15% 5%)", "inset(0% 0% 0% 0%)"]
  );
  
  // Smooth Physics Scale
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const scale = useTransform(smoothProgress, [0, 1], [1.15, 1.0]);
  
  return (
    <div 
      ref={containerRef}
      className={`relative ${aspectClass} overflow-hidden cursor-pointer bg-petrol-base/5 group liquid-hover-parent`}
      onClick={onClick}
      style={style}
    >
        <MotionDiv
            style={{ clipPath }}
            className="w-full h-full relative will-change-transform"
        >
          {/* LIQUID HOVER EFFECT: The class 'liquid-hover-target' applies the SVG filter from index.html */}
          <MotionImg 
            layoutId={layoutId} // Morphing Magic Key
            src={project.image} 
            alt={project.title} 
            style={{ scale }} 
            className="w-full h-full object-cover transition-all duration-700 ease-out opacity-90 group-hover:opacity-100 grayscale-[0.3] group-hover:grayscale-0 liquid-hover-target"
          />
        </MotionDiv>
        
        {/* Hover Overlay - Subtle Flash */}
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay" />
    </div>
  );
};


const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  // Layout logic
  const getLayoutClass = (index: number) => index % 3;

  return (
    <section id="projects" className="relative bg-paper py-32 md:py-48 z-10 overflow-hidden">
      
      {/* --- SPINE LINE (Subtler) --- */}
      <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-px bg-petrol-base/[0.03] z-0" />

      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        
        {/* Archive Header */}
        <div className="mb-32 md:mb-40 pl-8 md:pl-0">
          <ArchiveLine index="01" label="OBRAS SELECIONADAS" className="mb-6 opacity-70" />
          <Reveal>
             <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium text-petrol-base font-heading-tight mb-6 tracking-tighter">
               Arquivo <br/> <span className="text-petrol-base/30 italic font-light">de Obras</span>
             </h2>
          </Reveal>
        </div>

        {/* --- ASYMMETRIC EDITORIAL LAYOUT --- */}
        <div className="flex flex-col gap-32 md:gap-56">
          {PROJECTS.map((project, index) => {
             const layout = getLayoutClass(index);
             const uniqueLayoutId = `project-img-${index}`; // Unique ID for shared transition
             
             return (
               <div key={index} className="w-full relative group">
                  
                  {/* Visual Connection Point on the Spine */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0 w-2 h-2 bg-paper border border-petrol-base/20 rounded-full z-20 mt-2 hidden md:block group-hover:scale-150 transition-transform duration-500">
                     <div className="w-0.5 h-0.5 bg-petrol-base rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                  </div>

                  {/* LAYOUT 0: Large Left Image, Text Right (Sticky) */}
                  {layout === 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                        <div className="lg:col-span-7">
                           <ProjectImage 
                              project={project} 
                              onClick={() => setSelectedProject(project)}
                              layoutId={uniqueLayoutId}
                           />
                        </div>
                        <div className="lg:col-span-5 flex flex-col items-start pt-4 lg:sticky lg:top-32 h-fit lg:pl-12">
                           <Reveal delay={100} variant="translate">
                              <div className="flex flex-col gap-8">
                                  <div>
                                     <span className="text-[9px] font-mono uppercase tracking-widest text-petrol-base/40 block mb-2">Index No.</span>
                                     <span className="font-mono text-xs text-petrol-base border border-petrol-base/20 px-2 py-1 rounded-full">PRJ-0{index+1}</span>
                                  </div>
                                  <div>
                                     <h3 className="text-4xl md:text-5xl font-serif font-medium text-petrol-base cursor-pointer hover:text-petrol-mid transition-colors tracking-tight leading-[1.1]" onClick={() => setSelectedProject(project)}>
                                        {project.title}
                                     </h3>
                                  </div>
                                  <div className="max-w-xs">
                                     <p className="text-sm font-light text-petrol-ink leading-relaxed opacity-80">{project.description}</p>
                                  </div>
                                  <div className="pt-4">
                                    <button onClick={() => setSelectedProject(project)} className="text-[10px] font-bold uppercase tracking-[0.2em] text-petrol-base hover:text-petrol-electric flex items-center gap-2 transition-colors border-b border-petrol-base/10 hover:border-petrol-electric pb-1">
                                       Ver Detalhes
                                    </button>
                                  </div>
                              </div>
                           </Reveal>
                        </div>
                    </div>
                  )}

                  {/* LAYOUT 1: Text Left (Sticky), Small Image Right */}
                  {layout === 1 && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                         <div className="lg:col-span-5 order-2 lg:order-1 pt-4 lg:sticky lg:top-32 h-fit lg:text-right lg:items-end lg:pr-12">
                           <Reveal delay={100} variant="translate">
                              <div className="flex flex-col gap-8 lg:items-end">
                                  <div>
                                     <span className="text-[9px] font-mono uppercase tracking-widest text-petrol-base/40 block mb-2">Index No.</span>
                                     <span className="font-mono text-xs text-petrol-base border border-petrol-base/20 px-2 py-1 rounded-full">PRJ-0{index+1}</span>
                                  </div>
                                  <div>
                                     <h3 className="text-4xl md:text-5xl font-serif font-medium text-petrol-base cursor-pointer hover:text-petrol-mid transition-colors tracking-tight leading-[1.1]" onClick={() => setSelectedProject(project)}>
                                        {project.title}
                                     </h3>
                                  </div>
                                  <div className="max-w-xs">
                                     <p className="text-sm font-light text-petrol-ink leading-relaxed opacity-80">{project.description}</p>
                                  </div>
                                  <div className="pt-4">
                                    <button onClick={() => setSelectedProject(project)} className="text-[10px] font-bold uppercase tracking-[0.2em] text-petrol-base hover:text-petrol-electric flex items-center gap-2 lg:flex-row-reverse transition-colors border-b border-petrol-base/10 hover:border-petrol-electric pb-1">
                                       Ver Detalhes
                                    </button>
                                  </div>
                              </div>
                           </Reveal>
                        </div>
                        <div className="lg:col-span-7 order-1 lg:order-2">
                           <ProjectImage 
                              project={project} 
                              onClick={() => setSelectedProject(project)}
                              aspectClass="aspect-[4/5] lg:w-[85%] ml-auto"
                              layoutId={uniqueLayoutId}
                           />
                        </div>
                    </div>
                  )}

                  {/* LAYOUT 2: Panoramic Center */}
                  {layout === 2 && (
                    <div className="flex flex-col items-center">
                         <ProjectImage 
                            project={project} 
                            onClick={() => setSelectedProject(project)}
                            aspectClass="w-full aspect-[21/9] mb-16 shadow-2xl"
                            style={{ objectPosition: 'center 40%' }}
                            layoutId={uniqueLayoutId}
                         />

                         <Reveal delay={100} variant="translate" width="100%">
                            <div className="flex flex-col md:flex-row justify-between items-end w-full max-w-5xl mx-auto border-t border-petrol-base/10 pt-8">
                                <div>
                                   <span className="text-[9px] font-mono uppercase tracking-widest text-petrol-base/40 block mb-2">PRJ-0{index+1}</span>
                                   <h3 
                                     onClick={() => setSelectedProject(project)}
                                     className="text-4xl md:text-6xl font-serif font-medium text-petrol-base cursor-pointer hover:text-petrol-mid transition-colors tracking-tight"
                                   >
                                     {project.title}
                                   </h3>
                                </div>
                                <div className="mt-8 md:mt-0 flex flex-col items-end">
                                   <span className="text-sm font-light text-petrol-ink mb-6 text-right block">{project.category}</span>
                                   <button onClick={() => setSelectedProject(project)} className="px-8 py-3 border border-petrol-base/20 rounded-full flex items-center gap-3 hover:bg-petrol-base hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.2em] group">
                                      Explorar <ArrowUpRight size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
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
        // Pass the calculated layoutId to the modal so it knows which image to morph from
        layoutId={selectedProject ? `project-img-${PROJECTS.findIndex(p => p.title === selectedProject.title)}` : undefined}
      >
        {selectedProject && (
            <ProjectDetailContent 
                project={selectedProject} 
                // Pass layoutId down to the content image
                layoutId={selectedProject ? `project-img-${PROJECTS.findIndex(p => p.title === selectedProject.title)}` : undefined}
            />
        )}
      </ContentModal>
    </section>
  );
};

export default Projects;