import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Focused Narrative */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-7 space-y-6"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold text-foreground/80 uppercase tracking-widest">Background & Focus</span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">
              Driven by vision research, grounded in neural design.
            </h2>
          </div>
          
          <div className="space-y-4 text-muted-foreground text-base leading-relaxed font-sans">
            <p>
              I am an AI Researcher and Computer Vision Engineer specializing in deep learning architectures and intelligent vision systems.
            </p>
            <p>
              My primary work focuses on Computer Vision and Neural Architecture research—exploring Kolmogorov-Arnold Networks (KAN), Mamba State Space Models, Transformers, CNNs, RNNs, Encoder-Decoder structures, and U-Net variants for medical segmentation and visual recognition. I also maintain core software development skills to build clean deployment interfaces for AI models.
            </p>
          </div>

          <div className="pt-4">
            <div className="space-y-1">
              <span className="font-display font-bold text-3xl text-foreground">BSc CSE</span>
              <p className="text-xs font-mono text-muted-foreground">United International University</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Research Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 flex justify-center"
        >
          <div className="glass-panel p-8 rounded-3xl border border-white/10 relative text-center space-y-6 bg-card/60 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-white/30">
            <div className="w-20 h-20 mx-auto rounded-full bg-white/10 text-foreground flex items-center justify-center">
              <Brain className="w-10 h-10" />
            </div>
            <h3 className="font-display text-2xl font-bold">Vision & Neural Architectures</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              Researching Mamba, KAN, Transformers, CNNs, and U-Net models for computer vision tasks.
            </p>
            <div className="pt-4 border-t border-border/40 flex justify-between items-center text-xs text-muted-foreground">
              <span className="font-mono">Available for Roles</span>
              <span className="inline-flex items-center gap-1.5 text-red-500 font-semibold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Ready
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
