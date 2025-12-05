
import { Monitor, Code, Layout, Database, Smartphone, Globe } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Início', href: '#hero' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Sobre', href: '#about' },
  { name: 'Lab', href: '#lab' },
  { name: 'Artigos', href: '#writing' },
  { name: 'Contato', href: '#contact' },
];

export const PROJECTS = [
  {
    title: 'Lumina Architecture',
    category: 'Web Design',
    year: '2024',
    description: 'Plataforma imersiva para arquitetura com foco em galeria visual fluida.',
    tags: ['React', 'Motion', 'Tailwind'],
    image: 'https://picsum.photos/id/10/1200/800',
    gallery: [
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/11/1200/800',
      'https://picsum.photos/id/12/1200/800',
      'https://picsum.photos/id/13/1200/800'
    ],
    link: '#',
    caseStudy: {
      challenge: 'O cliente precisava traduzir a sensação física de visitar uma exposição de arte para o ambiente digital, sem comprometer a acessibilidade e o SEO.',
      solution: 'Desenvolvi um ambiente com transições de página (SPA) que elimina o "piscar" da tela branca. Utilizei carregamento inteligente de imagens para garantir performance.',
      result: 'Aumento de 300% no tempo médio de permanência na página.'
    }
  },
  {
    title: 'Apex Finance',
    category: 'Fintech',
    year: '2023',
    description: 'Dashboard administrativo para gestão de ativos em tempo real.',
    tags: ['Next.js', 'TypeScript', 'D3.js'],
    image: 'https://picsum.photos/id/160/1200/800',
    gallery: [
      'https://picsum.photos/id/160/1200/800',
      'https://picsum.photos/id/161/1200/800',
      'https://picsum.photos/id/162/1200/800'
    ],
    link: '#',
    caseStudy: {
      challenge: 'Usuários reclamavam da lentidão ao carregar grandes volumes de dados financeiros.',
      solution: 'Implementei renderização do lado do servidor (SSR) com Next.js e otimizei as queries. Gráficos interativos leves que não travam o navegador.',
      result: 'Tempo de carregamento reduzido de 4s para 0.8s.'
    }
  },
  {
    title: 'Velvet Store',
    category: 'E-commerce',
    year: '2023',
    description: 'Boutique online com experiência de compra personalizada.',
    tags: ['Shopify', 'React', 'AWS'],
    image: 'https://picsum.photos/id/338/1200/800',
    gallery: [
      'https://picsum.photos/id/338/1200/800',
      'https://picsum.photos/id/339/1200/800',
      'https://picsum.photos/id/340/1200/800'
    ],
    link: '#',
    caseStudy: {
      challenge: 'A plataforma anterior caía durante picos de acesso e tinha design genérico.',
      solution: 'Arquitetura "Headless", separando o visual do sistema de vendas. Liberdade total de design.',
      result: 'Aumento de 25% na conversão mobile.'
    }
  }
];

export const CASE_STUDIES = [
  {
    client: 'Nexus Fin',
    title: 'High-Performance Dashboard',
    tech: ['React', 'D3.js', 'TypeScript'],
    challenge: 'Renderização lenta de datasets complexos (>50k registros) causava travamentos no navegador dos analistas.',
    solution: 'Implementação de virtualização (windowing), memoização agressiva e Web Workers para processamento off-main-thread.',
    result: 'Tempo de interação reduzido em 90%.'
  },
  {
    client: 'Global Shop',
    title: 'Escalabilidade para E-commerce',
    tech: ['Next.js', 'Redis', 'AWS'],
    challenge: 'Infraestrutura não suportava picos de acesso repentinos, resultando em downtime durante lançamentos.',
    solution: 'Migração para arquitetura Serverless com estratégias de Edge Caching e Database Read Replicas.',
    result: 'Zero downtime na Black Friday com 5x mais tráfego.'
  },
  {
    client: 'Civic App',
    title: 'Acessibilidade em Governo Digital',
    tech: ['Vue.js', 'WCAG', 'A11y'],
    challenge: 'O portal de serviços públicos era inacessível para usuários com deficiência visual ou motora.',
    solution: 'Reconstrução completa seguindo diretrizes WCAG 2.1 AA, incluindo navegação por teclado e suporte a leitores de tela.',
    result: 'Acesso universal garantido e conformidade legal atingida.'
  }
];

