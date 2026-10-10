import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { CERTIFICATES_DATA } from '@/data/portfolioData';

export function Certificates() {
  return (
    <section id="certificates" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-mono font-semibold text-foreground/80 uppercase tracking-widest">Credentials</span>
        <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">Certificates</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CERTIFICATES_DATA.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between group bg-card/60"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-foreground/70 uppercase tracking-wider">{cert.label}</span>
                <span className="text-xs text-muted-foreground font-mono">{cert.date}</span>
              </div>
              {cert.image && (
                <div className="h-10 w-auto flex items-center">
                  <img src={cert.image} alt={cert.issuer} className="max-h-8 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
              <h3 className="font-display text-lg font-semibold leading-snug">{cert.title}</h3>
              <p className="text-xs text-muted-foreground font-sans">Issued by {cert.issuer}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex justify-end">
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-foreground inline-flex items-center gap-1 hover:underline font-mono"
              >
                Verify Certificate
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
