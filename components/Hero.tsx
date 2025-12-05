import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-28 pb-20 relative overflow-hidden bg-offwhite">
      
      {/* Background Decor - Organic Gradients */}
      <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-gray-200/50 rounded-full blur-[120px] pointer-events-none opacity-60"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-gray-200/50 rounded-full blur-[100px] pointer-events-none opacity-60"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          {/* Left Column: Photo */}
          <div className="w-full lg:w-5/12 order-1 lg:order-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[3/4] group select-none">
               
               {/* Image Container */}
               <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-2xl transition-transform duration-700 hover:scale-[1.01]">
                 <img 
                   src="https://picsum.photos/id/64/800/1000" // Placeholder portrait
                   alt="Victor Cardoso" 
                   className="w-full h-full object-cover grayscale contrast-110 brightness-110 transition-all duration-700"
                 />
               </div>
               
               {/* Floating Badge */}
               <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg animate-in fade-in zoom-in duration-1000 delay-500 z-30 hidden md:flex">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-center leading-tight text-offblack">
                    Not a<br/>Portfolio
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Text */}
          <div className="w-full lg:w-7/12 order-2 lg:order-2 text-center lg:text-left">
            
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              
              {/* Personal Intro */}
              <div className="space-y-4">
                <span className="inline-block px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm text-xs font-bold tracking-widest uppercase text-gray-500">
                  Olá, seja bem-vindo(a)
                </span>
                <h2 className="text-2xl md:text-3xl font-serif text-gray-800">
                  Prazer, sou o <span className="text-offblack font-semibold relative inline-block">
                    Victor Cardoso
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-gray-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                  </span>.
                </h2>
                <p className="text-lg text-gray-500 font-light">
                  Software Developer & Estudante de Engenharia da Computação.
                </p>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] tracking-tight text-offblack">
                Criando soluções <br />
                <span className="italic text-gray-400 font-serif">para você.</span>
              </h1>
              
              <p className="text-base md:text-lg text-gray-600 max-w-lg leading-relaxed mx-auto lg:mx-0 font-light">
                Combino a precisão da engenharia com a elegância do design para construir experiências digitais que não apenas funcionam, mas encantam.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <a 
                  href="#projects" 
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-offblack text-white text-xs uppercase tracking-[0.2em] hover:bg-gray-800 transition-all duration-300 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Ver Portfolio
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#contact" 
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-white border border-gray-200 text-offblack text-xs uppercase tracking-[0.2em] hover:border-gray-400 transition-all duration-300 rounded-full hover:shadow-md"
                >
                  Entrar em Contato
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce duration-[2000ms] z-20 opacity-30 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}>
        <ChevronDown className="text-offblack" size={24} />
      </div>
    </section>
  );
};

export default Hero;