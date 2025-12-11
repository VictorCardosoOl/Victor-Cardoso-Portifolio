
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
  const y = useTransform(smoothY, [0, 1000], [0, 200]); 

  const { transitionTo } = usePageTransition();

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    transitionTo(href);
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center pt-32 pb-20 relative overflow-hidden bg-paper text-charcoal">
      
      <div className="container mx-auto px-5 sm:px-6 md:px-12 xl:px-20 relative z-10">
        <div className="flex flex-col gap-12">
          
          {/* Header Area - DRAMATIC SCALE */}
          <div className="relative">
             <Reveal width="100%">
                <div className="flex items-center gap-4 mb-2">
                   <div className="w-2 h-2 bg-charcoal rounded-full animate-pulse"></div>
                   <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal/60">
                     Portfolio 2024
                   </span>
                </div>
             </Reveal>

             {/* Massive Typography Block */}
             <div className="relative -ml-2 md:-ml-4">
               <h1 className="font-serif font-medium leading-[0.8] tracking-[-0.06em] text-charcoal">
                 <div className="text-[16vw] md:text-[13vw] lg:text-[11rem] xl:text-[13rem]">
                    <TextReveal delay={100}>Transformo</TextReveal>
                 </div>
                 <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12">
                    <div className="text-[16vw] md:text-[13vw] lg:text-[11rem] xl:text-[13rem]">
                        <TextReveal delay={200}>ideias</TextReveal>
                    </div>
                    
                    {/* Tiny Supporting Text inserted into the massive headline flow */}
                    <div className="hidden md:block max-w-[200px] mt-8">
                       <Reveal delay={400}>
                          <p className="text-[10px] leading-relaxed font-bold uppercase tracking-widest text-charcoal/60 border-l border-charcoal/20 pl-4">
                             Engenharia de Software & <br/>
                             Design de Interface para <br/>
                             Produtos Digitais
                          </p>
                       </Reveal>
                    </div>

                    <div className="text-[16vw] md:text-[13vw] lg:text-[11rem] xl:text-[13rem] italic text-charcoal/40 font-light">
                        <TextReveal delay={300}>negócios.</TextReveal>
                    </div>
                 </div>
               </h1>
             </div>
          </div>

          {/* Lower Layout - Asymmetrical */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end mt-12 lg:mt-0">
             
             {/* Left: Image (Small/Medium) */}
             <div className="lg:col-span-4 order-2 lg:order-1 relative">
                <Reveal width="100%">
                   <div className="relative w-full max-w-[280px] aspect-[3/4]">
                      <MotionDiv style={{ y }} className="w-full h-full overflow-hidden rounded-sm bg-slate-200 grayscale contrast-125">
                         <img 
                           src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600&h=800" 
                           alt="Workspace" 
                           className="w-full h-full object-cover"
                         />
                      </MotionDiv>
                      
                      {/* Floating Badge */}
                      <div className="absolute -right-12 bottom-12 bg-paper border border-charcoal/10 p-4 shadow-xl max-w-[150px] hidden md:block">
                         <span className="text-[9px] font-bold uppercase tracking-widest text-charcoal/50 block mb-1">Status</span>
                         <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            <span className="text-xs font-bold text-charcoal">Disponível</span>
                         </div>
                      </div>
                   </div>
                </Reveal>
             </div>

             {/* Right: Intro & CTAs */}
             <div className="lg:col-span-8 order-1 lg:order-2 flex flex-col items-start justify-end pb-4">
                <Reveal delay={400} width="100%">
                   <p className="text-xl md:text-3xl text-charcoal/80 font-light leading-relaxed max-w-2xl mb-12">
                      Ajudo empresas a escalar operações com aplicações web <span className="font-serif italic text-charcoal">rápidas</span>, <span className="font-serif italic text-charcoal">modernas</span> e focadas em conversão.
                   </p>
                </Reveal>

                <Reveal delay={500}>
                  <div className="flex flex-wrap gap-6">
                    <Magnetic strength={0.3}>
                        <a href="#contact" onClick={(e) => handleNav(e, '#contact')}>
                          <Button 
                            variant="primary" 
                            size="lg" 
                            className="bg-charcoal text-paper hover:bg-charcoal/90 rounded-none px-10 py-5 text-xs tracking-widest"
                          >
                            Solicitar Orçamento
                          </Button>
                        </a>
                    </Magnetic>
                    
                    <Magnetic strength={0.3}>
                        <a href="#projects" onClick={(e) => handleNav(e, '#projects')}>
                          <Button 
                            variant="outline" 
                            size="lg" 
                            className="border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-paper rounded-none px-10 py-5 text-xs tracking-widest"
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
    </section>
  );
};

export default Hero;
