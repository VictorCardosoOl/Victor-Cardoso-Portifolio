import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PROJECTS, ARCHIVE_PROJECTS } from '../constants';
import { ArrowUpRight, Plus, Minus, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { useLenis } from './ScrollContext';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import Tilt from './ui/Tilt';

// --- Individual Project Component ---

interface ProjectRowProps {
  project: typeof PROJECTS[0];
  index: number;
  openLightbox: () => void;
  toggleCaseStudy: () => void;
  isExpanded: boolean;
}

const ProjectRow: React.FC<ProjectRowProps> = ({ 
  project, 
  index, 
  openLightbox, 
  toggleCaseStudy, 
  isExpanded 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null); 
  
  // Image Reveal Logic (Curtain Effect)
  const isImageInView = useInView(imageRef, { once: true, margin: "-10%" });

  // Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]); 
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  useEffect(() => {
    if (isExpanded && detailsRef.current) {
      setTimeout(() => {
        const yOffset = -100;
        const element = detailsRef.current!;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 300);
    }
  }, [isExpanded]);

  return (
    <div ref={containerRef} className="group py-20 lg:py-32 border-b border-slate-200/60 last:border-0 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        
        {/* Right Column: Image with Reveal Mask */}
        <div className="lg:col-span-7 relative order-1 lg:order-2" ref={imageRef}>
            <Tilt strength={3} perspective={1200} className="w-full h-full transform-gpu">
                <button
                  className="relative w-full aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-lg md:rounded-2xl cursor-none shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] transition-shadow duration-700 focus:outline-none group/img bg-slate-100"
                  onClick={openLightbox}
                  type="button"
                >
                  {/* Curtain Reveal Mask */}
                  <motion.div 
                    initial={{ height: "100%" }}
                    animate={isImageInView ? { height: "0%" } : { height: "100%" }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute inset-0 bg-slate-200 z-30 pointer-events-none"
                  />

                  <motion.div style={{ y, scale }} className="w-full h-full">
                      <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-[1s] ease-out-expo group-hover/img:scale-105"
                      />
                  </motion.div>

                  {/* Custom Cursor Text Indicator */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="px-6 py-3 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-xl transform translate-y-4 group-hover/img:translate-y-0 transition-transform duration-500">
                          Ver Galeria
                      </div>
                  </div>
                </button>
            </Tilt>
        </div>

        {/* Left Column: Sticky Details */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col h-full justify-between order-2 lg:order-1">
          <Reveal width="100%" variant="translate">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-bold font-sans text-slate-400">0{index + 1}</span>
              <div className="h-px w-12 bg-slate-200"></div>
              <span className="text-xs font-bold font-sans uppercase tracking-[0.2em] text-slate-500">{project.category}</span>
            </div>

            <h3 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-slate-900 mb-8 leading-[1] tracking-tight">
              {project.title}
            </h3>

            <p className="text-slate-600 font-light leading-relaxed max-w-sm mb-10 text-base lg:text-lg">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-12">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
               <button 
                 onClick={toggleCaseStudy}
                 className={`flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 py-4 px-8 rounded-full border w-full sm:w-auto
                    ${isExpanded 
                        ? 'bg-slate-100 text-slate-900 border-slate-200' 
                        : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                    }`}
               >
                 {isExpanded ? 'Fechar' : 'Ler Case Study'}
                 {isExpanded ? <Minus size={12} /> : <Plus size={12} />}
               </button>
               
               <a 
                 href={project.link} 
                 className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900 transition-all duration-300 py-4 px-8 rounded-full border border-slate-200 hover:border-slate-900 w-full sm:w-auto"
               >
                 Visitar Site <ArrowUpRight size={12} />
               </a>
            </div>
          </Reveal>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  ref={detailsRef}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-10 w-full">
                     <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="space-y-8">
                           <div>
                              <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">O Desafio</span>
                              <p className="text-slate-700 font-light leading-relaxed text-sm">{project.caseStudy?.challenge}</p>
                           </div>
                           <div>
                              <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">A Solução</span>
                              <p className="text-slate-700 font-light leading-relaxed text-sm">{project.caseStudy?.solution}</p>
                           </div>
                        </div>
                        
                        <div className="mt-8 pt-8 border-t border-slate-200">
                           <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Resultado</span>
                           <span className="font-serif text-2xl text-slate-900 leading-tight block">{project.caseStudy?.result}</span>
                        </div>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

const Projects: React.FC = () => {
  const [lightboxProject, setLightboxProject] = useState<{ project: typeof PROJECTS[0], index: number } | null>(null);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  
  const lenis = useLenis();

  // Lightbox Handlers
  const openLightbox = useCallback((project: typeof PROJECTS[0], index: number = 0) => {
    lenis?.stop();
    setLightboxProject({ project, index });
  }, [lenis]);

  const closeLightbox = useCallback(() => {
    setLightboxProject(null);
    lenis?.start();
  }, [lenis]);

  const nextImage = useCallback(() => {
    if (!lightboxProject) return;
    const nextIndex = (lightboxProject.index + 1) % lightboxProject.project.gallery.length;
    setLightboxProject({ ...lightboxProject, index: nextIndex });
  }, [lightboxProject]);

  const prevImage = useCallback(() => {
    if (!lightboxProject) return;
    const prevIndex = (lightboxProject.index - 1 + lightboxProject.project.gallery.length) % lightboxProject.project.gallery.length;
    setLightboxProject({ ...lightboxProject, index: prevIndex });
  }, [lightboxProject]);

  useEffect(() => {
    if (!lightboxProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxProject, nextImage, prevImage, closeLightbox]);

  return (
    <section id="projects" className="relative z-20 bg-white">
      
      <div className="container mx-auto px-6 md:px-12 xl:px-20 pt-32 pb-16">
        <Reveal width="100%">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 border-b border-slate-100 pb-16">
             <h2 className="text-5xl md:text-7xl lg:text-9xl font-serif font-medium text-slate-900 leading-[0.85] tracking-tight">
               Projetos <br /> <span className="text-slate-300 italic">Recentes</span>
             </h2>
             <div className="text-left md:text-right max-w-xs pb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">
                  Curadoria 2023 — 2024
                </p>
                <p className="text-sm font-light text-slate-500 leading-relaxed">
                  Soluções digitais focadas em performance, conversão e estética refinada.
                </p>
             </div>
          </div>
        </Reveal>
      </div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20">
         {PROJECTS.map((project, index) => (
            <ProjectRow 
               key={project.title}
               project={project}
               index={index}
               openLightbox={() => openLightbox(project, 0)}
               toggleCaseStudy={() => setExpandedProjectId(prev => prev === project.title ? null : project.title)}
               isExpanded={expandedProjectId === project.title}
            />
         ))}
      </div>

      {/* Lightbox - Simplified Markup for xml brevity */}
      <AnimatePresence>
        {lightboxProject && (
          <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-white flex items-center justify-center cursor-auto" 
          >
             <button onClick={closeLightbox} className="absolute top-8 right-8 z-[110] p-4 text-slate-900 hover:opacity-50 transition-opacity"><X size={32} /></button>
             <div className="w-full h-full p-4 md:p-12 flex items-center justify-center">
                  <motion.img 
                    key={lightboxProject.index}
                    initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
                    src={lightboxProject.project.gallery[lightboxProject.index]} 
                    className="max-w-full max-h-[85vh] object-contain shadow-2xl"
                  />
             </div>
             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-8">
                 <button onClick={prevImage} className="text-slate-900 hover:opacity-50"><ChevronLeft size={32} /></button>
                 <button onClick={nextImage} className="text-slate-900 hover:opacity-50"><ChevronRight size={32} /></button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;