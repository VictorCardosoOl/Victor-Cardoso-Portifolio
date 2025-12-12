import React, { useState, useRef, useEffect } from 'react';
import { PROJECTS } from '../constants';
import ContentModal from './ui/ContentModal';
import { ProjectDetailContent } from './ProjectDetailContent';
import { Reveal } from './ui/Reveal';
import { ArchiveLine } from './ui/ArchiveLine';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionImg = motion.img as any;

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse Tracking for Image Reveal
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <section id="projects" className="relative bg-paper py-32 md:py-48 z-10 overflow-hidden cursor-default">
      
      {/* Floating Image Reveal (Desktop Only) */}
      {!isMobile && (
        <MotionDiv
          style={{ x, y, left: -200, top: -150 }} // Offset to center on cursor
          className="fixed pointer-events-none z-50 w-[400px] h-[300px] hidden lg:block mix-blend-normal"
        >
          <AnimatePresence mode="wait">
            {hoveredProject !== null && (
              <MotionDiv
                key={hoveredProject}
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                className="w-full h-full overflow-hidden rounded-lg shadow-2xl"
              >
                <img 
                  src={PROJECTS[hoveredProject].image}
                  alt="Project Preview"
                  className="w-full h-full object-cover"
                />
              </MotionDiv>
            )}
          </AnimatePresence>
        </MotionDiv>
      )}

      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        
        {/* Archive Header */}
        <div className="mb-24">
          <ArchiveLine index="01" label="SELECTED WORKS" className="mb-8" />
          <Reveal>
             <h2 className="text-6xl md:text-9xl font-serif font-medium text-petrol-base tracking-tighter leading-[0.85] mb-6">
               Arquivo <br/> <span className="text-petrol-base/30 italic">de Obras</span>
             </h2>
          </Reveal>
        </div>

        {/* --- EDITORIAL LIST LAYOUT --- */}
        <div className="flex flex-col">
          {PROJECTS.map((project, index) => (
             <Reveal key={index} width="100%" delay={index * 50}>
               <div 
                 className="group relative border-t border-[#0B232E]/10 py-12 md:py-16 transition-colors duration-500 hover:bg-white/40 -mx-6 px-6 md:mx-0 md:px-0 cursor-pointer"
                 onMouseEnter={() => setHoveredProject(index)}
                 onMouseLeave={() => setHoveredProject(null)}
                 onClick={() => setSelectedProject(project)}
               >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 md:gap-12">
                      
                      {/* Left: Index & Title */}
                      <div className="flex items-baseline gap-8 md:w-1/2">
                          <span className="font-mono text-[10px] text-petrol-base/40 uppercase tracking-widest">
                             {(index + 1).toString().padStart(2, '0')}
                          </span>
                          <h3 className="text-3xl md:text-6xl font-serif font-medium text-petrol-base group-hover:translate-x-4 transition-transform duration-500 ease-out">
                             {project.title}
                          </h3>
                      </div>

                      {/* Right: Meta Data */}
                      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 md:w-1/2 justify-end opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="hidden md:block">
                             <span className="font-mono text-[10px] uppercase tracking-widest block text-petrol-base/40 mb-1">Serviço</span>
                             <span className="text-sm font-light text-petrol-base">{project.category}</span>
                          </div>
                          
                          <div className="hidden md:block">
                             <span className="font-mono text-[10px] uppercase tracking-widest block text-petrol-base/40 mb-1">Ano</span>
                             <span className="text-sm font-light text-petrol-base">{project.year}</span>
                          </div>

                          <div className="w-10 h-10 rounded-full border border-petrol-base/10 flex items-center justify-center text-petrol-base group-hover:bg-petrol-base group-hover:text-white transition-all duration-300">
                              <ArrowUpRight size={18} />
                          </div>
                      </div>
                  </div>

                  {/* Mobile Image Fallback (Visible only on small screens) */}
                  <div className="block lg:hidden mt-8 w-full aspect-video overflow-hidden rounded-lg">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
               </div>
             </Reveal>
          ))}
          <div className="w-full h-px bg-[#0B232E]/10"></div>
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