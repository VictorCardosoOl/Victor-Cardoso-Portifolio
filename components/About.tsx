import React from 'react';
import { Reveal } from './ui/Reveal';
import { Layers, Zap, Shield, Users } from 'lucide-react';

// Philosophy Grid instead of fake github graph
const PhilosophyGrid = () => {
  const principles = [
    {
      icon: Layers,
      title: "Arquitetura Escalável",
      desc: "Código desacoplado e modular. Penso em como o sistema vai se comportar daqui a 2 anos, não apenas hoje."
    },
    {
      icon: Zap,
      title: "Performance First",
      desc: "Otimização crítica de renderização e carregamento. Cada milissegundo conta para a conversão do usuário."
    },
    {
      icon: Shield,
      title: "Robustez & Tipagem",
      desc: "TypeScript rigoroso e testes automatizados. Erros devem ser pegos em build-time, não em produção."
    },
    {
      icon: Users,
      title: "Empatia pelo Usuário",
      desc: "Acessibilidade (a11y) não é opcional. Crio interfaces inclusivas e navegáveis por todos."
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {principles.map((p, i) => (
        <div key={i} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 hover:border-slate-200 transition-colors">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-slate-900">
            <p.icon size={18} strokeWidth={1.5} />
          </div>
          <h4 className="text-sm font-serif font-bold text-slate-900 mb-2">{p.title}</h4>
          <p className="text-xs text-slate-500 leading-relaxed font-light">{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <Reveal>
              <span className="inline-block px-3 py-1 bg-gray-100 text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-6 rounded-full">
                O Desenvolvedor
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-medium mb-8 leading-tight text-slate-900 tracking-tight">
                Obsessão por qualidade. <br />
                Paixão por entrega.
              </h2>
            </Reveal>
            
            <Reveal delay={100}>
              <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg mb-12 font-light">
                <p>
                  Não sou apenas um executor de tarefas. Sou um parceiro estratégico que entende como uma linha de código impacta a receita da sua empresa. Minha abordagem combina rigor técnico de engenharia com a sensibilidade estética de um designer.
                </p>
                <p>
                  Acredito na transparência radical e no aprendizado contínuo. Meu objetivo é eliminar a dívida técnica antes que ela nasça e construir sistemas que escalem junto com o seu sucesso.
                </p>
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delay={200}>
               <div className="flex gap-12 border-t border-gray-100 pt-8">
                   <div>
                      <span className="block text-3xl font-serif font-medium text-slate-900 mb-1">5+</span>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Anos Exp.</span>
                   </div>
                   <div>
                      <span className="block text-3xl font-serif font-medium text-slate-900 mb-1">40+</span>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Projetos</span>
                   </div>
                   <div>
                      <span className="block text-3xl font-serif font-medium text-slate-900 mb-1">100%</span>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Entregas</span>
                   </div>
                </div>
            </Reveal>
          </div>

          {/* Philosophy Grid (Replaced Fake Graph) */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <Reveal delay={150} width="100%">
              <div className="bg-white p-8 md:p-10 border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/50">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
                  <div>
                     <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                      Mindset
                     </h3>
                     <span className="text-xl font-serif text-slate-900">Filosofia de Engenharia</span>
                  </div>
                </div>
                
                <PhilosophyGrid />
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                   <p className="text-sm text-gray-400 italic text-center">
                      "Código consistente é o segredo para produtos digitais duradouros."
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