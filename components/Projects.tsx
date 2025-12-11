
import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, MoveRight, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useLenis } from './ScrollContext';
import { 
  motion, 
  useSpring, 
  useMotionValue, 
  AnimatePresence,
  PanInfo
} from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionImg = motion.img as any;

// --- CONFIGURAÇÃO DE FÍSICA E PARÂMETROS ---
const PHYSICS = {
  wheelMultiplier: 2.2,
  spring: {
    damping: 50,
    stiffness: 250,
    mass: 1.2
  },
  snapThreshold: 100,
};

// --- COMPONENTES AUXILIARES ---

// 3. UI DE ESTADO (Barra de Progresso)
const ProgressIndicator: React.FC<{ progress: number; isVisible: boolean }> = ({ progress, isVisible }) => {
  return (
    <MotionDiv 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-[60] flex items-center gap-3 md:gap-4 bg-slate-950/80 backdrop-blur-md px-4 py-2 md:px-5 md:py-3 rounded-full border border-white/10 shadow-2xl"
    >
      <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest tabular-nums w-6 md:w-8 text-right">
        {Math.round(progress * 100)}%
      </span>
      <div className="w-20 md:w-32 h-1 bg-white/10 rounded-full overflow-hidden">
        <MotionDiv 
          className="h-full bg-white"
          style={{ width: `${progress * 100}%` }}
          layout 
        />
      </div>
    </MotionDiv>
  );
};

// --- COMPONENTE LIGHTBOX / GALERIA ---

interface ProjectLightboxProps {
  project: typeof PROJECTS[0];
  onClose: () => void;
}

