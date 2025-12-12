
import { Monitor, Code, Layout, Database, Smartphone, Globe, Search, Rocket, Settings, MessageSquare, PenTool, CheckCircle } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Obras', href: '#projects' },
  { name: 'Expertise', href: '#services' },
  { name: 'Perfil', href: '#about' },
  { name: 'Lab', href: '#lab' },
  { name: 'Contato', href: '#contact' },
];

export const SERVICES = [
  {
    title: 'Engenharia de Software',
    description: 'Desenvolvimento de aplicações web robustas e escaláveis. Transformo processos manuais e planilhas em software de gestão eficiente, com foco total em estabilidade e segurança.',
    icon: Database,
    techStack: ['React / Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Docker', 'AWS'],
    tags: ['SaaS', 'Automação', 'Gestão']
  },
  {
    title: 'Design & Interface',
    description: 'Criação de experiências digitais memoráveis. Não apenas desenho telas, projeto jornadas de usuário que convertem e retêm clientes, utilizando princípios de psicologia cognitiva.',
    icon: Layout,
    techStack: ['Figma', 'UI/UX Strategy', 'Design Systems', 'Prototipagem', 'Micro-interactions'],
    tags: ['UI/UX', 'Design System', 'Produto']
  },
  {
    title: 'Performance & SEO',
    description: 'Otimização técnica profunda. Sites lentos perdem dinheiro. Faço auditoria completa de Core Web Vitals e implemento estratégias de SEO Técnico para garantir visibilidade orgânica.',
    icon: Rocket,
    techStack: ['SEO Técnico', 'Core Web Vitals', 'Analytics', 'Conversion Rate Optimization'],
    tags: ['Speed', 'Audit', 'Growth']
  }
];

export const PROCESS_STEPS = [
  {
    title: 'Descoberta',
    description: 'Entendo o seu modelo de negócio, dores e objetivos. Não escrevo uma linha de código sem saber onde você quer chegar.',
    icon: Search
  },
  {
    title: 'Estratégia & Design',
    description: 'Definimos a arquitetura da solução e o visual. Você aprova o protótipo antes do desenvolvimento começar.',
    icon: PenTool
  },
  {
    title: 'Desenvolvimento',
    description: 'Construção utilizando tecnologias modernas (React/Node) garantindo segurança, velocidade e escalabilidade.',
    icon: Code
  },
  {
    title: 'Entrega & Suporte',
    description: 'Treinamento para uso da plataforma e garantia técnica. Não te abandono após a entrega.',
    icon: CheckCircle
  }
];

export const PROJECTS = [
  {
    title: 'Lumina Architecture',
    category: 'SaaS / Plataforma',
    year: '2024',
    description: 'Sistema completo de gestão de ativos digitais para arquitetos, incluindo renderização na nuvem e vitrine de projetos.',
    tags: ['Next.js 14', 'AWS S3', 'Stripe Connect', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfe1?auto=format&fit=crop&q=80&w=800'
    ],
    link: '#',
    caseStudy: {
      challenge: 'O cliente enfrentava alta latência ao carregar portfólios 4K para leads internacionais, resultando em uma taxa de rejeição de 65%. O sistema antigo em WordPress não suportava uploads concorrentes.',
      solution: 'Reescrevi a arquitetura usando Next.js com Image Optimization na borda (Edge). Implementei uploads diretos para S3 com presigned URLs para remover a carga do servidor principal.',
      result: 'Tempo de carregamento (LCP) reduzido de 4.2s para 0.8s. A taxa de conversão de leads aumentou 40% no primeiro mês.'
    }
  },
  {
    title: 'Apex Finance Dashboard',
    category: 'Fintech / Dashboard',
    year: '2023',
    description: 'Painel de controle financeiro em tempo real para traders institucionais, processando milhares de eventos por segundo.',
    tags: ['WebSockets', 'D3.js', 'Node.js', 'Redis'],
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=800'
    ],
    link: '#',
    caseStudy: {
      challenge: 'A versão anterior sofria com "stale data" (dados obsoletos) e travamentos do navegador ao renderizar gráficos complexos de candlestick com mais de 10.000 pontos.',
      solution: 'Implementei WebSockets para streaming de dados em tempo real e utilizei Canvas API ao invés de SVG para renderização dos gráficos, liberando a thread principal do navegador.',
      result: 'Capacidade de processar 5x mais dados sem lag. A satisfação do usuário (NPS) subiu de 40 para 85.'
    }
  },
  {
    title: 'Velvet E-commerce',
    category: 'Headless Commerce',
    year: '2023',
    description: 'Loja conceito para marca de luxo, focada em animações fluídas e experiência de compra imersiva.',
    tags: ['Shopify Headless', 'Framer Motion', 'WebGL'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800'
    ],
    link: '#',
    caseStudy: {
      challenge: 'A marca desejava uma experiência de "app nativo" na web, com transições de página sem refresh, mas precisava manter o SEO forte do Shopify.',
      solution: 'Desenvolvi um frontend Headless usando Next.js. Implementei transições de "Shared Element" nas imagens de produtos e carregamento preditivo de páginas.',
      result: 'Zero "layout shift" (CLS). Aumento de 25% no ticket médio devido à fluidez da experiência de "Add to Cart".'
    }
  }
];

export const SKILLS = [
  {
    title: 'Engenharia Frontend',
    description: 'Construção de interfaces pixel-perfect com atenção obsessiva aos detalhes e animações.',
    icon: Monitor,
    items: ['React / Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'WebGL']
  },
  {
    title: 'Backend & DevOps',
    description: 'Arquiteturas seguras e escaláveis para garantir que seu produto cresça sem dores.',
    icon: Database,
    items: ['Node.js', 'PostgreSQL', 'Docker', 'AWS', 'CI/CD']
  },
  {
    title: 'Product Design',
    description: 'Visão holística do produto, garantindo que o design sirva aos objetivos de negócio.',
    icon: PenTool,
    items: ['Figma', 'Design Systems', 'UX Research', 'Prototyping', 'Accessibility']
  }
];

export const EDUCATION = [
  {
    period: '2019 - 2023',
    degree: 'Ciência da Computação',
    institution: 'Universidade de São Paulo (USP)',
    description: 'Foco em Engenharia de Software e Sistemas Distribuídos. Monitoria em Algoritmos e Estruturas de Dados. Iniciação Científica em Inteligência Artificial.'
  },
  {
    period: '2022',
    degree: 'Full Stack Web Development',
    institution: 'Le Wagon',
    description: 'Bootcamp intensivo de 9 semanas com foco em desenvolvimento de produtos digitais, metodologias ágeis (Scrum) e trabalho colaborativo. Projeto final eleito Top 3 do batch.'
  }
];

export const WRITING = [
  {
    title: "O custo de um site lento",
    category: "Engenharia",
    link: "#",
    date: "12 Mar, 2024",
    readTime: "5 min"
  },
  {
    title: "SaaS: Monólitos vs Microserviços",
    category: "Arquitetura",
    link: "#",
    date: "28 Fev, 2024",
    readTime: "7 min"
  },
  {
    title: "SEO Técnico para SPAs",
    category: "Marketing",
    link: "#",
    date: "15 Jan, 2024",
    readTime: "4 min"
  }
];

export const CONTACT_INFO = {
  email: 'victor@exemplo.com.br',
  phone: '+55 (11) 99999-9999',
  location: 'São Paulo, SP - Brasil',
  whatsapp: 'https://wa.me/5511999999999',
  socials: [
    { name: 'LinkedIn', url: '#' },
    { name: 'GitHub', url: '#' },
    { name: 'Instagram', url: '#' },
  ]
};