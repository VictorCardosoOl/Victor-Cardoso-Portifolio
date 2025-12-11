import React, { useState } from 'react';
import { WRITING } from '../constants';
import { Reveal } from './ui/Reveal';
import { ArrowUpRight, Calendar, Clock, BookOpen } from 'lucide-react';
import ContentModal from './ui/ContentModal';

const Writing: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<typeof WRITING[0] | null>(null);

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
               <div 
                 onClick={() => setSelectedArticle(post)}
                 className="group block h-full cursor-pointer"
               >
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
               </div>
             </Reveal>
          ))}
        </div>

        {/* Modal de Leitura */}
        <ContentModal
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          title={selectedArticle?.title}
          category="Artigo"
        >
           {selectedArticle && (
             <div className="max-w-3xl mx-auto px-6 md:px-12 py-16">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400 mb-8 pb-8 border-b border-slate-100">
                   <span className="flex items-center gap-2"><Calendar size={14}/> {selectedArticle.date}</span>
                   <span className="flex items-center gap-2"><Clock size={14}/> {selectedArticle.readTime} de leitura</span>
                   <span className="px-2 py-1 bg-slate-100 rounded text-slate-600">{selectedArticle.category}</span>
                </div>

                <div className="prose prose-slate prose-lg max-w-none">
                   <p className="lead text-2xl font-serif text-slate-700 italic mb-8">
                     "Este é um parágrafo introdutório simulado para demonstrar a tipografia do modal de leitura. O conteúdo real do artigo seria carregado aqui."
                   </p>
                   
                   <p>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                   </p>
                   
                   <h3>A Importância da Estratégia</h3>
                   <p>
                     Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                   </p>

                   <figure className="my-10">
                      <div className="aspect-video bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400">
                         <BookOpen size={48} />
                      </div>
                      <figcaption className="text-center text-sm text-slate-400 mt-4 italic">Ilustração conceitual do tópico abordado.</figcaption>
                   </figure>

                   <h3>Conclusão</h3>
                   <p>
                     Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                   </p>
                </div>

                <div className="mt-16 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 text-center">
                   <h4 className="text-lg font-serif font-medium text-slate-900 mb-2">Gostou deste artigo?</h4>
                   <p className="text-slate-500 mb-6 text-sm">Compartilhe conhecimento ou entre em contato para discutirmos mais.</p>
                   <button className="px-6 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold uppercase tracking-widest hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all">
                      Copiar Link
                   </button>
                </div>
             </div>
           )}
        </ContentModal>

      </div>
    </section>
  );
};

export default Writing;