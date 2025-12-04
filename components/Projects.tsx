import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

// Lazy Image Component
const LazyImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder / Skeleton */}
      <div className={`absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`} />
      
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

  // Extract unique tags for filter
  const allTags = ['Todos', ...Array.from(new Set(PROJECTS.flatMap(p => p.tags)))];

  // Filter Logic
  useEffect(() => {
    if (activeFilter === 'Todos') {
      setVisibleProjects(PROJECTS);
    } else {
      setVisibleProjects(PROJECTS.filter(p => p.tags.includes(activeFilter)));
    }
  }, [activeFilter]);

  // Lightbox Logic
  const openLightbox = (project: typeof PROJECTS[0]) => {
    setCurrentProject(project);
    setCurrentImageIndex(0);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setCurrentProject(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentProject) {
      setCurrentImageIndex((prev) => (prev + 1) % currentProject.gallery.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentProject) {
      setCurrentImageIndex((prev) => (prev - 1 + currentProject.gallery.length) % currentProject.gallery.length);
    }
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-offwhite relative">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">Portfólio Selecionado</p>
            <h2 className="text-4xl md:text-6xl font-serif font-medium leading-tight">
              Trabalhos recentes <br /> & estudos de caso.
            </h2>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-16 md:mb-20">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 text-xs md:text-sm uppercase tracking-widest transition-all duration-300 rounded-full border ${
                activeFilter === tag 
                  ? 'bg-black text-white border-black' 
                  : 'bg-transparent text-gray-500 border-gray-200 hover:border-black hover:text-black'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-24 md:gap-40">
          {visibleProjects.map((project, index) => (
            <div 
              key={`${project.title}-${index}`} 
              className={`group flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 md:gap-20 items-center animate-in fade-in slide-in-from-bottom-8 duration-700`}
            >
              {/* Image Section (Clickable) */}
              <div 
                className="w-full md:w-3/5 relative cursor-pointer"
                onClick={() => openLightbox(project)}
              >
                <div className="aspect-[16/10] bg-gray-100 overflow-hidden relative shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Maximize2 className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">Ver Galeria</span>
                    </div>
                  </div>
                  <LazyImage 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full grayscale group-hover:grayscale-0"
                  />
                </div>
              </div>

              {/* Text Section */}
              <div className="w-full md:w-2/5">
                <div className="flex flex-col h-full justify-center">
                  <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">
                    {project.category}
                  </span>
                  <h3 
                    className="text-3xl md:text-4xl font-serif font-medium mb-6 cursor-pointer hover:underline decoration-1 underline-offset-8"
                    onClick={() => openLightbox(project)}
                  >
                    {project.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-10">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 border border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-6">
                    <button 
                      onClick={() => openLightbox(project)}
                      className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:text-gray-600 transition-colors"
                    >
                      <Maximize2 className="w-4 h-4" />
                      Galeria
                    </button>
                    <a 
                      href={project.link} 
                      className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:text-gray-600 transition-colors group/link"
                    >
                      Visitar Site
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {visibleProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400 font-serif">Nenhum projeto encontrado com esta tecnologia.</p>
            </div>
          )}
        </div>
        
        <div className="mt-24 md:mt-32 text-center">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-block border-b border-black pb-1 text-sm uppercase tracking-widest hover:text-gray-600 hover:border-gray-600 transition-colors">
            Ver Arquivo Completo no GitHub
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && currentProject && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 z-50 transition-colors"
          >
            <X size={32} />
          </button>

          <button 
            onClick={prevImage}
            className="absolute left-4 md:left-8 text-white/50 hover:text-white p-2 transition-colors z-50"
          >
            <ChevronLeft size={48} />
          </button>

          <div className="w-full h-full p-4 md:p-12 flex flex-col items-center justify-center">
             <div className="relative max-w-7xl w-full h-full flex flex-col items-center justify-center">
                <img 
                  src={currentProject.gallery[currentImageIndex]} 
                  alt={`${currentProject.title} screenshot ${currentImageIndex + 1}`}
                  className="max-h-[80vh] max-w-full object-contain shadow-2xl"
                />
                
                <div className="absolute bottom-[-3rem] md:bottom-0 left-0 right-0 text-center text-white pb-4">
                  <h3 className="text-xl md:text-2xl font-serif mb-2">{currentProject.title}</h3>
                  <p className="text-xs uppercase tracking-widest text-white/50">
                    Imagem {currentImageIndex + 1} de {currentProject.gallery.length}
                  </p>
                </div>
             </div>
          </div>

          <button 
            onClick={nextImage}
            className="absolute right-4 md:right-8 text-white/50 hover:text-white p-2 transition-colors z-50"
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;