import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Database, Eye, Layers, Terminal } from 'lucide-react';

/* --- Authentic Brand Color SVG Icons --- */

export const IconPythonColor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" {...props}>
    <path d="M11.895 2c-5.1 0-4.78 2.213-4.78 2.213l.006 2.296h4.846v.688H5.195s-3.195.361-3.195 4.75c0 4.388 2.784 4.227 2.784 4.227h1.662v-2.336s-.09-2.784 2.723-2.784h4.693s2.617.045 2.617-2.527V4.527S16.995 2 11.895 2zm-2.58 1.488a.91.91 0 110 1.822.91.91 0 010-1.822z" fill="#3776AB"/>
    <path d="M12.105 22c5.1 0 4.78-2.213 4.78-2.213l-.006-2.296H12.03v-.688h6.772s3.195-.361 3.195-4.75c0-4.388-2.784-4.227-2.784-4.227h-1.662v2.336s.09 2.784-2.723 2.784h-4.693s-2.617-.045-2.617 2.527v3.946S7.005 22 12.105 22zm2.58-1.488a.91.91 0 110-1.822a.91.91 0 010 1.822z" fill="#FFD43B"/>
  </svg>
);

export const IconPyTorchColor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" {...props}>
    <path d="M12 2L4 12l8 10 8-10L12 2z" fill="#EE4C2C" opacity="0.9"/>
    <path d="M12 6l5 6.25L12 18.5l-5-6.25L12 6z" fill="#FF7052"/>
    <circle cx="16.5" cy="7.5" r="1.5" fill="#EE4C2C"/>
  </svg>
);

export const IconKaggleColor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" {...props}>
    <path d="M18.825 23.859h-3.225l-5.61-8.544-2.82 2.61v5.934H3.72V.141h3.45v13.635L14.775.141h3.795l-6.84 8.79 7.1 14.928z" fill="#20BEFF"/>
  </svg>
);

export const IconReactColor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="2" className="w-5 h-5 shrink-0" {...props}>
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
    <circle cx="12" cy="12" r="2" fill="#61DAFB" />
  </svg>
);

export const IconDockerColor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="#2496ED" className="w-5 h-5 shrink-0" {...props}>
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.185.185 0 00.186-.186V3.575a.185.185 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm0 2.716h2.118a.185.185 0 00.186-.186V6.291a.185.185 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.956 0h2.119a.186.186 0 00.185-.186V6.291a.185.185 0 00-.185-.185H8.073a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm0-2.716h2.119a.186.186 0 00.185-.186V3.575a.185.185 0 00-.185-.185H8.073a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.955 5.432h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H5.118a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm0-2.716h2.119a.186.186 0 00.186-.186V6.291a.185.185 0 00-.186-.185H5.118a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.955 5.432h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H2.163a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zM.003 12.89c.045 1.55.518 3.018 1.488 4.238 1.83 2.302 4.678 3.498 7.644 3.498 5.617 0 10.457-3.95 11.758-9.378.106-.442.23-.974.23-1.442v-.025h-3.418a.186.186 0 00-.186.185v1.888a.185.185 0 00.186.185h2.128c-.89 3.09-3.797 5.37-7.147 5.37-2.614 0-5.068-1.41-6.425-3.69-.17-.285-.308-.588-.415-.902h-3.85a.186.186 0 00-.185.185v.185z"/>
  </svg>
);

export const IconCppColor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#00599C" strokeWidth="2.5" className="w-5 h-5 shrink-0" {...props}>
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
  </svg>
);

export const IconLinuxColor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="#FCC624" className="w-5 h-5 shrink-0" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-1-4a1 1 0 01-1-1V7a1 1 0 112 0v4a1 1 0 01-1 1z"/>
  </svg>
);

