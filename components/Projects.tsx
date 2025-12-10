
import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, MoveRight, ImageIcon, CheckCircle2 } from 'lucide-react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring,
  useMotionValueEvent
} from 'framer-motion';
import ContentModal from './ui/ContentModal';
import { Reveal } from './ui/Reveal';

const MotionDiv = motion.div as any;

// --- COMPONENTE DO CARD DO PROJETO ---
const ProjectCard: React.FC<{ 
  project: typeof PROJECTS[0]; 
  index: number;
  onOpen: () => void;
}> = ({ project, index, onOpen }) => {
  return (
    <div 
      className="relative w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden group cursor-pointer bg-slate-900 border border-white/10 aspect-[4/5] md:aspect-auto"
      onClick={onOpen}
    >
      <img 
        src={project.image} 
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover z-[10] transition-transform duration-1000 ease-out group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 z-[20] bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
      
      <div className="absolute inset-0 z-[30] p-6 md:p-10 flex flex-col justify-between">
        <div className="flex justify-between items-start">
           <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white">
             {project.category}
           </span>
           <span className="text-3xl md:text-6xl font-serif text-white/10 font-bold tabular-nums">0{index + 1}</span>
        </div>

        <div className="transform transition-transform duration-500 md:translate-y-4 md:group-hover:translate-y-0">
           <h3 className="text-2xl sm:text-3xl md:text-5xl font-serif font-medium text-white mb-2 md:mb-4 leading-none tracking-tight">
             {project.title}
           </h3>
           <p className="text-slate-300 font-light leading-relaxed max-w-lg mb-6 text-sm md:text-base opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 line-clamp-2 md:line-clamp-none">
             {project.description}
           </p>
           <button 
             className="flex items-center gap-2 px-5 py-2 md:px-6 md:py-3 bg-white text-slate-900 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors w-max opacity-100 md:opacity-0 md:group-hover:opacity-100"
           >
             Ver Detalhes <ImageIcon size={14} />
           </button>
        </div>
      </div>
    </div>
  );
};

// --- CONTEÚDO DO MODAL (ESTUDO DE CASO) ---
const ProjectDetailContent: React.FC<{ project: typeof PROJECTS[0] }> = ({ project }) => {
  return (
    <div className="container mx-auto px-4 md:px-20 py-8 md:py-16 max-w-7xl">
      {/* Hero Image inside Modal */}
      <div className="w-full h-[30vh] md:h-[60vh] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-8 md:mb-12 shadow-sm relative group">
         <img 
           src={project.image} 
           alt={project.title} 
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20">
         {/* Sidebar */}
         <div className="lg:col-span-4 space-y-6 md:space-y-8">
            <div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Descrição</h3>
               <p className="text-slate-700 leading-relaxed font-light text-base md:text-lg">
                 {project.description}
               </p>
            </div>
            <div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Tecnologias</h3>
               <div className="flex flex-wrap gap-2">
                 {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600">
                      {tag}
                    </span>
                 ))}
               </div>
            </div>
            <div className="pt-6 border-t border-slate-200">
               <a 
                 href={project.link} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 text-slate-900 font-bold uppercase tracking-widest text-xs hover:text-slate-600 transition-colors"
               >
                 Visitar Projeto Real <ArrowUpRight size={14} />
               </a>
            </div>
         </div>

         {/* Content */}
         <div className="lg:col-span-8">
            <h3 className="text-2xl md:text-4xl font-serif font-medium text-slate-900 mb-6 md:mb-8">Estudo de Caso</h3>
            <div className="space-y-8 md:space-y-12">
               <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex items-start gap-4 mb-4">
                     <div className="p-2 bg-slate-100 rounded-lg text-slate-900 font-bold text-sm md:text-base">01</div>
                     <h4 className="text-lg md:text-xl font-serif font-bold text-slate-900 pt-1">O Desafio</h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-light pl-0 md:pl-[3.25rem] text-sm md:text-base">{project.caseStudy.challenge}</p>
               </div>
               <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex items-start gap-4 mb-4">
                     <div className="p-2 bg-slate-100 rounded-lg text-slate-900 font-bold text-sm md:text-base">02</div>
                     <h4 className="text-lg md:text-xl font-serif font-bold text-slate-900 pt-1">A Solução</h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-light pl-0 md:pl-[3.25rem] text-sm md:text-base">{project.caseStudy.solution}</p>
               </div>
               <div className="bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl text-white">
                  <div className="flex items-start gap-4 mb-4">
                     <div className="p-2 bg-slate-800 rounded-lg text-white font-bold text-sm md:text-base"><CheckCircle2 size={16} /></div>
                     <h4 className="text-lg md:text-xl font-serif font-bold text-white pt-1">Resultados</h4>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-light pl-0 md:pl-[3.25rem] text-sm md:text-base">{project.caseStudy.result}</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---

