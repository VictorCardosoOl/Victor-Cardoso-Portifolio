import React, { useState } from 'react';
import { SERVICES } from '../constants';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { usePageTransition } from './ui/PageTransition';
import ContentModal from './ui/ContentModal';

const Services: React.FC = () => {
  const { transitionTo } = usePageTransition();
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);

  return (
    <section id="services" className="py-24 md:py-32 min-h-screen bg-paper text-petrol-base relative z-10 overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-petrol-base/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 md:mb-24 pb-6 border-b border-petrol-base/10">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-serif font-medium text-petrol-base tracking-tighter leading-[0.9]">
              Soluções <br /> <span className="opacity-40">Digitais</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-sm md:text-base font-light text-petrol-ink max-w-md mt-6 md:mt-0 text-right">
              Estratégias personalizadas para elevar sua presença online.
              Do design à implementação técnica.
            </p>
          </Reveal>
        </div>

        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon; // Assuming Icon is a component in constants
            return (
              <Reveal key={index} width="100%" delay={index * 100}>
                <div
                  className="group relative bg-white border border-petrol-base/5 p-8 md:p-10 rounded-2xl cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between"
                  onClick={() => setSelectedService(service)}
                >
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-12 rounded-xl bg-petrol-base/5 flex items-center justify-center text-petrol-base group-hover:bg-petrol-base group-hover:text-white transition-colors duration-300">
                        {service.icon && <service.icon size={24} />}
                        {!service.icon && <span className="font-bold text-lg">{index + 1}</span>}
                      </div>
                      <div className="w-8 h-8 rounded-full border border-petrol-base/10 flex items-center justify-center text-petrol-base/30 group-hover:border-petrol-base group-hover:text-petrol-base transition-colors">
                        <ArrowRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-serif font-medium text-petrol-base mb-4 group-hover:text-petrol-electric transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-petrol-ink/70 font-light leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div>
                    <div className="w-full h-px bg-petrol-base/5 mb-6 group-hover:bg-petrol-base/10 transition-colors"></div>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] uppercase tracking-wider font-bold text-petrol-base/40">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-24 text-center">
          <Reveal variant="scale">
            <p className="text-petrol-base/60 font-light mb-6">Não encontrou o que procura?</p>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); transitionTo('#contact'); }}
              className="inline-flex items-center gap-3 px-8 py-3 bg-petrol-base text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-petrol-electric transition-colors shadow-lg hover:shadow-xl hover:scale-105 transform duration-300"
            >
              Fale Conosco <ArrowRight size={12} />
            </a>
          </Reveal>
        </div>

        {/* --- DETAILED MODAL --- */}
        <ContentModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService?.title}
          category="Serviço"
        >
          {selectedService && (
            <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">

              {/* Header Modal */}
              <div className="mb-16 border-b border-petrol-base/10 pb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-petrol-base/5 rounded-lg text-petrol-base">
                    {selectedService.icon && <selectedService.icon size={24} />}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-petrol-base/40">Serviço Especializado</span>
                </div>
                <h3 className="text-4xl md:text-6xl font-serif font-medium text-petrol-base mb-8 leading-tight">
                  {selectedService.title}
                </h3>
                <p className="text-xl md:text-2xl text-petrol-ink font-light leading-relaxed">
                  {selectedService.description}
                </p>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

                {/* Left Col: Value & Analogy */}
                <div className="space-y-12">
                  <div className="bg-petrol-base/3 p-8 rounded-2xl border border-petrol-base/5">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-petrol-electric mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-petrol-electric"></span>
                      O Benefício Real
                    </h4>
                    <p className="text-petrol-base text-lg font-light leading-relaxed">
                      {selectedService.benefit}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-petrol-base/40 mb-4">A Analogia</h4>
                    <p className="text-petrol-ink/80 italic border-l-2 border-petrol-base/20 pl-4 py-2">
                      "{selectedService.analogy}"
                    </p>
                  </div>
                </div>

                {/* Right Col: Deliverables & Stack */}
                <div className="space-y-10">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-petrol-base/40 mb-6">O que está incluso (Entregáveis)</h4>
                    <ul className="space-y-3">
                      {selectedService.deliverables?.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-petrol-ink font-light">
                          <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-[10px]">✓</span>
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-petrol-base/40 mb-4">Tech Specs</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.techStack?.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-white border border-petrol-base/10 rounded-full text-xs text-petrol-base/70">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Modal CTA */}
              <div className="bg-[#0B232E] rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-petrol-electric/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>

                <div className="relative z-10 max-w-md">
                  <h4 className="text-2xl font-serif text-white mb-2">Vamos construir isso?</h4>
                  <p className="text-white/60 font-light text-sm">Agende uma reunião estratégica para discutirmos como aplicar essa solução no seu negócio.</p>
                </div>

                <div className="relative z-10">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedService(null);
                      setTimeout(() => transitionTo('#contact'), 300);
                    }}
                    className="inline-flex h-12 items-center justify-center px-8 bg-white text-petrol-base rounded-full text-xs font-bold uppercase tracking-widest hover:bg-petrol-electric hover:text-white transition-colors shadow-lg"
                  >
                    Solicitar Orçamento
                  </a>
                </div>
              </div>

            </div>
          )}
        </ContentModal>
      </div>
    </section>
  );
};

export default Services;