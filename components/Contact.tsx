import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { ArrowUpRight, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Obrigado pelo contato! Retornarei em breve.');
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white rounded-t-[3rem] -mt-10 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          <div>
            <div className="inline-block px-4 py-2 bg-gray-50 border border-gray-100 rounded-full mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Contato</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-8 text-offblack">
              Vamos conversar?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-12 font-light">
              Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de fazer parte de suas visões. Entre em contato para agendarmos uma reunião.
            </p>

            <div className="space-y-10">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-3">Email</h4>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-xl md:text-2xl font-serif text-offblack border-b border-gray-200 hover:border-black transition-all pb-1">
                  {CONTACT_INFO.email}
                </a>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-3">Localização</h4>
                    <p className="text-base font-medium text-gray-700">
                      {CONTACT_INFO.location}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-3">Disponibilidade</h4>
                    <p className="text-base font-medium text-green-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      Freelance / Projetos
                    </p>
                  </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Redes Sociais</h4>
                <div className="flex gap-3">
                  {CONTACT_INFO.socials.map((social, idx) => (
                    <a 
                      key={idx} 
                      href={social.url} 
                      className="px-5 py-3 border border-gray-200 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:border-black hover:bg-black hover:text-white transition-all group shadow-sm hover:shadow-md"
                    >
                      {social.name}
                      <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-serif mb-8 text-offblack">Envie uma mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-wider text-gray-500 mb-2 ml-4 font-bold">Nome</label>
                <input 
                  type="text" 
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-white border border-gray-200 py-4 px-6 rounded-2xl focus:ring-2 focus:ring-black/5 focus:border-gray-300 outline-none transition-all text-gray-800 placeholder-gray-300"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-gray-500 mb-2 ml-4 font-bold">Email</label>
                <input 
                  type="email" 
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-white border border-gray-200 py-4 px-6 rounded-2xl focus:ring-2 focus:ring-black/5 focus:border-gray-300 outline-none transition-all text-gray-800 placeholder-gray-300"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-wider text-gray-500 mb-2 ml-4 font-bold">Mensagem</label>
                <textarea 
                  id="message"
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-white border border-gray-200 py-4 px-6 rounded-2xl focus:ring-2 focus:ring-black/5 focus:border-gray-300 outline-none transition-all text-gray-800 placeholder-gray-300 resize-none"
                  placeholder="Como posso te ajudar?"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-offblack text-white py-5 text-xs uppercase font-bold tracking-widest hover:bg-gray-800 transition-all mt-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                Enviar Mensagem
                <Send size={16} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;