
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WindowID } from '../types';
import WindowContent from './WindowContent';
import { NAV_ITEMS } from '../constants';
import { ChevronLeft, Maximize2, Minimize2, X } from 'lucide-react';

interface WindowProps {
  id: WindowID;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  isFocused: boolean;
  theme: 'light' | 'dark';
  zIndex: number;
  isMobile: boolean;
  isTablet: boolean;
}

const Window: React.FC<WindowProps> = ({ id, onClose, onMinimize, onFocus, isFocused, theme, zIndex, isMobile, isTablet }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const label = NAV_ITEMS.find(n => n.id === id)?.label || 'Window';

  const handleMaximize = () => {
    setIsMaximized(prev => !prev);
  };

  const mobileVariants = {
    initial: { y: '100%' },
    normal: { 
      y: 0, 
      transition: { type: 'spring' as const, damping: 35, stiffness: 400, mass: 1 } 
    },
    exit: { 
      y: '100%', 
      transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] as any } 
    }
  };

  if (isMobile) {
    return (
      <motion.div
        initial="initial"
        animate="normal"
        exit="exit"
        variants={mobileVariants}
        onPointerDown={onFocus}
        style={{ zIndex: 600 }}
        className="mobile-window fixed inset-0 flex flex-col pointer-events-auto overflow-hidden border-none rounded-t-[32px] shadow-[0_-20px_40px_rgba(0,0,0,0.5)] bg-white dark:bg-[#020617] backdrop-blur-3xl"
      >
        <div className="px-6 pt-16 pb-6 bg-black/5 dark:bg-black/20 backdrop-blur-xl border-b border-black/[0.05] dark:border-white/[0.05]">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }} 
              className="flex items-center -ml-2 gap-1 text-accent font-black active:opacity-50 transition-all"
            >
              <ChevronLeft size={28} strokeWidth={3} />
              <span className="text-[18px]">Back</span>
            </button>
          </div>
          <h2 className="text-[40px] font-black text-main tracking-tight leading-tight">{label}</h2>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-8 pb-40">
           <WindowContent id={id} />
        </div>
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-36 h-1 bg-main/20 rounded-full" />
      </motion.div>
    );
  }

  const launchTransition = { type: 'spring' as const, stiffness: 350, damping: 30, mass: 0.8 };
  const maximizeTransition = { type: 'spring' as const, stiffness: 200, damping: 25, mass: 1 };
  const genieTransition = { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } as const;

  const tabletVariants = {
    initial: { opacity: 0, scale: 0.8, y: '20vh', x: '-50%', left: '50%', top: '50%' },
    normal: { width: '88vw', height: '75vh', top: '50%', left: '50%', x: '-50%', y: '-55%', scale: 1, opacity: 1, borderRadius: 24, transition: launchTransition },
    maximized: { width: '97vw', height: 'calc(100vh - 90px)', top: '55px', left: '1.5vw', x: 0, y: 0, scale: 1, opacity: 1, borderRadius: 32, transition: maximizeTransition },
    exit: { opacity: 0, scale: 0.1, y: '100vh', transition: genieTransition }
  };

  const desktopVariants = {
    initial: { opacity: 0, scale: 0.8, y: '15vh', x: '-50%', left: '50%', top: '50%', filter: 'blur(20px)' },
    normal: { width: 1080, height: 720, top: '50%', left: '50%', x: '-50%', y: '-50%', scale: 1, opacity: 1, filter: 'blur(0px)', borderRadius: 20, transition: launchTransition },
    maximized: { width: '100vw', height: 'calc(100vh - 40px)', top: 40, left: 0, x: 0, y: 0, scale: 1, opacity: 1, filter: 'blur(0px)', borderRadius: 0, transition: maximizeTransition },
    exit: { opacity: 0, scale: 0.02, y: '100vh', x: '-50%', left: '50%', filter: 'blur(10px)', transition: genieTransition }
  };

  return (
    <motion.div 
      initial="initial"
      animate={isMaximized ? "maximized" : "normal"}
      exit="exit"
      variants={isTablet ? tabletVariants : desktopVariants}
      drag={!isMaximized}
      dragMomentum={false}
      dragElastic={0.02}
      onPointerDown={onFocus}
      layout
      style={{ zIndex: isFocused ? 400 : zIndex, position: 'fixed', transformOrigin: 'center center' }}
      className={`window pointer-events-auto flex flex-col ${isFocused ? 'active' : 'inactive'} ${isMaximized ? 'shadow-none' : 'shadow-2xl'}`}
    >
      <div className="window-titlebar flex items-center justify-center relative bg-black/5 dark:bg-black/40 backdrop-blur-3xl border-b border-black/[0.05] dark:border-white/[0.08] h-10 select-none shrink-0" onDoubleClick={handleMaximize}>
        <div className="window-controls flex gap-2 absolute left-4 group/controls" onPointerDown={(e) => e.stopPropagation()}>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }} 
            className="window-control close w-3 h-3 rounded-full flex items-center justify-center bg-[#ff5f57] border border-black/10 active:brightness-75 transition-all"
          >
            <X size={8} className="text-black/60 opacity-0 group-hover/controls:opacity-100 transition-opacity" strokeWidth={3} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }} 
            className="window-control minimize w-3 h-3 rounded-full flex items-center justify-center bg-[#febc2e] border border-black/10 active:brightness-75 transition-all"
          >
            <Minimize2 size={8} className="text-black/60 opacity-0 group-hover/controls:opacity-100 transition-opacity" strokeWidth={3} />
          </button>
          <button 
            onClick={handleMaximize} 
            className="window-control maximize w-3 h-3 rounded-full flex items-center justify-center bg-[#28c840] border border-black/10 active:brightness-75 transition-all"
          >
            <Maximize2 size={8} className="text-black/60 opacity-0 group-hover/controls:opacity-100 transition-opacity" strokeWidth={3} />
          </button>
        </div>
        <div className="window-title text-[13px] font-black text-main opacity-60 tracking-tight">{label}</div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-white/40 dark:bg-black/20">
        <motion.div layout="position" className="w-full h-full p-8 md:p-14 lg:p-16">
          <WindowContent id={id} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Window;
