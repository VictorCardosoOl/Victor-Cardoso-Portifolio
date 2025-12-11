
import React, { useRef, useState } from 'react';
import { PROJECTS } from '../constants';
import { ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Reveal } from './ui/Reveal';
import clsx from 'clsx';
import ContentModal from './ui/ContentModal';
import { ProjectDetailContent } from './ProjectDetailContent';

interface ProjectCardProps {
  project: typeof PROJECTS[0];
  index: number;
  onClick: () => void;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Hover Effect - subtle scaling
  return (
    <div className={clsx("group w-full relative mb-32 md:mb-56", className)}>
      <Reveal width="100%" duration={1}>
        <div 
          ref={ref}
          onClick={onClick}
          className="relative cursor-pointer"
        >
          {/* Number Index */}
          <div className="hidden md:block absolute -left-12 top-0 text-[10px] font-bold text-charcoal/30 overflow-hidden">
             <span className="block transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
               {(index + 1).toString().padStart(2, '0')}
             </span>
          </div>

          <div className="overflow-hidden">
             <img 
               src={project.image} 
               alt={project.title}
               className="w-full h-auto object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 ease-out transform group-hover:scale-105" 
             />
          </div>

          {/* Minimal Caption */}
          <div className="flex justify-between items-start mt-4 border-t border-charcoal/10 pt-4">
             <div>
                <h3 className="text-2xl md:text-4xl font-serif text-charcoal group-hover:italic transition-all">
                  {project.title}
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-charcoal/50 mt-1 block">
                   {project.category}
                </span>
             </div>
             <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-4 group-hover:translate-x-0">
                <ArrowRight className="text-charcoal" />
             </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  // Asymmetrical Layout Logic
  // 0: Left Small
  // 1: Right Huge
  // 2: Center Medium
  const getLayoutClasses = (index: number) => {
    const pos = index % 3;
    if (pos === 0) return "md:w-[50%] md:mr-auto md:ml-12"; 
    if (pos === 1) return "md:w-[85%] md:ml-auto md:-mr-12 z-10"; 
    return "md:w-[60%] md:mx-auto"; 
  };

  return (
    <section id="projects" className="relative bg-paper text-charcoal py-40 md:py-64 z-10 overflow-hidden">
      
      <div className="container mx-auto px-5 sm:px-6 md:px-12 xl:px-20 relative z-10">
        
        {/* Header Area with breathing room */}
        <div className="mb-40 md:mb-60 max-w-xl">
           <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40 mb-4 block">
                 Obras Selecionadas
              </span>
           </Reveal>
           <Reveal delay={100}>
              <h2 className="text-6xl md:text-8xl font-serif text-charcoal leading-[0.9]">
                 Estudos de <br/> <span className="italic text-charcoal/50">Caso</span>
              </h2>
           </Reveal>
        </div>

        {/* The Grid */}
        <div className="flex flex-col w-full">
          {PROJECTS.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index} 
              onClick={() => setSelectedProject(project)} 
              className={getLayoutClasses(index)}
            />
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-32 md:mt-60 flex justify-center">
            <Reveal>
               <a href="#contact" className="group flex flex-col items-center gap-4">
                  <div className="w-[1px] h-20 bg-charcoal/20 group-hover:h-32 transition-all duration-500"></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-charcoal group-hover:text-charcoal/60">
                     Iniciar Projeto
                  </span>
               </a>
            </Reveal>
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
