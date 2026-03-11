
import React, { useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  displayOverlayContent?: boolean;
  overlayContent?: React.ReactNode;
}

const TiltedCard: React.FC<TiltedCardProps> = ({
  imageSrc,
  altText = "",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "300px",
  imageHeight = "300px",
  imageWidth = "300px",
  rotateAmplitude = 12,
  scaleOnHover = 1.1,
  showTooltip = true,
  displayOverlayContent = false,
  overlayContent = null
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Springs for smooth movement
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(y, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Convert mouse position to a range between -0.5 and 0.5
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div 
      className="relative flex items-center justify-center perspective-[1000px]"
      style={{ width: 'auto', height: 'auto' }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          width: imageWidth,
          height: imageHeight
        }}
        whileHover={{ scale: scaleOnHover }}
        className="relative rounded-[32px] overflow-hidden shadow-2xl cursor-pointer group bg-slate-900/50"
      >
        <img 
          src={imageSrc} 
          alt={altText} 
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: "translateZ(0px)" }}
        />

        {displayOverlayContent && overlayContent && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]"
            style={{ transform: "translateZ(40px)" }}
          >
            <div className="text-white text-center p-4">
              {overlayContent}
            </div>
          </div>
        )}

        {showTooltip && captionText && (
          <div 
            className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
            style={{ transform: "translateZ(60px)" }}
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-xl text-white text-[10px] font-black text-center uppercase tracking-[0.25em]">
              {captionText}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TiltedCard;
