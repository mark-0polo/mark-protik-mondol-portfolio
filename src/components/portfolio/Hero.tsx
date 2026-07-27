import React, { useEffect, useState, useRef } from 'react';
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
  start: boolean;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

/* Strict Matrix Scramble Text Reveal Component */
export function ScrambleText({ text, start, speed = 40, className = '', onComplete }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (!start) return;

    let intervalId: NodeJS.Timeout;
    let iteration = 0;

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
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          if (onComplete) onComplete();
        }
      }

      iteration += 1 / 4;
    }, speed);

    return () => {
      clearInterval(intervalId);
    };
  }, [text, start, speed, onComplete]);

  if (!start) return null;
  return <span className={className}>{isDone ? text : displayText}</span>;
}

interface TypewriterTextProps {
  text: string;
  start: boolean;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

/* Character-by-Character Typewriter Text Component for Connectors */
export function TypewriterText({ text, start, speed = 40, className = '', onComplete }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (!start) return;

    let index = 0;
    const intervalId = setInterval(() => {
      index += 1;
      setDisplayText(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(intervalId);
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          if (onComplete) onComplete();
        }
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, start, speed, onComplete]);

  if (!start) return null;
  return <span className={className}>{displayText}</span>;
}

/* Sequential Scramble & Typewriter Bio Text Container */
export function SequentialBioText() {
  const [phase, setPhase] = useState(0);

  return (
    <p className="text-base sm:text-lg md:text-2xl font-sans font-medium text-muted-foreground leading-relaxed max-w-2xl min-h-[4.5rem]">
      {/* 1. Software Engineer (Matrix Scramble) */}
      <ScrambleText
        text="Software Engineer"
        start={phase >= 0}
        speed={35}
        onComplete={() => setPhase(1)}
      />
      
      {/* 2. & (Typewriter) */}
      <TypewriterText
        text=" & "
        start={phase >= 1}
        speed={45}
        onComplete={() => setPhase(2)}
      />
      
      {/* 3. AI Researcher (Matrix Scramble) */}
      <ScrambleText
        text="AI Researcher"
        start={phase >= 2}
        speed={35}
        onComplete={() => setPhase(3)}
      />
      
      {/* 4. specializing in (Typewriter) */}
      <TypewriterText
        text=" specializing in "
        start={phase >= 3}
        speed={35}
        onComplete={() => setPhase(4)}
      />
      
      {/* 5. Computer Vision (Matrix Scramble) */}
      <ScrambleText
        text="Computer Vision"
        start={phase >= 4}
        speed={35}
        className="text-foreground font-semibold"
        onComplete={() => setPhase(5)}
      />
      
      {/* 6. and (Typewriter) */}
      <TypewriterText
        text=" and "
        start={phase >= 5}
        speed={45}
        onComplete={() => setPhase(6)}
      />
      
      {/* 7. Machine Learning. (Matrix Scramble) */}
      <ScrambleText
        text="Machine Learning."
        start={phase >= 6}
        speed={35}
        className="text-foreground font-semibold"
      />
    </p>
  );
}

/* Responsive Floating Icons: Positioned gracefully across mobile & desktop open background gaps */
const heroFloatingIcons: IconProps[] = [
  { id: 1, icon: IconPythonColor, className: 'top-[15%] left-[8%] md:top-[16%] md:left-[10%]' },
  { id: 2, icon: IconPyTorchColor, className: 'top-[26%] left-[4%] md:top-[22%] md:left-[24%]' },
  { id: 3, icon: IconDockerColor, className: 'top-[15%] right-[8%] md:top-[18%] md:right-[32%]' },
  { id: 4, icon: IconGithubSocial, className: 'top-[26%] right-[4%] md:top-[22%] md:right-[16%]' },
  { id: 5, icon: IconRoboflowColor, className: 'top-[40%] right-[8%] md:top-[38%] md:right-[12%]' },
  { id: 6, icon: IconHuggingFaceColor, className: 'bottom-[8%] right-[7%] md:top-[52%] md:right-[20%]' },
  { id: 7, icon: IconKaggleColor, className: 'top-[36%] left-[10%] md:top-[34%] md:left-[6%]' },
  { id: 8, icon: IconLinuxColor, className: 'top-[50%] left-[3%] md:top-[52%] md:left-[8%]' },
  { id: 9, icon: IconJavascriptColor, className: 'bottom-[8%] left-[7%] md:top-[74%] md:left-[14%]' },
  { id: 10, icon: IconCppColor, className: 'bottom-[3%] left-[38%] md:bottom-[4%] md:left-[34%]' },
  { id: 11, icon: IconPandasColor, className: 'hidden sm:block md:block md:bottom-[12%] md:left-[54%]' },
  { id: 12, icon: IconColabColor, className: 'bottom-[15%] right-[12%] md:bottom-[16%] md:right-[28%]' },
  { id: 13, icon: IconPhpColor, className: 'hidden sm:block md:block md:bottom-[20%] md:right-[14%]' },
  { id: 14, icon: IconReactColor, className: 'top-[36%] right-[10%] md:bottom-[10%] md:right-[4%]' },
  { id: 15, icon: Cpu as any, className: 'hidden sm:block md:block md:top-[24%] md:left-[62%]' },
  { id: 16, icon: IconFigmaColor, className: 'top-[62%] left-[4%] md:top-[64%] md:left-[2%]' },
];

export function Hero() {
  return (
    <section id="home" className="relative w-full min-h-screen pt-24 sm:pt-28 pb-16 flex flex-col justify-center overflow-hidden bg-background">
      {/* Background Floating Tech Icons with mouse repulsion interactivity */}
      <div className="absolute inset-0 w-full h-full opacity-80 sm:opacity-90 z-0">
        <FloatingIconsHero
          title=""
          subtitle=""
          ctaText=""
          ctaHref=""
          icons={heroFloatingIcons}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center md:items-start text-center md:text-left">
        
        {/* Mobile-First Centered Profile Avatar (Top position on mobile screens) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex justify-center md:hidden"
          data-profile-avatar="true"
        >
          <div className="relative group">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-white/30 to-white/10 opacity-70 blur-xl group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-1 rounded-full bg-card/80 shadow-2xl transition-transform duration-500 hover:scale-105">
              <img
                src="assets/markp.png"
                alt="Mark Protik Mondol"
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-white dark:border-white/90 shadow-2xl object-cover object-top transform-gpu antialiased"
                style={{ imageRendering: 'smooth' }}
              />
              <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-background border-2 border-white shadow-md flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Signature Image */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 flex justify-center md:justify-start w-full"
        >
          <img
            src="assets/sig2.png"
            alt="Mark Protik Mondol Signature"
            className="signature-img h-16 sm:h-20 md:h-28 w-auto object-contain drop-shadow-md mx-auto md:mx-0"
          />
        </motion.div>

        {/* Pure Monochrome Bold Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1 w-full"
        >
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.9] text-foreground">
            Mark Protik
          </h1>
          
          {/* MONDOL with animated back-and-forth pill box inline with bottom baseline */}
          <div className="flex flex-wrap items-baseline justify-center md:justify-start gap-2 sm:gap-3 md:gap-5">
            <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.9] text-foreground/80">
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
              className="inline-block w-7 h-7 sm:w-12 sm:h-12 md:w-16 md:h-14 rounded-2xl md:rounded-3xl bg-foreground/20 backdrop-blur-md border border-white/20 shadow-lg align-baseline self-end mb-1 md:mb-3 shrink-0"
            />
          </div>
        </motion.div>

        {/* Desktop Sideways Profile Picture & Bio Layout */}
        <div className="mt-8 md:mt-12 grid md:grid-cols-12 gap-8 items-center w-full">
          
          {/* Bio Text & High-Contrast Buttons */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8 space-y-6 flex flex-col items-center md:items-start"
          >
            {/* Strict Sequential Scramble Text Container */}
            <SequentialBioText />

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 pt-2 w-full">
              <Button asChild size="lg" className="px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-bold rounded-full bg-foreground hover:bg-foreground/90 text-background shadow-lg transition-all duration-300 hover:scale-105">
                <a href="#contact" className="flex items-center gap-2">
                  Get In Touch
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold rounded-full border-foreground/30 text-foreground bg-transparent hover:bg-foreground hover:text-background shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105"
              >
                <a href="#projects">Explore Selected Work</a>
              </Button>
            </div>
          </motion.div>

          {/* Desktop Sideways Round Profile Avatar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex md:col-span-4 justify-end"
            data-profile-avatar="true"
          >
            <div className="relative group">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-white/30 to-white/10 opacity-70 blur-xl group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-1 rounded-full bg-card/80 shadow-2xl transition-transform duration-500 hover:scale-105">
                <img
                  src="assets/markp.png"
                  alt="Mark Protik Mondol"
                  className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-white dark:border-white/90 shadow-2xl object-cover object-top transform-gpu antialiased"
                  style={{ imageRendering: 'smooth' }}
                />
                <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-background border-2 border-white shadow-md flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
