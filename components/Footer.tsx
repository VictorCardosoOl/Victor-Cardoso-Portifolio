import React, { useState } from 'react';
import { CONTACT_INFO, NAV_LINKS } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import Magnetic from './ui/Magnetic';
import { usePageTransition } from './ui/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';

const Footer: React.FC = () => {
  const { transitionTo } = usePageTransition();
  const year = new Date().getFullYear();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer id="site-footer" className="relative bg-[#020617] text-white h-screen flex flex-col justify-between overflow-hidden">
      
      {/* Background Image Reveal on Hover */}
      <AnimatePresence>
        {isHovered && (
            <motion.div 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.4, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600&h=900" 
                    alt="Office Atmosphere" 
                    className="w-full h-full object-cover filter grayscale opacity-50"
                />
                <div className="absolute inset-0 bg-[#020617]/50 mix-blend-multiply"></div>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10 flex-1 flex flex-col py-12 md:py-24">
         
         {/* Massive CTA Section */}
         <div className="flex-1 flex flex-col justify-center items-center text-center">
            <Magnetic strength={0.2}>
                <a 
                   href="#contact" 
                   onClick={(e) => { e.preventDefault(); transitionTo('#contact'); }}
                   onMouseEnter={() => setIsHovered(true)}
                   onMouseLeave={() => setIsHovered(false)}
                   className="group relative block py-12"
                >
                    <h2 className="text-[12vw] md:text-[10vw] leading-[0.85] font-serif font-medium tracking-tighter text-slate-100 mix-blend-difference z-20 relative">
                        Vamos Trabalhar <br/>
                        <span className="italic text-petrol-accent">Juntos</span>
                    </h2>
                </a>
            </Magnetic>
         </div>

         {/* Bottom Bar - Minimal & Clean */}
         <div className="w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
             
             {/* Left: Info */}
             <div className="flex flex-col gap-4">
                 <div className="flex gap-2 items-center">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                     <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Disponível para novos projetos</span>
                 </div>
                 <p className="text-sm font-light text-slate-400 max-w-xs">
                    Engenharia de software com precisão estética. Transformando ideias em sistemas de alta performance.
                 </p>
             </div>

             {/* Center: Socials */}
             <div className="flex flex-wrap gap-x-8 gap-y-2">
                 {CONTACT_INFO.socials.map((social, idx) => (
                    <a 
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-petrol-accent transition-colors flex items-center gap-1"
                    >
                        {social.name} <ArrowUpRight size={10} />
                    </a>
                 ))}
             </div>

             {/* Right: Copyright */}
             <div className="text-[10px] font-mono uppercase tracking-widest text-slate-600">
                 &copy; {year} Victor Cardoso. <br/> All Rights Reserved.
             </div>

         </div>

      </div>
    </footer>
  );
};

export default Footer;