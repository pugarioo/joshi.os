import { create } from 'zustand';
import type { AppId, WindowState, WallpaperId } from '../types/os';
import { audioEngine } from '../services/audio';

interface OSState {
  windows: Record<AppId, WindowState>;
  activeWindowId: AppId | null;
  highestZIndex: number;
  wallpaper: WallpaperId;
  soundEnabled: boolean;
  isQuickSettingsOpen: boolean;
  selectedProjectId: string | null;

  openApp: (id: AppId) => void;
  openShowcase: (projectId: string) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  maximizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  updatePosition: (id: AppId, pos: { x: number; y: number }) => void;
  updateSize: (id: AppId, size: { width: number; height: number }) => void;
  setWallpaper: (wallpaper: WallpaperId) => void;
  toggleSound: () => void;
  setSoundEnabled: (enabled: boolean) => void;
  toggleQuickSettings: () => void;
  closeQuickSettings: () => void;
}

const INITIAL_WINDOWS: Record<AppId, WindowState> = {
  terminal: {
    id: 'terminal',
    title: 'Terminal - joshi@dev-os:~',
    iconName: 'Terminal',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    position: { x: Math.round((window.innerWidth - 840) / 2), y: Math.round((window.innerHeight - 500) / 2) - 60 },
    size: { width: 840, height: 500 },
    zIndex: 10,
  },
  profile: {
    id: 'profile',
    title: 'Profile - Developer Bio',
    iconName: 'User',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 100, y: 60 },
    size: { width: 800, height: 530 },
    zIndex: 1,
  },
  projects: {
    id: 'projects',
    title: 'Projects Showcase',
    iconName: 'Briefcase',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 180, y: 90 },
    size: { width: 860, height: 560 },
    zIndex: 1,
  },
  showcase: {
    id: 'showcase',
    title: 'Project Details',
    iconName: 'Maximize2',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 260, y: 110 },
    size: { width: 660, height: 560 },
    zIndex: 1,
  },

  files: {
    id: 'files',
    title: 'File Explorer',
    iconName: 'Folder',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 260, y: 85 },
    size: { width: 820, height: 510 },
    zIndex: 1,
  },
  chatbot: {
    id: 'chatbot',
    title: 'AI Chat',
    iconName: 'Bot',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 300, y: 95 },
    size: { width: 480, height: 540 },
    zIndex: 1,
  },
  settings: {
    id: 'settings',
    title: 'System Settings',
    iconName: 'Settings',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 340, y: 120 },
    size: { width: 700, height: 480 },
    zIndex: 1,
  },
  contact: {
    id: 'contact',
    title: 'Send Message',
    iconName: 'Mail',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 250, y: 70 },
    size: { width: 780, height: 520 },
    zIndex: 1,
  },
  'network-info': {
    id: 'network-info',
    title: 'Network Info',
    iconName: 'Globe',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 300, y: 100 },
    size: { width: 480, height: 560 },
    zIndex: 1,
  },
};

export const useOSStore = create<OSState>((set, get) => ({
  windows: INITIAL_WINDOWS,
  activeWindowId: 'terminal',
  highestZIndex: 10,
  wallpaper: 'cat',
  soundEnabled: true,
  isQuickSettingsOpen: false,
  selectedProjectId: null,

  openApp: (id) => {
    const { windows, highestZIndex } = get();
    const newZIndex = Math.min(highestZIndex + 1, 80000);
    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          isOpen: true,
          isMinimized: false,
          zIndex: newZIndex,
        },
      },
      activeWindowId: id,
      highestZIndex: newZIndex,
      isQuickSettingsOpen: false,
    });
  },

  openShowcase: (projectId) => {
    const { windows, highestZIndex } = get();
    const newZIndex = Math.min(highestZIndex + 1, 80000);
    set({
      selectedProjectId: projectId,
      windows: {
        ...windows,
        showcase: {
          ...windows.showcase,
          isOpen: true,
          isMinimized: false,
          zIndex: newZIndex,
        },
      },
      activeWindowId: 'showcase',
      highestZIndex: newZIndex,
      isQuickSettingsOpen: false,
    });
  },

  closeApp: (id) => {
    const { windows, activeWindowId } = get();
    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          isOpen: false,
          isMinimized: false,
        },
      },
      activeWindowId: activeWindowId === id ? null : activeWindowId,
    });
  },

  minimizeApp: (id) => {
    const { windows, activeWindowId } = get();
    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          isMinimized: true,
        },
      },
      activeWindowId: activeWindowId === id ? null : activeWindowId,
    });
  },

  maximizeApp: (id) => {
    const { windows } = get();
    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          isMaximized: !windows[id].isMaximized,
        },
      },
    });
  },

  focusApp: (id) => {
    const { windows, highestZIndex, activeWindowId } = get();
    if (activeWindowId === id && !windows[id].isMinimized) return;
    const newZIndex = Math.min(highestZIndex + 1, 80000);
    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          isMinimized: false,
          zIndex: newZIndex,
        },
      },
      activeWindowId: id,
      highestZIndex: newZIndex,
    });
  },

  updatePosition: (id, pos) => {
    const { windows } = get();
    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          position: pos,
        },
      },
    });
  },

  updateSize: (id, size) => {
    const { windows } = get();
    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          size,
        },
      },
    });
  },

  setWallpaper: (wallpaper) => set({ wallpaper }),
  toggleSound: () => set((state) => {
    const next = !state.soundEnabled;
    audioEngine.setEnabled(next);
    return { soundEnabled: next };
  }),
  setSoundEnabled: (enabled) => {
    audioEngine.setEnabled(enabled);
    set({ soundEnabled: enabled });
  },
  toggleQuickSettings: () => set((state) => ({ isQuickSettingsOpen: !state.isQuickSettingsOpen })),
  closeQuickSettings: () => set({ isQuickSettingsOpen: false }),
}));
