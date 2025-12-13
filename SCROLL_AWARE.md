
# Scroll Aware Design & Arquitetura de Interação

O **Scroll Aware Design** (Design Consciente de Rolagem) refere-se a interfaces que reagem, se adaptam ou fornecem feedback baseados na posição, direção ou velocidade da rolagem da página.

Neste projeto, tratamos o scroll não apenas como navegação vertical, mas como um **input contínuo de interação** (similar ao movimento do mouse).

---

## 1. Tecnologias Utilizadas

### A. Framer Motion (`useScroll`, `useTransform`)
A principal biblioteca para orquestrar animações baseadas em scroll.
*   `useScroll()`: Hook que retorna valores reativos: `scrollY` (pixels) e `scrollYProgress` (0 a 1).
*   `useTransform()`: Função que mapeia esses valores para propriedades CSS.
    *   *Exemplo:* Mapear `scrollYProgress` [0, 1] para `scale` [0.95, 1.05].

### B. Lenis (Smooth Scroll)
Biblioteca de "inércia" de scroll.
*   **Por que usamos:** O scroll nativo dos navegadores é linear e "seco". O Lenis adiciona física (peso, fricção), tornando a experiência mais próxima de rolar uma superfície tátil de alta qualidade.
*   **Contexto:** Gerenciado em `components/ScrollContext.tsx`.

### C. Intersection Observer API
API nativa do navegador para detectar quando um elemento entra na tela.
*   **Uso:** Utilizada no `GamificationContext` para saber qual seção está ativa sem sobrecarregar a thread principal com cálculos de posição constantes.

---

## 2. Padrões Implementados

### Padrão A: Parallax Direcional (`Projects.tsx`)
Faz um elemento se mover em velocidade diferente do seu container pai.
*   **Técnica:** Enquanto a página rola 1000px, a imagem move apenas 500px na direção oposta (ou mesma direção).
*   **Objetivo:** Criar profundidade (Z-index psicológico).

```tsx
const yParallax = useTransform(smoothProgress, [0, 1], ["-40%", "40%"]);
// Resultado: A imagem se move 40% para cima e depois 40% para baixo relativo ao seu container.
```

### Padrão B: Mask Reveal (`Projects.tsx`)
Usa `clip-path` para revelar conteúdo progressivamente.
*   **Técnica:** Mapear o progresso do scroll para valores de `inset`.
*   **Objetivo:** Sensação de que o conteúdo está sendo "impresso" ou revelado fisicamente na tela.

### Padrão C: Navegação Inteligente (`Navbar.tsx`)
Detecta a *direção* (Delta) do scroll.
*   **Lógica:**
    *   `currentScroll > lastScroll` (Descendo) -> Esconder Menu (Foco no Conteúdo).
    *   `currentScroll < lastScroll` (Subindo) -> Mostrar Menu (Intenção de Navegar).

---

## 3. Guia de Performance

1.  **Evite Layout Thrashing:** Nunca anime propriedades que forçam o navegador a recalcular o layout (`width`, `height`, `top`, `left`).
2.  **Use Transforms:** Sempre anime `transform` (translate, scale, rotate) e `opacity`. Essas propriedades são processadas pela GPU (Compositor Thread).
3.  **Will Change:** Use a propriedade CSS `will-change: transform` com parcimônia em elementos pesados (como imagens grandes em parallax) para avisar o navegador antecipadamente.
4.  **Ref vs State:** Para rastreamento de dados em alta frequência (como timers ou posição exata do scroll para analytics), use `useRef` em vez de `useState` para evitar re-renderizações desnecessárias do React.
