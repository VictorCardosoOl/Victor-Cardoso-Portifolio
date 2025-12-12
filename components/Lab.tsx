import React, { useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { ArchiveLine } from './ui/ArchiveLine';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

const MotionDiv = motion.div as any;

interface Experiment {
  id: number;
  title: string;
  category: string;
  image: string;
  link: string;
}

const EXPERIMENTS: Experiment[] = [
    {
        id: 1,
        title: "Liquid Metal",
        category: "WebGL Shader",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=600",
        link: "https://codepen.io"
    },
    {
        id: 2,
        title: "Kinetics Type",
        category: "Interactive Design",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800&h=600",
        link: "https://codepen.io"
    },
    {
        id: 3,
        title: "Raymarching",
        category: "Creative Coding",
        image: "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?auto=format&fit=crop&q=80&w=800&h=600",
        link: "https://codepen.io"
    },
    {
        id: 4,
        title: "Generative Grid",
        category: "Algorithmic Art",
        image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=800&h=600",
        link: "https://codepen.io"
    }
];

const Lab: React.FC = () => {
  // --- Micro-interaction: Velocity Skew ---
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  // Transform scroll velocity to skew angle (e.g. max 5 degrees)
  const skewVelocity = useTransform(scrollVelocity, [-1000, 1000], [-3, 3]);
  const smoothSkew = useSpring(skewVelocity, { damping: 20, stiffness: 400 });

  return (
    <section id="lab" className="py-24 bg-petrol-base text-paper relative overflow-hidden">
      
      <div className="container mx-auto px-5 md:px-12 xl:px-20 relative z-10 mb-12">
        <div className="border-b border-white/10 pb-4 mb-8">
            <span className="text-micro text-white/40">Arquivo.02 / Experimentos</span>
        </div>
        
        <div className="flex justify-between items-end">
          <Reveal>
            <div>
               <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight">
                 O Laboratório
               </h2>
               <p className="text-white/60 font-light mt-2 max-w-sm">
                 Explorações em código criativo, shaders e interatividade avançada.
               </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
             <div className="hidden md:flex items-center gap-2 text-micro text-white/40">
                <span>Arraste para explorar</span> <ArrowRight size={12} />
             </div>
          </Reveal>
        </div>
      </div>

      {/* Horizontal Scroll Gallery - Infinite Marquee Feel */}
      <MotionDiv 
        style={{ skewX: smoothSkew }}
        className="relative w-full overflow-x-auto pb-12 hide-scrollbar cursor-grab active:cursor-grabbing pl-5 md:pl-12 xl:pl-20"
      >
         <div className="flex gap-1 md:gap-1 w-max pr-12">
             {EXPERIMENTS.map((exp, index) => (
                <div key={exp.id} className="w-[320px] md:w-[450px] flex-shrink-0 group relative border-r border-white/10 pr-8">
                    <Reveal delay={index * 100} width="100%">
                        <a href={exp.link} target="_blank" rel="noopener noreferrer" className="block relative">
                            {/* Image Container */}
                            <div className="aspect-[16/9] overflow-hidden bg-white/5 mb-6 relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                <img 
                                    src={exp.image} 
                                    alt={exp.title} 
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                   <div className="w-12 h-12 rounded-full bg-white text-petrol-base flex items-center justify-center">
                                      <Play size={16} fill="currentColor" />
                                   </div>
                                </div>
                            </div>
                            
                            {/* Info */}
                            <div className="flex justify-between items-end border-t border-white/10 pt-4">
                                <div>
                                    <span className="text-micro text-petrol-accent mb-1 block">{exp.category}</span>
                                    <h3 className="text-2xl font-serif text-white">{exp.title}</h3>
                                </div>
                                <span className="text-micro text-white/20">EXP_0{exp.id}</span>
                            </div>
                        </a>
                    </Reveal>
                </div>
             ))}
         </div>
      </MotionDiv>
      
      {/* Inline styles for hiding scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Lab;