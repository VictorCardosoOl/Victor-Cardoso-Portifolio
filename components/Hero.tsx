import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 relative overflow-hidden bg-offwhite">
      
      {/* Background Decor - Subtle Gradients (No Particles) */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-gray-100 rounded-full blur-[100px] opacity-60 translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-500">
              Disponível para Freelance
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-serif font-medium leading-[1.1] mb-8 tracking-tight text-offblack animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            Design Intencional. <br />
            <span className="italic font-light text-gray-500">Código Excepcional.</span>
          </h1>
          
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed font-light text-center md:text-left mx-auto md:mx-0">
              Ajudo empresas e empreendedores a tirarem suas ideias do papel. Desenvolvo sites e sistemas do zero, focados em converter visitantes em clientes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mx-auto md:mx-0">
              <a 
                href="#projects" 
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-offblack text-white text-xs uppercase tracking-[0.2em] hover:bg-gray-800 transition-all duration-300 rounded-md shadow-lg"
              >
                Ver Projetos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contact" 
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white border border-gray-200 text-offblack text-xs uppercase tracking-[0.2em] hover:border-gray-400 transition-all duration-300 rounded-md"
              >
                Contato
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce duration-[2000ms] z-20 opacity-40 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-widest text-gray-400">Scroll</span>
        <ChevronDown className="text-gray-400" size={20} />
      </div>
    </section>
  );
};

export default Hero;