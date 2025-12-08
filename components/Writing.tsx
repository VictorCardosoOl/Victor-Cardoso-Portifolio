
import React from 'react';
import { WRITING } from '../constants';
import { Reveal } from './ui/Reveal';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

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

        <div className="flex flex-col">
          {WRITING.map((post, index) => (
             <Reveal key={index} width="100%">
               <a href={post.link} className="group block py-10 border-b border-slate-100 transition-all hover:bg-slate-50/50 -mx-4 px-4 sm:px-8 rounded-3xl relative overflow-hidden">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    
                    {/* Date Block */}
                    <div className="md:w-1/6">
                       <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-600 transition-colors">
                          <Calendar size={14} />
                          <span className="text-xs font-bold uppercase tracking-widest">{post.date}</span>
                       </div>
                    </div>
                    
                    {/* Content Block */}
                    <div className="md:w-3/5">
                       <h3 className="text-2xl md:text-3xl font-serif font-medium text-slate-900 mb-3 group-hover:text-indigo-900 transition-colors">
                         {post.title}
                       </h3>
                       <div className="flex gap-4 text-xs text-slate-500 items-center">
                          <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime} leitura</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider text-[10px]">{post.category}</span>
                       </div>
                    </div>
                    
                    {/* Action Block */}
                    <div className="md:w-1/6 flex md:justify-end">
                       <div className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg transform group-hover:scale-110">
                          <ArrowRight size={20} className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                       </div>
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
