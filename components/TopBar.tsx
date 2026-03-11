
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Github, Linkedin, Mail, Phone } from 'lucide-react';

interface TopBarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  isMobile: boolean;
  onGoHome: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ theme, onToggleTheme, isMobile, onGoHome }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  const ProfileInfo = () => (
    <button 
      onClick={onGoHome}
      className="flex items-center gap-2.5 hover:bg-white/10 p-1 px-2 rounded-lg transition-all active:scale-95 text-left"
    >
      <img 
        src="https://picsum.photos/seed/madhan/100/100" 
        alt="Madhan" 
        className="w-7 h-7 rounded-full border border-white/20 shadow-sm object-cover"
      />
      <span className="text-[14px] font-black tracking-tight text-main whitespace-nowrap">
        Madhan G.
      </span>
    </button>
  );

  if (isMobile) {
    return (
      <header className="fixed top-0 left-0 right-0 h-12 flex items-center justify-between px-4 z-[300] bg-white/5 backdrop-blur-2xl border-b border-white/[0.08]">
        <ProfileInfo />
        <div className="flex items-center gap-4">
          <button onClick={onToggleTheme} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
            {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-600" />}
          </button>
          <span className="text-[13px] font-bold tabular-nums text-main opacity-90">{formattedTime.toLowerCase()}</span>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-10 bg-white/5 backdrop-blur-xl border-b border-white/[0.05] flex items-center justify-between px-4 z-[300]">
      <div className="flex items-center gap-4">
        <ProfileInfo />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3.5 mr-4 text-secondary/80">
          <Github size={15} className="cursor-pointer hover:text-main transition-colors" />
          <Linkedin size={15} className="cursor-pointer hover:text-main transition-colors" />
          <Mail size={15} className="cursor-pointer hover:text-main transition-colors" />
          <Phone size={15} className="cursor-pointer hover:text-main transition-colors" />
        </div>

        <div className="h-4 w-[1px] bg-white/10 mr-2" />

        <button onClick={onToggleTheme} className="p-1.5 hover:bg-white/10 rounded-lg transition-all active:scale-90">
          {theme === 'dark' ? <Sun size={17} className="text-yellow-400" /> : <Moon size={17} className="text-blue-600" />}
        </button>

        <div className="text-xs font-black tabular-nums flex gap-3 ml-2 text-main opacity-80">
          <span className="hidden md:inline">{time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          <span>{formattedTime}</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
