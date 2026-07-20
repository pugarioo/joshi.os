# UI/Audio Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Match TopBar blur to Dock, remove dead theme toggle code, add functional audio system via Web Audio API.

**Architecture:** Minimal changes — CSS class tweak in TopBar, delete `theme`/`toggleTheme` from store + consumers, add standalone `AudioEngine` service with 5 synthesized sounds.

**Tech Stack:** React 19, Tailwind CSS v4, Zustand, Web Audio API

---

### Task 1: TopBar Blur to Match Dock

**Files:** Modify `src/components/topbar/TopBar.tsx:58`

Change the topbar `<div>` class to match dock's glass recipe:
- Opacity: `80` → `45`
- Blur: `backdrop-blur-2xl` → `backdrop-blur-3xl`
- Border: `border-b` → full `border`
- Add `shadow-md`

**Before:**
```
className="h-8.5 px-3.5 flex items-center justify-between text-xs font-medium text-[#cdd6f4] bg-[#11111b]/80 backdrop-blur-2xl border-b border-white/10 shadow-md"
```

**After:**
```
className="h-8.5 px-3.5 flex items-center justify-between text-xs font-medium text-[#cdd6f4] bg-[#11111b]/45 backdrop-blur-3xl border border-white/15 shadow-md"
```

### Task 2: Remove Theme from Store + Wire Audio

**Files:** Modify `src/store/useOSStore.ts`

- Remove `theme: 'dark' | 'light'` from `OSState` interface
- Remove `toggleTheme: () => void` from interface
- Add `setSoundEnabled: (enabled: boolean) => void;` to interface
- Remove `theme: 'dark'` from initial state
- Remove `toggleTheme` method
- Import `audioEngine`
- Update `toggleSound` to call `audioEngine.setEnabled`
- Add `setSoundEnabled` implementation

### Task 3: Remove Theme from TopBar

**Files:** Modify `src/components/topbar/TopBar.tsx`

- Remove `theme`, `toggleTheme` from store destructure
- Remove `Moon`, `Sun` from lucide-react imports
- Remove Appearance toggle button block from Control Center
- Import `audioEngine` and add click/open sounds to nav buttons

### Task 4: Remove Theme from SettingsApp

**Files:** Modify `src/components/apps/SettingsApp.tsx`

- Remove `theme`, `toggleTheme` from store destructure
- Remove `Moon`, `Sun` from lucide-react imports
- Remove Appearance card block

### Task 5: Remove Theme from TerminalApp

**Files:** Modify `src/components/apps/TerminalApp.tsx`

- Remove `toggleTheme` from store destructure
- Remove `theme` command case
- Remove `theme` line from help text

### Task 6: Create Audio Engine

**Files:** Create `src/services/audio.ts`

Full `AudioEngine` class with 5 sound types via Web Audio API synthesis.

### Task 7: Wire Audio into Dock

**Files:** Modify `src/components/dock/Dock.tsx`

- Import `audioEngine`
- Add `audioEngine.play('open')` to `handleAppClick`

### Task 8: Wire Audio into WindowFrame

**Files:** Modify `src/components/window/WindowFrame.tsx`

- Import `audioEngine`
- Add `audioEngine.play('close')` to close button handler

### Task 9: Verification

- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] Dev server starts without errors
