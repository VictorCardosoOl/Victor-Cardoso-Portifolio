import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-32 pb-20 relative">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          
          {/* Left Column: Photo */}
          <div className="w-full lg:w-5/12 order-1 lg:order-1 flex justify-center lg:justify-end">
            <Reveal>
              <div className="relative w-full max-w-md aspect-[3/4] group select-none">
                 
                 {/* Main Image Container */}
                 <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-transform duration-700 hover:-translate-y-2 bg-slate-200">
                   <img 
                     src="https://picsum.photos/id/64/800/1000" 
                     alt="Victor Cardoso" 
                     className="w-full h-full object-cover grayscale contrast-[1.05] brightness-105 transition-all duration-700"
                   />
                   
                   {/* Glass Overlay Gradient */}
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-60"></div>
                 </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Text */}
          <div className="w-full lg:w-7/12 order-2 lg:order-2 text-center lg:text-left">
            
            <div className="space-y-8">
              
              {/* Personal Intro */}
              <Reveal delay={100}>
                <div className="space-y-4">
                  <span className="inline-block px-4 py-1.5 glass-panel rounded-full text-[10px] font-bold tracking-widest uppercase text-slate-500 border border-slate-200/50">
                    Portfolio 2024
                  </span>
                  <h2 className="text-xl md:text-2xl font-serif text-slate-600">
                    Prazer, sou o <span className="text-slate-900 font-semibold">Victor Cardoso</span>.
                  </h2>
                  <p className="text-sm uppercase tracking-widest text-slate-400 font-bold">
                    Software Developer & Computer Engineering Student
                  </p>
                </div>
              </Reveal>

              {/* Main Headline */}
              <Reveal delay={200}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1] tracking-tight text-slate-900">
                  Criando soluções <br />
                  <span className="italic text-slate-500 font-serif">
                    significativas.
                  </span>
                </h1>
              </Reveal>
              
              <Reveal delay={300}>
                <p className="text-base md:text-lg text-slate-600 max-w-lg leading-relaxed mx-auto lg:mx-0 font-light glass-panel p-6 rounded-3xl border border-slate-100">
                  Combino a precisão da engenharia com a elegância do design para construir experiências digitais que não apenas funcionam, mas encantam.
                </p>
              </Reveal>

              {/* CTAs */}
              <Reveal delay={400}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <a href="#projects">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto">
                      Ver Projetos <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                  <a href="#contact">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                      Fale Comigo
                    </Button>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce duration-[2000ms] z-20 opacity-40 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}>
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <ChevronDown className="text-slate-900" size={20} />
      </div>
    </section>
  );
};

export default Hero;