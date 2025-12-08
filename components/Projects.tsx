import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PROJECTS, ARCHIVE_PROJECTS } from '../constants';
import { ArrowUpRight, ArrowRight, X, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';
import { useLenis } from './ScrollContext';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import Magnetic from './ui/Magnetic';

// --- Utility Components ---

const Separator = () => (
  <div className="w-full h-px bg-slate-200/60 my-8" />
);

// --- Individual Project Component (The "Editorial" Row) ---

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
  
  // Parallax Effect for the image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <div ref={containerRef} className="group py-16 md:py-32 border-b border-slate-200 last:border-0 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-start">
        
        {/* Left Column: Sticky Details */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col h-full justify-between order-2 lg:order-1">
          <Reveal width="100%">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="text-[10px] font-bold font-sans text-slate-400">0{index + 1}</span>
              <div className="h-px w-8 bg-slate-300"></div>
              <span className="text-[10px] font-bold font-sans uppercase tracking-widest text-slate-500">{project.category}</span>
            </div>

            {/* Massive Typography for Project Title */}
            <h3 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-medium text-slate-900 mb-8 md:mb-12 leading-[0.9] -ml-1 tracking-tighter">
              {project.title}
            </h3>

            <p className="text-slate-500 font-light leading-relaxed max-w-sm mb-10 text-base md:text-lg">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-10 md:mb-12">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-4 py-1.5 border border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
               <button 
                 onClick={toggleCaseStudy}
                 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-900 hover:text-slate-600 transition-colors group/btn py-2 md:py-0"
               >
                 {isExpanded ? <Minus size={14} /> : <Plus size={14} />}
                 {isExpanded ? 'Fechar Detalhes' : 'Ler Case Study'}
               </button>
               
               <a href={project.link} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors py-2 md:py-0">
                 Ver Projeto Real <ArrowUpRight size={14} />
               </a>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Image & Case Study */}
        <div className="lg:col-span-7 relative order-1 lg:order-2">
            {/* Main Image Container */}
            <div 
              className="relative w-full aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-[2rem] md:rounded-sm cursor-pointer lg:cursor-none shadow-2xl md:shadow-none bg-slate-100"
              onClick={openLightbox}
            >
               <motion.div style={{ y, scale }} className="w-full h-full">
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-700 z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out grayscale-[10%] group-hover:grayscale-0"
                  />
               </motion.div>

               {/* Mobile Tap Hint */}
               <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md text-white border border-white/20 text-[10px] uppercase font-bold px-4 py-2 rounded-full lg:hidden z-20">
                 Toque para ampliar
               </div>

               {/* Custom Cursor Text Indicator (Desktop Only) */}
               <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none hidden lg:flex">
                  <div className="w-32 h-32 bg-white/80 backdrop-blur-xl rounded-full flex items-center justify-center">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-900">Expandir</span>
                  </div>
               </div>
            </div>

            {/* Expandable Case Study Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-8 md:pt-12 pl-0 lg:pl-12">
                     <div className="glass-panel p-6 md:p-12 rounded-[2rem]">
                        <h4 className="font-serif text-3xl text-slate-900 mb-8 italic">O Processo</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                           <div>
                              <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Desafio</span>
                              <p className="text-slate-700 font-light leading-relaxed text-sm md:text-base">{project.caseStudy?.challenge}</p>
                           </div>
                           <div>
                              <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Solução</span>
                              <p className="text-slate-700 font-light leading-relaxed text-sm md:text-base">{project.caseStudy?.solution}</p>
                           </div>
                        </div>
                        
                        <div className="pt-6 border-t border-slate-200/50 flex justify-between items-center">
                           <div>
                              <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Impacto</span>
                              <span className="font-serif text-2xl md:text-3xl text-slate-900">{project.caseStudy?.result}</span>
                           </div>
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


// --- Main Projects Section ---

const Projects: React.FC = () => {
  const [lightboxProject, setLightboxProject] = useState<{ project: typeof PROJECTS[0], index: number } | null>(null);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [hoveredArchiveId, setHoveredArchiveId] = useState<number | null>(null);
  
  const lenis = useLenis();
  const lastScrollTime = useRef(0);

  // --- Lightbox Logic (Optimized) ---
  const openLightbox = useCallback((project: typeof PROJECTS[0], index: number = 0) => {
    lenis?.stop();
    setLightboxProject({ project, index });
    document.body.style.overflow = 'hidden';
  }, [lenis]);

  const closeLightbox = useCallback(() => {
    setLightboxProject(null);
    document.body.style.overflow = '';
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

  // Keyboard & Wheel for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxProject) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    
    const handleWheel = (e: WheelEvent) => {
      if (!lightboxProject) return;
      const now = Date.now();
      if (now - lastScrollTime.current > 150) {
        if (e.deltaY > 0) nextImage();
        else if (e.deltaY < 0) prevImage();
        lastScrollTime.current = now;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (lightboxProject) window.addEventListener('wheel', handleWheel);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [lightboxProject, nextImage, prevImage, closeLightbox]);


  return (
    <section id="projects" className="relative z-20 bg-white">
      
      {/* Intro Header */}
      <div className="container mx-auto px-6 md:px-12 xl:px-20 pt-40 pb-16">
        <Reveal width="100%">
          <div className="border-b border-slate-900 pb-12 flex flex-col md:flex-row justify-between items-end">
             <h2 className="text-7xl md:text-9xl font-serif font-medium text-slate-900 leading-[0.85] tracking-tighter">
               Projetos <br /> <span className="text-slate-300 italic">Selecionados</span>
             </h2>
             <div className="mb-2 md:mb-4 text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Curadoria 2023 — 2024
                </p>
             </div>
          </div>
        </Reveal>
      </div>

      {/* Main Projects List */}
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

      {/* Archive Section (Table Style) */}
      <div className="bg-slate-50 py-32 mt-20 border-t border-slate-200">
         <div className="container mx-auto px-6 md:px-12 xl:px-20">
            <Reveal>
              <div className="mb-16 flex justify-between items-end">
                <div>
                   <h3 className="text-5xl font-serif font-medium text-slate-900 mb-4">Arquivo</h3>
                   <p className="text-slate-500 font-light">Experimentos, ferramentas internas e conceitos.</p>
                </div>
                <ArrowRight className="text-slate-300 w-16 h-16" strokeWidth={0.5} />
              </div>
            </Reveal>

            <div className="relative">
               {/* Hover Preview Image */}
               <motion.div 
                 className="fixed pointer-events-none z-30 hidden lg:block overflow-hidden rounded-lg shadow-2xl"
                 style={{ 
                    top: "50%", 
                    left: "50%", 
                    x: "-50%", 
                    y: "-50%",
                    width: 400,
                    height: 280,
                    opacity: hoveredArchiveId !== null ? 1 : 0,
                    scale: hoveredArchiveId !== null ? 1 : 0.8,
                    rotate: hoveredArchiveId !== null ? -5 : 0,
                 }}
                 transition={{ duration: 0.4, type: "spring" }}
               >
                  {hoveredArchiveId !== null && (
                    <img 
                      src={ARCHIVE_PROJECTS[hoveredArchiveId].image} 
                      className="w-full h-full object-cover" 
                      alt="Preview" 
                    />
                  )}
               </motion.div>

               {/* Table Header */}
               <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-slate-300 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <div className="col-span-1">Ano</div>
                  <div className="col-span-5">Projeto</div>
                  <div className="col-span-3">Categoria</div>
                  <div className="col-span-3 text-right">Tech</div>
               </div>

               {/* Table Rows */}
               <div className="divide-y divide-slate-200">
                  {ARCHIVE_PROJECTS.map((project, idx) => (
                    <div 
                      key={idx}
                      className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-8 items-center cursor-pointer transition-colors hover:bg-white relative z-10"
                      onMouseEnter={() => setHoveredArchiveId(idx)}
                      onMouseLeave={() => setHoveredArchiveId(null)}
                    >
                       <div className="hidden md:block col-span-1 text-xs font-mono text-slate-400">2023</div>
                       
                       {/* Mobile View Structure */}
                       <div className="col-span-1 md:col-span-5 flex flex-col md:block">
                           <span className="md:hidden text-[10px] text-slate-400 font-mono mb-1">2023</span>
                           <span className="text-xl md:text-2xl font-serif font-medium text-slate-900 group-hover:translate-x-0 md:group-hover:translate-x-2 transition-transform duration-300">
                             {project.title}
                           </span>
                       </div>

                       <div className="col-span-1 md:col-span-3 text-[10px] uppercase tracking-wide text-slate-500">{project.category}</div>
                       <div className="col-span-1 md:col-span-3 md:text-right text-[10px] font-mono text-slate-400 group-hover:text-slate-900 transition-colors">
                         {project.tech}
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* --- Lightbox Modal (Refined) --- */}
      <AnimatePresence>
        {lightboxProject && (
          <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex items-center justify-center" 
              onClick={closeLightbox}
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start z-[110] pointer-events-none">
              <div className="text-white pointer-events-auto">
                 <h3 className="text-3xl font-serif mb-2">{lightboxProject.project.title}</h3>
                 <div className="flex gap-4 text-[10px] uppercase tracking-widest text-slate-400">
                    <span>{lightboxProject.index + 1} / {lightboxProject.project.gallery.length}</span>
                    <span className="hidden md:inline">Scroll or Key to Navigate</span>
                 </div>
              </div>
              <button 
                onClick={closeLightbox} 
                className="group pointer-events-auto w-14 h-14 flex items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black text-white transition-all"
              > 
                <X size={28} /> 
              </button>
            </div>
            
            {/* Image Container */}
            <div className="w-full h-full flex items-center justify-center p-4 md:p-12">
               <motion.div
                 key={lightboxProject.index}
                 initial={{ opacity: 0, scale: 1.1 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                 className="relative max-w-[90vw] max-h-[85vh] overflow-hidden shadow-2xl rounded-sm"
                 onClick={(e) => e.stopPropagation()}
               >
                  <img 
                    src={lightboxProject.project.gallery[lightboxProject.index]} 
                    alt="Project Detail"
                    className="w-full h-full object-contain"
                  />
               </motion.div>
            </div>

            {/* Navigation Arrows (Floating) */}
            <div className="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="pointer-events-auto p-2 md:p-4 text-white/50 hover:text-white hover:scale-110 transition-all">
                   <ChevronLeft size={40} md:size={56} strokeWidth={0.5} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="pointer-events-auto p-2 md:p-4 text-white/50 hover:text-white hover:scale-110 transition-all">
                   <ChevronRight size={40} md:size={56} strokeWidth={0.5} />
                </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;