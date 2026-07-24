import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function MouseFollower() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isOverFormField, setIsOverFormField] = useState(false);

  // Fast precision spring for the lead dot
  const dotX = useSpring(mouseX, { damping: 28, stiffness: 350 });
  const dotY = useSpring(mouseY, { damping: 28, stiffness: 350 });

  // Silky fluid spring for the trailing ring
  const trailX = useSpring(mouseX, { damping: 22, stiffness: 140, mass: 0.5 });
  const trailY = useSpring(mouseY, { damping: 22, stiffness: 140, mass: 0.5 });

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (target) {
        // Detect if cursor is hovering over an input, textarea, select, or form field
        const isInput =
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable ||
          Boolean(target.closest('input, textarea, select'));

        setIsOverFormField(isInput);
      }
    };

    window.addEventListener('mousemove', moveMouse, { passive: true });
    return () => window.removeEventListener('mousemove', moveMouse);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Small Trailing Ring (Smoothly fades out over form fields) */}
      <motion.div
        animate={{
          opacity: isOverFormField ? 0 : 1,
          scale: isOverFormField ? 0.4 : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{
          left: trailX,
          top: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed pointer-events-none z-50 w-5 h-5 rounded-full border border-foreground/40 bg-foreground/5 shadow-[0_0_12px_rgba(255,255,255,0.2)] hidden md:block"
      />

      {/* Precision Lead Dot (Smoothly fades out over form fields so native I-beam text cursor is crisp) */}
      <motion.div
        animate={{
          opacity: isOverFormField ? 0 : 1,
          scale: isOverFormField ? 0.2 : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{
          left: dotX,
          top: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed pointer-events-none z-50 w-1.5 h-1.5 rounded-full bg-foreground shadow-[0_0_8px_rgba(255,255,255,0.6)] hidden md:block"
      />
    </>
  );
}
