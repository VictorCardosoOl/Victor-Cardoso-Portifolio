import { Monitor, Code, Layout, Database, Smartphone, Globe, Search, Rocket, MessageSquare, CheckCircle, Users, BarChart, BookOpen, Layers } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Obras', href: '#projects' },
  { name: 'Serviços', href: '#services' },
  { name: 'Perfil', href: '#about' },
  { name: 'Lab', href: '#lab' },
  { name: 'Contato', href: '#contact' },
];

// --- DADOS DO CURRÍCULO (Extraídos do PDF) ---
export const WORK_EXPERIENCE = [
  {
    company: "Wise System",
    role: "Supervisor de Operações",
    period: "Out 2025 - Presente",
    location: "São Paulo, Brasil",
    // DICA: Textos mais estratégicos tirados do PDF para impressionar recrutadores
    description: [
      "Liderança de Equipes Multidisciplinares: Coordenação e desenvolvimento de talentos (Feedbacks, PDIs), garantindo alinhamento cultural e metas.",
      "Interface Estratégica: Elo tático entre diretoria e operação, traduzindo metas corporativas em planos de ação executáveis.",
      "Análise e Integração Sistêmica: Revisão estrutural de código e parametrização de regras de negócio complexas (SaaS).",
      "Gestão de Performance: Monitoramento de KPIs/SLAs e otimização de fluxos para eficiência produtiva e redução de custos.",
      "Infraestrutura e Sustentação N3: Gestão de hardware e suporte especializado aos ecossistemas SIGO WEB/W3."
    ]
  },
  {
    company: "Wise System",
    role: "Analista de Suporte N2",
    period: "Abr 2025 - Out 2025",
    location: "São Paulo, Brasil",
    description: [
      "Engenharia de Requisitos: Análise estrutural de código para integração de contratos e regras de negócio.",
      "Gestão do Conhecimento: Criação de documentação técnica (KB) e manuais para mitigar dúvidas e otimizar uso das ferramentas.",
      "Implementação Sistêmica: Tradução de requisitos de clientes em soluções funcionais via parametrização.",
      "Treinamento Corporativo: Capacitação técnica de stakeholders internos e clientes (Best Practices)."
    ]
  },
  {
    company: "Wise System",
    role: "Analista de Suporte N1",
    period: "Out 2024 - Abr 2025",
    location: "São Paulo, Brasil",
    description: [
      "Análise de Código: Leitura de estrutura para introdução de regras de negócios, intermediando cliente e consumidor final.",
      "Suporte Exclusivo (Key Accounts): Gestão de back office para grandes clientes da carteira.",
      "Elaboração de Manuais: Criação de instruções detalhadas para colaboradores e clientes."
    ]
  },
  {
    company: "Wise System",
    role: "Estagiário",
    period: "Jul 2024 - Set 2024",
    location: "São Paulo, Brasil",
    description: [
      "Configuração e instalação do software SIGO W3.",
      "Resolução de problemas de software, banco de dados e servidores.",
      "Gerenciamento de filas de atendimento e backlog (SLA)."
    ]
  },
  {
    company: "InHouse Contact Center",
    role: "Back Office",
    period: "Fev 2022 - Jan 2024",
    location: "São Paulo, Brasil",
    description: [
      "Gestão administrativa e suporte operacional focado em eficiência.",
      "Análise de processos internos."
    ]
  },
  {
    company: "Freelance / Comunidade",
    role: "Instrutor de TI",
    period: "2020 - Presente",
    location: "São Paulo, Brasil",
    description: [
      "Capacitação de novos profissionais em lógica de programação e suporte técnico.",
      "Facilitação de workshops sobre ferramentas de produtividade e sistemas operacionais."
    ]
  },
  {
    company: "Alta Performance Gestão",
    role: "Auxiliar Contábil",
    period: "Set 2019 - Mar 2020",
    location: "São Paulo, Brasil",
    description: [
      "Auxílio nas rotinas contábeis e gestão empresarial."
    ]
  }
];

export const EDUCATION = [
  {
    period: 'Jan 2022 - Dez 2026',
    degree: 'Ciência da Computação (Bacharelado)',
    institution: 'Universidade Anhembi Morumbi',
    description: 'Foco em Engenharia de Software, Ciência de Dados e Algoritmos.'
  }
];

export const SKILLS = [
  {
    title: 'Engenharia & Análise',
    description: 'Capacidade de traduzir regras de negócio em código e arquitetura.',
    icon: Code,
    items: ['Análise de Sistemas', 'Integração Sistêmica', 'SQL / Banco de Dados', 'Regras de Negócio', 'Engenharia de Requisitos']
  },
  {
    title: 'Gestão & Liderança',
    description: 'Coordenação de times e otimização de processos baseada em dados.',
    icon: Users,
    items: ['Liderança de Equipes', 'Gestão de KPIs/SLAs', 'Key Account Management', 'Business Intelligence', 'PDIs & Feedbacks']
  },
  {
    title: 'Educação & Suporte',
    description: 'Transferência de conhecimento técnico e sustentação de infraestrutura.',
    icon: BookOpen,
    items: ['Treinamento Corporativo', 'Documentação Técnica', 'Suporte N2/N3', 'Gestão de Crises', 'Instalação de Hardware']
  }
];

