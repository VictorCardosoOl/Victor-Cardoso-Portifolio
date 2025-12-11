import React from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, CheckCircle2, Layers, Cpu, BarChart } from 'lucide-react';
import { Reveal } from './ui/Reveal';

interface ProjectDetailContentProps {
  project: typeof PROJECTS[0];
}

export const ProjectDetailContent: React.FC<ProjectDetailContentProps> = ({ project }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16">
      
      {/* Hero Image */}
      <div className="w-full aspect-video rounded-[2rem] overflow-hidden mb-12 shadow-xl border border-slate-200 bg-slate-100 relative group">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
           <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 pb-2">
                Dados do Projeto
              </h3>
              
              <div className="space-y-6">
                 <div>
                    <span className="block text-xs text-slate-500 mb-1">Cliente / Ano</span>
                    <span className="text-base font-serif font-medium text-slate-900">{project.title} &mdash; {project.year}</span>
                 </div>
                 
                 <div>
                    <span className="block text-xs text-slate-500 mb-1">Serviços</span>
                    <span className="text-base font-medium text-slate-900">{project.category}</span>
                 </div>

                 <div>
                    <span className="block text-xs text-slate-500 mb-2">Tecnologias</span>
                    <div className="flex flex-wrap gap-2">
                       {project.tags.map((tag, i) => (
                         <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-600">
                           {tag}
                         </span>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                 <a 
                   href={project.link} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all hover:scale-[1.02]"
                 >
                   Ver Online <ArrowUpRight size={14} />
                 </a>
              </div>
           </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8 order-1 lg:order-2 space-y-12">
           <Reveal width="100%">
             <h3 className="text-3xl md:text-5xl font-serif font-medium text-slate-900 leading-tight">
               Transformando desafios complexos em experiência digital.
             </h3>
           </Reveal>

           <Reveal delay={100} width="100%">
             <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed">
               {project.description} Este projeto representa um marco na aplicação de tecnologias modernas para resolver dores reais de negócio. O foco foi criar uma interface que não apenas fosse esteticamente agradável, mas que convertesse visitantes em clientes fiéis.
             </p>
           </Reveal>

           {/* Case Study Section */}
           {project.caseStudy && (
             <div className="space-y-12 pt-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="p-8 bg-slate-100/50 rounded-[2rem] border border-slate-200/50">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-slate-900">
                        <Layers size={20} />
                      </div>
                      <h4 className="text-xl font-serif font-medium text-slate-900 mb-3">O Desafio</h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-light">
                        {project.caseStudy.challenge}
                      </p>
                   </div>
                   <div className="p-8 bg-slate-100/50 rounded-[2rem] border border-slate-200/50">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-slate-900">
                        <Cpu size={20} />
                      </div>
                      <h4 className="text-xl font-serif font-medium text-slate-900 mb-3">A Solução</h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-light">
                        {project.caseStudy.solution}
                      </p>
                   </div>
                </div>

                <div className="p-8 md:p-10 bg-slate-900 text-white rounded-[2rem] relative overflow-hidden">
                   <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <BarChart className="text-green-400" />
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Resultados Chave</h4>
                      </div>
                      <p className="text-2xl md:text-3xl font-serif font-medium leading-tight">
                        "{project.caseStudy.result}"
                      </p>
                   </div>
                   <div className="absolute right-0 bottom-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-16 -mb-16"></div>
                </div>

             </div>
           )}

           {/* Gallery Grid */}
           {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-6 pt-10">
                 <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Galeria do Projeto</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {project.gallery.map((img, idx) => (
                       <div key={idx} className={`rounded-[1.5rem] overflow-hidden border border-slate-200 shadow-sm ${idx === 0 ? 'md:col-span-2 aspect-[2/1]' : 'aspect-square'}`}>
                          <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
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