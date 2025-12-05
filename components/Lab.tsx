import React, { useEffect, useState } from 'react';
import { Github, Star, GitFork, ArrowUpRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  forks_count: number;
}

const Lab: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch repositories from a prominent user (e.g., vercel or facebook) for demo purposes
    // In production, replace 'vercel' with your username
    fetch('https://api.github.com/users/vercel/repos?sort=updated&per_page=4')
      .then(res => res.json())
      .then(data => {
        setRepos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch repos", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="lab" className="py-24 relative bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <Reveal>
            <div>
               <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block">Open Source</span>
               <h2 className="text-4xl font-serif font-medium text-slate-900">Lab & Experimentos</h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 hover:text-slate-600 transition-colors">
              <Github size={18} /> Ver Github Completo
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
             Array.from({ length: 4 }).map((_, i) => (
               <div key={i} className="h-48 bg-slate-200 rounded-3xl animate-pulse"></div>
             ))
          ) : (
             repos.slice(0, 4).map((repo, index) => (
                <Reveal key={repo.id} delay={index * 100} width="100%">
                   <a 
                     href={repo.html_url} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="block p-6 bg-white rounded-3xl border border-slate-200 hover:border-slate-400 hover:shadow-lg transition-all duration-300 h-full flex flex-col group"
                   >
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-slate-100 rounded-full text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                           <Github size={20} />
                        </div>
                        <ArrowUpRight size={16} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                      </div>
                      
                      <h3 className="font-bold text-slate-900 mb-2 truncate pr-4">{repo.name}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-6 flex-grow leading-relaxed">
                        {repo.description || "Sem descrição disponível."}
                      </p>
                      
                      <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-auto pt-4 border-t border-slate-100">
                         {repo.language && (
                           <span className="flex items-center gap-1">
                             <span className="w-2 h-2 rounded-full bg-indigo-500"></span> {repo.language}
                           </span>
                         )}
                         <span className="flex items-center gap-1">
                           <Star size={12} /> {repo.stargazers_count}
                         </span>
                      </div>
                   </a>
                </Reveal>
             ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Lab;