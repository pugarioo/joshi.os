import React from 'react';
import { useOSStore } from '../../store/useOSStore';
import type { WallpaperId } from '../../types/os';
import { Settings, Volume2, VolumeX, Monitor, Check } from 'lucide-react';

const WALLPAPERS: { id: WallpaperId; name: string; file: string }[] = [
  { id: 'abstract', name: 'Abstract', file: '/abstract.jpg' },
  { id: 'cat', name: 'Cat', file: '/cat.jpg' },
  { id: 'galaxy', name: 'Galaxy', file: '/galaxy.png' },
  { id: 'space', name: 'Space', file: '/space.png' },
  { id: 'tree', name: 'Tree', file: '/tree.jpg' },
];

export const SettingsApp: React.FC = () => {
  const { wallpaper, setWallpaper, soundEnabled, toggleSound } = useOSStore();

  return (
    <div className="space-y-6 text-[#cdd6f4]">
      {/* Settings Header */}
      <div className="flex items-center space-x-3 pb-3 border-b border-[#313244]">
        <div className="p-2.5 glass-card rounded-xl text-[#cba6f7]">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">System Settings & Desktop Customization</h2>
          <p className="text-xs text-[#a6adc8]">Configure visual themes, wallpapers, sound preferences.</p>
        </div>
      </div>

      {/* Audio Sound Toggle */}
      <div className="glass-card p-4 rounded-xl space-y-2 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-white flex items-center space-x-2">
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#a6e3a1]" /> : <VolumeX className="w-4 h-4 text-[#585b70]" />}
            <span>System Sound Effects</span>
          </div>
          <p className="text-[11px] text-[#a6adc8]">Click & window notification sounds</p>
        </div>
        <button
          onClick={toggleSound}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            soundEnabled ? 'bg-[#a6e3a1] text-[#11111b]' : 'glass-card text-[#585b70]'
          }`}
        >
          {soundEnabled ? 'Enabled' : 'Muted'}
        </button>
      </div>

      {/* Wallpapers Selection Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-[#bac2de] uppercase tracking-wider flex items-center space-x-1.5">
          <Monitor className="w-4 h-4 text-[#89b4fa]" />
          <span>Desktop Wallpapers</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {WALLPAPERS.map((w) => (
            <div
              key={w.id}
              onClick={() => setWallpaper(w.id)}
              className={`p-3 rounded-xl border flex items-center space-x-3 cursor-pointer transition ${
                wallpaper === w.id
                  ? 'border-[#cba6f7] ring-2 ring-[#cba6f7]/40 bg-[#cba6f7]/20 shadow-md'
                  : 'glass-card'
              }`}
            >
              <div
                className="w-14 h-10 rounded-lg bg-cover bg-center border border-white/20 shrink-0"
                style={{ backgroundImage: `url(${w.file})` }}
              >
                {wallpaper === w.id && (
                  <div className="w-full h-full rounded-lg bg-[#cba6f7]/30 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{w.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
