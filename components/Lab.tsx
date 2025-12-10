
import React, { useRef, useState } from 'react';
import { ArrowUpRight, Play, Pause } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Tilt from './ui/Tilt';

const EXPERIMENTS = [
    {
        id: 1,
        title: "Liquid Metal",
        category: "WebGL Shader",
        description: "Simulação de fluidos em tempo real com física de partículas.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=600",
        video: "https://cdn.coverr.co/videos/coverr-abstract-colorful-fluid-structure-5250/1080p.mp4", // Placeholder stock video
        link: "https://codepen.io"
    },
    {
        id: 2,
        title: "Kinetics Type",
        category: "Interactive Design",
        description: "Tipografia reativa que responde ao movimento do cursor.",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800&h=600",
        video: null, // Image fallback
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
    <section id="lab" className="py-20 md:py-32 relative bg-slate-900 text-white z-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[#050505] z-0"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-purple-900/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none opacity-40 z-0"></div>

      <div className="container mx-auto px-5 md:px-12 xl:px-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-4 md:gap-6">
          <Reveal>
            <div>
               <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 md:mb-4 block">Playground Visual</span>
               <h2 className="text-3xl md:text-5xl font-serif font-medium text-white tracking-tight">
                 Lab & <span className="italic text-slate-600">Experimentos</span>
               </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-xs text-xs md:text-sm text-slate-400 font-light leading-relaxed text-left">
              Uma coleção de ensaios visuais, shaders e interações experimentais que desafiam o navegador.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
             {EXPERIMENTS.map((exp, index) => (
                <ExperimentCard key={exp.id} exp={exp} index={index} />
             ))}
        </div>
      </div>
    </section>
  );
};

const ExperimentCard: React.FC<{ exp: typeof EXPERIMENTS[number], index: number }> = ({ exp, index }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleMouseEnter = () => {
        if (exp.video && videoRef.current) {
            videoRef.current.play().catch(() => {}); // catch autoplay policies
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
                className="block group relative aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] cursor-none"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Tilt strength={8} className="w-full h-full">
                    <div className="w-full h-full relative bg-slate-800">
                        {/* Video Element */}
                        {exp.video && (
                            <video 
                                ref={videoRef}
                                src={exp.video}
                                muted
                                loop
                                playsInline
                                className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                            />
                        )}

                        <img 
                            src={exp.image} 
                            alt={exp.title} 
                            className={`w-full h-full object-cover transition-all duration-[0.7s] ease-[0.25,1,0.5,1] group-hover:scale-105 ${isPlaying ? 'opacity-0' : 'opacity-80 group-hover:opacity-60'}`} 
                        />
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-10" />

                        {/* Content */}
                        <div className="absolute inset-0 z-20 p-8 md:p-10 flex flex-col justify-end">
                            {/* Play Icon / Status */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 scale-100 md:scale-50 md:group-hover:scale-100 transition-all duration-500">
                                {isPlaying ? (
                                    <div className="w-3 h-3 bg-white rounded-sm animate-pulse" />
                                ) : (
                                    <Play fill="currentColor" size={20} className="ml-1" />
                                )}
                            </div>

                            <div className="transform translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">{exp.category}</span>
                                    <ArrowUpRight size={20} className="text-white" />
                                </div>
                                <h3 className="text-3xl font-serif text-white mb-2">{exp.title}</h3>
                                <p className="text-sm text-slate-300 font-light max-w-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </Tilt>
            </a>
        </Reveal>
    );
};

export default Lab;
