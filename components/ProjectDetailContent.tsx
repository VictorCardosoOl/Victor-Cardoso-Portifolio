import React from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, ArrowRight, X } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { motion } from 'framer-motion';

const MotionImg = motion.img as any;
const MotionH1 = motion.h1 as any;

interface ProjectDetailContentProps {
  project: typeof PROJECTS[0];
  layoutId?: string;
}

export const ProjectDetailContent: React.FC<ProjectDetailContentProps> = ({ project, layoutId }) => {
  return (
    <div className="bg-[#F2F4F6] min-h-screen">
      
      {/* 1. CINEMATIC HERO */}
      <div className="w-full h-[60vh] md:h-[75vh] relative overflow-hidden bg-[#0B232E]">
        {/* Parallax Image using layoutId for smooth transition from card */}
        <MotionImg 
          layoutId={layoutId}
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-80"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }} // Custom bezier for premium feel
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B232E] via-[#0B232E]/20 to-transparent opacity-90"></div>
        
        {/* Title Block */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 z-10">
            <Reveal>
                <MotionH1 
                    layoutId={`project-title-${project.title}`}
                    className="text-5xl md:text-7xl lg:text-9xl font-serif font-medium text-[#F2F4F6] tracking-tighter leading-[0.9] mb-8"
                >
                  {project.title}
                </MotionH1>
            </Reveal>
            
            <Reveal delay={100}>
                <div className="flex flex-wrap items-center gap-6 text-[#F2F4F6]/80 border-t border-white/10 pt-6">
                   <div className="flex flex-col">
                       <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-1">Ano</span>
                       <span className="font-mono text-sm">{project.year}</span>
                   </div>
                   <div className="flex flex-col">
                       <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-1">Categoria</span>
                       <span className="font-mono text-sm">{project.category}</span>
                   </div>
                </div>
            </Reveal>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24 relative z-10 bg-[#F2F4F6]">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-24">
            
            {/* 2. SIDEBAR METADATA (Sticky) */}
            <div className="lg:col-span-3 order-2 lg:order-1">
               <div className="sticky top-24 space-y-12">
                   <div>
                      <span className="block text-[9px] font-bold uppercase tracking-widest text-[#0B232E]/40 mb-4 border-b border-[#0B232E]/10 pb-2">Stack</span>
                      <div className="flex flex-col gap-3">
                        {project.tags.map((tag, i) => (
                           <div key={i} className="flex items-center gap-2 text-sm text-[#0B232E] font-medium">
                              <span className="w-1.5 h-1.5 bg-[#78909C] rounded-full"></span> {tag}
                           </div>
                        ))}
                      </div>
                   </div>

                   <div>
                      <span className="block text-[9px] font-bold uppercase tracking-widest text-[#0B232E]/40 mb-4 border-b border-[#0B232E]/10 pb-2">Ação</span>
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#0B232E] hover:text-[#78909C] transition-colors group"
                      >
                        Visitar Live <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                   </div>
               </div>
            </div>

            {/* 3. MAIN CONTENT */}
            <div className="lg:col-span-9 order-1 lg:order-2">
               
               {/* Lead Paragraph */}
               <div className="mb-24">
                  <Reveal width="100%">
                    <p className="text-xl md:text-3xl lg:text-4xl font-serif font-light text-[#0B232E] leading-[1.4] indent-12 md:indent-24">
                      {project.description} Este projeto exigiu uma reinvenção completa da arquitetura frontend para atender aos requisitos de performance e estética simultaneamente. A integração entre design e engenharia foi o pilar central.
                    </p>
                  </Reveal>
               </div>

               {/* Case Study Details */}
               {project.caseStudy && (
                 <>
                    {/* Challenge & Solution Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-32 border-t border-[#0B232E]/10 pt-16">
                       <Reveal>
                          <span className="text-xs font-mono text-[#78909C] mb-4 block uppercase tracking-widest">01 / O Problema</span>
                          <h3 className="text-2xl font-serif font-medium text-[#0B232E] mb-6">{project.caseStudy.challenge}</h3>
                          <p className="text-sm text-[#0B232E]/60 leading-relaxed">
                            Identificamos gargalos significativos na experiência do usuário anterior, resultando em métricas de retenção abaixo do esperado.
                          </p>
                       </Reveal>
                       
                       <Reveal delay={100}>
                          <span className="text-xs font-mono text-[#78909C] mb-4 block uppercase tracking-widest">02 / A Solução</span>
                          <h3 className="text-2xl font-serif font-medium text-[#0B232E] mb-6">{project.caseStudy.solution}</h3>
                          <p className="text-sm text-[#0B232E]/60 leading-relaxed">
                             Reconstruímos a aplicação utilizando tecnologias de ponta, focando em renderização no servidor (SSR) e otimização de assets.
                          </p>
                       </Reveal>
                    </div>

                    {/* Results Banner (Performance Optimized) */}
                    <Reveal width="100%">
                        <div className="bg-[#0B232E] text-white p-8 md:p-16 rounded-sm relative overflow-hidden mb-32 group">
                             {/* Static Gradient Background instead of heavy blurs */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#153A48] to-[#0B232E] opacity-50"></div>
                            
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-6 block">Resultados Chave</span>
                                    <h4 className="text-6xl md:text-9xl font-serif font-medium tracking-tighter leading-[0.8] mb-4">
                                        {project.caseStudy.result.split(' ').find(w => w.includes('%') || w.match(/\d/)) || "10x"}
                                    </h4>
                                    <p className="text-lg text-white/70 font-light max-w-sm">{project.caseStudy.result}</p>
                                </div>
                                
                                <div className="space-y-8 w-full md:w-auto">
                                    <div className="flex flex-col border-b border-white/10 pb-4">
                                        <span className="text-3xl font-serif">100/100</span>
                                        <span className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Lighthouse Score</span>
                                    </div>
                                    <div className="flex flex-col border-b border-white/10 pb-4">
                                        <span className="text-3xl font-serif">{'<'} 100ms</span>
                                        <span className="text-[10px] uppercase tracking-widest text-white/40 mt-1">TTFB (Latência)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                 </>
               )}

               {/* Gallery */}
               {project.gallery && project.gallery.length > 0 && (
                  <div className="space-y-12">
                     <div className="flex items-center justify-between border-b border-[#0B232E]/10 pb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B232E]/40">Galeria do Projeto</span>
                     </div>
                     
                     <div className="flex flex-col gap-8 md:gap-16">
                        {project.gallery.map((img, idx) => (
                           <Reveal key={idx} width="100%">
                               <div className="relative w-full shadow-lg bg-[#0B232E]/5">
                                  <img 
                                    src={img} 
                                    alt={`Gallery ${idx}`} 
                                    loading="lazy"
                                    className="w-full h-auto object-cover" 
                                  />
                               </div>
                           </Reveal>
                        ))}
                     </div>
                  </div>
               )}

            </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-32 pt-12 border-t border-[#0B232E]/10 flex justify-end">
            <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#0B232E] hover:text-[#78909C] transition-colors group">
                Próximo Projeto <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>

      </div>
    </div>
  );
};