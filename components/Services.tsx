
import React, { useState } from 'react';
import { SERVICES, PROCESS_STEPS } from '../constants';
import { ArrowRight, Check } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import Tilt from './ui/Tilt';
import { usePageTransition } from './ui/PageTransition';
import ContentModal from './ui/ContentModal';

// Mock detailed content generator since constants only have short descriptions
const ServiceDetailContent = ({ service }: { service: typeof SERVICES[0] }) => {
    return (
        <div className="container mx-auto px-6 md:px-20 py-10 md:py-16 max-w-5xl">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 mb-16">
                <div className="md:w-1/3">
                    <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-8">
                        <service.icon size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">O que inclui</h3>
                    <ul className="space-y-3">
                        {service.tags.map((tag, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                    <Check size={10} />
                                </div>
                                {tag}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="md:w-2/3">
                    <h3 className="text-2xl md:text-3xl font-serif font-medium text-slate-900 mb-6">
                        Detalhes da Solução
                    </h3>
                    <div className="prose prose-slate prose-lg text-slate-600 font-light leading-relaxed">
                        <p>{service.description}</p>
                        <p className="mt-6">
                            Esta solução é desenhada para negócios que buscam maturidade digital. 
                            Focamos não apenas na entrega técnica, mas na usabilidade e na escalabilidade 
                            a longo prazo. Utilizando as melhores práticas de desenvolvimento, garantimos 
                            que o produto final seja seguro, rápido e fácil de manter.
                        </p>
                        <p className="mt-4">
                            Nosso processo envolve uma imersão no seu modelo de negócio para garantir 
                            que a tecnologia sirva aos seus objetivos comerciais, e não o contrário.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="bg-slate-100 rounded-3xl p-8 md:p-12 text-center">
                <h4 className="text-xl font-serif font-medium text-slate-900 mb-4">Pronto para começar?</h4>
                <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                    Vamos discutir como essa solução se aplica especificamente ao seu cenário atual.
                </p>
                <a 
                   href="#contact" 
                   className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-colors shadow-xl"
                >
                    Solicitar Proposta <ArrowRight size={14} />
                </a>
            </div>
        </div>
    )
}

const Services: React.FC = () => {
  const { transitionTo } = usePageTransition();
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);

  return (
    <section id="services" className="py-24 md:py-40 bg-slate-950 text-white overflow-hidden relative rounded-[2rem] md:rounded-[3rem] -mt-10 z-10 pb-32 md:pb-48">
      {/* Refined Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#050505]"></div>
      <div className="absolute top-[-20%] right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-slate-800/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen opacity-50"></div>
      
      <div className="container mx-auto px-5 md:px-12 xl:px-20 relative z-10">
        
        {/* Services Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24">
          <Reveal variant="translate">
            <div>
              <div className="inline-block px-3 py-1 bg-white/5 rounded-full mb-4 border border-white/10 backdrop-blur-sm">
                <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-slate-300 uppercase block">
                  O que entregamos
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-medium text-white tracking-tight">
                Soluções Digitais
              </h2>
            </div>
          </Reveal>
          
          <Reveal delay={200} variant="blur">
            <p className="mt-4 md:mt-0 max-w-md text-slate-400 text-sm md:text-base leading-relaxed font-light">
                Do design à implementação. Foco em resolver problemas reais do seu negócio com tecnologia de ponta.
            </p>
          </Reveal>
        </div>

        {/* Services Grid with Tactile Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-24 md:mb-40">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={index} delay={index * 150} width="100%" variant="scale">
                  <div onClick={() => setSelectedService(service)} className="cursor-pointer h-full">
                    <Tilt strength={8} className="h-full">
                        <div className="h-full bg-slate-950/80 backdrop-blur-md p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] hover:bg-slate-900/90 transition-all duration-300 border border-white/10 hover:border-white/20 group shadow-xl flex flex-col">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 md:mb-10 text-white transition-colors border border-white/5 shadow-inner group-hover:bg-white group-hover:text-slate-900 duration-500">
                            <Icon size={24} strokeWidth={1.5} className="md:w-7 md:h-7" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif font-medium mb-4 text-slate-100">{service.title}</h3>
                        <p className="text-slate-300 text-base leading-relaxed mb-8 font-light flex-grow">
                            {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {service.tags.map((tag, i) => (
                                <span key={i} className="text-[10px] uppercase tracking-wider px-3 py-1.5 bg-black/60 border border-white/5 text-slate-400 rounded-full">
                                {tag}
                                </span>
                            ))}
                        </div>
                        </div>
                    </Tilt>
                  </div>
              </Reveal>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="border-t border-white/10 pt-20 md:pt-32">
           <Reveal>
              <div className="text-center mb-16 md:mb-24">
                 <h3 className="text-2xl md:text-5xl font-serif text-white mb-4">Como trabalhamos</h3>
                 <p className="text-sm md:text-base text-slate-400 font-light">Transparência e organização em cada etapa do projeto.</p>
              </div>
           </Reveal>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {PROCESS_STEPS.map((step, idx) => {
                 const Icon = step.icon;
                 return (
                   <Reveal key={idx} delay={idx * 100} width="100%" variant="translate">
                      <div className="relative pl-8 md:pl-10 border-l border-white/10 h-full">
                         <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center text-[8px] text-white font-bold">
                           {idx + 1}
                         </span>
                         <div className="mb-4 md:mb-6 text-slate-500">
                            <Icon size={24} />
                         </div>
                         <h4 className="text-lg md:text-xl font-bold text-white mb-3">{step.title}</h4>
                         <p className="text-sm text-slate-400 font-light leading-relaxed">
                            {step.description}
                         </p>
                      </div>
                   </Reveal>
                 )
              })}
           </div>

           <div className="mt-24 md:mt-32 text-center">
              <Reveal delay={400} variant="scale">
                 <a 
                   href="#contact" 
                   onClick={(e) => { e.preventDefault(); transitionTo('#contact'); }}
                   className="inline-flex items-center gap-2 text-white font-bold text-sm md:text-base uppercase tracking-widest border-b border-white pb-1 hover:text-slate-300 hover:border-slate-300 transition-colors cursor-pointer"
                 >
                    Começar meu projeto <ArrowRight size={16} />
                 </a>
              </Reveal>
           </div>
        </div>
      </div>

      {/* Content Modal for Services */}
      <ContentModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title}
        category="Serviço"
      >
        {selectedService && <ServiceDetailContent service={selectedService} />}
      </ContentModal>
    </section>
  );
};

export default Services;
