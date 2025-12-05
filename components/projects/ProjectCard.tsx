import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, ChevronRight, Terminal } from 'lucide-react';
import Button from '../ui/Button';

// Reuse LazyImage logic but simplified
const LazyImage: React.FC<{ src: string; alt: string; onClick?: () => void }> = ({ src, alt, onClick }) => (
  <div className="relative w-full h-full overflow-hidden bg-slate-100" onClick={onClick}>
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.2,0,0,1)] hover:scale-105"
    />
  </div>
);

interface ProjectCardProps {
  project: any;
  index: number;
  isActiveFilter: boolean;
  openLightbox: (index: number) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, openLightbox }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImage, setCurrentImage] = useState(project.image);
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group flex flex-col lg:flex-row items-start gap-8 lg:gap-16 ${!isEven ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Visuals */}
      <div className="w-full lg:w-[50%] sticky top-32">
        <motion.div 
          className="relative w-full aspect-[16/11] overflow-hidden cursor-pointer rounded-[1.5rem] shadow-sm border border-slate-200/50 hover:border-slate-300 transition-colors"
          onClick={() => openLightbox(0)}
          whileHover={{ y: -5 }}
        >
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
            <LazyImage src={currentImage} alt={project.title} />
        </motion.div>
        
        {/* Thumbnails */}
        <div className={`flex gap-3 mt-4 ${!isEven ? 'justify-end' : ''}`}>
          {project.gallery.map((img: string, idx: number) => (
              <div 
                  key={idx} 
                  className={`w-16 h-12 md:w-20 md:h-14 flex-shrink-0 cursor-pointer transition-all duration-300 rounded-lg overflow-hidden border ${currentImage === img ? 'border-slate-900 ring-1 ring-slate-900/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  onMouseEnter={() => setCurrentImage(img)}
                  onClick={() => openLightbox(idx)}
              >
                <img src={img} className="w-full h-full object-cover" alt="" />
              </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-[50%]">
        <div className={`flex flex-col relative
          bg-white/40 backdrop-blur-xl
          p-8 md:p-10 rounded-[2rem] 
          border border-white/40
          shadow-[0_4px_20px_rgba(0,0,0,0.02)]
          ${!isEven ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'} 
        `}>
            <span className="inline-block px-3 py-1 bg-slate-100 text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-4 rounded-full">
              {project.category}
            </span>
            
            <h3 className="text-3xl md:text-4xl font-serif font-medium mb-4 text-slate-900 tracking-tight">
              {project.title}
            </h3>
            
            <p className={`text-slate-600 leading-relaxed mb-6 text-sm md:text-base font-light max-w-md ${!isEven ? 'lg:ml-auto' : ''}`}>
              {project.description}
            </p>
            
            <div className={`flex flex-wrap gap-2 mb-8 ${!isEven ? 'lg:justify-end' : ''}`}>
              {project.tags.map((tag: string, idx: number) => (
                <span key={idx} className="px-3 py-1 text-[9px] uppercase tracking-wider font-bold rounded-full border border-slate-200 bg-white/50 text-slate-600">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className={`gap-2 ${isExpanded ? 'bg-slate-900 text-white border-slate-900' : ''}`}
              >
                {isExpanded ? 'Fechar' : 'Ver Case'}
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
              </Button>
              
              <a href={project.link}>
                <Button variant="primary" size="sm" className="gap-2">
                  Live Demo <ArrowUpRight className="w-3 h-3" />
                </Button>
              </a>
            </div>

            {/* Case Study Expansion */}
            <motion.div 
              initial={false}
              animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
              className="overflow-hidden w-full"
            >
              <div className={`pt-8 border-t border-slate-200/50 space-y-8 ${!isEven ? 'text-right' : 'text-left'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                          <h4 className={`text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-2 flex items-center gap-2 ${!isEven ? 'justify-end' : ''}`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Desafio
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">{project.caseStudy?.challenge}</p>
                        </div>
                        <div>
                          <h4 className={`text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-2 flex items-center gap-2 ${!isEven ? 'justify-end' : ''}`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span> Solução
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">{project.caseStudy?.solution}</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Impacto</h4>
                          <p className="text-sm font-serif font-medium text-slate-900">{project.caseStudy?.result}</p>
                      </div>
                      
                      {project.caseStudy?.codeSnippet && (
                        <div className="bg-[#0d1117] p-4 rounded-xl border border-slate-800 text-left overflow-hidden relative group/code">
                          <div className="flex items-center gap-2 mb-2 text-slate-500 border-b border-slate-800 pb-2">
                            <Terminal size={10} /> <span className="text-[8px] uppercase tracking-widest font-bold">Code</span>
                          </div>
                          <pre className="text-[9px] font-mono leading-relaxed overflow-x-auto text-slate-300 scrollbar-thin">
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
    </motion.div>
  );
};