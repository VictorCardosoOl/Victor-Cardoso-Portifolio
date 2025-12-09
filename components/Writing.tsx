
import React from 'react';
import { WRITING } from '../constants';
import { Reveal } from './ui/Reveal';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';

const Writing: React.FC = () => {
  return (
    <section id="writing" className="py-32 md:py-40 bg-white relative z-10 border-t border-slate-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <Reveal>
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 block">Knowledge Share</span>
                    <h2 className="text-4xl md:text-6xl font-serif font-medium text-slate-900">Artigos & Insights</h2>
                </div>
            </Reveal>
            <Reveal delay={100}>
                <a href="#" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 border-b border-transparent hover:border-slate-900 pb-1 transition-all">
                    Ler todos os posts
                </a>
            </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {WRITING.map((post, index) => (
             <Reveal key={index} delay={index * 100} width="100%" variant="translate">
               <a href={post.link} className="group block h-full">
                 <div className="h-full p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-slate-300 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-8">
                            <span className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                {post.category}
                            </span>
                            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-slate-900 group-hover:border-slate-900 transition-colors">
                                <ArrowUpRight size={16} />
                            </div>
                        </div>

                        <h3 className="text-2xl font-serif font-medium text-slate-900 mb-4 leading-tight group-hover:text-slate-700 transition-colors">
                            {post.title}
                        </h3>
                    </div>

                    <div className="flex items-center gap-4 pt-8 border-t border-slate-200 mt-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={14} /> {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={14} /> {post.readTime}
                        </span>
                    </div>
                 </div>
               </a>
             </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Writing;
