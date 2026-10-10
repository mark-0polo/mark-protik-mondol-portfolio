import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, School } from 'lucide-react';
import { EDUCATION_DATA } from '@/data/portfolioData';

const iconMap = {
  GraduationCap,
  Briefcase,
  School,
};

export function Education() {
  return (
    <section id="education" className="py-24 px-6 bg-background border-t border-border/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-semibold text-foreground/80 uppercase tracking-widest">Academic & Professional Journey</span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">Education & Working Status</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {EDUCATION_DATA.map((item, index) => {
            const IconComp = iconMap[item.iconName];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-panel p-8 rounded-3xl border border-white/10 relative hover:border-white/30 transition-all duration-300 group bg-card/60"
              >
                {item.availability && (
                  <span className="absolute top-6 right-6 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                )}
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-foreground flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComp className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">{item.title}</span>
                <h3 className="font-display text-xl font-bold mt-1 mb-2 text-foreground">{item.name}</h3>
                <p className="text-sm font-medium text-foreground/80 font-sans">{item.subtitle}</p>
                <div className="mt-6 pt-6 border-t border-white/10 space-y-1">
                  <span className="text-xs font-mono text-muted-foreground block">{item.meta}</span>
                  <p className="text-xs font-mono font-semibold text-foreground/90">{item.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
