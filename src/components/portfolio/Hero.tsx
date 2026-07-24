import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FloatingIconsHero, IconProps } from '@/components/ui/floating-icons-hero-section';

import {
  IconPythonColor,
  IconPyTorchColor,
  IconKaggleColor,
  IconReactColor,
  IconDockerColor,
  IconCppColor,
  IconLinuxColor,
  IconFigmaColor,
  IconJavascriptColor,
  IconHuggingFaceColor,
  IconColabColor,
  IconRoboflowColor,
  IconPandasColor,
  IconPhpColor
} from './Skills';
import { IconGithubSocial } from './Navbar';

const GLYPHS = '!@#$%^&*()_+-=[]{}|;:,.<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

interface ScrambleTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

/* Sequential Matrix Scramble Text Reveal Component */
export function ScrambleText({ text, delay = 0, speed = 35, className = '' }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;
    let iteration = 0;

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) {
                return text[index];
              }
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          setIsDone(true);
          clearInterval(intervalId);
        }

        iteration += 1 / 3;
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay, speed]);

  return <span className={className}>{isDone ? text : displayText}</span>;
}

/* Naturally scattered floating icons across open inner gaps (no edge crowding, no text overlap) */
const heroFloatingIcons: IconProps[] = [
  { id: 1, icon: IconPythonColor, className: 'top-[12%] left-[10%]' },
  { id: 2, icon: IconPyTorchColor, className: 'top-[18%] left-[26%]' },
  { id: 3, icon: IconDockerColor, className: 'top-[14%] right-[38%]' },
  { id: 4, icon: IconGithubSocial, className: 'top-[18%] right-[18%]' },
  { id: 5, icon: IconRoboflowColor, className: 'top-[34%] right-[14%]' },
  { id: 6, icon: IconHuggingFaceColor, className: 'top-[48%] right-[22%]' },
  { id: 7, icon: IconKaggleColor, className: 'top-[32%] left-[6%]' },
  { id: 8, icon: IconLinuxColor, className: 'top-[52%] left-[8%]' },
  { id: 9, icon: IconJavascriptColor, className: 'top-[72%] left-[14%]' },
  { id: 10, icon: IconCppColor, className: 'bottom-[12%] left-[36%]' },
  { id: 11, icon: IconPandasColor, className: 'bottom-[10%] left-[54%]' },
  { id: 12, icon: IconColabColor, className: 'bottom-[14%] right-[32%]' },
  { id: 13, icon: IconPhpColor, className: 'bottom-[18%] right-[14%]' },
  { id: 14, icon: IconReactColor, className: 'bottom-[8%] right-[4%]' },
  { id: 15, icon: Cpu as any, className: 'top-[16%] left-[65%]' },
  { id: 16, icon: IconFigmaColor, className: 'top-[62%] left-[2%]' },
];

export function Hero() {
  return (
    <section id="home" className="relative w-full min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden bg-background">
      {/* Background Floating Tech Icons with mouse repulsion interactivity */}
      <div className="absolute inset-0 w-full h-full opacity-90 z-0">
        <FloatingIconsHero
          title=""
          subtitle=""
          ctaText=""
          ctaHref=""
          icons={heroFloatingIcons}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        
        {/* Signature Image (Theme adaptive: Crisp white on dark mode, deep dark on light mode) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <img
            src="assets/sig2.png"
            alt="Mark Protik Mondol Signature"
            className="signature-img h-20 md:h-28 w-auto object-contain drop-shadow-md"
          />
        </motion.div>

        {/* Pure Monochrome Bold Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1"
        >
          <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.9] text-foreground">
            Mark Protik
          </h1>
          
          {/* MONDOL with animated back-and-forth pill box inline with bottom baseline */}
          <div className="flex flex-wrap items-baseline gap-3 md:gap-5">
            <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.9] text-foreground/80">
              Mondol
            </h1>
            
            {/* Cute pill box dot moving smoothly back and forth horizontally */}
            <motion.span
              animate={{ x: [0, 14, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
              className="inline-block w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-14 rounded-2xl md:rounded-3xl bg-foreground/20 backdrop-blur-md border border-white/20 shadow-lg align-baseline self-end mb-1 md:mb-3 shrink-0"
            />
          </div>
        </motion.div>

        {/* Sideways Profile Picture & Bio Layout with Sequential Text Scramble Decode */}
        <div className="mt-12 grid md:grid-cols-12 gap-8 items-center">
          
          {/* Bio Text & High-Contrast Buttons */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8 space-y-6"
          >
            {/* Sequential Scramble Text Reveal */}
            <p className="text-lg md:text-2xl font-sans font-medium text-muted-foreground leading-relaxed max-w-2xl min-h-[4rem]">
              <ScrambleText text="Software Engineer" delay={400} />
              {' & '}
              <ScrambleText text="AI Researcher" delay={1100} />
              {' specializing in '}
              <ScrambleText text="Computer Vision" delay={1800} className="text-foreground font-semibold" />
              {' and '}
              <ScrambleText text="Machine Learning." delay={2500} className="text-foreground font-semibold" />
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button asChild size="lg" className="px-8 py-6 text-base font-bold rounded-full bg-foreground hover:bg-foreground/90 text-background shadow-lg transition-all duration-300 hover:scale-105">
                <a href="#contact" className="flex items-center gap-2">
                  Get In Touch
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="px-8 py-6 text-base font-semibold rounded-full border-foreground/30 text-foreground bg-transparent hover:bg-foreground hover:text-background shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105"
              >
                <a href="#projects">Explore Selected Work</a>
              </Button>
            </div>
          </motion.div>

          {/* Sideways Round Profile Avatar with White Border (Web-optimized detailed photo) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 flex justify-start md:justify-end"
          >
            <div className="relative group">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-white/30 to-white/10 opacity-70 blur-xl group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-1 rounded-full bg-card/80 shadow-2xl transition-transform duration-500 hover:scale-105">
                <img
                  src="assets/mark_profile.jpg"
                  alt="Mark Protik Mondol"
                  className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-white dark:border-white/90 shadow-2xl object-cover object-top"
                />
                <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-background border-2 border-white shadow-md flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
