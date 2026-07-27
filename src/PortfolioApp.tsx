import React, { useState, useEffect, useCallback } from 'react';
import { MouseFollower } from '@/components/portfolio/MouseFollower';
import { Navbar } from '@/components/portfolio/Navbar';
import { Hero } from '@/components/portfolio/Hero';
import { About } from '@/components/portfolio/About';
import { Education } from '@/components/portfolio/Education';
import { Skills } from '@/components/portfolio/Skills';
import { Projects } from '@/components/portfolio/Projects';
import { Certificates } from '@/components/portfolio/Certificates';
import { Contact } from '@/components/portfolio/Contact';
import { Footer } from '@/components/portfolio/Footer';
import { CvModal } from '@/components/portfolio/CvModal';
import { CV_PDF_BASE64 } from '@/data/cvData';

export default function PortfolioApp() {
  /* Theme State Management */
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
    } catch {
      return 'dark';
    }
  });

  /* CV Modal Preview State */
  const [isCvOpen, setIsCvOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const openCV = useCallback(() => {
    setIsCvOpen(true);
  }, []);

  const closeCV = useCallback(() => {
    setIsCvOpen(false);
  }, []);

  /* Guaranteed Base64 PDF Download Handler (Zero Network Request / Zero 0-Byte Failures) */
  const downloadCV = useCallback(() => {
    const link = document.createElement('a');
    link.href = CV_PDF_BASE64;
    link.download = 'Mark-Protik-Mondol-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans selection:bg-primary/20 selection:text-primary relative overflow-x-hidden">
      {/* Precision Trailing Mouse Follower */}
      <MouseFollower />

      {/* Navigation Header */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} onOpenCV={openCV} />

      {/* Main Portfolio Sections */}
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Web View & Download CV Modal */}
      <CvModal
        isOpen={isCvOpen}
        onClose={closeCV}
        onDownload={downloadCV}
      />
    </div>
  );
}
