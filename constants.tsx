import { Monitor, Code, Layout, Database, Smartphone, Globe } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Início', href: '#hero' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Serviços', href: '#services' },
  { name: 'Habilidades', href: '#skills' },
  { name: 'Sobre', href: '#about' },
  { name: 'Formação', href: '#education' },
  { name: 'Contato', href: '#contact' },
];

export const PROJECTS = [
  {
    title: 'Lumina Architecture',
    category: 'Web Design / Desenvolvimento',
    description: 'Uma plataforma imersiva para um escritório de arquitetura premiado. O foco foi criar uma galeria visual fluida com carregamento progressivo de imagens e transições suaves entre páginas.',
    tags: ['React', 'Framer Motion', 'Tailwind', 'Strapi'],
    image: 'https://picsum.photos/id/10/1200/800',
    gallery: [
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/11/1200/800',
      'https://picsum.photos/id/12/1200/800',
      'https://picsum.photos/id/13/1200/800'
    ],
    link: '#'
  },
  {
    title: 'Apex Finance Dashboard',
    category: 'SaaS / Fintech',
    description: 'Interface administrativa para gestão de ativos de alta performance. Desenvolvido com foco em visualização de dados em tempo real e segurança bancária.',
    tags: ['Next.js', 'TypeScript', 'D3.js', 'Node.js'],
    image: 'https://picsum.photos/id/160/1200/800',
    gallery: [
      'https://picsum.photos/id/160/1200/800',
      'https://picsum.photos/id/161/1200/800',
      'https://picsum.photos/id/162/1200/800'
    ],
    link: '#'
  },
  {
    title: 'Velvet E-commerce',
    category: 'E-commerce / Moda',
    description: 'Loja virtual boutique com experiência de compra personalizada. Integração completa com gateway de pagamentos e sistema de gestão de estoque inteligente.',
    tags: ['Shopify Headless', 'React', 'GraphQL', 'AWS'],
    image: 'https://picsum.photos/id/338/1200/800',
    gallery: [
      'https://picsum.photos/id/338/1200/800',
      'https://picsum.photos/id/339/1200/800',
      'https://picsum.photos/id/340/1200/800'
    ],
    link: '#'
  }
];

export const SERVICES = [
  {
    title: 'Desenvolvimento Web Premium',
    description: 'Criação de websites performáticos, seguros e escaláveis utilizando as tecnologias mais modernas do mercado.',
    icon: <Monitor className="w-6 h-6" />,
  },
  {
    title: 'Design UI/UX Refinado',
    description: 'Interfaces intuitivas e elegantes que priorizam a experiência do usuário e a identidade visual da sua marca.',
    icon: <Layout className="w-6 h-6" />,
  },
  {
    title: 'Soluções Mobile',
    description: 'Aplicativos responsivos e nativos que garantem uma experiência fluida em qualquer dispositivo.',
    icon: <Smartphone className="w-6 h-6" />,
  },
  {
    title: 'Consultoria Técnica',
    description: 'Análise aprofundada e arquitetura de software para projetos complexos que exigem alta robustez.',
    icon: <Database className="w-6 h-6" />,
  },
];

export const SKILLS = [
  { category: 'Frontend', items: ['React.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Three.js'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'GraphQL', 'Docker'] },
  { category: 'Design', items: ['Figma', 'Adobe XD', 'Prototipagem', 'Design System', 'Acessibilidade'] },
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