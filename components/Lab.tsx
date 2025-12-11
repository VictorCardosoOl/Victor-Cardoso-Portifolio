
import React, { useRef, useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Tilt from './ui/Tilt';

interface Experiment {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  video: string | null;
  link: string;
}

const EXPERIMENTS: Experiment[] = [
    {
        id: 1,
        title: "Liquid Metal",
        category: "WebGL Shader",
        description: "Simulação de fluidos em tempo real com física de partículas.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=600",
        video: "https://cdn.coverr.co/videos/coverr-abstract-colorful-fluid-structure-5250/1080p.mp4", 
        link: "https://codepen.io"
    },
    {
        id: 2,
        title: "Kinetics Type",
        category: "Interactive Design",
        description: "Tipografia reativa que responde ao movimento do cursor.",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800&h=600",
        video: null,
        link: "https://codepen.io"
    },
    {
        id: 3,
        title: "Raymarching",
        category: "Creative Coding",
        description: "Exploração de renderização volumétrica usando Three.js.",
        image: "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?auto=format&fit=crop&q=80&w=800&h=600",
        video: "https://cdn.coverr.co/videos/coverr-colorful-fluid-animation-1566/1080p.mp4",
        link: "https://codepen.io"
    },
    {
        id: 4,
        title: "Generative Grid",
        category: "Algorithmic Art",
        description: "Padrões geométricos gerados proceduralmente.",
        image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=800&h=600",
        video: null,
        link: "https://codepen.io"
    }
];

const Lab: React.FC = () => {
  return (
    <section id="lab" className="py-24 md:py-32 relative bg-white border-t border-slate-100 z-10">
      
      <div className="container mx-auto px-5 md:px-12 xl:px-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-4 md:gap-6 border-b border-slate-100 pb-12">
          <Reveal>
            <div>
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 block">Playground</span>
               <h2 className="text-4xl md:text-6xl font-serif font-medium text-slate-900 tracking-tight">
                 Lab <span className="text-slate-300 italic">&</span> Exp.
               </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-xs text-xs md:text-sm text-slate-500 font-light leading-relaxed text-left">
              Uma coleção de ensaios visuais e shaders.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {EXPERIMENTS.map((exp, index) => (
                <ExperimentCard key={exp.id} exp={exp} index={index} />
             ))}
        </div>
      </div>
    </section>
  );
};

const ExperimentCard: React.FC<{ exp: Experiment, index: number }> = ({ exp, index }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleMouseEnter = () => {
        if (exp.video && videoRef.current) {
            videoRef.current.play().catch(() => {}); 
            setIsPlaying(true);
        }
    };

    const handleMouseLeave = () => {
        if (exp.video && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    return (
        <Reveal delay={index * 100} width="100%">
            <a 
                href={exp.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group relative aspect-[16/10] overflow-hidden bg-slate-100"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Content Overlay - Default State */}
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between transition-opacity duration-500 group-hover:opacity-0 bg-white/5">
                    <div className="flex justify-between items-start">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white/80 backdrop-blur px-2 py-1">{exp.category}</span>
                         <ArrowUpRight size={18} className="text-slate-400" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-serif text-slate-900 bg-white/80 backdrop-blur inline-block px-2 py-1">{exp.title}</h3>
                    </div>
                </div>

                {/* Media */}
                <div className="absolute inset-0 z-0 grayscale group-hover:grayscale-0 transition-all duration-700">
                    {exp.video && (
                        <video 
                            ref={videoRef}
                            src={exp.video}
                            muted
                            loop
                            playsInline
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                        />
                    )}
                    <img 
                        src={exp.image} 
                        alt={exp.title} 
                        className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${isPlaying ? 'opacity-0' : 'opacity-100'}`} 
                    />
                </div>
            </a>
        </Reveal>
    );
};

export default Lab;
