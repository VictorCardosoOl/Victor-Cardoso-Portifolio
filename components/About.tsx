import React from 'react';

// Simulate GitHub Contribution Graph
const ContributionGraph = () => {
  const weeks = 40; // Reduced for cleaner mobile look
  const days = 7;
  const levels = ['bg-gray-100', 'bg-gray-300', 'bg-gray-400', 'bg-offblack'];
  
  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-1.5 justify-center lg:justify-start opacity-80 hover:opacity-100 transition-opacity duration-500">
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} className="flex flex-col gap-1.5">
            {Array.from({ length: days }).map((_, d) => {
               const rand = Math.random();
               let level = 0;
               if (d > 0 && d < 6) { 
                 if (rand > 0.6) level = 1;
                 if (rand > 0.8) level = 2;
                 if (rand > 0.95) level = 3;
               } else {
                 if (rand > 0.9) level = 1;
               }
               
               return (
                 <div 
                   key={d} 
                   className={`w-2.5 h-2.5 rounded-full ${levels[level]} transition-colors duration-500`}
                 ></div>
               )
            })}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4 text-[10px] text-gray-400 uppercase tracking-widest px-1 font-bold">
        <span>Menos</span>
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-100"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-offblack"></div>
        </div>
        <span>Mais</span>
      </div>
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
            <span className="inline-block px-3 py-1 bg-gray-100 text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-6 rounded-full">
              O Desenvolvedor
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-medium mb-8 leading-tight text-offblack">
              Obsessão por qualidade. <br />
              Paixão por entrega.
            </h2>
            
            <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg mb-12 font-light">
              <p>
                Não sou apenas um executor de tarefas. Sou um parceiro estratégico que entende como uma linha de código impacta a receita da sua empresa. Minha abordagem combina rigor técnico de engenharia com a sensibilidade estética de um designer.
              </p>
              <p>
                Acredito na transparência radical e no aprendizado contínuo. Meu objetivo é eliminar a dívida técnica antes que ela nasça e construir sistemas que escalem junto com o seu sucesso.
              </p>
            </div>

            {/* Stats */}
             <div className="flex gap-12 border-t border-gray-100 pt-8">
                 <div>
                    <span className="block text-3xl font-serif font-medium text-offblack mb-1">5+</span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Anos Exp.</span>
                 </div>
                 <div>
                    <span className="block text-3xl font-serif font-medium text-offblack mb-1">40+</span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Projetos</span>
                 </div>
                 <div>
                    <span className="block text-3xl font-serif font-medium text-offblack mb-1">100%</span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Entregas</span>
                 </div>
              </div>
          </div>

          {/* Github Graph / Visual */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="bg-gray-50 p-8 md:p-10 border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
                <div>
                   <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                    Atividade de Código
                   </h3>
                   <span className="text-xl font-serif text-offblack">Histórico de Contribuição</span>
                </div>
                <div className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-bold uppercase tracking-wider text-green-600 shadow-sm">
                   Em Tempo Real
                </div>
              </div>
              
              <ContributionGraph />
              
              <div className="mt-8 pt-6 border-t border-gray-200/50">
                 <p className="text-sm text-gray-500 italic">
                    "Código consistente é o segredo para produtos digitais duradouros."
                 </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;