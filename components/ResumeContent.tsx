import React from 'react';
import { Download, Calendar, MapPin, Building2, ExternalLink, Globe, BookOpen, Camera, Award } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { motion } from 'framer-motion';

const MotionImg = motion.img as any;

interface ResumeContentProps {
  layoutId?: string;
}

// --- DADOS DO CURRÍCULO (Refinados) ---

const HARD_SKILLS = {
    tech: [
        "Programação Web (Fullstack)",
        "Design de Experiência do Usuário (UX)",
        "Desenvolvimento de Projetos",
        "Lógica de Programação"
    ],
    business: [
        "Regras de Negócio",
        "Contabilidade & Financeiro",
        "Conciliação Bancária",
        "Criação de Minutas Contratuais",
        "Abertura de Empresas"
    ]
};

const SOFT_SKILLS = [
    "Resolutividade (Problem Solving)",
    "Pensamento Analítico",
    "Comunicação Clara",
    "Trabalho em Equipe",
    "Criatividade",
    "Pensamento Crítico",
    "Atenção aos Detalhes",
    "Lógica Estruturada",
    "Empatia"
];

const EDUCATION = [
    {
        course: "Engenharia da Computação",
        institution: "Universidade (Em curso)",
        period: "Cursando",
        type: "Bacharelado",
        desc: "Foco em desenvolvimento de software, estruturas de dados e arquitetura de sistemas."
    },
    {
        course: "Técnico em Administração",
        institution: "ETEC Parque Belém",
        period: "Concluído",
        type: "Técnico",
        desc: "Formação sólida em gestão empresarial, processos administrativos, contabilidade e direito empresarial."
    }
];

