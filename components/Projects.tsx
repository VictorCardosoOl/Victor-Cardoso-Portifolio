import React, { useState, useEffect, useCallback } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Maximize2, BookOpen, RotateCcw } from 'lucide-react';
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
  
  // Unified Modal State
  const [lightboxProject, setLightboxProject] = useState<{ project: typeof PROJECTS[0], index: number } | null>(null);
  const [caseStudyProject, setCaseStudyProject] = useState<typeof PROJECTS[0] | null>(null);

  const { lock, unlock } = useScrollLock();
  const uniqueTags = Array.from(new Set(PROJECTS.flatMap(p => p.tags))).sort();

  // URL Deep Linking Logic
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const caseSlug = params.get('case');
    
    if (caseSlug) {
      const found = PROJECTS.find(p => toSlug(p.title) === caseSlug);
      if (found) {
        setCaseStudyProject(found);
        lock();
      }
    }
  }, [lock]);

  const updateUrl = (key: string, value: string | null) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    window.history.pushState({}, '', url);
  };

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

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxProject) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage(e as any);
        if (e.key === 'ArrowLeft') prevImage(e as any);
      }
      if (caseStudyProject && e.key === 'Escape') closeCaseStudy();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxProject, caseStudyProject]);

  // --- Lightbox Functions ---
  const openLightbox = (project: typeof PROJECTS[0], index: number = 0) => {
    setLightboxProject({ project, index });
    lock();
  };

  const closeLightbox = () => {
    setLightboxProject(null);
    unlock();
  };

  const nextImage = (e: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxProject) {
      const nextIndex = (lightboxProject.index + 1) % lightboxProject.project.gallery.length;
      setLightboxProject({ ...lightboxProject, index: nextIndex });
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxProject) {
      const prevIndex = (lightboxProject.index - 1 + lightboxProject.project.gallery.length) % lightboxProject.project.gallery.length;
      setLightboxProject({ ...lightboxProject, index: prevIndex });
    }
  };

  // --- Case Study Functions ---
  const openCaseStudy = (project: typeof PROJECTS[0]) => {
    setCaseStudyProject(project);
    updateUrl('case', toSlug(project.title));
    lock();
  }

  const closeCaseStudy = () => {
    setCaseStudyProject(null);
    updateUrl('case', null);
    unlock();
  }

  return (
    <section id="projects" className="py-16 md:py-24 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header - Fixed Alignment with width="100%" */}
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

        {/* Projects List - Reduced Gap */}
        <div className="flex flex-col gap-16 lg:gap-24">
          {visibleProjects.length > 0 ? (
            visibleProjects.map((project, index) => {
              const isEven = index % 2 === 0;

              return (
                <Reveal key={`${project.title}-${index}`} width="100%">
                  <div className={`group flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                    
                    {/* Visuals - Heavy Inertia Animation */}
                    <div className="w-full lg:w-[55%] perspective-1000">
                      <div 
                        className="relative w-full aspect-[16/10] overflow-hidden cursor-pointer rounded-[2rem] 
                        shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] 
                        transition-all duration-[800ms] ease-[cubic-bezier(0.2,0,0,1)] 
                        transform hover:-translate-y-2 bg-slate-100 border border-white/40
                        group-hover:shadow-[0_25px_50px_-12px_rgba(99,102,241,0.15)]"
                        onClick={() => openLightbox(project, 0)}
                      >
                        {/* Glow Effect on Hover */}
                        <div className="absolute inset-0 z-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-colors duration-700 pointer-events-none"></div>

                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-[800ms] z-10 flex items-center justify-center pointer-events-none">
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-[600ms] ease-[cubic-bezier(0.2,0,0,1)] transform translate-y-8 group-hover:translate-y-0 glass-panel px-6 py-3 rounded-full flex items-center gap-2 shadow-2xl text-slate-900 backdrop-blur-md border border-white/40">
                            <Maximize2 className="w-3 h-3" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Expandir</span>
                          </div>
                        </div>
                        <LazyImage 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1500ms] ease-[cubic-bezier(0.2,0,0,1)]"
                        />
                      </div>
                      
                      {/* Thumbnails */}
                      <div className={`flex gap-3 mt-4 ${!isEven ? 'justify-end' : ''}`}>
                        {project.gallery.slice(0, 3).map((img, idx) => (
                            <div key={idx} className="w-16 h-12 md:w-20 md:h-14 flex-shrink-0 cursor-pointer opacity-70 hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-white/40 hover:border-indigo-200 hover:-translate-y-1" onClick={() => openLightbox(project, idx)}>
                              <img src={img} className="w-full h-full object-cover" alt="" />
                            </div>
                        ))}
                      </div>
                    </div>

                    {/* Info - Refined "Liquid Glass" Glassmorphism with Glow */}
                    <div className="w-full lg:w-[45%]">
                      <div className={`flex flex-col relative overflow-hidden
                        bg-white/30 backdrop-blur-xl
                        p-8 md:p-10 rounded-[2.5rem] 
                        border border-white/40
                        shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]
                        hover:shadow-[0_15px_45px_0_rgba(31,38,135,0.1)]
                        hover:bg-white/40 hover:border-white/60
                        transition-all duration-[800ms] ease-[cubic-bezier(0.2,0,0,1)]
                        ${!isEven ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'} 
                      `}>
                          {/* Inner Shine/Gloss Effect - subtle highlight */}
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

                            <div className="relative flex flex-wrap items-center gap-3">
                              <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => openCaseStudy(project)}
                                className="gap-2 bg-white/20 hover:bg-white/80 border-white/40 hover:border-white/80"
                              >
                                <BookOpen className="w-3 h-3" />
                                Estudo de Caso
                              </Button>
                              
                              <a href={project.link}>
                                <Button variant="primary" size="sm" className="gap-2 shadow-lg hover:shadow-indigo-500/20 hover:bg-indigo-950 border border-transparent">
                                  Visitar Site
                                  <ArrowUpRight className="w-3 h-3" />
                                </Button>
                              </a>
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

      {/* --- Lightbox Modal --- */}
      {lightboxProject && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-2xl flex items-center justify-center animate-in fade-in duration-500 focus:outline-none" tabIndex={0}>
          <div className="absolute top-8 right-8 z-50">
             <button onClick={closeLightbox} className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors backdrop-blur-md border border-white/10"> <X size={24} /> </button>
          </div>
          <button onClick={prevImage} className="hidden md:flex absolute left-8 bg-white/10 hover:bg-white/20 text-white p-5 rounded-full transition-all hover:-translate-x-1 backdrop-blur-md border border-white/10"> <ChevronLeft size={24} /> </button>
          <button onClick={nextImage} className="hidden md:flex absolute right-8 bg-white/10 hover:bg-white/20 text-white p-5 rounded-full transition-all hover:translate-x-1 backdrop-blur-md border border-white/10"> <ChevronRight size={24} /> </button>
          
          <div className="w-full h-full p-6 md:p-24 flex items-center justify-center">
             <img src={lightboxProject.project.gallery[lightboxProject.index]} alt="" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-500 ease-out" />
          </div>
        </div>
      )}

      {/* --- Case Study Modal --- */}
      {caseStudyProject && (
         <div className="fixed inset-0 z-[90] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-500">
            <div 
              className="glass-panel w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative flex flex-col bg-white animate-in slide-in-from-bottom-10 duration-500 ease-[cubic-bezier(0.2,0,0,1)]"
              onClick={(e) => e.stopPropagation()}
            >
               <div className="p-8 md:p-10 border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur-xl z-10 flex justify-between items-center">
                  <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Case Study</span>
                      <h3 className="text-2xl md:text-3xl font-serif font-medium text-slate-900">{caseStudyProject.title}</h3>
                  </div>
                  <button onClick={closeCaseStudy} className="p-3 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
               </div>
               
               <div className="p-8 md:p-12 space-y-10 bg-slate-50/50">
                  <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]"></span> O Desafio
                        </h4>
                        <p className="text-slate-600 leading-relaxed text-sm">{caseStudyProject.caseStudy?.challenge}</p>
                      </div>
                      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]"></span> A Solução
                        </h4>
                        <p className="text-slate-600 leading-relaxed text-sm">{caseStudyProject.caseStudy?.solution}</p>
                      </div>
                  </div>
                  
                  <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                     {/* Animated glow inside result card */}
                     <div className="absolute top-0 right-0 w-64 h-64 bg-slate-700 rounded-full blur-[80px] opacity-50 -translate-y-1/3 translate-x-1/3 group-hover:scale-125 transition-transform duration-[1500ms]"></div>
                     <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 relative z-10">O Resultado</h4>
                     <p className="text-xl md:text-3xl font-serif leading-relaxed relative z-10">"{caseStudyProject.caseStudy?.result}"</p>
                  </div>
               </div>
            </div>
         </div>
      )}

    </section>
  );
};

export default Projects;