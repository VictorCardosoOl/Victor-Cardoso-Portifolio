import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 relative overflow-hidden bg-offwhite">
      {/* Background Decor */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-[0.02] select-none pointer-events-none">
         <span className="text-[30vw] font-serif leading-none text-black">DEV</span>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-6xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center gap-4 mb-8 relative">
             <div className="h-px w-8 md:w-16 bg-black"></div>
             <span className="text-xs md:text-sm uppercase tracking-[0.3em] font-medium text-black">
              Desenvolvimento & Design
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-serif font-medium leading-[1.0] mb-8 tracking-tight text-offblack">
            Digital Experiences <br />
            <span className="italic font-light text-gray-500">Crafted with Precision.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mb-12 font-light border-l border-gray-200 pl-6 md:pl-8">
            Transformo ideias complexas em interfaces minimalistas e funcionais. Especialista em unir estética refinada com engenharia robusta para criar produtos digitais duradouros.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <a 
              href="#projects" 
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-offblack text-white text-xs uppercase tracking-[0.2em] hover:bg-gray-800 transition-all duration-300"
            >
              Ver Projetos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="group flex items-center justify-center gap-3 px-8 py-4 border border-gray-200 text-offblack text-xs uppercase tracking-[0.2em] hover:border-black transition-all duration-300"
            >
              Entrar em contato
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-6 md:left-12 animate-pulse">
        <a href="#projects" className="flex items-center gap-4 text-gray-400 hover:text-black transition-colors group">
          <span className="w-12 h-px bg-gray-300 group-hover:bg-black transition-colors"></span>
          <span className="text-[10px] uppercase tracking-widest">Scroll Down</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;