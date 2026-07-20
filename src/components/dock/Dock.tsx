import React from 'react';
import { useOSStore } from '../../store/useOSStore';
import type { AppId } from '../../types/os';
import { motion } from 'framer-motion';
import { audioEngine } from '../../services/audio';
import { 
  User, 
  Briefcase, 
  Terminal, 
  Folder, 
  Bot, 
  Settings, 
  Mail 
} from 'lucide-react';

interface DockItem {
  id: AppId;
  label: string;
  icon: React.ReactNode;
}

const DOCK_ITEMS: DockItem[] = [
  { 
    id: 'terminal', 
    label: 'Terminal', 
    icon: <Terminal className="w-5 h-5 text-[#a6e3a1] group-hover:text-[#cba6f7] transition-colors" />
  },
  { 
    id: 'profile', 
    label: 'Profile', 
    icon: <User className="w-5 h-5 text-[#89b4fa] group-hover:text-[#cba6f7] transition-colors" />
  },
  { 
    id: 'projects', 
    label: 'Projects', 
    icon: <Briefcase className="w-5 h-5 text-[#fab387] group-hover:text-[#cba6f7] transition-colors" />
  },
  { 
    id: 'files', 
    label: 'Files', 
    icon: <Folder className="w-5 h-5 text-[#89dceb] group-hover:text-[#cba6f7] transition-colors" />
  },
  { 
    id: 'chatbot', 
    label: 'AI Chat', 
    icon: <Bot className="w-5 h-5 text-[#b4befe] group-hover:text-[#cba6f7] transition-colors" />
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: <Settings className="w-5 h-5 text-[#bac2de] group-hover:text-[#cba6f7] transition-colors" />
  },
  { 
    id: 'contact', 
    label: 'Contact', 
    icon: <Mail className="w-5 h-5 text-[#f38ba8] group-hover:text-[#cba6f7] transition-colors" />
  },
];

export const Dock: React.FC = () => {
  const { windows, openApp, focusApp, activeWindowId } = useOSStore();

  const handleAppClick = (id: AppId) => {
    audioEngine.play('open');
    const appState = windows[id];
    if (!appState?.isOpen || appState?.isMinimized) {
      openApp(id);
    } else {
      focusApp(id);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[99999] pointer-events-auto select-none">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="glass-dock px-4 py-2.5 rounded-2xl flex items-center space-x-3 border border-white/20 bg-[#11111b]/80 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-3xl"
      >
        {DOCK_ITEMS.map((item) => {
          const windowState = windows[item.id];
          const isOpen = windowState?.isOpen;
          const isActive = activeWindowId === item.id && isOpen && !windowState?.isMinimized;

          return (
            <div key={item.id} className="relative group flex flex-col items-center">
              {/* Tooltip */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none bg-[#11111b]/90 text-[#cdd6f4] text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-2xl backdrop-blur-3xl border border-white/20 whitespace-nowrap z-[100001]">
                {item.label}
              </div>

              {/* Glass Icon Tile */}
              <button
                onClick={() => handleAppClick(item.id)}
                className={`w-11.5 h-11.5 rounded-xl flex items-center justify-center border bg-white/5 border-white/15 shadow-md cursor-pointer hover:bg-white/15 hover:border-[#cba6f7]/60 hover:scale-110 hover:-translate-y-3 active:scale-95 transition-transform duration-75 ease-out ${
                  isActive 
                    ? 'ring-2 ring-[#cba6f7]/60 bg-white/20 border-[#cba6f7] shadow-[0_0_16px_rgba(203,166,247,0.5)]' 
                    : ''
                }`}
              >
                {item.icon}
              </button>

              {/* Active Indicator Dot / Pill */}
              <div className="h-1.5 flex items-center justify-center mt-1">
                {isOpen && (
                  <motion.span
                    layoutId={`dot-${item.id}`}
                    className={`rounded-full transition-all duration-200 ${
                      isActive 
                        ? 'bg-[#cba6f7] w-3 h-1 shadow-[0_0_10px_rgba(203,166,247,0.9)]' 
                        : 'bg-[#585b70] w-1.5 h-1.5'
                    }`}
                  />
                )}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
