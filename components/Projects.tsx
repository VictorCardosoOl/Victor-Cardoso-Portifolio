import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Maximize2, BookOpen } from 'lucide-react';

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
        <div className="mb-20 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block">Portfolio</span>
            <h2 className="text-3xl md:text-5xl font-serif font-medium mb-8 text-slate-900">
              Projetos Selecionados
            </h2>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3 justify-center">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`px-5 py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-full border shadow-sm backdrop-blur-md ${
                    activeFilter === tag 
                      ? 'bg-slate-800 text-white border-slate-800 shadow-md' 
                      : 'bg-white/40 text-slate-500 border-white/40 hover:border-slate-300 hover:text-slate-800 hover:bg-white/60'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
        </div>

        {/* Projects List - Glass Cards ZigZag */}
        <div className="flex flex-col gap-24 md:gap-32">
          {visibleProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={`${project.title}-${index}`} 
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${!isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Visuals Section */}
                <div className="w-full lg:w-1/2 group">
                  {/* Main Image Compact with Glass Border */}
                  <div 
                    className="relative w-full aspect-[16/10] overflow-hidden cursor-pointer rounded-[2rem] shadow-2xl hover:shadow-[0_20px_50px_rgba(8,112,184,0.1)] transition-all duration-500 border-[6px] border-white/30"
                    onClick={() => openLightbox(project, 0)}
                  >
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-500 z-10 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 glass-panel px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg text-slate-900">
                        <Maximize2 className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Expandir</span>
                      </div>
                    </div>
                    <LazyImage 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Small Thumbs Row */}
                  <div className={`flex gap-4 mt-6 ${!isEven ? 'justify-end' : ''}`}>
                     {project.gallery.slice(0, 3).map((img, idx) => (
                        <div key={idx} className="w-24 h-16 flex-shrink-0 cursor-pointer opacity-70 hover:opacity-100 transition-all duration-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border-2 border-white/50" onClick={() => openLightbox(project, idx)}>
                           <img src={img} className="w-full h-full object-cover" alt="" />
                        </div>
                     ))}
                  </div>
                </div>

                {/* Info Section - Glass Background for Text */}
                <div className="w-full lg:w-1/2">
                   <div className={`flex flex-col glass-card p-8 md:p-12 rounded-[2.5rem] border-white/50 ${!isEven ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'}`}>
                      <span className="inline-block px-4 py-1.5 bg-slate-100/50 text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-5 rounded-full border border-white/60">
                          {project.category}
                        </span>
                        
                        <h3 className="text-3xl md:text-5xl font-serif font-medium mb-5 text-slate-800 leading-tight">
                          {project.title}
                        </h3>
                        
                        <p className={`text-slate-600 leading-relaxed mb-8 text-base md:text-lg font-light max-w-lg ${!isEven ? 'lg:ml-auto' : ''}`}>
                          {project.description}
                        </p>
                        
                        <div className={`flex flex-wrap gap-2 mb-10 ${!isEven ? 'lg:justify-end' : ''}`}>
                          {project.tags.map((tag, idx) => (
                            <span key={idx} className="px-4 py-1.5 bg-white/60 text-[10px] text-slate-500 uppercase tracking-wider font-bold rounded-full border border-white/60 shadow-sm backdrop-blur-sm">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                          <button 
                            onClick={() => openCaseStudy(project)}
                            className="px-6 py-3.5 border border-slate-200 hover:border-slate-800 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all rounded-full group hover:bg-white"
                          >
                            <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
                            Estudo de Caso
                          </button>
                          <a 
                            href={project.link}
                            className="px-6 py-3.5 bg-slate-800 text-white hover:bg-slate-700 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                          >
                            Visitar Site
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        </div>
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Lightbox Modal (Glass) --- */}
      {isLightboxOpen && currentProject && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-xl flex items-center justify-center animate-in fade-in duration-300 focus:outline-none" tabIndex={0}>
          <div className="absolute top-6 right-6 z-50">
             <button onClick={closeLightbox} className="bg-white/10 hover:bg-white/20 border border-white/10 text-white p-3 rounded-full transition-colors shadow-lg backdrop-blur-md"> <X size={24} /> </button>
          </div>
          <button onClick={prevImage} className="hidden md:flex absolute left-8 bg-white/10 hover:bg-white/20 border border-white/10 text-white p-4 rounded-full shadow-lg transition-all hover:-translate-x-1 backdrop-blur-md"> <ChevronLeft size={24} /> </button>
          <button onClick={nextImage} className="hidden md:flex absolute right-8 bg-white/10 hover:bg-white/20 border border-white/10 text-white p-4 rounded-full shadow-lg transition-all hover:translate-x-1 backdrop-blur-md"> <ChevronRight size={24} /> </button>
          
          <div className="w-full h-full p-4 md:p-20 flex items-center justify-center">
             <img src={currentProject.gallery[currentImageIndex]} alt="" className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border-4 border-white/10" />
          </div>
          
          {/* Caption */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-panel px-6 py-3 rounded-full border border-white/30 shadow-lg">
             <span className="text-xs font-bold uppercase tracking-widest text-slate-800">
                {currentProject.title} &mdash; {currentImageIndex + 1} / {currentProject.gallery.length}
             </span>
          </div>
        </div>
      )}

      {/* --- Case Study Modal (Glass) --- */}
      {isCaseStudyOpen && currentCaseStudy && (
         <div className="fixed inset-0 z-[90] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="glass-panel w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative flex flex-col border border-white/80">
               <div className="p-8 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-xl z-10 flex justify-between items-center">
                  <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Case Study</span>
                      <h3 className="text-2xl font-serif font-medium text-slate-800">{currentCaseStudy.title}</h3>
                  </div>
                  <button onClick={closeCaseStudy} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
               </div>
               
               <div className="p-8 md:p-12 space-y-10 bg-white/40">
                  <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-red-50/50 p-8 rounded-[2rem] border border-red-100/50 backdrop-blur-sm">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> O Desafio
                        </h4>
                        <p className="text-slate-700 leading-relaxed text-sm">{currentCaseStudy.caseStudy?.challenge}</p>
                      </div>
                      <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100/50 backdrop-blur-sm">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> A Solução
                        </h4>
                        <p className="text-slate-700 leading-relaxed text-sm">{currentCaseStudy.caseStudy?.solution}</p>
                      </div>
                  </div>
                  
                  <div className="bg-slate-800 text-white p-10 rounded-[2rem] shadow-xl relative overflow-hidden">
                     {/* Decor */}
                     <div className="absolute top-0 right-0 w-32 h-32 bg-slate-600 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                     
                     <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 relative z-10">O Resultado</h4>
                     <p className="text-xl md:text-2xl font-serif leading-relaxed relative z-10">"{currentCaseStudy.caseStudy?.result}"</p>
                  </div>
               </div>
               
               <div className="p-6 border-t border-slate-100 bg-white/60 rounded-b-[2.5rem]">
                  <button onClick={closeCaseStudy} className="w-full py-4 bg-white border border-slate-200 text-xs uppercase font-bold tracking-widest hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all rounded-2xl shadow-sm">Fechar Detalhes</button>
               </div>
            </div>
         </div>
      )}

    </section>
  );
};

export default Projects;