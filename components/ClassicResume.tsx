import React from 'react';
import { motion } from 'framer-motion';
import {
    MapPin, Mail, Phone, Globe, Github, Linkedin,
    Briefcase, GraduationCap, User, Star, Award,
    Download, ExternalLink
} from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';

// --- CORES EFRESUME (Tema Editorial Clean) ---
const THEME = {
    text: '#58585A',        // Cinza Escuro (Texto Principal)
    light: '#D1D2D4',       // Cinza Claro (Bordas/Inativo)
    title: '#232323',       // Preto Suave (Títulos)
    accent: '#222222',      // Destaques (Bolinhas timeline)
    bg: '#FFFFFF'
};

const handleDownload = () => {
    // Simula o download abrindo o arquivo PDF
    // Em um cenário real, isso linkaria para "/documents/Victor_Cardoso_CV.pdf"
    const link = document.createElement('a');
    link.href = '/Victor_Cardoso_CV.pdf'; // Placeholder path
    link.download = 'Victor_Cardoso_CV.pdf';
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// --- 1. COMPONENTE: GRÁFICO DE ROSCA (Ajustado para menos densidade) ---
const DonutChart = ({ percent, label, delay }: { percent: number, label: string, delay: number }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="flex flex-col items-center group">
            <div className="relative w-36 h-36 md:w-40 md:h-40 mb-4 transition-transform duration-500 group-hover:scale-105">
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <span className="text-xl font-bold font-serif text-[#58585A]">{label}</span>
                    <span className="text-sm font-mono text-[#888888] mt-1">{percent}%</span>
                </div>
                <svg className="w-full h-full transform -rotate-90 drop-shadow-xl" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r={radius} stroke={THEME.light} strokeWidth="6" fill="transparent" />
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset: offset }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.8, delay: delay, ease: [0.22, 1, 0.36, 1] }}
                        cx="50" cy="50" r={radius}
                        stroke={THEME.text} strokeWidth="6" fill="transparent"
                        strokeDasharray={circumference}
                        strokeLinecap="butt"
                    />
                </svg>
            </div>
        </div>
    );
};

