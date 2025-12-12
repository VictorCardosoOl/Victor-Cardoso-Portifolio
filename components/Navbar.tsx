import React, { useState, useEffect } from 'react';
import { NAV_LINKS, CONTACT_INFO } from '../constants';
import { usePageTransition } from './ui/PageTransition';
import StaggeredMenu from './ui/StaggeredMenu';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [readingProgress, setReadingProgress] = useState(0);
  
  const { transitionTo } = usePageTransition();

  // Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setReadingProgress(Number(scroll));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Active Section
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    const sections = ['hero', ...NAV_LINKS.map(link => link.href.replace('#', ''))];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    transitionTo(href);
  };

  const menuItems = NAV_LINKS.map(link => ({ label: link.name, link: link.href }));
  const socialItems = CONTACT_INFO.socials.map(social => ({ label: social.name, link: social.url }));

  return (
    <>
      {/* Reading Progress Line - Electric Cyan */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-petrol-accent z-[60] transition-opacity duration-300 origin-left" 
        style={{ 
          transform: `scaleX(${readingProgress})`
        }} 
      />

      <StaggeredMenu 
        items={menuItems} 
        socialItems={socialItems} 
        onNavClick={handleNavClick} 
        activeSection={activeSection}
      />
    </>
  );
};

export default Navbar;