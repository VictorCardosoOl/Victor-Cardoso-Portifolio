
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, MoveRight, ImageIcon, Maximize2 } from 'lucide-react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring,
  useInView
} from 'framer-motion';
import ContentModal from './ui/ContentModal';
import { ProjectDetailContent } from './ProjectDetailContent';

const MotionDiv = motion.div as any;
const MotionImg = motion.img as any;

// --- SUB-COMPONENT: Cartão do Projeto (Redesenhado) ---
const ProjectCard: React.FC<{ 
  project: typeof PROJECTS[0]; 
  index: number;
  onOpen: () => void;
  isMobile: boolean;
}> = ({ project, index, onOpen, isMobile }) => {
  return (
    <div 
      className={`
        relative shrink-0 rounded-[2rem] md:rounded-[3rem] overflow-hidden group cursor-pointer bg-slate-900 border border-white/10 shadow-2xl
        ${isMobile 
          ? 'w-[85vw] h-[55vh] snap-center' 
          : 'w-[550px] lg:w-[700px] h-[65vh] lg:h-[75vh] transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
        }
      `}
      onClick={onOpen}
    >
      {/* Imagem com Parallax suave no hover */}
      <div className="absolute inset-0 overflow-hidden">
        <MotionImg 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Overlay Gradiente */}
      <div className="absolute inset-0 z-[20] bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
      
      {/* Conteúdo */}
      <div className="absolute inset-0 z-[30] p-8 md:p-12 flex flex-col justify-between">
        
        {/* Topo do Card */}
        <div className="flex justify-between items-start translate-y-0 transition-transform duration-500">
           <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white group-hover:bg-white group-hover:text-slate-900 transition-colors">
             {project.category}
           </span>
           <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-100 scale-50">
              <Maximize2 size={18} />
           </div>
        </div>

        {/* Base do Card */}
        <div className="transform transition-transform duration-500 translate-y-4 md:translate-y-8 group-hover:translate-y-0">
           <span className="block text-4xl md:text-6xl font-serif font-bold text-white/20 mb-2 tabular-nums">
             0{index + 1}
           </span>
           <h3 className="text-3xl md:text-5xl font-serif font-medium text-white mb-4 leading-none tracking-tight">
             {project.title}
           </h3>
           
           <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
             <p className="text-slate-300 font-light leading-relaxed max-w-lg mb-6 text-sm md:text-base line-clamp-2 md:line-clamp-none">
               {project.description}
             </p>
             <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 w-max">
               Ver Case Completo <ArrowUpRight size={14} />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null); // Container fantasma (altura vertical)
  const trackRef = useRef<HTMLDivElement>(null);     // Faixa horizontal (conteúdo)
  
  const [scrollRange, setScrollRange] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  // 1. Lógica de Redimensionamento (Robusta)
  useLayoutEffect(() => {
    const updateMeasurements = () => {
      if (!trackRef.current) return;

      const mobile = window.matchMedia("(max-width: 1023px)").matches;
      setIsMobile(mobile);

      if (!mobile) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // A distância que precisamos rolar é: Tamanho Total - Tamanho da Tela
        const distance = trackWidth - viewportWidth;
        // Adiciona um padding extra no final para não "cortar" seco (opcional, +100px)
        setScrollRange(Math.max(0, distance));
      } else {
        setScrollRange(0);
      }
    };

    updateMeasurements();

    const resizeObserver = new ResizeObserver(() => {
      // Pequeno delay para garantir que o layout estabilizou (evita flicker em fullscreen)
      requestAnimationFrame(updateMeasurements);
    });

    if (trackRef.current) resizeObserver.observe(trackRef.current);
    window.addEventListener('resize', updateMeasurements);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateMeasurements);
    };
  }, []);

  // 2. Framer Motion Scroll Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Física 1:1 (Sem spring para evitar sensação de "gelatina" no scroll preciso, ou spring bem rígido)
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  
  // Opção com Spring Suave (Descomente se preferir inércia)
  const smoothX = useSpring(x, { damping: 40, stiffness: 200, mass: 0.5 });

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="relative bg-slate-950 w-full"
      style={{ 
        // A altura da seção define quanto tempo o scroll dura.
        // Altura = ScrollRange (distância horizontal) + ViewportHeight (uma tela inteira)
        height: isMobile ? 'auto' : `${scrollRange + (typeof window !== 'undefined' ? window.innerHeight : 1000)}px`,
      }}
    >
      {/* Background Noise & Grain */}
      <div className="absolute inset-0 z-[0] opacity-30 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50 contrast-150 fixed mix-blend-overlay"></div>
      
      {/* STICKY CONTAINER: O palco onde a mágica acontece */}
      <div 
        className={`
          w-full bg-slate-950 overflow-hidden
          ${isMobile 
            ? 'relative py-24'  // Mobile: Fluxo normal
            : 'sticky top-0 h-screen flex items-center' // Desktop: Preso no topo
          }
        `}
      >
        
        {/* TRACK: O conteúdo que desliza */}
        <MotionDiv 
          ref={trackRef}
          style={!isMobile ? { x: smoothX } : {}}
          className={`
            flex items-center 
            ${isMobile 
              ? 'w-full overflow-x-auto snap-x snap-mandatory px-6 gap-6 no-scrollbar pb-10' // Mobile Style
              : 'h-full px-20 gap-20 w-max' // Desktop Style
            }
          `}
        >
          {/* HEADER (Intro) */}
          <div className={`
             flex flex-col justify-center shrink-0 
             ${isMobile ? 'w-[85vw] snap-center pt-10' : 'w-[25vw] min-w-[350px]'}
          `}>
             <div className="border-l-2 border-white/20 pl-6 md:pl-8">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 block">
                  Portfólio
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-white leading-[0.9] mb-6 md:mb-8">
                  Obras <br /> <span className="text-slate-600 italic">Recentes</span>
                </h2>
                <p className="text-slate-400 font-light leading-relaxed max-w-sm text-sm md:text-base mb-8">
                   Uma seleção de projetos onde design e engenharia se encontram para resolver problemas complexos.
                </p>
                
                <div className="flex items-center gap-4 text-white font-bold text-xs uppercase tracking-widest">
                   {isMobile ? (
                     <>Deslize <MoveRight className="animate-pulse" size={16} /></>
                   ) : (
                     <>Scroll Down <MoveRight className="rotate-90" size={16} /></>
                   )}
                </div>
             </div>
          </div>

          {/* LISTA DE PROJETOS */}
          {PROJECTS.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index} 
              onOpen={() => setSelectedProject(project)}
              isMobile={isMobile}
            />
          ))}

          {/* FINAL CTA CARD */}
          <div className={`
            flex items-center justify-center shrink-0
            ${isMobile ? 'w-[85vw] snap-center' : 'w-[25vw] min-w-[350px] h-[60vh]'}
          `}>
              <a href="#contact" className="group relative w-full h-full rounded-[3rem] border border-dashed border-white/10 flex flex-col items-center justify-center gap-6 hover:bg-white/5 transition-colors overflow-hidden">
                 <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 z-10">
                    <ArrowUpRight size={32} className="text-white" />
                 </div>
                 <div className="text-center z-10">
                   <h3 className="text-3xl font-serif text-white mb-2">Seu Projeto</h3>
                   <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                     Iniciar conversa
                   </p>
                 </div>
              </a>
          </div>
        </MotionDiv>
        
        {/* Barra de Progresso (Visual Desktop) */}
        {!isMobile && (
          <div className="absolute bottom-12 left-20 right-20 h-[1px] bg-white/10 rounded-full overflow-hidden">
             <motion.div 
               style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
               className="h-full bg-white"
             />
          </div>
        )}

      </div>

      {/* Modal Renderizado */}
      <ContentModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        category={selectedProject?.category}
      >
        {selectedProject && <ProjectDetailContent project={selectedProject} />}
      </ContentModal>
    </section>
  );
};

export default Projects;
