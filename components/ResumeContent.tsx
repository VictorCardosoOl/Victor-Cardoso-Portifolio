import React from 'react';
import { motion } from 'framer-motion';
import {
    Download, MapPin, Mail, Phone, Github, Twitter,
    ThumbsUp, Star, User, Book, Link as LinkIcon,
    Flag, Lightbulb, Share2, Globe, MessageCircle
} from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';

// --- Componentes Auxiliares de UI (Locais) ---

// 1. Gráfico de Pizza Simples (SVG)
const PieChart = ({ percent, label, color }: { percent: number; label: string; color: string }) => {
    const circumference = 2 * Math.PI * 40; // r=40
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center group">
            <div className="relative w-24 h-24 transform transition-transform group-hover:scale-110 duration-500">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="50%" cy="50%" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-petrol-base/10" />
                    <circle
                        cx="50%" cy="50%" r="40"
                        stroke={color} strokeWidth="8" fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-xl font-bold text-petrol-base">{percent}%</span>
                </div>
            </div>
            <span className="mt-4 font-mono text-[10px] uppercase tracking-widest text-petrol-base/60">{label}</span>
        </div>
    );
};

// 2. Pontos de Habilidade (Dots)
const SkillDots = ({ level }: { level: number }) => (
    <div className="flex gap-1.5">
        {[...Array(8)].map((_, i) => (
            <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i < level ? 'bg-petrol-base scale-110' : 'bg-petrol-base/20 scale-90'}`}
            />
        ))}
    </div>
);

// 3. Item de Projeto (Timeline)
const ProjectItem = ({ title, role, date, descriptions }: any) => (
    <div className="mb-10 pl-8 relative group">
        <div className="absolute left-0 top-1.5 w-2 h-2 bg-petrol-base rounded-full ring-4 ring-paper transition-all group-hover:bg-petrol-electric"></div>
        <div className="absolute left-[3px] top-4 bottom-0 w-px bg-petrol-base/10 -z-10 group-hover:h-full transition-all h-[90%]"></div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
            <h4 className="text-lg font-serif font-bold text-petrol-base group-hover:text-petrol-electric transition-colors">{title}</h4>
            <span className="text-[10px] font-mono uppercase tracking-widest text-petrol-base/50">{date}</span>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-petrol-base/70 mb-4">{role}</p>
        <ul className="space-y-2 text-sm text-petrol-ink group-hover:text-petrol-base transition-colors leading-relaxed font-light">
            {descriptions.map((desc: string, i: number) => (
                <li key={i} className="flex gap-2">
                    <span className="block mt-1.5 w-1 h-1 bg-petrol-base/40 rounded-full shrink-0"></span>
                    {desc}
                </li>
            ))}
        </ul>
    </div>
);

export const ResumeContent: React.FC = () => {
    return (
        <div className="bg-paper text-petrol-base min-h-screen pb-24 border-t border-petrol-base/5">

            {/* --- HEADER --- */}
            <div className="relative w-full bg-[#0B232E] text-paper overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')]"></div>

                <div className="max-w-6xl mx-auto px-6 md:px-12 pt-20 pb-16 relative z-10">
                    <Reveal width="100%">
                        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">

                            {/* PHOTO - Consistent with Hero */}
                            <div className="shrink-0 relative group">
                                <div className="w-32 h-40 md:w-40 md:h-48 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-800 relative z-10 rotate-[-2deg] group-hover:rotate-0 transition-transform duration-500">
                                    <img
                                        src="/images/profile_main.jpg"
                                        alt="Victor Cardoso"
                                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <div className="absolute inset-0 border border-white/5 rounded-2xl rotate-3 translate-x-2 translate-y-2 z-0"></div>
                            </div>

                            <div className="flex-1 flex flex-col items-center md:items-start">
                                <h6 className="text-xs font-mono uppercase tracking-[0.2em] text-petrol-electric mb-4">Curriculum Vitae</h6>
                                <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6 tracking-tight">Victor Cardoso</h1>
                                <p className="text-white/60 max-w-xl leading-relaxed font-light mb-8">
                                    Engenharia de Software focada em precisão. Design focado em emoção.
                                    Construindo a ponte entre sistemas complexos e experiências intuitivas.
                                </p>

                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <a
                                        href="/assets/cv_victor_cardoso.pdf"
                                        download
                                    >
                                        <Button variant="outline" className="text-white border-white/20 hover:bg-white hover:text-petrol-base flex items-center gap-2 px-6">
                                            <Download size={14} /> Download PDF
                                        </Button>
                                    </a>
                                </div>
                            </div>

                            {/* Contact Grid Minimized */}
                            <div className="grid grid-cols-1 gap-4 text-right hidden lg:block">
                                <div className="space-y-1">
                                    <div className="text-[10px] uppercase tracking-widest text-white/40">Contato</div>
                                    <a href="mailto:victor@exemplo.com" className="block text-sm hover:text-petrol-electric transition-colors">victor@exemplo.com</a>
                                    <span className="block text-sm text-white/80">+55 11 99999-9999</span>
                                </div>
                                <div className="space-y-1 mt-4">
                                    <div className="text-[10px] uppercase tracking-widest text-white/40">Links</div>
                                    <div className="flex gap-4 justify-end">
                                        <a href="#" className="hover:text-petrol-electric transition-colors"><Github size={18} /></a>
                                        <a href="#" className="hover:text-petrol-electric transition-colors"><Globe size={18} /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                    {[
                        { label: "Anos de Exp.", value: "3+" },
                        { label: "Projetos", value: "15+" },
                        { label: "Stack", value: "Full" },
                        { label: "Local", value: "Brazil" }
                    ].map((stat, i) => (
                        <Reveal key={i} delay={i * 100}>
                            <div className="p-6 rounded-2xl bg-white border border-petrol-base/5 shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <div className="text-3xl font-serif font-bold text-petrol-base mb-1">{stat.value}</div>
                                <div className="text-[10px] uppercase tracking-widest text-petrol-base/40">{stat.label}</div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* --- COLUNA ESQUERDA (Sidebar-like) --- */}
                    <div className="lg:col-span-4 space-y-16">

                        {/* 1. Perfil */}
                        <section>
                            <Reveal>
                                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-petrol-base/40 mb-8 border-b border-petrol-base/10 pb-4">
                                    Perfil Profissional
                                </h4>
                            </Reveal>
                            <Reveal delay={100}>
                                <div className="text-petrol-ink leading-relaxed space-y-6 text-sm font-light text-justify">
                                    <p>
                                        Atualmente focado em Engenharia de Software, com vasta experiência em análise de sistemas e gestão de operações.
                                        Especialista em transformar processos manuais em sistemas digitais eficientes e escaláveis.
                                    </p>
                                </div>
                            </Reveal>
                        </section>

                        {/* 2. Skills Tech */}
                        <section>
                            <Reveal>
                                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-petrol-base/40 mb-8 border-b border-petrol-base/10 pb-4">
                                    Tech Stack
                                </h4>
                            </Reveal>
                            <div className="space-y-4">
                                {[
                                    { name: "React / Next.js", level: 8 },
                                    { name: "Node.js", level: 7 },
                                    { name: "TypeScript", level: 7 },
                                    { name: "Tailwind CSS", level: 8 },
                                    { name: "PostgreSQL", level: 6 },
                                    { name: "Docker", level: 5 },
                                    { name: "UI/UX Design", level: 7 },
                                ].map((skill, i) => (
                                    <Reveal key={i} delay={i * 50} width="100%">
                                        <div className="group">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs font-bold uppercase text-petrol-base group-hover:text-petrol-electric transition-colors">{skill.name}</span>
                                                <SkillDots level={skill.level} />
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </section>

                        {/* 3. Languages */}
                        <section>
                            <Reveal>
                                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-petrol-base/40 mb-8 border-b border-petrol-base/10 pb-4">
                                    Idiomas
                                </h4>
                            </Reveal>
                            <div className="flex justify-between gap-4">
                                <Reveal delay={100}><PieChart percent={100} label="Português" color="#0B232E" /></Reveal>
                                <Reveal delay={200}><PieChart percent={65} label="Inglês" color="#78909C" /></Reveal>
                            </div>
                        </section>

                    </div>

                    {/* --- COLUNA DIREITA (Timeline) --- */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* 1. Experiência Profissional */}
                        <section>
                            <Reveal>
                                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-petrol-base/40 mb-10 flex items-center gap-4">
                                    <span className="w-8 h-px bg-petrol-base/20"></span> Trajetória Profissional
                                </h4>
                            </Reveal>

                            <div className="space-y-2">
                                <Reveal delay={100}>
                                    <ProjectItem
                                        title="Wise System"
                                        role="Supervisor de Operações & Dev"
                                        date="Out 2025 — Presente"
                                        descriptions={[
                                            "Liderança técnica e operacional de equipes multidisciplinares, focando em KPIs de eficiência.",
                                            "Desenvolvimento e manutenção de ferramentas internas (React/Node) para automação de chamados.",
                                            "Implementação de esteiras CI/CD e monitoramento de sistemas críticos."
                                        ]}
                                    />
                                </Reveal>
                                <Reveal delay={200}>
                                    <ProjectItem
                                        title="Wise System"
                                        role="Analista de Suporte N2"
                                        date="Abr 2025 — Out 2025"
                                        descriptions={[
                                            "Onboarding técnico de grandes contas e treinamentos corporativos da plataforma.",
                                            "Documentação de API e criação de Knowledge Base para redução de tickets."
                                        ]}
                                    />
                                </Reveal>
                                <Reveal delay={300}>
                                    <ProjectItem
                                        title="InHouse Contact Center"
                                        role="Back Office & Análise de Dados"
                                        date="Fev 2022 — Jan 2024"
                                        descriptions={[
                                            "Otimização de fluxos operacionais reduzindo o tempo de resolução em 30%.",
                                            "Geração de relatórios gerenciais automatizados em Python/Excel."
                                        ]}
                                    />
                                </Reveal>
                            </div>
                        </section>

                        {/* 2. Projetos & Destaques */}
                        <section>
                            <Reveal>
                                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-petrol-base/40 mb-10 flex items-center gap-4">
                                    <span className="w-8 h-px bg-petrol-base/20"></span> Projetos em Foco
                                </h4>
                            </Reveal>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-xl bg-white border border-petrol-base/5 shadow-[0_5px_20px_-10px_rgba(11,35,46,0.1)] hover:-translate-y-1 transition-transform duration-300">
                                    <div className="mb-4 text-petrol-electric"><Share2 size={24} /></div>
                                    <h5 className="font-serif font-bold text-lg mb-2 text-petrol-base">Lumina Architecture</h5>
                                    <p className="text-xs text-petrol-base/60 font-mono mb-4 uppercase tracking-wider">SaaS • Next.js • AWS</p>
                                    <p className="text-sm text-petrol-ink font-light leading-relaxed mb-4">
                                        Plataforma para gestão de ativos digitais. Implementação completa do Front-end e integração com Stripe.
                                    </p>
                                    <a href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-petrol-base hover:text-petrol-electric transition-colors">
                                        Ver Case <LinkIcon size={12} />
                                    </a>
                                </div>
                                <div className="p-6 rounded-xl bg-[#0B232E] text-white hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-32 bg-petrol-electric/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                                    <div className="mb-4 text-white"><Book size={24} /></div>
                                    <h5 className="font-serif font-bold text-lg mb-2">Portfolio 2025</h5>
                                    <p className="text-xs text-white/60 font-mono mb-4 uppercase tracking-wider">React • Framer Motion</p>
                                    <p className="text-sm text-white/80 font-light leading-relaxed mb-4 relative z-10">
                                        Este projeto. Focado em performance, micro-interações e design system escalável.
                                    </p>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
};
