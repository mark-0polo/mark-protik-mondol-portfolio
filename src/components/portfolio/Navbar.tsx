import React from 'react';
import { Sun, Moon, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const IconGithubSocial = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

export const IconLinkedinSocial = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onDownloadCV: () => void;
}

export function Navbar({ theme, onToggleTheme, onDownloadCV }: NavbarProps) {
  return (
    <header className="fixed top-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto glass-panel rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl border border-border/40 backdrop-blur-xl">
        <a href="#home" className="text-sm font-display font-bold tracking-tight hover:text-primary transition-colors flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          Mark Protik
        </a>
        
        <div className="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <a href="#education" className="hover:text-foreground transition-colors">Education</a>
          <a href="#expertise" className="hover:text-foreground transition-colors">Skills</a>
          <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
          <a href="#certificates" className="hover:text-foreground transition-colors">Certificates</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-3 pl-2 border-l border-border/40">
          <a
            href="https://github.com/mark-0polo"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            title="GitHub Profile"
          >
            <IconGithubSocial className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/mark-protik-mondol"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            title="LinkedIn Profile"
          >
            <IconLinkedinSocial className="w-4 h-4" />
          </a>
          <Button size="sm" variant="outline" onClick={onDownloadCV} className="hidden sm:inline-flex items-center gap-1.5 rounded-full text-xs font-semibold">
            <Download className="w-3.5 h-3.5" />
            CV
          </Button>
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
