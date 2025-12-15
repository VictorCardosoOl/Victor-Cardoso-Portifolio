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
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center relative group mx-4 mb-6 md:mb-0">
            <div className="relative w-32 h-32">
                {/* Texto Central */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <span className="text-lg font-bold font-serif text-[#58585A]">{label}</span>
                    <span className="text-xs font-mono text-[#888888]">{percent}%</span>
                </div>

                {/* SVG Rotacionado */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Círculo de Fundo */}
                    <circle
                        cx="50" cy="50" r={radius}
                        stroke={COLORS.light} strokeWidth="8" fill="transparent"
                    />
                    {/* Círculo de Progresso Animado */}
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset: offset }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: delay, ease: "easeOut" }}
                        cx="50" cy="50" r={radius}
                        stroke={COLORS.text} strokeWidth="8" fill="transparent"
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
                    className={`w-2.5 h-2.5 rounded-full ${i < level ? 'bg-[#58585A]' : 'bg-[#D1D2D4]'}`}
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

            {/* --- CABEÇALHO (Cinematic Style) --- */}
            {/* Mantido o cabeçalho cinemático para consistência com o portfólio, conforme solicitado anteriormente. */}
            <div className="relative w-full h-[320px] bg-[#0B232E] text-[#F2F4F6] overflow-hidden border-b border-[#0B232E]">
                {/* Background Noise & Image */}
                <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] z-10 pointer-events-none"></div>
                <img
                    src="/images/profile_main.jpg"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <Reveal>
                        <div className="w-32 h-32 rounded-full border-4 border-white/10 overflow-hidden shadow-2xl mb-4 relative z-20 group">
                            <motion.img
                                layoutId={layoutId} // Magic Motion Link
                                src="/images/profile_main.jpg"
                                alt="Victor Cardoso"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Inner Glow */}
                            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none"></div>
                        </div>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-2 text-white tracking-tight">Victor Cardoso</h1>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-[#78909C]">Engenheiro de Software</p>
                    </Reveal>
                </div>
            </div>

            {/* --- CONTEÚDO (EFResume Refined Style) --- */}
            <div className="max-w-5xl mx-auto px-6 py-16">

                {/* 1. DESTAQUES (ROSQUINHAS) */}
                <Reveal variant="scale">
                    <section className="mb-20">
                        <div className="flex items-center gap-3 mb-10 border-b-2 border-dotted border-[#D1D2D4] pb-4">
                            <Award size={20} className="text-[#232323]" />
                            <h3 className="text-xl font-light text-[#232323]">Especialidades</h3>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-around items-center">
                            {SPECIALTIES.map((spec, i) => (
                                <DonutChart key={i} percent={spec.percent} label={spec.name} delay={i * 0.2} />
                            ))}
                        </div>
                    </section>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">

                    {/* COLUNA ESQUERDA (Info & Skills) */}
                    <div className="md:col-span-5 space-y-16">

                        {/* PERFIL */}
                        <Reveal delay={100}>
                            <section>
                                <div className="flex items-center gap-3 mb-6 border-b-2 border-dotted border-[#D1D2D4] pb-4">
                                    <User size={20} className="text-[#232323]" />
                                    <h3 className="text-xl font-light text-[#232323]">Perfil</h3>
                                </div>
                                <p className="text-sm font-light leading-relaxed text-justify">
                                    Engenheiro de Software focado em criar soluções escaláveis. Combino liderança operacional com capacidade técnica full-stack para transformar processos manuais em sistemas digitais eficientes.
                                </p>
                            </section>
                        </Reveal>

                        {/* HABILIDADES (PONTOS) */}
                        <Reveal delay={200}>
                            <section>
                                <div className="flex items-center gap-3 mb-6 border-b-2 border-dotted border-[#D1D2D4] pb-4">
                                    <Star size={20} className="text-[#232323]" />
                                    <h3 className="text-xl font-light text-[#232323]">Tech Skills</h3>
                                </div>
                                <div className="space-y-5">
                                    {SKILLS_LIST.map((skill, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                            <span className="text-sm font-bold text-[#232323] mb-1 sm:mb-0">{skill.name}</span>
                                            <SkillDots level={skill.level} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </Reveal>

                        {/* CONTATO */}
                        <Reveal delay={300}>
                            <section>
                                <div className="flex items-center gap-3 mb-6 border-b-2 border-dotted border-[#D1D2D4] pb-4">
                                    <Globe size={20} className="text-[#232323]" />
                                    <h3 className="text-xl font-light text-[#232323]">Conexões</h3>
                                </div>
                                <ul className="space-y-4 text-sm font-light">
                                    {CONTACTS.map((c, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <c.icon size={16} className="text-[#888888] shrink-0" />
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
                    <div className="md:col-span-7 space-y-16">

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

                        {/* EDUCAÇÃO */}
                        <Reveal delay={400}>
                            <section>
                                <div className="flex items-center gap-3 mb-8 border-b-2 border-dotted border-[#D1D2D4] pb-4">
                                    <GraduationCap size={20} className="text-[#232323]" />
                                    <h3 className="text-xl font-light text-[#232323]">Formação Acadêmica</h3>
                                </div>
                                <div className="relative pl-8 border-l-2 border-[#58585A]">
                                    <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white bg-[#222]"></span>
                                    <h4 className="text-lg font-bold text-[#58585A]">Ciência da Computação</h4>
                                    <p className="text-xs text-[#888888] font-mono uppercase tracking-wider mb-2">Anhembi Morumbi • 2022 - 2026</p>
                                    <p className="text-sm font-light">Bacharelado com ênfase em Engenharia de Software e Algoritmos Avançados.</p>
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
