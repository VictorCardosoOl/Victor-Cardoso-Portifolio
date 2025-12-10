
import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, MoveRight, ImageIcon, CheckCircle2 } from 'lucide-react';
import { useLenis } from './ScrollContext';
import { 
  motion, 
  useSpring, 
  useMotionValue
} from 'framer-motion';
import ContentModal from './ui/ContentModal';
import { Reveal } from './ui/Reveal';

const MotionDiv = motion.div as any;

// --- COMPONENTES AUXILIARES ---

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

// --- CASE STUDY DETAIL COMPONENT ---

const ProjectDetailContent: React.FC<{ project: typeof PROJECTS[0] }> = ({ project }) => {
  return (
    <div className="container mx-auto px-5 md:px-20 py-10 md:py-16 max-w-7xl">
      
      {/* Hero Image inside Modal */}
      <div className="w-full h-[40vh] md:h-[60vh] rounded-[2rem] overflow-hidden mb-12 shadow-sm">
         <img 
           src={project.image} 
           alt={project.title} 
           className="w-full h-full object-cover"
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
         {/* Sidebar / Meta Data */}
         <div className="lg:col-span-4 space-y-8">
            <div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Descrição</h3>
               <p className="text-slate-700 leading-relaxed font-light text-lg">
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

            <div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Ano</h3>
               <p className="text-slate-900 font-serif text-xl">{project.year}</p>
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

         {/* Main Content / Case Study */}
         <div className="lg:col-span-8">
            <h3 className="text-3xl md:text-4xl font-serif font-medium text-slate-900 mb-8">Estudo de Caso</h3>
            
            <div className="space-y-12">
               <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex items-start gap-4 mb-4">
                     <div className="p-2 bg-slate-100 rounded-lg text-slate-900 font-bold">01</div>
                     <h4 className="text-xl font-serif font-bold text-slate-900 pt-1">O Desafio</h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-light pl-[3.25rem]">
                    {project.caseStudy.challenge}
                  </p>
               </div>

               <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex items-start gap-4 mb-4">
                     <div className="p-2 bg-slate-100 rounded-lg text-slate-900 font-bold">02</div>
                     <h4 className="text-xl font-serif font-bold text-slate-900 pt-1">A Solução</h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-light pl-[3.25rem]">
                    {project.caseStudy.solution}
                  </p>
               </div>

               <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-white">
                  <div className="flex items-start gap-4 mb-4">
                     <div className="p-2 bg-slate-800 rounded-lg text-white font-bold"><CheckCircle2 size={16} /></div>
                     <h4 className="text-xl font-serif font-bold text-white pt-1">Resultados</h4>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-light pl-[3.25rem]">
                    {project.caseStudy.result}
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* Gallery Grid */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="mt-20 pt-20 border-t border-slate-200">
           <h3 className="text-2xl font-serif font-medium text-slate-900 mb-10 text-center">Galeria do Projeto</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.gallery.map((img, idx) => (
                 <Reveal key={idx} width="100%" delay={idx * 100}>
                    <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500">
                       <img src={img} alt={`Gallery ${idx}`} className="w-full h-auto hover:scale-105 transition-transform duration-700" loading="lazy" />
                    </div>
                 </Reveal>
              ))}
           </div>
        </div>
      )}
    </div>
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
  
  // Modal State
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  const x = useMotionValue(0);
  const springX = useSpring(x, { damping: 50, stiffness: 250, mass: 1.2 });
  const containerWidth = useRef(0);
  const trackWidth = useRef(0);
  const reverseScrollCount = useRef(0);

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

  // Update logic to pause horizontal scroll only, main scroll lock handled by ContentModal
  useEffect(() => {
    if (selectedProject) {
      // Modal handles scroll locking
      setIsActive(false); 
    }
  }, [selectedProject]);

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
      const isApproaching = rect.top > 0 && rect.top < 100;

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
        const delta = e.deltaY * 2.2;

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

      {/* NEW CONTENT MODAL (Replaces Old Lightbox) */}
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

const ProjectCard: React.FC<{ 
  project: typeof PROJECTS[0]; 
  index: number;
  onOpen: () => void;
  isMobile: boolean;
}> = ({ project, index, onOpen, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MotionDiv 
      className="relative w-[88vw] sm:w-[80vw] md:w-[55vw] h-[55vh] md:h-[75vh] shrink-0 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group cursor-none select-none"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onOpen} // Click entire card to open
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-10%" }}
    >
      <img 
        src={project.image} 
        alt={project.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover z-[10] transition-transform duration-1000 ease-out group-hover:scale-105 will-change-transform"
      />

      <div 
        className="absolute inset-0 z-[20] bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent opacity-90 md:opacity-80 group-hover:opacity-95 transition-opacity duration-500"
        style={{ mixBlendMode: 'multiply' }}
      />
      
      {isMobile && <div className="absolute inset-0 z-[21] bg-black/20" />}

      <div className="absolute inset-0 z-[30] p-8 md:p-16 flex flex-col justify-between pointer-events-none">
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

           <div className="relative z-[60] flex flex-wrap gap-3 md:gap-4 pointer-events-auto">
              <button 
                onClick={(e) => { e.stopPropagation(); onOpen(); }}
                className="flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-white text-slate-900 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors shadow-xl w-full sm:w-auto justify-center"
              >
                Ver Case Study <ImageIcon size={14} />
              </button>
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