export const IconFigmaColor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" {...props}>
    <path d="M12 2a5 5 0 015 5 5 5 0 01-5 5V2z" fill="#F24E1E"/>
    <path d="M12 2a5 5 0 00-5 5 5 5 0 005 5V2z" fill="#FF7262"/>
    <path d="M12 12a5 5 0 00-5-5 5 5 0 005 5v-5z" fill="#A259FF"/>
    <path d="M12 12a5 5 0 015 5 5 5 0 01-5 5v-10z" fill="#1ABCFE"/>
    <path d="M7 17a5 5 0 005 5v-5H7z" fill="#0ACF83"/>
  </svg>
);

export const IconJavascriptColor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" {...props}>
    <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
    <path d="M6.75 18.25l1.9-1.15c.4.7.9 1.2 1.7 1.2.8 0 1.3-.4 1.3-1.1v-7.1h2.4v7.2c0 2-1.2 3.1-3.3 3.1-1.7.1-2.9-.8-3.7-2.2zm9.1-1.2l1.9 1.15c-.6 1.4-1.9 2.3-3.9 2.3-2.6 0-4.3-1.8-4.3-4.4 0-2.5 1.7-4.4 4.2-4.4 2.4 0 3.8 1.7 3.8 4.2v.5h-5.6c.1.9.8 1.6 1.9 1.6.8.1 1.4-.3 2-0.95zm-2.1-3.2c-.1-.8-.7-1.3-1.6-1.3-.9 0-1.5.5-1.7 1.3h3.3z" fill="#000000"/>
  </svg>
);

export const IconHuggingFaceColor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="#FFD21E" className="w-5 h-5 shrink-0" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4 7.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm8 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm-7.9 6.3c.3.5 1.7 2.2 3.9 2.2s3.6-1.7 3.9-2.2c.2-.3.1-.7-.2-.8-.3-.2-.7-.1-.8.2-.1.2-1.2 1.6-2.9 1.6s-2.8-1.4-2.9-1.6c-.2-.3-.5-.4-.8-.2-.3.1-.4.5-.2.8z"/>
  </svg>
);

export const IconColabColor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" {...props}>
    <path d="M16.5 6a4.5 4.5 0 00-3.6 7.2L7.5 18a4.5 4.5 0 101.8 1.8l5.4-4.8a4.5 4.5 0 101.8-9z" fill="#F9AB00"/>
    <path d="M7.5 6a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" fill="#E37400"/>
  </svg>
);

export const IconRoboflowColor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="#9900FF" className="w-5 h-5 shrink-0" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
  </svg>
);

export const IconPandasColor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" {...props}>
    <path d="M4 4h4v16H4V4zm6 0h4v16h-4V4zm6 0h4v16h-4V4z" fill="#150458"/>
    <path d="M4 10h16v4H4v-4z" fill="#E70488"/>
  </svg>
);

export const IconPhpColor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="#777BB4" className="w-5 h-5 shrink-0" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4 12h-1.5v-4H8c.8 0 1.5.7 1.5 1.5S8.8 13 8 13zm4.5 0H11v-4h1.5v4zm4.5 0h-1.5v-4H17c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"/>
  </svg>
);

