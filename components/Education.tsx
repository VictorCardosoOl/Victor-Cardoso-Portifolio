
import React from 'react';
import { EDUCATION } from '../constants';
import { Reveal } from './ui/Reveal';
import Tilt from './ui/Tilt';
import { GraduationCap, Calendar } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 md:py-40 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white to-transparent opacity-50 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <Reveal width="100%">
            <div className="mb-24 text-center max-w-2xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block">Background</span>
                <h2 className="text-4xl md:text-5xl font-serif font-medium text-slate-900 mb-6">
                Formação & Certificações
                </h2>
                <p className="text-slate-500 font-light text-lg">
                    Uma jornada contínua de aprendizado técnico e especialização em produtos digitais.
                </p>
            </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 max-w-5xl mx-auto">
          {EDUCATION.map((edu, index) => (
            <Reveal key={index} delay={index * 150} width="100%" variant="scale">
                <Tilt strength={5} className="h-full">
                    <div className="h-full p-10 md:p-12 rounded-[2.5rem] bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-4 bg-slate-50 rounded-2xl text-slate-900 border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                                    <GraduationCap size={28} strokeWidth={1.5} />
                                </div>
                                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                    <Calendar size={14} />
                                    {edu.period}
                                </div>
                            </div>
                            
                            <h3 className="text-2xl md:text-3xl font-serif font-medium text-slate-900 mb-3 group-hover:text-indigo-900 transition-colors">
                                {edu.degree}
                            </h3>
                            <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">
                                {edu.institution}
                            </p>
                            
                            <p className="text-slate-600 leading-relaxed font-light text-base border-t border-slate-100 pt-6 mt-auto">
                                {edu.description}
                            </p>
                        </div>
                    </div>
                </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
