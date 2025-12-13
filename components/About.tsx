import React, { useState } from 'react';
import { Reveal } from './ui/Reveal';
import ContentModal from './ui/ContentModal';
import { ResumeContent } from './ResumeContent';
import { ArrowUpRight, Camera, FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import Magnetic from './ui/Magnetic';

const MotionImg = motion.img as any;

const About: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    // MUDANÇA PRINCIPAL: min-h-screen e flex items-center para centralizar no viewport
    // Reduzi o padding vertical drásticamente para evitar scroll desnecessário
    <section id="about" className="min-h-[90vh] flex items-center py-12 md:py-24 bg-paper relative z-10 overflow-hidden border-t border-petrol-base/5">
      
      {/* Background Decorativo Sutil */}
      <div className="absolute top-0 right-0 w-[40vw] h-full bg-gradient-to-l from-[#E6E8EA] to-transparent -z-10 opacity-50" />

      <div className="container mx-auto px-6 md:px-12 xl:px-24">
        
        {/* Compact Header (Agora alinhado com o grid para economizar altura) */}
        <div className="hidden md:flex justify-between items-center mb-12 border-b border-petrol-base/10 pb-4">
            <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-petrol-base animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-petrol-base/40">Perfil Profissional</span>
            </div>
            <span className="text-[10px] font-mono text-petrol-base/30">SCROLL_LOCK: FALSE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
           
           {/* COL 1: Interactive Profile Card (Mais compacto) */}
           <div className="lg:col-span-5 relative group cursor-pointer flex justify-center lg:justify-start" onClick={() => setIsResumeOpen(true)}>
               <Reveal variant="scale" width="100%" className="max-w-md w-full">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-petrol-base/5 border border-petrol-base/10 shadow-2xl transition-all duration-500 group-hover:scale-[1.01]">
                      {/* Image */}
                      <MotionImg 
                        layoutId="profile-photo-main"
                        src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800" 
                        alt="Profile" 
                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                      />
                      
                      {/* Glass Overlay Compacto */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                          <div className="flex justify-between items-center text-white">
                              <div>
                                <span className="block text-lg font-serif italic">Ver Currículo</span>
                                <span className="text-[9px] font-mono uppercase tracking-widest opacity-70">Victor Cardoso</span>
                              </div>
                              <ArrowUpRight size={18} />
                          </div>
                      </div>
                  </div>
               </Reveal>
               
               {/* Elements Decorativos - Reduzidos */}
               <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-petrol-base/20 hidden lg:block"></div>
           </div>

           {/* COL 2: Bio Concisa (Focada em Leitura Rápida) */}
           <div className="lg:col-span-7 flex flex-col justify-center h-full">
              <Reveal>
                 {/* Título mais apertado (tracking-tight) para ocupar menos linhas */}
                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-petrol-base mb-6 leading-[0.95] tracking-tight">
                    Visão de <span className="font-normal italic text-petrol-mid">Negócio.</span> <br/>
                    Precisão de <span className="font-normal italic text-petrol-mid">Código.</span>
                 </h2>
              </Reveal>

              <div className="space-y-4 text-base md:text-lg font-light text-petrol-ink/80 leading-relaxed max-w-xl mb-8">
                  <Reveal delay={100}>
                    <p>
                        <strong>Engenharia da Computação</strong> + <strong>Administração</strong>. Minha atuação vive na interseção exata entre regras de negócio complexas e soluções digitais elegantes.
                    </p>
                  </Reveal>
                  <Reveal delay={150}>
                    <p className="text-sm md:text-base opacity-80">
                        Transformo burocracia em interfaces fluidas. Experiência real com minutas contratuais, conciliação bancária e UX Design.
                    </p>
                  </Reveal>
              </div>

              {/* Grid de Skills Compacto */}
              <Reveal delay={200}>
                  <div className="flex flex-wrap gap-2 mb-8">
                      {['Lógica', 'Contabilidade', 'Front-end', 'Negócios'].map((tag, i) => (
                          <span key={i} className="px-3 py-1 border border-petrol-base/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-petrol-base/60">
                              {tag}
                          </span>
                      ))}
                  </div>
              </Reveal>

              {/* Action Buttons - Alinhados e Elegantes */}
              <div className="flex flex-wrap gap-4 items-center">
                 <Reveal delay={300}>
                    <Magnetic strength={0.2}>
                        <button 
                            onClick={() => setIsResumeOpen(true)}
                            className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] bg-petrol-base text-white px-6 py-3.5 border border-petrol-base rounded-sm hover:bg-petrol-mid transition-all duration-300 shadow-lg group"
                        >
                            <FileText size={14} /> 
                            <span>Abrir CV</span>
                            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                        </button>
                    </Magnetic>
                 </Reveal>

                 <Reveal delay={350}>
                    <Magnetic strength={0.2}>
                        <a 
                            href="#photography" // Placeholder
                            className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-petrol-base hover:text-white hover:bg-petrol-base px-6 py-3.5 border border-petrol-base/20 rounded-sm transition-all duration-300 group"
                        >
                            <Camera size={14} /> 
                            <span>Hobby: Fotos</span>
                        </a>
                    </Magnetic>
                 </Reveal>
              </div>

           </div>

        </div>
      </div>

      {/* MODAL CV */}
      <ContentModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)}
        layoutId="profile-photo-main"
        title="Currículo Profissional"
        category="Sobre"
      >
         <ResumeContent layoutId="profile-photo-main" />
      </ContentModal>

    </section>
  );
};

export default About;