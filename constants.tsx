
import { Monitor, Code, Layout, Database, Smartphone, Globe, Search, Rocket, Settings, MessageSquare, PenTool, CheckCircle } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Início', href: '#hero' },
  { name: 'Soluções', href: '#services' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Sobre', href: '#about' },
  { name: 'Artigos', href: '#writing' },
  { name: 'Contato', href: '#contact' },
];

export const SERVICES = [
  {
    title: 'Sistemas Web & Dashboards',
    description: 'Transformo processos manuais e planilhas em software de gestão eficiente. Automação, controle de dados e painéis administrativos que dão autonomia ao seu negócio.',
    icon: Database,
    tags: ['SaaS', 'Automação', 'Gestão']
  },
  {
    title: 'Landing Pages de Alta Conversão',
    description: 'Páginas desenvolvidas para vender. Foco total em velocidade de carregamento (SEO), design persuasivo e integração direta com suas ferramentas de marketing.',
    icon: Rocket,
    tags: ['Vendas', 'Performance', 'SEO']
  },
  {
    title: 'Otimização & Performance',
    description: 'Seu site está lento? Clientes desistem se a página demora mais de 3 segundos. Faço auditoria técnica e otimização para recuperar essas vendas perdidas.',
    icon: Settings,
    tags: ['Speed', 'Audit', 'Core Web Vitals']
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

export const ARCHIVE_PROJECTS = [
  {
    title: 'Neon Banking App',
    category: 'Fintech Mobile',
    tech: 'React Native',
    image: 'https://picsum.photos/id/445/800/600',
    link: '#'
  },
  {
    title: 'Urban Mobility',
    category: 'Gestão de Frotas',
    tech: 'Vue.js Dashboard',
    image: 'https://picsum.photos/id/188/800/600',
    link: '#'
  },
  {
    title: 'Alpha Health',
    category: 'Agendamento Médico',
    tech: 'Angular / Node',
    image: 'https://picsum.photos/id/201/800/600',
    link: '#'
  },
  {
    title: 'Kroma Design System',
    category: 'Ferramenta Interna',
    tech: 'Storybook',
    image: 'https://picsum.photos/id/3/800/600',
    link: '#'
  }
];

export const EDUCATION = [
  {
    period: '2019 - 2023',
    degree: 'Ciência da Computação',
    institution: 'Universidade de São Paulo (USP)',
    description: 'Ênfase em Engenharia de Software e Inteligência Artificial. Participação em grupos de pesquisa focados em sistemas distribuídos.'
  },
  {
    period: '2022',
    degree: 'Full Stack Web Development',
    institution: 'Le Wagon',
    description: 'Bootcamp intensivo focado em desenvolvimento de produtos digitais com Ruby on Rails, React e prototipagem.'
  }
];

export const WRITING = [
  {
    title: "Como um site lento custa dinheiro para sua empresa",
    date: "Mar 2024",
    readTime: "5 min",
    category: "Negócios",
    link: "#"
  },
  {
    title: "SaaS vs Planilhas: Quando migrar sua operação?",
    date: "Fev 2024",
    readTime: "8 min",
    category: "Gestão",
    link: "#"
  },
  {
    title: "A importância do SEO Técnico para negócios locais",
    date: "Jan 2024",
    readTime: "6 min",
    category: "Marketing",
    link: "#"
  }
];

export const SKILLS = [
  { 
    title: 'Desenvolvimento Frontend',
    description: 'Interfaces rápidas, responsivas e focadas na experiência do seu cliente. O site funciona perfeitamente no celular e no computador.',
    icon: Layout,
    items: ['React.js', 'Next.js', 'Tailwind CSS', 'Mobile First'] 
  },
  { 
    title: 'Soluções Backend & API',
    description: 'A inteligência por trás do sistema. Integrações com pagamentos, gestão de banco de dados e segurança da informação.',
    icon: Database,
    items: ['Node.js', 'API Integrações', 'PostgreSQL', 'Segurança'] 
  },
  { 
    title: 'Estratégia & Design',
    description: 'Mais que código, entrego o produto visual. Prototipagem e estratégia de usuário para garantir que o sistema seja fácil de usar.',
    icon: Monitor,
    items: ['UI/UX Design', 'Figma', 'Prototipagem', 'Arquitetura de Info'] 
  },
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
