import React, { useState, useEffect, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';
import GrainBackground from './components/GrainBackground';
import Gamification from './components/Gamification';
import { ScrollProvider } from './components/ScrollContext';
import { GamificationProvider } from './components/GamificationContext'; 
import { PageTransitionProvider } from './components/ui/PageTransition';
import { MessageCircle, Loader2 } from 'lucide-react';
import Magnetic from './components/ui/Magnetic';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy Load Components below the fold
const Services = React.lazy(() => import('./components/Services'));
const Lab = React.lazy(() => import('./components/Lab'));
const About = React.lazy(() => import('./components/About'));
const Contact = React.lazy(() => import('./components/Contact'));

const MotionDiv = motion.div as any;

// Narrative Preloader - Deep Archive Theme
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [textIndex, setTextIndex] = useState(0);
  const words = ["INITIALIZING", "STRATEGY", "DESIGN", "SYSTEM READY"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev >= words.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 800); 
          return prev;
        }
        return prev + 1;
      });
    }, 600); 

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <MotionDiv
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[99999] bg-[#0B232E] flex items-center justify-center text-[#F2F4F6]"
    >
      <div className="flex flex-col items-center">
         <span className="font-mono text-[10px] uppercase tracking-widest text-[#2DD4BF] mb-6 animate-pulse">
            sys.boot_sequence
         </span>
         
         <div className="h-20 flex items-center justify-center overflow-hidden">
             <AnimatePresence mode="wait">
                <motion.div
                  key={textIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-center"
                >
                  {words[textIndex]}
                </motion.div>
             </AnimatePresence>
         </div>

         <div className="mt-8 w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div 
               className="absolute top-0 left-0 h-full bg-[#2DD4BF]"
               initial={{ width: "0%" }}
               animate={{ width: "100%" }}
               transition={{ duration: 2.4, ease: "easeInOut" }}
            />
         </div>
      </div>
    </MotionDiv>
  );
};

// Section Loader Fallback
const SectionLoader = () => (
  <div className="w-full h-96 flex items-center justify-center text-[#0B232E]/20">
    <Loader2 className="animate-spin" />
  </div>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <GamificationProvider>
      <ScrollProvider>
        <PageTransitionProvider>
          <div className="flex flex-col min-h-screen relative overflow-x-hidden bg-paper selection:bg-[#0B232E] selection:text-[#2DD4BF]">
            <AnimatePresence mode="wait">
              {loading && <Preloader onComplete={() => setLoading(false)} />}
            </AnimatePresence>
            
            <GrainBackground />
            <Gamification />

            <Navbar />
            
            {/* Main Content */}
            <main className="relative z-10 bg-paper mb-[100vh] shadow-[0_20px_50px_-12px_rgba(11,35,46,0.3)] rounded-b-[3rem] border-b border-[#0B232E]/10">
              <Hero />
              <Projects />
              
              <Suspense fallback={<SectionLoader />}>
                <Services /> 
              </Suspense>
              
              <Suspense fallback={<SectionLoader />}>
                <Lab />
              </Suspense>
              
              <Suspense fallback={<SectionLoader />}>
                <About />    
              </Suspense>
              
              <Suspense fallback={<SectionLoader />}>
                <Contact />
              </Suspense>
            </main>
            
            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 w-full z-0 h-screen">
               <Footer />
            </div>
            
            <div className="fixed bottom-8 right-8 z-40">
              <Magnetic strength={0.3}>
                <a 
                  href="https://wa.me/5511999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 h-14 bg-[#0B232E] text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 border border-white/10"
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