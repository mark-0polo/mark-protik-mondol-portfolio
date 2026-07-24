import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, CheckCircle2 } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto border-t border-border/40">
      <div className="grid md:grid-cols-12 gap-12 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-7 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-mono font-semibold text-foreground uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            About Me
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">
            Combining research rigor with <span className="text-foreground/80 underline decoration-white/20 underline-offset-8">scalable software solutions</span>.
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed font-sans">
            I am Mark Protik Mondol, a software engineer and AI researcher. My work combines machine learning models and computer vision pipelines to build efficient, practical applications.
          </p>

          <div className="space-y-3">
            {[
              'Software engineering with high-performance C++, Python, and React',
              'Computer Vision research (ConvNeXt, YOLO, Supervised Contrastive Learning)',
              'Applied Machine Learning and Deep Neural Network architectures',
              'Building intelligent applications that bridge theory with product usability'
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/10 text-foreground flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-muted-foreground text-base font-sans">{point}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 flex justify-center"
        >
          <div className="glass-panel p-8 rounded-3xl border border-white/10 relative text-center space-y-6 bg-card/60 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-white/30">
            <div className="w-20 h-20 mx-auto rounded-full bg-white/10 text-foreground flex items-center justify-center">
              <Brain className="w-10 h-10" />
            </div>
            <h3 className="font-display text-2xl font-bold">Research meets Product</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              Focused on user interfaces, computer vision systems, and efficient AI algorithms.
            </p>
            <div className="pt-4 border-t border-border/40 flex justify-between items-center text-xs text-muted-foreground">
              <span className="font-mono">Available for Roles</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Ready
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
