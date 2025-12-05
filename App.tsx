import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import Lab from './components/Lab';
import Writing from './components/Writing';
import Skills from './components/Skills';
import About from './components/About';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GrainBackground from './components/GrainBackground';
import Cursor from './components/Cursor';
import Lenis from '@studio-freight/lenis';

const App: React.FC = () => {
  
  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden selection:bg-slate-900 selection:text-white">
      <GrainBackground />
      <Cursor />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Projects />
        <Services />
        <Lab />
        <Writing />
        <Skills />
        <About />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;