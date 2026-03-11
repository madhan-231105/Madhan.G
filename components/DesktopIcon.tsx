
import React from 'react';
import { motion } from 'framer-motion';

interface DesktopIconProps {
  item: { id: string; label: string; icon: React.ReactNode };
  onClick: () => void;
  delay: number;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ item, onClick, delay }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 w-20 p-2 rounded-xl hover:bg-white/10 transition-all group pointer-events-auto"
    >
      <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-main/80 group-hover:text-accent group-hover:scale-110 group-active:scale-95 transition-all duration-300 shadow-xl border-white/10 bg-white/5">
        {React.isValidElement(item.icon) 
          ? React.cloneElement(item.icon as React.ReactElement<any>, { size: 32, strokeWidth: 1.5 }) 
          : item.icon}
      </div>
      <span className="text-[11px] font-black text-main/90 tracking-wide drop-shadow-lg px-2 py-0.5 rounded-md bg-black/5 group-hover:bg-accent group-hover:text-white transition-colors">
        {item.label}
      </span>
    </motion.button>
  );
};

export default DesktopIcon;
