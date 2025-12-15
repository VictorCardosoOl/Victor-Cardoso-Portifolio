import React from 'react';
import { motion } from 'framer-motion';
import {
    MapPin, Mail, Phone, Globe, Github, Linkedin,
    Briefcase, GraduationCap, Code2, User, Star, Award
} from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';

// --- CORES DO EFRESUME ---
// Cinza Escuro (Texto/Ativo): #58585A
// Cinza Claro (Inativo/Borda): #D1D2D4

// --- 1. COMPONENTE: GRÁFICO DE ROSCA (Estilo Pizza.js) ---
const DonutChart = ({ percent, label, delay }: { percent: number, label: string, delay: number }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center relative group">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
                {/* Texto Central */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <span className="text-xl font-bold text-[#58585A] font-serif">{label}</span>
                    <span className="text-xs text-[#888888] font-mono">{percent}%</span>
                </div>

                {/* SVG Rotacionado */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Fundo (Círculo Cinza Claro - Parte restante) */}
                    <circle
                        cx="50" cy="50" r={radius}
                        stroke="#D1D2D4" strokeWidth="10" fill="transparent"
                    />
                    {/* Progresso (Círculo Cinza Escuro - Valor) */}
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset: offset }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: delay, ease: "easeOut" }}
                        cx="50" cy="50" r={radius}
                        stroke="#58585A" strokeWidth="10" fill="transparent"
                        strokeDasharray={circumference}
                        strokeLinecap="butt" // O estilo do EFResume é "butt", não "round"
                    />
                </svg>
            </div>
        </div>
    );
};

// --- 2. COMPONENTE: BOLINHAS DE SKILL (Estilo Ellipses) ---
const SkillDots = ({ level, total = 8 }: { level: number, total?: number }) => {
    return (
        <div className="flex gap-1.5 mt-1">
            {[...Array(total)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, type: "spring" }}
                    className={`w-3 h-3 rounded-full ${i < level ? 'bg-[#58585A]' : 'bg-[#D1D2D4]'}`}
                />
            ))}
        </div>
    );
};

// --- DADOS ---
const SPECIALTIES = [
    { name: "Swift", percent: 99 },
    { name: "Objective-C", percent: 66 },
    { name: "C/C++", percent: 33 },
];

