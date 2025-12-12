
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
    category: 'Plataforma Institucional',
    year: '2024',
    description: 'Solução digital completa para escritório de arquitetura, focada em captação de clientes de alto padrão.',
    tags: ['React', 'SEO Técnico', 'Lead Generation'],
    image: 'https://picsum.photos/id/10/1200/800',
    gallery: [
      'https://picsum.photos/id/10/1200/800',
      'https://picsum.photos/id/11/1200/800',
      'https://picsum.photos/id/12/1200/800',
      'https://picsum.photos/id/13/1200/800'
    ],
    link: '#',
    caseStudy: {
      challenge: 'O cliente possuía um portfólio em PDF difícil de atualizar e que não indexava no Google, perdendo oportunidades orgânicas.',
      solution: 'Desenvolvi um CMS personalizado (Painel Administrativo) onde o próprio arquiteto atualiza os projetos. Otimização técnica de SEO para termos locais.',
      result: 'Primeira página do Google em 3 meses e aumento de 40% nos pedidos de orçamento.'
    }
  },
  {
    title: 'Apex Finance',
    category: 'SaaS / Dashboard',
    year: '2023',
    description: 'Sistema de gestão financeira para pequenas empresas, substituindo planilhas complexas de Excel.',
    tags: ['Node.js', 'Automação', 'SaaS'],
    image: 'https://picsum.photos/id/160/1200/800',
    gallery: [
      'https://picsum.photos/id/160/1200/800',
      'https://picsum.photos/id/161/1200/800',
      'https://picsum.photos/id/162/1200/800'
    ],
    link: '#',
    caseStudy: {
      challenge: 'O cliente perdia horas semanais consolidando dados financeiros manualmente, gerando erros de caixa.',
      solution: 'Plataforma centralizada com gráficos em tempo real e relatórios automáticos. Interface simplificada para usuários não-técnicos.',
      result: 'Redução de 15 horas mensais em tarefas operacionais para a equipe financeira.'
    }
  },
  {
    title: 'Velvet Store',
    category: 'E-commerce',
    year: '2023',
    description: 'Loja virtual de alta performance integrada com sistemas de pagamento e logística.',
    tags: ['Shopify Headless', 'Conversão', 'React'],
    image: 'https://picsum.photos/id/338/1200/800',
    gallery: [
      'https://picsum.photos/id/338/1200/800',
      'https://picsum.photos/id/339/1200/800',
      'https://picsum.photos/id/340/1200/800'
    ],
    link: '#',
    caseStudy: {
      challenge: 'A loja antiga travava durante picos de acesso (lançamentos) e tinha um checkout complicado, gerando abandono de carrinho.',
      solution: 'Implementação de arquitetura Headless para carregamento instantâneo. Redesenho do fluxo de checkout para compra em 3 cliques.',
      result: 'Aumento de 25% na taxa de conversão e zero quedas durante a Black Friday.'
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
    category: "Negócios",
    link: "#",
    date: "12 Mar, 2024",
    readTime: "5 min"
  },
  {
    title: "SaaS vs Planilhas",
    category: "Gestão",
    link: "#",
    date: "28 Fev, 2024",
    readTime: "7 min"
  },
  {
    title: "SEO Técnico Local",
    category: "Marketing",
    link: "#",
    date: "15 Jan, 2024",
    readTime: "4 min"
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
