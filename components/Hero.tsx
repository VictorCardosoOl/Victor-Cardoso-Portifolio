
import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from './ui/Reveal';
import { TextReveal } from './ui/TextReveal';
import Button from './ui/Button';
import Magnetic from './ui/Magnetic';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]); // Parallax effect

  return (
    <section id="hero" className="min-h-screen flex items-center pt-32 pb-20 relative overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Column: Photo (Shifted Left for Asymmetry) */}
          <div className="w-full lg:w-5/12 order-1 lg:order-1 flex justify-center lg:justify-start lg:-ml-12">
            <Reveal width="100%">
              <div className="relative w-full max-w-md aspect-[3/4] group select-none">
                 
                 {/* Main Image Container with Parallax */}
                 <motion.div 
                   style={{ y }}
                   className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] bg-slate-200"
                 >
                   <img 
                     src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800&h=1000" 
                     alt="Minimalist Workspace Architecture" 
                     className="w-full h-full object-cover grayscale contrast-[1.1] brightness-105"
                   />
                   
                   {/* Glass Overlay Gradient */}
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent opacity-60"></div>
                 </motion.div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Text (Aligned consecutivelly) */}
          <div className="w-full lg:w-7/12 order-2 lg:order-2 text-center lg:text-left">
            
            <div className="space-y-8 max-w-3xl mx-auto lg:mx-0">
              
              {/* Personal Intro */}
              <div className="space-y-6">
                <Reveal width="100%">
                  <span className="inline-block px-4 py-1.5 glass-panel rounded-full text-[10px] font-bold tracking-widest uppercase text-slate-500 border border-slate-200/50">
                    Disponível para novos projetos
                  </span>
                </Reveal>
                
                <div className="overflow-visible pb-2"> {/* overflow-visible to help with descenders */}
                   <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] md:leading-[1] tracking-tight text-slate-900">
                     <TextReveal delay={100}>Transformo ideias em</TextReveal>
                     <TextReveal delay={200} className="italic text-slate-500 font-serif">negócios digitais.</TextReveal>
                   </h1>
                </div>
              </div>
              
              <Reveal delay={300} width="100%">
                <div className="space-y-4 pt-4">
                  <h2 className="text-lg md:text-xl font-medium text-slate-900">
                    Olá, sou o Victor Cardoso.
                  </h2>
                  <p className="text-sm md:text-base uppercase tracking-widest text-slate-500 font-bold border-l-2 border-slate-200 pl-4">
                    Desenvolvedor Full Stack & <br className="hidden md:block"/> Consultor de Tecnologia
                  </p>
                </div>
              </Reveal>
              
              <Reveal delay={400} width="100%">
                <p className="text-base md:text-lg text-slate-600 max-w-lg leading-relaxed mx-auto lg:mx-0 font-light glass-panel p-6 rounded-3xl border border-slate-100/60 mt-6 shadow-sm">
                  Ajudo empresas e empreendedores a escalar suas operações com aplicações web rápidas, modernas e focadas em conversão.
                </p>
              </Reveal>

              {/* CTAs */}
              <Reveal delay={500} width="100%">
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
                  <Magnetic strength={0.5}>
                      <a href="#contact" className="block">
                        <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-xl hover:shadow-2xl hover:shadow-slate-900/20">
                          Solicitar Orçamento <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </a>
                  </Magnetic>
                  
                  <Magnetic strength={0.5}>
                      <a href="#projects" className="block">
                        <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white/50 backdrop-blur-md">
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
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 hover:opacity-100 transition-opacity cursor-pointer" 
        onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <ChevronDown className="text-slate-900" size={20} />
      </motion.div>
    </section>
  );
};

export default Hero;
