import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Reveal } from './ui/Reveal';
import { TextReveal } from './ui/TextReveal';
import Button from './ui/Button';
import Magnetic from './ui/Magnetic';
import { usePageTransition } from './ui/PageTransition';
import { ArrowDown } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionImg = motion.img as any;

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Physics for Parallax
  const smoothY = useSpring(scrollY, { damping: 20, stiffness: 100, mass: 0.8 });
  const y = useTransform(smoothY, [0, 1000], [0, 200]); 
  const opacity = useTransform(smoothY, [0, 500], [1, 0]);
  
  // Micro-interaction: Zoom out image on scroll
  const scale = useTransform(smoothY, [0, 500], [1.1, 1]);

  const { transitionTo } = usePageTransition();

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    transitionTo(href);
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center pt-32 pb-20 relative overflow-hidden bg-paper text-petrol-base">
      
      {/* Central Axis Line (The Archive Spine) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-petrol-base/10 hidden md:block z-0" />
      
      {/* Decorative Horizontal Lines */}
      <div className="absolute top-32 left-0 w-full h-[1px] bg-petrol-base/5 z-0" />
      <div className="absolute bottom-32 left-0 w-full h-[1px] bg-petrol-base/5 z-0" />

      <div className="container mx-auto px-5 sm:px-6 md:px-12 xl:px-20 relative z-10">
        
        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
          
          {/* Left Column: Metadata & Main Title */}
          <div className="md:col-span-7 flex flex-col justify-center relative">
             <Reveal width="100%">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-1.5 h-1.5 bg-petrol-accent rounded-full animate-pulse"></div>
                   <span className="text-micro text-petrol-base opacity-60">
                     sys.profile / v.2024
                   </span>
                </div>
             </Reveal>

             <div className="relative z-20">
               <h1 className="font-serif font-medium tracking-tighter text-petrol-base font-heading-tight">
                 <div className="text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.9] -ml-[0.05em]">
                    <TextReveal delay={100}>Não apenas</TextReveal>
                 </div>
                 <div className="text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.9] italic text-petrol-base/40 pl-12 md:pl-24">
                    <TextReveal delay={200}>código.</TextReveal>
                 </div>
                 <div className="text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.9] -ml-[0.05em] mt-4">
                    <TextReveal delay={300}>Legados</TextReveal>
                 </div>
                 <div className="text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.9] text-petrol-accent pl-8 md:pl-16">
                    <TextReveal delay={400}>Digitais.</TextReveal>
                 </div>
               </h1>
             </div>

             <div className="mt-12 md:mt-16 max-w-md">
                <Reveal delay={500}>
                   <p className="text-lg md:text-xl text-petrol-ink font-light leading-relaxed border-l border-petrol-base/20 pl-6">
                      Engenheiro de Software focado em <span className="text-petrol-base font-medium">perenidade</span> e <span className="text-petrol-base font-medium">precisão</span>.
                      Construo sistemas que sobrevivem ao hype.
                   </p>
                </Reveal>

                <div className="flex flex-wrap gap-6 mt-10 pl-6">
                    <Magnetic strength={0.3}>
                        <a href="#contact" onClick={(e) => handleNav(e, '#contact')}>
                          <Button 
                            variant="primary" 
                            size="lg" 
                            className="bg-petrol-base text-white hover:bg-petrol-mid rounded-full px-8 py-4 text-xs tracking-widest shadow-xl border border-white/10"
                          >
                            Iniciar Conversa
                          </Button>
                        </a>
                    </Magnetic>
                </div>
             </div>
          </div>

          {/* Right Column: Imagery (Asymmetric, breaking the grid) */}
          <div className="md:col-span-5 relative flex flex-col justify-end items-end mt-12 md:mt-0">
             
             {/* Abstract Code/Data block */}
             <div className="absolute top-0 right-0 font-mono text-[10px] text-petrol-base/20 text-right leading-tight hidden md:block">
                01000101 01001110 01000111<br/>
                01001001 01001110 01000101<br/>
                01000101 01010010 01001001<br/>
                01001110 01000111 00100000<br/>
                01000100 01001111 01000011<br/>
             </div>

             <Reveal width="100%" delay={300}>
                <MotionDiv style={{ y, opacity }} className="relative z-10 w-full max-w-sm ml-auto mr-0 md:-mr-12 lg:-mr-20">
                   {/* Technical Frame */}
                   <div className="absolute -inset-4 border border-petrol-base/10 z-0">
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-petrol-base"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-petrol-base"></div>
                   </div>

                   <div className="aspect-[3/4] overflow-hidden bg-slate-200 relative grayscale hover:grayscale-0 transition-all duration-700 ease-out-expo">
                      <MotionImg 
                        style={{ scale }}
                        src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800&h=1000" 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-petrol-base/10 mix-blend-multiply"></div>
                   </div>

                   {/* Floating Caption */}
                   <div className="absolute -left-12 bottom-12 bg-paper border border-petrol-base/10 p-4 shadow-lg z-20 max-w-[160px]">
                      <span className="text-micro text-petrol-base opacity-50 block mb-1">Status</span>
                      <div className="flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                         <span className="text-xs font-bold text-petrol-base">Disponível</span>
                      </div>
                   </div>
                </MotionDiv>
             </Reveal>

             {/* Scroll Indicator */}
             <div className="absolute bottom-0 right-0 md:right-auto md:left-0 text-petrol-base/30 animate-bounce">
                <ArrowDown size={24} strokeWidth={1} />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;