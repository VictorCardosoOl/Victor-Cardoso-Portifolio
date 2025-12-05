import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block">Expertise</span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 text-slate-800">
            Como posso ajudar você?
          </h2>
          <p className="text-slate-500 leading-relaxed font-light text-lg">
            Não vendo apenas código. Ofereço soluções completas que resolvem problemas reais. Traduzo complexidade técnica em valor tangível.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {SKILLS.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div 
                key={index} 
                className="glass-card p-10 rounded-[2.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(100,116,139,0.1)] transition-all duration-300 border-white/60 group hover:-translate-y-2 hover:bg-white/60"
              >
                <div className="w-14 h-14 bg-slate-50 text-slate-700 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-slate-800 group-hover:text-white transition-colors duration-300 shadow-inner">
                   <Icon size={26} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-serif font-medium mb-4 text-slate-800">
                  {skill.title}
                </h3>
                
                <p className="text-sm text-slate-500 leading-relaxed mb-8 font-light">
                  {skill.description}
                </p>

                <div className="border-t border-slate-100/50 pt-6">
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/50 text-slate-500 text-[10px] uppercase font-bold tracking-wider rounded-full border border-white/50 group-hover:border-slate-200 transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;