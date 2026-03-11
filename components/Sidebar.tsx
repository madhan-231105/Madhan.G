
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Bluetooth, Battery, Sun, Volume2, Moon, CloudSun } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const ControlTile = ({ icon: Icon, title, subtitle, active = false }: any) => (
    <div className={`p-3 rounded-2xl flex items-center gap-3 transition-all ${active ? 'bg-accent text-white' : 'glass bg-white/5 hover:bg-white/10'}`}>
      <div className={`p-2 rounded-full ${active ? 'bg-white/20' : 'bg-accent'}`}>
        <Icon size={16} strokeWidth={3} className={active ? 'text-white' : 'text-white'} />
      </div>
      <div>
        <p className="text-[11px] font-black uppercase tracking-tighter leading-none">{title}</p>
        {subtitle && <p className="text-[10px] opacity-70 font-bold">{subtitle}</p>}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[490]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-10 right-4 w-80 glass z-[501] rounded-[24px] p-4 flex flex-col gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-white/20"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-1 flex flex-col gap-3">
                <ControlTile icon={Wifi} title="Wi-Fi" subtitle="Glass_Net" active />
                <ControlTile icon={Bluetooth} title="Bluetooth" subtitle="On" active />
                <ControlTile icon={CloudSun} title="AirDrop" subtitle="Contacts" active />
              </div>
              <div className="col-span-1 glass bg-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-2">
                 <Moon size={24} className="text-accent" />
                 <p className="text-[11px] font-black uppercase">Focus</p>
              </div>
            </div>

            <div className="glass bg-white/5 p-4 rounded-2xl space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[11px] font-black uppercase">Display</span>
                  <Sun size={14} className="opacity-50" />
                </div>
                <div className="h-6 w-full bg-black/20 rounded-lg relative overflow-hidden p-1">
                  <div className="h-full w-[70%] bg-white rounded-md shadow-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[11px] font-black uppercase">Sound</span>
                  <Volume2 size={14} className="opacity-50" />
                </div>
                <div className="h-6 w-full bg-black/20 rounded-lg relative overflow-hidden p-1">
                  <div className="h-full w-[45%] bg-white rounded-md shadow-sm" />
                </div>
              </div>
            </div>

            <div className="glass bg-white/5 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <Battery size={20} className="text-emerald-500" />
                 <span className="text-[13px] font-black">86% Charged</span>
              </div>
              <div className="text-[11px] font-bold opacity-50 uppercase tracking-tighter">Power Mode</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
