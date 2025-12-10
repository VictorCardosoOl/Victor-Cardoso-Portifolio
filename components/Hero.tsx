
import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Reveal } from './ui/Reveal';
import { TextReveal } from './ui/TextReveal';
import Button from './ui/Button';
import Magnetic from './ui/Magnetic';
import { usePageTransition } from './ui/PageTransition';

const MotionDiv = motion.div as any;

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Add spring physics to scrollY for a "heavier", smoother parallax feel
  const smoothY = useSpring(scrollY, { damping: 15, stiffness: 100, mass: 0.5 });
  const y = useTransform(smoothY, [0, 1000], [0, 200]); // Reduced distance for elegance

  const { transitionTo } = usePageTransition();

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    transitionTo(href);
  };

  return (
    <section id="hero" className="min-h-screen flex items-center pt-28 pb-16 md:pt-32 md:pb-20 relative overflow-hidden">
      
      <div className="container mx-auto px-5 sm:px-6 md:px-12 xl:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-12 lg:gap-20">
          
          {/* Left Column: Photo (Shifted Left for Asymmetry) */}
          <div className="w-full lg:w-5/12 order-1 lg:order-1 flex justify-center lg:justify-start lg:-ml-12">
            <Reveal width="100%">
              <div className="relative w-full max-w-[320px] md:max-w-md aspect-[3/4] group select-none mx-auto lg:mx-0">
                 
                 {/* Main Image Container with Parallax */}
                 <MotionDiv 
                   style={{ y }} // Parallax works best on larger screens, but safe here
                   className="relative w-full h-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] bg-slate-200"
                 >
                   <img 
                     src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800&h=1000" 
                     alt="Minimalist Workspace Architecture" 
                     loading="lazy"
                     decoding="async"
                     className="w-full h-full object-cover grayscale contrast-[1.1] brightness-105"
                   />
                   
                   {/* Glass Overlay Gradient (Refined) */}
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-slate-900/5 to-transparent opacity-80 mix-blend-multiply"></div>
                   
                   {/* Info Card - Floating */}
                   <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-4 glass-panel rounded-2xl border border-white/20 shadow-lg backdrop-blur-xl bg-white/80">
                      <div className="flex items-center justify-between">
                         <div>
                            <span className="text-[8px] md:text-[9px] uppercase tracking-widest font-bold text-slate-500 block mb-1">Status Atual</span>
                            <div className="flex items-center gap-2">
                               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                               <span className="text-[10px] md:text-xs font-bold text-slate-900">Aceitando Projetos</span>
                            </div>
                         </div>
                         <div className="text-right">
                            <span className="text-[8px] md:text-[9px] uppercase tracking-widest font-bold text-slate-500 block mb-1">Stack</span>
                            <span className="text-[10px] md:text-xs font-bold text-slate-900">React / Node</span>
                         </div>
                      </div>
                   </div>
                 </MotionDiv>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Text (Aligned consecutivelly) */}
          <div className="w-full lg:w-7/12 order-2 lg:order-2 text-center lg:text-left">
            
            <div className="space-y-6 md:space-y-8 max-w-3xl mx-auto lg:mx-0">
              
              {/* Personal Intro */}
              <div className="space-y-4 md:space-y-6">
                <Reveal width="100%">
                  <span className="inline-block px-4 py-1.5 glass-panel rounded-full text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-slate-500 border border-slate-200/50">
                    Disponível para novos projetos
                  </span>
                </Reveal>
                
                <div className="overflow-visible pb-2"> {/* overflow-visible to help with descenders */}
                   <h1 className="text-[2.5rem] sm:text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] md:leading-[1] tracking-tight text-slate-900">
                     <TextReveal delay={100}>Transformo ideias em</TextReveal>
                     <TextReveal delay={200} className="italic text-slate-500 font-serif">negócios digitais.</TextReveal>
                   </h1>
                </div>
              </div>
              
              <Reveal delay={300} width="100%">
                <div className="space-y-3 md:space-y-4 pt-2 md:pt-4">
                  <h2 className="text-base md:text-xl font-medium text-slate-900">
                    Olá, sou o Victor Cardoso.
                  </h2>
                  <p className="text-xs md:text-base uppercase tracking-widest text-slate-500 font-bold border-l-2 border-slate-200 pl-4 text-left mx-auto lg:mx-0 max-w-max lg:max-w-none">
                    Desenvolvedor Full Stack & <br className="hidden md:block"/> Consultor de Tecnologia
                  </p>
                </div>
              </Reveal>
              
              <Reveal delay={400} width="100%">
                <p className="text-sm md:text-lg text-slate-600 max-w-lg leading-relaxed mx-auto lg:mx-0 font-light glass-panel p-5 md:p-6 rounded-3xl border border-slate-100/60 mt-4 md:mt-6 shadow-sm">
                  Ajudo empresas e empreendedores a escalar suas operações com aplicações web rápidas, modernas e focadas em conversão.
                </p>
              </Reveal>

              {/* CTAs */}
              <Reveal delay={500} width="100%">
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start pt-4 md:pt-6">
                  <Magnetic strength={0.5}>
                      <a href="#contact" onClick={(e) => handleNav(e, '#contact')} className="block w-full sm:w-auto">
                        <Button 
                          variant="primary" 
                          size="lg" 
                          className="w-full sm:w-auto shadow-xl hover:shadow-2xl hover:shadow-slate-900/30 ring-1 ring-white/20 hover:ring-slate-900/10 transition-all justify-center"
                        >
                          Solicitar Orçamento <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </a>
                  </Magnetic>
                  
                  <Magnetic strength={0.5}>
                      <a href="#projects" onClick={(e) => handleNav(e, '#projects')} className="block w-full sm:w-auto">
                        <Button 
                          variant="secondary" 
                          size="lg" 
                          className="w-full sm:w-auto bg-white/60 backdrop-blur-xl border border-white/50 hover:bg-white hover:border-slate-300 justify-center"
                        >
                          Ver Portfolio
                        </Button>
                      </a>
                  </Magnetic>
                </div>
              </Reveal>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <MotionDiv 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:gap-3 z-20 hover:opacity-100 transition-opacity cursor-pointer p-4" 
        onClick={() => transitionTo('#projects')}
      >
        <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <ChevronDown className="text-slate-900" size={18} />
      </MotionDiv>
    </section>
  );
};

export default Hero;
