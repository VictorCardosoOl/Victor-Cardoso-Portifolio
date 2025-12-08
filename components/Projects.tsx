
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PROJECTS, ARCHIVE_PROJECTS } from '../constants';
import { ArrowUpRight, ArrowRight, X, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';
import { useLenis } from './ScrollContext';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Tilt from './ui/Tilt';

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
  const detailsRef = useRef<HTMLDivElement>(null); 
  
  // Parallax Effect for the image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]); // Reduced for subtlety
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1, 1.02]);

  // Efeito para rolar até os detalhes quando expandido (Otimizado para Mobile e Desktop)
  useEffect(() => {
    if (isExpanded && detailsRef.current) {
      // Pequeno delay para permitir que o DOM calcule a altura correta durante a animação
      setTimeout(() => {
        const yOffset = -100; // Margem para a navbar fixa
        const element = detailsRef.current!;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 300);
    }
  }, [isExpanded]);

  return (
    <div ref={containerRef} className="group py-12 md:py-24 border-b border-slate-200/60 last:border-0 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-start">
        
        {/* Right Column: Image (First on Mobile for Visual Flow) */}
        <div className="lg:col-span-7 relative order-1 lg:order-2">
            {/* Tilt Wrapper - Ajustado para ser sutil e elegante */}
            <Tilt strength={4} perspective={1200} className="w-full h-full transform-gpu">
                <button
                  className="relative w-full aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-2xl md:rounded-[2rem] cursor-zoom-in shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] transition-shadow duration-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 group/img bg-slate-100"
                  onClick={openLightbox}
                  aria-label={`Ver galeria do projeto ${project.title}`}
                  type="button"
                >
                  <motion.div style={{ y, scale }} className="w-full h-full">
                      {/* Overlay Cinematográfico */}
                      <div className="absolute inset-0 bg-slate-900/0 group-hover/img:bg-slate-900/5 transition-colors duration-700 z-10"></div>
                      
                      <img 
                          src={project.image} 
                          alt="" 
                          className="w-full h-full object-cover transition-transform duration-[800ms] ease-out-expo group-hover/img:scale-105"
                      />
                  </motion.div>

                  {/* Mobile Tap Hint */}
                  <div className="absolute bottom-4 right-4 bg-white/80 text-slate-900 text-[10px] uppercase font-bold px-3 py-1.5 rounded-full backdrop-blur-md lg:hidden z-20 shadow-lg pointer-events-none">
                      Ampliar
                  </div>

                  {/* Desktop Hover Indicator */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none hidden lg:flex">
                      <div className="w-20 h-20 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl transform scale-90 group-hover/img:scale-100 transition-transform duration-500">
                          <Plus size={24} className="text-slate-900" strokeWidth={1.5} />
                      </div>
                  </div>
                </button>
            </Tilt>
        </div>

        {/* Left Column: Sticky Details */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col h-full justify-between order-2 lg:order-1">
          <Reveal width="100%">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-bold font-sans text-slate-400">0{index + 1}</span>
              <div className="h-px w-8 bg-slate-200"></div>
              <span className="text-xs font-bold font-sans uppercase tracking-widest text-slate-500">{project.category}</span>
            </div>

            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-slate-900 mb-6 leading-[1.05] tracking-tight">
              {project.title}
            </h3>

            <p className="text-slate-600 font-light leading-relaxed max-w-sm mb-8 text-base">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons - Optimized for Mobile Block / Desktop Inline */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
               <button 
                 onClick={toggleCaseStudy}
                 className={`flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 py-4 px-6 rounded-xl border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 w-full sm:w-auto
                    ${isExpanded 
                        ? 'bg-slate-100 text-slate-900 border-slate-200' 
                        : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800 hover:-translate-y-0.5 shadow-lg shadow-slate-900/10'
                    }`}
                 aria-expanded={isExpanded}
               >
                 {isExpanded ? 'Fechar Detalhes' : 'Ler Case Study'}
                 {isExpanded ? <Minus size={14} /> : <Plus size={14} />}
               </button>
               
               <a 
                 href={project.link} 
                 className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-300 py-4 px-6 rounded-xl border border-slate-200 hover:border-slate-300 w-full sm:w-auto"
               >
                 Visitar Site <ArrowUpRight size={14} />
               </a>
            </div>
          </Reveal>

           {/* Expandable Case Study Content - Ultra fluido */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  ref={detailsRef}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Curva customizada "Luxury"
                  className="overflow-hidden"
                >
                  <div className="pt-8 w-full">
                     <div className="bg-slate-50/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-slate-200/60 shadow-inner">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                            <h4 className="font-serif text-xl text-slate-900 italic">Bastidores do Projeto</h4>
                        </div>
                        
                        <div className="space-y-6">
                           <div>
                              <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">O Desafio</span>
                              <p className="text-slate-700 font-light leading-relaxed text-sm">{project.caseStudy?.challenge}</p>
                           </div>
                           <div>
                              <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">A Solução</span>
                              <p className="text-slate-700 font-light leading-relaxed text-sm">{project.caseStudy?.solution}</p>
                           </div>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-slate-200">
                           <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Resultado & Impacto</span>
                           <span className="font-serif text-lg md:text-xl text-slate-900 leading-tight">{project.caseStudy?.result}</span>
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
  
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // --- Lightbox Logic ---
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
      
      {/* Intro Header */}
      <div className="container mx-auto px-6 md:px-12 xl:px-20 pt-32 pb-16">
        <Reveal width="100%">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-100 pb-12">
             <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-slate-900 leading-[0.9] tracking-tight">
               Projetos <br /> <span className="text-slate-300 italic">Selecionados</span>
             </h2>
             <div className="text-left md:text-right max-w-xs">
                <p className="text-sm font-light text-slate-500 leading-relaxed mb-4">
                  Uma coleção de soluções digitais focadas em performance, conversão e estética refinada.
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
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

      {/* Archive Section - Refined Glass Grid */}
      <div className="bg-slate-50 py-32 mt-20 border-t border-slate-200 relative overflow-hidden">
         {/* Background Grain/Noise for Texture */}
         <div className="absolute inset-0 opacity-[0.4] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
         
         <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
            <Reveal>
              <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6">
                 <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">O Laboratório</span>
                    <h3 className="text-4xl font-serif font-medium text-slate-900">Arquivo & Conceitos</h3>
                 </div>
                 <p className="text-slate-500 font-light text-sm max-w-sm text-right hidden md:block">
                   Experimentos de interface, ferramentas internas e projetos open source.
                 </p>
              </div>
            </Reveal>

            <div className="relative">
               {/* Hover Preview Image */}
               <motion.div 
                 className="fixed pointer-events-none z-40 hidden lg:block overflow-hidden rounded-lg shadow-2xl border-2 border-white"
                 style={{ 
                    top: "50%", left: "50%", x: "-50%", y: "-50%",
                    width: 300, height: 200,
                    opacity: hoveredArchiveId !== null ? 1 : 0,
                    scale: hoveredArchiveId !== null ? 1 : 0.9,
                    rotate: -2,
                 }}
                 transition={{ duration: 0.2 }}
               >
                  {hoveredArchiveId !== null && (
                    <img src={ARCHIVE_PROJECTS[hoveredArchiveId].image} className="w-full h-full object-cover" alt="Preview" />
                  )}
               </motion.div>

               {/* Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ARCHIVE_PROJECTS.map((project, idx) => (
                    <div 
                      key={idx}
                      className="group p-8 rounded-[2rem] bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col justify-between h-64 relative z-10"
                      onMouseEnter={() => setHoveredArchiveId(idx)}
                      onMouseLeave={() => setHoveredArchiveId(null)}
                    >
                       <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-slate-400 px-2 py-1 bg-slate-50 rounded-md">2023</span>
                          <ArrowUpRight size={16} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                       </div>
                       
                       <div>
                          <h4 className="text-xl font-serif font-medium text-slate-900 mb-2 group-hover:text-indigo-900 transition-colors">
                            {project.title}
                          </h4>
                          <p className="text-xs uppercase tracking-widest text-slate-500">{project.category}</p>
                       </div>
                       
                       <div className="pt-4 border-t border-slate-100 mt-4">
                         <span className="text-[10px] font-bold text-slate-400 font-mono group-hover:text-slate-900 transition-colors">
                           {project.tech}
                         </span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* --- Lightbox Modal (Simplified for brevity, same functional logic) --- */}
      <AnimatePresence>
        {lightboxProject && (
          <motion.div 
              ref={modalRef}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center" 
              onClick={closeLightbox}
          >
            <button 
                ref={closeBtnRef}
                onClick={closeLightbox} 
                className="absolute top-8 right-8 z-[110] p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all"
            > 
                <X size={24} /> 
            </button>

            <div className="w-full h-full p-4 md:p-12 flex items-center justify-center">
               <motion.div
                 initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                 className="relative max-w-[95vw] max-h-[90vh] shadow-2xl rounded-lg overflow-hidden"
                 onClick={(e) => e.stopPropagation()}
               >
                  <img 
                    src={lightboxProject.project.gallery[lightboxProject.index]} 
                    className="max-w-full max-h-[85vh] object-contain"
                  />
                  
                  {/* Floating Nav */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10">
                     <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="p-3 hover:bg-white hover:text-black rounded-full text-white transition-all"><ChevronLeft size={20} /></button>
                     <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="p-3 hover:bg-white hover:text-black rounded-full text-white transition-all"><ChevronRight size={20} /></button>
                  </div>
               </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
