import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden">
              <img 
                src="https://picsum.photos/800/1000?grayscale" 
                alt="Retrato profissional em preto e branco" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-6">
              Quem Sou Eu
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-8 leading-tight">
              Desenvolvedor apaixonado por <br />
              minimalismo e eficiência.
            </h2>
            
            <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg">
              <p>
                Olá, sou um desenvolvedor Fullstack com uma visão orientada ao design. Minha jornada começou com a curiosidade de entender como as coisas funcionam, evoluindo para uma carreira dedicada a construir o que há de melhor na web.
              </p>
              <p>
                Acredito que um bom código é como uma boa prosa: deve ser conciso, claro e eficaz. Meu objetivo não é apenas entregar software funcional, mas criar experiências digitais que transmitam confiança e sofisticação para o seu público.
              </p>
              <p>
                Trabalho com clientes que valorizam a qualidade acima da quantidade, buscando parceiros técnicos que entendam não apenas de código, mas de estratégia de negócios.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
               <div className="flex justify-between items-center">
                  <div>
                    <span className="block text-3xl font-serif font-bold">5+</span>
                    <span className="text-xs uppercase tracking-wider text-gray-500">Anos de Experiência</span>
                  </div>
                  <div>
                    <span className="block text-3xl font-serif font-bold">40+</span>
                    <span className="text-xs uppercase tracking-wider text-gray-500">Projetos Entregues</span>
                  </div>
                  <div>
                    <span className="block text-3xl font-serif font-bold">100%</span>
                    <span className="text-xs uppercase tracking-wider text-gray-500">Satisfação</span>
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