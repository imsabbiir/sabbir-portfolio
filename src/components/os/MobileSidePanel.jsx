"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Images, Sun, Moon, Lock, SlidersHorizontal, ChevronRight } from "lucide-react";

export default function MobileSidePanel({
  isDarkMode = false,
  onToggleDarkMode,
  onToggleWallpaper,
  onLockScreen,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 1. Closed State Floating Edge Tab (Bigger, clearly clickable, placed higher up at 30% height) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          title="Open Control Tools"
          className="fixed right-0 top-[30%] -translate-y-1/2 z-[70] md:hidden w-8 h-12 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-l-2xl shadow-xl border-y border-l border-white/60 dark:border-white/20 flex items-center justify-center transition-transform cursor-pointer active:scale-95 group"
        >
          <div className="flex items-center gap-0.5 text-slate-700 dark:text-slate-200 group-hover:scale-110 transition-transform">
            <SlidersHorizontal size={14} />
          </div>
        </button>
      )}

      {/* 2. Opened Floating Side Dock with Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop: Tap anywhere on screen to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[65] md:hidden bg-black/25 backdrop-blur-[2px] touch-manipulation"
            />

            {/* Floating Side Capsule */}
            <motion.div
              initial={{ x: 70, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 70, opacity: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              drag="x"
              dragConstraints={{ left: 0, right: 100 }}
              dragElastic={{ right: 0.5, left: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x > 30 || info.velocity.x > 200) {
                  setIsOpen(false);
                }
              }}
              onClick={(e) => e.stopPropagation()}
              className="fixed right-2.5 top-[30%] -translate-y-1/2 z-[70] md:hidden flex items-center gap-1.5 select-none touch-manipulation"
            >
              {/* Close / Collapse tab */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-5 h-9 rounded-l-xl bg-white/20 hover:bg-white/30 dark:bg-black/40 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
                title="Close Sidebar"
              >
                <ChevronRight size={14} />
              </button>

              {/* The 3 Floating Icons Container */}
              <div className="p-2 rounded-2xl bg-slate-900/95 dark:bg-black/95 backdrop-blur-2xl border border-white/20 shadow-2xl flex flex-col items-center gap-2.5">
                {/* 1. Wallpaper Button */}
                <button
                  type="button"
                  onClick={() => {
                    onToggleWallpaper?.();
                  }}
                  className="w-11 h-11 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-400/30 flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer"
                  title="Change Wallpaper"
                >
                  <Images size={19} />
                </button>

                {/* 2. Dark / Light Mode Toggle Button */}
                <button
                  type="button"
                  onClick={() => {
                    onToggleDarkMode?.();
                  }}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer border ${
                    isDarkMode
                      ? "bg-amber-500/20 text-amber-300 border-amber-400/30 hover:bg-amber-500/30"
                      : "bg-indigo-500/20 text-indigo-400 border-indigo-400/30 hover:bg-indigo-500/30"
                  }`}
                  title={isDarkMode ? "Light Mode" : "Dark Mode"}
                >
                  {isDarkMode ? <Sun size={19} /> : <Moon size={19} />}
                </button>

                {/* 3. Lock Phone Button */}
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onLockScreen?.();
                  }}
                  className="w-11 h-11 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-400/30 flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer"
                  title="Lock Workspace"
                >
                  <Lock size={19} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
