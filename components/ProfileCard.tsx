
import React, { useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface ProfileCardProps {
  isMobile?: boolean;
  isTablet?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ isMobile, isTablet }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Spring config for smooth tilt physics
  const springConfig = { damping: 20, stiffness: 150 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  // Rotation transforms (Desktop only for immersive 3D effect)
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Only apply tilt on desktop
    if (!cardRef.current || isMobile || isTablet) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isDesktop = !isMobile && !isTablet;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isDesktop ? rotateX : 0,
        rotateY: isDesktop ? rotateY : 0,
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
      className={`
        w-full glass relative select-none overflow-hidden transition-all duration-700
        flex items-center
        ${isDesktop 
          ? 'flex-row max-w-4xl p-16 rounded-3xl gap-16' 
          : isTablet 
            ? 'flex-col max-w-xl p-12 rounded-[44px] gap-10 text-center' 
            : 'flex-col max-w-[340px] p-8 rounded-[32px] gap-8 text-center'
        }
        border-white/10 shadow-2xl
      `}
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent -z-10 pointer-events-none" />
      
      {/* Profile Image with Elevation */}
      <motion.div 
        style={{ transform: isDesktop ? "translateZ(60px)" : "none" }}
        className="relative shrink-0"
      >
        <div className="absolute -inset-12 bg-accent/25 rounded-full blur-[90px] opacity-30 pointer-events-none" />
        <img 
          src="https://picsum.photos/seed/madhan/400/400" 
          alt="Profile" 
          className={`
            relative object-cover border-4 border-white/10 shadow-2xl transition-all duration-500
            ${isDesktop ? 'w-56 h-56 rounded-3xl' : isMobile ? 'w-36 h-36 rounded-[40px]' : 'w-52 h-52 rounded-[48px]'}
          `}
        />
      </motion.div>

      {/* Content Section with Vertical Rhythm */}
      <motion.div 
        style={{ transform: isDesktop ? "translateZ(40px)" : "none" }}
        className={`flex-1 flex flex-col ${isDesktop ? 'text-left items-start' : 'text-center items-center'}`}
      >
        <div className="w-full space-y-4 md:space-y-6">
          <div className="space-y-1">
            <h1 className={`
              font-black tracking-tighter text-main 
              ${isMobile ? 'text-[36px] leading-tight' : isDesktop ? 'text-6xl lg:text-7xl' : 'text-5xl md:text-6xl'}
            `}>
              Madhan G
            </h1>
            <p className={`
              text-accent font-bold tracking-tight
              ${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'}
            `}>
              Full-Stack Engineer
            </p>
          </div>

          <p className={`
            text-secondary leading-relaxed font-medium opacity-70 mx-auto md:mx-0
            ${isMobile ? 'text-[14px] max-w-[280px]' : isDesktop ? 'text-[17px] max-w-md' : 'text-lg max-w-sm'}
          `}>
            Pioneering fluid digital experiences through intentional design and robust full-stack engineering. I build systems that bridge the gap between aesthetics and performance.
          </p>
          
          <div className={`pt-4 md:pt-6 flex flex-col sm:flex-row gap-4 w-full ${isDesktop ? 'justify-start' : 'justify-center'}`}>
            <div className="px-8 py-3.5 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] bg-black/5 dark:bg-white/[0.08] border border-black/5 dark:border-white/10 text-main shadow-lg backdrop-blur-md transition-all">
              Available for work
            </div>
            <div className="px-8 py-3.5 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] border-2 border-accent text-accent bg-transparent hover:bg-accent/10 transition-all cursor-pointer active:scale-95">
              Based in SF
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileCard;
