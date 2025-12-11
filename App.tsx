
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Lab from './components/Lab';
import Writing from './components/Writing';
import Skills from './components/Skills';
import Education from './components/Education';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GrainBackground from './components/GrainBackground';
import { ScrollProvider } from './components/ScrollContext';
import { GamificationProvider } from './components/GamificationContext'; 
import { PageTransitionProvider } from './components/ui/PageTransition';
import { MessageCircle } from 'lucide-react';
import Magnetic from './components/ui/Magnetic';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

// Simple Preloader Component
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
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[99999] bg-slate-950 flex items-center justify-center text-white"
    >
      <div className="text-9xl font-serif font-bold tracking-tighter">
        {Math.round(count)}%
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
          <div className="flex flex-col min-h-screen relative overflow-x-hidden selection:bg-slate-900 selection:text-white">
            <AnimatePresence mode="wait">
              {loading && <Preloader onComplete={() => setLoading(false)} />}
            </AnimatePresence>
            
            <GrainBackground />
            
            <Navbar />
            <main className="flex-grow">
              <Hero />
              <Projects />
              <Services />
              <Skills />
              <About />
              <Education />
              <Lab />
              <Writing />
              <Contact />
            </main>
            <Footer />
            
            <div className="fixed bottom-8 right-8 z-40">
              <Magnetic strength={0.3}>
                <a 
                  href="https://wa.me/5511999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 h-14 bg-white text-slate-900 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all hover:scale-110 border border-slate-100"
                  aria-label="Contato via WhatsApp"
                >
                  <MessageCircle size={24} className="text-slate-900" />
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
