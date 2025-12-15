import React from 'react';
import { motion } from 'framer-motion';
import {
    MapPin, Mail, Phone, Globe, Github, Linkedin,
    Briefcase, GraduationCap, Code2, User, Star, Award,
    Download
} from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';

// --- PALETA DE CORES EFRESUME ---
const COLORS = {
    text: '#58585A',        // Cinza Escuro (Texto Principal)
    light: '#D1D2D4',       // Cinza Claro (Bordas/Inativo)
    title: '#232323',       // Preto Suave (Títulos)
    bg: '#F2F4F6'           // Fundo suave
};

// --- COMPONENTE: GRÁFICO DE ROSCA (Donut Chart) ---
const DonutChart = ({ percent, label, delay }: { percent: number, label: string, delay: number }) => {
    const radius = 32; // Ajustado para tamanho médio
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center relative group">
            <div className="relative w-24 h-24"> {/* Tamanho w-24 (96px) - Equilibrado */}
                {/* Texto Central */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <span className="text-xs font-bold text-[#58585A] tracking-tight">{label}</span>
                    <span className="text-[10px] font-mono text-[#888888] mt-0.5">{percent}%</span>
                </div>

                {/* SVG Rotacionado */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Círculo de Fundo */}
                    <circle
                        cx="50" cy="50" r={radius}
                        stroke={COLORS.light} strokeWidth="6" fill="transparent"
                        className="opacity-50"
                    />
                    {/* Círculo de Progresso Animado */}
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset: offset }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: delay, ease: "easeOut" }}
                        cx="50" cy="50" r={radius}
                        stroke={COLORS.text} strokeWidth="6" fill="transparent"
                        strokeDasharray={circumference}
                        strokeLinecap="butt"
                    />
                </svg>
            </div>
        </div>
    );
};

// --- COMPONENTE: PONTOS DE HABILIDADE (Skill Dots) ---
const SkillDots = ({ level, total = 8 }: { level: number, total?: number }) => {
    return (
        <div className="flex gap-1.5 mt-1">
            {[...Array(total)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.05), type: "spring" }}
                    className={`w-2 h-2 rounded-full ${i < level ? 'bg-[#58585A]' : 'bg-[#D1D2D4]'}`}
                />
            ))}
        </div>
    );
};

// --- DADOS DO CURRÍCULO ---
const SPECIALTIES = [
    { name: "React", percent: 90 },
    { name: "Node.js", percent: 75 },
    { name: "TypeScript", percent: 85 },
];

const SKILLS_LIST = [
    { name: "Next.js / SSR", level: 7 },
    { name: "Tailwind CSS", level: 8 },
    { name: "PostgreSQL", level: 5 },
    { name: "DevOps / CI/CD", level: 4 },
    { name: "System Design", level: 6 },
    { name: "UI / UX", level: 6 },
];

const EXPERIENCE = [
    {
        role: "Supervisor de Operações & Dev",
        company: "Wise System",
        period: "Out 2025 — Presente",
        desc: "Liderança técnica e operacional. Desenvolvimento de ferramentas internas (React/Node) para automação de chamados e implementação de CI/CD."
    },
    {
        role: "Analista de Suporte N2",
        company: "Wise System",
        period: "Abr 2025 — Out 2025",
        desc: "Onboarding técnico de grandes contas e treinamentos corporativos. Documentação de API e criação de Knowledge Base."
    },
    {
        role: "Back Office & Dados",
        company: "InHouse Contact Center",
        period: "Fev 2022 — Jan 2024",
        desc: "Otimização de fluxos operacionais reduzindo o tempo de resolução em 30% e geração de relatórios gerenciais automatizados."
    }
];

const CONTACTS = [
    { icon: MapPin, text: "São Paulo, SP - Brasil" },
    { icon: Mail, text: "victor@exemplo.com", link: "mailto:victorcontent@gmail.com" },
    { icon: Phone, text: "+55 11 99999-9999", link: "tel:+5511999999999" },
    { icon: Github, text: "github.com/VictorCardosoOl", link: "https://github.com/VictorCardosoOl" },
    { icon: Linkedin, text: "linkedin.com/in/victorccunha", link: "https://linkedin.com/in/victorccunha" },
];

