
import React, { useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { WindowID } from '../types';
import { NAV_ITEMS } from '../constants';
import { LayoutGrid } from 'lucide-react';

interface DockProps {
  activeId: WindowID | null;
  openWindowIds: WindowID[];
  minimizedWindowIds: Set<WindowID>;
  onIconClick: (id: WindowID) => void;
  onGoHome: () => void;
  isMobile: boolean;
  isTablet: boolean;
}

const DOCK_CONFIG = {
  baseIconSize: 46, 
  maxMagnification: 1.45,
  hoverProximity: 140,
};

const DockItem = ({ 
  item, 
  mouseX, 
  isActive, 
  isOpen, 
  onClick
}: { 
  item: any; 
  mouseX: any; 
  isActive: boolean; 
  isOpen: boolean; 
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const baseSize = DOCK_CONFIG.baseIconSize;

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - (bounds.x + bounds.width / 2);
  });

  const widthTransform = useTransform(
    distance,
    [-DOCK_CONFIG.hoverProximity, 0, DOCK_CONFIG.hoverProximity],
    [baseSize, baseSize * DOCK_CONFIG.maxMagnification, baseSize]
  );

  const yTransform = useTransform(
    distance,
    [-DOCK_CONFIG.hoverProximity, 0, DOCK_CONFIG.hoverProximity],
    [0, -10, 0] 
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 200,
    damping: 25,
  });

  const y = useSpring(yTransform, {
    mass: 0.1,
    stiffness: 200,
    damping: 25,
  });

  return (
    <div key={item.id} className="relative flex flex-col items-center group">
      {/* Tooltip Label (Desktop only) */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-black/80 dark:bg-white/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-[600] border border-white/10 dark:border-black/10">
        <span className="text-[10px] font-black text-white dark:text-black uppercase tracking-widest">{item.label}</span>
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black/80 dark:border-t-white/90" />
      </div>

      <motion.div
        ref={ref}
        style={{ width, height: width, y }}
        onClick={onClick}
        className={`
          flex items-center justify-center rounded-[18px] cursor-pointer
          transition-colors duration-400 relative
          ${isActive 
            ? 'bg-accent/20 border border-accent/40 shadow-[0_0_20px_rgba(14,165,233,0.3)]' 
            : 'bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/5'
          }
          backdrop-blur-md
        `}
      >
        <div className={`
          flex items-center justify-center transition-transform duration-300 
          ${isActive 
            ? 'text-accent scale-110' 
            : 'text-main/60 dark:text-white/60 group-hover:text-main dark:group-hover:text-white'
          }
        `}>
          {React.isValidElement(item.icon) 
            ? React.cloneElement(item.icon as React.ReactElement<any>, { size: "60%" }) 
            : item.icon}
        </div>
      </motion.div>

      <div 
        className={`
          absolute -bottom-1.5 w-1 h-1 rounded-full transition-all duration-500 ease-out
          ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
          ${isActive ? 'bg-accent w-2 shadow-[0_0_8px_rgba(14,165,233,0.6)]' : 'bg-main/40 dark:bg-white/40'}
        `} 
      />
    </div>
  );
};

const Dock: React.FC<DockProps> = ({ activeId, openWindowIds, minimizedWindowIds, onIconClick, onGoHome, isMobile, isTablet }) => {
  const mouseX = useMotionValue(Infinity);

  const isHomeActive = useMemo(() => {
    const visibleWindowsCount = openWindowIds.filter(id => !minimizedWindowIds.has(id)).length;
    return activeId === null || visibleWindowsCount === 0;
  }, [activeId, openWindowIds, minimizedWindowIds]);

  const dockItems = useMemo(() => [
    { id: 'home', label: 'Home', icon: <LayoutGrid />, action: onGoHome },
    ...NAV_ITEMS.map(item => ({ ...item, action: () => onIconClick(item.id) }))
  ], [onGoHome, onIconClick]);

  if (isMobile || isTablet) {
    const containerClasses = isTablet 
      ? "rounded-[24px] px-4 py-3 w-[70vw] max-w-[520px]" 
      : "rounded-[20px] px-2 py-2 w-[94vw] max-w-[380px]";
      
    const iconWrapperClasses = isTablet ? "max-w-[60px] gap-1" : "max-w-[50px] gap-0.5";
    const labelClasses = isTablet ? "text-[8px]" : "text-[7px]";
    const iconSize = isTablet ? 22 : 18;

    return (
      <div id="dock" className={`flex items-end justify-around shadow-2xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-gray-800/40 backdrop-blur-[60px] ${containerClasses}`}>
        {dockItems.map(item => {
          const isActive = item.id === 'home' ? isHomeActive : activeId === item.id;
          return (
            <div key={item.id} className={`flex flex-col items-center flex-1 ${iconWrapperClasses}`}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  item.action();
                }} 
                className={`w-full aspect-square rounded-[10px] md:rounded-[14px] transition-all duration-300 active:scale-90 relative flex items-center justify-center ${isActive ? 'text-accent bg-accent/10' : 'text-main/70 dark:text-white/80 bg-black/5 dark:bg-white/5'}`}
              >
                {isActive && (
                  <motion.div layoutId="dock-mobile-active" className="absolute inset-0 bg-accent/5 rounded-[10px] md:rounded-[14px] -z-10" />
                )}
                {React.isValidElement(item.icon) 
                  ? React.cloneElement(item.icon as React.ReactElement<any>, { size: iconSize }) 
                  : item.icon}
              </button>
              <span className={`font-black uppercase tracking-tight text-center leading-none truncate w-full ${labelClasses} ${isActive ? 'text-accent' : 'text-main/60 dark:text-white/50'}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <motion.div 
      id="dock"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="glass p-3 rounded-[28px] flex items-end gap-3 shadow-2xl border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.05]"
    >
      {dockItems.map((item, idx) => {
        const isActive = item.id === 'home' ? isHomeActive : activeId === item.id;
        const isOpen = item.id === 'home' ? false : openWindowIds.includes(item.id as WindowID);
        
        return (
          <React.Fragment key={item.id}>
            <DockItem 
              item={item} 
              mouseX={mouseX} 
              isActive={isActive}
              isOpen={isOpen}
              onClick={item.action}
            />
            {idx === 0 && <div className="w-[1px] h-12 bg-main/10 dark:bg-white/10 mx-1 mb-1 opacity-50" />}
          </React.Fragment>
        );
      })}
    </motion.div>
  );
};

export default Dock;
