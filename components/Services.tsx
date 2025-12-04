import React from 'react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-serif font-medium">
            Minha Expertise
          </h2>
          <p className="mt-4 md:mt-0 max-w-md text-gray-500 text-sm md:text-base leading-relaxed">
            Ofereço um conjunto completo de soluções digitais, desde a concepção do design até a implementação técnica avançada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
          {SERVICES.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-10 md:p-16 hover:bg-gray-50 transition-colors duration-300 group cursor-default"
            >
              <div className="mb-6 p-3 bg-black text-white w-fit rounded-none group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-medium mb-4 group-hover:translate-x-1 transition-transform duration-300">
                {service.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;