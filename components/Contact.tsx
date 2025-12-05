import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { ArrowUpRight, Send } from 'lucide-react';
import Button from './ui/Button';
import { Reveal } from './ui/Reveal';

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          
          <div>
            <Reveal>
              <div className="inline-block px-5 py-2 glass-panel rounded-full mb-8 border border-slate-200/50">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Contato</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif font-medium mb-8 text-slate-900 leading-tight tracking-tight">
                Vamos <br />conversar?
              </h2>
            </Reveal>
            
            <Reveal delay={100}>
              <p className="text-slate-600 text-lg leading-relaxed mb-12 font-light max-w-md">
                Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de fazer parte de suas visões.
              </p>
            </Reveal>

            <div className="space-y-12">
              <Reveal delay={150}>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-3 font-bold">Email</h4>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-xl md:text-2xl font-serif text-slate-900 border-b border-slate-200 hover:border-slate-900 transition-all pb-1">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </Reveal>
              
              <Reveal delay={200}>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-3 font-bold">Localização</h4>
                      <p className="text-base font-medium text-slate-700">
                        {CONTACT_INFO.location}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-3 font-bold">Disponibilidade</h4>
                      <p className="text-base font-medium text-green-700 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Freelance / Projetos
                      </p>
                    </div>
                </div>
              </Reveal>

              <Reveal delay={250}>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-5 font-bold">Redes Sociais</h4>
                  <div className="flex gap-4">
                    {CONTACT_INFO.socials.map((social, idx) => (
                      <a 
                        key={idx} 
                        href={social.url} 
                        className="px-6 py-3 bg-white border border-slate-200 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-all group shadow-sm hover:shadow-lg"
                      >
                        {social.name}
                        <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <Reveal width="100%" delay={200}>
              <div className="glass-panel p-10 md:p-14 rounded-[3rem] shadow-xl border border-white/50 bg-white/60">
                <h3 className="text-3xl font-serif mb-10 text-slate-900">Envie uma mensagem</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-xs uppercase tracking-wider text-slate-500 mb-3 ml-4 font-bold">Nome</label>
                    <input 
                      type="text" 
                      id="name"
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      className="w-full bg-white/50 border-none py-5 px-8 rounded-3xl focus:bg-white focus:ring-1 focus:ring-slate-200 outline-none transition-all text-slate-900 placeholder-slate-400 backdrop-blur-sm shadow-inner"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider text-slate-500 mb-3 ml-4 font-bold">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      className="w-full bg-white/50 border-none py-5 px-8 rounded-3xl focus:bg-white focus:ring-1 focus:ring-slate-200 outline-none transition-all text-slate-900 placeholder-slate-400 backdrop-blur-sm shadow-inner"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs uppercase tracking-wider text-slate-500 mb-3 ml-4 font-bold">Mensagem</label>
                    <textarea 
                      id="message"
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      className="w-full bg-white/50 border-none py-5 px-8 rounded-3xl focus:bg-white focus:ring-1 focus:ring-slate-200 outline-none transition-all text-slate-900 placeholder-slate-400 backdrop-blur-sm resize-none shadow-inner"
                      placeholder="Como posso te ajudar?"
                      required
                    ></textarea>
                  </div>
                  
                  <Button type="submit" variant="primary" size="lg" className="w-full mt-4">
                    Enviar Mensagem <Send size={16} className="ml-2" />
                  </Button>
                </form>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;