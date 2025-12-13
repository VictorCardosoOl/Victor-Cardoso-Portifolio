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
    <section id="about" className="min-h-[90vh] flex items-center py-12 md:py-24 bg-paper relative z-10 overflow-hidden border-t border-petrol-base/5">
      
      {/* Background Decorativo Sutil */}
      <div className="absolute top-0 right-0 w-[40vw] h-full bg-gradient-to-l from-[#E6E8EA] to-transparent -z-10 opacity-50" />

      <div className="container mx-auto px-6 md:px-12 xl:px-24">
        
        {/* Compact Header */}
        <div className="hidden md:flex justify-between items-center mb-12 border-b border-petrol-base/10 pb-4">
            <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-petrol-base animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-petrol-base/40">Perfil Profissional</span>
            </div>
            <span className="text-[10px] font-mono text-petrol-base/30">ENG & ADM</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
           
           {/* COL 1: Interactive Profile Card */}
           <div className="lg:col-span-5 relative group cursor-pointer flex justify-center lg:justify-start" onClick={() => setIsResumeOpen(true)}>
               <Reveal variant="scale" width="100%" className="max-w-md w-full">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-petrol-base/5 border border-petrol-base/10 shadow-2xl transition-all duration-500 group-hover:scale-[1.01]">
                      {/* Image */}
                      <MotionImg 
                        layoutId="profile-photo-main"
                        src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800" 
                        alt="Victor Cardoso" 
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
           </div>

           {/* COL 2: Bio Narrativa */}
           <div className="lg:col-span-7 flex flex-col justify-center h-full">
              <Reveal>
                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-petrol-base mb-6 leading-[0.95] tracking-tight">
                    Mente de <span className="font-normal italic text-petrol-mid">Engenheiro.</span> <br/>
                    Visão de <span className="font-normal italic text-petrol-mid">Administrador.</span>
                 </h2>
              </Reveal>

              <div className="space-y-4 text-base md:text-lg font-light text-petrol-ink/80 leading-relaxed max-w-xl mb-8">
                  <Reveal delay={100}>
                    <p>
                        Sou estudante de <strong>Engenharia da Computação</strong> com formação técnica em <strong>Administração</strong> pela ETEC Parque Belém. Essa dualidade me permite ver além do código.
                    </p>
                  </Reveal>
                  <Reveal delay={150}>
                    <p>
                        Minhas <em>Hard Skills</em> cobrem desde contabilidade e minutas contratuais até UX Design e programação fullstack. Nas <em>Soft Skills</em>, sou conhecido pela resolutividade, pensamento analítico e comunicação clara.
                    </p>
                  </Reveal>
              </div>

              {/* Grid de Tags Rápidas */}
              <Reveal delay={200}>
                  <div className="flex flex-wrap gap-2 mb-8">
                      {['PT-BR Nativo', 'Inglês Básico', 'Contabilidade', 'Regras de Negócio', 'UX/UI'].map((tag, i) => (
                          <span key={i} className="px-3 py-1 border border-petrol-base/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-petrol-base/60">
                              {tag}
                          </span>
                      ))}
                  </div>
              </Reveal>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 items-center">
                 <Reveal delay={300}>
                    <Magnetic strength={0.2}>
                        <button 
                            onClick={() => setIsResumeOpen(true)}
                            className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] bg-petrol-base text-white px-6 py-3.5 border border-petrol-base rounded-sm hover:bg-petrol-mid transition-all duration-300 shadow-lg group"
                        >
                            <FileText size={14} /> 
                            <span>Currículo & Skills</span>
                            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                        </button>
                    </Magnetic>
                 </Reveal>

                 <Reveal delay={350}>
                    <Magnetic strength={0.2}>
                        <a 
                            href="#photography" // Placeholder para link de fotos
                            className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-petrol-base hover:text-white hover:bg-petrol-base px-6 py-3.5 border border-petrol-base/20 rounded-sm transition-all duration-300 group"
                        >
                            <Camera size={14} /> 
                            <span>Ver Fotografias</span>
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