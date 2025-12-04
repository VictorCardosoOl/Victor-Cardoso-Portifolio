import React from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 md:py-32 bg-offwhite">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20 md:mb-32">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">Portfólio Selecionado</p>
          <h2 className="text-4xl md:text-6xl font-serif font-medium leading-tight">
            Trabalhos recentes <br /> & estudos de caso.
          </h2>
        </div>

        <div className="flex flex-col gap-24 md:gap-40">
          {PROJECTS.map((project, index) => (
            <div 
              key={index} 
              className={`group flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 md:gap-20 items-center`}
            >
              {/* Image Section */}
              <div className="w-full md:w-3/5 overflow-hidden relative">
                <div className="aspect-[16/10] overflow-hidden bg-gray-200 relative">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                  />
                </div>
              </div>

              {/* Text Section */}
              <div className="w-full md:w-2/5">
                <div className="flex flex-col h-full justify-center">
                  <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif font-medium mb-6 group-hover:underline decoration-1 underline-offset-8">
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

                  <a 
                    href={project.link} 
                    className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:text-gray-600 transition-colors group/link"
                  >
                    Ver Projeto
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-24 md:mt-32 text-center">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-block border-b border-black pb-1 text-sm uppercase tracking-widest hover:text-gray-600 hover:border-gray-600 transition-colors">
            Ver Arquivo Completo no GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;