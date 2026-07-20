import { useOSStore } from './store/useOSStore';
import { TopBar } from './components/topbar/TopBar';
import { Dock } from './components/dock/Dock';
import { WindowManager } from './components/window/WindowManager';
import type { WallpaperId } from './types/os';

const WALLPAPER_BG: Record<WallpaperId, string> = {
  'abstract': 'url(/abstract.jpg)',
  'cat': 'url(/cat.jpg)',
  'galaxy': 'url(/galaxy.png)',
  'space': 'url(/space.png)',
  'tree': 'url(/tree.jpg)',
};

export function App() {
  const { wallpaper } = useOSStore();
  const bgStyle = WALLPAPER_BG[wallpaper] || WALLPAPER_BG['abstract'];

  return (
    <div className="relative h-screen w-screen overflow-hidden text-[#cdd6f4] font-sans bg-[#11111b] select-none">
      {/* Default Starry Night Moon & Clouds Wallpaper / Selected Preset */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 scale-105"
        style={{ backgroundImage: bgStyle }}
      />

      {/* Glass Contrast Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#11111b]/40 via-transparent to-[#11111b]/60 pointer-events-none" />

      {/* Catppuccin Ambient Soft Glow Orbs */}
      <div className="absolute top-[-15%] left-[-10%] w-[550px] h-[550px] rounded-full bg-[#cba6f7]/15 blur-[140px] pointer-events-none animate-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-[#89b4fa]/15 blur-[140px] pointer-events-none animate-glow" style={{ animationDelay: '2.5s' }} />

      {/* Top Status Bar */}
      <TopBar />

      {/* Clean Desktop Canvas */}
      <main className="relative h-[calc(100vh-32px)] w-full pointer-events-none" />

      {/* Windows Manager Layer */}
      <WindowManager />

      {/* Floating Bottom Dock */}
      <Dock />
    </div>
  );
}

export default App;
