import React from 'react';
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
import Gamification from './components/Gamification';
import { ScrollProvider } from './components/ScrollContext';
import { GamificationProvider } from './components/GamificationContext';
import { MessageCircle } from 'lucide-react';
import Magnetic from './components/ui/Magnetic';

const App: React.FC = () => {
  return (
    <GamificationProvider>
      <ScrollProvider>
        <div className="flex flex-col min-h-screen relative overflow-x-hidden selection:bg-slate-900 selection:text-white">
          <GrainBackground />
          
          {/* Gamification Layer (Always on top) */}
          <Gamification />
          
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
          
          {/* Floating WhatsApp Button */}
          <div className="fixed bottom-8 right-8 z-40">
            <Magnetic strength={0.3}>
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_25px_rgba(37,211,102,0.6)] transition-all hover:scale-110"
                aria-label="Contato via WhatsApp"
              >
                <MessageCircle size={28} fill="white" className="text-white" />
              </a>
            </Magnetic>
          </div>
        </div>
      </ScrollProvider>
    </GamificationProvider>
  );
};

export default App;