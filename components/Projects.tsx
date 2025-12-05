import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal } from './ui/Reveal';
import { TextReveal } from './ui/TextReveal';
import { FilterBar } from './projects/FilterBar';
import { ProjectCard } from './projects/ProjectCard';
import { ProjectModal } from './projects/ProjectModal';

// Using Lenis requires us to stop propagation if we want to lock scroll, 
// or simply rely on the modal covering everything. For simple modals, 
// preventing pointer events on body usually suffices, but proper scroll locking
// with Lenis involves `lenis.stop()` which we access via context or prop if needed.
// For now, we use standard body overflow hidden.

const Projects: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [lightboxState, setLightboxState] = useState<{ project: typeof PROJECTS[0] | null, index: number }>({ project: null, index: 0 });
  
  // Unique Tags
  const uniqueTags = Array.from(new Set(PROJECTS.flatMap(p => p.tags))).sort();

  // Filter Logic
  const filteredProjects = activeFilters.length === 0 
    ? PROJECTS 
    : PROJECTS.filter(p => p.tags.some(tag => activeFilters.includes(tag)));

  const toggleFilter = (tag: string) => {
    setActiveFilters(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const clearFilters = () => setActiveFilters([]);

  // Lightbox Handlers
  const openLightbox = (project: typeof PROJECTS[0], index: number) => {
    setLightboxState({ project, index });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxState({ project: null, index: 0 });
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    if (!lightboxState.project) return;
    const next = (lightboxState.index + 1) % lightboxState.project.gallery.length;
    setLightboxState(prev => ({ ...prev, index: next }));
  };

  const prevImage = () => {
    if (!lightboxState.project) return;
    const prev = (lightboxState.index - 1 + lightboxState.project.gallery.length) % lightboxState.project.gallery.length;
    setLightboxState(prev => ({ ...prev, index: prev }));
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-20 flex flex-col items-center max-w-4xl mx-auto text-center">
            <Reveal width="100%">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block">Portfolio</span>
            </Reveal>
            <TextReveal width="100%" className="flex justify-center">
              <h2 className="text-4xl md:text-6xl font-serif font-medium mb-8 text-slate-900 tracking-tight">
                Projetos Selecionados
              </h2>
            </TextReveal>
            
            <FilterBar 
              uniqueTags={uniqueTags} 
              activeFilters={activeFilters} 
              toggleFilter={toggleFilter} 
              clearFilters={clearFilters} 
            />
        </div>

        {/* Projects Grid with Layout Animation */}
        <motion.div layout className="flex flex-col gap-20">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.title} 
                project={project} 
                index={index} 
                isActiveFilter={activeFilters.length > 0}
                openLightbox={(idx) => openLightbox(project, idx)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-slate-400 font-serif text-xl">Nenhum projeto encontrado com esses filtros.</p>
              <button onClick={clearFilters} className="text-slate-900 underline mt-4 hover:text-slate-600">Limpar filtros</button>
           </motion.div>
        )}
      </div>

      <ProjectModal 
        isOpen={!!lightboxState.project}
        project={lightboxState.project}
        currentIndex={lightboxState.index}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
};

export default Projects;