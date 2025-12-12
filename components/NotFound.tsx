import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import Magnetic from './ui/Magnetic';

const MotionDiv = motion.div as any;

const NotFound: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0B232E] text-[#F2F4F6] relative overflow-hidden">
      
      {/* Glitch Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      
      <div className="text-center relative z-10 p-8">
        <MotionDiv
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="mb-8"
        >
           <span className="text-[10px] font-mono text-petrol-accent uppercase tracking-[0.3em] block mb-2 animate-pulse">
             System Error 404
           </span>
           <h1 className="text-8xl md:text-9xl font-mono font-bold tracking-tighter text-white mix-blend-overlay">
             LOST_SIGNAL
           </h1>
        </MotionDiv>

        <p className="max-w-md mx-auto text-white/50 font-mono text-sm leading-relaxed mb-12">
           O arquivo solicitado não foi encontrado na memória do sistema. Os dados podem ter sido corrompidos ou movidos para o arquivo morto.
        </p>

        <Magnetic strength={0.2}>
          <a href="/">
             <Button variant="outline" className="border-petrol-accent text-petrol-accent hover:bg-petrol-accent hover:text-[#0B232E] hover:border-petrol-accent">
                REINICIAR SISTEMA
             </Button>
          </a>
        </Magnetic>
      </div>

      {/* Decorative Code */}
      <div className="absolute bottom-12 left-12 text-[10px] font-mono text-white/10 hidden md:block">
         {`> ERR_FILE_NOT_FOUND`}<br/>
         {`> STACK_TRACE_INIT`}<br/>
         {`> MEMORY_DUMP_COMPLETE`}
      </div>

    </section>
  );
};

export default NotFound;