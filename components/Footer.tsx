import React from 'react';
import { CONTACT_INFO, NAV_LINKS, WRITING } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import Magnetic from './ui/Magnetic';
import { usePageTransition } from './ui/PageTransition';

const Footer: React.FC = () => {
  const { transitionTo } = usePageTransition();

  return (
    // Background updated to Dark Petrol (#020617 / Slate 950 or Custom)
    <footer id="site-footer" className="relative bg-[#020617] text-white pt-24 pb-12 overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#0ea5e9]/20 rounded-full blur-[120px] pointer-events-none opacity-50 z-0"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="lg:w-1/3">
             <a 
               href="#hero" 
               onClick={(e) => { e.preventDefault(); transitionTo('#hero'); }}
               className="inline-block text-3xl font-serif font-bold tracking-tight text-white mb-6"
             >
               V<span className="text-[#38bdf8]">.</span>DEV
             </a>
             <p className="text-slate-400 leading-relaxed font-light max-w-sm mb-8 text-sm">
               Engenharia de software com foco em performance, acessibilidade e design refinado para produtos digitais de alto impacto.
             </p>
             <div className="flex gap-4">
               {CONTACT_INFO.socials.map((social, idx) => (
                 <Magnetic key={idx} strength={0.3}>
                    <a 
                      href={social.url} 
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white hover:text-[#020617] hover:border-white transition-all duration-300"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                 </Magnetic>
               ))}
             </div>
          </div>

          {/* Links Column */}
          <div className="lg:w-1/5">
             <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-6">Menu</h4>
             <ul className="space-y-3">
               {NAV_LINKS.map((link) => (
                 <li key={link.name}>
                   <a 
                     href={link.href} 
                     onClick={(e) => { e.preventDefault(); transitionTo(link.href); }}
                     className="text-slate-400 hover:text-white transition-colors text-sm font-medium block hover:translate-x-1 duration-300"
                   >
                     {link.name}
                   </a>
                 </li>
               ))}
             </ul>
          </div>

          {/* Journal Column (Moved from Main Section) */}
          <div className="lg:w-1/4">
             <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-6">Journal</h4>
             <ul className="space-y-4">
                {WRITING.map((art, i) => (
                    <li key={i}>
                        <a href={art.link} className="group block">
                            <span className="block text-white text-sm font-medium group-hover:underline decoration-slate-500 underline-offset-4">{art.title}</span>
                            <span className="text-[10px] text-slate-500 uppercase tracking-wide">{art.category}</span>
                        </a>
                    </li>
                ))}
             </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:w-1/5">
             <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-6">Contato</h4>
             <div className="space-y-4">
                <a href={`mailto:${CONTACT_INFO.email}`} className="block text-sm text-slate-300 hover:text-white transition-colors">
                  {CONTACT_INFO.email}
                </a>
                <span className="block text-sm text-slate-500">
                  {CONTACT_INFO.location}
                </span>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 font-bold uppercase tracking-wider">
           <p>&copy; {new Date().getFullYear()} Victor Cardoso.</p>
           <p className="mt-2 md:mt-0">Design & Engenharia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;