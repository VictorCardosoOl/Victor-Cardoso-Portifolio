import React from 'react';
import { motion } from 'framer-motion';
import {
    MapPin, Mail, Phone, Globe, Github, Linkedin,
    Briefcase, GraduationCap, Code2, User, Star
} from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';

// --- Dados do Currículo (Poderiam vir de constants.tsx) ---
const CONTACTS = [
    { icon: MapPin, text: "São Paulo, SP - Brasil" },
    { icon: Mail, text: "victor@exemplo.com", link: "mailto:victor@exemplo.com" },
    { icon: Phone, text: "+55 11 99999-9999", link: "tel:+5511999999999" },
    { icon: Globe, text: "seuwebsite.com", link: "https://seuwebsite.com" },
    { icon: Github, text: "github.com/victorccunha", link: "https://github.com/victorccunha" },
    { icon: Linkedin, text: "linkedin.com/in/victorccunha", link: "https://linkedin.com/in/victorccunha" },
];

const SKILLS = [
    { name: "React / Next.js", percent: 90 },
    { name: "TypeScript", percent: 85 },
    { name: "Node.js", percent: 75 },
    { name: "Tailwind CSS", percent: 95 },
    { name: "PostgreSQL", percent: 60 },
];

const EXPERIENCE = [
    {
        role: "Supervisor de Operações & Dev",
        company: "Wise System",
        period: "Out 2025 — Presente",
        desc: "Liderança técnica e operacional de equipes multidisciplinares. Desenvolvimento de ferramentas internas (React/Node) para automação de chamados e implementação de CI/CD."
    },
    {
        role: "Analista de Suporte N2",
        company: "Wise System",
        period: "Abr 2025 — Out 2025",
        desc: "Onboarding técnico de grandes contas e treinamentos corporativos da plataforma. Documentação de API e criação de Knowledge Base."
    },
    {
        role: "Back Office & Dados",
        company: "InHouse Contact Center",
        period: "Fev 2022 — Jan 2024",
        desc: "Otimização de fluxos operacionais reduzindo o tempo de resolução em 30% e geração de relatórios gerenciais automatizados em Python."
    }
];

export const ClassicResume: React.FC<{ layoutId?: string }> = ({ layoutId }) => {
    return (
        <div className="bg-white text-slate-800 min-h-screen font-sans">

            {/* --- 1. CABEÇALHO (Mantendo sua identidade visual) --- */}
            <div className="relative w-full h-[300px] bg-[#0B232E] text-[#F2F4F6] overflow-hidden">
                {/* Background com Noise e Imagem */}
                <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] z-10 pointer-events-none"></div>
                <img
                    src="/images/profile_main.jpg"
                    alt="Background Texture"
                    className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <Reveal>
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/10 overflow-hidden shadow-2xl mb-4">
                            <motion.img
                                layoutId={layoutId} // Magic Motion Link
                                src="/images/profile_main.jpg"
                                alt="Victor Cardoso"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 className="text-3xl md:text-5xl font-serif font-medium mb-2 text-center">Victor Cardoso</h1>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] opacity-60">Engenheiro de Software</p>
                    </Reveal>
                </div>
            </div>

            {/* --- 2. CONTEÚDO (Layout inspirado no EFResume) --- */}
            <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                    {/* COLUNA ESQUERDA (Sidebar) */}
                    <div className="md:col-span-4 space-y-12">

                        {/* Contatos */}
                        <Reveal delay={100}>
                            <section>
                                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#0B232E] border-b-2 border-[#0B232E]/10 pb-3 mb-6">
                                    <User size={16} /> Contato
                                </h3>
                                <ul className="space-y-4 text-sm text-slate-600">
                                    {CONTACTS.map((c, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <c.icon size={16} className="text-[#78909C] shrink-0 mt-0.5" />
                                            {c.link ? (
                                                <a href={c.link} target="_blank" rel="noreferrer" className="hover:text-[#0B232E] transition-colors break-all">
                                                    {c.text}
                                                </a>
                                            ) : (
                                                <span>{c.text}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </Reveal>

                        {/* Skills (Barras de Progresso estilo EFResume) */}
                        <Reveal delay={200}>
                            <section>
                                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#0B232E] border-b-2 border-[#0B232E]/10 pb-3 mb-6">
                                    <Code2 size={16} /> Habilidades
                                </h3>
                                <div className="space-y-5">
                                    {SKILLS.map((skill, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-xs font-bold text-slate-700">{skill.name}</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                                <div
                                                    className="bg-[#0B232E] h-1.5 rounded-full"
                                                    style={{ width: `${skill.percent}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </Reveal>

                        {/* Educação */}
                        <Reveal delay={300}>
                            <section>
                                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#0B232E] border-b-2 border-[#0B232E]/10 pb-3 mb-6">
                                    <GraduationCap size={16} /> Educação
                                </h3>
                                <div className="mb-4">
                                    <h4 className="font-bold text-slate-800">Ciência da Computação</h4>
                                    <p className="text-xs text-[#78909C] font-mono mb-2 uppercase">Anhembi Morumbi • 2022 - 2026</p>
                                </div>
                            </section>
                        </Reveal>

                    </div>

                    {/* COLUNA DIREITA (Main Content) */}
                    <div className="md:col-span-8 space-y-12">

                        {/* Sobre */}
                        <Reveal delay={150}>
                            <section>
                                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#0B232E] border-b-2 border-[#0B232E]/10 pb-3 mb-6">
                                    <Star size={16} /> Perfil
                                </h3>
                                <p className="text-slate-600 leading-relaxed font-light text-lg">
                                    Engenheiro de Software com mindset de produto. Especialista em transformar processos manuais em sistemas digitais eficientes.
                                    Combino liderança operacional com capacidade técnica full-stack para entregar soluções que resolvem dores reais de negócio.
                                </p>
                            </section>
                        </Reveal>

                        {/* Experiência Profissional */}
                        <Reveal delay={250}>
                            <section>
                                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#0B232E] border-b-2 border-[#0B232E]/10 pb-3 mb-8">
                                    <Briefcase size={16} /> Experiência
                                </h3>

                                <div className="border-l-2 border-slate-100 ml-2 pl-8 space-y-10">
                                    {EXPERIENCE.map((exp, i) => (
                                        <div key={i} className="relative">
                                            {/* Bullet Point na linha do tempo */}
                                            <span className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full border-4 border-white bg-[#0B232E]"></span>

                                            <h4 className="text-xl font-serif font-bold text-[#0B232E]">{exp.role}</h4>
                                            <div className="flex flex-wrap gap-2 items-center text-xs font-mono text-[#78909C] uppercase tracking-wider mb-3">
                                                <span>{exp.company}</span>
                                                <span>•</span>
                                                <span>{exp.period}</span>
                                            </div>
                                            <p className="text-slate-600 leading-relaxed font-light">
                                                {exp.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </Reveal>

                        {/* Botão de Download */}
                        <div className="pt-8">
                            <Button variant="outline" className="w-full md:w-auto">Baixar Versão PDF</Button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};
