export interface Project {
    title: string;
    category: string;
    year: string;
    description: string;
    tags: string[];
    image: string;
    gallery: string[];
    link: string;
    caseStudy: {
        challenge: string;
        solution: string;
        result: string;
    };
}

export interface Service {
    title: string;
    description: string;
    benefit: string;
    analogy: string;
    icon?: any; // Lucide icon component type
    techStack: string[];
    tags: string[];
    deliverables: string[];
}

export interface Experience {
    company: string;
    role: string;
    period: string;
    location: string;
    description: string[];
}

export interface Education {
    period: string;
    degree: string;
    institution: string;
    description: string;
}

export interface SkillItem {
    title: string;
    description: string;
    icon: any;
    items: string[];
}
