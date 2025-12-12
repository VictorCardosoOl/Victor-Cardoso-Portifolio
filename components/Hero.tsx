import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';
import Magnetic from './ui/Magnetic';
import { usePageTransition } from './ui/PageTransition';
import { MapPin, Globe, ArrowDownRight } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionImg = motion.img as any;
const MotionH1 = motion.h1 as any; // Para aplicar o skew no texto

/**
 * COMPONENTE: Hero
 * ----------------
 * A entrada principal do site. Combina layout assimétrico, paralaxe e tipografia física.
 * 
 * EFEITOS VISUAIS:
 * 1. Layout Assimétrico: Texto à esquerda (pesado), Imagem à direita inferior (âncora).
 * 2. Paralaxe Inverso: Conforme o scroll desce, a imagem sobe mais rápido que o texto, criando profundidade 3D.
 * 3. VELOCITY TYPOGRAPHY (Novo):
 *    - Usa `useVelocity` do Framer Motion para detectar a velocidade do scroll.
 *    - Aplica uma transformação `skewX` (distorção horizontal) baseada nessa velocidade.
 *    - O texto parece "esticar" ou "correr" quando o usuário faz scroll rápido, dando peso físico aos pixels.
 */

const Hero: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const { transitionTo } = usePageTransition();

  // --- PHYSICS ENGINE ---
  
  // 1. Scroll Physics (Spring)
  const smoothY = useSpring(scrollY, { damping: 20, stiffness: 100 });
  
  // 2. Parallax Transforms
  // Text moves up slowly
  const textY = useTransform(smoothY, [0, 1000], [0, -150]); 
  // Image moves up faster (creating depth between fg/bg)
  const imageY = useTransform(smoothY, [0, 1000], [0, -250]);
  const opacity = useTransform(smoothY, [0, 500], [1, 0]);

  // 3. Velocity Typography Logic
  const scrollVelocity = useVelocity(scrollY);
  // Mapeia velocidade (-1000 a 1000) para graus de skew (-10deg a 10deg)
  const rawSkew = useTransform(scrollVelocity, [-2000, 2000], [-10, 10]);
  // Aplica física de mola para suavizar a distorção (evita "jitters")
  const skewVelocity = useSpring(rawSkew, { damping: 40, stiffness: 200 });

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    transitionTo(href);
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-paper text-petrol-base pt-32 pb-20 flex flex-col"
    >
      
      {/* --- ARCHITECTURAL LINES (ASYMMETRIC) --- */}
      {/* Off-center Axis (The Golden Section Line) */}
      <div className="absolute top-0 left-8 md:left-[38%] w-px h-full bg-petrol-base/5 z-0" />
      
      {/* Horizontal Guideline */}
      <div className="absolute top-[65%] left-0 w-full h-px bg-petrol-base/5 z-0" />

      {/* --- CONTENT LAYER --- */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex-grow flex flex-col">
        
        {/* Top Meta Data (Spread out) */}
        <Reveal width="100%" className="flex justify-between items-start mb-12 md:mb-0">
           <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-petrol-base/40">Victor Cardoso</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-petrol-base">Engenheiro de Software</span>
           </div>
           <div className="flex flex-col gap-1 text-right">
              <div className="flex items-center justify-end gap-2 text-[10px] font-mono uppercase tracking-widest text-petrol-base/40">
                 <MapPin size={10} /> São Paulo, BR
              </div>
              <div className="flex items-center justify-end gap-2 text-[10px] font-mono uppercase tracking-widest text-petrol-base">
                 <Globe size={10} className="text-petrol-electric" /> Online
              </div>
           </div>
        </Reveal>

        {/* --- MAIN ASYMMETRIC COMPOSITION --- */}
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 h-full items-center relative">
            
            {/* LEFT: Typography Mass */}
            <div className="lg:col-span-8 flex flex-col justify-center relative z-20 pt-10 md:pt-0">
                <MotionDiv style={{ y: textY }} className="relative">
                   
                   {/* Title 1: Velocity Applied via style={{ skewX: skewVelocity }} */}
                   <MotionH1 
                     style={{ skewX: skewVelocity, transformOrigin: "bottom left" }}
                     className="text-[16vw] md:text-[9rem] lg:text-[10rem] leading-[0.8] font-serif font-light text-petrol-base tracking-tighter will-change-transform"
                   >
                     Lógica
                   </MotionH1>
                   
                   {/* Title 2 (Indented) */}
                   <div className="flex items-center gap-6 ml-2 md:ml-24 lg:ml-40">
                      <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-petrol-base/20 flex items-center justify-center shrink-0">
                         <ArrowDownRight className="text-petrol-base w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <MotionH1 
                        style={{ skewX: skewVelocity, transformOrigin: "bottom left" }}
                        className="text-[16vw] md:text-[9rem] lg:text-[10rem] leading-[0.8] font-serif font-light text-petrol-base tracking-tighter italic opacity-80 will-change-transform"
                      >
                        Estética
                      </MotionH1>
                   </div>

                   {/* Description & CTA Block */}
                   <div className="mt-12 md:mt-16 ml-2 md:ml-4 max-w-md">
                      <Reveal delay={200} variant="translate">
                        <p className="text-sm md:text-base font-light text-petrol-ink leading-relaxed mb-8 border-l border-petrol-base/20 pl-6">
                           Arquitetura de software de alta performance fundida com design editorial. <br/>
                           Construindo o futuro da web, pixel por pixel.
                        </p>
                      </Reveal>

                      <Reveal delay={300} variant="scale">
                         <Magnetic strength={0.3}>
                            <a href="#contact" onClick={(e) => handleNav(e, '#contact')}>
                              <Button 
                                variant="outline" 
                                className="rounded-full px-8 py-4 border-petrol-base text-petrol-base hover:bg-petrol-base hover:text-white transition-all duration-500 group"
                              >
                                <span className="text-[10px] tracking-[0.25em] group-hover:tracking-[0.35em] transition-all font-bold">
                                  INICIAR PROTOCOLO
                                </span>
                              </Button>
                            </a>
                         </Magnetic>
                      </Reveal>
                   </div>

                </MotionDiv>
            </div>

            {/* RIGHT: Slender Image Anchor (Bottom Right) */}
            <div className="lg:col-span-4 relative h-[50vh] lg:h-full flex items-end justify-end lg:pb-12 pointer-events-none z-10 mt-12 lg:mt-0">
               <MotionDiv 
                  style={{ y: imageY }}
                  className="relative w-[70vw] md:w-[40vw] lg:w-[24vw] aspect-[9/14] lg:mr-[-2rem]"
               >
                  <Reveal width="100%" duration={1.4} className="h-full w-full">
                      <div className="relative w-full h-full overflow-hidden rounded-t-full rounded-bl-full border border-petrol-base/10 shadow-2xl bg-slate-200">
                          <MotionImg 
                            initial={{ scale: 1.3, filter: "grayscale(100%)" }}
                            animate={{ scale: 1, filter: "grayscale(0%)" }}
                            transition={{ duration: 1.8, ease: "circOut" }}
                            src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800&h=1400" 
                            alt="Portrait" 
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Grain/Texture Overlay */}
                          <div className="absolute inset-0 bg-petrol-base/10 mix-blend-overlay"></div>
                      </div>
                      
                      {/* Decorative Label */}
                      <div className="absolute -bottom-6 -left-6 bg-paper border border-petrol-base/10 px-4 py-2 rounded-full shadow-lg z-20">
                         <span className="text-[9px] font-mono uppercase tracking-widest text-petrol-base">
                            Fig. 01 — Perfil
                         </span>
                      </div>
                  </Reveal>
               </MotionDiv>
            </div>

        </div>

      </div>

      {/* Scroll Indicator (Moved to bottom left aligned with line) */}
      <MotionDiv 
        style={{ opacity }}
        className="absolute bottom-0 left-8 md:left-[38%] -translate-x-1/2 mb-8 hidden md:flex flex-col items-center gap-2 text-petrol-base/30 z-20"
      >
         <span className="text-[9px] uppercase tracking-widest font-mono rotate-90 origin-center translate-y-[-20px]">Scroll</span>
         <div className="w-px h-16 bg-petrol-base/10 overflow-hidden relative">
            <motion.div 
               animate={{ y: ["-100%", "100%"] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
               className="absolute top-0 left-0 w-full h-1/2 bg-petrol-base"
            />
         </div>
      </MotionDiv>

    </section>
  );
};

export default Hero;