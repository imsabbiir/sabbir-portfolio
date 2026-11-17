"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useDragControls, animate } from "framer-motion";
import { Minus, X, Maximize2, Minimize2, ChevronLeft } from "lucide-react";

export default function OSWindow({
  id,
  title,
  icon,
  isOpen,
  onClose,
  onMinimize,
  isMinimized = false,
  zIndex = 30,
  onFocus,
  initialPosition = { x: 80, y: 80 },
  defaultWidth = 640,
  defaultHeight = 440,
  minWidth = 380,
  minHeight = 260,
  children,
}) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== "undefined" ? window.innerWidth < 768 : false;
  });
  const [isResizing, setIsResizing] = useState(false);
  const [size, setSize] = useState({
    width: defaultWidth,
    height: defaultHeight,
  });

  const windowRef = useRef(null);
  const dragControls = useDragControls();

  // Resize tracking ref
  const resizeRef = useRef({
    direction: "",
    startX: 0,
    startY: 0,
    startWidth: defaultWidth,
    startHeight: defaultHeight,
    startPosX: initialPosition.x,
    startPosY: initialPosition.y,
  });

  useEffect(() => {
    const checkMobile = () => {
      const mobile = typeof window !== "undefined" && window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && typeof window !== "undefined") {
        setSize((prev) => ({
          width: Math.min(prev.width, window.innerWidth - 40),
          height: Math.min(prev.height, window.innerHeight - 80),
        }));
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Update initial size if default props change
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSize({
        width: Math.min(defaultWidth, window.innerWidth - 40),
        height: Math.min(defaultHeight, window.innerHeight - 80),
      });
    }
  }, [defaultWidth, defaultHeight]);

  // Direct motion values for 60fps GPU dragging & smooth clamping
  const x = useMotionValue(initialPosition.x);
  const y = useMotionValue(initialPosition.y);

  const handleDragEnd = (e, info) => {
    const el = windowRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;

    // Traffic lights (🔴🟡🟢) and grab handle must stay reachable on screen
    const GRAB_HANDLE_WIDTH = 80;
    const TITLEBAR_HEIGHT = 40;

    const minLeft = -(rect.width - GRAB_HANDLE_WIDTH);
    const maxLeft = vw - GRAB_HANDLE_WIDTH;
    const minTop = 36;
    const maxTop = vh - (TITLEBAR_HEIGHT + 25);

    const currentX = x.get();
    const currentY = y.get();

    const clampedX = Math.min(Math.max(currentX, minLeft), maxLeft);
    const clampedY = Math.min(Math.max(currentY, minTop), maxTop);

    if (currentX !== clampedX || currentY !== clampedY) {
      animate(x, clampedX, { duration: 0.22, ease: "easeOut" });
      animate(y, clampedY, { duration: 0.22, ease: "easeOut" });
    }
  };

  // RESIZE HANDLER FOR ALL 8 EDGES AND CORNERS
  const handleResizePointerDown = (direction, e) => {
    if (isMaximized || isMobile) return;
    e.preventDefault();
    e.stopPropagation();

    onFocus?.();

    const currentX = x.get();
    const currentY = y.get();

    resizeRef.current = {
      direction,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height,
      startPosX: currentX,
      startPosY: currentY,
    };

    setIsResizing(true);
    document.body.style.userSelect = "none";

    const handlePointerMove = (moveEvent) => {
      moveEvent.preventDefault();
      const { direction, startX, startY, startWidth, startHeight, startPosX, startPosY } =
        resizeRef.current;
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      const vw = typeof window !== "undefined" ? window.innerWidth : 1920;
      const vh = typeof window !== "undefined" ? window.innerHeight : 1080;

      const maxW = vw - 30;
      const maxH = vh - 60;

      let newW = startWidth;
      let newH = startHeight;

      // Handle Horizontal Resize
      if (direction.includes("e")) {
        // Right
        newW = Math.max(minWidth, Math.min(maxW, startWidth + dx));
      } else if (direction.includes("w")) {
        // Left
        newW = Math.max(minWidth, Math.min(maxW, startWidth - dx));
        const newX = startPosX + (startWidth - newW);
        x.set(newX);
      }

      // Handle Vertical Resize
      if (direction.includes("s")) {
        // Bottom
        newH = Math.max(minHeight, Math.min(maxH, startHeight + dy));
      } else if (direction.includes("n")) {
        // Top
        newH = Math.max(minHeight, Math.min(maxH, startHeight - dy));
        const newY = Math.max(36, startPosY + (startHeight - newH));
        y.set(newY);
      }

      setSize({ width: Math.round(newW), height: Math.round(newH) });
    };

    const handlePointerUp = () => {
      setIsResizing(false);
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  return (
    <AnimatePresence>
      {isOpen && !isMinimized && (
        <motion.div
          key={`window-${id}`}
          ref={windowRef}
          drag={!isMobile && !isMaximized && !isResizing}
          dragListener={false}
          dragControls={dragControls}
          dragMomentum={false}
          dragElastic={0}
          initial={
            isMobile
              ? { y: "100%", opacity: 0 }
              : { opacity: 0, scale: 0.95 }
          }
          animate={
            isMobile
              ? { y: 0, opacity: 1 }
              : { opacity: 1, scale: 1 }
          }
          exit={
            isMobile
              ? { y: "100%", opacity: 0, transition: { duration: 0.22, ease: "easeInOut" } }
              : { opacity: 0, scale: 0.9, transition: { duration: 0.15 } }
          }
          transition={isMobile ? { duration: 0.16, ease: "easeOut" } : { type: "spring", damping: 28, stiffness: 320 }}
          onDragEnd={!isMobile ? handleDragEnd : undefined}
          style={
            isMobile
              ? {
                  zIndex: zIndex + 30,
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "100%",
                  maxWidth: "100vw",
                  height: "100%",
                }
              : {
                  zIndex,
                  position: "fixed",
                  top: 0,
                  left: 0,
                  x: isMaximized ? 0 : x,
                  y: isMaximized ? 0 : y,
                  ...(isMaximized
                    ? {
                        top: 36,
                        left: 0,
                        right: 0,
                        bottom: 60,
                        width: "100%",
                        height: "calc(100vh - 96px)",
                      }
                    : {
                        width: `${size.width}px`,
                        height: `${size.height}px`,
                        maxWidth: "98vw",
                        maxHeight: "92vh",
                      }),
                }
          }
          onMouseDown={onFocus}
          className={
            isMobile
              ? "flex flex-col bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden overflow-x-hidden select-none pointer-events-auto max-w-[100vw]"
              : `flex flex-col bg-white/95 backdrop-blur-2xl border border-white/40 dark:bg-[#1a1b26]/98 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden select-none pointer-events-auto ring-1 ring-black/10 relative ${
                  isResizing ? "select-none" : ""
                }`
          }
        >
          {/* 1. MOBILE SMARTPHONE APP BAR (< md) */}
          {isMobile ? (
            <div className="flex flex-col shrink-0 bg-slate-100/90 dark:bg-slate-900/95 border-b border-black/10 dark:border-white/10 pt-2 pb-2.5 px-4">
              {/* iOS Top Sheet Grab Bar */}
              <div className="w-10 h-1 rounded-full bg-black/20 dark:bg-white/25 mx-auto mb-2" />

              {/* App Bar Navigation */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-semibold text-xs active:scale-95 transition cursor-pointer"
                >
                  <ChevronLeft size={16} />
                  <span>Back</span>
                </button>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
                  {icon && <span className="text-sm shrink-0">{icon}</span>}
                  <span className="truncate">{title}</span>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-7 h-7 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 active:scale-90 transition cursor-pointer"
                  title="Close App"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ) : (
            /* 2. DESKTOP macOS WINDOW TITLEBAR (>= md) */
            <div
              className="window-titlebar h-10 px-4 flex items-center justify-between bg-black/[0.03] dark:bg-white/[0.04] border-b border-black/[0.06] dark:border-white/[0.08] cursor-grab active:cursor-grabbing shrink-0 select-none"
              onPointerDown={(e) => {
                if (!isMaximized) {
                  dragControls.start(e);
                }
              }}
              onDoubleClick={() => setIsMaximized((prev) => !prev)}
            >
              {/* Traffic Light Buttons */}
              <div
                className="flex items-center gap-2 group"
                onPointerDown={(e) => e.stopPropagation()}
              >
                {/* Close */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose?.();
                  }}
                  title="Close"
                  className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center text-black/70 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <X size={8} className="opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
                </button>

                {/* Minimize */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMinimize?.();
                  }}
                  title="Minimize"
                  className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center text-black/70 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Minus size={8} className="opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
                </button>

                {/* Maximize */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMaximized((prev) => !prev);
                  }}
                  title={isMaximized ? "Restore" : "Maximize"}
                  className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center text-black/70 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  {isMaximized ? (
                    <Minimize2 size={8} className="opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
                  ) : (
                    <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
                  )}
                </button>
              </div>

              {/* Window Title & Icon */}
              <div className="flex items-center gap-2 text-xs font-semibold text-black/70 dark:text-white/80 pointer-events-none truncate max-w-[200px] sm:max-w-xs">
                {icon && <span className="text-sm shrink-0">{icon}</span>}
                <span className="truncate">{title}</span>
              </div>

              {/* Window Size Indicator or Spacer */}
              <div className="text-[10px] font-mono text-black/30 dark:text-white/30 hidden sm:block">
                {isMaximized ? "Fullscreen" : `${size.width}×${size.height}`}
              </div>
            </div>
          )}

          {/* Scrollable Window Body */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden text-black/90 dark:text-white/90 p-4 sm:p-6 text-sm font-sans custom-scrollbar cursor-default select-text">
            {children}
          </div>

          {/* 3. RESIZE HANDLES (DESKTOP ONLY: EDGES & CORNERS) */}
          {!isMobile && !isMaximized && (
            <>
              {/* Edges */}
              <div
                className="absolute top-0 left-3 right-3 h-1.5 cursor-ns-resize z-40 hover:bg-blue-500/20 transition-colors"
                onPointerDown={(e) => handleResizePointerDown("n", e)}
                title="Resize Top"
              />
              <div
                className="absolute bottom-0 left-3 right-3 h-2 cursor-ns-resize z-40 hover:bg-blue-500/20 transition-colors"
                onPointerDown={(e) => handleResizePointerDown("s", e)}
                title="Resize Bottom"
              />
              <div
                className="absolute left-0 top-3 bottom-3 w-1.5 cursor-ew-resize z-40 hover:bg-blue-500/20 transition-colors"
                onPointerDown={(e) => handleResizePointerDown("w", e)}
                title="Resize Left"
              />
              <div
                className="absolute right-0 top-3 bottom-3 w-2 cursor-ew-resize z-40 hover:bg-blue-500/20 transition-colors"
                onPointerDown={(e) => handleResizePointerDown("e", e)}
                title="Resize Right"
              />

              {/* Corners */}
              <div
                className="absolute top-0 left-0 w-3.5 h-3.5 cursor-nwse-resize z-50 hover:bg-blue-500/30 rounded-tl-xl transition-colors"
                onPointerDown={(e) => handleResizePointerDown("nw", e)}
                title="Resize Top-Left"
              />
              <div
                className="absolute top-0 right-0 w-3.5 h-3.5 cursor-nesw-resize z-50 hover:bg-blue-500/30 rounded-tr-xl transition-colors"
                onPointerDown={(e) => handleResizePointerDown("ne", e)}
                title="Resize Top-Right"
              />
              <div
                className="absolute bottom-0 left-0 w-3.5 h-3.5 cursor-nesw-resize z-50 hover:bg-blue-500/30 rounded-bl-xl transition-colors"
                onPointerDown={(e) => handleResizePointerDown("sw", e)}
                title="Resize Bottom-Left"
              />
              <div
                className="absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize z-50 hover:bg-blue-500/30 rounded-br-2xl transition-colors flex items-end justify-end p-1 group"
                onPointerDown={(e) => handleResizePointerDown("se", e)}
                title="Drag to resize window"
              >
                {/* Visual macOS Corner Resize Grip Indicator */}
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="currentColor"
                  className="text-black/30 dark:text-white/30 group-hover:text-blue-500 transition-colors pointer-events-none"
                >
                  <circle cx="6.5" cy="6.5" r="1" />
                  <circle cx="6.5" cy="3.5" r="1" />
                  <circle cx="3.5" cy="6.5" r="1" />
                </svg>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
