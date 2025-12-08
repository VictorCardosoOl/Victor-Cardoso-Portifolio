import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { ArrowUpRight, Send, Check, AlertCircle, Mail, Phone } from 'lucide-react';
import Button from './ui/Button';
import { Reveal } from './ui/Reveal';
import Magnetic from './ui/Magnetic';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!formState.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      isValid = false;
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email é obrigatório';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const domainRegex = /^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
      if (!emailRegex.test(formState.email)) {
        newErrors.email = 'Formato de email inválido (ex: nome@empresa.com)';
        isValid = false;
      } else if (!domainRegex.test(formState.email)) {
        newErrors.email = 'Domínio de email inválido';
        isValid = false;
      }
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setStatus('loading');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('success');
      setFormState({ name: '', email: '', company: '', message: '' });
      setErrors({});
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const InputGroup = ({ id, label, type = "text", placeholder, value, required = false }: any) => {
    const hasError = !!errors[id];
    
    return (
      <div className="relative group pb-4">
        <label 
          htmlFor={id} 
          className={`block text-[10px] font-bold uppercase tracking-widest mb-2 transition-colors duration-300 ${
            hasError ? 'text-red-500' : focusedField === id ? 'text-slate-900' : 'text-slate-400'
          }`}
        >
          {label} {required && '*'}
        </label>
        <div className="relative">
          <input 
            type={type} 
            id={id}
            value={value}
            onChange={(e) => {
              setFormState({...formState, [id]: e.target.value});
              if (hasError) {
                 setErrors(prev => {
                    const newErrs = {...prev};
                    delete newErrs[id];
                    return newErrs;
                 });
              }
            }}
            onFocus={() => setFocusedField(id)}
            onBlur={() => setFocusedField(null)}
            className={`w-full bg-transparent border-b py-4 px-2 text-lg text-slate-900 placeholder-slate-300 focus:outline-none transition-all duration-300 rounded-t-md ${
              hasError 
                ? 'border-red-400 bg-red-50/50' 
                : 'border-slate-200 hover:bg-slate-50'
            }`}
            placeholder={placeholder}
            disabled={status === 'loading'}
          />
          {/* Animated Bottom Line (Focus) */}
          <div 
            className={`absolute bottom-0 left-0 h-[2px] bg-slate-900 transition-all duration-500 ease-out z-10 ${
              focusedField === id && !hasError ? 'w-full' : 'w-0'
            }`}
          />
          {/* Animated Bottom Line (Error) */}
          <div 
            className={`absolute bottom-0 left-0 h-[2px] bg-red-500 transition-all duration-500 ease-out z-10 ${
              hasError ? 'w-full' : 'w-0'
            }`}
          />
        </div>
        {hasError && (
          <div className="absolute -bottom-1 left-0 flex items-center gap-1 text-[10px] text-red-500 font-bold uppercase tracking-wider animate-in fade-in slide-in-from-top-1 pt-1">
             <AlertCircle size={10} /> {errors[id]}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="contact" className="min-h-screen flex items-center py-20 bg-slate-50 relative overflow-hidden">
      
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/40 skew-x-12 translate-x-32 z-0 hidden lg:block" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 xl:px-20 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Info & Typography */}
          <div className="lg:col-span-6 flex flex-col justify-center h-full">
            <Reveal width="100%">
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium text-slate-900 tracking-tighter leading-[0.85] mb-12">
                Vamos criar <br /> <span className="text-slate-400 italic">algo único.</span>
              </h2>
            </Reveal>

            <div className="space-y-10">
              <Reveal delay={100}>
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="group">
                     <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                       <Mail size={12} /> Email
                     </span>
                     <a href={`mailto:${CONTACT_INFO.email}`} className="text-2xl font-medium text-slate-900 hover:text-slate-600 transition-colors">
                       {CONTACT_INFO.email}
                     </a>
                  </div>
                  <div>
                     <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                       <Phone size={12} /> Telefone
                     </span>
                     <p className="text-2xl font-medium text-slate-900">{CONTACT_INFO.phone}</p>
                  </div>
                </div>
              </Reveal>
              
              <Reveal delay={200}>
                {/* Updated Addresses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 border-t border-slate-200 border-b border-slate-200">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">O Estúdio</span>
                    <h4 className="text-lg font-serif font-bold text-slate-900 mb-2">Estúdio Formosa</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-light">
                      Vila Formosa, São Paulo<br />
                      Brasil
                    </p>
                  </div>
                  
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Escritório</span>
                    <h4 className="text-lg font-serif font-bold text-slate-900 mb-2">Escritório do Tatuapé</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-light">
                      Tatuapé, São Paulo<br />
                      Brasil
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={300}>
                 <div className="flex gap-8 pt-4">
                    {CONTACT_INFO.socials.map((social, idx) => (
                      <Magnetic key={idx} strength={0.2}>
                        <a 
                          href={social.url}
                          className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1 group"
                        >
                          {social.name}
                          <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </Magnetic>
                    ))}
                 </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Compact Form */}
          <div className="lg:col-span-6">
            <Reveal delay={200} width="100%">
              <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
                 {/* Success/Error Overlay */}
                 {status === 'success' && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                       <div className="w-20 h-20 bg-green-50 text-green-700 rounded-full flex items-center justify-center mb-6">
                         <Check size={40} strokeWidth={1.5} />
                       </div>
                       <h3 className="text-3xl font-serif text-slate-900 mb-2">Mensagem Enviada</h3>
                       <p className="text-slate-500 text-base">Entrarei em contato em breve.</p>
                       <button onClick={() => setStatus('idle')} className="mt-8 text-[10px] font-bold uppercase tracking-widest underline hover:text-slate-800">Nova mensagem</button>
                    </div>
                 )}

                 <form onSubmit={handleSubmit} noValidate className="space-y-10 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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

                    <div className="relative group pb-4">
                      <label 
                        htmlFor="message" 
                        className={`block text-[10px] font-bold uppercase tracking-widest mb-2 transition-colors duration-300 ${
                          errors.message ? 'text-red-500' : focusedField === 'message' ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      >
                        Mensagem *
                      </label>
                      <div className="relative">
                        <textarea 
                          id="message"
                          rows={3}
                          value={formState.message}
                          onChange={(e) => {
                             setFormState({...formState, message: e.target.value});
                             if (errors.message) {
                                setErrors(prev => {
                                  const newErrs = {...prev};
                                  delete newErrs.message;
                                  return newErrs;
                                });
                             }
                          }}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full bg-transparent border-b py-4 px-2 text-lg text-slate-900 placeholder-slate-300 focus:outline-none transition-all duration-300 resize-none rounded-t-md ${
                             errors.message 
                               ? 'border-red-400 bg-red-50/50' 
                               : 'border-slate-200 hover:bg-slate-50'
                          }`}
                          placeholder="Como posso ajudar?"
                          disabled={status === 'loading'}
                        />
                         {/* Animated Bottom Line (Focus) */}
                        <div 
                          className={`absolute bottom-0 left-0 h-[2px] bg-slate-900 transition-all duration-500 ease-out z-10 ${
                             focusedField === 'message' && !errors.message ? 'w-full' : 'w-0'
                          }`}
                        />
                        {/* Animated Bottom Line (Error) */}
                        <div 
                          className={`absolute bottom-0 left-0 h-[2px] bg-red-500 transition-all duration-500 ease-out z-10 ${
                             errors.message ? 'w-full' : 'w-0'
                          }`}
                        />
                      </div>
                      {errors.message && (
                        <div className="absolute -bottom-1 left-0 flex items-center gap-1 text-[10px] text-red-500 font-bold uppercase tracking-wider animate-in fade-in slide-in-from-top-1 pt-1">
                           <AlertCircle size={10} /> {errors.message}
                        </div>
                      )}
                    </div>

                    <div className="pt-6 flex justify-end">
                       <Magnetic strength={0.4}>
                          <Button 
                            type="submit" 
                            variant="primary" 
                            size="lg" 
                            className="w-full md:w-auto shadow-xl"
                            disabled={status === 'loading'}
                          >
                            {status === 'loading' ? 'Enviando...' : 'Enviar Agora'}
                            {status !== 'loading' && <Send size={16} className="ml-2" />}
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