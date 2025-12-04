import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 md:py-32 bg-offblack text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4">
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6">
              Tech Stack
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Uma seleção curada de tecnologias modernas que utilizo para garantir performance, escalabilidade e qualidade de código superior.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {SKILLS.map((skillGroup, index) => (
              <div key={index} className="space-y-6">
                <h3 className="text-xl font-serif border-b border-gray-800 pb-2">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-3">
                  {skillGroup.items.map((skill, idx) => (
                    <li key={idx} className="flex items-center text-gray-400 hover:text-white transition-colors cursor-default">
                      <span className="w-1.5 h-1.5 bg-white rounded-full mr-3 opacity-0 hover:opacity-100 transition-opacity"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;