import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function MouseFollower() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fast precision spring for the small lead dot
  const dotX = useSpring(mouseX, { damping: 28, stiffness: 350 });
  const dotY = useSpring(mouseY, { damping: 28, stiffness: 350 });

  // Silky fluid spring for the trailing ring
  const trailX = useSpring(mouseX, { damping: 22, stiffness: 140, mass: 0.5 });
  const trailY = useSpring(mouseY, { damping: 22, stiffness: 140, mass: 0.5 });

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveMouse, { passive: true });
    return () => window.removeEventListener('mousemove', moveMouse);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Small Trailing Ring (Monochrome Glow) */}
      <motion.div
        style={{
          left: trailX,
          top: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed pointer-events-none z-50 w-5 h-5 rounded-full border border-foreground/40 bg-foreground/5 shadow-[0_0_12px_rgba(255,255,255,0.2)] hidden md:block"
      />

      {/* Leading Precision Dot */}
      <motion.div
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
