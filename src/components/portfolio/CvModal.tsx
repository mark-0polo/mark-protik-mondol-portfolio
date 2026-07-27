import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, FileText, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export function CvModal({ isOpen, onClose, onDownload }: CvModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  /* Esc Key Listener */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(180, prev + 20));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(70, prev - 20));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-md">
          {/* Backdrop Dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          {/* Minimalist Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="relative z-10 w-full max-w-5xl h-[92vh] bg-card/95 border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Minimalist Header Control Bar */}
            <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-border/40 flex items-center justify-between gap-3 bg-background/80 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base text-foreground truncate">
                  Mark Protik Mondol — Curriculum Vitae
                </h3>
              </div>

              {/* Action Buttons: Download PDF & Close */}
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  onClick={onDownload}
                  size="sm"
                  className="px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-bold rounded-full bg-foreground hover:bg-foreground/90 text-background shadow-md transition-all duration-300 hover:scale-105 flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </Button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  title="Close Preview (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Minimalist Viewer Zoom Toolbar */}
            <div className="px-4 py-1.5 bg-muted/40 border-b border-border/30 flex items-center justify-end gap-3 text-xs font-mono text-muted-foreground shrink-0">
              <div className="flex items-center gap-1">
                <button
                  onClick={handleZoomOut}
                  className="p-1 rounded-md hover:bg-muted transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="px-2 py-0.5 rounded-md hover:bg-muted font-semibold transition-colors"
                  title="Reset Zoom"
                >
                  {zoomLevel}%
                </button>
                <button
                  onClick={handleZoomIn}
                  className="p-1 rounded-md hover:bg-muted transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-1 rounded-md hover:bg-muted transition-colors ml-1"
                  title="Fit to Screen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Rendered CV Web View Display Area */}
            <div className="flex-1 w-full overflow-auto p-4 sm:p-6 bg-slate-900/70 flex justify-center items-start">
              <div
                style={{ width: `${zoomLevel}%` }}
                className="transition-all duration-200 ease-out flex justify-center"
              >
                <img
                  src="assets/cv-page-1.png"
                  alt="Mark Protik Mondol Curriculum Vitae"
                  className="max-w-full h-auto rounded-xl shadow-2xl border border-white/10 bg-white object-contain"
                  style={{ imageRendering: 'smooth' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
