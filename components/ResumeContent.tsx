import React from 'react';
import { motion } from 'framer-motion';
import {
    MapPin, Mail, Phone, Github, Globe, Linkedin,
    Briefcase, GraduationCap, Award, Code, User, Download, ExternalLink
} from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Button from './ui/Button';
import { WORK_EXPERIENCE, EDUCATION, SKILLS, CONTACT_INFO } from '../constants';

const SidebarItem = ({ icon: Icon, label, value, link }: any) => (
    <div className="flex items-start gap-3 mb-4 last:mb-0 group">
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-petrol-electric shrink-0 group-hover:bg-white/10 transition-colors">
            <Icon size={14} />
        </div>
        <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-white/40 mb-0.5">{label}</span>
            {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm font-light text-white/90 hover:text-petrol-electric transition-colors break-all">
                    {value}
                </a>
            ) : (
                <span className="text-sm font-light text-white/90">{value}</span>
            )}
        </div>
    </div>
);

const TimelineItem = ({ role, company, period, description, location }: any) => (
    <div className="relative pl-8 pb-12 last:pb-0 group">
        {/* Timeline Line */}
        <div className="absolute left-[7px] top-2 bottom-0 w-px bg-petrol-base/10 group-last:hidden"></div>
        {/* Timeline Dot */}
        <div className="absolute left-0 top-2 w-3.5 h-3.5 rounded-full border-2 border-petrol-base bg-paper group-hover:bg-petrol-base transition-colors"></div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
            <h4 className="text-xl font-serif font-bold text-petrol-base">{role}</h4>
            <span className="font-mono text-xs text-petrol-base/60 bg-petrol-base/5 px-2 py-1 rounded">{period}</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-bold uppercase tracking-wide text-petrol-mid">{company}</span>
            <span className="text-xs text-petrol-base/40">•</span>
            <span className="text-xs text-petrol-base/40">{location}</span>
        </div>

        <ul className="space-y-2">
            {description.map((item: string, i: number) => (
                <li key={i} className="text-sm text-petrol-ink/80 font-light leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-petrol-base/40"></span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

export const ResumeContent: React.FC = () => {
    return (
        <div className="bg-[#E5E5E5] py-12 md:py-24 min-h-screen">
            <div className="max-w-[1100px] mx-auto bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[1200px]">

                {/* --- LEFT SIDEBAR (DARK) --- */}
                <div className="w-full md:w-[320px] lg:w-[360px] bg-[#0B232E] text-white p-8 md:p-12 flex flex-col shrink-0 relative overflow-hidden">
                    {/* Background Texture */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                    {/* Profile Section */}
                    <div className="relative z-10 mb-12 text-center md:text-left">
                        <div className="w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0 rounded-2xl overflow-hidden border-4 border-white/5 mb-6 shadow-xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                            <img
                                src="/images/profile_main.jpg"
                                alt="Profile"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                        <h2 className="text-2xl font-serif font-bold mb-2">Victor Cardoso</h2>
                        <p className="text-sm font-mono text-petrol-electric tracking-widest uppercase mb-6">Software Engineer</p>

                        <a href="/assets/cv_victor_cardoso.pdf" download className="inline-block w-full">
                            <Button variant="outline" className="w-full justify-center border-white/20 text-white hover:bg-white hover:text-petrol-base text-xs h-10">
                                <Download size={14} className="mr-2" /> Download PDF
                            </Button>
                        </a>
                    </div>

                    {/* Info Block */}
                    <div className="relative z-10 space-y-10">
                        {/* Contact */}
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-6 border-b border-white/10 pb-2">Contato</h3>
                            <SidebarItem icon={Mail} label="Email" value={CONTACT_INFO.email} />
                            <SidebarItem icon={Phone} label="Telefone" value={CONTACT_INFO.phone} />
                            <SidebarItem icon={MapPin} label="Localização" value={CONTACT_INFO.location} />
                        </section>

                        {/* Socials */}
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-6 border-b border-white/10 pb-2">Redes</h3>
                            <SidebarItem icon={Linkedin} label="LinkedIn" value="linkedin.com/in/victorccunha" link={CONTACT_INFO.socials[0].url} />
                            <SidebarItem icon={Github} label="GitHub" value="github.com/victorccunha" link={CONTACT_INFO.socials[1].url} />
                            <SidebarItem icon={Globe} label="Website" value="victorcardoso.com" link="#" />
                        </section>

                        {/* Education */}
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-6 border-b border-white/10 pb-2">Formação</h3>
                            {EDUCATION.map((edu, i) => (
                                <div key={i} className="mb-4 last:mb-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <GraduationCap size={14} className="text-petrol-electric" />
                                        <span className="font-bold text-sm text-white/90">{edu.degree}</span>
                                    </div>
                                    <p className="text-xs text-white/60 mb-1">{edu.institution}</p>
                                    <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-white/40">{edu.period}</span>
                                </div>
                            ))}
                        </section>

                        {/* Top Skills (Bars) */}
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-6 border-b border-white/10 pb-2">Principais Skills</h3>
                            <div className="space-y-4">
                                {SKILLS[0].items.slice(0, 5).map((skill, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-white/80">{skill}</span>
                                        </div>
                                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${85 + (i * 2)}%` }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="h-full bg-petrol-electric"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* --- RIGHT CONTENT (LIGHT) --- */}
                <div className="flex-1 bg-white p-8 md:p-16 relative">
                    {/* Header Watermark */}
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                        <Code size={200} />
                    </div>

                    <div className="max-w-3xl relative z-10">

                        {/* Summary */}
                        <section className="mb-16">
                            <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-petrol-base/40 mb-8">
                                <User size={16} /> Sobre Mim
                            </h3>
                            <p className="text-lg text-petrol-ink font-light leading-relaxed text-justify">
                                Profissional focado em Engenharia de Software e Gestão Técnica, com experiência comprovada em liderar equipes multidisciplinares e otimizar processos complexos. Combino visão estratégica de negócios com execução técnica precisa, garantindo que cada linha de código entregue valor real. Apaixonado por interfaces limpas, arquitetura escalável e compartilhamento de conhecimento.
                            </p>
                        </section>

                        <hr className="border-petrol-base/5 mb-16" />

                        {/* Work Experience */}
                        <section className="mb-16">
                            <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-petrol-base/40 mb-10">
                                <Briefcase size={16} /> Experiência Profissional
                            </h3>
                            <div className="space-y-2">
                                {WORK_EXPERIENCE.map((job, i) => (
                                    <Reveal key={i} delay={i * 100}>
                                        <TimelineItem {...job} />
                                    </Reveal>
                                ))}
                            </div>
                        </section>

                        <hr className="border-petrol-base/5 mb-16" />

                        {/* Side Projects / Open Source */}
                        <section>
                            <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-petrol-base/40 mb-10">
                                <Award size={16} /> Projetos & Open Source
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-lg bg-paper border border-petrol-base/5 hover:border-petrol-base/20 transition-colors group">
                                    <div className="flex justify-between items-start mb-4">
                                        <Code size={20} className="text-petrol-mid" />
                                        <ExternalLink size={14} className="text-petrol-base/30 group-hover:text-petrol-base transition-colors" />
                                    </div>
                                    <h4 className="font-serif font-bold text-petrol-base mb-2">Lumina Cloud</h4>
                                    <p className="text-xs text-petrol-ink/70 leading-relaxed mb-4">Arquitetura de alta performance para renderização distribuída. Redução de 75% no tempo de processamento.</p>
                                    <div className="flex gap-2">
                                        <span className="text-[9px] font-mono bg-white border border-petrol-base/10 px-1.5 py-0.5 rounded text-petrol-base/60">Next.js</span>
                                        <span className="text-[9px] font-mono bg-white border border-petrol-base/10 px-1.5 py-0.5 rounded text-petrol-base/60">AWS</span>
                                    </div>
                                </div>

                                <div className="p-6 rounded-lg bg-paper border border-petrol-base/5 hover:border-petrol-base/20 transition-colors group">
                                    <div className="flex justify-between items-start mb-4">
                                        <Github size={20} className="text-petrol-mid" />
                                        <ExternalLink size={14} className="text-petrol-base/30 group-hover:text-petrol-base transition-colors" />
                                    </div>
                                    <h4 className="font-serif font-bold text-petrol-base mb-2">EFResume Port</h4>
                                    <p className="text-xs text-petrol-ink/70 leading-relaxed mb-4">Adaptação moderna do template EFResume para React/Tailwind, focado em desenvolvedores brasileiros.</p>
                                    <div className="flex gap-2">
                                        <span className="text-[9px] font-mono bg-white border border-petrol-base/10 px-1.5 py-0.5 rounded text-petrol-base/60">React</span>
                                        <span className="text-[9px] font-mono bg-white border border-petrol-base/10 px-1.5 py-0.5 rounded text-petrol-base/60">Tailwind</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>

            </div>
        </div>
    );
};
