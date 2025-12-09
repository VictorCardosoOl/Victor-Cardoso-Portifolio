
import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { Plus, ArrowUpRight, MoveRight } from 'lucide-react';
import { useLenis } from './ScrollContext';
import { 
  motion, 
  useSpring, 
  useMotionValue, 
  AnimatePresence 
} from 'framer-motion';

const MotionDiv = motion.div as any;

// --- CONFIGURAÇÃO DE FÍSICA E PARÂMETROS ---
const PHYSICS = {
  wheelMultiplier: 2.2,    // Aumentado levemente para scroll mais responsivo
  spring: {
    damping: 50,           // Mais 'peso' para sensação premium
    stiffness: 250,        // Retorno mais rápido
    mass: 1.2
  },
  snapThreshold: 100,      // Pixels de proximidade para atrair ao topo (Snap)
};

// --- COMPONENTES AUXILIARES ---

// 3. UI DE ESTADO (Barra de Progresso)
const ProgressIndicator: React.FC<{ progress: number; isVisible: boolean }> = ({ progress, isVisible }) => {
  return (
    <MotionDiv 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="absolute bottom-8 right-8 z-[60] flex items-center gap-4 bg-slate-950/80 backdrop-blur-md px-5 py-3 rounded-full border border-white/10 shadow-2xl"
    >
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest tabular-nums w-8 text-right">
        {Math.round(progress * 100)}%
      </span>
      <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
        <MotionDiv 
          className="h-full bg-white"
          style={{ width: `${progress * 100}%` }}
          layout // Smooth width transition
        />
      </div>
      <MoveRight size={14} className="text-white" />
    </MotionDiv>
  );
};

