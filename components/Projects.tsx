import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Maximize2, BookOpen } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';

// Lazy Image Component
const LazyImage: React.FC<{ src: string; alt: string; className?: string; onClick?: () => void }> = ({ src, alt, className, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`} onClick={onClick}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      />
    </div>
  );
};

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [visibleProjects, setVisibleProjects] = useState(PROJECTS);
  
  // Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<typeof PROJECTS[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Case Study Modal State
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [currentCaseStudy, setCurrentCaseStudy] = useState<typeof PROJECTS[0] | null>(null);

  const allTags = ['Todos', ...Array.from(new Set(PROJECTS.flatMap(p => p.tags)))];

  useEffect(() => {
    if (activeFilter === 'Todos') {
      setVisibleProjects(PROJECTS);
    } else {
      setVisibleProjects(PROJECTS.filter(p => p.tags.includes(activeFilter)));
    }
  }, [activeFilter]);

  // Keyboard Navigation for Lightbox & Modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage(e as any);
        if (e.key === 'ArrowLeft') prevImage(e as any);
      }
      if (isCaseStudyOpen && e.key === 'Escape') closeCaseStudy();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, isCaseStudyOpen, currentImageIndex, currentProject]);

  // --- Lightbox Functions ---
  const openLightbox = (project: typeof PROJECTS[0], initialIndex: number = 0) => {
    setCurrentProject(project);
    setCurrentImageIndex(initialIndex);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setCurrentProject(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentProject) {
      setCurrentImageIndex((prev) => (prev + 1) % currentProject.gallery.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentProject) {
      setCurrentImageIndex((prev) => (prev - 1 + currentProject.gallery.length) % currentProject.gallery.length);
    }
  };

  // --- Case Study Functions ---
  const openCaseStudy = (project: typeof PROJECTS[0]) => {
    setCurrentCaseStudy(project);
    setIsCaseStudyOpen(true);
    document.body.style.overflow = 'hidden';
  }

  const closeCaseStudy = () => {
    setIsCaseStudyOpen(false);
    setCurrentCaseStudy(null);
    document.body.style.overflow = 'auto';
  }

  return (
    <section id="projects" className="py-20 md:py-32 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header Compacto with Glass Card */}
        <div className="mb-24 text-center max-w-2xl mx-auto">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block">Portfolio</span>
              <h2 className="text-3xl md:text-5xl font-serif font-medium mb-8 text-slate-900 tracking-tight">
                Projetos Selecionados
              </h2>
            </Reveal>
            
            {/* Filter Tabs */}
            <Reveal delay={100}>
              <div className="inline-flex flex-wrap gap-2 justify-center glass-panel p-2 rounded-full">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    className={`px-6 py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-full ${
                      activeFilter === tag 
                        ? 'bg-slate-900 text-white shadow-lg' 
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </Reveal>
        </div>

        {/* Projects List - Borderless Glass ZigZag */}
        <div className="flex flex-col gap-32">
          {visibleProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <Reveal key={`${project.title}-${index}`} width="100%">
                <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Visuals Section */}
                  <div className="w-full lg:w-1/2 group perspective-1000">
                    {/* Main Image */}
                    <div 
                      className="relative w-full aspect-[16/10] overflow-hidden cursor-pointer rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.18)] transition-all duration-500 transform hover:-translate-y-1 bg-white"
                      onClick={() => openLightbox(project, 0)}
                    >
                      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-500 z-10 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 glass-panel px-6 py-3 rounded-full flex items-center gap-2 shadow-xl text-slate-900 backdrop-blur-md">
                          <Maximize2 className="w-3 h-3" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Expandir</span>
                        </div>
                      </div>
                      <LazyImage 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                      />
                    </div>
                    
                    {/* Small Thumbs Row */}
                    <div className={`flex gap-4 mt-6 ${!isEven ? 'justify-end' : ''}`}>
                      {project.gallery.slice(0, 3).map((img, idx) => (
                          <div key={idx} className="w-20 h-14 flex-shrink-0 cursor-pointer opacity-70 hover:opacity-100 transition-all duration-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-white" onClick={() => openLightbox(project, idx)}>
                            <img src={img} className="w-full h-full object-cover" alt="" />
                          </div>
                      ))}
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="w-full lg:w-1/2">
                    <div className={`flex flex-col glass-card p-10 md:p-14 rounded-[2.5rem] ${!isEven ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'} border border-white/40 bg-white/40`}>
                        <span className="inline-block px-4 py-1.5 bg-white text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-6 rounded-full border border-slate-100">
                            {project.category}
                          </span>
                          
                          <h3 className="text-3xl md:text-5xl font-serif font-medium mb-6 text-slate-900 leading-[1.1] tracking-tight">
                            {project.title}
                          </h3>
                          
                          <p className={`text-slate-600 leading-relaxed mb-10 text-base font-light max-w-lg ${!isEven ? 'lg:ml-auto' : ''}`}>
                            {project.description}
                          </p>
                          
                          <div className={`flex flex-wrap gap-2 mb-10 ${!isEven ? 'lg:justify-end' : ''}`}>
                            {project.tags.map((tag, idx) => (
                              <span key={idx} className="px-4 py-1.5 bg-white/50 text-[10px] text-slate-600 uppercase tracking-wider font-bold rounded-full border border-white/50">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex flex-wrap items-center gap-4">
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => openCaseStudy(project)}
                              className="gap-2"
                            >
                              <BookOpen className="w-3 h-3" />
                              Estudo de Caso
                            </Button>
                            
                            <a href={project.link}>
                              <Button variant="primary" size="sm" className="gap-2">
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
          })}
        </div>
      </div>

      {/* --- Lightbox Modal --- */}
      {isLightboxOpen && currentProject && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center animate-in fade-in duration-300 focus:outline-none" tabIndex={0}>
          <div className="absolute top-8 right-8 z-50">
             <button onClick={closeLightbox} className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors backdrop-blur-md border border-white/10"> <X size={24} /> </button>
          </div>
          <button onClick={prevImage} className="hidden md:flex absolute left-8 bg-white/10 hover:bg-white/20 text-white p-5 rounded-full transition-all hover:-translate-x-1 backdrop-blur-md border border-white/10"> <ChevronLeft size={24} /> </button>
          <button onClick={nextImage} className="hidden md:flex absolute right-8 bg-white/10 hover:bg-white/20 text-white p-5 rounded-full transition-all hover:translate-x-1 backdrop-blur-md border border-white/10"> <ChevronRight size={24} /> </button>
          
          <div className="w-full h-full p-6 md:p-24 flex items-center justify-center">
             <img src={currentProject.gallery[currentImageIndex]} alt="" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
          </div>
        </div>
      )}

      {/* --- Case Study Modal --- */}
      {isCaseStudyOpen && currentCaseStudy && (
         <div className="fixed inset-0 z-[90] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="glass-panel w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative flex flex-col bg-white">
               <div className="p-8 md:p-10 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-xl z-10 flex justify-between items-center">
                  <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Case Study</span>
                      <h3 className="text-2xl md:text-3xl font-serif font-medium text-slate-900">{currentCaseStudy.title}</h3>
                  </div>
                  <button onClick={closeCaseStudy} className="p-3 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
               </div>
               
               <div className="p-8 md:p-12 space-y-10 bg-slate-50/50">
                  <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-400"></span> O Desafio
                        </h4>
                        <p className="text-slate-600 leading-relaxed text-sm">{currentCaseStudy.caseStudy?.challenge}</p>
                      </div>
                      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400"></span> A Solução
                        </h4>
                        <p className="text-slate-600 leading-relaxed text-sm">{currentCaseStudy.caseStudy?.solution}</p>
                      </div>
                  </div>
                  
                  <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                     {/* Decor */}
                     <div className="absolute top-0 right-0 w-48 h-48 bg-slate-700 rounded-full blur-[60px] opacity-50 -translate-y-1/3 translate-x-1/3"></div>
                     
                     <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 relative z-10">O Resultado</h4>
                     <p className="text-xl md:text-3xl font-serif leading-relaxed relative z-10">"{currentCaseStudy.caseStudy?.result}"</p>
                  </div>
               </div>
            </div>
         </div>
      )}

    </section>
  );
};

export default Projects;