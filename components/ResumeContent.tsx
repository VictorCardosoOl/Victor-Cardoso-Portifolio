import React from 'react';
import { motion } from 'framer-motion';
import {
    Download, MapPin, Mail, Phone, Github, Twitter,
    ThumbsUp, Star, User, Book, Link as LinkIcon,
    Flag, Lightbulb, Share2, Globe, MessageCircle
} from 'lucide-react';
import { Reveal } from './ui/Reveal';

// --- Componentes Auxiliares de UI (Locais) ---

// 1. Gráfico de Pizza Simples (SVG)
const PieChart = ({ percent, label, color }: { percent: number; label: string; color: string }) => {
    const circumference = 2 * Math.PI * 40; // r=40
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="50%" cy="50%" r="40" stroke="#eee" strokeWidth="8" fill="transparent" />
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
                    <span className="text-xl font-bold text-slate-700">{percent}%</span>
                </div>
            </div>
            <span className="mt-2 font-mono text-xs uppercase tracking-widest text-slate-500">{label}</span>
        </div>
    );
};

// 2. Pontos de Habilidade (Dots)
const SkillDots = ({ level }: { level: number }) => (
    <div className="flex gap-1">
        {[...Array(8)].map((_, i) => (
            <div
                key={i}
                className={`w-2 h-2 rounded-full ${i < level ? 'bg-slate-800' : 'bg-slate-200'}`}
            />
        ))}
    </div>
);

// 3. Item de Projeto (Timeline)
const ProjectItem = ({ title, role, date, descriptions }: any) => (
    <div className="mb-8 border-l-2 border-slate-200 pl-6 relative">
        <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-800 rounded-full border-4 border-white"></div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
            <h4 className="text-lg font-serif font-bold text-slate-800">{title}</h4>
            <span className="text-xs font-mono text-slate-400">{date}</span>
        </div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">{role}</p>
        <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-slate-600 font-light leading-relaxed">
            {descriptions.map((desc: string, i: number) => (
                <li key={i}>{desc}</li>
            ))}
        </ul>
    </div>
);

