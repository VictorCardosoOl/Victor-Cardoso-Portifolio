import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';
import Magnetic from './ui/Magnetic';
import { usePageTransition } from './ui/PageTransition';
import { MapPin, Globe, ArrowDown, ArrowRight } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionImg = motion.img as any;
const MotionH1 = motion.h1 as any;

const Hero: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const { transitionTo } = usePageTransition();

  // --- PHYSICS & PARALLAX ---
  const smoothY = useSpring(scrollY, { damping: 20, stiffness: 100 });
  
  // Parallax diferenciado para criar profundidade
  // Texto sobe devagar
  const textY = useTransform(smoothY, [0, 1000], [0, -100]); 
  // Imagem sobe mais rápido (plano de fundo/médio)
  const imageY = useTransform(smoothY, [0, 1000], [0, -200]);
  const opacity = useTransform(smoothY, [0, 500], [1, 0]);

  // Velocity Typography (Distorção sutil baseada na velocidade do scroll)
  const scrollVelocity = useVelocity(scrollY);
  const rawSkew = useTransform(scrollVelocity, [-2000, 2000], [-5, 5]); // Reduzi o skew para ser mais elegante
  const skewVelocity = useSpring(rawSkew, { damping: 50, stiffness: 200 });

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    transitionTo(href);
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="min-h-screen relative bg-paper text-petrol-base pt-32 pb-20 flex flex-col justify-center overflow-hidden"
    >
      
      {/* --- GRID LINES (Editorial Guides) --- */}
      <div className="absolute top-0 left-6 md:left-24 w-px h-full bg-petrol-base/[0.03] z-0" />
      <div className="absolute top-0 right-6 md:right-1/3 w-px h-full bg-petrol-base/[0.03] z-0 hidden md:block" />

      <div className="container mx-auto px-6 md:px-12 xl:px-24 relative z-10">
        
        {/* --- META HEADER --- */}
        <div className="flex justify-between items-start mb-20 md:mb-12 pl-4 md:pl-16">
           <Reveal width="100%">
             <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-petrol-base/40">Victor Cardoso</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-petrol-base">Engenheiro de Software</span>
             </div>
           </Reveal>
           
           <Reveal width="100%" delay={100}>
             <div className="flex flex-col gap-1 text-right">
                <div className="flex items-center justify-end gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-petrol-base/40">
                   <Globe size={10} className="text-petrol-electric" /> Online
                </div>
             </div>
           </Reveal>
        </div>

        {/* --- ASYMMETRIC COMPOSITION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 relative">
            
            {/* 1. TEXT MASS (Top Left - Dominant) */}
            <div className="lg:col-span-7 flex flex-col justify-center relative z-20 pl-2 md:pl-16">
                <MotionDiv style={{ y: textY }} className="relative">
                   
                   {/* Main Title Block */}
                   <div className="relative mb-12">
                       <MotionH1 
                         style={{ skewX: skewVelocity, transformOrigin: "bottom left" }}
                         className="text-[15vw] md:text-[8rem] lg:text-[9.5rem] leading-[0.8] font-serif font-light text-petrol-base tracking-tighter mix-blend-darken"
                       >
                         Lógica
                       </MotionH1>
                       
                       <div className="flex items-start ml-8 md:ml-32 lg:ml-40 mt-2 md:mt-4">
                          <span className="text-xs font-mono text-petrol-base/30 mt-4 mr-4 hidden md:block">(01)</span>
                          <MotionH1 
                            style={{ skewX: skewVelocity, transformOrigin: "bottom left" }}
                            className="text-[15vw] md:text-[8rem] lg:text-[9.5rem] leading-[0.8] font-serif font-light text-petrol-base tracking-tighter italic opacity-80"
                          >
                            Estética
                          </MotionH1>
                       </div>
                   </div>

                   {/* Editorial Description (Slender Column) */}
                   <div className="ml-1 md:ml-2 lg:ml-40 max-w-sm flex flex-col gap-8">
                      <Reveal delay={200} variant="translate">
                        <p className="text-sm md:text-base font-light text-petrol-ink leading-[1.8] border-l border-petrol-base/20 pl-6">
                           Arquitetura de software de alta precisão fundida com design editorial. 
                           Transformando complexidade em interfaces silenciosas e eficientes.
                        </p>
                      </Reveal>

                      <Reveal delay={300} variant="scale">
                         <div className="flex items-center gap-6">
                            <Magnetic strength={0.3}>
                                <a href="#contact" onClick={(e) => handleNav(e, '#contact')}>
                                  <Button 
                                    variant="outline" 
                                    className="rounded-full px-8 py-3 border-petrol-base text-petrol-base hover:bg-petrol-base hover:text-white transition-all duration-500 group text-[10px]"
                                  >
                                    <span className="tracking-[0.25em] group-hover:tracking-[0.35em] transition-all font-bold">
                                      INICIAR
                                    </span>
                                  </Button>
                                </a>
                             </Magnetic>
                             <div className="w-12 h-px bg-petrol-base/20"></div>
                             <span className="text-[10px] font-mono text-petrol-base/40">Scroll para explorar</span>
                         </div>
                      </Reveal>
                   </div>

                </MotionDiv>
            </div>

            {/* 2. IMAGE ANCHOR (Bottom Right - Slender & Offset) 
                Pushed down with margin-top to break symmetry.
            */}
            <div className="lg:col-span-5 relative flex flex-col justify-end items-end lg:items-start lg:pl-12 mt-12 lg:mt-32 pointer-events-none z-10">
               <MotionDiv 
                  style={{ y: imageY }}
                  className="relative w-[75%] md:w-[60%] lg:w-[85%] max-w-sm mr-4 lg:mr-0"
               >
                  <Reveal width="100%" duration={1.6} className="w-full">
                      {/* Slender Aspect Ratio (3:5) for elegance */}
                      <div className="relative w-full aspect-[3/5] overflow-hidden rounded-t-[100px] rounded-b-[4px] border border-petrol-base/5 shadow-2xl bg-slate-200">
                          <MotionImg 
                            initial={{ scale: 1.4, filter: "grayscale(100%) blur(5px)" }}
                            animate={{ scale: 1, filter: "grayscale(0%) blur(0px)" }}
                            transition={{ duration: 2, ease: "circOut" }}
                            src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800&h=1400" 
                            alt="Victor Cardoso Portrait" 
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Inner Border/Frame for Detail */}
                          <div className="absolute inset-2 border border-white/20 rounded-t-[96px] rounded-b-[2px] pointer-events-none mix-blend-overlay"></div>
                      </div>
                      
                      {/* Floating Caption - Outside the image for asymmetry */}
                      <div className="absolute -left-12 bottom-12 flex flex-col items-end">
                         <span className="text-[4rem] font-serif leading-none text-petrol-base mix-blend-multiply opacity-10">01</span>
                         <div className="bg-paper border border-petrol-base/10 px-3 py-1.5 shadow-lg mt-[-1rem] relative z-10">
                            <span className="text-[9px] font-mono uppercase tracking-widest text-petrol-base flex items-center gap-2">
                               <ArrowRight size={10} /> Perfil
                            </span>
                         </div>
                      </div>
                  </Reveal>
               </MotionDiv>
            </div>

        </div>

      </div>

      {/* Elegant Scroll Indicator - Bottom Left */}
      <MotionDiv 
        style={{ opacity }}
        className="absolute bottom-8 left-8 md:left-24 flex items-center gap-4 text-petrol-base/30 z-20"
      >
         <div className="h-px w-12 bg-petrol-base/20"></div>
         <span className="text-[9px] uppercase tracking-widest font-mono">Role</span>
         <ArrowDown size={12} className="animate-bounce" />
      </MotionDiv>

    </section>
  );
};

export default Hero;