const SKILLS_LIST = [
    { name: "React / Next.js", level: 7 }, // 7 de 8
    { name: "TypeScript", level: 6 },
    { name: "Node.js", level: 5 },
    { name: "Tailwind CSS", level: 8 },
    { name: "PostgreSQL", level: 4 },
    { name: "Design System", level: 6 },
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

const CONTACTS = [
    { icon: MapPin, text: "São Paulo, SP - Brasil" },
    { icon: Mail, text: "victor@exemplo.com", link: "mailto:victor@exemplo.com" },
    { icon: Phone, text: "+55 11 99999-9999", link: "tel:+5511999999999" },
    { icon: Globe, text: "seuwebsite.com", link: "https://seuwebsite.com" },
    { icon: Github, text: "github.com/victorccunha", link: "https://github.com/victorccunha" },
    { icon: Linkedin, text: "linkedin.com/in/victorccunha", link: "https://linkedin.com/in/victorccunha" },
];

export const ClassicResume: React.FC<{ layoutId?: string }> = ({ layoutId }) => {
    return (
        <div className="bg-white text-[#58585A] min-h-screen font-sans selection:bg-[#D1D2D4] selection:text-[#58585A]">

            {/* --- CABEÇALHO --- */}
            <div className="relative w-full h-[280px] bg-[#F2F4F6] overflow-hidden border-b border-[#D1D2D4]">
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <Reveal>
                        <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-lg mb-4">
                            <motion.img
                                layoutId={layoutId}
                                src="/images/profile_main.jpg"
                                alt="Victor Cardoso"
                                className="w-full h-full object-cover grayscale"
                            />
                        </div>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 className="text-3xl md:text-4xl font-serif font-medium mb-1 text-[#232323]">Victor Cardoso</h1>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#888888]">Engenheiro de Software</p>
                    </Reveal>
                </div>
            </div>

            {/* --- CONTEÚDO PRINCIPAL --- */}
            <div className="max-w-6xl mx-auto px-6 py-16">

                {/* SEÇÃO 1: SKILLS CHARTS (ROSQUINHAS) */}
                <Reveal>
                    <section className="mb-20">
                        <div className="flex items-center gap-3 mb-10 border-b-2 border-dotted border-[#D1D2D4] pb-4">
                            <Award size={20} className="text-[#232323]" />
                            <h3 className="text-xl font-light text-[#232323]">Especialidades</h3>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-around gap-10 md:gap-0">
                            {SPECIALTIES.map((spec, i) => (
                                <DonutChart key={i} percent={spec.percent} label={spec.name} delay={i * 0.2} />
                            ))}
                        </div>
                    </section>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">

                    {/* COLUNA ESQUERDA */}
                    <div className="md:col-span-5 space-y-16">

                        {/* SKILLS LIST (BOLINHAS) */}
                        <Reveal delay={100}>
                            <section>
                                <div className="flex items-center gap-3 mb-6 border-b-2 border-dotted border-[#D1D2D4] pb-4">
                                    <Star size={20} className="text-[#232323]" />
                                    <h3 className="text-xl font-light text-[#232323]">Habilidades</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-y-6">
                                    {SKILLS_LIST.map((skill, i) => (
                                        <div key={i} className="flex flex-col">
                                            <span className="text-sm font-bold text-[#232323] mb-1">{skill.name}</span>
                                            <SkillDots level={skill.level} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </Reveal>

                        {/* CONTATO */}
                        <Reveal delay={200}>
                            <section>
                                <div className="flex items-center gap-3 mb-6 border-b-2 border-dotted border-[#D1D2D4] pb-4">
                                    <User size={20} className="text-[#232323]" />
                                    <h3 className="text-xl font-light text-[#232323]">Contato</h3>
                                </div>
                                <ul className="space-y-4 text-sm font-light">
                                    {CONTACTS.map((c, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <c.icon size={16} className="text-[#888888] shrink-0 mt-0.5" />
                                            {c.link ? (
                                                <a href={c.link} target="_blank" rel="noreferrer" className="hover:text-[#232323] hover:underline transition-all break-all text-[#58585A]">
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

                    {/* COLUNA DIREITA */}
                    <div className="md:col-span-7 space-y-16">

                        {/* EXPERIÊNCIA */}
                        <Reveal delay={300}>
                            <section>
                                <div className="flex items-center gap-3 mb-8 border-b-2 border-dotted border-[#D1D2D4] pb-4">
                                    <Briefcase size={20} className="text-[#232323]" />
                                    <h3 className="text-xl font-light text-[#232323]">Experiência</h3>
                                </div>

                                <div className="space-y-10 pl-2">
                                    {EXPERIENCE.map((exp, i) => (
                                        <div key={i} className="relative pl-6 border-l-2 border-[#58585A]">
                                            {/* Bolinha do Timeline */}
                                            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white bg-[#222]"></span>

                                            <div className="mb-2">
                                                <h4 className="text-lg font-bold text-[#6D6E71]">{exp.role}</h4>
                                                <div className="text-xs text-[#888888] mb-1 font-mono uppercase tracking-wider">
                                                    {exp.company} • {exp.period}
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
                                    <h3 className="text-xl font-light text-[#232323]">Educação</h3>
                                </div>
                                <div className="relative pl-6 border-l-2 border-[#58585A]">
                                    <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white bg-[#222]"></span>
                                    <h4 className="text-lg font-bold text-[#6D6E71]">Ciência da Computação</h4>
                                    <p className="text-xs text-[#888888] font-mono uppercase tracking-wider mb-2">Anhembi Morumbi • 2022 - 2026</p>
                                    <p className="text-sm text-[#58585A] font-light">Bacharelado com ênfase em Engenharia de Software.</p>
                                </div>
                            </section>
                        </Reveal>

                        {/* BOTÃO */}
                        <div className="pt-4">
                            <Button variant="outline" className="w-full md:w-auto border-[#D1D2D4] text-[#58585A] hover:border-[#58585A] hover:bg-[#58585A] hover:text-white">
                                Baixar Versão PDF
                            </Button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};
