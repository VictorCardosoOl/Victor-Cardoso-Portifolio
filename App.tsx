import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Background Fluid Animation Component
const LiquidBackground = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
    {/* Blue Muted Blob */}
    <div className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] bg-slate-300/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob"></div>
    {/* Grey/Purple Blob */}
    <div className="absolute top-0 right-[-10%] w-[50vw] h-[50vw] bg-slate-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-2000"></div>
    {/* Bottom Center Blob */}
    <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] bg-blue-100/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-4000"></div>
    
    <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <LiquidBackground />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Projects />
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