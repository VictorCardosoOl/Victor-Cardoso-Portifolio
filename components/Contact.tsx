
import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { ArrowUpRight, Send, Check, AlertCircle, Mail, Phone } from 'lucide-react';
import Button from './ui/Button';
import { Reveal } from './ui/Reveal';
import Magnetic from './ui/Magnetic';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setStatus('loading');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('success');
      setFormState({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const InputGroup = ({ id, label, type = "text", placeholder, value, required = false }: any) => (
    <div className="relative group">
      <label 
        htmlFor={id} 
        className={`block text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors duration-300 ${focusedField === id ? 'text-slate-900' : 'text-slate-400'}`}
      >
        {label} {required && '*'}
      </label>
      <div className="relative">
        <input 
          type={type} 
          id={id}
          value={value}
          onChange={(e) => setFormState({...formState, [id]: e.target.value})}
          onFocus={() => setFocusedField(id)}
          onBlur={() => setFocusedField(null)}
          className="w-full bg-transparent border-b border-slate-200 py-3 text-base text-slate-900 placeholder-slate-300 focus:outline-none focus:border-transparent transition-colors"
          placeholder={placeholder}
          required={required}
          disabled={status === 'loading'}
        />
        {/* Animated Bottom Line */}
        <div 
          className={`absolute bottom-0 left-0 h-[1px] bg-slate-900 transition-all duration-500 ease-out ${focusedField === id ? 'w-full' : 'w-0'}`}
        />
      </div>
    </div>
  );

  return (
    <section id="contact" className="min-h-screen flex items-center py-20 bg-slate-50 relative overflow-hidden">
      
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/40 skew-x-12 translate-x-32 z-0 hidden lg:block" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Info & Typography */}
          <div className="lg:col-span-6 flex flex-col justify-center h-full">
            <Reveal width="100%">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-slate-900 tracking-tight leading-[0.9] mb-8">
                Vamos criar <br /> <span className="text-slate-400 italic">algo único.</span>
              </h2>
            </Reveal>

            <div className="space-y-8">
              <Reveal delay={100}>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="group">
                     <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                       <Mail size={12} /> Email
                     </span>
                     <a href={`mailto:${CONTACT_INFO.email}`} className="text-xl font-medium text-slate-900 hover:text-slate-600 transition-colors">
                       {CONTACT_INFO.email}
                     </a>
                  </div>
                  <div>
                     <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                       <Phone size={12} /> Telefone
                     </span>
                     <p className="text-xl font-medium text-slate-900">{CONTACT_INFO.phone}</p>
                  </div>
                </div>
              </Reveal>
              
              <Reveal delay={200}>
                {/* Updated Addresses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-t border-slate-200 border-b border-slate-200">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">O Estúdio</span>
                    <h4 className="text-base font-serif font-bold text-slate-900 mb-1">Estúdio Formosa</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-light">
                      Vila Formosa, São Paulo<br />
                      Brasil
                    </p>
                  </div>
                  
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Escritório</span>
                    <h4 className="text-base font-serif font-bold text-slate-900 mb-1">Escritório do Tatuapé</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-light">
                      Tatuapé, São Paulo<br />
                      Brasil
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={300}>
                 <div className="flex gap-6 pt-2">
                    {CONTACT_INFO.socials.map((social, idx) => (
                      <a 
                        key={idx} 
                        href={social.url}
                        className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1 group"
                      >
                        {social.name}
                        <ArrowUpRight size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    ))}
                 </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Compact Form */}
          <div className="lg:col-span-6">
            <Reveal delay={200} width="100%">
              <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl shadow-slate-200/50 relative overflow-hidden">
                 {/* Success/Error Overlay */}
                 {status === 'success' && (
                    <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                       <div className="w-16 h-16 bg-green-50 text-green-700 rounded-full flex items-center justify-center mb-4">
                         <Check size={32} />
                       </div>
                       <h3 className="text-2xl font-serif text-slate-900 mb-2">Mensagem Enviada</h3>
                       <p className="text-slate-500 text-sm">Entrarei em contato em breve.</p>
                       <button onClick={() => setStatus('idle')} className="mt-6 text-xs font-bold uppercase tracking-widest underline">Nova mensagem</button>
                    </div>
                 )}

                 <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <InputGroup 
                          id="name" 
                          label="Nome" 
                          placeholder="Seu nome" 
                          value={formState.name}
                          required
                       />
                       <InputGroup 
                          id="email" 
                          label="Email" 
                          type="email" 
                          placeholder="email@exemplo.com" 
                          value={formState.email}
                          required
                       />
                    </div>

                    <InputGroup 
                        id="company" 
                        label="Empresa (Opcional)" 
                        placeholder="Nome da organização" 
                        value={formState.company}
                    />

                    <div className="relative group">
                      <label 
                        htmlFor="message" 
                        className={`block text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors duration-300 ${focusedField === 'message' ? 'text-slate-900' : 'text-slate-400'}`}
                      >
                        Mensagem *
                      </label>
                      <div className="relative">
                        <textarea 
                          id="message"
                          rows={3}
                          value={formState.message}
                          onChange={(e) => setFormState({...formState, message: e.target.value})}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-transparent border-b border-slate-200 py-3 text-base text-slate-900 placeholder-slate-300 focus:outline-none focus:border-transparent transition-colors resize-none"
                          placeholder="Como posso ajudar?"
                          required
                          disabled={status === 'loading'}
                        />
                        <div 
                          className={`absolute bottom-0 left-0 h-[1px] bg-slate-900 transition-all duration-500 ease-out ${focusedField === 'message' ? 'w-full' : 'w-0'}`}
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                       <Magnetic strength={0.4}>
                          <Button 
                            type="submit" 
                            variant="primary" 
                            size="md" 
                            className="w-full md:w-auto"
                            disabled={status === 'loading'}
                          >
                            {status === 'loading' ? 'Enviando...' : 'Enviar Agora'}
                            {status !== 'loading' && <Send size={14} className="ml-2" />}
                          </Button>
                       </Magnetic>
                    </div>
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