export const ARCHIVE_PROJECTS = [
  {
    title: 'Neon Banking App',
    category: 'Mobile App',
    tech: 'React Native',
    image: 'https://picsum.photos/id/445/800/600',
    link: '#'
  },
  {
    title: 'Urban Mobility',
    category: 'Public Sector',
    tech: 'Vue.js',
    image: 'https://picsum.photos/id/188/800/600',
    link: '#'
  },
  {
    title: 'Alpha Health',
    category: 'MedTech',
    tech: 'Angular',
    image: 'https://picsum.photos/id/201/800/600',
    link: '#'
  },
  {
    title: 'Kroma Design System',
    category: 'Internal Tool',
    tech: 'Storybook',
    image: 'https://picsum.photos/id/3/800/600',
    link: '#'
  }
];

export const WRITING = [
  {
    title: "Otimizando React com Intersection Observer",
    date: "Mar 2024",
    readTime: "5 min",
    category: "Performance",
    link: "#"
  },
  {
    title: "Arquitetura Headless com Shopify & Next.js",
    date: "Fev 2024",
    readTime: "8 min",
    category: "Arquitetura",
    link: "#"
  },
  {
    title: "Por que uso Tailwind CSS em projetos Enterprise",
    date: "Jan 2024",
    readTime: "6 min",
    category: "CSS",
    link: "#"
  }
];

export const SKILLS = [
  { 
    title: 'Experiência do Usuário (Frontend)',
    description: 'Crio interfaces que as pessoas gostam de usar. Foco em movimentos suaves, acessibilidade e designs que funcionam em qualquer dispositivo.',
    icon: Layout,
    items: ['React.js', 'TypeScript', 'Tailwind CSS', 'Next.js'] 
  },
  { 
    title: 'Lógica e Performance (Backend)',
    description: 'Construo a "mágica" que acontece nos bastidores. Garanto que seus dados estejam seguros e que o sistema seja rápido.',
    icon: Database,
    items: ['Node.js', 'Python', 'PostgreSQL', 'API REST'] 
  },
  { 
    title: 'Estratégia Visual (Design)',
    description: 'Não apenas codifico, eu ajudo a desenhar a solução. Transformo ideias vagas em protótipos funcionais e bonitos.',
    icon: Monitor,
    items: ['Figma', 'Prototipagem', 'UI/UX Design', 'Design Systems'] 
  },
];

export const EDUCATION = [
  {
    degree: 'Bacharelado em Ciência da Computação',
    institution: 'Universidade Federal de Tecnologia',
    period: '2019 - 2023',
    description: 'Foco em Engenharia de Software e Inteligência Artificial. Graduado com honras.'
  },
  {
    degree: 'Especialização em User Experience',
    institution: 'Escola Superior de Design',
    period: '2023 - 2024',
    description: 'Aprofundamento em psicologia cognitiva e design centrado no usuário.'
  },
  {
    degree: 'Certificação Fullstack Advanced',
    institution: 'Tech Institute Global',
    period: '2022',
    description: 'Bootcamp intensivo focado em arquiteturas de microsserviços e React avançado.'
  }
];

export const CONTACT_INFO = {
  email: 'contato@seudominio.com',
  phone: '+55 (11) 99999-9999',
  location: 'São Paulo, SP - Brasil',
  whatsapp: 'https://wa.me/5511999999999',
  socials: [
    { name: 'LinkedIn', url: '#' },
    { name: 'GitHub', url: '#' },
    { name: 'Instagram', url: '#' },
  ]
};
