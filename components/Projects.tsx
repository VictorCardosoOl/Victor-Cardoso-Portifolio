import React, { useState, useRef } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ContentModal from './ui/ContentModal';
import { ProjectDetailContent } from './ProjectDetailContent';
import { Reveal } from './ui/Reveal';

// --- Sub-componente para o Card com Parallax e Compactação ---
const ProjectCard = ({ project, index, onClick }: any) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax suave na imagem (movimento vertical oposto ao scroll)
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // Lógica de Layout Alternado (Editorial)
  // Par = Imagem na Esquerda, Texto Direita
  // Ímpar = Texto Esquerda, Imagem Direita
  const isEven = index % 2 === 0;

  // Curtain Reveal Animation Variant
  const revealVariants = {
    hidden: { 
      clipPath: "inset(0% 0% 100% 0%)", 
      scale: 1.1 
    },
    visible: { 
      clipPath: "inset(0% 0% 0% 0%)",   
      scale: 1,
      transition: { 
        duration: 1.2, 
        ease: [0.25, 1, 0.5, 1] 
      }
    }
  };

  return (
    <div 
      ref={ref}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 mb-20 md:mb-24`} 
    >
      {/* Coluna da Imagem - Compacta (42%) */}
      <div 
        className="w-full md:w-[42%] group cursor-pointer relative" 
        onClick={onClick}
      >
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={revealVariants}
            className="relative aspect-[4/3] md:aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-slate-100 shadow-2xl"
        >
             {/* Imagem com Parallax Interno - Full Color (No Grayscale) */}
             <motion.div style={{ y }} className="w-full h-[120%] -mt-[10%]">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
             </motion.div>

             {/* Botão Overlay Elegante */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#082f49] shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                    <ArrowUpRight size={28} strokeWidth={1.5} />
                </div>
             </div>
        </motion.div>
      </div>

      {/* Coluna de Texto - Compacta */}
      <div className="w-full md:w-[58%] flex flex-col justify-center items-start text-left pl-0 md:px-8">
        <Reveal width="100%" delay={100}>
          <div className="flex items-center gap-4 mb-4">
              {/* Número Decorativo Azul Petróleo */}
              <span className="text-4xl font-serif font-bold text-[#082f49]/10">
                0{index + 1}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#082f49]/60">
                {project.category}
              </span>
          </div>
        </Reveal>
        
        <Reveal width="100%" delay={200}>
          {/* TÍTULO COM O GRADIENTE SOLICITADO */}
          <h3 
            onClick={onClick}
            className="text-4xl md:text-5xl font-serif font-medium mb-4 leading-tight cursor-pointer"
          >
            {/* Parte Principal (Escura) */}
            <span className="text-[#0f172a] block">
               {project.title.split(' ')[0]}
            </span>
            
            {/* Subtítulo / Segunda parte com Gradiente Azul Petróleo Escuro -> Claro */}
            <span className="bg-gradient-to-r from-[#0f172a] to-[#0e7490] bg-clip-text text-transparent italic">
               {project.title.split(' ').slice(1).join(' ')}
            </span>
          </h3>
        </Reveal>

        <Reveal width="100%" delay={300}>
          <p className="text-slate-600 font-light leading-relaxed text-sm md:text-base mb-6 max-w-md">
             {project.description}
          </p>
        </Reveal>

        <Reveal width="100%" delay={400}>
           {/* Tags Minimalistas */}
          <div className="flex flex-wrap gap-2 mb-8">
             {project.tags.map((tag: string, i: number) => (
                <span key={i} className="px-3 py-1 border border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  {tag}
                </span>
             ))}
          </div>
        </Reveal>

        <Reveal width="100%" delay={500}>
          <button 
             onClick={onClick}
             className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0f172a] hover:text-[#0e7490] transition-colors"
          >
             Ver Detalhes
             <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </Reveal>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    // MUDANÇA DE COR: Fundo Branco (bg-white)
    <section id="projects" className="relative bg-white py-24 md:py-32 z-10 overflow-hidden">
      
      {/* Background Decorativo Sutil (Tons de Azul Petróleo muito claros) */}
      <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-[#e0f2fe]/40 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] bg-[#cffafe]/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        
        {/* Header da Seção Refinado */}
        <div className="mb-20 md:mb-28 max-w-2xl">
          <Reveal>
             <span className="text-[#0e7490] font-bold text-xs uppercase tracking-widest mb-2 block">Portfólio Selecionado</span>
             <h2 className="text-5xl md:text-7xl font-serif font-medium text-[#0f172a] mb-6">
               Obras <span className="italic text-[#0e7490]/80">&</span> <br/>
               Experimentos
             </h2>
          </Reveal>
        </div>

        {/* Lista Compacta */}
        <div className="flex flex-col">
          {PROJECTS.map((project, index) => (
             <ProjectCard 
               key={index} 
               project={project} 
               index={index} 
               onClick={() => setSelectedProject(project)} 
             />
          ))}
        </div>

        {/* Footer Link - Azul Petróleo */}
        <div className="mt-20 md:mt-32 flex justify-center border-t border-slate-100 pt-20">
            <Reveal>
               <a href="#contact" className="group flex flex-col items-center gap-6">
                  <span className="text-sm font-serif italic text-slate-400 group-hover:text-[#0f172a] transition-colors">
                     Tem um projeto em mente?
                  </span>
                  <span className="text-4xl md:text-6xl font-serif text-[#0f172a] group-hover:scale-105 transition-transform duration-500">
                     Iniciar Conversa
                  </span>
               </a>
            </Reveal>
        </div>

      </div>

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