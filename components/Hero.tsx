import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Reveal } from './ui/Reveal';
import { TextReveal } from './ui/TextReveal';
import Button from './ui/Button';
import Magnetic from './ui/Magnetic';
import { usePageTransition } from './ui/PageTransition';

const MotionDiv = motion.div as any;

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Heavier physics for "Archive" feel (Mass 0.8)
  const smoothY = useSpring(scrollY, { damping: 20, stiffness: 100, mass: 0.8 });
  const y = useTransform(smoothY, [0, 1000], [0, 250]); 
  const opacity = useTransform(smoothY, [0, 500], [1, 0.5]);

  const { transitionTo } = usePageTransition();

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    transitionTo(href);
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center pt-32 pb-20 relative overflow-hidden bg-paper text-petrol-base">
      
      {/* Decorative Grid Lines - Blueprint Style */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-petrol-base/5 hidden md:block" />
      <div className="absolute top-0 right-12 w-[1px] h-full bg-petrol-base/5 hidden md:block" />
      
      <div className="container mx-auto px-5 sm:px-6 md:px-12 xl:px-20 relative z-10">
        <div className="flex flex-col gap-12">
          
          {/* Header Metadata */}
          <div className="relative pl-0 md:pl-8">
             <Reveal width="100%">
                <div className="flex items-center gap-4 mb-6 border-l border-petrol-base/20 pl-4">
                   <div className="w-1.5 h-1.5 bg-petrol-accent rounded-full animate-pulse"></div>
                   <span className="font-mono text-[10px] uppercase tracking-widest text-ink-300">
                     sys.profile / v.2024
                   </span>
                </div>
             </Reveal>

             {/* Main Headline - Tight Typography Applied */}
             <div className="relative">
               <h1 className="font-serif font-medium tracking-tighter text-petrol-base font-heading-tight">
                 <div className="text-[15vw] md:text-[13vw] lg:text-[11rem] xl:text-[12rem] leading-[0.8]">
                    <TextReveal delay={100}>Engenharia</TextReveal>
                 </div>
                 <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12">
                    <div className="text-[15vw] md:text-[13vw] lg:text-[11rem] xl:text-[12rem] leading-[0.8] italic text-petrol-light/40">
                        <TextReveal delay={200}>Digital</TextReveal>
                    </div>
                    
                    {/* Documentary Caption */}
                    <div className="hidden md:block max-w-[240px] mt-8 self-center">
                       <Reveal delay={400}>
                          <p className="font-mono text-[9px] leading-relaxed uppercase tracking-wider text-ink-300 border-l border-petrol-base/10 pl-4">
                             Fig 01. Arquitetura de Software<br/>
                             Design de Interface<br/>
                             Performance Audit
                          </p>
                       </Reveal>
                    </div>

                    <div className="text-[15vw] md:text-[13vw] lg:text-[11rem] xl:text-[12rem] leading-[0.8]">
                        <TextReveal delay={300}>& Arte</TextReveal>
                    </div>
                 </div>
               </h1>
             </div>
          </div>

          {/* Lower Section: Image & CTAs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end mt-8 lg:mt-0 pl-0 md:pl-8">
             
             {/* Left: Documentary Image (Full Color, No Grayscale) */}
             <div className="lg:col-span-5 order-2 lg:order-1 relative">
                <Reveal width="100%">
                   <div className="relative w-full max-w-[320px] aspect-[4/5]">
                      {/* Image Frame */}
                      <MotionDiv style={{ y, opacity }} className="w-full h-full overflow-hidden bg-slate-200 relative z-10 border border-white/50 shadow-2xl">
                         <img 
                           src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600&h=800" 
                           alt="Workspace" 
                           className="w-full h-full object-cover" 
                         />
                      </MotionDiv>
                      
                      {/* Technical Decoration Behind */}
                      <div className="absolute -top-4 -right-4 w-full h-full border border-petrol-base/10 z-0"></div>
                      
                      {/* Status Badge */}
                      <div className="absolute -right-8 bottom-8 bg-paper/90 backdrop-blur-md border border-petrol-base/10 p-4 shadow-lg max-w-[140px] hidden md:block z-20">
                         <span className="font-mono text-[9px] uppercase tracking-widest text-ink-300 block mb-1">Status</span>
                         <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span className="text-xs font-bold text-petrol-base">Disponível</span>
                         </div>
                      </div>
                   </div>
                </Reveal>
             </div>

             {/* Right: Intro & CTAs */}
             <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start justify-end pb-4">
                <Reveal delay={400} width="100%">
                   <p className="text-xl md:text-2xl text-ink-300 font-light leading-relaxed max-w-2xl mb-12">
                      Transformo ideias complexas em <span className="text-petrol-base font-medium">software robusto</span>. 
                      Uma abordagem arquivista para construir o futuro digital.
                   </p>
                </Reveal>

                <Reveal delay={500}>
                  <div className="flex flex-wrap gap-6">
                    <Magnetic strength={0.3}>
                        <a href="#contact" onClick={(e) => handleNav(e, '#contact')}>
                          <Button 
                            variant="primary" 
                            size="lg" 
                            className="bg-petrol-base text-white hover:bg-petrol-mid rounded-none px-10 py-4 text-xs tracking-widest"
                          >
                            Iniciar Projeto
                          </Button>
                        </a>
                    </Magnetic>
                    
                    <Magnetic strength={0.3}>
                        <a href="#projects" onClick={(e) => handleNav(e, '#projects')}>
                          <Button 
                            variant="outline" 
                            size="lg" 
                            className="border-petrol-base/20 text-petrol-base hover:bg-petrol-base hover:text-white rounded-none px-10 py-4 text-xs tracking-widest bg-transparent"
                          >
                            Arquivo de Obras
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