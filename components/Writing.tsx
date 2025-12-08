
import React from 'react';
import { WRITING } from '../constants';
import { Reveal } from './ui/Reveal';
import { ArrowUpRight, Calendar, Clock, Tag } from 'lucide-react';

const Writing: React.FC = () => {
  return (
    <section id="writing" className="py-24 bg-white relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <Reveal>
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block">Insights</span>
            <h2 className="text-4xl font-serif font-medium text-slate-900">Artigos & Pensamentos</h2>
          </div>
        </Reveal>

        <div className="flex flex-col space-y-2">
          {WRITING.map((post, index) => (
             <Reveal key={index} width="100%">
               <a href={post.link} className="group block p-6 sm:p-8 rounded-3xl border border-transparent hover:border-slate-200 hover:bg-slate-50/80 transition-all duration-300">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    {/* Date Block */}
                    <div className="md:w-1/6">
                       <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-600 transition-colors duration-300">
                          <Calendar size={14} />
                          <span className="text-xs font-bold uppercase tracking-widest">{post.date}</span>
                       </div>
                    </div>
                    
                    {/* Content Block */}
                    <div className="md:w-3/5">
                       <h3 className="text-2xl font-serif font-medium text-slate-900 mb-3 group-hover:text-indigo-900 transition-colors duration-300">
                         {post.title}
                       </h3>
                       <div className="flex flex-wrap gap-4 text-xs text-slate-500 items-center">
                          <span className="flex items-center gap-1.5 font-medium group-hover:text-slate-700 transition-colors">
                            <Clock size={12} /> {post.readTime} leitura
                          </span>
                          
                          {/* Category Badge */}
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-slate-200 transition-all duration-300">
                             <Tag size={10} className="text-slate-400 group-hover:text-indigo-500" />
                             <span className="font-bold uppercase tracking-wider text-[10px] text-slate-600">
                               {post.category}
                             </span>
                          </div>
                       </div>
                    </div>
                    
                    {/* Action Block */}
                    <div className="md:w-1/6 flex md:justify-end items-center">
                       <div className="w-12 h-12 rounded-full border border-slate-100 bg-white flex items-center justify-center text-slate-300 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all duration-300 shadow-sm group-hover:shadow-md">
                          <ArrowUpRight size={20} className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                       </div>
                    </div>
                 </div>
               </a>
             </Reveal>
          ))}
        </div>
        
        {/* View All Link (Optional) */}
        <Reveal delay={200}>
            <div className="mt-12 text-center md:text-left">
                <a href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors border-b border-transparent hover:border-slate-900 pb-0.5">
                    Ver todos os artigos <ArrowUpRight size={12} />
                </a>
            </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Writing;