export const SKILLS_LIST = [
  { cls: 'python', icon: IconPythonColor, label: 'Python', glowColor: 'hover:border-[#3776AB]/60 hover:shadow-[0_0_20px_rgba(55,118,171,0.35)]' },
  { cls: 'pytorch', icon: IconPyTorchColor, label: 'PyTorch', glowColor: 'hover:border-[#EE4C2C]/60 hover:shadow-[0_0_20px_rgba(238,76,44,0.35)]' },
  { cls: 'kaggle', icon: IconKaggleColor, label: 'Kaggle', glowColor: 'hover:border-[#20BEFF]/60 hover:shadow-[0_0_20px_rgba(32,190,255,0.35)]' },
  { cls: 'react', icon: IconReactColor, label: 'React.js', glowColor: 'hover:border-[#61DAFB]/60 hover:shadow-[0_0_20px_rgba(97,218,251,0.35)]' },
  { cls: 'docker', icon: IconDockerColor, label: 'Docker', glowColor: 'hover:border-[#2496ED]/60 hover:shadow-[0_0_20px_rgba(36,150,237,0.35)]' },
  { cls: 'cpp', icon: IconCppColor, label: 'C++', glowColor: 'hover:border-[#00599C]/60 hover:shadow-[0_0_20px_rgba(0,89,156,0.35)]' },
  { cls: 'linux', icon: IconLinuxColor, label: 'Linux', glowColor: 'hover:border-[#FCC624]/60 hover:shadow-[0_0_20px_rgba(252,198,36,0.35)]' },
  { cls: 'figma', icon: IconFigmaColor, label: 'Figma', glowColor: 'hover:border-[#F24E1E]/60 hover:shadow-[0_0_20px_rgba(242,78,30,0.35)]' },
  { cls: 'js', icon: IconJavascriptColor, label: 'JavaScript', glowColor: 'hover:border-[#F7DF1E]/60 hover:shadow-[0_0_20px_rgba(247,223,30,0.35)]' },
  { cls: 'hf', icon: IconHuggingFaceColor, label: 'Hugging Face', glowColor: 'hover:border-[#FFD21E]/60 hover:shadow-[0_0_20px_rgba(255,210,30,0.35)]' },
  { cls: 'colab', icon: IconColabColor, label: 'Google Colab', glowColor: 'hover:border-[#F9AB00]/60 hover:shadow-[0_0_20px_rgba(249,171,0,0.35)]' },
  { cls: 'roboflow', icon: IconRoboflowColor, label: 'Roboflow', glowColor: 'hover:border-[#9900FF]/60 hover:shadow-[0_0_20px_rgba(153,0,255,0.35)]' },
  { cls: 'pandas', icon: IconPandasColor, label: 'Pandas', glowColor: 'hover:border-[#E70488]/60 hover:shadow-[0_0_20px_rgba(231,4,136,0.35)]' },
  { cls: 'php', icon: IconPhpColor, label: 'PHP', glowColor: 'hover:border-[#777BB4]/60 hover:shadow-[0_0_20px_rgba(119,123,180,0.35)]' },
  { cls: 'ai', icon: Brain, label: 'Artificial Intelligence', glowColor: 'hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.35)]' },
  { cls: 'cv', icon: Eye, label: 'Computer Vision', glowColor: 'hover:border-cyan-500/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.35)]' },
  { cls: 'ml', icon: Cpu, label: 'Machine Learning', glowColor: 'hover:border-blue-500/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)]' },
  { cls: 'dl', icon: Layers, label: 'Deep Learning', glowColor: 'hover:border-pink-500/60 hover:shadow-[0_0_20px_rgba(236,72,153,0.35)]' },
  { cls: 'data', icon: Database, label: 'Data Mining', glowColor: 'hover:border-emerald-500/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.35)]' },
  { cls: 'terminal', icon: Terminal, label: 'Bash & Shell', glowColor: 'hover:border-green-500/60 hover:shadow-[0_0_20px_rgba(34,197,94,0.35)]' },
];

export function Skills() {
  return (
    <section id="expertise" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-mono font-semibold text-foreground/80 uppercase tracking-widest">Technologies & Tools</span>
        <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">Skills & Expertise</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {SKILLS_LIST.map((skill, index) => {
          const IconComp = skill.icon;
          return (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.02, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.06, y: -4 }}
              className={`glass-pill px-5 py-3 rounded-2xl flex items-center gap-3 text-sm font-semibold text-foreground border border-white/10 ${skill.glowColor || 'hover:border-white/30'} transition-all duration-300 cursor-default bg-card/60 backdrop-blur-md`}
            >
              <IconComp className="w-5 h-5 shrink-0" />
              <span className="font-sans">{skill.label}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
