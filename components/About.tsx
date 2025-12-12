
import React from 'react';
import { Reveal } from './ui/Reveal';
import { EDUCATION } from '../constants';
import { Layers, Zap, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const PhilosophyGrid = () => {
  const principles = [
    {
      icon: Layers,
      title: "Visão de Negócio",
      desc: "Código é meio, não fim. Foco no ROI."
    },
    {
      icon: Zap,
      title: "Performance",
      desc: "Cada milissegundo conta para conversão."
    },
    {
      icon: Shield,
      title: "Robustez",
      desc: "Sistemas estáveis que escalam com você."
    },
    {
      icon: Users,
      title: "Autonomia",
      desc: "Você no controle da sua plataforma."
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {principles.map((p, i) => (
        <div 
          key={i} 
          className="bg-surface p-6 rounded-[1.5rem] border border-charcoal/5 hover:border-charcoal/10 transition-colors"
        >
          <p.icon size={20} strokeWidth={1.5} className="text-charcoal mb-3" />
          <h4 className="text-sm font-bold text-charcoal mb-1">{p.title}</h4>
          <p className="text-xs text-charcoal/60 font-light leading-relaxed">{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 md:py-48 bg-paper relative">
      <div className="container mx-auto px-6 md:px-12 xl:px-20">
        
        {/* Title Area */}
        <div className="mb-20 md:mb-32">
            <Reveal>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40 mb-4 block">
                    The Studio
                </span>
                <h2 className="text-4xl md:text-6xl font-serif font-medium text-charcoal leading-tight max-w-3xl">
                    Um parceiro técnico para negócios que buscam excelência digital.
                </h2>
            </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: Narrative */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="space-y-8 text-charcoal/70 leading-relaxed text-lg font-light">
                <p>
                  Meu objetivo é simples: eliminar a barreira técnica entre a sua ideia e o mercado. Atuo na interseção entre engenharia de software e design de produto.
                </p>
                <p>
                  Diferente de agências tradicionais que focam apenas na entrega visual, minha abordagem é "Engineering-First". Garanto que a beleza da interface seja sustentada por uma arquitetura de código sólida, segura e de alta performance.
                </p>
                <p>
                   Seja criando uma plataforma SaaS do zero ou otimizando um e-commerce para a Black Friday, meu compromisso é com o impacto mensurável no seu faturamento.
                </p>
              </div>
            </Reveal>

            {/* Absorbed Education Section - Minimalist List */}
            <div className="mt-16 pt-12 border-t border-charcoal/5">
               <Reveal delay={200}>
                   <h3 className="text-xs font-bold uppercase tracking-widest text-charcoal/40 mb-6">Background Acadêmico</h3>
                   <ul className="space-y-6">
                      {EDUCATION.map((edu, idx) => (
                          <li key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                              <span className="text-base font-serif font-medium text-charcoal">{edu.degree}</span>
                              <span className="hidden sm:inline-block w-full border-b border-charcoal/5 flex-1 mx-2"></span>
                              <span className="text-sm text-charcoal/50 font-light">{edu.institution} <span className="text-charcoal/20">/</span> {edu.period && edu.period.split(' - ')[0]}</span>
                          </li>
                      ))}
                   </ul>
               </Reveal>
            </div>
          </div>

          {/* Right: Philosophy & Stats */}
          <div className="lg:col-span-5">
            <Reveal delay={300} width="100%">
               <div className="sticky top-32 space-y-12">
                   <div>
                       <h3 className="text-xs font-bold uppercase tracking-widest text-charcoal/40 mb-6">Mindset</h3>
                       <PhilosophyGrid />
                   </div>

                   {/* Minimal Stats */}
                   <div className="flex justify-between items-center px-4 py-8 border-t border-b border-charcoal/5">
                       <div className="text-center">
                           <span className="block text-3xl font-serif text-charcoal">4+</span>
                           <span className="text-[9px] uppercase tracking-widest text-charcoal/40">Anos Exp.</span>
                       </div>
                       <div className="w-[1px] h-8 bg-charcoal/5"></div>
                       <div className="text-center">
                           <span className="block text-3xl font-serif text-charcoal">100%</span>
                           <span className="text-[9px] uppercase tracking-widest text-charcoal/40">On Time</span>
                       </div>
                       <div className="w-[1px] h-8 bg-charcoal/5"></div>
                       <div className="text-center">
                           <span className="block text-3xl font-serif text-charcoal">20+</span>
                           <span className="text-[9px] uppercase tracking-widest text-charcoal/40">Projetos</span>
                       </div>
                   </div>
               </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
