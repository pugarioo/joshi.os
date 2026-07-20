import React, { useState, useRef } from 'react';
import { useOSStore } from '../../store/useOSStore';
import type { AppId } from '../../types/os';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Minus, X, Maximize2, Minimize2 } from 'lucide-react';
import { audioEngine } from '../../services/audio';

interface WindowFrameProps {
  id: AppId;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({ id, children }) => {
  const { 
    windows, 
    closeApp, 
    minimizeApp, 
    maximizeApp, 
    focusApp, 
    updatePosition, 
    updateSize,
    activeWindowId 
  } = useOSStore();

  const windowState = windows[id];
  const isActive = activeWindowId === id;

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number }>({
    startX: 0,
    startY: 0,
    initialX: windowState?.position.x || 100,
    initialY: windowState?.position.y || 80,
  });

  const resizeRef = useRef<{ startX: number; startY: number; initialW: number; initialH: number }>({
    startX: 0,
    startY: 0,
    initialW: windowState?.size.width || 700,
    initialH: windowState?.size.height || 500,
  });

  if (!windowState || !windowState.isOpen) {
    return null;
  }

  // Handle Dragging
  const handlePointerDownHeader = (e: React.PointerEvent) => {
    if (windowState.isMaximized) return;
    focusApp(id);
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: windowState.position.x,
      initialY: windowState.position.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMoveHeader = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    const newX = Math.max(0, dragRef.current.initialX + dx);
    const newY = Math.max(32, dragRef.current.initialY + dy);
    updatePosition(id, { x: newX, y: newY });
  };

  const handlePointerUpHeader = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  // Handle Resizing
  const handlePointerDownResize = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (windowState.isMaximized) return;
    focusApp(id);
    setIsResizing(true);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialW: windowState.size.width,
      initialH: windowState.size.height,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMoveResize = (e: React.PointerEvent) => {
    if (!isResizing) return;
    const dx = e.clientX - resizeRef.current.startX;
    const dy = e.clientY - resizeRef.current.startY;
    const newW = Math.max(380, resizeRef.current.initialW + dx);
    const newH = Math.max(260, resizeRef.current.initialH + dy);
    updateSize(id, { width: newW, height: newH });
  };

  const handlePointerUpResize = (e: React.PointerEvent) => {
    if (isResizing) {
      setIsResizing(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  // Determine window style position
  const stylePosition = windowState.isMaximized
    ? { top: '32px', left: '0px', width: '100vw', height: 'calc(100vh - 32px)', borderRadius: '0px' }
    : {
        top: `${windowState.position.y}px`,
        left: `${windowState.position.x}px`,
        width: `${windowState.size.width}px`,
        height: `${windowState.size.height}px`,
      };

  // Smooth & Fluid Apple Spring Window Variants (220ms)
  const macVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.88,
      y: 20,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.22,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.85,
      y: 25,
      transition: {
        duration: 0.18,
        ease: [0.7, 0, 0.84, 0] as const,
      },
    },
  };

  const isDarkGlassApp = true;

  return (
    <AnimatePresence>
      {!windowState.isMinimized && windowState.isOpen && (
        <motion.div
          key={`window-${id}`}
          variants={macVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            ...stylePosition,
            zIndex: windowState.zIndex,
            willChange: isDragging || isResizing ? 'top, left, width, height' : 'transform, opacity',
          }}
          onClick={() => focusApp(id)}
          className={`fixed glass-window rounded-2xl flex flex-col overflow-hidden ${
            isDarkGlassApp ? '!backdrop-blur-3xl bg-[#11111b]/85 shadow-2xl' : ''
          } ${
            isDragging || isResizing ? 'transition-none select-none' : ''
          } ${
            isActive 
              ? 'ring-1 ring-[#cba6f7]/50 border-[#cba6f7]/60 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_15px_rgba(203,166,247,0.2)]' 
              : 'opacity-95 border-[#313244]'
          }`}
        >
          {/* Dark Catppuccin Window Titlebar Header */}
          <div
            onPointerDown={handlePointerDownHeader}
            onPointerMove={handlePointerMoveHeader}
            onPointerUp={handlePointerUpHeader}
            onDoubleClick={() => {
              if (id !== 'contact') maximizeApp(id);
            }}
            className={`h-9 px-3.5 flex items-center justify-between glass-window-header select-none cursor-grab active:cursor-grabbing ${
              isActive ? 'opacity-100' : 'opacity-85'
            }`}
          >
            {/* Left: macOS Window Controls Dots */}
            <div className="flex items-center space-x-2 group">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  audioEngine.play('close');
                  closeApp(id);
                }}
                className="w-3 h-3 rounded-full bg-[#f38ba8] hover:bg-[#eba0ac] flex items-center justify-center text-[#11111b] transition cursor-pointer shadow-sm"
                title="Close"
              >
                <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  minimizeApp(id);
                }}
                className="w-3 h-3 rounded-full bg-[#f9e2af] hover:bg-[#fab387] flex items-center justify-center text-[#11111b] transition cursor-pointer shadow-sm"
                title="Minimize"
              >
                <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (id !== 'contact') maximizeApp(id);
                }}
                disabled={id === 'contact'}
                className={`w-3 h-3 rounded-full ${
                  id === 'contact' ? 'bg-[#585b70] opacity-40 cursor-not-allowed' : 'bg-[#a6e3a1] hover:bg-[#94e2d5] cursor-pointer'
                } flex items-center justify-center text-[#11111b] transition shadow-sm`}
                title={id === 'contact' ? 'Fixed Window Size' : 'Maximize'}
              >
                {windowState.isMaximized ? (
                  <Minimize2 className="w-2 h-2 opacity-0 group-hover:opacity-100" />
                ) : (
                  <Maximize2 className="w-2 h-2 opacity-0 group-hover:opacity-100" />
                )}
              </button>
            </div>

            {/* Center: Title */}
            <div className="text-xs font-semibold text-[#cdd6f4] tracking-wide truncate max-w-[60%] text-center">
              {windowState.title}
            </div>

            {/* Right placeholder */}
            <div className="w-12" />
          </div>

          {/* Window Body Container */}
          <div className={`flex-1 text-[#cdd6f4] relative ${
            id === 'contact' || id === 'chatbot' ? 'overflow-hidden p-0' : id === 'projects' || id === 'showcase' ? 'overflow-hidden p-4' : 'overflow-auto p-4'
          } ${windowState.isMaximized ? 'pb-16' : ''}`}>
            {children}
          </div>

          {/* Bottom Right Resize Handle */}
          {!windowState.isMaximized && id !== 'contact' && (
            <div
              onPointerDown={handlePointerDownResize}
              onPointerMove={handlePointerMoveResize}
              onPointerUp={handlePointerUpResize}
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-0.5 z-50 text-[#585b70] hover:text-[#cba6f7]"
            >
              <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor">
                <path d="M 10,0 L 10,10 L 0,10 Z" opacity="0.7" />
              </svg>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
