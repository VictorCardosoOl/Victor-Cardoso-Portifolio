
import React, { useRef } from 'react';
import { ArrowUpRight, Play, FlaskConical } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Tilt from './ui/Tilt';

const EXPERIMENTS = [
    {
        id: 1,
        title: "Liquid Metal",
        category: "WebGL Shader",
        description: "Simulação de fluidos em tempo real com física de partículas e refração.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=600",
        video: "https://cdn.coverr.co/videos/coverr-molten-metal-2548/1080p.mp4", // Free stock video for demo
        link: "https://codepen.io"
    },
    {
        id: 2,
        title: "Kinetics Type",
        category: "Interactive Design",
        description: "Tipografia reativa que responde à velocidade e direção do cursor.",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800&h=600",
        // No video, fallback to image
        link: "https://codepen.io"
    },
    {
        id: 3,
        title: "Raymarching",
        category: "Creative Coding",
        description: "Exploração de renderização volumétrica e sombras suaves usando Three.js.",
        image: "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?auto=format&fit=crop&q=80&w=800&h=600",
        link: "https://codepen.io"
    },
    {
        id: 4,
        title: "Generative Grid",
        category: "Algorithmic Art",
        description: "Padrões geométricos gerados proceduralmente com ruído Perlin.",
        image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=800&h=600",
        link: "https://codepen.io"
    }
];

const ExperimentCard = ({ exp, index }: { exp: typeof EXPERIMENTS[0], index: number }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => {}); // Catch play errors (e.g. user interaction policy)
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <Reveal delay={index * 100} width="100%">
            <a 
                href={exp.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group relative aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-[2.5rem] cursor-none border border-white/5 bg-slate-800"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Tilt strength={5} className="w-full h-full">
                    <div className="w-full h-full relative">
                        {/* Media Layer */}
                        <div className="absolute inset-0 z-0">
                            {/* Base Image */}
                            <img 
                                src={exp.image} 
                                alt={exp.title} 
                                className={`w-full h-full object-cover transition-transform duration-[0.8s] ease-[0.25,1,0.5,1] group-hover:scale-105 ${exp.video ? 'group-hover:opacity-0 transition-opacity duration-300' : 'opacity-80 group-hover:opacity-60'}`} 
                            />
                            
                            {/* Optional Video Layer */}
                            {exp.video && (
                                <video
                                    ref={videoRef}
                                    src={exp.video}
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                />
                            )}
                        </div>

                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-10"></div>
                        
                        {/* Content Layer */}
                        <div className="absolute inset-0 z-20 p-8 md:p-10 flex flex-col justify-end">
                            {/* Center Play Button Interaction */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out-expo shadow-2xl">
                                    <Play fill="currentColor" size={24} className="ml-1" />
                                </div>
                            </div>

                            <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out-expo">
                                <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    <div className="flex items-center gap-2">
                                        <FlaskConical size={14} className="text-indigo-400" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">{exp.category}</span>
                                    </div>
                                    <ArrowUpRight size={18} className="text-white opacity-50 group-hover:opacity-100" />
                                </div>
                                
                                <h3 className="text-3xl md:text-4xl font-serif text-white mb-3 group-hover:text-indigo-100 transition-colors">{exp.title}</h3>
                                
                                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                                    <p className="text-sm text-slate-300 font-light max-w-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 pb-2">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Tilt>
            </a>
        </Reveal>
    );
};

const Lab: React.FC = () => {
  return (
    <section id="lab" className="py-32 relative bg-slate-950 text-white z-10 overflow-hidden">
      {/* Dark Ambiance Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#030305] z-0"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-950/20 rounded-full blur-[200px] pointer-events-none opacity-40 z-0"></div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6 border-b border-white/5 pb-12">
          <Reveal>
            <div>
               <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4 block">R&D</span>
               <h2 className="text-5xl md:text-6xl font-serif font-medium text-white tracking-tight">
                 Laboratório <span className="text-slate-600 block md:inline italic">& Experimentos</span>
               </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-xs text-sm text-slate-400 font-light leading-relaxed text-right md:text-left">
              Onde o código encontra a arte. Uma coleção de shaders WebGL, animações complexas e interações experimentais.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             {EXPERIMENTS.map((exp, index) => (
                <ExperimentCard key={exp.id} exp={exp} index={index} />
             ))}
        </div>
      </div>
    </section>
  );
};

export default Lab;