export const ClassicResume: React.FC<{ layoutId?: string }> = ({ layoutId }) => {
    return (
        <div className="bg-white text-[#58585A] min-h-screen font-sans selection:bg-[#D1D2D4] selection:text-[#232323]">

            {/* --- CABEÇALHO ESTILO PROJETO (Sem Avatar) --- */}
            {/* Referência: ProjectDetailContent.tsx - Cinematic Hero */}
            <div className="w-full h-[50vh] min-h-[400px] relative overflow-hidden bg-[#0B232E] flex items-end">
                {/* Background Image (Blurred) */}
                <motion.img
                    src="/images/profile_main.jpg"
                    alt="Resume Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B232E] via-[#0B232E]/40 to-transparent"></div>

                {/* Content Container */}
                <div className="container mx-auto px-6 md:px-12 pb-16 relative z-10 w-full max-w-5xl">
                    <Reveal>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-[#F2F4F6] tracking-tighter leading-[0.9] mb-8">
                            Victor <br /> Cardoso
                        </h1>
                    </Reveal>

                    <Reveal delay={100}>
                        <div className="flex flex-wrap items-center gap-8 md:gap-12 text-[#F2F4F6]/80 border-t border-white/10 pt-6">

                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#78909C] mb-1">Cargo</span>
                                <span className="font-mono text-sm tracking-wide">Engenheiro de Software</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#78909C] mb-1">Localização</span>
                                <span className="font-mono text-sm tracking-wide">São Paulo, Brasil</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#78909C] mb-1">Status</span>
                                <span className="font-mono text-sm tracking-wide text-green-400 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                    Disponível
                                </span>
                            </div>

                        </div>
                    </Reveal>
                </div>
            </div>

            {/* --- CONTEÚDO PRINCIPAL --- */}
            <div className="max-w-5xl mx-auto px-6 pt-16 pb-16">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">

                    {/* COLUNA ESQUERDA (Info & Skills) */}
                    <div className="md:col-span-4 lg:col-span-4 space-y-12">

                        {/* PERFIL */}
                        <Reveal delay={100}>
                            <section>
                                <div className="flex items-center gap-3 mb-4 border-b border-dotted border-[#D1D2D4] pb-2">
                                    <User size={16} className="text-[#232323]" />
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#232323]">Perfil</h3>
                                </div>
                                <p className="text-xs md:text-sm font-light leading-relaxed text-justify text-[#58585A]">
                                    Engenheiro de Software com foco em escalabilidade e performance. Combino visão de produto com profundidade técnica para entregar soluções robustas.
                                </p>
                            </section>
                        </Reveal>

                        {/* ESPECIALIDADES (Grid Compacto) */}
                        <Reveal delay={150}>
                            <section>
                                <div className="flex items-center gap-3 mb-6 border-b border-dotted border-[#D1D2D4] pb-2">
                                    <Award size={16} className="text-[#232323]" />
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#232323]">Top Skills</h3>
                                </div>
                                <div className="flex flex-wrap justify-between gap-4">
                                    {SPECIALTIES.map((spec, i) => (
                                        <DonutChart key={i} percent={spec.percent} label={spec.name} delay={i * 0.2} />
                                    ))}
                                </div>
                            </section>
                        </Reveal>

                        {/* TECH SKILLS (Dots) */}
                        <Reveal delay={200}>
                            <section>
                                <div className="flex items-center gap-3 mb-4 border-b border-dotted border-[#D1D2D4] pb-2">
                                    <Star size={16} className="text-[#232323]" />
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#232323]">Stack</h3>
                                </div>
                                <div className="space-y-3">
                                    {SKILLS_LIST.map((skill, i) => (
                                        <div key={i} className="flex justify-between items-center bg-[#F9FAFB] p-2 rounded border border-[#F2F4F6]">
                                            <span className="text-xs font-medium text-[#232323]">{skill.name}</span>
                                            <SkillDots level={skill.level} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </Reveal>

                        {/* EDUCAÇÃO (Moved to Sidebar) */}
                        <Reveal delay={250}>
                            <section>
                                <div className="flex items-center gap-3 mb-4 border-b border-dotted border-[#D1D2D4] pb-2">
                                    <GraduationCap size={16} className="text-[#232323]" />
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#232323]">Educação</h3>
                                </div>
                                <div className="relative pl-4 border-l-2 border-[#D1D2D4]">
                                    <h4 className="text-xs font-bold text-[#58585A]">Ciência da Computação</h4>
                                    <p className="text-[10px] text-[#888888] font-mono uppercase tracking-wider mb-1">Anhembi Morumbi • 2022-2026</p>
                                </div>
                            </section>
                        </Reveal>

                        {/* CONTATO */}
                        <Reveal delay={300}>
                            <section>
                                <div className="flex items-center gap-3 mb-4 border-b border-dotted border-[#D1D2D4] pb-2">
                                    <Globe size={16} className="text-[#232323]" />
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#232323]">Contato</h3>
                                </div>
                                <ul className="space-y-3 text-xs md:text-sm font-light">
                                    {CONTACTS.map((c, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <c.icon size={14} className="text-[#888888] shrink-0" />
                                            {c.link ? (
                                                <a href={c.link} target="_blank" rel="noreferrer" className="hover:text-[#232323] hover:underline transition-colors break-all">
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

                    </div>

                    {/* COLUNA DIREITA (Experiência & Educação) */}
                    <div className="md:col-span-8 lg:col-span-8 space-y-16">

                        {/* EXPERIÊNCIA (Timeline) */}
                        <Reveal delay={200}>
                            <section>
                                <div className="flex items-center gap-3 mb-8 border-b-2 border-dotted border-[#D1D2D4] pb-4">
                                    <Briefcase size={20} className="text-[#232323]" />
                                    <h3 className="text-xl font-light text-[#232323]">Experiência Profissional</h3>
                                </div>

                                <div className="space-y-12 pl-2">
                                    {EXPERIENCE.map((exp, i) => (
                                        <div key={i} className="relative pl-8 border-l-2 border-[#58585A] group">
                                            {/* Bolinha do Timeline */}
                                            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white bg-[#222] group-hover:scale-125 transition-transform duration-300"></span>

                                            <div className="mb-3">
                                                <h4 className="text-lg font-bold text-[#58585A]">{exp.role}</h4>
                                                <div className="text-xs text-[#888888] font-mono uppercase tracking-wider mt-1">
                                                    {exp.company} <span className="mx-1">•</span> {exp.period}
                                                </div>
                                            </div>
                                            <p className="text-sm text-[#58585A] leading-relaxed font-light">
                                                {exp.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </Reveal>

                        <div className="pt-8">
                            <Button variant="outline" className="w-full md:w-auto border-[#D1D2D4] text-[#58585A] hover:bg-[#58585A] hover:text-white hover:border-[#58585A]">
                                <Download size={16} className="mr-2" /> Baixar CV em PDF
                            </Button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};
