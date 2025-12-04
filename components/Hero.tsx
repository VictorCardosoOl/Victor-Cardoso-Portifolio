import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 opacity-[0.03] select-none pointer-events-none">
         <span className="text-[40rem] font-serif leading-none">DEV</span>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-block mb-6 relative">
            <span className="relative z-10 text-xs md:text-sm uppercase tracking-[0.3em] font-medium text-black bg-offwhite pr-4">
              Desenvolvimento & Design
            </span>
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-300 -z-0"></div>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium leading-[0.95] mb-8 tracking-tighter">
            Digital <br />
            Experiences <br />
            <span className="text-gray-400 italic font-light">Crafted.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-xl leading-relaxed mb-12 font-light">
            Transformo ideias complexas em interfaces minimalistas e funcionais. Especialista em unir estética refinada com engenharia robusta.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <a 
              href="#projects" 
              className="group flex items-center justify-center gap-3 px-10 py-5 bg-offblack text-white text-sm uppercase tracking-widest hover:bg-gray-800 transition-all duration-300"
            >
              Ver Projetos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="group flex items-center justify-center gap-3 px-10 py-5 border border-offblack text-offblack text-sm uppercase tracking-widest hover:bg-offblack hover:text-white transition-all duration-300"
            >
              Entrar em contato
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce duration-[2000ms]">
        <a href="#projects" className="flex flex-col items-center gap-2 text-gray-400 hover:text-black transition-colors">
          <span className="text-[10px] uppercase tracking-widest writing-vertical-rl">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

export default Hero;