// --- SEÇÕES DO SITE (SERVIÇOS, PROJETOS, ETC) ---
export const SERVICES = [
  {
    title: 'Consultoria de Processos & Tech',
    description: 'Unificação entre operação e tecnologia. Mapeamento de fluxos e automação para reduzir custos e erros.',
    benefit: 'Visão 360º. Eu entendo o código, mas também entendo a dor da operação e o impacto no financeiro.',
    analogy: 'Como um arquiteto que também é engenheiro civil: desenho a solução bonita, mas garanto que ela fica em pé e funciona no dia a dia.',
    icon: Layers,
    techStack: ['BPMN', 'Automation', 'Data Analysis', 'Process Mapping'],
    tags: ['Gestão', 'Processos', 'Eficiência'],
    deliverables: [
      'Mapeamento de Processos (As-Is / To-Be)',
      'Definição de KPIs e SLAs',
      'Documentação Técnica de Regras de Negócio',
      'Treinamento de Equipes'
    ]
  },
  {
    title: 'Sistemas Web (SaaS) sob Medida',
    description: 'Soluções complexas para resolver problemas de negócio específicos. Dashboards, CRMs e Portais.',
    benefit: 'Eficiência operacional. Automatize processos manuais, reduza erros humanos e tenha dados na palma da mão.',
    analogy: 'Como construir uma fábrica automatizada: você aperta um botão e o sistema faz o trabalho pesado de organização e processamento.',
    icon: Database,
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Auth', 'API Rest'],
    tags: ['Gestão', 'SaaS', 'Automação'],
    deliverables: [
      'Dashboard Administrativo',
      'Banco de Dados Seguro',
      'Autenticação de Usuários',
      'Relatórios e Gráficos'
    ]
  },
  {
    title: 'Landing Page de Alta Conversão',
    description: 'Páginas estratégicas desenhadas para transformar visitantes em leads ou compradores. Ideal para lançamentos e produtos únicos.',
    benefit: 'Aumente o retorno sobre seu investimento em anúncios (ROAS). Uma LP bem feita guia o usuário sem distrações até o botão de compra.',
    analogy: 'Imagine sua Landing Page como um vendedor de elite que trabalha 24h por dia, apresentando seu produto perfeitamente para cada cliente que entra na loja.',
    icon: Layout,
    techStack: ['React', 'Tailwind CSS', 'Framer Motion', 'SEO Técnico', 'Analytics'],
    tags: ['Vendas', 'Marketing', 'Performance'],
    deliverables: [
      'Site de página única (SPA) ultra-rápido',
      'Design persuasivo (Copywriting + UI)',
      'Integração com Pixel (Meta/Google)',
      'Formulários de captura de Lead'
    ]
  }
];

export const PROCESS_STEPS = [
  {
    title: 'Imersão',
    description: 'Entendimento profundo das regras de negócio e dores operacionais.',
    icon: Search
  },
  {
    title: 'Estratégia',
    description: 'Definição de KPIs, SLAs e arquitetura da solução.',
    icon: BarChart
  },
  {
    title: 'Execução',
    description: 'Desenvolvimento e parametrização com foco em fidelidade contratual.',
    icon: Code
  },
  {
    title: 'Sustentação',
    description: 'Treinamento, monitoramento de performance e suporte contínuo.',
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
      challenge: 'O cliente enfrentava alta latência ao carregar portfólios 4K para leads internacionais.',
      solution: 'Reescrevi a arquitetura usando Next.js com Image Optimization na borda (Edge).',
      result: 'Tempo de carregamento (LCP) reduzido de 4.2s para 0.8s.'
    }
  },
  {
    title: 'Apex Finance Dashboard',
    category: 'Fintech / Dashboard',
    year: '2023',
    description: 'Painel de controle financeiro em tempo real para traders institucionais.',
    tags: ['WebSockets', 'D3.js', 'Node.js', 'Redis'],
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800'
    ],
    link: '#',
    caseStudy: {
      challenge: 'A versão anterior sofria com "stale data" e travamentos.',
      solution: 'Implementei WebSockets para streaming de dados em tempo real.',
      result: 'Capacidade de processar 5x mais dados sem lag.'
    }
  },
  {
    title: 'Velvet E-commerce',
    category: 'Headless Commerce',
    year: '2023',
    description: 'Loja conceito para marca de luxo, focada em animações fluídas.',
    tags: ['Shopify Headless', 'Framer Motion', 'WebGL'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800'
    ],
    link: '#',
    caseStudy: {
      challenge: 'A marca desejava uma experiência de "app nativo" na web.',
      solution: 'Desenvolvi um frontend Headless usando Next.js.',
      result: 'Aumento de 25% no ticket médio.'
    }
  }
];

export const WRITING = [
  {
    title: "Documentação Técnica: Manual ou KB?",
    category: "Processos",
    link: "#",
    date: "12 Mar, 2024",
    readTime: "5 min"
  },
  {
    title: "KPIs vs SLAs: Otimizando o Suporte",
    category: "Gestão",
    link: "#",
    date: "28 Fev, 2024",
    readTime: "7 min"
  },
  {
    title: "SQL para Análise de Negócios",
    category: "Dados",
    link: "#",
    date: "15 Jan, 2024",
    readTime: "4 min"
  }
];

export const CONTACT_INFO = {
  email: 'victorcardcunha@gmail.com',
  phone: '+55 (11) 97744-0146',
  location: 'São Paulo, SP - Brasil',
  whatsapp: 'https://wa.me/5511977440146',
  socials: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/victorccunha' },
    { name: 'GitHub', url: 'https://github.com/VictorCardosoOl' },
    { name: 'Instagram', url: '#' },
  ]
};
