import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Interface for the props of each individual icon.
export interface IconProps {
  id: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className: string; // Used for custom positioning of the icon.
}

// Interface for the main hero component's props.
export interface FloatingIconsHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  icons: IconProps[];
}

// A single icon component with mouse repulsion motion physics
const Icon = ({
  iconData,
  index,
}: {
  iconData: IconProps;
  index: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Motion values for mouse repulsion offset
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth fluid spring physics for repulsion
  const springX = useSpring(x, { stiffness: 140, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 140, damping: 18, mass: 0.5 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const iconCenterX = rect.left + rect.width / 2;
        const iconCenterY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(e.clientX - iconCenterX, 2) + Math.pow(e.clientY - iconCenterY, 2)
        );

        // Repel when cursor comes within 180px
        if (distance < 180) {
          const angle = Math.atan2(e.clientY - iconCenterY, e.clientX - iconCenterX);
          const force = (1 - distance / 180) * 65; // Repulsion force strength
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      key={iconData.id}
      style={{
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.05,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn('absolute pointer-events-auto', iconData.className)}
    >
      {/* Inner wrapper for continuous subtle floating animation */}
      <motion.div
        className="flex items-center justify-center w-11 h-11 md:w-13 md:h-13 p-2 rounded-2xl shadow-xl bg-card/90 backdrop-blur-md border border-white/20 hover:scale-110 transition-transform duration-300 cursor-pointer"
        animate={{
          y: [0, -6, 0, 6, 0],
          x: [0, 5, 0, -5, 0],
          rotate: [0, 4, 0, -4, 0],
        }}
        transition={{
          duration: 4.5 + (index % 5),
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        <iconData.icon className="w-6 h-6 md:w-7 md:h-7 text-foreground" />
      </motion.div>
    </motion.div>
  );
};

const FloatingIconsHero = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & FloatingIconsHeroProps
>(({ className, title, subtitle, ctaText, ctaHref, icons, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={cn(
        'relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-background',
        className
      )}
      {...props}
    >
      {/* Container for background floating icons */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {icons.map((iconData, index) => (
          <Icon
            key={iconData.id}
            iconData={iconData}
            index={index}
          />
        ))}
      </div>

      {/* Foreground Content (when used directly) */}
      {title && (
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pointer-events-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-foreground via-foreground/90 to-foreground/60 text-transparent bg-clip-text">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="px-8 py-6 text-base font-semibold shadow-lg transition-all">
              <a href={ctaHref}>{ctaText}</a>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
});

FloatingIconsHero.displayName = 'FloatingIconsHero';

export { FloatingIconsHero };
