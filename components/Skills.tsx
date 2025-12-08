import React from 'react';
import { SKILLS } from '../constants';
import { Reveal } from './ui/Reveal';
import { CheckCircle2 } from 'lucide-react';
import Magnetic from './ui/Magnetic';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-6 md:px-12 xl:px-20">
        
        {/* Header Section */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <Reveal width="100%">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 block">Expertise</span>
            <h2 className="text-4xl md:text-6xl font-serif font-medium mb-6 text-slate-900 tracking-tight">
              Como posso agregar valor?
            </h2>
            <p className="text-slate-600 leading-relaxed font-light text-lg">
              Uma abordagem T-Shaped: profundo conhecimento em engenharia de software com ampla capacidade em design e produto.
            </p>
          </Reveal>
        </div>

        {/* Uniform Grid Layout - Cleaner and more professional */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {SKILLS.map((skill, index) => {
            const Icon = skill.icon;
            
            return (
              <div key={index} className="h-full">
                <Reveal delay={index * 150} width="100%">
                  <Magnetic strength={0.05}>
                    <div 
                      className="h-full glass-card p-8 md:p-12 rounded-[3rem] border border-slate-200/60 hover:border-slate-300 transition-all duration-500 hover:-translate-y-2 flex flex-col bg-white/40 shadow-sm hover:shadow-2xl"
                    >
                      {/* Header */}
                      <div className="mb-8">
                        <div className="w-16 h-16 bg-white text-slate-900 rounded-3xl flex items-center justify-center shadow-sm mb-8 border border-slate-100">
                          <Icon size={28} strokeWidth={1.5} />
                        </div>
                        
                        <h3 className="text-3xl font-serif font-medium mb-4 text-slate-900">
                          {skill.title}
                        </h3>
                        
                        <p className="text-sm text-slate-500 leading-relaxed font-light">
                          {skill.description}
                        </p>
                      </div>

                      {/* Tech List */}
                      <div className="mt-auto pt-8 border-t border-slate-200/50">
                        <ul className="space-y-4">
                          {skill.items.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                              <CheckCircle2 size={16} className="text-slate-400" strokeWidth={1.5} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Magnetic>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;