
import React, { useState, useEffect } from 'react';
import { Search, Wifi, Battery, ToggleRight, Github, Linkedin, Mail, Phone, Sun, Moon } from 'lucide-react';

interface MenuBarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onToggleSidebar: () => void;
  onOpenSpotlight: () => void;
  isMobile?: boolean;
  isTablet?: boolean;
}

const MenuBar: React.FC<MenuBarProps> = ({ theme, onToggleTheme, onToggleSidebar, onOpenSpotlight, isMobile, isTablet }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true
  });

  const fullTime = time.toLocaleTimeString([], { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });

  const ThemeToggle = () => (
    <button 
      onClick={onToggleTheme} 
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="hover:bg-main/5 p-1.5 rounded-lg transition-all active:scale-90 flex items-center justify-center"
    >
      {theme === 'dark' ? (
        <Sun size={17} className="text-yellow-400 fill-yellow-400/20" />
      ) : (
        <Moon size={17} className="text-blue-600 fill-blue-600/10" />
      )}
    </button>
  );

  const SocialIcons = ({ size = 16, className = "opacity-70" }) => (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="Github" className="hover:text-accent transition-all active:scale-110">
        <Github size={size} />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:text-accent transition-all active:scale-110">
        <Linkedin size={size} />
      </a>
      <a href="mailto:hello@madhang.dev" title="Gmail" className="hover:text-accent transition-all active:scale-110">
        <Mail size={size} />
      </a>
      <a href="tel:+1234567890" title="Phone" className="hover:text-accent transition-all active:scale-110">
        <Phone size={size} />
      </a>
    </div>
  );

  if (isMobile) {
    return (
      <header className="fixed top-0 left-0 right-0 h-14 z-[500] flex items-center justify-between px-4 pointer-events-auto menu-bar-glass border-b-0">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <img 
            src="https://picsum.photos/seed/madhan/120/120" 
            alt="P" 
            className="w-7 h-7 rounded-full border border-black/5 dark:border-white/20 shrink-0"
          />
          <div className="flex flex-col -space-y-0.5">
            <span className="text-[12px] font-black text-main whitespace-nowrap">Madhan G</span>
            <SocialIcons size={12} className="opacity-50 dark:opacity-40" />
          </div>
        </div>
        
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <div className="flex items-center gap-1 opacity-80 dark:opacity-70 border-l border-main/10 pl-2">
            <span className="text-[10px] font-bold tabular-nums">86%</span>
            <Battery size={15} />
          </div>
          <span className="text-[11px] font-black text-main opacity-90 tabular-nums border-l border-main/10 pl-2">{formattedTime}</span>
        </div>
      </header>
    );
  }

  if (isTablet) {
    return (
      <header className="fixed top-0 left-0 right-0 h-12 z-[500] flex items-center justify-between px-6 pointer-events-auto menu-bar-glass">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <img 
              src="https://picsum.photos/seed/madhan/150/150" 
              alt="Madhan Profile" 
              className="w-7 h-7 rounded-full border border-black/5 dark:border-white/20 shadow-md object-cover"
            />
            <span className="text-[15px] font-black text-main tracking-tight">Madhan G</span>
          </div>
          
          <div className="h-5 w-[1px] bg-main/10 mx-1" />
          
          <SocialIcons size={16} />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 mr-2">
            <Wifi size={17} className="opacity-80" />
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="text-[12px] font-black">86%</span>
              <Battery size={20} />
            </div>
            <ThemeToggle />
            <button onClick={onOpenSpotlight} className="hover:bg-main/5 p-1.5 rounded-lg transition-colors">
              <Search size={17} strokeWidth={2.5} />
            </button>
            <button onClick={onToggleSidebar} className="hover:bg-main/5 p-1.5 rounded-lg transition-colors">
              <ToggleRight size={19} />
            </button>
          </div>
          <div className="text-[14px] font-black text-main opacity-95 tracking-tighter border-l border-main/10 pl-5">
            {formattedTime}
          </div>
        </div>
      </header>
    );
  }

  // Desktop Menu Bar
  return (
    <header className="fixed top-0 left-0 right-0 h-10 z-[500] flex items-center justify-between px-4 pointer-events-auto menu-bar-glass">
      <div className="flex items-center gap-4 h-full">
        <div className="flex items-center gap-3 px-2 hover:bg-main/5 rounded h-[80%] transition-colors cursor-default">
          <img 
            src="https://picsum.photos/seed/madhan/100/100" 
            alt="M" 
            className="w-5 h-5 rounded-full border border-black/5 dark:border-white/10"
          />
          <span className="text-[14px] font-black tracking-tight text-main">Madhan G</span>
        </div>
        <div className="hidden lg:flex items-center gap-5 text-[13px] font-bold opacity-70 dark:opacity-60">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-main transition-colors">LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-main transition-colors">Github</a>
          <a href="mailto:hello@madhang.dev" className="hover:text-main transition-colors">Gmail</a>
          <a href="tel:+1234567890" className="hover:text-main transition-colors">Phone</a>
        </div>
      </div>
      
      <div className="flex items-center gap-4 h-full">
        <div className="flex items-center gap-4 px-2">
          <Wifi size={16} className="opacity-80" />
          <div className="flex items-center gap-1.5 opacity-80">
            <span className="text-[11px] font-bold">86%</span>
            <Battery size={18} />
          </div>
          <ThemeToggle />
          <button onClick={onOpenSpotlight} className="hover:bg-main/5 p-1 rounded-lg transition-colors">
            <Search size={16} strokeWidth={2.5} />
          </button>
          <button onClick={onToggleSidebar} className="hover:bg-main/5 p-1 rounded-lg transition-colors">
            <ToggleRight size={18} />
          </button>
        </div>
        <span className="text-[13px] font-bold tabular-nums pr-2 text-main opacity-90">
          {fullTime}
        </span>
      </div>
    </header>
  );
};

export default MenuBar;
