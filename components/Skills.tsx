import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
            Como posso ajudar você?
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Não vendo apenas código. Ofereço soluções completas que resolvem problemas reais. Aqui está como minhas habilidades se traduzem em valor para o seu projeto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILLS.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
              >
                <div className="w-12 h-12 bg-offblack text-white rounded-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                   <Icon size={24} />
                </div>
                
                <h3 className="text-xl font-serif font-medium mb-3">
                  {skill.title}
                </h3>
                
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {skill.description}
                </p>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Ferramentas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-sm">
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