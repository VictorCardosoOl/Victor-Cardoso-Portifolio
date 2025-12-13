
# Documentação de Efeitos Visuais (VFX)

Este documento detalha os efeitos visuais "puramente estéticos" que compõem a identidade visual do portfólio.

---

## 1. Grain Background (Ruído de Filme)

Adiciona textura e profundidade visual, simulando filme analógico ISO alto.

### Implementação Técnica
*   **Arquivo:** `components/GrainBackground.tsx`
*   **Estratégia:** Em vez de usar filtros SVG complexos (`<feTurbulence>`) que consomem muita CPU, usamos um **GIF/PNG Base64** de ruído monocromático.
*   **Animação:** Usamos CSS `steps()` para mover a textura em posições aleatórias a cada quadro, criando a ilusão de ruído estático em movimento.
*   **Performance:** Custo de GPU próximo a zero.

## 2. Tilt Effect (Cartões 3D)

Faz com que cartões girem levemente em direção ao mouse.

### Implementação Técnica
*   **Arquivo:** `components/ui/Tilt.tsx`
*   **Bibliotecas:** `framer-motion` (useMotionValue, useSpring, useTransform).
*   **Lógica:**
    1.  Calcula a posição do mouse relativa ao centro do elemento (-0.5 a 0.5).
    2.  Mapeia X para rotação Y e Y para rotação X (invertido).
    3.  Aplica física de mola (`useSpring`) para que o cartão tenha "peso" e não siga o mouse instantaneamente.
    4.  Aplica `transform: perspective(1000px)` no pai para criar o ponto de fuga 3D.

## 3. Page Transition (Cortina)

Transição suave entre âncoras/páginas.

### Implementação Técnica
*   **Arquivo:** `components/ui/PageTransition.tsx`
*   **Lógica:**
    1.  Intercepta cliques em links internos.
    2.  Sobe uma `div` (cortina) cobrindo a tela (`z-index: 99999`).
    3.  Enquanto a tela está coberta, o Lenis faz um scroll instantâneo (`immediate: true`) para o destino.
    4.  A cortina desce/desaparece, revelando a nova seção.

## 4. Texto com Física (Reveal)

### Implementação Técnica
*   **Arquivo:** `components/ui/Reveal.tsx`
*   **Conceito:** Animações baseadas em molas (Spring Physics) em vez de curvas de tempo (Duration/Easing).
*   **Por quê?** Animações com duração fixa (ex: 0.5s) parecem artificiais se interrompidas. Física de mola permite interrupção fluida e sensação orgânica.

---

## Referências de Design System

| Efeito | Propriedade CSS/Motion | Valor Típico |
| :--- | :--- | :--- |
| **Glassmorphism** | `backdrop-filter` | `blur(16px)` |
| **Sombra Suave** | `box-shadow` | `0 20px 50px -12px rgba(11,35,46,0.3)` |
| **Spring (Rápido)** | `transition` | `{ stiffness: 300, damping: 30 }` |
| **Spring (Lento)** | `transition` | `{ stiffness: 90, damping: 40, mass: 1.2 }` |
