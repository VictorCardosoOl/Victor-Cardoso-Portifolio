import { Monitor, Code, Layout, Database, Smartphone, Globe } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Início', href: '#hero' },
  { name: 'Serviços', href: '#services' },
  { name: 'Habilidades', href: '#skills' },
  { name: 'Sobre', href: '#about' },
  { name: 'Formação', href: '#education' },
  { name: 'Contato', href: '#contact' },
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