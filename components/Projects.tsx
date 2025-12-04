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
    <section id="projects" className="py-20 md:py-28 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header Compacto */}
        <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">
              Projetos Selecionados
            </h2>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`px-4 py-2 text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 rounded-md border ${
                    activeFilter === tag 
                      ? 'bg-offblack text-white border-offblack' 
                      : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
        </div>

        {/* Projects List - ZigZag Layout */}
        <div className="flex flex-col gap-24">
          {visibleProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={`${project.title}-${index}`} 
                className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${!isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Visuals Section */}
                <div className="w-full lg:w-1/2">
                  {/* Main Image Compact */}
                  <div 
                    className="relative w-full aspect-video overflow-hidden cursor-pointer rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 group"
                    onClick={() => openLightbox(project, 0)}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-white px-4 py-2 rounded-md flex items-center gap-2 shadow-lg">
                        <Maximize2 className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Ver Galeria</span>
                      </div>
                    </div>
                    <LazyImage 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Small Thumbs Row */}
                  <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                     {project.gallery.slice(0, 3).map((img, idx) => (
                        <div key={idx} className="w-20 h-12 flex-shrink-0 cursor-pointer opacity-70 hover:opacity-100 transition-opacity rounded-sm overflow-hidden" onClick={() => openLightbox(project, idx)}>
                           <img src={img} className="w-full h-full object-cover" alt="" />
                        </div>
                     ))}
                  </div>
                </div>

                {/* Info Section */}
                <div className={`w-full lg:w-1/2 ${isEven ? 'lg:pl-8' : 'lg:pr-8'}`}>
                   <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3 block">
                      {project.category}
                    </span>
                    
                    <h3 className="text-3xl font-serif font-medium mb-4 text-offblack">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base font-light">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-50 text-[10px] text-gray-500 uppercase tracking-wider font-medium rounded-sm border border-gray-100">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                       <button 
                         onClick={() => openCaseStudy(project)}
                         className="px-5 py-3 border border-gray-200 hover:border-black text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all rounded-md group"
                       >
                         <BookOpen className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                         Ler Estudo de Caso
                       </button>
                       <a 
                         href={project.link}
                         className="px-5 py-3 bg-offblack text-white hover:bg-gray-800 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors rounded-md shadow-md hover:translate-x-1"
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
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300 focus:outline-none" tabIndex={0}>
          <div className="absolute top-6 right-6 z-50">
             <button onClick={closeLightbox} className="text-white/70 hover:text-white p-2"> <X size={32} /> </button>
          </div>
          <button onClick={prevImage} className="hidden md:flex absolute left-4 text-white/50 hover:text-white p-4"> <ChevronLeft size={48} /> </button>
          <button onClick={nextImage} className="hidden md:flex absolute right-4 text-white/50 hover:text-white p-4"> <ChevronRight size={48} /> </button>
          <div className="w-full h-full p-4 md:p-20 flex items-center justify-center">
             <img src={currentProject.gallery[currentImageIndex]} alt="" className="max-w-full max-h-full object-contain shadow-2xl" />
          </div>
        </div>
      )}

      {/* --- Case Study Modal --- */}
      {isCaseStudyOpen && currentCaseStudy && (
         <div className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl relative flex flex-col">
               <div className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10 flex justify-between items-center">
                  <h3 className="text-xl font-serif font-medium">{currentCaseStudy.title} - Case</h3>
                  <button onClick={closeCaseStudy} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
               </div>
               <div className="p-8 space-y-8">
                  <div>
                     <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-2">O Desafio</h4>
                     <p className="text-gray-600 leading-relaxed text-sm">{currentCaseStudy.caseStudy?.challenge}</p>
                  </div>
                  <div>
                     <h4 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2">A Solução</h4>
                     <p className="text-gray-600 leading-relaxed text-sm">{currentCaseStudy.caseStudy?.solution}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-md border border-gray-100">
                     <h4 className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">O Resultado</h4>
                     <p className="text-offblack font-medium leading-relaxed">{currentCaseStudy.caseStudy?.result}</p>
                  </div>
               </div>
               <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-lg">
                  <button onClick={closeCaseStudy} className="w-full py-3 bg-white border border-gray-200 text-xs uppercase font-bold tracking-widest hover:bg-gray-100 rounded-md">Fechar</button>
               </div>
            </div>
         </div>
      )}

    </section>
  );
};

export default Projects;