import React from 'react';
import { Reveal } from './ui/Reveal';
import { EDUCATION } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 md:py-48 bg-paper relative border-b border-petrol-base/10">
      <div className="container mx-auto px-6 md:px-12 xl:px-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Sticky Sidebar: Metadata (30%) */}
          <div className="lg:col-span-4 sticky top-32">
             <Reveal>
                <div className="space-y-8">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-petrol-base/40 mb-2 block">
                            Estúdio
                        </span>
                        <h2 className="text-3xl font-serif font-medium text-petrol-base leading-tight">
                            Victor Cardoso
                        </h2>
                    </div>

                    <div className="w-12 h-px bg-petrol-base/10"></div>

                    <div>
                        <span className="text-[10px] font-mono uppercase text-petrol-base/40 mb-1 block">Localização</span>
                        <p className="text-sm font-medium text-petrol-base">São Paulo, Brasil</p>
                    </div>

                    <div>
                        <span className="text-[10px] font-mono uppercase text-petrol-base/40 mb-1 block">E-mail</span>
                        <a href="mailto:contato@seudominio.com" className="text-sm font-medium text-petrol-base hover:text-petrol-electric transition-colors">contato@victor.dev</a>
                    </div>

                    <div>
                        <span className="text-[10px] font-mono uppercase text-petrol-base/40 mb-1 block">Status</span>
                        <div className="flex items-center gap-2">
                             <span className="w-1.5 h-1.5 bg-petrol-electric rounded-full animate-pulse"></span>
                             <span className="text-sm font-medium text-petrol-base">Disponível para projetos</span>
                        </div>
                    </div>
                </div>
             </Reveal>
          </div>

          {/* Right: Content Manifesto (70%) */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* Manifesto */}
            <div>
              <Reveal delay={100}>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-petrol-base/40 mb-8">Manifesto</h3>
                <div className="space-y-8 text-petrol-ink leading-relaxed text-xl md:text-2xl font-light font-serif">
                  <p>
                    Não acredito em código sem propósito. Meu trabalho existe na interseção exata entre <span className="italic text-petrol-base">engenharia robusta</span> e <span className="italic text-petrol-base">design emocional</span>.
                  </p>
                  <p>
                    Diferente de agências tradicionais que entregam apenas interfaces, minha abordagem "Engineering-First" garante que a beleza visual seja sustentada por uma arquitetura escalável, segura e performática.
                  </p>
                  <p>
                     Elimino a barreira técnica entre sua visão e o mercado.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Principles (Typography Only) */}
            <div>
               <Reveal delay={200}>
                   <h3 className="text-[10px] font-bold uppercase tracking-widest text-petrol-base/40 mb-8 border-b border-petrol-base/10 pb-4">Princípios</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8">
                       <div>
                           <span className="text-sm font-mono text-petrol-electric mb-2 block">01.</span>
                           <h4 className="text-lg font-bold text-petrol-base mb-2">Visão de Negócio</h4>
                           <p className="text-sm text-petrol-ink/60 font-light">Código é meio, não fim. Foco total no ROI e conversão.</p>
                       </div>
                       <div>
                           <span className="text-sm font-mono text-petrol-electric mb-2 block">02.</span>
                           <h4 className="text-lg font-bold text-petrol-base mb-2">Performance Obsessiva</h4>
                           <p className="text-sm text-petrol-ink/60 font-light">Cada milissegundo conta. Otimização profunda de Core Web Vitals.</p>
                       </div>
                       <div>
                           <span className="text-sm font-mono text-petrol-electric mb-2 block">03.</span>
                           <h4 className="text-lg font-bold text-petrol-base mb-2">Design System</h4>
                           <p className="text-sm text-petrol-ink/60 font-light">Consistência visual e reutilização de código para escalar rápido.</p>
                       </div>
                       <div>
                           <span className="text-sm font-mono text-petrol-electric mb-2 block">04.</span>
                           <h4 className="text-lg font-bold text-petrol-base mb-2">Autonomia</h4>
                           <p className="text-sm text-petrol-ink/60 font-light">Você no controle. Entregas documentadas e fáceis de manter.</p>
                       </div>
                   </div>
               </Reveal>
            </div>

            {/* Education List */}
            <div>
               <Reveal delay={300}>
                   <h3 className="text-[10px] font-bold uppercase tracking-widest text-petrol-base/40 mb-8 border-b border-petrol-base/10 pb-4">Formação</h3>
                   <ul className="space-y-6">
                      {EDUCATION.map((edu, idx) => (
                          <li key={idx} className="group">
                              <div className="flex justify-between items-baseline mb-1">
                                  <span className="text-lg font-serif font-medium text-petrol-base group-hover:text-petrol-mid transition-colors">{edu.degree}</span>
                                  <span className="text-xs font-mono text-petrol-base/40">{edu.period && edu.period.split(' - ')[0]}</span>
                              </div>
                              <span className="text-sm text-petrol-ink/60 font-light block">{edu.institution}</span>
                          </li>
                      ))}
                   </ul>
               </Reveal>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;