export const ResumeContent: React.FC<ResumeContentProps> = ({ layoutId }) => {
  return (
    <div className="bg-[#F2F4F6] min-h-screen pb-24">
      
      {/* 1. Header Cinematic */}
      <div className="w-full bg-[#0B232E] text-[#F2F4F6] pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
         
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-end">
            
            {/* Foto (Transition Target) */}
            <div className="w-32 h-40 md:w-56 md:h-72 flex-shrink-0 relative rounded-sm overflow-hidden border border-white/20 shadow-2xl">
               <MotionImg 
                 layoutId={layoutId}
                 src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800" 
                 alt="Victor Cardoso Profile"
                 className="w-full h-full object-cover grayscale"
               />
               <div className="absolute inset-0 border-4 border-[#0B232E]/20"></div>
            </div>

            <div className="flex-1 pb-2">
               <Reveal>
                  <div className="flex items-center gap-3 mb-4">
                     <span className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-white/80">
                        Disponível para Projetos
                     </span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight mb-4 leading-none">
                     Victor Cardoso
                  </h1>
               </Reveal>
               
               <Reveal delay={100}>
                  <p className="text-lg md:text-xl font-light text-white/70 max-w-2xl mb-8 leading-relaxed">
                     Estudante de Engenharia da Computação & Técnico em Administração. 
                     Unindo a lógica da programação com a visão estratégica de negócios.
                  </p>
                  
                  <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-mono text-white/50 uppercase tracking-widest border-t border-white/10 pt-6">
                     <span className="flex items-center gap-2"><MapPin size={12} /> São Paulo, Brasil</span>
                     <span className="flex items-center gap-2"><Globe size={12} /> Português (Nativo) / Inglês (Básico)</span>
                     <a href="#" className="flex items-center gap-2 text-white hover:text-[#78909C] transition-colors decoration-1 underline-offset-4">
                        <ExternalLink size={12} /> linkedin.com/in/victor
                     </a>
                  </div>
               </Reveal>
            </div>
         </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-16 md:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              
              {/* COLUNA ESQUERDA: Educação & Pessoal (4 cols) */}
              <div className="lg:col-span-4 space-y-16">
                  
                  {/* FORMAÇÃO */}
                  <section>
                      <Reveal width="100%">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B232E]/40 mb-8 border-b border-[#0B232E]/10 pb-4 flex items-center gap-2">
                            <Award size={14} /> Formação Acadêmica
                        </h3>
                      </Reveal>
                      
                      <div className="space-y-8">
                          {EDUCATION.map((edu, idx) => (
                             <Reveal key={idx} delay={idx * 100} width="100%">
                                <div className="group">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#78909C] mb-1 block">{edu.period} • {edu.type}</span>
                                    <h4 className="text-xl font-serif text-[#0B232E] mb-1">{edu.course}</h4>
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#0B232E]/50 mb-3">{edu.institution}</p>
                                    <p className="text-sm text-[#0B232E]/70 font-light leading-relaxed">
                                        {edu.desc}
                                    </p>
                                </div>
                             </Reveal>
                          ))}
                      </div>
                  </section>

                  {/* IDIOMAS & HOBBIES */}
                  <section>
                      <Reveal width="100%">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B232E]/40 mb-8 border-b border-[#0B232E]/10 pb-4 flex items-center gap-2">
                             Pessoal
                        </h3>
                      </Reveal>
                      
                      <div className="space-y-6">
                          <Reveal delay={100} width="100%">
                             <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-[#0B232E] mb-3">Idiomas</h4>
                                <ul className="space-y-2 text-sm text-[#0B232E]/70">
                                    <li className="flex justify-between"><span>Português</span> <span className="opacity-50">Nativo</span></li>
                                    <li className="flex justify-between"><span>Inglês</span> <span className="opacity-50">Básico (Em evolução)</span></li>
                                </ul>
                             </div>
                          </Reveal>

                          <Reveal delay={200} width="100%">
                             <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-[#0B232E] mb-3">Hobbies & Interesses</h4>
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-[#0B232E]/10 rounded-sm text-xs font-mono text-[#0B232E]/70">
                                        <BookOpen size={12} /> Literatura
                                    </span>
                                    <span className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-[#0B232E]/10 rounded-sm text-xs font-mono text-[#0B232E]/70 cursor-pointer hover:bg-[#0B232E] hover:text-white transition-colors">
                                        <Camera size={12} /> Fotografia
                                    </span>
                                </div>
                             </div>
                          </Reveal>
                      </div>
                  </section>

              </div>

              {/* COLUNA DIREITA: Skills & Competências (8 cols) */}
              <div className="lg:col-span-8 space-y-16">
                  
                  {/* HARD SKILLS (Dividido em Tech e Business) */}
                  <section>
                      <Reveal width="100%">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B232E]/40 mb-8 border-b border-[#0B232E]/10 pb-4 flex items-center gap-2">
                            Hard Skills & Competências
                        </h3>
                      </Reveal>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          
                          {/* TECH */}
                          <Reveal delay={100} width="100%">
                              <div className="bg-white p-8 rounded-sm border border-[#0B232E]/5 shadow-sm h-full">
                                  <h4 className="font-serif text-xl text-[#0B232E] mb-6">Tecnologia & Design</h4>
                                  <ul className="space-y-4">
                                      {HARD_SKILLS.tech.map((skill, i) => (
                                          <li key={i} className="flex items-start gap-3 text-sm text-[#0B232E]/80">
                                              <span className="w-1.5 h-1.5 rounded-full bg-[#78909C] mt-1.5 shrink-0"></span>
                                              {skill}
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                          </Reveal>

                          {/* BUSINESS */}
                          <Reveal delay={200} width="100%">
                              <div className="bg-white p-8 rounded-sm border border-[#0B232E]/5 shadow-sm h-full">
                                  <h4 className="font-serif text-xl text-[#0B232E] mb-6">Negócios & Administrativo</h4>
                                  <ul className="space-y-4">
                                      {HARD_SKILLS.business.map((skill, i) => (
                                          <li key={i} className="flex items-start gap-3 text-sm text-[#0B232E]/80">
                                              <span className="w-1.5 h-1.5 rounded-full bg-[#0B232E] mt-1.5 shrink-0"></span>
                                              {skill}
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                          </Reveal>
                      </div>
                  </section>

                  {/* SOFT SKILLS */}
                  <section>
                      <Reveal width="100%">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B232E]/40 mb-8 border-b border-[#0B232E]/10 pb-4 flex items-center gap-2">
                            Soft Skills (Comportamental)
                        </h3>
                      </Reveal>

                      <Reveal width="100%">
                          <div className="flex flex-wrap gap-3">
                              {SOFT_SKILLS.map((skill, i) => (
                                  <span 
                                    key={i}
                                    className="px-4 py-2 bg-transparent border border-[#0B232E]/20 text-[#0B232E] rounded-full text-sm font-light hover:bg-[#0B232E] hover:text-white transition-all duration-300 cursor-default"
                                  >
                                      {skill}
                                  </span>
                              ))}
                          </div>
                      </Reveal>
                  </section>
                  
                  {/* DOWNLOAD BUTTON */}
                  <div className="pt-8">
                    <button className="flex items-center gap-3 px-8 py-4 bg-[#0B232E] text-white rounded-sm hover:bg-[#153A48] transition-all text-xs font-bold uppercase tracking-widest shadow-lg">
                        <Download size={16} /> Baixar Versão PDF
                    </button>
                  </div>

              </div>
          </div>
      </div>
    </div>
  );
};