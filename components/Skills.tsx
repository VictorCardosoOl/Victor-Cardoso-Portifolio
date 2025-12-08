
import React from 'react';
import { SKILLS } from '../constants';
import { Reveal } from './ui/Reveal';
import Tilt from './ui/Tilt';
import { CheckCircle2 } from 'lucide-react';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-6 md:px-12 xl:px-20">
        
        {/* Header Section */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <Reveal width="100%" variant="blur">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block">Expertise</span>
          </Reveal>
          <Reveal width="100%" variant="translate">
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6 text-slate-900 tracking-tight">
              Como posso agregar valor?
            </h2>
          </Reveal>
          <Reveal width="100%" variant="translate" delay={100}>
            <p className="text-slate-600 leading-relaxed font-light text-lg">
              Uma abordagem T-Shaped: profundo conhecimento em engenharia de software com ampla capacidade em design e produto.
            </p>
          </Reveal>
        </div>

        {/* Uniform Grid Layout with Tilt and Scale Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {SKILLS.map((skill, index) => {
            const Icon = skill.icon;
            
            return (
              <Reveal key={index} delay={index * 150} width="100%" variant="scale">
                <Tilt strength={10} className="h-full">
                  <div 
                    className="h-full glass-card p-8 md:p-10 rounded-[2.5rem] border border-slate-200/60 hover:border-slate-300 transition-all duration-500 flex flex-col bg-white/40 shadow-sm hover:shadow-2xl"
                  >
                    {/* Header */}
                    <div className="mb-6 transform transition-transform duration-500 hover:translate-z-10" style={{ transformStyle: 'preserve-3d' }}>
                      <div className="w-14 h-14 bg-white text-slate-900 rounded-2xl flex items-center justify-center shadow-sm mb-6 border border-slate-100">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      
                      <h3 className="text-2xl font-serif font-medium mb-3 text-slate-900">
                        {skill.title}
                      </h3>
                      
                      <p className="text-sm text-slate-500 leading-relaxed font-light">
                        {skill.description}
                      </p>
                    </div>

                    {/* Tech List */}
                    <div className="mt-auto pt-6 border-t border-slate-200/50">
                      <ul className="space-y-3">
                        {skill.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                            <CheckCircle2 size={14} className="text-slate-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;