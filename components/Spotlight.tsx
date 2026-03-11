
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Command } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { WindowID } from '../types';

interface SpotlightProps {
  onClose: () => void;
  onOpenApp: (id: WindowID) => void;
}

const Spotlight: React.FC<SpotlightProps> = ({ onClose, onOpenApp }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = NAV_ITEMS.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      onOpenApp(results[selectedIndex].id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[15vh] bg-black/10 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        onClick={e => e.stopPropagation()}
        className="w-[600px] max-w-[90vw] glass rounded-2xl overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] border-white/20"
      >
        <div className="flex items-center px-5 py-4 gap-4 border-b border-white/5">
          <Search className="text-secondary opacity-50" size={24} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Spotlight Search"
            className="flex-1 bg-transparent border-none outline-none text-xl font-medium text-main placeholder:opacity-30"
          />
        </div>
        
        {results.length > 0 && (
          <div className="py-2">
            {results.map((item, idx) => (
              <div
                key={item.id}
                onMouseEnter={() => setSelectedIndex(idx)}
                onClick={() => {
                  onOpenApp(item.id);
                  onClose();
                }}
                className={`flex items-center gap-4 px-5 py-2.5 cursor-default ${idx === selectedIndex ? 'bg-accent text-white' : 'hover:bg-white/5'}`}
              >
                {/* Fix: use React.ReactElement<any> to allow additional props like 'size' during cloning */}
                <div className={`${idx === selectedIndex ? 'text-white' : 'text-accent'}`}>
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 20 })}
                </div>
                <span className="flex-1 font-bold text-sm tracking-tight">{item.label}</span>
                {idx === selectedIndex && <Command size={14} className="opacity-60" />}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Spotlight;
