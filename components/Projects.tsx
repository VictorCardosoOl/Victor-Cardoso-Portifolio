
import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, MoveRight, ImageIcon, CheckCircle2 } from 'lucide-react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring
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
         Scroll
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
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- LOGICA DE SCROLL (Sticky Method) ---
  // A seção tem 400vh de altura. O useScroll monitora o progresso de 0 a 1 enquanto esses 400vh passam.
  // O container interno é "sticky", então ele fica parado na tela.
  // O valor "x" move o conteúdo horizontalmente baseado nesse progresso vertical.
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"] 
  });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 200,
    mass: 0.8
  });

  // Calculate horizontal translation
  // "1%" start padding -> "-85%" moves enough to show all items. 
  // Adjust "-85%" based on the actual total width of items vs viewport.
  const x = useTransform(smoothProgress, [0, 1], ["1%", "-90%"]);

  return (
    <section 
      id="projects" 
      ref={targetRef} 
      className={`relative bg-slate-950 ${isMobile ? 'h-auto' : 'h-[400vh]'}`} // Height defines scroll distance
      style={{ zIndex: 30 }}
    >
      {/* Background Noise */}
      <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50 contrast-150 fixed"></div>

      {/* Sticky Container */}
      <div className={`
        ${isMobile ? 'relative' : 'sticky top-0 h-screen overflow-hidden'} 
        flex flex-col justify-center
      `}>
        
        {!isMobile && <ProgressIndicator progress={smoothProgress} isVisible={true} />}

        <MotionDiv 
          className={`flex gap-8 md:gap-40 px-5 md:px-20 items-center ${isMobile ? 'flex-col py-20 overflow-x-hidden' : 'w-max h-[80vh]'}`}
          style={!isMobile ? { x } : {}} // Apply horizontal transform only on desktop
        >
          {/* HEADER CARD */}
          <div className="w-full md:w-[30vw] flex flex-col justify-center shrink-0 md:pr-12 z-[3]">
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
                   {!isMobile && (
                     <span className="text-white font-medium flex items-center gap-2">
                        Role para baixo para explorar <MoveRight size={16} className="rotate-90 md:rotate-0" />
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
          <div className="w-full md:w-[30vw] h-[50vh] md:h-full flex items-center justify-center shrink-0 z-[3]">
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
      </div>

      {/* NEW CONTENT MODAL */}
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
      className="relative w-full md:w-[55vw] h-[60vh] md:h-[75vh] shrink-0 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group cursor-pointer select-none bg-slate-900 shadow-2xl"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
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
        className="absolute inset-0 z-[20] bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent opacity-90 md:opacity-80 group-hover:opacity-95 transition-opacity duration-500"
        style={{ mixBlendMode: 'multiply' }}
      />
      
      <div className="absolute inset-0 z-[30] p-8 md:p-16 flex flex-col justify-between pointer-events-none">
        <div className={`flex justify-between items-start transition-opacity duration-500 transform ${isMobile ? 'opacity-100' : 'opacity-100'}`}>
           <span className="px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
             {project.category}
           </span>
           <span className="text-2xl md:text-4xl font-serif text-white/20 font-bold">0{index + 1}</span>
        </div>

        <div className={`relative transform transition-transform duration-500 translate-y-0`}>
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
