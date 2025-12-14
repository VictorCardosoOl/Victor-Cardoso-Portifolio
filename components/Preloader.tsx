import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocomotiveScroll } from './ScrollContext';

/**
 * COMPONENTE: Preloader
 * ---------------------
 * Uma tela de introdução narrativa que mascara o carregamento inicial dos assets.
 * Usa um array de palavras para criar uma micro-narrativa técnica ("INICIALIZANDO", etc).
 */
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [textIndex, setTextIndex] = useState(0);
    const words = ["INICIALIZANDO", "ESTRATÉGIA", "DESIGN", "SISTEMA PRONTO"];

    // Use Locomotive Scroll hook 
    const scroll = useLocomotiveScroll();

    useEffect(() => {
        // Lock scroll
        scroll?.stop();
        window.scrollTo(0, 0);
        // Fallback for browsers/situations where lenis might not be active instantly
        document.body.style.overflow = 'hidden';

        const interval = setInterval(() => {
            setTextIndex((prev) => {
                if (prev >= words.length - 1) {
                    clearInterval(interval);
                    setTimeout(() => {
                        scroll?.start(); // Resume scroll
                        document.body.style.overflow = '';
                        onComplete();
                    }, 800);
                    return prev;
                }
                return prev + 1;
            });
        }, 600);

        return () => {
            clearInterval(interval);
            scroll?.start();
            document.body.style.overflow = '';
        };
    }, [onComplete, scroll]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[99999] bg-[#0B232E] flex items-center justify-center text-[#F2F4F6]"
        >
            <div className="flex flex-col items-center relative z-10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-6 animate-pulse">
                    sys.boot_sequence
                </span>

                <div className="h-20 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={textIndex}
                            initial={{ y: 40, opacity: 0, filter: "blur(5px)" }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            exit={{ y: -40, opacity: 0, filter: "blur(5px)" }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-center"
                        >
                            {words[textIndex]}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="mt-8 w-48 h-[1px] bg-white/10 relative overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.4, ease: "easeInOut" }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;
