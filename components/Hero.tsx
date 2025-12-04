import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <p className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-500 mb-6">
            Desenvolvimento & Design Digital
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] mb-8">
            Transformando visões <br />
            em experiências <br />
            digitais <span className="italic text-gray-400">exclusivas.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed mb-10">
            Especialista em criar soluções web de alta performance que unem estética refinada e funcionalidade robusta para elevar sua presença digital.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#services" 
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-black text-white text-sm uppercase tracking-widest hover:bg-gray-800 transition-all duration-300"
            >
              Ver Serviços
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#about" 
              className="group flex items-center justify-center gap-2 px-8 py-4 border border-black text-black text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
            >
              Sobre Mim
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;