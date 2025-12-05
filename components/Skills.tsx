import React from 'react';
import { SKILLS } from '../constants';
import { Reveal } from './ui/Reveal';
import { ArrowUpRight } from 'lucide-react';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block">Expertise</span>
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6 text-slate-900 tracking-tight">
              Como posso agregar valor?
            </h2>
            <p className="text-slate-600 leading-relaxed font-light text-lg">
              Soluções completas que resolvem problemas reais. Traduzo complexidade técnica em valor tangível.
            </p>
          </Reveal>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {SKILLS.map((skill, index) => {
            const Icon = skill.icon;
            // First item spans 2 cols, others 1. 
            // NOTE: Adjusted logic to make layout interesting. 
            // Item 0: Large (md:col-span-2)
            // Item 1: Tall/Standard
            // Item 2: Wide (md:col-span-3 or split?)
            
            const isLarge = index === 0;
            const spanClass = isLarge ? "md:col-span-2" : "md:col-span-1";
            
            return (
              <div key={index} className={`${spanClass} h-full`}>
                <Reveal delay={index * 150} width="100%">
                  <div 
                    className="h-full glass-card p-10 rounded-[2.5rem] border border-slate-200/50 hover:border-slate-300 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between group bg-white/40"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-8">
                        <div className="w-14 h-14 bg-white text-slate-900 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                          <Icon size={24} strokeWidth={1.5} />
                        </div>
                        <ArrowUpRight className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                      </div>
                      
                      <h3 className="text-2xl font-serif font-medium mb-4 text-slate-900">
                        {skill.title}
                      </h3>
                      
                      <p className="text-sm text-slate-600 leading-relaxed font-light mb-8 max-w-md">
                        {skill.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-200/50">
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white/60 text-slate-700 text-[10px] uppercase font-bold tracking-wider rounded-full border border-slate-100">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
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