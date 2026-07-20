import React, { useState, useEffect, useRef } from 'react';
import { 
  useOSStore 
} from '../../store/useOSStore';
import { 
  Wifi,
  Volume2, 
  VolumeX, 
  Battery,
  LayoutGrid,
  Sliders, 
  Monitor,
  Check,
  User,
  Briefcase,
  Terminal,
  Folder,
  Bot,
  Mail,
  RotateCcw,
  LogOut
} from 'lucide-react';

export const TopBar: React.FC = () => {
  const { 
    windows, 
    activeWindowId, 
    openApp,
    wallpaper, 
    setWallpaper,
    soundEnabled, 
    toggleSound,
    isQuickSettingsOpen,
    toggleQuickSettings,
    closeQuickSettings
  } = useOSStore();

  const [isAppMenuOpen, setIsAppMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [batteryLevel, setBatteryLevel] = useState(1);
  const [isCharging, setIsCharging] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const gridBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        isAppMenuOpen &&
        menuRef.current &&
        gridBtnRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !gridBtnRef.current.contains(e.target as Node)
      ) {
        setIsAppMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isAppMenuOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        isQuickSettingsOpen &&
        !(e.target as Element)?.closest('[data-panel="control-center"]')
      ) {
        closeQuickSettings();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isQuickSettingsOpen, closeQuickSettings]);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const nav = navigator as Navigator & { getBattery?: () => Promise<{ level: number; charging: boolean; addEventListener: (e: string, cb: () => void) => void }> };
    if (nav.getBattery) {
      nav.getBattery().then((battery) => {
        if (!mounted) return;
        const update = () => {
          setBatteryLevel(battery.level);
          setIsCharging(battery.charging);
        };
        update();
        battery.addEventListener('levelchange', update);
        battery.addEventListener('chargingchange', update);
      }).catch(() => {});
    }
    return () => { mounted = false; };
  }, []);

  const batteryPct = Math.round(batteryLevel * 100);

  const activeApp = activeWindowId ? windows[activeWindowId] : null;

  return (
    <header className="relative z-[100000] select-none">
      {/* Sleek macOS-Style Glass Top Panel Bar */}
      <div className="h-8.5 px-3.5 flex items-center justify-between text-xs font-medium text-[#cdd6f4] glass-window !backdrop-blur-3xl bg-[#11111b]/85 !border-transparent !shadow-none">
        {/* Left Side: App Menu & Active App */}
        <div className="flex items-center space-x-3">
          <button
            ref={gridBtnRef}
            onClick={() => {
              setIsAppMenuOpen(!isAppMenuOpen);
              closeQuickSettings();
            }}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              isAppMenuOpen 
                ? 'bg-[#cba6f7] text-[#11111b]' 
                : 'hover:bg-white/10 text-[#cba6f7]'
            }`}
            title="App Menu"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>

          {/* Active App Indicator */}
          <div className="flex items-center space-x-2 font-bold text-white tracking-wide">
            <span>{activeApp ? activeApp.title.split('-')[0] : 'Joshua Lopez'}</span>
          </div>
        </div>

        {/* Right Side: Status Icons & Control Center */}
        <div className="flex items-center text-[#bac2de]">
          <button
            onClick={() => {
              toggleQuickSettings();
            }}
            className="flex items-center space-x-2.5 px-2.5 py-1 rounded-md hover:bg-white/10 transition cursor-pointer"
            title="Control Center"
          >
            <span title={isOnline ? 'Connected' : 'Offline'}>
              <Wifi className={`w-3.5 h-3.5 ${isOnline ? 'text-[#a6e3a1]' : 'text-[#585b70]'}`} />
            </span>
            <span title="Sound">
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-[#89b4fa]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-[#585b70]" />
              )}
            </span>
            <div className="flex items-center space-x-1 text-xs">
              <Battery className={`w-4 h-4 ${isCharging ? 'text-[#f9e2af]' : 'text-[#a6e3a1]'}`} />
              <span className="text-[10px] hidden sm:inline font-mono font-medium">{batteryPct}%</span>
            </div>
          </button>
        </div>
      </div>

      {/* App Menu Dropdown */}
      {isAppMenuOpen && (
        <div ref={menuRef}
          className="absolute left-[14px] top-9 w-52 backdrop-blur-3xl rounded-2xl shadow-2xl p-2 text-[#cdd6f4] border border-white/15 z-[100001] animate-in fade-in zoom-in-95 duration-150 space-y-0.5"
        >
          <button
            onClick={() => { openApp('profile'); setIsAppMenuOpen(false); }}
            className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl flex items-center space-x-2.5 text-xs transition cursor-pointer"
          >
            <User className="w-4 h-4 text-[#89b4fa]" />
            <span>Profile</span>
          </button>
          <button
            onClick={() => { openApp('projects'); setIsAppMenuOpen(false); }}
            className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl flex items-center space-x-2.5 text-xs transition cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-[#fab387]" />
            <span>Projects</span>
          </button>
          <button
            onClick={() => { openApp('terminal'); setIsAppMenuOpen(false); }}
            className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl flex items-center space-x-2.5 text-xs transition cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-[#a6e3a1]" />
            <span>Terminal CLI</span>
          </button>
          <button
            onClick={() => { openApp('files'); setIsAppMenuOpen(false); }}
            className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl flex items-center space-x-2.5 text-xs transition cursor-pointer"
          >
            <Folder className="w-4 h-4 text-[#89dceb]" />
            <span>File Explorer</span>
          </button>
          <button
            onClick={() => { openApp('chatbot'); setIsAppMenuOpen(false); }}
            className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl flex items-center space-x-2.5 text-xs transition cursor-pointer"
          >
            <Bot className="w-4 h-4 text-[#b4befe]" />
            <span>AI Chat</span>
          </button>
          <button
            onClick={() => { openApp('settings'); setIsAppMenuOpen(false); }}
            className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl flex items-center space-x-2.5 text-xs transition cursor-pointer"
          >
            <Sliders className="w-4 h-4 text-[#a6e3a1]" />
            <span>Settings</span>
          </button>
          <button
            onClick={() => { openApp('contact'); setIsAppMenuOpen(false); }}
            className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-xl flex items-center space-x-2.5 text-xs transition cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#f38ba8]" />
            <span>Send Message</span>
          </button>

          <div className="my-1 border-t border-white/10" />

          <button
            onClick={() => { window.location.reload(); setIsAppMenuOpen(false); }}
            className="w-full text-left px-3 py-2 hover:bg-[#f38ba8]/20 text-[#f38ba8] rounded-xl flex items-center space-x-2.5 text-xs transition cursor-pointer font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart OS</span>
          </button>
          <button
            onClick={() => { window.close(); setIsAppMenuOpen(false); }}
            className="w-full text-left px-3 py-2 hover:bg-[#f38ba8]/20 text-[#f38ba8] rounded-xl flex items-center space-x-2.5 text-xs transition cursor-pointer font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Exit</span>
          </button>
        </div>
      )}

      {/* Control Center Floating Popup */}
      {isQuickSettingsOpen && (
        <div className="absolute right-3 top-10 w-72 glass-panel rounded-2xl p-4 shadow-2xl border border-white/15 bg-[#11111b]/95 backdrop-blur-3xl text-[#cdd6f4] z-[100001] animate-in fade-in zoom-in-95 duration-150 space-y-4" data-panel="control-center">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <span className="text-xs font-bold tracking-wide flex items-center space-x-2 text-white">
              <Sliders className="w-4 h-4 text-[#cba6f7]" />
              <span>Control Center</span>
            </span>
            <span className="text-[10px] bg-[#cba6f7]/20 text-[#cba6f7] border border-[#cba6f7]/30 px-2 py-0.5 rounded-full font-mono">
              Catppuccin Glass
            </span>
          </div>

          {/* Network & Battery Status */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => openApp('network-info')}
              className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-1 text-left cursor-pointer hover:bg-white/10 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#a6adc8] uppercase tracking-wider">Network</span>
                <Wifi className={`w-3.5 h-3.5 ${isOnline ? 'text-[#a6e3a1]' : 'text-[#585b70]'}`} />
              </div>
              <p className={`text-xs font-semibold ${isOnline ? 'text-[#a6e3a1]' : 'text-[#585b70]'}`}>
                {isOnline ? 'Connected' : 'Offline'}
              </p>
            </button>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#a6adc8] uppercase tracking-wider">Battery</span>
                <Battery className={`w-3.5 h-3.5 ${isCharging ? 'text-[#f9e2af]' : 'text-[#a6e3a1]'}`} />
              </div>
              <p className={`text-xs font-semibold ${isCharging ? 'text-[#f9e2af]' : 'text-[#a6e3a1]'}`}>
                {batteryPct}%{isCharging ? ' — Charging' : ''}
              </p>
            </div>
          </div>

          {/* Toggle Switches */}
          <button
            onClick={toggleSound}
            className={`w-full p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition cursor-pointer ${
              soundEnabled 
                ? 'bg-[#313244]/80 border-[#a6e3a1]/40 text-[#a6e3a1] shadow-sm' 
                : 'bg-[#181825]/80 border-white/10 text-[#585b70]'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="text-[11px] font-semibold">{soundEnabled ? 'Audio On' : 'Muted'}</span>
          </button>

          {/* Wallpapers Selector */}
          <div className="space-y-2 pt-1">
            <label className="text-[11px] text-[#a6adc8] font-bold flex items-center justify-between uppercase tracking-wider">
              <span>Desktop Wallpaper</span>
              <Monitor className="w-3.5 h-3.5 text-[#89b4fa]" />
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['abstract', 'cat', 'galaxy', 'space', 'tree'] as const).map((w) => (
                <button
                  key={w}
                  onClick={() => setWallpaper(w)}
                  className={`h-9 rounded-xl text-[10px] font-bold capitalize border transition cursor-pointer flex items-center justify-center space-x-1 ${
                    wallpaper === w 
                      ? 'border-[#cba6f7] ring-2 ring-[#cba6f7]/40 bg-[#cba6f7]/25 text-white shadow-md' 
                      : 'border-white/10 bg-white/5 text-[#bac2de] hover:bg-white/15'
                  }`}
                >
                  <span>{w.split('-')[0]}</span>
                  {wallpaper === w && <Check className="w-3 h-3 text-[#cba6f7]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
