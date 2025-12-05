import React, { useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from './ui/Reveal';
import { TextReveal } from './ui/TextReveal';
import { Magnetic } from './ui/Magnetic';
import Button from './ui/Button';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]); // Moves slower than scroll
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="hero" ref={containerRef} className="min-h-screen flex items-center pt-32 pb-20 relative overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left Column: Photo with Parallax */}
          <motion.div style={{ y, opacity }} className="w-full lg:w-5/12 order-1 lg:order-1 flex justify-center lg:justify-start lg:-ml-12 z-0">
            <Reveal>
              <div className="relative w-full max-w-md aspect-[3/4] group select-none">
                 <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] bg-slate-200">
                   <img 
                     src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800&h=1000" 
                     alt="Minimalist Workspace Architecture" 
                     className="w-full h-full object-cover grayscale contrast-[1.1] brightness-105"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent opacity-60"></div>
                 </div>
              </div>
            </Reveal>
          </motion.div>

          {/* Right Column: Text */}
          <div className="w-full lg:w-7/12 order-2 lg:order-2 text-center lg:text-left z-10">
            
            <div className="space-y-8 max-w-3xl mx-auto lg:mx-0">
              
              <Reveal delay={0.1} width="100%">
                  <span className="inline-block px-4 py-1.5 glass-panel rounded-full text-[10px] font-bold tracking-widest uppercase text-slate-500">
                    Portfolio 2024
                  </span>
              </Reveal>
              
              <div className="space-y-2">
                <TextReveal width="100%">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[0.9] tracking-tighter text-slate-900">
                    Criando soluções
                  </h1>
                </TextReveal>
                <TextReveal width="100%" delay={0.1}>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[0.9] tracking-tighter text-slate-900">
                    <span className="italic text-slate-400 font-serif">significativas.</span>
                  </h1>
                </TextReveal>
              </div>
              
              <Reveal delay={0.3} width="100%">
                <div className="space-y-4 pt-4">
                  <h2 className="text-lg md:text-xl font-medium text-slate-900">
                    Prazer, sou o Victor Cardoso.
                  </h2>
                  <p className="text-sm md:text-base uppercase tracking-widest text-slate-500 font-bold border-l-2 border-slate-200 pl-4">
                    Software Developer & <br className="hidden md:block"/> Computer Engineering Student
                  </p>
                </div>
              </Reveal>
              
              <Reveal delay={0.4} width="100%">
                <p className="text-base md:text-lg text-slate-600 max-w-lg leading-relaxed mx-auto lg:mx-0 font-light glass-panel p-6 rounded-3xl border border-white/40 mt-6 shadow-sm backdrop-blur-md">
                  Combino a precisão da engenharia com a elegância do design para construir experiências digitais que não apenas funcionam, mas encantam.
                </p>
              </Reveal>

              {/* CTAs with Magnetic Effect */}
              <Reveal delay={0.5} width="100%">
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
                  <Magnetic>
                    <a href="#projects" className="block">
                      <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-xl hover:shadow-2xl">
                        Ver Projetos <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a href="#contact" className="block">
                      <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white/50 backdrop-blur-md">
                        Fale Comigo
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
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-20"
        onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}
      >
        <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="text-slate-900" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;