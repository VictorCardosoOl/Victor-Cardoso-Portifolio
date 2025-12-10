
import React from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

export const ProjectDetailContent: React.FC<{ project: typeof PROJECTS[0] }> = ({ project }) => {
  return (
    <div className="container mx-auto px-4 md:px-20 py-8 md:py-16 max-w-7xl">
      <div className="w-full h-[40vh] md:h-[60vh] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden mb-10 md:mb-16 shadow-lg relative group">
         <img 
           src={project.image} 
           alt={project.title} 
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-slate-900/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24">
         {/* Sidebar Info */}
         <div className="lg:col-span-4 space-y-8 md:space-y-10">
            <div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Sobre o Projeto</h3>
               <p className="text-slate-800 leading-relaxed font-light text-lg">
                 {project.description}
               </p>
            </div>
            
            <div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Stack Tecnológico</h3>
               <div className="flex flex-wrap gap-2">
                 {project.tags.map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-600">
                      {tag}
                    </span>
                 ))}
               </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
               <a 
                 href={project.link} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all hover:scale-105 shadow-xl"
               >
                 Acessar Online <ArrowUpRight size={14} />
               </a>
            </div>
         </div>

         {/* Case Study Content */}
         <div className="lg:col-span-8">
            <h3 className="text-3xl md:text-5xl font-serif font-medium text-slate-900 mb-8 md:mb-12">Processo Criativo</h3>
            
            <div className="space-y-6">
               <div className="group bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 hover:border-slate-200 shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-4 mb-6">
                     <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">01</span>
                     <h4 className="text-xl font-serif font-bold text-slate-900">O Desafio</h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-light text-base md:text-lg pl-12 border-l-2 border-slate-100">{project.caseStudy.challenge}</p>
               </div>

               <div className="group bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 hover:border-slate-200 shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center gap-4 mb-6">
                     <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">02</span>
                     <h4 className="text-xl font-serif font-bold text-slate-900">A Solução</h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-light text-base md:text-lg pl-12 border-l-2 border-slate-100">{project.caseStudy.solution}</p>
               </div>

               <div className="group bg-slate-900 p-8 md:p-10 rounded-[2rem] shadow-xl text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10">
                     <div className="flex items-center gap-4 mb-6">
                        <span className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">03</span>
                        <h4 className="text-xl font-serif font-bold text-white">Resultados</h4>
                     </div>
                     <p className="text-slate-300 leading-relaxed font-light text-base md:text-lg pl-12 border-l-2 border-slate-700">{project.caseStudy.result}</p>
                  </div>
               </div>
            </div>

            {/* Gallery Grid */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="mt-16">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Galeria do Projeto</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.gallery.map((img, idx) => (
                      <div key={idx} className="rounded-2xl overflow-hidden h-64 border border-slate-100">
                         <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                      </div>
                    ))}
                 </div>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};
