
import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { ArrowUpRight, Send, Check, AlertCircle, Mail, Phone } from 'lucide-react';
import Button from './ui/Button';
import { Reveal } from './ui/Reveal';
import Magnetic from './ui/Magnetic';
import { useGamification } from './GamificationContext';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  // Access Gamification Data
  const { rank, level, getSessionDuration, getAllSectionTimes, quests } = useGamification();

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
        newErrors.email = 'Formato de email inválido';
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
      // --- PREPARE LEAD SCORE DATA ---
      const totalTime = getSessionDuration();
      const sectionTimes = getAllSectionTimes();
      
      // Fix: Ensure sectionTimes entries are treated as [string, number]
      const sortedSections = Object.entries(sectionTimes).sort(([, a], [, b]) => (b as number) - (a as number));
      const mostViewed = sortedSections[0] ? sortedSections[0][0] : 'N/A';

      const gamificationPayload = {
        rank: rank,
        level: level,
        sessionDurationSeconds: totalTime,
        formattedDuration: `${Math.floor(Number(totalTime) / 60)}m ${Number(totalTime) % 60}s`,
        mostViewedSection: mostViewed,
        sectionBreakdown: sectionTimes,
        completedQuests: quests.filter(q => q.completed).map(q => q.label)
      };

      console.log("--- SUBMITTING FORM WITH GAMIFICATION DATA ---");
      console.log("User Data:", formState);
      console.log("Lead Score (Gamification):", gamificationPayload);
      
      // Simulate API call
      // await api.post('/contact', { ...formState, ...gamificationPayload });
      
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
          className={`block text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors duration-300 ${
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
            className={`w-full bg-transparent border-b py-3 px-2 text-base text-slate-900 placeholder-slate-300 focus:outline-none transition-all duration-300 rounded-t-md ${
              hasError 
                ? 'border-red-400 bg-red-50/50' 
                : 'border-slate-200 hover:bg-slate-50'
            }`}
            placeholder={placeholder}
            disabled={status === 'loading'}
            style={{ fontSize: '16px' }} // Prevent iOS zoom
          />
          <div 
            className={`absolute bottom-0 left-0 h-[2px] bg-slate-900 transition-all duration-500 ease-out z-10 ${
              focusedField === id && !hasError ? 'w-full' : 'w-0'
            }`}
          />
          <div 
            className={`absolute bottom-0 left-0 h-[2px] bg-red-500 transition-all duration-500 ease-out z-10 ${
              hasError ? 'w-full' : 'w-0'
            }`}
          />
        </div>
        {hasError && (
          <div className="absolute -bottom-1 left-0 flex items-center gap-1 text-[9px] md:text-[10px] text-red-500 font-bold uppercase tracking-wider animate-in fade-in slide-in-from-top-1 pt-1">
             <AlertCircle size={10} /> {errors[id]}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="contact" className="min-h-screen flex items-center py-16 md:py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/40 skew-x-12 translate-x-32 z-0 hidden lg:block" />

      <div className="container relative z-10 mx-auto px-5 md:px-12 xl:px-20 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col justify-center h-full">
            <Reveal width="100%" variant="translate">
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-slate-900 tracking-tight leading-[0.95] md:leading-[0.9] mb-6 md:mb-8">
                Vamos criar <br /> <span className="text-slate-400 italic">algo único.</span>
              </h2>
            </Reveal>

            <div className="space-y-6 md:space-y-8">
              <Reveal delay={100} variant="blur">
                <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
                  <div className="group">
                     <span className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                       <Mail size={12} /> Email
                     </span>
                     <a href={`mailto:${CONTACT_INFO.email}`} className="text-lg md:text-xl font-medium text-slate-900 hover:text-slate-600 transition-colors">
                       {CONTACT_INFO.email}
                     </a>
                  </div>
                  <div>
                     <span className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                       <Phone size={12} /> Telefone
                     </span>
                     <p className="text-lg md:text-xl font-medium text-slate-900">{CONTACT_INFO.phone}</p>
                  </div>
                </div>
              </Reveal>
              
              <Reveal delay={200} variant="translate">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 py-6 md:py-8 border-t border-slate-200 border-b border-slate-200">
                  <div>
                    <span className="block text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 md:mb-3">O Estúdio</span>
                    <h4 className="text-base font-serif font-bold text-slate-900 mb-1">Estúdio Formosa</h4>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-light">
                      Vila Formosa, São Paulo<br />
                      Brasil
                    </p>
                  </div>
                  <div>
                    <span className="block text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 md:mb-3">Escritório</span>
                    <h4 className="text-base font-serif font-bold text-slate-900 mb-1">Escritório do Tatuapé</h4>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-light">
                      Tatuapé, São Paulo<br />
                      Brasil
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={300} variant="translate">
                 <div className="flex gap-4 md:gap-6 pt-2">
                    {CONTACT_INFO.socials.map((social, idx) => (
                      <Magnetic key={idx} strength={0.2}>
                        <a 
                          href={social.url}
                          className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1 group py-2"
                        >
                          {social.name}
                          <ArrowUpRight size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </Magnetic>
                    ))}
                 </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-6">
            <Reveal delay={200} width="100%" variant="scale">
              <div className="glass-panel p-6 md:p-10 rounded-[2rem] relative overflow-hidden">
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

                 <form onSubmit={handleSubmit} noValidate className="space-y-6 md:space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                       <InputGroup id="name" label="Nome" placeholder="Seu nome" value={formState.name} required />
                       <InputGroup id="email" label="Email" type="email" placeholder="email@exemplo.com" value={formState.email} required />
                    </div>

                    <InputGroup id="company" label="Empresa (Opcional)" placeholder="Nome da organização" value={formState.company} />

                    <div className="relative group pb-4">
                      <label 
                        htmlFor="message" 
                        className={`block text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors duration-300 ${
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
                             if (errors.message) setErrors(prev => { const n = {...prev}; delete n.message; return n; });
                          }}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full bg-transparent border-b py-3 px-2 text-base text-slate-900 placeholder-slate-300 focus:outline-none transition-all duration-300 resize-none rounded-t-md ${
                             errors.message ? 'border-red-400 bg-red-50/50' : 'border-slate-200 hover:bg-slate-50'
                          }`}
                          placeholder="Como posso ajudar?"
                          disabled={status === 'loading'}
                          style={{ fontSize: '16px' }} // Prevent iOS zoom
                        />
                        <div className={`absolute bottom-0 left-0 h-[2px] bg-slate-900 transition-all duration-500 ease-out z-10 ${focusedField === 'message' && !errors.message ? 'w-full' : 'w-0'}`} />
                        <div className={`absolute bottom-0 left-0 h-[2px] bg-red-500 transition-all duration-500 ease-out z-10 ${errors.message ? 'w-full' : 'w-0'}`} />
                      </div>
                      {errors.message && (
                        <div className="absolute -bottom-1 left-0 flex items-center gap-1 text-[9px] md:text-[10px] text-red-500 font-bold uppercase tracking-wider animate-in fade-in slide-in-from-top-1 pt-1">
                           <AlertCircle size={10} /> {errors.message}
                        </div>
                      )}
                    </div>

                    <div className="pt-2 md:pt-4 flex justify-end">
                       <Magnetic strength={0.4}>
                          <Button 
                            type="submit" 
                            variant="primary" 
                            size="md" 
                            className="w-full md:w-auto justify-center"
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
