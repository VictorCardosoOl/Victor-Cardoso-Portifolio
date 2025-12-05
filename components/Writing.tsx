import React from 'react';
import { WRITING } from '../constants';
import { Reveal } from './ui/Reveal';
import { ArrowRight } from 'lucide-react';

const Writing: React.FC = () => {
  return (
    <section id="writing" className="py-24 bg-white">
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
               <a href={post.link} className="group block py-8 border-b border-slate-100 hover:bg-slate-50 transition-colors -mx-4 px-4 sm:px-8 rounded-2xl">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="md:w-1/4">
                       <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{post.date}</span>
                    </div>
                    
                    <div className="md:w-1/2">
                       <h3 className="text-xl md:text-2xl font-serif font-medium text-slate-900 mb-2 group-hover:text-indigo-900 transition-colors">
                         {post.title}
                       </h3>
                       <div className="flex gap-3 text-xs text-slate-500">
                          <span>{post.readTime} leitura</span>
                          <span>•</span>
                          <span className="font-medium text-indigo-600">{post.category}</span>
                       </div>
                    </div>
                    
                    <div className="md:w-1/4 flex justify-end">
                       <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-slate-900 group-hover:text-slate-900 transition-all group-hover:rotate-[-45deg]">
                          <ArrowRight size={18} />
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