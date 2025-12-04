import React from 'react';
import { EDUCATION } from '../constants';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-5xl font-serif font-medium mb-16 text-center">
          Formação Acadêmica
        </h2>

        <div className="max-w-4xl mx-auto">
          {EDUCATION.map((edu, index) => (
            <div key={index} className="relative pl-8 md:pl-0">
              {/* Vertical Line for mobile */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300 md:hidden"></div>
              
              <div className={`flex flex-col md:flex-row md:justify-between items-start group mb-12 last:mb-0`}>
                <div className="md:w-1/3 mb-2 md:mb-0 md:text-right md:pr-12 relative">
                   {/* Dot for timeline */}
                   <div className="hidden md:block absolute right-[-5px] top-2 w-2.5 h-2.5 bg-black rounded-full z-10"></div>
                   <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-black rounded-full z-10 md:hidden"></div>
                   
                   <span className="text-sm font-bold tracking-wider text-gray-400 uppercase">
                     {edu.period}
                   </span>
                </div>
                
                <div className="md:w-2/3 md:pl-12 md:border-l md:border-gray-300 pb-12 last:pb-0">
                  <h3 className="text-xl md:text-2xl font-serif font-medium mb-1 group-hover:text-gray-600 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-base font-medium text-gray-800 mb-3">
                    {edu.institution}
                  </p>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {edu.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;