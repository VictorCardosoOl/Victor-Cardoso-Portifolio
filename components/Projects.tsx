
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PROJECTS, ARCHIVE_PROJECTS } from '../constants';
import { ArrowUpRight, ArrowRight, X, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';
import { useLenis } from './ScrollContext';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

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
  const detailsRef = useRef<HTMLDivElement>(null); // Referência para a seção de detalhes
  
  // Parallax Effect for the image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  // Efeito para rolar até os detalhes quando expandido (Otimizado para Mobile)
  useEffect(() => {
    if (isExpanded) {
      // Pequeno delay para permitir que o DOM renderize a altura correta
      const timer = setTimeout(() => {
        if (detailsRef.current) {
          const isMobile = window.innerWidth < 768;
          
          detailsRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            // No mobile, alinhar ao topo para leitura. No desktop, centro para foco visual.
            block: isMobile ? 'start' : 'center' 
          });
        }
      }, 300); 
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  return (
    <div ref={containerRef} className="group py-12 md:py-20 lg:py-32 border-b border-slate-200 last:border-0 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-start">
        
        {/* Right Column: Image (First on Mobile for Visual Flow) */}
        <div className="lg:col-span-7 relative order-1 lg:order-2">
            {/* Main Image Container - Agora acessível */}
            <button
              className="relative w-full aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-2xl md:rounded-sm cursor-zoom-in shadow-lg md:shadow-none group focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900 focus-visible:ring-offset-4 touch-manipulation"
              onClick={openLightbox}
              aria-label={`Ver galeria do projeto ${project.title}`}
              type="button"
            >
               <motion.div style={{ y, scale }} className="w-full h-full">
                  {/* Overlay mais sofisticado para hover */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-500 z-10"></div>
                  
                  <img 
                    src={project.image} 
                    alt="" 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out"
                  />
               </motion.div>

               {/* Mobile Tap Hint - Melhor legibilidade */}
               <div className="absolute bottom-4 right-4 bg-white/90 text-slate-900 text-[10px] uppercase font-bold px-4 py-2 rounded-full backdrop-blur-md lg:hidden z-20 shadow-lg pointer-events-none">
                 Toque para ampliar
               </div>

               {/* Custom Cursor Text Indicator (Desktop Only) */}
               <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden lg:flex">
                  <div className="w-24 h-24 bg-white/95 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-900">Expandir</span>
                  </div>
               </div>
            </button>
        </div>

        {/* Left Column: Sticky Details */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col h-full justify-between order-2 lg:order-1">
          <Reveal width="100%">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <span className="text-xs font-bold font-sans text-slate-400">0{index + 1}</span>
              <div className="h-px w-12 bg-slate-300"></div>
              <span className="text-xs font-bold font-sans uppercase tracking-widest text-slate-500">{project.category}</span>
            </div>

            <h3 className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium text-slate-900 mb-6 md:mb-8 leading-[1]">
              {project.title}
            </h3>

            <p className="text-slate-500 font-light leading-relaxed max-w-sm mb-8 text-base md:text-lg">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 border border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons - Stacked full width on Mobile */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
               <button 
                 onClick={toggleCaseStudy}
                 className={`flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 group/btn py-3 px-4 sm:px-0 rounded-lg sm:rounded-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900
                    ${isExpanded 
                        ? 'bg-slate-100 text-slate-900 sm:bg-transparent' 
                        : 'bg-slate-900 text-white sm:bg-transparent sm:text-slate-900 hover:text-slate-600'
                    }`}
                 aria-expanded={isExpanded}
               >
                 {isExpanded ? <Minus size={16} /> : <Plus size={16} />}
                 {isExpanded ? 'Fechar Detalhes' : 'Ler Case Study'}
               </button>
               
               <a href={project.link} className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors py-3 px-4 sm:px-0 border border-slate-200 sm:border-0 rounded-lg sm:rounded-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900">
                 Ver Projeto Real <ArrowUpRight size={16} />
               </a>
            </div>
          </Reveal>

           {/* Expandable Case Study Content - Moved inside left column for mobile logic but visually distinct */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  ref={detailsRef} // Attach ref for scrollIntoView
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden scroll-mt-24" // scroll-mt prevents navbar overlap
                >
                  <div className="pt-6 md:pt-12 pl-0 lg:pl-0 w-full">
                     <div className="bg-slate-50 p-6 md:p-10 border-t-2 md:border-t-0 md:border-l-2 border-slate-900 rounded-2xl md:rounded-none md:rounded-r-2xl shadow-inner md:shadow-none">
                        <h4 className="font-serif text-2xl text-slate-900 mb-6 italic">O Processo</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                           <div>
                              <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Desafio</span>
                              <p className="text-slate-700 font-light leading-relaxed text-sm md:text-base">{project.caseStudy?.challenge}</p>
                           </div>
                           <div>
                              <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Solução</span>
                              <p className="text-slate-700 font-light leading-relaxed text-sm md:text-base">{project.caseStudy?.solution}</p>
                           </div>
                        </div>
                        
                        <div className="pt-6 border-t border-slate-200 flex justify-between items-center">
                           <div>
                              <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Impacto</span>
                              <span className="font-serif text-xl text-slate-900">{project.caseStudy?.result}</span>
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
  
  // Refs for accessibility focus management
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // --- Lightbox Logic (Optimized) ---
  const openLightbox = useCallback((project: typeof PROJECTS[0], index: number = 0) => {
    // Capture the element that triggered the modal to restore focus later
    if (document.activeElement instanceof HTMLElement) {
      lastFocusedElement.current = document.activeElement;
    }
    
    lenis?.stop();
    setLightboxProject({ project, index });
    document.body.style.overflow = 'hidden';
  }, [lenis]);

  const closeLightbox = useCallback(() => {
    setLightboxProject(null);
    document.body.style.overflow = '';
    lenis?.start();
    
    // Restore focus to the trigger element after close
    setTimeout(() => {
      lastFocusedElement.current?.focus();
    }, 100);
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

  // Focus trap logic: Focus the close button when lightbox opens
  useEffect(() => {
    if (lightboxProject) {
      const timer = setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [lightboxProject]);

  // Keyboard Navigation & Focus Trap
  useEffect(() => {
    if (!lightboxProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      }
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      
      // Robust Focus Trap
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll('button');
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
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
    window.addEventListener('wheel', handleWheel);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [lightboxProject, nextImage, prevImage, closeLightbox]);


  return (
    <section id="projects" className="relative z-20 bg-white">
      
      {/* Intro Header */}
      <div className="container mx-auto px-6 md:px-12 xl:px-20 pt-32 pb-16">
        <Reveal width="100%">
          <div className="border-b border-slate-900 pb-8 flex flex-col md:flex-row justify-between items-end">
             <h2 className="text-6xl md:text-8xl font-serif font-medium text-slate-900 leading-none tracking-tight">
               Projetos <br /> <span className="text-slate-300 italic">Selecionados</span>
             </h2>
             <div className="mb-2 md:mb-4 text-right">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
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

      {/* Archive Section (Updated to Cards) */}
      <div className="bg-slate-50 py-32 mt-20 border-t border-slate-200">
         <div className="container mx-auto px-6 md:px-12 xl:px-20">
            <Reveal>
              <div className="mb-16 flex flex-col items-center text-center">
                 <h3 className="text-4xl font-serif font-medium text-slate-900 mb-4">Arquivo</h3>
                 <p className="text-slate-500 font-light max-w-lg">Experimentos, ferramentas internas e conceitos exploratórios.</p>
              </div>
            </Reveal>

            <div className="relative">
               {/* Hover Preview Image (Now Straight) */}
               <motion.div 
                 className="fixed pointer-events-none z-30 hidden lg:block overflow-hidden rounded-xl shadow-2xl border-4 border-white"
                 style={{ 
                    top: "50%", 
                    left: "50%", 
                    x: "-50%", 
                    y: "-50%",
                    width: 320,
                    height: 240,
                    opacity: hoveredArchiveId !== null ? 1 : 0,
                    scale: hoveredArchiveId !== null ? 1 : 0.8,
                    rotate: 0, // Straightened as requested
                 }}
                 transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
               >
                  {hoveredArchiveId !== null && (
                    <img 
                      src={ARCHIVE_PROJECTS[hoveredArchiveId].image} 
                      className="w-full h-full object-cover" 
                      alt="Preview" 
                    />
                  )}
               </motion.div>

               {/* Grid of Archive Cards */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ARCHIVE_PROJECTS.map((project, idx) => (
                    <div 
                      key={idx}
                      className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col items-center text-center relative z-10"
                      onMouseEnter={() => setHoveredArchiveId(idx)}
                      onMouseLeave={() => setHoveredArchiveId(null)}
                    >
                       <span className="text-[10px] font-mono text-slate-400 mb-4 px-2 py-1 bg-slate-50 rounded-full">2023</span>
                       
                       <h4 className="text-lg font-serif font-medium text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                         {project.title}
                       </h4>

                       <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">{project.category}</p>
                       
                       <div className="mt-auto text-[10px] font-bold text-slate-400 font-mono group-hover:text-slate-900 transition-colors">
                         {project.tech}
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* --- Lightbox Modal (Accessible) --- */}
      <AnimatePresence>
        {lightboxProject && (
          <motion.div 
              ref={modalRef}
              id="lightbox-modal"
              role="dialog"
              aria-modal="true"
              aria-label={`Galeria do projeto ${lightboxProject.project.title}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex items-center justify-center outline-none" 
              onClick={closeLightbox}
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start z-[110] pointer-events-none">
              <div className="text-white pointer-events-auto">
                 <h3 className="text-2xl font-serif mb-1">{lightboxProject.project.title}</h3>
                 <div className="flex gap-4 text-[10px] uppercase tracking-widest text-slate-400">
                    <span aria-live="polite">{lightboxProject.index + 1} / {lightboxProject.project.gallery.length}</span>
                    <span className="hidden md:inline">Use Setas ou Tab para Navegar</span>
                 </div>
              </div>
              <button 
                ref={closeBtnRef}
                onClick={closeLightbox} 
                className="group pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black text-white transition-all focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 outline-none"
                aria-label="Fechar galeria"
              > 
                <X size={24} /> 
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
                 className="relative max-w-[90vw] max-h-[85vh] overflow-hidden shadow-2xl"
                 onClick={(e) => e.stopPropagation()}
               >
                  <img 
                    src={lightboxProject.project.gallery[lightboxProject.index]} 
                    alt={`Imagem ${lightboxProject.index + 1} de ${lightboxProject.project.gallery.length}`}
                    className="w-full h-full object-contain"
                  />
               </motion.div>
            </div>

            {/* Navigation Arrows (Floating) */}
            <div className="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                <button 
                  ref={prevBtnRef}
                  onClick={(e) => { e.stopPropagation(); prevImage(); }} 
                  className="pointer-events-auto p-2 md:p-4 text-white/50 hover:text-white hover:scale-110 transition-all focus-visible:ring-2 focus-visible:ring-white rounded-full outline-none"
                  aria-label="Imagem anterior"
                >
                   <ChevronLeft size={32} className="md:w-12 md:h-12" strokeWidth={1} />
                </button>
                <button 
                  ref={nextBtnRef}
                  onClick={(e) => { e.stopPropagation(); nextImage(); }} 
                  className="pointer-events-auto p-2 md:p-4 text-white/50 hover:text-white hover:scale-110 transition-all focus-visible:ring-2 focus-visible:ring-white rounded-full outline-none"
                  aria-label="Próxima imagem"
                >
                   <ChevronRight size={32} className="md:w-12 md:h-12" strokeWidth={1} />
                </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
