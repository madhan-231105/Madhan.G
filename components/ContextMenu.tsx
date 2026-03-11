
import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Monitor, Settings, Palette, Eye, Trash2 } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onToggleTheme: () => void;
  onCloseAll: () => void;
  theme: 'light' | 'dark';
  hasWindows: boolean;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onToggleTheme, onCloseAll, theme, hasWindows }) => {
  // Prevent overflow
  const safeX = Math.min(x, window.innerWidth - 200);
  const safeY = Math.min(y, window.innerHeight - 300);

  const MenuItem = ({ icon: Icon, label, onClick, danger = false }: any) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
        onClose();
      }}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-bold transition-all ${
        danger ? 'text-rose-500 hover:bg-rose-500/10' : 'text-main hover:bg-accent hover:text-black'
      }`}
    >
      <Icon size={16} strokeWidth={2} />
      <span>{label}</span>
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ left: safeX, top: safeY }}
      className="fixed z-[500] w-48 glass-panel p-1.5 rounded-2xl border-white/10 shadow-2xl bg-slate-950/80 backdrop-blur-3xl"
    >
      <MenuItem icon={RefreshCw} label="Refresh Desktop" onClick={() => window.location.reload()} />
      <div className="h-[1px] bg-white/10 my-1 mx-2" />
      {hasWindows && (
        <>
          <MenuItem icon={Trash2} label="Close All Windows" onClick={onCloseAll} danger />
          <div className="h-[1px] bg-white/10 my-1 mx-2" />
        </>
      )}
      <MenuItem icon={Palette} label={theme === 'dark' ? "Light Mode" : "Dark Mode"} onClick={onToggleTheme} />
      <MenuItem icon={Monitor} label="Change Wallpaper" onClick={() => {}} />
      <MenuItem icon={Eye} label="Hide Desktop Icons" onClick={() => {}} />
      <div className="h-[1px] bg-white/10 my-1 mx-2" />
      <MenuItem icon={Settings} label="System Settings" onClick={() => {}} />
    </motion.div>
  );
};

export default ContextMenu;
