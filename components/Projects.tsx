import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Maximize2, RotateCcw, ChevronDown } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';

// Utility to slugify titles for URL
const toSlug = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

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

// Lazy Image Component with "Heavy" Animation
const LazyImage: React.FC<{ src: string; alt: string; className?: string; onClick?: () => void }> = ({ src, alt, className, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Update load state when src changes
  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`} onClick={onClick}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-[1500ms] ease-[cubic-bezier(0.2,0,0,1)] will-change-transform ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
        }`}
      />
    </div>
  );
};

const Projects: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [visibleProjects, setVisibleProjects] = useState(PROJECTS);
  
  // State for preview images (mapped by project index)
  const [previewImages, setPreviewImages] = useState<{[key: number]: string}>({});

  // State for Lightbox only
  const [lightboxProject, setLightboxProject] = useState<{ project: typeof PROJECTS[0], index: number } | null>(null);
  
  // State for Inline Expansion (Case Study)
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const { lock, unlock } = useScrollLock();
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
    setActiveFilters(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const clearFilters = () => setActiveFilters([]);

  // --- Lightbox Logic ---

  const openLightbox = (project: typeof PROJECTS[0], index: number = 0) => {
    setLightboxProject({ project, index });
    lock();
  };

  const closeLightbox = () => {
    setLightboxProject(null);
    unlock();
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

  // Handle Wheel Scroll for Lightbox
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (lightboxProject) {
        // Simple debounce could be added here if needed, but for now specific threshold helps
        if (e.deltaY > 50) {
          nextImage();
        } else if (e.deltaY < -50) {
          prevImage();
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


  // --- Case Study Toggle ---
  const toggleCaseStudy = (title: string) => {
    setExpandedProjectId(prev => prev === title ? null : title);
  }

  // Handle Thumbnail Hover to update Preview
  const handleThumbnailHover = (projectIndex: number, imgUrl: string) => {
    setPreviewImages(prev => ({...prev, [projectIndex]: imgUrl}));
  };

  return (
    <section id="projects" className="py-16 md:py-24 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto flex flex-col items-center">
            <Reveal width="100%">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block">Portfolio</span>
              <h2 className="text-3xl md:text-5xl font-serif font-medium mb-8 text-slate-900 tracking-tight">
                Projetos Selecionados
              </h2>
            </Reveal>
            
            {/* Filters */}
            <Reveal delay={100} width="100%">
              <div className="flex flex-col items-center gap-4">
                <div className="inline-flex flex-wrap gap-2 justify-center glass-panel p-2 rounded-3xl border border-slate-200/50 bg-white/40 backdrop-blur-md">
                  {uniqueTags.map((tag) => {
                    const isActive = activeFilters.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleFilter(tag)}
                        className={`px-5 py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-[400ms] ease-[cubic-bezier(0.2,0,0,1)] rounded-full flex items-center gap-2 ${
                          isActive 
                            ? 'bg-slate-900 text-white shadow-lg transform -translate-y-0.5' 
                            : 'bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'
                        }`}
                      >
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>}
                        {tag}
                      </button>
                    );
                  })}
                </div>

                <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${activeFilters.length > 0 ? 'max-h-12 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}`}>
                  <button 
                    onClick={clearFilters}
                    className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors px-4 py-2"
                  >
                    <RotateCcw size={12} className="group-hover:-rotate-180 transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)]" />
                    Limpar Filtros
                  </button>
                </div>
              </div>
            </Reveal>
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-16 lg:gap-20">
          {visibleProjects.length > 0 ? (
            visibleProjects.map((project, index) => {
              const isEven = index % 2 === 0;
              const isExpanded = expandedProjectId === project.title;
              const currentImage = previewImages[index] || project.image;

              return (
                <Reveal key={`${project.title}-${index}`} width="100%">
                  <div className={`group flex flex-col lg:flex-row items-start gap-6 lg:gap-12 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                    
                    {/* Visuals */}
                    <div className="w-full lg:w-[50%] perspective-1000 sticky top-24">
                      {/* Main Image */}
                      <div 
                        className="relative w-full aspect-[16/11] overflow-hidden cursor-pointer rounded-[2rem] 
                        shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] 
                        transition-all duration-[800ms] ease-[cubic-bezier(0.2,0,0,1)] 
                        transform hover:-translate-y-2 bg-slate-100 border border-white/40
                        group-hover:shadow-[0_25px_50px_-12px_rgba(99,102,241,0.15)]"
                        onClick={() => openLightbox(project, 0)}
                      >
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-[800ms] z-10 flex items-center justify-center pointer-events-none">
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-[600ms] ease-[cubic-bezier(0.2,0,0,1)] transform translate-y-8 group-hover:translate-y-0 glass-panel px-6 py-3 rounded-full flex items-center gap-2 shadow-2xl text-slate-900 backdrop-blur-md border border-white/40">
                            <Maximize2 className="w-3 h-3" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Expandir</span>
                          </div>
                        </div>
                        <LazyImage 
                          src={currentImage} 
                          alt={project.title} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1500ms] ease-[cubic-bezier(0.2,0,0,1)]"
                        />
                      </div>
                      
                      {/* Thumbnails */}
                      <div className={`flex gap-3 mt-4 ${!isEven ? 'justify-end' : ''}`}>
                        {project.gallery.map((img, idx) => (
                            <div 
                                key={idx} 
                                className={`w-16 h-12 md:w-24 md:h-16 flex-shrink-0 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-white/40 hover:border-indigo-200 hover:-translate-y-1 ${currentImage === img ? 'ring-2 ring-indigo-500/50 opacity-100' : 'opacity-60 hover:opacity-100'}`}
                                onMouseEnter={() => handleThumbnailHover(index, img)}
                                onClick={() => openLightbox(project, idx)}
                            >
                              <img src={img} className="w-full h-full object-cover" alt="" />
                            </div>
                        ))}
                      </div>
                    </div>

                    {/* Info Card */}
                    <div className="w-full lg:w-[50%]">
                      <div className={`flex flex-col relative overflow-hidden
                        bg-white/40 backdrop-blur-xl
                        p-8 md:p-10 rounded-[2.5rem] 
                        border border-white/50
                        shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]
                        group-hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.1)]
                        group-hover:border-indigo-500/10
                        transition-all duration-[800ms] ease-[cubic-bezier(0.2,0,0,1)]
                        ${!isEven ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'} 
                      `}>
                          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-50"></div>

                          <span className="relative inline-block px-4 py-1.5 bg-white/40 text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-5 rounded-full border border-white/30 backdrop-blur-sm">
                              {project.category}
                            </span>
                            
                            <h3 className="relative text-3xl md:text-4xl font-serif font-medium mb-5 text-slate-900 leading-[1.1] tracking-tight group-hover:text-indigo-950 transition-colors duration-500">
                              {project.title}
                            </h3>
                            
                            <p className={`relative text-slate-600 leading-relaxed mb-8 text-sm md:text-base font-light max-w-md ${!isEven ? 'lg:ml-auto' : ''}`}>
                              {project.description}
                            </p>
                            
                            <div className={`relative flex flex-wrap gap-2 mb-8 ${!isEven ? 'lg:justify-end' : ''}`}>
                              {project.tags.map((tag, idx) => (
                                <span 
                                  key={idx} 
                                  className={`px-4 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-full border transition-all duration-300 ${
                                    activeFilters.includes(tag) 
                                      ? 'bg-slate-900 text-white border-slate-900' 
                                      : 'bg-white/30 text-slate-600 border-white/40 hover:border-slate-400 hover:bg-white/60'
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
                                className={`gap-2 bg-white/20 hover:bg-white/80 border-white/40 hover:border-white/80 transition-all ${isExpanded ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800' : ''}`}
                              >
                                {isExpanded ? 'Fechar Detalhes' : 'Ver Estudo de Caso'}
                                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                              </Button>
                              
                              <a href={project.link}>
                                <Button variant="primary" size="sm" className="gap-2 shadow-lg hover:shadow-indigo-500/20 hover:bg-indigo-950 border border-transparent">
                                  Visitar Site
                                  <ArrowUpRight className="w-3 h-3" />
                                </Button>
                              </a>
                            </div>

                            {/* Expanded Case Study Content (Inline) */}
                            <div 
                              className={`w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className={`pt-6 border-t border-slate-200/50 space-y-6 ${!isEven ? 'text-right' : 'text-left'}`}>
                                    <div>
                                       <h4 className={`text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-2 flex items-center gap-2 ${!isEven ? 'justify-end' : ''}`}>
                                           <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Desafio
                                       </h4>
                                       <p className="text-xs text-slate-600 leading-relaxed font-light">{project.caseStudy?.challenge}</p>
                                    </div>
                                    <div>
                                       <h4 className={`text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-2 flex items-center gap-2 ${!isEven ? 'justify-end' : ''}`}>
                                           <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Solução
                                       </h4>
                                       <p className="text-xs text-slate-600 leading-relaxed font-light">{project.caseStudy?.solution}</p>
                                    </div>
                                    <div className="bg-slate-900/5 p-4 rounded-xl border border-slate-900/5">
                                       <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Resultado</h4>
                                       <p className="text-sm font-serif font-medium text-slate-900">{project.caseStudy?.result}</p>
                                    </div>
                                </div>
                            </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })
          ) : (
            <div className="text-center py-20 opacity-50">
              <p className="text-lg font-serif text-slate-500">Nenhum projeto encontrado com essa combinação de filtros.</p>
              <button onClick={clearFilters} className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-900 underline">
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- Modern Lightbox Modal --- */}
      {lightboxProject && (
        <div 
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center animate-in fade-in duration-300 focus:outline-none" 
            tabIndex={0}
            onClick={(e) => {
                // Close if clicking the backdrop (not the image or buttons)
                if (e.target === e.currentTarget) closeLightbox();
            }}
        >
          <div className="absolute top-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
             <span className="text-white/50 text-xs uppercase tracking-widest font-bold ml-2">
                {lightboxProject.index + 1} / {lightboxProject.project.gallery.length}
             </span>
             <button onClick={closeLightbox} className="pointer-events-auto bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-md border border-white/10"> <X size={20} /> </button>
          </div>
          
          <button onClick={prevImage} className="hidden md:flex absolute left-8 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white p-6 rounded-full transition-all hover:-translate-x-1 backdrop-blur-md border border-white/5 z-50"> <ChevronLeft size={32} strokeWidth={1} /> </button>
          <button onClick={nextImage} className="hidden md:flex absolute right-8 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white p-6 rounded-full transition-all hover:translate-x-1 backdrop-blur-md border border-white/5 z-50"> <ChevronRight size={32} strokeWidth={1} /> </button>
          
          <div className="w-full h-full p-4 md:p-12 flex items-center justify-center pointer-events-none">
             <img 
                src={lightboxProject.project.gallery[lightboxProject.index]} 
                alt="" 
                className="pointer-events-auto max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-500 ease-[cubic-bezier(0.2,0,0,1)] select-none" 
                onClick={(e) => e.stopPropagation()} 
             />
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-[10px] uppercase tracking-widest hidden md:block">
            Use Scroll ou Setas para navegar
          </div>
        </div>
      )}

    </section>
  );
};

export default Projects;