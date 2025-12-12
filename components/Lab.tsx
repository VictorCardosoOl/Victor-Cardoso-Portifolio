import React, { useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Reveal } from './ui/Reveal';

interface Experiment {
  id: number;
  title: string;
  category: string;
  image: string;
  link: string;
}

const EXPERIMENTS: Experiment[] = [
    {
        id: 1,
        title: "Liquid Metal",
        category: "WebGL Shader",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=600",
        link: "https://codepen.io"
    },
    {
        id: 2,
        title: "Kinetics Type",
        category: "Interactive Design",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800&h=600",
        link: "https://codepen.io"
    },
    {
        id: 3,
        title: "Raymarching",
        category: "Creative Coding",
        image: "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?auto=format&fit=crop&q=80&w=800&h=600",
        link: "https://codepen.io"
    },
    {
        id: 4,
        title: "Generative Grid",
        category: "Algorithmic Art",
        image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=800&h=600",
        link: "https://codepen.io"
    }
];

const Lab: React.FC = () => {
  return (
    <section id="lab" className="py-24 bg-white relative border-t border-slate-100 overflow-hidden">
      
      <div className="container mx-auto px-5 md:px-12 xl:px-20 relative z-10 mb-12">
        <div className="flex justify-between items-end">
          <Reveal>
            <div>
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 block">Experimental</span>
               <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#0F172A] tracking-tight">
                 The Lab
               </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
             <div className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span>Scroll</span> <ArrowRight size={12} />
             </div>
          </Reveal>
        </div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div className="relative w-full overflow-x-auto pb-12 hide-scrollbar cursor-grab active:cursor-grabbing pl-5 md:pl-12 xl:pl-20">
         <div className="flex gap-6 md:gap-10 w-max pr-12">
             {EXPERIMENTS.map((exp, index) => (
                <div key={exp.id} className="w-[280px] md:w-[400px] flex-shrink-0 group">
                    <Reveal delay={index * 100} width="100%">
                        <a href={exp.link} target="_blank" rel="noopener noreferrer" className="block">
                            <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-100 mb-6 relative shadow-lg">
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                <img 
                                    src={exp.image} 
                                    alt={exp.title} 
                                    className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-110"
                                />
                                <div className="absolute bottom-4 right-4 z-20 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ArrowRight size={14} className="text-black" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-serif text-[#0F172A] group-hover:italic transition-all">{exp.title}</h3>
                                <span className="text-[10px] uppercase tracking-widest text-slate-400">{exp.category}</span>
                            </div>
                        </a>
                    </Reveal>
                </div>
             ))}
             {/* Spacer */}
             <div className="w-12 md:w-20"></div>
         </div>
      </div>
      
      {/* Inline styles for hiding scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Lab;