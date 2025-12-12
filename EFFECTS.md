# Documentação de Efeitos Visuais

## 1. Scroll-Linked Mask Reveal (Projetos)

Este efeito foi implementado no componente `Projects.tsx` para criar uma revelação gradual e elegante das imagens conforme o usuário rola a página.

### Como Funciona
Utilizamos a biblioteca `framer-motion` para sincronizar a posição da barra de rolagem (`scrollYProgress`) diretamente com a propriedade CSS `clip-path` do container da imagem.

### Lógica Técnica
1. **Rastreamento:** O hook `useScroll` monitora quando o elemento `<ProjectImage />` entra na viewport.
   - `offset: ["start 0.9", "center center"]`
   - Início: Quando o topo do elemento atinge 90% da altura da tela (entra por baixo).
   - Fim: Quando o centro do elemento atinge o centro da tela.

2. **Interpolação (useTransform):**
   - Mapeamos o progresso (0 a 1) para um valor de `inset`.
   - `inset(100% 0 0% 0)` -> A imagem está 100% cortada do topo para baixo (invisível).
   - `inset(0% 0 0% 0)` -> A imagem está totalmente visível.

### Resultado Visual
Conforme o usuário rola para baixo, a "máscara" sobe, revelando a imagem como se ela estivesse saindo de um envelope ou sendo impressa na tela. Se o usuário rolar para cima, a máscara desce novamente, ocultando a imagem.

```typescript
// Exemplo de Código
const clipPath = useTransform(
  scrollYProgress,
  [0, 1], 
  ["inset(100% 0 0% 0)", "inset(0% 0 0% 0)"]
);
```

---

## 2. Gamificação / Manifesto Popup

O sistema de gamificação rastreia silenciosamente a interação do usuário.

### Gatilho (Trigger)
O popup "Manifesto" só é exibido quando:
1. O usuário atinge matematicamente o final da página (`window.innerHeight + window.scrollY >= document.body.scrollHeight`).
2. O tempo de sessão é superior a 8 segundos.
3. O popup ainda não foi exibido na sessão atual.

Isso evita que o aviso apareça prematuramente em telas grandes ou durante carregamentos rápidos.
