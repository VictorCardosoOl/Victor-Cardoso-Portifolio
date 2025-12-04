import React from 'react';
import { LocomotiveScrollProvider } from './contexts/LocomotiveScrollContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Skills from './components/Skills';
import About from './components/About';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <LocomotiveScrollProvider>
      <div className="flex flex-col min-h-screen bg-offwhite text-offblack">
        <Navbar />
        
        {/* Conteúdo Principal com data-scroll-section para melhor performance do Locomotive */}
        <main data-scroll-section>
          <Hero />
          <Services />
          <Skills />
          <About />
          <Education />
          <Contact />
          <Footer />
        </main>
      </div>
    </LocomotiveScrollProvider>
  );
};

export default App;