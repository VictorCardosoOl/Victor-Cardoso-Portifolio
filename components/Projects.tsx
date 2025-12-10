
import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, MoveRight, ImageIcon, CheckCircle2 } from 'lucide-react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring,
  useInView
} from 'framer-motion';
import ContentModal from './ui/ContentModal';
import { Reveal } from './ui/Reveal';

const MotionDiv = motion.div as any;

// --- COMPONENTES AUXILIARES ---

const ProgressIndicator: React.FC<{ progress: any; isVisible: boolean }> = ({ progress, isVisible }) => {
  return (
    <MotionDiv 
      style={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-[60] flex items-center gap-3 md:gap-4 bg-slate-950/80 backdrop-blur-md px-4 py-2 md:px-5 md:py-3 rounded-full border border-white/10 shadow-2xl transition-all duration-500"
    >
      <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest tabular-nums w-12 text-right">
         Galeria
      </span>
      <div className="w-20 md:w-32 h-1 bg-white/10 rounded-full overflow-hidden">
        <MotionDiv 
          className="h-full bg-white"
          style={{ scaleX: progress, transformOrigin: "left" }}
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
      <div className="w-full h-[40vh] md:h-[60vh] rounded-[2rem] overflow-hidden mb-12 shadow-sm relative group">
         <img 
           src={project.image} 
           alt={project.title} 
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
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
               <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start gap-4 mb-4">
                     <div className="p-2 bg-slate-100 rounded-lg text-slate-900 font-bold">01</div>
                     <h4 className="text-xl font-serif font-bold text-slate-900 pt-1">O Desafio</h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-light pl-[3.25rem]">
                    {project.caseStudy.challenge}
                  </p>
               </div>

               <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start gap-4 mb-4">
                     <div className="p-2 bg-slate-100 rounded-lg text-slate-900 font-bold">02</div>
                     <h4 className="text-xl font-serif font-bold text-slate-900 pt-1">A Solução</h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-light pl-[3.25rem]">
                    {project.caseStudy.solution}
                  </p>
               </div>

               <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-white transform hover:scale-[1.01] transition-transform duration-500">
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
                    <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 group">
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
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- LOGICA DE SCROLL (Sticky Method) ---
  // Aumentamos a altura para 400vh para que o scroll horizontal seja mais lento e perceptível
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"] 
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30, // Mais suave
    stiffness: 100,
    mass: 1
  });

  // Ajuste fino do transform:
  // Vai de 0% até -55% (valor aproximado para garantir que todos os cards passem mas não sobre espaço vazio)
  // O valor exato depende da quantidade de conteúdo. Como temos Header + 3 Cards + End Card,
  // e cada card ocupa ~45vw, o total é maior que 100vw.
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-55%"]);

  return (
    <section 
      id="projects" 
      ref={targetRef} 
      // Altura grande no desktop para "segurar" o scroll vertical
      className={`relative bg-slate-950 ${isMobile ? 'h-auto py-24' : 'h-[400vh]'}`} 
      style={{ zIndex: 30 }}
    >
      {/* Background Noise & Gradient */}
      <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50 contrast-150 fixed"></div>
      
      <div className={`
        ${isMobile ? 'relative flex flex-col' : 'sticky top-0 h-screen flex items-center overflow-hidden'} 
        w-full z-[10]
      `}>
        
        {!isMobile && <ProgressIndicator progress={smoothProgress} isVisible={true} />}

        <MotionDiv 
          className={`
            flex items-center
            ${isMobile ? 'flex-col gap-16 px-5 w-full' : 'gap-20 px-20 h-[80vh] w-max'}
          `}
          // Aplica o movimento horizontal APENAS se não for mobile
          style={!isMobile ? { x } : {}}
        >
          {/* HEADER CARD */}
          <div className="w-full md:w-[25vw] flex flex-col justify-center shrink-0">
             <div className="pl-4 border-l-2 border-white/20">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 md:mb-4 block">
                  Portfólio Selecionado
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-medium text-white leading-none mb-4 md:mb-6">
                  Projetos <br /> <span className="text-slate-500 italic">Recentes</span>
                </h2>
                <p className="text-slate-400 font-light leading-relaxed max-w-sm text-sm md:text-base">
                   Uma curadoria de trabalhos focados em resolver problemas complexos com design elegante e código performático.
                   <br/><br/>
                   {!isMobile && (
                     <span className="text-white font-medium flex items-center gap-2 text-xs uppercase tracking-widest">
                        Role para explorar <MoveRight size={14} />
                     </span>
                   )}
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
          <div className={`
            ${isMobile ? 'w-full py-10' : 'w-[25vw] h-full'} 
            flex items-center justify-center shrink-0
          `}>
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

      {/* MODAL - Renderizado fora do container Sticky se possível, ou com Z-Index altíssimo */}
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
  return (
    <MotionDiv 
      className={`
        relative shrink-0 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden group cursor-pointer select-none bg-slate-900 shadow-2xl border border-white/5
        ${isMobile ? 'w-full aspect-[4/5]' : 'w-[45vw] h-[70vh]'}
      `}
      onClick={onOpen}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
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
        className="absolute inset-0 z-[20] bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500"
      />
      
      <div className="absolute inset-0 z-[30] p-6 md:p-12 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
           <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
             {project.category}
           </span>
           <span className="text-2xl md:text-5xl font-serif text-white/10 font-bold tabular-nums">0{index + 1}</span>
        </div>

        <div className="transform transition-transform duration-500 md:translate-y-4 md:group-hover:translate-y-0">
           <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white mb-3 md:mb-4 leading-none tracking-tight">
             {project.title}
           </h3>

           <p className="text-slate-300 font-light leading-relaxed max-w-lg mb-6 md:mb-8 text-sm md:text-base opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3 md:line-clamp-none">
             {project.description}
           </p>

           <div className="flex flex-wrap gap-3 md:gap-4 pointer-events-auto opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-200">
              <button 
                onClick={(e) => { e.stopPropagation(); onOpen(); }}
                className="flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-white text-slate-900 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors shadow-lg w-auto"
              >
                Ver Detalhes <ImageIcon size={14} />
              </button>
           </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default Projects;
