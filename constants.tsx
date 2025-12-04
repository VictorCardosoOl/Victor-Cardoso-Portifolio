import { Monitor, Code, Layout, Database, Smartphone, Globe } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Início', href: '#hero' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Habilidades', href: '#skills' },
  { name: 'Sobre', href: '#about' },
  { name: 'Contato', href: '#contact' },
];

export const PROJECTS = [
  {
    title: 'Lumina Architecture',
    category: 'Web Design / Desenvolvimento',
    description: 'Uma plataforma imersiva para um escritório de arquitetura premiado. O foco foi criar uma galeria visual fluida com carregamento progressivo.',
    tags: ['React', 'Framer Motion', 'Tailwind', 'Strapi'],
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
      solution: 'Desenvolvi um ambiente com transições de página (SPA) que elimina o "piscar" da tela branca, mantendo o usuário imerso. Utilizei carregamento inteligente de imagens para garantir performance.',
      result: 'Aumento de 300% no tempo médio de permanência na página e feedback positivo pela fluidez da navegação.'
    }
  },
  {
    title: 'Apex Finance Dashboard',
    category: 'SaaS / Fintech',
    description: 'Interface administrativa para gestão de ativos. Desenvolvido com foco em visualização de dados em tempo real e segurança.',
    tags: ['Next.js', 'TypeScript', 'D3.js', 'Node.js'],
    image: 'https://picsum.photos/id/160/1200/800',
    gallery: [
      'https://picsum.photos/id/160/1200/800',
      'https://picsum.photos/id/161/1200/800',
      'https://picsum.photos/id/162/1200/800'
    ],
    link: '#',
    caseStudy: {
      challenge: 'Usuários reclamavam da lentidão ao carregar grandes volumes de dados financeiros, o que prejudicava a tomada de decisão rápida.',
      solution: 'Implementei renderização do lado do servidor (SSR) com Next.js e otimizei as queries do banco de dados. Criei gráficos interativos leves que não travam o navegador.',
      result: 'O tempo de carregamento caiu de 4s para 0.8s, aumentando drasticamente a produtividade dos gestores.'
    }
  },
  {
    title: 'Velvet E-commerce',
    category: 'E-commerce / Moda',
    description: 'Loja virtual boutique com experiência de compra personalizada e gestão de estoque inteligente.',
    tags: ['Shopify Headless', 'React', 'GraphQL', 'AWS'],
    image: 'https://picsum.photos/id/338/1200/800',
    gallery: [
      'https://picsum.photos/id/338/1200/800',
      'https://picsum.photos/id/339/1200/800',
      'https://picsum.photos/id/340/1200/800'
    ],
    link: '#',
    caseStudy: {
      challenge: 'A plataforma anterior caía durante picos de acesso (Black Friday) e tinha um design genérico que não refletia a marca de luxo.',
      solution: 'Criei uma arquitetura "Headless", separando o visual (React) do sistema de vendas (Shopify). Isso permitiu liberdade total de design e escalabilidade infinita.',
      result: 'Zero downtime durante lançamentos e aumento de 25% na conversão de vendas mobile.'
    }
  }
];

export const CASE_STUDIES = [
  {
    client: 'Lumina Architecture',
    title: 'Imersão Digital Arquitetônica',
    tech: ['React', 'Three.js', 'WebGL'],
    challenge: 'Traduzir a atmosfera física e sensorial dos projetos arquitetônicos para uma experiência web, mantendo alta performance em dispositivos móveis.',
    solution: 'Implementação de renderização 3D progressiva e transições de estado fluidas (SPA) para eliminar interrupções na navegação.',
    result: 'Aumento de 150% no tempo de sessão e reconhecimento internacional em galerias de web design.'
  },
  {
    client: 'Apex Finance',
    title: 'Dashboard de Trading em Tempo Real',
    tech: ['Next.js', 'WebSocket', 'D3.js'],
    challenge: 'Processar e visualizar milhares de pontos de dados financeiros por segundo sem travar a interface do usuário.',
    solution: 'Arquitetura baseada em WebWorkers para processamento de dados off-main-thread e renderização otimizada com Canvas API.',
    result: 'Latência reduzida para <50ms e capacidade de monitorar 10x mais ativos simultaneamente.'
  },
  {
    client: 'Velvet Co.',
    title: 'E-commerce de Luxo Headless',
    tech: ['Shopify Plus', 'Next.js', 'Vercel'],
    challenge: 'Superar as limitações de design das plataformas tradicionais de e-commerce para criar uma jornada de compra totalmente customizada.',
    solution: 'Desenvolvimento de frontend desacoplado (Headless) integrado via API GraphQL, permitindo total liberdade criativa e performance instantânea.',
    result: 'Taxa de conversão mobile ampliada em 40% e carregamento de página 3x mais rápido.'
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
  socials: [
    { name: 'LinkedIn', url: '#' },
    { name: 'GitHub', url: '#' },
    { name: 'Instagram', url: '#' },
  ]
};