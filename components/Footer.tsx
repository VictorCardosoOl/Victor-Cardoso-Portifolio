
import React from 'react';
import { CONTACT_INFO, NAV_LINKS } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import Magnetic from './ui/Magnetic';

const Footer: React.FC = () => {
  return (
    <footer id="site-footer" className="relative bg-slate-950 text-white pt-24 pb-12 overflow-hidden">
      {/* Atmosphere Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#050505] z-0"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-slate-800/20 rounded-full blur-[120px] pointer-events-none opacity-50 z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none opacity-40 z-0"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="lg:w-1/3">
             <a href="#" className="inline-block text-3xl font-serif font-bold tracking-tight text-white mb-6">
               V<span className="text-slate-600">.</span>DEV
             </a>
             <p className="text-slate-400 leading-relaxed font-light max-w-sm mb-8">
               Engenharia de software com foco em performance, acessibilidade e design refinado para produtos digitais de alto impacto.
             </p>
             <div className="flex gap-4">
               {CONTACT_INFO.socials.map((social, idx) => (
                 <Magnetic key={idx} strength={0.3}>
                    <a 
                      href={social.url} 
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                 </Magnetic>
               ))}
             </div>
          </div>

          {/* Links Column */}
          <div className="lg:w-1/4">
             <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">Navegação</h4>
             <ul className="space-y-4">
               {NAV_LINKS.map((link) => (
                 <li key={link.name}>
                   <a href={link.href} className="text-slate-300 hover:text-white transition-colors text-sm font-medium block hover:translate-x-1 duration-300">
                     {link.name}
                   </a>
                 </li>
               ))}
             </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:w-1/3">
             <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">Contato</h4>
             <div className="space-y-6">
                <div>
                  <span className="block text-xs text-slate-500 mb-1">Email</span>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-xl font-serif text-white hover:text-slate-300 transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                </div>
                <div>
                  <span className="block text-xs text-slate-500 mb-1">Telefone</span>
                  <span className="text-lg text-slate-300">
                    {CONTACT_INFO.phone}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500 mb-1">Localização</span>
                  <span className="text-lg text-slate-300">
                    {CONTACT_INFO.location}
                  </span>
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 font-medium uppercase tracking-wider">
           <p>&copy; {new Date().getFullYear()} Victor Cardoso. Todos os direitos reservados.</p>
           <p className="mt-4 md:mt-0">Feito com paixão & código.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;