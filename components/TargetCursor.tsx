
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface TargetCursorProps {
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  parallaxOn?: boolean;
}

const TargetCursor: React.FC<TargetCursorProps> = ({ 
  spinDuration = 2, 
  hideDefaultCursor = true,
  parallaxOn = true 
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for that "smooth lag" feel
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Secondary lag for parallax effect
  const lagX = useSpring(mouseX, { damping: 15, stiffness: 100 });
  const lagY = useSpring(mouseY, { damping: 15, stiffness: 100 });

  useEffect(() => {
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
      const interactiveElements = document.querySelectorAll('button, a, .cursor-target');
      interactiveElements.forEach(el => (el as HTMLElement).style.cursor = 'none');
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isOverInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.classList.contains('cursor-target');
      
      setIsHovering(!!isOverInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.style.cursor = 'auto';
    };
  }, [hideDefaultCursor, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Outer Ring */}
      <motion.div
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        className="absolute flex items-center justify-center"
      >
        <motion.div
          animate={{ 
            rotate: 360,
            scale: isHovering ? 1.5 : 1,
            borderColor: isHovering ? 'rgba(34, 211, 238, 0.8)' : 'rgba(255, 255, 255, 0.3)'
          }}
          transition={{ 
            rotate: { duration: spinDuration, repeat: Infinity, ease: "linear" },
            scale: { type: 'spring', damping: 20, stiffness: 300 }
          }}
          className="w-8 h-8 rounded-full border border-dashed border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        />
      </motion.div>

      {/* Main Target Dot */}
      <motion.div
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{ 
          scale: isHovering ? 0.5 : 1,
          backgroundColor: isHovering ? 'rgba(34, 211, 238, 1)' : 'rgba(255, 255, 255, 1)'
        }}
        className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-xl shadow-accent/50 z-10"
      />

      {/* Parallax Follower (Only if enabled) */}
      {parallaxOn && (
        <motion.div
          style={{ x: lagX, y: lagY, translateX: '-50%', translateY: '-50%' }}
          animate={{ 
            opacity: isHovering ? 0.8 : 0.3,
            scale: isHovering ? 2 : 1
          }}
          className="absolute w-4 h-4 rounded-full border border-accent/20"
        />
      )}

      {/* Crosshairs */}
      <motion.div
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: isHovering ? 0 : 0.4 }}
        className="absolute w-10 h-10 pointer-events-none"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white/50" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white/50" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-white/50" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-white/50" />
      </motion.div>
    </div>
  );
};

export default TargetCursor;
