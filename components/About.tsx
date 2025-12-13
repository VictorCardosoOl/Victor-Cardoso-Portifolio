import React, { useState } from 'react';
import { Reveal } from './ui/Reveal';
import ContentModal from './ui/ContentModal';
import { ResumeContent } from './ResumeContent';
import { ArrowUpRight, User, Camera, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import Magnetic from './ui/Magnetic';

const MotionImg = motion.img as any;

const About: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <section id="about" className="py-24 md:py-40 bg-paper relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 xl:px-24">
        
        {/* Compact Header */}
        <div className="flex items-center gap-3 mb-16 border-b border-petrol-base/10 pb-4">
            <span className="w-2 h-2 rounded-full bg-petrol-base"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-petrol-base/40">Perfil Profissional</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
           
           {/* COL 1: Interactive Profile Card (Trigger) */}
           <div className="lg:col-span-5 relative group cursor-pointer" onClick={() => setIsResumeOpen(true)}>
               <Reveal variant="scale" width="100%">
                  <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-sm bg-petrol-base/5 border border-petrol-base/10 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]">
                      {/* Image with layoutId for transition */}
                      <MotionImg 
                        layoutId="profile-photo-main"
                        src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800" 
                        alt="Profile" 
                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                      />
                      
                      {/* Hover Overlay Text */}
                      <div className="absolute inset-0 bg-petrol-base/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 px-6">
                              <span className="block text-3xl font-serif text-white mb-2 italic">Curriculum Vitae</span>
                              <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                                 Engenharia • Administração • Design
                              </span>
                          </div>
                      </div>

                      {/* Corner Icon */}
                      <div className="absolute bottom-4 right-4 w-10 h-10 bg-white text-petrol-base flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 z-10">
                          <ArrowUpRight size={16} />
                      </div>
                  </div>
               </Reveal>
               
               {/* Decorative background outline */}
               <div className="absolute top-4 -left-4 w-full h-full border border-petrol-base/5 -z-10 hidden md:block group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
           </div>

           {/* COL 2: Concise Bio & CTA */}
           <div className="lg:col-span-7 flex flex-col justify-center">
              <Reveal>
                 <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-petrol-base mb-8 leading-[0.95] tracking-tight">
                    Visão de <span className="font-normal italic">Negócio.</span> <br/>
                    Precisão de <span className="font-normal italic">Código.</span>
                 </h2>
              </Reveal>

              <div className="space-y-6 text-lg font-light text-petrol-ink/80 leading-relaxed max-w-2xl mb-12">
                  <Reveal delay={100}>
                    <p>
                        Estudante de <strong>Engenharia da Computação</strong> com formação técnica em <strong>Administração</strong>. Minha atuação vive na interseção entre regras de negócio complexas e soluções digitais elegantes.
                    </p>
                  </Reveal>
                  <Reveal delay={200}>
                    <p>
                        Não apenas escrevo código; entendo de minutas contratuais, conciliação bancária e experiência do usuário. Transformo burocracia em interfaces fluidas e processos lógicos.
                    </p>
                  </Reveal>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 items-center">
                 <Reveal delay={300}>
                    <Magnetic strength={0.2}>
                        <button 
                            onClick={() => setIsResumeOpen(true)}
                            className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] bg-petrol-base text-white px-8 py-4 border border-petrol-base rounded-sm hover:bg-petrol-mid transition-all duration-300 shadow-lg"
                        >
                            <FileText size={14} /> Ver Currículo Completo
                        </button>
                    </Magnetic>
                 </Reveal>

                 <Reveal delay={400}>
                    <Magnetic strength={0.2}>
                        <a 
                            href="#photography" // Placeholder link
                            className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-petrol-base hover:text-white hover:bg-petrol-base px-8 py-4 border border-petrol-base/20 rounded-sm transition-all duration-300"
                        >
                            <Camera size={14} /> Fotografia & Hobby
                        </a>
                    </Magnetic>
                 </Reveal>
              </div>

              {/* Tags / Footer */}
              <Reveal delay={500}>
                 <div className="mt-12 pt-8 border-t border-petrol-base/10 flex flex-wrap gap-x-8 gap-y-2 text-[10px] font-mono uppercase tracking-widest text-petrol-base/40">
                    <span>São Paulo, BR</span>
                    <span>PT-BR (Nativo)</span>
                    <span>EN (Básico)</span>
                 </div>
              </Reveal>
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