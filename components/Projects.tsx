import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, RotateCcw, ChevronDown, Terminal, Check } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';
import { useLenis } from './ScrollContext';
import { motion, AnimatePresence } from 'framer-motion';

// Hook to handle Scroll Lock without Layout Shift
const useScrollLock = () => {
  const lock = useCallback(() => {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
  }, []);

  const unlock = useCallback(() => {
    document.body.style.paddingRight = '';
    document.body.style.overflow = '';
  }, []);

  return { lock, unlock };
};

// Lazy Image Component
const LazyImage: React.FC<{ src: string; alt: string; className?: string; onClick?: () => void }> = ({ src, alt, className, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`} onClick={onClick}>
      {/* Skeleton Loader */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse z-10" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

const Projects: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [visibleProjects, setVisibleProjects] = useState(PROJECTS);
  
  const [previewImages, setPreviewImages] = useState<{[key: number]: string}>({});
  const [lightboxProject, setLightboxProject] = useState<{ project: typeof PROJECTS[0], index: number } | null>(null);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const lastScrollTime = useRef(0);
  const { lock, unlock } = useScrollLock();
  const lenis = useLenis();
  
  // Extract unique tags for filter
  const uniqueTags = Array.from(new Set(PROJECTS.flatMap(p => p.tags))).sort();

  useEffect(() => {
    if (activeFilters.length === 0) {
      setVisibleProjects(PROJECTS);
    } else {
      setVisibleProjects(PROJECTS.filter(p => 
        p.tags.some(tag => activeFilters.includes(tag))
      ));
    }
  }, [activeFilters]);

  const toggleFilter = (tag: string) => {
    setActiveFilters(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const clearFilters = () => setActiveFilters([]);

  // --- Lightbox Logic ---

  const openLightbox = (project: typeof PROJECTS[0], index: number = 0) => {
    lenis?.stop(); // Pause Smooth Scroll
    setLightboxProject({ project, index });
    lock();
  };

  const closeLightbox = () => {
    setLightboxProject(null);
    unlock();
    lenis?.start(); // Resume Smooth Scroll
  };

  const nextImage = useCallback(() => {
    if (lightboxProject) {
      const nextIndex = (lightboxProject.index + 1) % lightboxProject.project.gallery.length;
      setLightboxProject({ ...lightboxProject, index: nextIndex });
    }
  }, [lightboxProject]);

  const prevImage = useCallback(() => {
    if (lightboxProject) {
      const prevIndex = (lightboxProject.index - 1 + lightboxProject.project.gallery.length) % lightboxProject.project.gallery.length;
      setLightboxProject({ ...lightboxProject, index: prevIndex });
    }
  }, [lightboxProject]);

  // Throttled Wheel Scroll for Lightbox
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (lightboxProject) {
        const now = Date.now();
        if (now - lastScrollTime.current > 800) {
          if (e.deltaY > 50) {
            nextImage();
            lastScrollTime.current = now;
          } else if (e.deltaY < -50) {
            prevImage();
            lastScrollTime.current = now;
          }
        }
      }
    };

    if (lightboxProject) {
      window.addEventListener('wheel', handleWheel);
    }
    return () => window.removeEventListener('wheel', handleWheel);
  }, [lightboxProject, nextImage, prevImage]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxProject) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxProject, nextImage, prevImage]);

  const toggleCaseStudy = (title: string) => {
    setExpandedProjectId(prev => prev === title ? null : title);
  }

  const handleThumbnailHover = (projectIndex: number, imgUrl: string) => {
    setPreviewImages(prev => ({...prev, [projectIndex]: imgUrl}));
  };

  return (
    <section id="projects" className="py-16 md:py-24 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header & Filter */}
        <div className="mb-16 flex flex-col items-center max-w-4xl mx-auto">
            <Reveal width="100%">
              <div className="text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block">Portfolio</span>
                <h2 className="text-3xl md:text-5xl font-serif font-medium mb-8 text-slate-900 tracking-tight">
                  Projetos Selecionados
                </h2>
              </div>
            </Reveal>
            
            <Reveal delay={100} width="100%">
              <div className="flex flex-col items-center gap-6">
                <div className="flex flex-wrap gap-2 justify-center">
                  {uniqueTags.map((tag) => {
                    const isActive = activeFilters.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleFilter(tag)}
                        className={`px-5 py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-full flex items-center gap-2 border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 focus:outline-none ${
                          isActive 
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md pl-4 pr-5' 
                            : 'bg-transparent text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900'
                        }`}
                        aria-pressed={isActive}
                      >
                        {isActive && (
                          <motion.span 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }} 
                            className="text-green-400"
                          >
                            <Check size={14} strokeWidth={3} />
                          </motion.span>
                        )}
                        {tag}
                      </button>
                    );
                  })}
                </div>
                
                {/* Clear Filters Button */}
                <div className={`overflow-hidden transition-all duration-300 ${activeFilters.length > 0 ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'}`}>
                   <button 
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors px-4 py-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 rounded-lg focus:outline-none"
                  >
                    <RotateCcw size={12} /> Limpar Filtros
                  </button>
                </div>
              </div>
            </Reveal>
        </div>

        {/* Projects Grid with Layout Animations */}
        <motion.div layout className="flex flex-col gap-16 lg:gap-20">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => {
              const isEven = index % 2 === 0;
              const isExpanded = expandedProjectId === project.title;
              const currentImage = previewImages[index] || project.image;

              return (
                <motion.div
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.95, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 50 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className={`group flex flex-col lg:flex-row items-start gap-8 lg:gap-16 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                    
                    {/* --- Visuals Section --- */}
                    <div className="w-full lg:w-[50%] perspective-1000 sticky top-24">
                      <div 
                        className="relative w-full aspect-[16/11] overflow-hidden cursor-pointer rounded-[2rem] 
                        shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] 
                        transition-all duration-700 ease-heavy
                        transform hover:-translate-y-1 bg-slate-50 border border-slate-100
                        group-hover:shadow-[0_20px_40px_-10px_rgba(99,102,241,0.15)]
                        focus-visible:ring-4 focus-visible:ring-slate-900/20 outline-none"
                        onClick={() => openLightbox(project, 0)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                           if(e.key === 'Enter') openLightbox(project, 0);
                        }}
                      >
                        {/* Black & White Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>

                        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                           <div className="bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 border border-white/50">
                              Expandir
                           </div>
                        </div>

                        <LazyImage 
                          src={currentImage} 
                          alt={project.title} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-heavy"
                        />
                      </div>
                      
                      {/* Thumbnails */}
                      <div className={`flex gap-3 mt-4 ${!isEven ? 'justify-end' : ''}`}>
                        {project.gallery.map((img, idx) => (
                            <button 
                                key={idx} 
                                className={`w-16 h-12 md:w-20 md:h-14 flex-shrink-0 cursor-pointer transition-all duration-300 rounded-xl overflow-hidden border focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 ${currentImage === img ? 'border-slate-900 opacity-100 ring-1 ring-slate-900/20' : 'border-transparent opacity-60 hover:opacity-100 hover:-translate-y-1'}`}
                                onMouseEnter={() => handleThumbnailHover(index, img)}
                                onClick={() => openLightbox(project, idx)}
                                aria-label={`View image ${idx + 1} of ${project.title}`}
                            >
                              <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="" />
                            </button>
                        ))}
                      </div>
                    </div>

                    {/* --- Content Section --- */}
                    <div className="w-full lg:w-[50%]">
                      <div className={`flex flex-col relative overflow-hidden
                        bg-white/5 backdrop-blur-md
                        p-8 md:p-10 rounded-[2.5rem] 
                        border border-white/10
                        shadow-sm
                        group-hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.05)]
                        group-hover:bg-gradient-to-br from-white/20 to-white/5
                        transition-all duration-700 ease-heavy
                        ${!isEven ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'} 
                      `}>
                          {/* Subtle Gradient Background for Card */}
                          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                          <span className="relative inline-block px-3 py-1 bg-slate-100/50 text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-4 rounded-full border border-slate-200/50">
                              {project.category}
                            </span>
                            
                            <h3 className="relative text-3xl md:text-4xl font-serif font-medium mb-4 text-slate-900 leading-[1.1] tracking-tight group-hover:text-slate-700 transition-colors duration-500">
                              {project.title}
                            </h3>
                            
                            <p className={`relative text-slate-600 leading-relaxed mb-6 text-sm md:text-base font-light max-w-md ${!isEven ? 'lg:ml-auto' : ''}`}>
                              {project.description}
                            </p>
                            
                            <div className={`relative flex flex-wrap gap-2 mb-8 ${!isEven ? 'lg:justify-end' : ''}`}>
                              {project.tags.map((tag, idx) => (
                                <span 
                                  key={idx} 
                                  className={`px-3 py-1 text-[9px] uppercase tracking-wider font-bold rounded-full border transition-all duration-300 ${
                                    activeFilters.includes(tag) 
                                      ? 'bg-slate-900 text-white border-slate-900' 
                                      : 'bg-white/30 text-slate-600 border-slate-200 hover:border-slate-900 hover:text-slate-900 hover:bg-white/50'
                                  }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="relative flex flex-wrap items-center gap-3 mb-6">
                              <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => toggleCaseStudy(project.title)}
                                className={`gap-2 bg-transparent hover:bg-white/40 border-slate-300 hover:border-slate-900 transition-all ${isExpanded ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800' : ''}`}
                              >
                                {isExpanded ? 'Fechar' : 'Ver Case'}
                                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                              </Button>
                              
                              <a href={project.link}>
                                <Button variant="primary" size="sm" className="gap-2 shadow-lg hover:shadow-slate-500/30 border border-transparent">
                                  Live Demo <ArrowUpRight className="w-3 h-3" />
                                </Button>
                              </a>
                            </div>

                            {/* --- Expanded Case Study --- */}
                            <motion.div 
                              initial={false}
                              animate={{ 
                                height: isExpanded ? "auto" : 0, 
                                opacity: isExpanded ? 1 : 0 
                              }}
                              transition={{ duration: 0.5, ease: "circOut" }}
                              className="w-full overflow-hidden"
                            >
                                <div className={`pt-8 border-t border-slate-200/50 space-y-8 ${!isEven ? 'text-right' : 'text-left'}`}>
                                    
                                    <div className={`flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest gap-2 ${!isEven ? 'justify-end' : ''}`}>
                                      <span>Projetos</span> <ChevronRight size={10} /> <span className="text-slate-600">{project.title}</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <div className="space-y-4">
                                         <div>
                                            <h4 className={`text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-2 flex items-center gap-2 ${!isEven ? 'justify-end' : ''}`}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Desafio
                                            </h4>
                                            <p className="text-xs text-slate-600 leading-relaxed font-light">{project.caseStudy?.challenge}</p>
                                         </div>
                                         <div>
                                            <h4 className={`text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-2 flex items-center gap-2 ${!isEven ? 'justify-end' : ''}`}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span> Solução
                                            </h4>
                                            <p className="text-xs text-slate-600 leading-relaxed font-light">{project.caseStudy?.solution}</p>
                                         </div>
                                      </div>
                                      
                                      <div className="space-y-4">
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                           <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Impacto</h4>
                                           <p className="text-sm font-serif font-medium text-slate-900">{project.caseStudy?.result}</p>
                                        </div>
                                        
                                        {project.caseStudy?.codeSnippet && (
                                          <div className="bg-slate-900 text-slate-300 p-4 rounded-xl border border-slate-800 text-left overflow-hidden relative group/code">
                                            <div className="flex items-center gap-2 mb-2 text-slate-500 border-b border-slate-800 pb-2">
                                              <Terminal size={10} /> <span className="text-[8px] uppercase tracking-widest font-bold">Code</span>
                                            </div>
                                            <pre className="text-[9px] font-mono leading-relaxed overflow-x-auto scrollbar-thin">
                                              <code>{project.caseStudy.codeSnippet}</code>
                                            </pre>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                </div>
                            </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* --- Lightbox Modal (Light Theme) --- */}
      <AnimatePresence>
        {lightboxProject && (
          <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
              className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex items-center justify-center focus:outline-none" 
              tabIndex={0}
              onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
          >
            {/* Controls */}
            <div className="absolute top-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
              <span className="text-slate-900 text-xs uppercase tracking-widest font-bold ml-2 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  {lightboxProject.index + 1} / {lightboxProject.project.gallery.length}
              </span>
              <button 
                onClick={closeLightbox} 
                className="pointer-events-auto bg-white hover:bg-slate-50 text-slate-900 p-3 rounded-full transition-colors border border-slate-200 shadow-sm focus-visible:ring-2 focus-visible:ring-slate-900"
              > 
                <X size={20} /> 
              </button>
            </div>
            
            <button 
                onClick={prevImage} 
                className="hidden md:flex absolute left-8 bg-white hover:bg-slate-50 text-slate-900 p-6 rounded-full transition-all hover:-translate-x-1 border border-slate-100 shadow-xl z-50 focus-visible:ring-2 focus-visible:ring-slate-900"
                aria-label="Previous Image"
            > 
                <ChevronLeft size={24} strokeWidth={1.5} /> 
            </button>
            
            <button 
                onClick={nextImage} 
                className="hidden md:flex absolute right-8 bg-white hover:bg-slate-50 text-slate-900 p-6 rounded-full transition-all hover:translate-x-1 border border-slate-100 shadow-xl z-50 focus-visible:ring-2 focus-visible:ring-slate-900"
                aria-label="Next Image"
            > 
                <ChevronRight size={24} strokeWidth={1.5} /> 
            </button>
            
            {/* Main Image */}
            <div className="w-full h-full p-4 md:p-12 flex items-center justify-center pointer-events-none">
              <motion.img 
                  key={lightboxProject.project.gallery[lightboxProject.index]}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={lightboxProject.project.gallery[lightboxProject.index]} 
                  alt="" 
                  className="pointer-events-auto max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl select-none ring-1 ring-slate-900/5" 
                  onClick={(e) => e.stopPropagation()} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;