// --- COMPONENTE PRINCIPAL ---

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Estados de Controle
  const [isActive, setIsActive] = useState(false);
  const [isInView, setIsInView] = useState(false); // Apenas para saber se estamos PERTO
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Valores de Movimento (Física)
  const x = useMotionValue(0);
  const springX = useSpring(x, PHYSICS.spring);
  const containerWidth = useRef(0);
  const trackWidth = useRef(0);
  
  // Controle de Saída
  const reverseScrollCount = useRef(0);

  // --- RESPONSIVIDADE & SETUP ---
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (containerRef.current && trackRef.current) {
        containerWidth.current = containerRef.current.offsetWidth;
        trackWidth.current = trackRef.current.scrollWidth - containerWidth.current;
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    // Recalcular após um pequeno delay para garantir renderização
    setTimeout(handleResize, 500);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- 1. OBSERVER DE VISIBILIDADE GERAL ---
  // Apenas detecta se a seção está na tela para ativar o listener de wheel
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        // Se sair da tela completamente, reseta o estado
        if (!entry.isIntersecting && isActive) {
            setIsActive(false);
            lenis?.start();
        }
      },
      { threshold: 0 } // Qualquer pedaço visível ativa o listener
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isActive, lenis]);


  // --- 2. LÓGICA CORE DE SCROLL (GUARD RAIL) ---
  useEffect(() => {
    // Se não estiver visível, mobile ou lightbox aberto, não faz nada
    if (!isInView || isMobile || lightboxOpen) return;

    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const isAtTop = Math.abs(rect.top) < 2; // Tolerância de 2px
      const isApproaching = rect.top > 0 && rect.top < PHYSICS.snapThreshold; // Está chegando perto (snap zone)

      // CENÁRIO A: Ainda não ativou o modo horizontal
      if (!isActive) {
        // Se o usuário está rolando para baixo e chegou no topo (ou perto)
        if (e.deltaY > 0 && (isAtTop || isApproaching)) {
            // SNAP: Se estiver muito perto, força o alinhamento
            if (isApproaching && lenis) {
                e.preventDefault(); // Impede o scroll nativo "picotado"
                lenis.scrollTo(containerRef.current, { 
                    offset: 0, 
                    immediate: false, 
                    duration: 0.8,
                    onComplete: () => {
                        setIsActive(true);
                        lenis.stop();
                    }
                });
                return;
            }

            // Se já está no topo exato
            if (isAtTop) {
                e.preventDefault();
                setIsActive(true);
                lenis?.stop();
                // Garante alinhamento visual perfeito
                window.scrollTo({ top: containerRef.current.offsetTop + 0.5 }); 
            }
        }
        // Se o usuário está rolando para cima (saindo pelo topo), deixa o Lenis cuidar
        return;
      }

      // CENÁRIO B: Modo Horizontal ATIVO
      if (isActive) {
        e.preventDefault(); // Rouba o scroll totalmente

        const currentX = x.get();
        const maxScroll = -trackWidth.current;
        const delta = e.deltaY * PHYSICS.wheelMultiplier;

        // Calcular novo X
        let newX = currentX - delta;
        
        // Limites Rígidos
        if (newX > 0) newX = 0;
        if (newX < maxScroll) newX = maxScroll;

        // Atualizar progresso
        const newProgress = Math.abs(newX / maxScroll);
        setProgress(Math.min(Math.max(newProgress, 0), 1));

        // --- SISTEMA DE SAÍDA ---
        
        // 1. Tentar sair pelo INÍCIO (Scroll Up)
        if (currentX >= 0 && e.deltaY < 0) {
            reverseScrollCount.current += 1;
            // Exige intenção clara (3 scrolls) ou um movimento forte
            if (reverseScrollCount.current > 3 || e.deltaY < -40) {
                setIsActive(false);
                lenis?.start();
                reverseScrollCount.current = 0;
            }
        }
        // 2. Tentar sair pelo FIM (Scroll Down)
        else if (currentX <= maxScroll && e.deltaY > 0) {
            reverseScrollCount.current += 1;
            if (reverseScrollCount.current > 3 || e.deltaY > 40) {
                setIsActive(false);
                lenis?.start();
                // Pequeno empurrão para sair da zona de snap
                // lenis?.scrollTo(window.scrollY + 150, { immediate: false, duration: 1 }); 
                reverseScrollCount.current = 0;
            }
        } else {
            // Se está navegando horizontalmente normal, reseta contador
            reverseScrollCount.current = 0;
            x.set(newX);
        }
      }
    };

    // Adiciona listener não-passivo para poder usar preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isActive, isInView, isMobile, lenis, x, lightboxOpen]);


  return (
    <section 
      ref={containerRef} 
      id="projects"
      className="relative h-screen w-full bg-slate-950 overflow-hidden flex flex-col justify-center"
      style={{ zIndex: 30 }} 
    >
      {/* Background Noise/Texture */}
      <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50 contrast-150"></div>

      <ProgressIndicator progress={progress} isVisible={isActive} />

      {/* TRACK HORIZONTAL */}
      {/* Increased gap from 16 to 40 for more breathability */}
      <MotionDiv 
        ref={trackRef}
        className="flex gap-8 md:gap-40 px-6 md:px-40 w-max items-center h-[80vh]"
        style={{ x: springX, cursor: isMobile ? 'grab' : isActive ? 'none' : 'default' }}
        drag={isMobile ? "x" : false}
        dragConstraints={containerRef}
      >
        {/* HEADER CARD (Intro) */}
        <div className="w-[85vw] md:w-[30vw] h-full flex flex-col justify-center shrink-0 pr-12 z-[3]">
           <div className="pl-4 border-l-2 border-white/20">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 block">
                Portfólio Selecionado
              </span>
              <h2 className="text-5xl md:text-7xl font-serif font-medium text-white leading-none mb-6">
                Projetos <br /> <span className="text-slate-500 italic">Recentes</span>
              </h2>
              <p className="text-slate-400 font-light leading-relaxed max-w-sm">
                 Explore uma seleção de trabalhos focados em performance, conversão e experiência do usuário.
                 {isMobile ? "Arraste para explorar →" : "Continue rolando para navegar →"}
              </p>
           </div>
        </div>

        {/* PROJECT CARDS */}
        {PROJECTS.map((project, index) => (
          <ProjectCard 
            key={index} 
            project={project} 
            index={index} 
            setLightboxOpen={setLightboxOpen}
          />
        ))}

        {/* END CARD (Call to Action) */}
        <div className="w-[85vw] md:w-[30vw] h-full flex items-center justify-center shrink-0 z-[3]">
            <a href="#contact" className="group flex flex-col items-center justify-center gap-6 text-center">
               <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all duration-500">
                  <ArrowUpRight size={32} className="text-white group-hover:text-slate-900" />
               </div>
               <div>
                 <h3 className="text-3xl font-serif text-white mb-2">Seu Projeto Aqui</h3>
                 <p className="text-sm text-slate-400 font-bold uppercase tracking-widest underline decoration-slate-700 underline-offset-4 group-hover:text-white group-hover:decoration-white transition-all">
                   Iniciar Conversa
                 </p>
               </div>
            </a>
        </div>
      </MotionDiv>
    </section>
  );
};