const Projects: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  
  // State for layout Logic
  const [isMobile, setIsMobile] = useState(false);
  const [dynamicHeight, setDynamicHeight] = useState(0); 
  const [xRange, setXRange] = useState(0);

  // 1. Detectar Mobile e Calcular Tamanhos
  useEffect(() => {
    const calculateDimensions = () => {
      const mobile = window.matchMedia("(max-width: 1023px)").matches;
      setIsMobile(mobile);

      if (!mobile && horizontalContainerRef.current) {
        // Largura total do conteúdo horizontal
        const scrollWidth = horizontalContainerRef.current.scrollWidth;
        // Largura da janela visível
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // O quanto precisamos mover para a esquerda
        const distanceToScroll = scrollWidth - viewportWidth;

        setXRange(distanceToScroll);
        // Altura da seção = Distância de Scroll + Altura da Janela (para garantir que paramos no fim)
        setDynamicHeight(distanceToScroll + viewportHeight);
      } else {
        setDynamicHeight(0); // Altura automática no mobile
      }
    };

    calculateDimensions();

    // ResizeObserver é mais robusto que window 'resize'
    const resizeObserver = new ResizeObserver(() => {
        // Debounce leve para performance
        window.requestAnimationFrame(calculateDimensions);
    });

    if (horizontalContainerRef.current) {
        resizeObserver.observe(horizontalContainerRef.current);
    }
    
    // Fallback listener
    window.addEventListener('resize', calculateDimensions);

    return () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', calculateDimensions);
    };
  }, []);

  // 2. Lógica de Scroll do Framer Motion
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Começa quando o topo da seção atinge o topo da tela
    offset: ["start start", "end end"]
  });

  // Física suave para evitar "jitter", mas mantendo responsividade
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
    mass: 0.2
  });

  // Mapeia 0-1 (progresso vertical) para 0 até -xRange (movimento horizontal)
  const x = useTransform(smoothProgress, [0, 1], ["0px", `-${xRange}px`]);

  return (
    <>
      <section 
        id="projects" 
        ref={targetRef} 
        className="relative bg-slate-950 w-full"
        style={{ 
          // Desktop: Altura exata para acomodar o scroll horizontal via sticky
          // Mobile: Altura automática
          height: !isMobile && dynamicHeight > 0 ? `${dynamicHeight}px` : 'auto' 
        }}
      >
        {/* Background Texture */}
        <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50 contrast-150 fixed"></div>

        {/* Sticky Container */}
        <div 
          className={`
            w-full z-[10] flex items-center
            ${isMobile ? 'relative flex-col py-20' : 'sticky top-0 h-screen overflow-hidden'}
          `}
        >
          {/* 
             Movable Track 
             Desktop: Move-se via transform (x)
             Mobile: Scroll nativo (overflow-x-auto) com snap
          */}
          <MotionDiv 
            ref={horizontalContainerRef}
            style={!isMobile ? { x } : {}} // Aplica transformação apenas desktop
            className={`
              flex items-center
              ${isMobile 
                ? 'w-full overflow-x-auto snap-x snap-mandatory px-6 gap-6 pb-12 pt-4 no-scrollbar' 
                : 'h-full gap-20 px-20 w-max min-w-max will-change-transform' 
              }
            `}
          >
            
            {/* 1. Header Card */}
            <div className={`shrink-0 flex flex-col justify-center ${isMobile ? 'snap-center w-[85vw]' : 'w-[25vw] max-w-md'}`}>
               <div className="pl-4 border-l-2 border-white/20">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 md:mb-4 block">
                    Portfólio Selecionado
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-medium text-white leading-none mb-4 md:mb-6">
                    Projetos <br /> <span className="text-slate-500 italic">Recentes</span>
                  </h2>
                  <p className="text-slate-400 font-light leading-relaxed max-w-sm text-sm md:text-base">
                     Uma curadoria de trabalhos focados em resolver problemas complexos com design elegante e código performático.
                     {!isMobile && (
                        <span className="block mt-6 text-white font-medium text-xs uppercase tracking-widest flex items-center gap-2">
                           <MoveRight className="animate-pulse" size={16} /> Role para explorar
                        </span>
                     )}
                  </p>
               </div>
            </div>

            {/* 2. Project Cards */}
            {PROJECTS.map((project, index) => (
              <div 
                key={index}
                className={`${isMobile ? 'snap-center w-[85vw]' : 'w-[45vw] h-[70vh]'} shrink-0`}
              >
                <ProjectCard 
                  project={project} 
                  index={index} 
                  onOpen={() => setSelectedProject(project)}
                />
              </div>
            ))}

            {/* 3. CTA Card / Spacer Final */}
            <div className={`shrink-0 flex items-center justify-center ${isMobile ? 'snap-center w-[85vw]' : 'w-[20vw] h-full pr-20'}`}>
                <a href="#contact" className="group flex flex-col items-center justify-center gap-6 text-center">
                   <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all duration-500 scale-100 group-hover:scale-110">
                      <ArrowUpRight size={32} className="text-white group-hover:text-slate-900" />
                   </div>
                   <div>
                     <h3 className="text-2xl md:text-4xl font-serif text-white mb-2">Seu Projeto Aqui</h3>
                     <p className="text-xs md:text-sm text-slate-400 font-bold uppercase tracking-widest underline decoration-slate-700 underline-offset-4 group-hover:text-white group-hover:decoration-white transition-all">
                       Vamos conversar
                     </p>
                   </div>
                </a>
            </div>

          </MotionDiv>
        </div>
      </section>

      {/* Modal - Isolamento de Scroll Reforçado */}
      <ContentModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        category={selectedProject?.category}
      >
        {selectedProject && <ProjectDetailContent project={selectedProject} />}
      </ContentModal>
    </>
  );
};

export default Projects;
