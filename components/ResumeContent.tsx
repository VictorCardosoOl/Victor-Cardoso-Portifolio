import React from 'react';
import { EDUCATION, SKILLS } from '../constants';
import { Download, Calendar, MapPin, Building2, ExternalLink } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { motion } from 'framer-motion';

const MotionImg = motion.img as any;

interface ResumeContentProps {
  layoutId?: string;
}

// Dados simulados de Experiência (Você pode mover para constants.tsx depois)
const EXPERIENCE = [
  {
    role: "Senior Frontend Engineer",
    company: "TechFlow Solutions",
    period: "2023 - Presente",
    location: "Remoto, US",
    description: "Liderança técnica na migração de legado para Next.js 14. Implementação de Design System consumido por 4 produtos diferentes. Melhoria de 40% no LCP da aplicação principal."
  },
  {
    role: "Full Stack Developer",
    company: "Studio Agência",
    period: "2021 - 2023",
    location: "São Paulo, BR",
    description: "Desenvolvimento de e-commerces headless utilizando Shopify e React. Integração de gateways de pagamento e sistemas de ERP. Mentoria de desenvolvedores júnior."
  },
  {
    role: "Frontend Developer",
    company: "Startup One",
    period: "2019 - 2021",
    location: "Híbrido, SP",
    description: "Responsável pelo front-end da plataforma SaaS. Criação de dashboards interativos com D3.js e manutenção de componentes Vue.js."
  }
];

export const ResumeContent: React.FC<ResumeContentProps> = ({ layoutId }) => {
  return (
    <div className="bg-[#F2F4F6] min-h-screen pb-24">
      
      {/* 1. Header do Currículo (Visual) */}
      <div className="w-full bg-[#0B232E] text-[#F2F4F6] pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 relative overflow-hidden">
         <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-end">
            
            {/* Foto (Transition Target) */}
            <div className="w-32 h-40 md:w-48 md:h-60 flex-shrink-0 relative rounded-sm overflow-hidden border border-white/20">
               <MotionImg 
                 layoutId={layoutId}
                 src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800" 
                 alt="Victor Cardoso Profile"
                 className="w-full h-full object-cover grayscale"
               />
            </div>

            <div className="flex-1 pb-2">
               <Reveal>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-4 block">
                     Curriculum Vitae
                  </span>
                  <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight mb-6">
                     Victor Cardoso
                  </h1>
               </Reveal>
               
               <Reveal delay={100}>
                  <div className="flex flex-wrap gap-6 text-sm font-light text-white/70">
                     <span className="flex items-center gap-2"><MapPin size={14} /> São Paulo, Brasil</span>
                     <span className="flex items-center gap-2"><Building2 size={14} /> Disponível para Projetos</span>
                     <a href="#" className="flex items-center gap-2 text-white hover:underline decoration-1 underline-offset-4">
                        <ExternalLink size={14} /> linkedin.com/in/victor
                     </a>
                  </div>
               </Reveal>
            </div>

            <div className="hidden md:block pb-2">
                <button className="flex items-center gap-3 px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-[#0B232E] transition-all text-xs font-bold uppercase tracking-widest group">
                    <Download size={14} /> Baixar PDF
                </button>
            </div>
         </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 mt-16 md:mt-24 space-y-20 md:space-y-32">
          
          {/* 2. Experiência Profissional */}
          <section>
             <Reveal width="100%">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B232E]/40 mb-8 border-b border-[#0B232E]/10 pb-4">
                   Experiência Profissional
                </h3>
             </Reveal>
             
             <div className="space-y-12">
                {EXPERIENCE.map((job, idx) => (
                   <Reveal key={idx} width="100%" delay={idx * 50}>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 group">
                          <div className="md:col-span-3">
                              <span className="text-xs font-mono text-[#0B232E]/50 flex items-center gap-2 mt-1.5">
                                 <Calendar size={12} /> {job.period}
                              </span>
                          </div>
                          <div className="md:col-span-9">
                              <h4 className="text-2xl font-serif text-[#0B232E] mb-1 group-hover:text-[#78909C] transition-colors">
                                 {job.role}
                              </h4>
                              <span className="text-xs font-bold uppercase tracking-widest text-[#0B232E]/60 mb-4 block">
                                 {job.company} &mdash; {job.location}
                              </span>
                              <p className="text-[#1E3A45]/80 font-light leading-relaxed max-w-2xl">
                                 {job.description}
                              </p>
                          </div>
                      </div>
                   </Reveal>
                ))}
             </div>
          </section>

          {/* 3. Stack Técnica (Grid) */}
          <section>
             <Reveal width="100%">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B232E]/40 mb-8 border-b border-[#0B232E]/10 pb-4">
                   Competências Técnicas
                </h3>
             </Reveal>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SKILLS.map((skillGroup, idx) => (
                    <Reveal key={idx} delay={idx * 50}>
                        <div className="bg-white p-6 border border-[#0B232E]/5 rounded-sm h-full">
                            <h4 className="font-serif text-lg text-[#0B232E] mb-4">{skillGroup.title}</h4>
                            <ul className="space-y-2">
                                {skillGroup.items.map((item, i) => (
                                    <li key={i} className="text-sm text-[#0B232E]/70 flex items-center gap-2">
                                        <span className="w-1 h-1 bg-[#78909C] rounded-full"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                ))}
             </div>
          </section>

          {/* 4. Educação */}
          <section>
             <Reveal width="100%">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B232E]/40 mb-8 border-b border-[#0B232E]/10 pb-4">
                   Formação Acadêmica
                </h3>
             </Reveal>
             
             <div className="space-y-8">
                 {EDUCATION.map((edu, idx) => (
                     <Reveal key={idx} width="100%">
                         <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#0B232E]/5 pb-6 last:border-0">
                             <div>
                                 <h4 className="text-xl font-serif text-[#0B232E]">{edu.degree}</h4>
                                 <span className="text-xs font-bold uppercase tracking-widest text-[#0B232E]/50">{edu.institution}</span>
                             </div>
                             <span className="text-xs font-mono text-[#0B232E]/40 mt-2 md:mt-0">{edu.period}</span>
                         </div>
                     </Reveal>
                 ))}
             </div>
          </section>

      </div>
    </div>
  );
};