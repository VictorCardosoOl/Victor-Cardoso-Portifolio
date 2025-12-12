import React, { useState, useEffect } from 'react';
import { NAV_LINKS, CONTACT_INFO } from '../constants';
import { usePageTransition } from './ui/PageTransition';
import StaggeredMenu from './ui/StaggeredMenu';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [readingProgress, setReadingProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const { transitionTo } = usePageTransition();

  // Scroll Progress & Smart Visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollProgress = windowHeight > 0 ? currentScrollY / windowHeight : 0;
      
      setReadingProgress(Number(scrollProgress));

      // Smart Navigation Logic
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY + 5) {
          // Scrolling Down -> Hide
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY - 5) {
          // Scrolling Up -> Show
          setIsVisible(true);
        }
      } else {
        // Top of page -> Show
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Intersection Observer
  useEffect(() => {
    const options = { root: null, rootMargin: "-20% 0px -60% 0px", threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
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
      <div 
        className="fixed top-0 left-0 h-[3px] bg-petrol-accent z-[9999] transition-opacity duration-300 origin-left" 
        style={{ transform: `scaleX(${readingProgress})` }} 
      />

      <StaggeredMenu 
        items={menuItems} 
        socialItems={socialItems} 
        onNavClick={handleNavClick} 
        activeSection={activeSection}
        visible={isVisible}
      />
    </>
  );
};

export default Navbar;