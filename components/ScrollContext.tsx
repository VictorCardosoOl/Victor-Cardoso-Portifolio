
import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

/**
 * Contexto para expor a instância do Lenis globalmente.
 * Permite que outros componentes controlem o scroll (ex: pausar em modais, scroll to anchor).
 */
import 'lenis/dist/lenis.css';

/**
 * Contexto para expor a instância do Lenis globalmente.
 * Permite que outros componentes controlem o scroll (ex: pausar em modais, scroll to anchor).
 */
const ScrollContext = createContext<Lenis | null>(null);

/**
 * Hook para acessar a instância do Lenis.
 * @returns {Lenis | null} A instância atual do Lenis ou null se não inicializado.
 */
export const useLenis = () => useContext(ScrollContext);

// Exportado como useScroll para compatibilidade, mas prefira useLenis para clareza.
export const useScroll = () => useContext(ScrollContext);

/**
 * Provider que envolve a aplicação para gerenciar o "Smooth Scroll".
 * Utiliza a biblioteca Lenis para interceptar o scroll nativo e aplicar física de inércia.
 */
export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Configuração "Heavy Luxury / Cinematic"
    // O objetivo é criar uma sensação de massa e inércia ("peso"), similar a rolar uma página de revista premium.
    const lenisInstance = new Lenis({
      duration: 2.0, // Aumentado para 2.0s para sensação mais "premium/pesada"
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Levemente reduzido para controle mais fino
      touchMultiplier: 1.5,
      autoResize: true,
    });

    setLenis(lenisInstance);

    let rafId: number;

    /**
     * Loop de Animação (Request Animation Frame).
     * O Lenis precisa ser atualizado a cada frame do navegador para calcular a nova posição.
     * @param time Timestamp atual fornecido pelo requestAnimationFrame
     */
    function raf(time: number) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Cleanup: Remove o loop e destrói a instância ao desmontar
    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
    };
  }, []);

  return (
    <ScrollContext.Provider value={lenis}>
      {children}
    </ScrollContext.Provider>
  );
};
