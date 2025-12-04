import React from 'react';

// Simulate GitHub Contribution Graph
const ContributionGraph = () => {
  // Generate fake data for visual representation
  const weeks = 52;
  const days = 7;
  const levels = ['bg-gray-100', 'bg-gray-300', 'bg-gray-500', 'bg-black'];
  
  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-1 justify-center lg:justify-start opacity-70 hover:opacity-100 transition-opacity duration-500">
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} className="flex flex-col gap-1">
            {Array.from({ length: days }).map((_, d) => {
               // Randomize slightly to look organic, but denser on weekdays
               const rand = Math.random();
               let level = 0;
               if (d > 0 && d < 6) { // Weekdays more active
                 if (rand > 0.7) level = 1;
                 if (rand > 0.85) level = 2;
                 if (rand > 0.95) level = 3;
               } else {
                 if (rand > 0.9) level = 1;
               }
               
               return (
                 <div 
                   key={d} 
                   className={`w-2 h-2 md:w-3 md:h-3 rounded-[1px] ${levels[level]}`}
                 ></div>
               )
            })}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-3 text-[10px] text-gray-400 uppercase tracking-widest px-1">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gray-100"></div>
          <div className="w-2 h-2 bg-gray-300"></div>
          <div className="w-2 h-2 bg-gray-500"></div>
          <div className="w-2 h-2 bg-black"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
}

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden group">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
              <img 
                src="https://picsum.photos/800/1000?grayscale" 
                alt="Retrato profissional" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 z-20 border-l-4 border-black">
                <p className="font-serif text-lg italic text-gray-800">
                  "Código é poesia escrita para máquinas, mas lida por humanos."
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-6">
              O Desenvolvedor
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-8 leading-tight">
              Obsessão por qualidade. <br />
              Paixão por entrega.
            </h2>
            
            <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg mb-10">
              <p>
                Não sou apenas um executor de tarefas. Sou um parceiro estratégico que entende como uma linha de código impacta a receita da sua empresa. Minha abordagem combina rigor técnico de engenharia com a sensibilidade estética de um designer.
              </p>
              <p>
                Acredito na transparência radical e no aprendizado contínuo. Meu objetivo é eliminar a dívida técnica antes que ela nasça e construir sistemas que escalem junto com o seu sucesso.
              </p>
            </div>

            {/* GitHub Style Activity Graph */}
            <div className="bg-gray-50 p-6 border border-gray-100 rounded-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Atividade de Código (Último Ano)
                </h3>
                <span className="text-xs text-gray-400 font-mono">2,490 contribuições</span>
              </div>
              <ContributionGraph />
              <div className="mt-4 pt-4 border-t border-gray-200 flex gap-8">
                 <div>
                    <span className="block text-xl font-serif font-bold">5+</span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500">Anos Exp.</span>
                 </div>
                 <div>
                    <span className="block text-xl font-serif font-bold">40+</span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500">Projetos</span>
                 </div>
                 <div>
                    <span className="block text-xl font-serif font-bold">1.2k+</span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500">Coffee.js</span>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;