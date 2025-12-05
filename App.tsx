import React from 'react';
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

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden selection:bg-slate-900 selection:text-white">
      <GrainBackground />
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