export const ResumeContent: React.FC = () => {
    return (
        <div className="bg-white text-slate-800 min-h-screen pb-24">

            {/* --- HEADER (Visual Cinematic com Imagem de Fundo) --- */}
            <div className="relative w-full h-[40vh] md:h-[50vh] bg-[#0B232E] overflow-hidden flex flex-col justify-end">

                {/* Imagem de Fundo Parallax-like */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/profile_main.jpg"
                        alt="Victor Cardoso Profile"
                        className="w-full h-full object-cover opacity-60 md:opacity-80 object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B232E] via-[#0B232E]/40 to-transparent"></div>
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pb-12 md:pb-20">
                    <Reveal>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
                            {/* Nome e Cargo */}
                            <div className="text-white">
                                <h1 className="text-5xl md:text-8xl font-serif font-bold mb-4 tracking-tight">Victor Cardoso</h1>
                                <h6 className="text-sm font-mono uppercase tracking-[0.2em] text-white/70">Engenharia de Software & Design</h6>
                            </div>

                            {/* Botão Download */}
                            <motion.a
                                href="/assets/cv_victor_cardoso.pdf"
                                download
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0B232E] bg-white px-8 py-4 rounded-full hover:bg-white/90 transition-colors shadow-lg"
                            >
                                <Download size={14} /> Download PDF
                            </motion.a>
                        </div>
                    </Reveal>

                    {/* Grid de Informações (Sobrepondo a imagem/gradiente) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/20 text-white/90">
                        <Reveal delay={100}>
                            <div className="flex gap-4">
                                <div className="text-xs font-bold uppercase text-white/40 w-20 shrink-0">Info</div>
                                <ul className="text-sm space-y-1 font-light">
                                    <li>Idade: 24</li>
                                    <li>Cidade: São Paulo, SP</li>
                                    <li>Status: <span className="text-green-400">Disponível</span></li>
                                </ul>
                            </div>
                        </Reveal>
                        <Reveal delay={200}>
                            <div className="flex gap-4">
                                <div className="text-xs font-bold uppercase text-white/40 w-20 shrink-0">Contato</div>
                                <ul className="text-sm space-y-1 font-light">
                                    <li className="flex items-center gap-2 hover:text-white transition-colors"><Mail size={12} /> victor@exemplo.com</li>
                                    <li className="flex items-center gap-2 hover:text-white transition-colors"><Phone size={12} /> (11) 99999-9999</li>
                                </ul>
                            </div>
                        </Reveal>
                        <Reveal delay={300}>
                            <div className="flex gap-4">
                                <div className="text-xs font-bold uppercase text-white/40 w-20 shrink-0">Social</div>
                                <ul className="text-sm space-y-1 font-light">
                                    <li><a href="#" className="hover:text-blue-400 flex items-center gap-2 transition-colors"><Github size={12} /> GitHub</a></li>
                                    <li><a href="#" className="hover:text-blue-300 flex items-center gap-2 transition-colors"><Globe size={12} /> Portfolio</a></li>
                                </ul>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT (Adaptação das colunas do EFResume) --- */}
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* --- COLUNA ESQUERDA --- */}
                    <div className="space-y-16">

                        {/* 1. Perfil */}
                        <section>
                            <Reveal>
                                <h4 className="flex items-center gap-3 text-lg font-serif font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">
                                    <User className="text-slate-400" /> Perfil Profissional
                                </h4>
                            </Reveal>
                            <Reveal delay={100}>
                                <div className="text-slate-600 leading-relaxed space-y-4 text-sm font-light text-justify">
                                    <p>
                                        Atualmente focado em Engenharia de Software, com vasta experiência em análise de sistemas e gestão de operações.
                                        Especialista em transformar processos manuais em sistemas digitais eficientes.
                                    </p>
                                    <p>
                                        Domínio de React, Node.js e ecossistemas Cloud. Apaixonado por código limpo, arquitetura escalável e
                                        interfaces que encantam o usuário.
                                    </p>
                                </div>
                            </Reveal>
                        </section>

                        {/* 2. Gráficos de Pizza (Skills Principais) */}
                        <section>
                            <Reveal>
                                <h4 className="flex items-center gap-3 text-lg font-serif font-bold text-slate-900 mb-8 border-b border-slate-100 pb-2">
                                    <ThumbsUp className="text-slate-400" /> Top Skills
                                </h4>
                            </Reveal>
                            <div className="flex justify-around items-center">
                                <Reveal delay={100}><PieChart percent={95} label="React/Next" color="#0B232E" /></Reveal>
                                <Reveal delay={200}><PieChart percent={85} label="Node.js" color="#78909C" /></Reveal>
                                <Reveal delay={300}><PieChart percent={80} label="SQL" color="#153A48" /></Reveal>
                            </div>
                        </section>

                        {/* 3. Avaliação de Habilidades (Dots) */}
                        <section>
                            <Reveal>
                                <h4 className="flex items-center gap-3 text-lg font-serif font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">
                                    <Star className="text-slate-400" /> Competências Técnicas
                                </h4>
                            </Reveal>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-3">
                                {[
                                    { name: "TypeScript", level: 7 },
                                    { name: "Tailwind CSS", level: 8 },
                                    { name: "PostgreSQL", level: 6 },
                                    { name: "Docker / DevOps", level: 5 },
                                    { name: "Figma / UI Design", level: 7 },
                                    { name: "Git Flow", level: 8 },
                                ].map((skill, i) => (
                                    <Reveal key={i} delay={i * 50} width="100%">
                                        <div className="flex justify-between items-center group hover:bg-slate-50 p-1 rounded transition-colors">
                                            <span className="text-xs font-bold uppercase text-slate-600">{skill.name}</span>
                                            <SkillDots level={skill.level} />
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </section>

                        {/* 4. Github / Comunidade */}
                        <section>
                            <Reveal>
                                <h4 className="flex items-center gap-3 text-lg font-serif font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">
                                    <Github className="text-slate-400" /> Open Source
                                </h4>
                            </Reveal>
                            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 text-center">
                                <img
                                    src="https://ghchart.rshah.org/0B232E/victorcardosool"
                                    alt="Github Chart"
                                    className="w-full opacity-80 hover:opacity-100 transition-opacity"
                                />
                                <p className="text-xs text-slate-400 mt-4 font-mono">Contribuições no último ano</p>
                            </div>
                        </section>

                    </div>

                    {/* --- COLUNA DIREITA --- */}
                    <div className="space-y-16">

                        {/* 1. Experiência Stats */}
                        <section>
                            <Reveal>
                                <h4 className="flex items-center gap-3 text-lg font-serif font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">
                                    <Lightbulb className="text-slate-400" /> Resumo
                                </h4>
                            </Reveal>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-slate-900 text-white p-6 rounded-lg">
                                    <span className="text-4xl font-bold block mb-2">3+</span>
                                    <span className="text-xs uppercase tracking-widest opacity-70">Anos de Experiência</span>
                                </div>
                                <div className="bg-slate-100 text-slate-800 p-6 rounded-lg border border-slate-200">
                                    <span className="text-4xl font-bold block mb-2">15+</span>
                                    <span className="text-xs uppercase tracking-widest opacity-70">Projetos Entregues</span>
                                </div>
                            </div>
                        </section>

                        {/* 2. Experiência Profissional (Timeline) */}
                        <section>
                            <Reveal>
                                <h4 className="flex items-center gap-3 text-lg font-serif font-bold text-slate-900 mb-8 border-b border-slate-100 pb-2">
                                    <Flag className="text-slate-400" /> Trajetória
                                </h4>
                            </Reveal>

                            <div className="space-y-2">
                                <Reveal delay={100}>
                                    <ProjectItem
                                        title="Wise System"
                                        role="Supervisor de Operações & Dev"
                                        date="Out 2025 — Presente"
                                        descriptions={[
                                            "Liderança de equipes multidisciplinares e gestão de KPIs.",
                                            "Desenvolvimento de ferramentas internas para automação de suporte.",
                                            "Implementação de cultura DevOps e monitoramento de sistemas."
                                        ]}
                                    />
                                </Reveal>
                                <Reveal delay={200}>
                                    <ProjectItem
                                        title="Wise System"
                                        role="Analista de Suporte N2"
                                        date="Abr 2025 — Out 2025"
                                        descriptions={[
                                            "Treinamento corporativo e onboarding de novos clientes.",
                                            "Gestão de crises e documentação técnica (Knowledge Base)."
                                        ]}
                                    />
                                </Reveal>
                                <Reveal delay={300}>
                                    <ProjectItem
                                        title="InHouse Contact Center"
                                        role="Back Office"
                                        date="Fev 2022 — Jan 2024"
                                        descriptions={[
                                            "Gestão administrativa e otimização de fluxos operacionais.",
                                            "Análise de dados para relatórios gerenciais."
                                        ]}
                                    />
                                </Reveal>
                            </div>
                        </section>

                        {/* 3. Projetos de Destaque */}
                        <section>
                            <Reveal>
                                <h4 className="flex items-center gap-3 text-lg font-serif font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">
                                    <Book className="text-slate-400" /> Projetos Recentes
                                </h4>
                            </Reveal>
                            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 flex gap-4 items-start">
                                <div className="bg-white p-3 rounded shadow-sm">
                                    <Share2 size={24} className="text-slate-800" />
                                </div>
                                <div>
                                    <h5 className="font-bold text-slate-900">Lumina Architecture</h5>
                                    <p className="text-xs text-slate-500 mb-2">SaaS / Plataforma Web</p>
                                    <p className="text-sm text-slate-600 mb-3">
                                        Sistema de gestão de ativos digitais para arquitetos. Next.js 14, AWS S3 e Stripe.
                                    </p>
                                    <a href="#" className="text-xs font-bold uppercase text-blue-600 hover:underline flex items-center gap-1">
                                        Ver Case <LinkIcon size={10} />
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* 4. Interesses / Extra */}
                        <section>
                            <Reveal>
                                <h4 className="flex items-center gap-3 text-lg font-serif font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">
                                    <LinkIcon className="text-slate-400" /> Interesses
                                </h4>
                            </Reveal>
                            <div className="grid grid-cols-4 gap-4 text-center">
                                {['AI/LLM', 'Design', 'Finanças', 'Games'].map((item, i) => (
                                    <div key={i} className="bg-white border border-slate-100 p-4 rounded-lg shadow-sm hover:-translate-y-1 transition-transform">
                                        <span className="block text-xs font-bold uppercase text-slate-600">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>
                </div>
            </div>

            {/* --- FOOTER --- */}
            <div className="bg-slate-50 py-8 text-center border-t border-slate-200">
                <p className="text-xs text-slate-400 font-mono">
                    © {new Date().getFullYear()} Victor Cardoso. Inspirado no EFResume.
                </p>
            </div>

        </div>
    );
};
