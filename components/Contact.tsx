import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { ArrowUpRight } from 'lucide-react';

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <div>
            <div className="inline-block px-4 py-1.5 bg-gray-100 rounded-full mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Contato</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-8">
              Vamos conversar?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de fazer parte de suas visões. Entre em contato para agendarmos uma reunião.
            </p>

            <div className="space-y-8">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2">Email</h4>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-xl font-medium hover:text-gray-600 transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2">Localização</h4>
                <p className="text-xl font-medium">
                  {CONTACT_INFO.location}
                </p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Redes Sociais</h4>
                <div className="flex gap-4">
                  {CONTACT_INFO.socials.map((social, idx) => (
                    <a 
                      key={idx} 
                      href={social.url} 
                      className="px-4 py-2 border border-gray-200 rounded-full flex items-center gap-2 text-sm font-medium hover:border-black hover:bg-black hover:text-white transition-all group"
                    >
                      {social.name}
                      <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-offwhite p-8 md:p-12 rounded-[2rem]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-wider text-gray-500 mb-2 ml-2">Nome</label>
                <input 
                  type="text" 
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-white border border-transparent py-4 px-6 rounded-xl focus:ring-2 focus:ring-black/5 outline-none transition-all shadow-sm text-gray-800 placeholder-gray-400"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-gray-500 mb-2 ml-2">Email</label>
                <input 
                  type="email" 
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-white border border-transparent py-4 px-6 rounded-xl focus:ring-2 focus:ring-black/5 outline-none transition-all shadow-sm text-gray-800 placeholder-gray-400"
                  placeholder="Seu melhor email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-wider text-gray-500 mb-2 ml-2">Mensagem</label>
                <textarea 
                  id="message"
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-white border border-transparent py-4 px-6 rounded-xl focus:ring-2 focus:ring-black/5 outline-none transition-all shadow-sm text-gray-800 placeholder-gray-400 resize-none"
                  placeholder="Conte-me sobre o seu projeto"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-black text-white py-4 text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors mt-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;