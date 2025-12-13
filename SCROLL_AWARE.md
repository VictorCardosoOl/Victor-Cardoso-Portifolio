# Scroll Aware Design (Design Consciente de Rolagem)

O **Scroll Aware Design** refere-se a interfaces que reagem, se adaptam ou fornecem feedback baseados na posição, direção ou velocidade da rolagem da página pelo usuário.

Em vez de tratar o scroll apenas como um meio de transporte vertical, tratamos como um **input contínuo de interação**.

---

## 1. Onde é interessante utilizar?

### A. Narrativa e Storytelling (Scrollytelling)
Quando você quer contar uma história sequencial. Elementos podem surgir, se mover ou se transformar conforme o usuário "avança" na história.
*   **Exemplo:** A seção `Projects.tsx` deste projeto, onde a imagem se move (Parallax) dentro do card.

### B. Feedback de Navegação
Para dar ao usuário uma noção de onde ele está em páginas longas.
*   **Exemplo:** Barras de progresso de leitura ou Menus laterais que destacam a seção ativa.

### C. Gerenciamento de Espaço (Imersão)
Para maximizar a área visível do conteúdo.
*   **Exemplo:** A `Navbar.tsx` que se esconde quando você rola para baixo (foco no conteúdo) e reaparece quando rola para cima (intenção de navegar).

### D. Performance Perceptiva
Carregar ou animar elementos apenas quando eles entram na tela (`Reveal.tsx`), economizando recursos do navegador e guiando o foco visual.

---

## 2. Ferramentas Utilizadas neste Projeto

### Framer Motion (`useScroll`, `useTransform`)
A principal biblioteca para orquestrar animações baseadas em scroll.
*   `useScroll()`: Retorna valores como `scrollY` (pixels) e `scrollYProgress` (0 a 1).
*   `useTransform()`: Mapeia esses valores para propriedades CSS (ex: mapear scroll de 0-1000px para opacidade de 0 a 1).

### Intersection Observer API
API nativa do navegador para detectar quando um elemento entra na tela. Usada no `GamificationContext` para saber qual seção está ativa.

### Lenis (Smooth Scroll)
Não é estritamente "aware", mas normaliza a física do scroll em diferentes dispositivos, tornando as animações "scroll aware" mais fluidas e previsíveis.

---

## 3. Como Implementar (Exemplos Práticos)

### Exemplo 1: Barra de Progresso (Simples)
Mapeia o progresso total da página (0 a 1) para a escala X de uma div.

```tsx
import { motion, useScroll } from "framer-motion";

export const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div 
      style={{ scaleX: scrollYProgress }} 
      className="fixed top-0 left-0 h-1 bg-red-500 w-full origin-left" 
    />
  );
}
```

### Exemplo 2: Parallax (Velocidade Diferencial)
Faz um elemento se mover mais devagar ou mais rápido que o scroll natural.

```tsx
import { motion, useScroll, useTransform } from "framer-motion";

export const ParallaxImage = () => {
  const { scrollY } = useScroll();
  // Enquanto a página rola 1000px, a imagem move apenas 500px (parece mais distante)
  const y = useTransform(scrollY, [0, 1000], [0, 500]); 
  
  return <motion.img style={{ y }} src="..." />;
}
```

### Exemplo 3: Gatilho de Direção (Esconder Menu)
Detecta se o usuário está indo para baixo ou para cima.

```tsx
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export const SmartNav = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true); // Rolando para baixo -> Esconde
    } else {
      setHidden(false); // Rolando para cima -> Mostra
    }
  });

  return <nav className={hidden ? "translate-y-[-100%]" : "translate-y-0"}>...</nav>;
}
```

---

## 4. Boas Práticas

1.  **Não sequestre o scroll (Scrolljacking):** Evite alterar a *física* nativa do scroll a menos que use uma lib robusta como Lenis. O usuário odeia perder o controle da velocidade.
2.  **Performance:** Animações baseadas em scroll disparam centenas de vezes por segundo. Prefira animar propriedades "baratas" para a GPU: `transform` (scale, rotate, translate) e `opacity`. Evite animar `width`, `height`, `top` ou `left`.
3.  **Acessibilidade:** Certifique-se de que o conteúdo seja acessível mesmo se o JavaScript falhar ou se o usuário preferir redução de movimento (`prefers-reduced-motion`).
