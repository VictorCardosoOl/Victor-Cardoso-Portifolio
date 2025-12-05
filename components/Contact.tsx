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
    <section id="contact" className="py-24 md:py-32 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          <div>
            <div className="inline-block px-4 py-2 glass-card rounded-full mb-8 border border-white/50">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Contato</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-8 text-slate-800">
              Vamos conversar?
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-12 font-light">
              Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de fazer parte de suas visões.
            </p>

            <div className="space-y-10">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-3">Email</h4>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-xl md:text-2xl font-serif text-slate-800 border-b border-slate-200 hover:border-slate-800 transition-all pb-1">
                  {CONTACT_INFO.email}
                </a>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-3">Localização</h4>
                    <p className="text-base font-medium text-slate-700">
                      {CONTACT_INFO.location}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-3">Disponibilidade</h4>
                    <p className="text-base font-medium text-green-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      Freelance / Projetos
                    </p>
                  </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-4">Redes Sociais</h4>
                <div className="flex gap-3">
                  {CONTACT_INFO.socials.map((social, idx) => (
                    <a 
                      key={idx} 
                      href={social.url} 
                      className="px-5 py-3 glass-card rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-all group shadow-sm hover:shadow-md border-white/60"
                    >
                      {social.name}
                      <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] shadow-xl border-white/60">
            <h3 className="text-2xl font-serif mb-8 text-slate-800">Envie uma mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-wider text-slate-500 mb-2 ml-4 font-bold">Nome</label>
                <input 
                  type="text" 
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-white/50 border border-white py-4 px-6 rounded-2xl focus:ring-2 focus:ring-slate-200 focus:border-slate-300 outline-none transition-all text-slate-800 placeholder-slate-400 backdrop-blur-sm"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-slate-500 mb-2 ml-4 font-bold">Email</label>
                <input 
                  type="email" 
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-white/50 border border-white py-4 px-6 rounded-2xl focus:ring-2 focus:ring-slate-200 focus:border-slate-300 outline-none transition-all text-slate-800 placeholder-slate-400 backdrop-blur-sm"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-wider text-slate-500 mb-2 ml-4 font-bold">Mensagem</label>
                <textarea 
                  id="message"
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-white/50 border border-white py-4 px-6 rounded-2xl focus:ring-2 focus:ring-slate-200 focus:border-slate-300 outline-none transition-all text-slate-800 placeholder-slate-400 backdrop-blur-sm resize-none"
                  placeholder="Como posso te ajudar?"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-slate-900 text-white py-5 text-xs uppercase font-bold tracking-widest hover:bg-slate-800 transition-all mt-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3"
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