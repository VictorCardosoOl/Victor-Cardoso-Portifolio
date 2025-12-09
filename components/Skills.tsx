
import React from 'react';
import { SKILLS } from '../constants';
import { Reveal } from './ui/Reveal';
import Tilt from './ui/Tilt';
import { CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 md:py-32 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 xl:px-20">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24 max-w-2xl mx-auto">
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

        {/* 
            Smart Grid Layout:
            - Mobile: 1 Column
            - Tablet: 2 Columns (Last item spans full width for balance)
            - Desktop: 3 Columns
        */}
        {/* Increased gap from 6/10 to 8/12 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
          {SKILLS.map((skill, index) => {
            const Icon = skill.icon;
            
            // Logic for the last item to span 2 columns on tablet devices
            const isLastItem = index === SKILLS.length - 1;
            const gridClasses = isLastItem ? "md:col-span-2 lg:col-span-1" : "";

            return (
              <div key={index} className={gridClasses}>
                <Reveal delay={index * 150} width="100%" variant="scale" className="h-full">
                  <Tilt strength={8} className="h-full">
                    <div 
                      className={clsx(
                        // Increased padding from p-8 to p-10/p-14
                        "h-full glass-card p-10 md:p-14 rounded-[2.5rem] border border-slate-200/60 hover:border-slate-300 transition-all duration-500 flex flex-col bg-white/40 shadow-sm hover:shadow-2xl",
                        // On tablet, if it spans 2 cols, we can add a bit more horizontal padding or keep it standard
                        isLastItem && "md:px-16"
                      )}
                    >
                      {/* Header */}
                      <div className="mb-8 transform transition-transform duration-500 hover:translate-z-10" style={{ transformStyle: 'preserve-3d' }}>
                        <div className="w-14 h-14 bg-white text-slate-900 rounded-2xl flex items-center justify-center shadow-sm mb-6 border border-slate-100">
                          <Icon size={24} strokeWidth={1.5} />
                        </div>
                        
                        <h3 className="text-2xl font-serif font-medium mb-3 text-slate-900">
                          {skill.title}
                        </h3>
                        
                        <p className="text-sm text-slate-500 leading-relaxed font-light max-w-sm">
                          {skill.description}
                        </p>
                      </div>

                      {/* Tech List */}
                      <div className="mt-auto pt-6 border-t border-slate-200/50">
                        <ul className={clsx(
                          "grid gap-3",
                          // On wide span (tablet), use 2 cols for the list for better use of space
                          isLastItem ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-1" : "grid-cols-1"
                        )}>
                          {skill.items.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                              <CheckCircle2 size={16} className="text-slate-400 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Tilt>
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
