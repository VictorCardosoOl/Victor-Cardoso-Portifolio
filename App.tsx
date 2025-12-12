import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Lab from './components/Lab';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GrainBackground from './components/GrainBackground';
import Gamification from './components/Gamification';
import { ScrollProvider } from './components/ScrollContext';
import { GamificationProvider } from './components/GamificationContext'; 
import { PageTransitionProvider } from './components/ui/PageTransition';
import { MessageCircle } from 'lucide-react';
import Magnetic from './components/ui/Magnetic';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

// Preloader Component - Deep Petrol Theme
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const interval = 15;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration + 500);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <MotionDiv
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[99999] bg-[#0F2A36] flex items-center justify-center text-[#F8FAFC]"
    >
      <div className="flex flex-col items-center">
         <span className="font-mono text-xs uppercase tracking-widest text-petrol-accent mb-4">Carregando Sistema</span>
         <div className="text-8xl md:text-9xl font-serif font-medium tracking-tighter">
           {Math.round(count)}%
         </div>
      </div>
    </MotionDiv>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <GamificationProvider>
      <ScrollProvider>
        <PageTransitionProvider>
          <div className="flex flex-col min-h-screen relative overflow-x-hidden bg-paper selection:bg-petrol-base selection:text-petrol-accent">
            <AnimatePresence mode="wait">
              {loading && <Preloader onComplete={() => setLoading(false)} />}
            </AnimatePresence>
            
            <GrainBackground />
            <Gamification />

            <Navbar />
            
            {/* Main Content with Sticky Footer Logic */}
            <main className="relative z-10 bg-paper mb-[500px] shadow-[0_20px_50px_-12px_rgba(15,42,54,0.3)] rounded-b-[3rem]">
              <Hero />
              <Projects />
              <Services /> 
              <About />    
              <Lab />      
              <Contact />
            </main>
            
            {/* Sticky Footer underneath Main */}
            <div className="fixed bottom-0 left-0 w-full z-0 h-[500px]">
               <Footer />
            </div>
            
            <div className="fixed bottom-8 right-8 z-40">
              <Magnetic strength={0.3}>
                <a 
                  href="https://wa.me/5511999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 h-14 bg-petrol-base text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 border border-white/10"
                  aria-label="Contato via WhatsApp"
                >
                  <MessageCircle size={24} />
                </a>
              </Magnetic>
            </div>
          </div>
        </PageTransitionProvider>
      </ScrollProvider>
    </GamificationProvider>
  );
};

export default App;