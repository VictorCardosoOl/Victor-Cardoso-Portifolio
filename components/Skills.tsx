import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 md:py-32 bg-gray-50 rounded-[3rem] -mt-10 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Expertise</span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 text-offblack">
            Como posso ajudar você?
          </h2>
          <p className="text-gray-500 leading-relaxed font-light text-lg">
            Não vendo apenas código. Ofereço soluções completas que resolvem problemas reais. Traduzo complexidade técnica em valor tangível para o seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {SKILLS.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-10 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gray-50 text-offblack rounded-2xl flex items-center justify-center mb-8 group-hover:bg-offblack group-hover:text-white transition-colors duration-300 shadow-inner">
                   <Icon size={26} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-serif font-medium mb-4 text-offblack">
                  {skill.title}
                </h3>
                
                <p className="text-sm text-gray-500 leading-relaxed mb-8 font-light">
                  {skill.description}
                </p>

                <div className="border-t border-gray-100 pt-6">
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-wider rounded-full border border-transparent group-hover:border-gray-200 transition-colors">
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