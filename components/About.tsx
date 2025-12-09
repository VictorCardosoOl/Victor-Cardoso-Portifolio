
import React from 'react';
import { Reveal } from './ui/Reveal';
import { Layers, Zap, Shield, Users, GitCommit } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

// Philosophy Grid
const PhilosophyGrid = () => {
  const principles = [
    {
      icon: Layers,
      title: "Visão de Negócio",
      desc: "Não entrego apenas código. Entrego soluções que resolvem dores reais e trazem retorno sobre o investimento."
    },
    {
      icon: Zap,
      title: "Performance First",
      desc: "Otimização crítica. Cada segundo a menos no carregamento do site aumenta sua taxa de conversão."
    },
    {
      icon: Shield,
      title: "Segurança e Estabilidade",
      desc: "Sistemas robustos que não caem. Arquitetura pensada para crescer junto com sua empresa."
    },
    {
      icon: Users,
      title: "Autonomia do Cliente",
      desc: "Desenvolvo painéis administrativos fáceis de usar. Você não fica refém do desenvolvedor para mudar um texto."
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {principles.map((p, i) => (
        <MotionDiv 
          key={i} 
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} 
          className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 hover:border-slate-200 transition-colors hover:bg-slate-50/80 hover:shadow-sm"
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-5 text-slate-900 border border-slate-100">
            <p.icon size={22} strokeWidth={1.5} />
          </div>
          <h4 className="text-lg font-serif font-bold text-slate-900 mb-3">{p.title}</h4>
          <p className="text-sm text-slate-600 leading-relaxed font-light">{p.desc}</p>
        </MotionDiv>
      ))}
    </div>
  );
}

// Simulated GitHub Activity Graph
const ActivityGraph = () => {
  const weeks = 20;
  const days = 7;
  
  return (
    <div className="mt-8 p-8 glass-panel rounded-[2rem] border border-slate-200/50 bg-white/40 shadow-sm hover:shadow-md transition-shadow duration-500">
      <div className="flex items-center gap-3 mb-6">
        <GitCommit size={18} className="text-slate-400" />
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Consistência de Entrega</span>
      </div>
      
      <div className="flex gap-1 justify-between opacity-80 mask-image-gradient overflow-x-auto pb-2 md:pb-0">
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} className="flex flex-col gap-1 min-w-[10px]">
            {Array.from({ length: days }).map((_, d) => {
              const intensity = Math.random();
              let bgClass = "bg-slate-100";
              if (intensity > 0.85) bgClass = "bg-slate-900";
              else if (intensity > 0.6) bgClass = "bg-slate-600";
              else if (intensity > 0.3) bgClass = "bg-slate-300";

              return (
                <div key={d} className={`w-2 h-2 md:w-3 md:h-3 rounded-sm ${bgClass}`} />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
         <span>Comprometimento diário</span>
      </div>
    </div>
  );
}

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-40 bg-white relative">
      <div className="container mx-auto px-6 md:px-12 xl:px-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          
          {/* Left Column: Text, Stats & GitHub */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <Reveal>
              <span className="inline-block px-3 py-1 bg-gray-100 text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-8 rounded-full">
                Parceiro Estratégico
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-medium mb-10 leading-tight text-slate-900 tracking-tight">
                Mais do que código. <br />
                Compromisso com o resultado.
              </h2>
            </Reveal>
            
            <Reveal delay={100}>
              <div className="space-y-8 text-gray-600 leading-relaxed text-lg md:text-xl mb-16 font-light">
                <p>
                  Meu objetivo é simples: eliminar a barreira técnica entre a sua ideia e o mercado. Atuo como um parceiro de tecnologia para empresas que buscam modernização e eficiência.
                </p>
                <p>
                  Combino a segurança da engenharia de software com a agilidade necessária para negócios digitais. Seja criando uma plataforma do zero ou otimizando um sistema existente, meu foco é sempre o impacto no seu faturamento e na experiência do seu cliente.
                </p>
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delay={200}>
               <div className="flex gap-12 md:gap-16 border-t border-gray-100 pt-10">
                   <div>
                      <span className="block text-4xl font-serif font-medium text-slate-900 mb-2">100%</span>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Prazos Cumpridos</span>
                   </div>
                   <div>
                      <span className="block text-4xl font-serif font-medium text-slate-900 mb-2">24/7</span>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Monitoramento</span>
                   </div>
                </div>
            </Reveal>

            <Reveal delay={300}>
               <ActivityGraph />
            </Reveal>
          </div>

          {/* Right Column: Philosophy Grid */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <Reveal delay={150} width="100%">
              <div className="bg-white p-8 md:p-12 border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/50 sticky top-32">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
                  <div>
                     <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                      Mindset
                     </h3>
                     <span className="text-3xl font-serif font-medium text-slate-900">Como agrego valor</span>
                  </div>
                </div>
                
                <PhilosophyGrid />
                
                <div className="mt-10 pt-8 border-t border-gray-100">
                   <p className="text-sm text-gray-400 italic text-center">
                      "Tecnologia deve ser um acelerador de negócios, não um custo."
                   </p>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