// --- COMPONENTE DO CARD DE PROJETO (Camadas e Acessibilidade) ---

const ProjectCard: React.FC<{ 
  project: typeof PROJECTS[0]; 
  index: number;
  setLightboxOpen: (open: boolean) => void;
}> = ({ project, index, setLightboxOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MotionDiv 
      className="relative w-[85vw] md:w-[60vw] h-[65vh] md:h-[75vh] shrink-0 rounded-[2rem] overflow-hidden group cursor-none select-none"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-10%" }}
    >
      {/* LAYER 1: Imagem de Fundo (Lazy Loaded) */}
      <img 
        src={project.image} 
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover z-[10] transition-transform duration-1000 ease-out group-hover:scale-105 will-change-transform"
      />

      {/* LAYER 2: Overlay */}
      <div 
        className="absolute inset-0 z-[20] bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"
        style={{ mixBlendMode: 'multiply' }}
      />
      <div className="absolute inset-0 z-[21] bg-black/10" />

      {/* LAYER 3: Container de Conteúdo */}
      {/* Increased padding from p-12 to p-16 for more internal whitespace */}
      <div className="absolute inset-0 z-[30] p-8 md:p-16 flex flex-col justify-between">
        
        {/* Top Info */}
        <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-y-4 group-hover:translate-y-0">
           <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
             {project.category}
           </span>
           <span className="text-4xl font-serif text-white/20 font-bold">0{index + 1}</span>
        </div>

        {/* Bottom Content */}
        <div className="relative transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
           {/* LAYER 4: Título */}
           <h3 className="relative z-[40] text-4xl md:text-6xl font-serif font-medium text-white mb-4 leading-none tracking-tight drop-shadow-lg">
             {project.title}
           </h3>

           {/* LAYER 5: Descrição */}
           <p className="relative z-[50] text-slate-300 font-light leading-relaxed max-w-lg mb-8 text-sm md:text-base drop-shadow-md opacity-90">
             {project.description}
           </p>

           {/* LAYER 6: Botões */}
           <div className="relative z-[60] flex flex-wrap gap-4">
              <button 
                onClick={() => setLightboxOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors shadow-xl"
              >
                Ver Detalhes <Plus size={14} />
              </button>
              <a 
                href={project.link}
                className="flex items-center gap-2 px-6 py-3 bg-transparent border border-white/30 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-lg backdrop-blur-sm"
              >
                Visitar Site <ArrowUpRight size={14} />
              </a>
           </div>
        </div>
      </div>

      {/* LAYER 7: Efeitos de Foco */}
      <div 
        className={`absolute inset-0 z-[70] pointer-events-none border-[1px] border-white/0 transition-all duration-500 ${isHovered ? 'border-white/20 inset-4 rounded-xl' : ''}`} 
      />
    </MotionDiv>
  );
};

export default Projects;
