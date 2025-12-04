import React, { createContext, useEffect, useState, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

interface ScrollContextValue {
  scroll: LocomotiveScroll | null;
}

export const LocomotiveScrollContext = createContext<ScrollContextValue>({
  scroll: null,
});

export const LocomotiveScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scroll, setScroll] = useState<LocomotiveScroll | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const locomotiveScroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      class: 'is-revealed',
    });

    setScroll(locomotiveScroll);

    // Atualiza o scroll quando a janela muda de tamanho
    const resizeObserver = new ResizeObserver(() => locomotiveScroll.update());
    resizeObserver.observe(scrollRef.current);

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <LocomotiveScrollContext.Provider value={{ scroll }}>
      <div data-scroll-container ref={scrollRef}>
        {children}
      </div>
    </LocomotiveScrollContext.Provider>
  );
};