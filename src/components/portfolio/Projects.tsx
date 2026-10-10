import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS_DATA } from '@/data/portfolioData';
import { IconGithubSocial } from './Navbar';

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-muted/20 border-y border-border/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-semibold text-foreground/80 uppercase tracking-widest">Selected Work</span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">Projects & Research</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between group bg-card/60"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-mono font-semibold text-foreground/70 uppercase tracking-wider">{project.tag}</span>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-full hover:bg-white/10"
                      title="View GitHub Repository"
                    >
                      <IconGithubSocial className="w-4 h-4" />
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <h3 className="font-display text-2xl font-bold group-hover:text-foreground transition-colors">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center justify-between gap-2"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed font-sans">{project.body}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/10 text-foreground font-medium font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