// --- 2. COMPONENTE: SKILL DOTS (Mais espaçados) ---
const SkillDots = ({ level, total = 8 }: { level: number, total?: number }) => {
    return (
        <div className="flex gap-2.5 mt-2"> {/* Aumentei o gap de 1.5 para 2.5 */}
            {[...Array(total)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + (i * 0.05), type: "spring", stiffness: 300 }}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${i < level ? 'bg-[#58585A]' : 'bg-[#E6E7E8]' // Cinza inativo mais suave
                        }`}
                />
            ))}
        </div>
    );
};

// --- DADOS (Atualizados com base no seu contexto de Eng. Comp / GitHub) ---
// Nota: Como não posso acessar links externos em tempo real, usei os dados 
// inferidos do seu repositório (Wise System, InHouse, React, Node, etc).

const SPECIALTIES = [
    { name: "React", percent: 95 },
    { name: "Node.js", percent: 80 },
    { name: "DevOps", percent: 65 },
];

const TECH_SKILLS = [
    { name: "TypeScript / JS", level: 7 },
    { name: "Next.js Architecture", level: 8 },
    { name: "Tailwind / UX", level: 8 },
    { name: "PostgreSQL / SQL", level: 6 },
    { name: "CI / CD (Github Actions)", level: 5 },
    { name: "System Design", level: 6 },
];

const EXPERIENCE = [
    {
        role: "Supervisor de Operações & Tech Lead",
        company: "Wise System",
        period: "Out 2025 — Presente",
        desc: "Liderança de equipes multidisciplinares e ponte entre estratégia e execução técnica. Desenvolvimento de automações internas (SaaS) para redução de SLA e otimização de fluxo de chamados."
    },
    {
        role: "Analista de Suporte N2",
        company: "Wise System",
        period: "Abr 2025 — Out 2025",
        desc: "Responsável pelo onboarding técnico de contas Enterprise. Criação de documentação técnica (Knowledge Base) e scripts de automação para diagnósticos recorrentes."
    },
    {
        role: "Back Office & Análise de Dados",
        company: "InHouse Contact Center",
        period: "Fev 2022 — Jan 2024",
        desc: "Implementação de dashboards de BI para monitoramento de KPIs operacionais. Otimização de processos administrativos utilizando Python e Excel Avançado."
    }
];

const EDUCATION = [
    {
        degree: "Bacharelado em Ciência da Computação",
        school: "Universidade Anhembi Morumbi",
        period: "2022 — 2026",
        desc: "Foco em Engenharia de Software, Algoritmos Complexos e Inteligência Artificial."
    }
];

const CONTACTS = [
    { icon: MapPin, text: "São Paulo, SP" },
    { icon: Mail, text: "victorcardcunha@gmail.com", link: "mailto:victorcardcunha@gmail.com" },
    { icon: Globe, text: "Portfólio Online", link: "#" },
    { icon: Github, text: "github.com/VictorCardosoOl", link: "https://github.com/VictorCardosoOl" },
    { icon: Linkedin, text: "linkedin.com/in/victorccunha", link: "https://linkedin.com/in/victorccunha" },
];

export const ClassicResume: React.FC<{ layoutId?: string }> = ({ layoutId }) => {
    return (
        <div id="resume-content" className="bg-white text-[#58585A] min-h-screen font-sans selection:bg-[#D1D2D4] selection:text-[#232323]">

            {/* --- 1. HEADER (Mais limpo e centralizado) --- */}
            <header className="relative w-full pt-20 pb-12 bg-[#F9FAFB] border-b border-[#D1D2D4]">
                <div className="container mx-auto px-6 flex flex-col items-center text-center">
                    <Reveal>
                        <div className="w-36 h-36 rounded-full p-1 border border-[#D1D2D4] mb-6 bg-white shadow-sm">
                            <motion.img
                                layoutId={layoutId}
                                src="/images/profile_main.jpg"
                                alt="Victor Cardoso"
                                className="w-full h-full rounded-full object-cover grayscale contrast-110"
                            />
                        </div>
                    </Reveal>

                    <Reveal delay={100}>
                        <h1 className="text-5xl font-serif font-medium text-[#232323] mb-3 tracking-tight">
                            Victor Cardoso
                        </h1>
                    </Reveal>

                    <Reveal delay={200}>
                        <div className="flex items-center gap-3 text-sm font-mono uppercase tracking-[0.2em] text-[#888888]">
                            <span>Engenharia</span>
                            <span className="w-1 h-1 bg-[#D1D2D4] rounded-full"></span>
                            <span>Produto</span>
                            <span className="w-1 h-1 bg-[#D1D2D4] rounded-full"></span>
                            <span>Operações</span>
                        </div>
                    </Reveal>
                </div>
            </header>

            {/* --- 2. BARRA DE CONTATO (Nova disposição horizontal) --- */}
            <div className="bg-white border-b border-[#D1D2D4]">
                <div className="container mx-auto px-6 py-4">
                    <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs md:text-sm font-light text-[#58585A]">
                        {CONTACTS.map((c, i) => (
                            <li key={i} className="flex items-center gap-2 group cursor-default">
                                <c.icon size={14} className="text-[#888888] group-hover:text-[#232323] transition-colors" />
                                {c.link ? (
                                    <a href={c.link} target="_blank" rel="noreferrer" className="hover:text-[#232323] hover:underline transition-all">
                                        {c.text}
                                    </a>
                                ) : (
                                    <span>{c.text}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* --- 3. CONTEÚDO PRINCIPAL (Grid mais espaçado) --- */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">

                {/* GRID DE DUAS COLUNAS (Layout Assimétrico 4/8) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">

                    {/* COLUNA ESQUERDA: Perfil e Skills */}
                    <aside className="md:col-span-5 space-y-20 md:sticky md:top-12 md:h-fit">

                        {/* Resumo */}
                        <Reveal delay={100}>
                            <section>
                                <div className="flex items-center gap-3 mb-8 border-b border-dotted border-[#D1D2D4] pb-4">
                                    <User size={18} className="text-[#232323]" />
                                    <h3 className="text-lg font-serif font-medium text-[#232323]">Sobre Mim</h3>
                                </div>
                                <p className="text-base text-[#58585A] leading-relaxed font-light text-justify">
                                    Engenheiro de Software e Supervisor de Operações com background sólido em Ciência da Computação. Diferencio-me por não apenas escrever código, mas por entender a estratégia de negócio por trás dele. Com experiência em liderança de equipes multidisciplinares e gestão de contas Enterprise, crio soluções que unem eficiência técnica (Clean Code, Arquitetura) com resultados operacionais mensuráveis (KPIs, SLAs e Redução de Custos).
                                </p>
                            </section>
                        </Reveal>

                        {/* Habilidades Técnicas (Dots) */}
                        <Reveal delay={200}>
                            <section>
                                <div className="flex items-center gap-3 mb-8 border-b border-dotted border-[#D1D2D4] pb-4">
                                    <Star size={18} className="text-[#232323]" />
                                    <h3 className="text-lg font-serif font-medium text-[#232323]">Stack Tecnológica</h3>
                                </div>
                                <div className="space-y-8"> {/* Mais espaço vertical entre itens */}
                                    {TECH_SKILLS.map((skill, i) => (
                                        <div key={i} className="group">
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-sm font-bold text-[#232323]">{skill.name}</span>
                                                <span className="text-[10px] font-mono text-[#D1D2D4] group-hover:text-[#58585A] transition-colors">
                                                    {skill.level}/8
                                                </span>
                                            </div>
                                            <SkillDots level={skill.level} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </Reveal>

                        {/* Botão Download (Móvel para Desktop fica aqui) */}
                        <div className="hidden md:block pt-8">
                            <Button
                                variant="outline"
                                onClick={handleDownload}
                                className="w-full border-[#D1D2D4] text-[#58585A] hover:border-[#232323] hover:bg-[#232323] hover:text-white transition-all duration-500 py-4 text-xs font-bold tracking-widest"
                            >
                                <Download size={14} className="mr-3" /> DOWNLOAD CV (PDF)
                            </Button>
                        </div>
                    </aside>

                    {/* COLUNA DIREITA: Timeline */}
                    <main className="md:col-span-7 space-y-20">

                        {/* Experiência */}
                        <Reveal delay={200}>
                            <section>
                                <div className="flex items-center gap-3 mb-10 border-b border-dotted border-[#D1D2D4] pb-4">
                                    <Briefcase size={18} className="text-[#232323]" />
                                    <h3 className="text-lg font-serif font-medium text-[#232323]">Trajetória Profissional</h3>
                                </div>

                                <div className="space-y-16 pl-4"> {/* Aumentado espaçamento da timeline */}
                                    {EXPERIENCE.map((exp, i) => (
                                        <div key={i} className="relative pl-8 border-l border-[#D1D2D4] group">
                                            {/* Indicador Visual da Timeline */}
                                            {/* Indicador Visual da Timeline */}
                                            <motion.span
                                                initial={{ backgroundColor: "#FFFFFF", borderColor: "#D1D2D4" }}
                                                whileInView={{ backgroundColor: "#232323", borderColor: "#232323", scale: 1.2 }}
                                                viewport={{ once: false, margin: "-50% 0px -50% 0px" }} // Ativa quando estiver no meio da tela
                                                transition={{ duration: 0.4 }}
                                                className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full border border-[#D1D2D4] z-10"
                                            ></motion.span>

                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-3">
                                                <h4 className="text-xl font-bold text-[#232323]">{exp.role}</h4>
                                                <div className="text-xs font-mono text-[#888888] bg-[#F2F4F6] px-2 py-1 rounded mt-2 sm:mt-0">
                                                    {exp.period}
                                                </div>
                                            </div>

                                            <div className="text-sm font-bold text-[#58585A] uppercase tracking-wider mb-4 flex items-center gap-2">
                                                {exp.company}
                                                <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>

                                            <p className="text-base text-[#58585A] leading-relaxed font-light opacity-90">
                                                {exp.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </Reveal>

                        {/* Educação */}
                        <Reveal delay={300}>
                            <section>
                                <div className="flex items-center gap-3 mb-10 border-b border-dotted border-[#D1D2D4] pb-4">
                                    <GraduationCap size={18} className="text-[#232323]" />
                                    <h3 className="text-lg font-serif font-medium text-[#232323]">Educação</h3>
                                </div>
                                <div className="relative pl-8 border-l border-[#D1D2D4] group ml-4">
                                    <span className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full border border-[#D1D2D4] bg-white group-hover:bg-[#232323] transition-colors"></span>

                                    {EDUCATION.map((edu, i) => (
                                        <div key={i}>
                                            <h4 className="text-xl font-bold text-[#232323]">{edu.degree}</h4>
                                            <div className="text-xs font-mono text-[#888888] uppercase tracking-wider mt-2 mb-3">
                                                {edu.school} • {edu.period}
                                            </div>
                                            <p className="text-base text-[#58585A] font-light">
                                                {edu.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </Reveal>

                        {/* Botão Mobile */}
                        <div className="md:hidden pt-8">
                            <Button variant="outline" className="w-full" onClick={handleDownload}>
                                Baixar CV em PDF
                            </Button>
                        </div>

                    </main>

                </div>

                {/* DESTAQUES (Donuts) - Movido para o final (Centralizado e largo) */}
                <Reveal variant="scale">
                    <section className="mt-24 border-t border-[#D1D2D4] pt-16">
                        <div className="flex items-center justify-center gap-3 mb-12">
                            <Award size={18} className="text-[#232323]" />
                            <h3 className="text-lg font-mono uppercase tracking-widest text-[#232323]">Especialidades Principais</h3>
                        </div>
                        <div className="flex flex-wrap justify-center gap-16 md:gap-32">
                            {SPECIALTIES.map((spec, i) => (
                                <DonutChart key={i} percent={spec.percent} label={spec.name} delay={i * 0.15} />
                            ))}
                        </div>
                    </section>
                </Reveal>
            </div>
        </div>
    );
};
