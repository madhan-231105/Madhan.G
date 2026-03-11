
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MenuBar from './components/MenuBar';
import ProfileCard from './components/ProfileCard';
import Dock from './components/Dock';
import Window from './components/Window';
import Sidebar from './components/Sidebar';
import Spotlight from './components/Spotlight';
import ContextMenu from './components/ContextMenu';
import { WindowID } from './types';
import { NAV_ITEMS } from './constants';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => 
    (localStorage.getItem('os-theme') as 'light' | 'dark') || 'dark'
  );
  
  const [windowStack, setWindowStack] = useState<WindowID[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<Set<WindowID>>(new Set());
  const [focusedWindow, setFocusedWindow] = useState<WindowID | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width <= 1180;

  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('os-theme', theme);
    
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme(t => t === 'light' ? 'dark' : 'light'), []);

  const isAnyWindowVisible = useMemo(() => {
    return windowStack.some(id => !minimizedWindows.has(id));
  }, [windowStack, minimizedWindows]);

  const minimizeWindow = useCallback((id: WindowID) => {
    setMinimizedWindows(prev => {
      const next = new Set(prev);
      next.add(id);
      const filteredStack = windowStack.filter(w => w !== id && !next.has(w));
      setFocusedWindow(filteredStack.length > 0 ? filteredStack[filteredStack.length - 1] : null);
      return next;
    });
  }, [windowStack]);

  const openWindow = useCallback((id: WindowID) => {
    const isMinimized = minimizedWindows.has(id);
    const isOpen = windowStack.includes(id);
    const isFocused = focusedWindow === id;

    if (isOpen && !isMinimized && isFocused) {
      minimizeWindow(id);
      return;
    }

    if (isMinimized) {
      setMinimizedWindows(prevMin => {
        const next = new Set(prevMin);
        next.delete(id);
        return next;
      });
    }

    setFocusedWindow(id);
    setWindowStack(prev => {
      if (prev.includes(id)) {
        return [...prev.filter(w => w !== id), id];
      }
      return [...prev, id];
    });
  }, [minimizedWindows, windowStack, focusedWindow, minimizeWindow]);

  const focusWindow = useCallback((id: WindowID) => {
    if (minimizedWindows.has(id)) {
      setMinimizedWindows(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
    setFocusedWindow(id);
    setWindowStack(prev => [...prev.filter(w => w !== id), id]);
  }, [minimizedWindows]);

  const closeWindow = useCallback((id: WindowID) => {
    setWindowStack(prev => {
      const filtered = prev.filter(w => w !== id);
      setMinimizedWindows(prevMin => {
        const next = new Set(prevMin);
        next.delete(id);
        const visibleRemaining = filtered.filter(w => !next.has(w));
        setFocusedWindow(visibleRemaining.length > 0 ? visibleRemaining[visibleRemaining.length - 1] : null);
        return next;
      });
      return filtered;
    });
  }, []);

  const handleGoHome = useCallback(() => {
    const all = new Set(windowStack);
    setMinimizedWindows(all);
    setFocusedWindow(null);
  }, [windowStack]);

  const closeAllWindows = () => {
    setWindowStack([]);
    setMinimizedWindows(new Set());
    setFocusedWindow(null);
  };

  return (
    <div 
      className={`relative h-screen w-screen overflow-hidden flex flex-col items-center justify-center transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#020617]' : 'bg-[#f1f5f9]'}`}
      onContextMenu={(e) => {
        if (!isMobile) {
          e.preventDefault();
          setContextMenu({ x: e.clientX, y: e.clientY });
        }
      }}
      onClick={() => setContextMenu(null)}
    >
      <MenuBar 
        theme={theme} 
        onToggleTheme={toggleTheme}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} 
        onOpenSpotlight={() => setIsSpotlightOpen(true)}
        isMobile={isMobile}
        isTablet={isTablet}
      />

      {/* Ambient Glows */}
      <div className={`absolute inset-0 -z-10 transition-all duration-1000 ${isAnyWindowVisible ? 'opacity-20 blur-[140px]' : 'opacity-100 blur-0'}`}>
        <div className={`absolute top-[-20%] left-[-15%] w-[90%] h-[90%] rounded-full blur-[200px] glow transition-colors duration-1000 ${theme === 'dark' ? 'bg-blue-600/15' : 'bg-blue-200/40'}`} />
        <div className={`absolute bottom-[-20%] right-[-15%] w-[90%] h-[90%] rounded-full blur-[200px] glow transition-colors duration-1000 ${theme === 'dark' ? 'bg-cyan-500/15' : 'bg-white/60'}`} />
      </div>

      <motion.div 
        animate={{ 
          scale: (isMobile || isTablet) && isAnyWindowVisible ? 0.92 : 1,
          opacity: (isMobile || isTablet) && isAnyWindowVisible ? 0.3 : 1,
          filter: (isMobile || isTablet) && isAnyWindowVisible ? 'blur(20px)' : 'blur(0px)'
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className={`fixed inset-0 flex items-center justify-center pointer-events-none ${!isAnyWindowVisible ? 'pointer-events-auto' : ''}`}
      >
        <div className="w-full h-full flex items-center justify-center px-6">
           <ProfileCard isMobile={isMobile} isTablet={isTablet} />
        </div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none z-10">
        <AnimatePresence mode="popLayout">
          {windowStack.map((id, index) => (
            !minimizedWindows.has(id) && (
              <Window 
                key={id}
                id={id}
                theme={theme}
                zIndex={100 + index}
                isFocused={focusedWindow === id}
                isMobile={isMobile}
                isTablet={isTablet}
                onClose={() => closeWindow(id)}
                onMinimize={() => minimizeWindow(id)}
                onFocus={() => focusWindow(id)}
              />
            )
          ))}
        </AnimatePresence>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} theme={theme} />
      
      <AnimatePresence>
        {isSpotlightOpen && <Spotlight onClose={() => setIsSpotlightOpen(false)} onOpenApp={openWindow} />}
        {contextMenu && (
          <ContextMenu 
            x={contextMenu.x} 
            y={contextMenu.y} 
            onClose={() => setContextMenu(null)} 
            onToggleTheme={toggleTheme}
            onCloseAll={closeAllWindows}
            theme={theme}
            hasWindows={windowStack.length > 0}
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 z-[500] pointer-events-none">
        <div className="flex justify-center pb-8 md:pb-6 pointer-events-auto">
          <Dock 
            activeId={focusedWindow} 
            openWindowIds={windowStack} 
            minimizedWindowIds={minimizedWindows}
            onIconClick={openWindow} 
            onGoHome={handleGoHome}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
