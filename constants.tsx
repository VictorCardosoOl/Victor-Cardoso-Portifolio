import { Monitor, Code, Layout, Database, Smartphone, Globe } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Início', href: '#hero' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Lab', href: '#lab' },
  { name: 'Artigos', href: '#writing' },
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
      result: 'Aumento de 300% no tempo médio de permanência na página e feedback positivo pela fluidez da navegação.',
      codeSnippet: `// Custom Intersection Observer Hook for Prefetching
const usePrefetch = (ref) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = new Image();
          img.src = entry.target.dataset.src; // Preload logic
          observer.unobserve(entry.target);
        }
      });
    });
    if (ref.current) observer.observe(ref.current);
  }, []);
};`
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
      result: 'O tempo de carregamento caiu de 4s para 0.8s, aumentando drasticamente a produtividade dos gestores.',
      codeSnippet: `// WebWorker for heavy data processing
self.onmessage = (e) => {
  const { rawData } = e.data;
  // Process 100k+ points off the main thread
  const processed = rawData.map(point => ({
    x: point.timestamp,
    y: calculateMovingAverage(point.value)
  }));
  self.postMessage(processed);
};`
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
      result: 'Zero downtime durante lançamentos e aumento de 25% na conversão de vendas mobile.',
      codeSnippet: `// Shopify Storefront API GraphQL Query
const checkoutMutation = gql\`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
\`;`
    }
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

export const CASE_STUDIES = [
  {
    client: 'Fintech Corp',
    title: 'Escalando Plataforma de Trading',
    tech: ['Rust', 'WebAssembly', 'React', 'Go'],
    challenge: 'A plataforma existente sofria com latência de microssegundos que resultava em perdas financeiras significativas.',
    solution: 'Reescrevemos o motor de correspondência em Rust e otimizamos o frontend usando WebAssembly.',
    result: 'Redução de 90% na latência e capacidade de processar 100k transações por segundo.'
  },
  {
    client: 'MediCare Systems',
    title: 'Portal Seguro de Dados de Pacientes',
    tech: ['Next.js', 'GraphQL', 'AWS Lambda', 'DynamoDB'],
    challenge: 'Necessidade de compartilhamento seguro e compatível com normas de saúde entre diferentes unidades.',
    solution: 'Arquitetura serverless com criptografia de ponta a ponta e controles de acesso granulares.',
    result: 'Aprovação em todas as auditorias de segurança e recuperação de dados em milissegundos.'
  },
  {
    client: 'EcoEnergy',
    title: 'Dashboard de Gestão de IoT',
    tech: ['Vue.js', 'D3.js', 'MQTT', 'Python'],
    challenge: 'Falta de visibilidade em tempo real da rede de energia renovável para balanceamento de carga.',
    solution: 'Dashboard em tempo real visualizando dados de milhares de sensores IoT via MQTT.',
    result: 'Melhoria de 25% na eficiência de distribuição de energia.'
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