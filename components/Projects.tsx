import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Maximize2, BookOpen } from 'lucide-react';

// Lazy Image Component
const LazyImage: React.FC<{ src: string; alt: string; className?: string; onClick?: () => void }> = ({ src, alt, className, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`} onClick={onClick}>
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
    <section id="projects" className="py-24 md:py-32 bg-white relative rounded-t-[3rem] -mt-10 z-20 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header Compacto */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Portfolio</span>
            <h2 className="text-3xl md:text-5xl font-serif font-medium mb-8 text-offblack">
              Projetos Selecionados
            </h2>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3 justify-center">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`px-5 py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-full border ${
                    activeFilter === tag 
                      ? 'bg-offblack text-white border-offblack shadow-md' 
                      : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black hover:bg-gray-50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
        </div>

        {/* Projects List - ZigZag Layout */}
        <div className="flex flex-col gap-32">
          {visibleProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={`${project.title}-${index}`} 
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${!isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Visuals Section */}
                <div className="w-full lg:w-1/2 group">
                  {/* Main Image Compact */}
                  <div 
                    className="relative w-full aspect-[16/10] overflow-hidden cursor-pointer rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500"
                    onClick={() => openLightbox(project, 0)}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg">
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
                  <div className="flex gap-4 mt-6 pl-2">
                     {project.gallery.slice(0, 3).map((img, idx) => (
                        <div key={idx} className="w-24 h-16 flex-shrink-0 cursor-pointer opacity-60 hover:opacity-100 transition-all duration-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-transparent hover:border-gray-200" onClick={() => openLightbox(project, idx)}>
                           <img src={img} className="w-full h-full object-cover" alt="" />
                        </div>
                     ))}
                  </div>
                </div>

                {/* Info Section */}
                <div className={`w-full lg:w-1/2 ${isEven ? 'lg:pl-4' : 'lg:pr-4'}`}>
                   <span className="inline-block px-3 py-1 bg-gray-100 text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-6 rounded-full">
                      {project.category}
                    </span>
                    
                    <h3 className="text-4xl font-serif font-medium mb-6 text-offblack leading-tight">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-8 text-base font-light border-l-2 border-gray-100 pl-6">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-10">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="px-4 py-1.5 bg-white text-[10px] text-gray-500 uppercase tracking-wider font-bold rounded-full border border-gray-200 shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                       <button 
                         onClick={() => openCaseStudy(project)}
                         className="px-6 py-3.5 border border-gray-200 hover:border-black text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all rounded-full group hover:bg-gray-50"
                       >
                         <BookOpen className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                         Estudo de Caso
                       </button>
                       <a 
                         href={project.link}
                         className="px-6 py-3.5 bg-offblack text-white hover:bg-gray-800 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                       >
                         Visitar Site
                         <ArrowUpRight className="w-4 h-4" />
                       </a>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Lightbox Modal --- */}
      {isLightboxOpen && currentProject && (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex items-center justify-center animate-in fade-in duration-300 focus:outline-none" tabIndex={0}>
          <div className="absolute top-6 right-6 z-50">
             <button onClick={closeLightbox} className="bg-gray-100 hover:bg-gray-200 text-black p-3 rounded-full transition-colors shadow-sm"> <X size={24} /> </button>
          </div>
          <button onClick={prevImage} className="hidden md:flex absolute left-8 bg-white hover:bg-gray-50 text-black p-4 rounded-full shadow-lg border border-gray-100 transition-all hover:-translate-x-1"> <ChevronLeft size={24} /> </button>
          <button onClick={nextImage} className="hidden md:flex absolute right-8 bg-white hover:bg-gray-50 text-black p-4 rounded-full shadow-lg border border-gray-100 transition-all hover:translate-x-1"> <ChevronRight size={24} /> </button>
          
          <div className="w-full h-full p-4 md:p-20 flex items-center justify-center">
             <img src={currentProject.gallery[currentImageIndex]} alt="" className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" />
          </div>
          
          {/* Caption */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full border border-gray-200 shadow-sm">
             <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                {currentProject.title} &mdash; {currentImageIndex + 1} / {currentProject.gallery.length}
             </span>
          </div>
        </div>
      )}

      {/* --- Case Study Modal --- */}
      {isCaseStudyOpen && currentCaseStudy && (
         <div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl relative flex flex-col">
               <div className="p-8 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-10 flex justify-between items-center">
                  <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Case Study</span>
                      <h3 className="text-2xl font-serif font-medium text-offblack">{currentCaseStudy.title}</h3>
                  </div>
                  <button onClick={closeCaseStudy} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
               </div>
               
               <div className="p-8 md:p-12 space-y-10">
                  <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-red-50 p-8 rounded-3xl border border-red-100/50">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> O Desafio
                        </h4>
                        <p className="text-gray-700 leading-relaxed text-sm">{currentCaseStudy.caseStudy?.challenge}</p>
                      </div>
                      <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100/50">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> A Solução
                        </h4>
                        <p className="text-gray-700 leading-relaxed text-sm">{currentCaseStudy.caseStudy?.solution}</p>
                      </div>
                  </div>
                  
                  <div className="bg-offblack text-white p-10 rounded-3xl shadow-xl relative overflow-hidden">
                     {/* Decor */}
                     <div className="absolute top-0 right-0 w-32 h-32 bg-gray-800 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                     
                     <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 relative z-10">O Resultado</h4>
                     <p className="text-xl md:text-2xl font-serif leading-relaxed relative z-10">"{currentCaseStudy.caseStudy?.result}"</p>
                  </div>
               </div>
               
               <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
                  <button onClick={closeCaseStudy} className="w-full py-4 bg-white border border-gray-200 text-xs uppercase font-bold tracking-widest hover:bg-offblack hover:text-white hover:border-offblack transition-all rounded-2xl shadow-sm">Fechar Detalhes</button>
               </div>
            </div>
         </div>
      )}

    </section>
  );
};

export default Projects;