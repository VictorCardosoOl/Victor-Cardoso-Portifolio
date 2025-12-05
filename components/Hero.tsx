import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-32 pb-20 relative">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column: Photo with Glass Frame */}
          <div className="w-full lg:w-5/12 order-1 lg:order-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[3/4] group select-none">
               
               {/* Glass Backing Layer */}
               <div className="absolute inset-4 bg-slate-200/30 rounded-[2.5rem] rotate-3 transform transition-transform duration-700 group-hover:rotate-6 backdrop-blur-sm border border-white/20"></div>
               
               {/* Main Image Container */}
               <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-700 hover:-translate-y-2 border-[6px] border-white/40">
                 <img 
                   src="https://picsum.photos/id/64/800/1000" 
                   alt="Victor Cardoso" 
                   className="w-full h-full object-cover grayscale contrast-110 brightness-110 transition-all duration-700"
                 />
                 
                 {/* Glass Overlay Gradient on Image */}
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-60"></div>
               </div>
            </div>
          </div>

          {/* Right Column: Text */}
          <div className="w-full lg:w-7/12 order-2 lg:order-2 text-center lg:text-left">
            
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              
              {/* Personal Intro */}
              <div className="space-y-5">
                <span className="inline-block px-5 py-2 glass-card rounded-full text-xs font-bold tracking-widest uppercase text-slate-500 shadow-sm border border-white/60">
                  Olá, seja bem-vindo(a)
                </span>
                <h2 className="text-2xl md:text-3xl font-serif text-slate-700">
                  Prazer, sou o <span className="text-slate-900 font-semibold relative inline-block">
                    Victor Cardoso
                    {/* Organic Underline */}
                    <svg className="absolute w-[110%] h-3 -bottom-1 -left-1 text-slate-300 -z-10 opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0,5 Q50,15 100,5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>.
                </h2>
                <p className="text-lg text-slate-500 font-light">
                  Software Developer & Estudante de Engenharia da Computação.
                </p>
              </div>

              {/* Main Headline with subtle gradient */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] tracking-tight text-slate-900">
                Criando soluções <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 font-serif">
                  para você.
                </span>
              </h1>
              
              <p className="text-base md:text-lg text-slate-600 max-w-lg leading-relaxed mx-auto lg:mx-0 font-light glass-card p-6 rounded-3xl border-transparent bg-white/30">
                Combino a precisão da engenharia com a elegância do design para construir experiências digitais que não apenas funcionam, mas encantam.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <a 
                  href="#projects" 
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all duration-300 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                  Ver Portfolio
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#contact" 
                  className="group flex items-center justify-center gap-3 px-8 py-4 glass-card text-slate-900 text-xs uppercase tracking-[0.2em] hover:bg-white/60 transition-all duration-300 rounded-full hover:shadow-md border-white/60"
                >
                  Entrar em Contato
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce duration-[2000ms] z-20 opacity-40 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}>
        <ChevronDown className="text-slate-900" size={24} />
      </div>
    </section>
  );
};

export default Hero;