const ProjectLightbox: React.FC<ProjectLightboxProps> = ({ project, onClose }) => {
  const images = [project.image, ...(project.gallery || [])];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]); // eslint-disable-line

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const handleDragEnd = (e: any, { offset }: PanInfo) => {
    const swipe = offset.x;
    const swipeThreshold = 50;
    
    if (swipe < -swipeThreshold) {
      paginate(1);
    } else if (swipe > swipeThreshold) {
      paginate(-1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <MotionDiv 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex flex-col"
    >
      <div className="flex justify-between items-center p-4 md:p-8 z-20">
        <div>
          <h3 className="text-white font-serif text-lg md:text-2xl">{project.title}</h3>
          <p className="text-slate-400 text-[10px] md:text-xs uppercase tracking-widest">{currentIndex + 1} / {images.length}</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 md:p-3 bg-white/10 rounded-full hover:bg-white hover:text-slate-900 text-white transition-all"
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>
      </div>

      <div className="flex-grow relative flex items-center justify-center overflow-hidden">
        <button 
          className="absolute left-4 md:left-8 z-20 p-4 rounded-full bg-black/20 text-white hover:bg-white hover:text-black transition-all hidden md:block backdrop-blur-sm"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft size={32} />
        </button>
        
        <button 
          className="absolute right-4 md:right-8 z-20 p-4 rounded-full bg-black/20 text-white hover:bg-white hover:text-black transition-all hidden md:block backdrop-blur-sm"
          onClick={() => paginate(1)}
        >
          <ChevronRight size={32} />
        </button>

        <div className="relative w-full h-full max-w-6xl max-h-[60vh] md:max-h-[80vh] px-2 md:px-20">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <MotionImg
              key={currentIndex}
              src={images[currentIndex]}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              className="w-full h-full object-contain rounded-xl shadow-2xl cursor-grab active:cursor-grabbing select-none"
              alt={`${project.title} screenshot ${currentIndex + 1}`}
            />
          </AnimatePresence>
        </div>
      </div>

      <div className="h-20 md:h-32 border-t border-white/10 bg-black/20 flex items-center justify-center gap-2 md:gap-4 px-4 overflow-x-auto pb-safe">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`relative h-14 w-20 md:h-20 md:w-32 rounded-lg overflow-hidden transition-all duration-300 flex-shrink-0 ${
              idx === currentIndex ? 'ring-2 ring-white scale-105 opacity-100' : 'opacity-50 hover:opacity-80'
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </MotionDiv>
  );
};

// --- COMPONENTE PRINCIPAL ---

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const [isActive, setIsActive] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  const x = useMotionValue(0);
  const springX = useSpring(x, PHYSICS.spring);
  const containerWidth = useRef(0);
  const trackWidth = useRef(0);
  const reverseScrollCount = useRef(0);

  useEffect(() => {
    if (selectedProject) {
      lenis?.stop();
    } else if (!isActive) {
      lenis?.start();
    }
  }, [selectedProject, lenis, isActive]);

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
    setTimeout(handleResize, 500);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (!entry.isIntersecting && isActive) {
            setIsActive(false);
            lenis?.start();
        }
      },
      { threshold: 0 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isActive, lenis]);


  useEffect(() => {
    if (!isInView || isMobile || selectedProject) return;

    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const isAtTop = Math.abs(rect.top) < 2;
      const isApproaching = rect.top > 0 && rect.top < PHYSICS.snapThreshold;

      if (!isActive) {
        if (e.deltaY > 0 && (isAtTop || isApproaching)) {
            if (isApproaching && lenis) {
                e.preventDefault();
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

            if (isAtTop) {
                e.preventDefault();
                setIsActive(true);
                lenis?.stop();
                window.scrollTo({ top: containerRef.current.offsetTop + 0.5 }); 
            }
        }
        return;
      }

      if (isActive) {
        e.preventDefault();

        const currentX = x.get();
        const maxScroll = -trackWidth.current;
        const delta = e.deltaY * PHYSICS.wheelMultiplier;

        let newX = currentX - delta;
        
        if (newX > 0) newX = 0;
        if (newX < maxScroll) newX = maxScroll;

        const newProgress = Math.abs(newX / maxScroll);
        setProgress(Math.min(Math.max(newProgress, 0), 1));

        if (currentX >= 0 && e.deltaY < 0) {
            reverseScrollCount.current += 1;
            if (reverseScrollCount.current > 3 || e.deltaY < -40) {
                setIsActive(false);
                lenis?.start();
                reverseScrollCount.current = 0;
            }
        }
        else if (currentX <= maxScroll && e.deltaY > 0) {
            reverseScrollCount.current += 1;
            if (reverseScrollCount.current > 3 || e.deltaY > 40) {
                setIsActive(false);
                lenis?.start();
                reverseScrollCount.current = 0;
            }
        } else {
            reverseScrollCount.current = 0;
            x.set(newX);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isActive, isInView, isMobile, lenis, x, selectedProject]);


  return (
    <section 
      ref={containerRef} 
      id="projects"
      className="relative h-screen w-full bg-slate-950 overflow-hidden flex flex-col justify-center"
      style={{ zIndex: 30 }} 
    >
      <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50 contrast-150"></div>

      {!isMobile && <ProgressIndicator progress={progress} isVisible={isActive} />}

      <MotionDiv 
        ref={trackRef}
        // Aggressive Whitespace: Increased gap-40 (10rem/160px) for premium feel
        className="flex gap-8 md:gap-40 px-5 md:px-20 w-max items-center h-[75vh] md:h-[80vh]"
        style={{ x: springX, cursor: isMobile ? 'grab' : isActive ? 'none' : 'default' }}
        drag={isMobile ? "x" : false}
        dragConstraints={containerRef}
      >
        {/* HEADER CARD */}
        <div className="w-[85vw] md:w-[30vw] h-full flex flex-col justify-center shrink-0 md:pr-12 z-[3]">
           <div className="pl-4 border-l-2 border-white/20">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 md:mb-4 block">
                Portfólio Selecionado
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-medium text-white leading-none mb-4 md:mb-6">
                Projetos <br /> <span className="text-slate-500 italic">Recentes</span>
              </h2>
              <p className="text-slate-400 font-light leading-relaxed max-w-sm text-sm md:text-base">
                 Explore uma seleção de trabalhos focados em performance, conversão e experiência do usuário.
                 <br/><br/>
                 <span className="text-white font-medium flex items-center gap-2">
                    {isMobile ? "Arraste para explorar" : "Continue rolando"} <MoveRight size={16} />
                 </span>
              </p>
           </div>
        </div>

        {/* PROJECT CARDS */}
        {PROJECTS.map((project, index) => (
          <ProjectCard 
            key={index} 
            project={project} 
            index={index} 
            onOpen={() => setSelectedProject(project)}
            isMobile={isMobile}
          />
        ))}

        {/* END CARD */}
        <div className="w-[85vw] md:w-[30vw] h-full flex items-center justify-center shrink-0 z-[3]">
            <a href="#contact" className="group flex flex-col items-center justify-center gap-4 md:gap-6 text-center">
               <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all duration-500">
                  <ArrowUpRight size={28} className="text-white group-hover:text-slate-900 md:w-8 md:h-8" />
               </div>
               <div>
                 <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">Seu Projeto Aqui</h3>
                 <p className="text-xs md:text-sm text-slate-400 font-bold uppercase tracking-widest underline decoration-slate-700 underline-offset-4 group-hover:text-white group-hover:decoration-white transition-all">
                   Iniciar Conversa
                 </p>
               </div>
            </a>
        </div>
      </MotionDiv>

      {/* LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectLightbox 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const ProjectCard: React.FC<{ 
  project: typeof PROJECTS[0]; 
  index: number;
  onOpen: () => void;
  isMobile: boolean;
}> = ({ project, index, onOpen, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MotionDiv 
      // Adjusted width for better ratio with large gaps
      className="relative w-[88vw] sm:w-[80vw] md:w-[55vw] h-[55vh] md:h-[75vh] shrink-0 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group cursor-none select-none"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-10%" }}
    >
      <img 
        src={project.image} 
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover z-[10] transition-transform duration-1000 ease-out group-hover:scale-105 will-change-transform"
      />

      <div 
        className="absolute inset-0 z-[20] bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent opacity-90 md:opacity-80 group-hover:opacity-95 transition-opacity duration-500"
        style={{ mixBlendMode: 'multiply' }}
      />
      
      {isMobile && <div className="absolute inset-0 z-[21] bg-black/20" />}

      {/* Aggressive padding inside card */}
      <div className="absolute inset-0 z-[30] p-8 md:p-16 flex flex-col justify-between">
        <div className={`flex justify-between items-start transition-opacity duration-500 transform ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0'}`}>
           <span className="px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
             {project.category}
           </span>
           <span className="text-2xl md:text-4xl font-serif text-white/20 font-bold">0{index + 1}</span>
        </div>

        <div className={`relative transform transition-transform duration-500 ${isMobile ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}>
           <h3 className="relative z-[40] text-3xl sm:text-4xl md:text-6xl font-serif font-medium text-white mb-2 md:mb-6 leading-none tracking-tight drop-shadow-lg">
             {project.title}
           </h3>

           <p className="relative z-[50] text-slate-300 font-light leading-relaxed max-w-lg mb-8 md:mb-10 text-sm md:text-base drop-shadow-md opacity-90 line-clamp-3 md:line-clamp-none">
             {project.description}
           </p>

           <div className="relative z-[60] flex flex-wrap gap-3 md:gap-4">
              <button 
                onClick={onOpen}
                className="flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-white text-slate-900 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors shadow-xl w-full sm:w-auto justify-center"
              >
                Ver Galeria <ImageIcon size={14} />
              </button>
              <a 
                href={project.link}
                className="flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-transparent border border-white/30 text-white rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-lg backdrop-blur-sm w-full sm:w-auto justify-center"
              >
                Visitar Site <ArrowUpRight size={14} />
              </a>
           </div>
        </div>
      </div>

      <div 
        className={`absolute inset-0 z-[70] pointer-events-none border-[1px] border-white/0 transition-all duration-500 ${isHovered ? 'border-white/20 inset-4 rounded-xl' : ''}`} 
      />
    </MotionDiv>
  );
};

export default Projects;
