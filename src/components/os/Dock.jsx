"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Images,
  Crown,
  Piano,
  Music,
  Mail,
  Settings,
} from "lucide-react";

export default function Dock({ onOpenApp, openWindows = {} }) {
  const [hoveredApp, setHoveredApp] = useState(null);

  // Bottom dock contains: Terminal, Gallery, Chess, Instrument, Music, Contact, Settings
  const dockApps = [
    {
      id: "terminal",
      label: "Terminal (CLI)",
      icon: <Terminal className="w-6 h-6 text-emerald-400" />,
      bg: "bg-slate-900 border border-slate-700",
      action: () => onOpenApp("terminal"),
    },
    {
      id: "gallery",
      label: "Photo Gallery",
      icon: <Images className="w-6 h-6 text-purple-300" />,
      bg: "bg-gradient-to-tr from-purple-700 via-indigo-700 to-pink-600 shadow-md border border-purple-400/30",
      action: () => onOpenApp("gallery"),
    },
    {
      id: "chess",
      label: "Chess Grandmaster ♟️",
      icon: <Crown className="w-6 h-6 text-amber-300" />,
      bg: "bg-gradient-to-tr from-amber-800 via-yellow-700 to-amber-950 shadow-md border border-amber-500/40",
      action: () => onOpenApp("chess"),
    },
    {
      id: "instrument",
      label: "Synthesizer & Piano 🎹",
      icon: <Piano className="w-6 h-6 text-sky-300" />,
      bg: "bg-gradient-to-tr from-cyan-700 via-blue-700 to-indigo-800 shadow-md border border-sky-400/40",
      action: () => onOpenApp("instrument"),
    },
    {
      id: "music",
      label: "Music Player",
      icon: <Music className="w-6 h-6 text-emerald-300" />,
      bg: "bg-slate-900 border border-emerald-500/30",
      action: () => onOpenApp("music"),
    },
    {
      id: "contact",
      label: "Contact & Mail",
      icon: <Mail className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-tr from-blue-500 to-indigo-600",
      action: () => onOpenApp("contact"),
    },
    {
      id: "settings",
      label: "System Settings",
      icon: <Settings className="w-6 h-6 text-slate-100" />,
      bg: "bg-gradient-to-tr from-slate-600 via-slate-700 to-slate-800 border border-slate-500/40 shadow-md",
      action: () => onOpenApp("settings"),
    },
  ];

  return (
    <div className="hidden md:block fixed bottom-3 left-1/2 -translate-x-1/2 z-40 select-none">
      <div className="flex items-end gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/20 dark:bg-black/30 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-2xl">
        {dockApps.map((app) => {
          const isOpen = openWindows[app.id]?.isOpen;
          const isHovered = hoveredApp === app.id;

          return (
            <div key={app.id} className="relative flex flex-col items-center">
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-10 px-2.5 py-1 rounded-md bg-black/85 text-white text-[11px] font-sans font-medium whitespace-nowrap shadow-lg backdrop-blur-md pointer-events-none transition-all">
                  {app.label}
                </div>
              )}

              {/* Dock Icon Button */}
              <motion.button
                whileHover={{ scale: 1.25, y: -6 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onMouseEnter={() => setHoveredApp(app.id)}
                onMouseLeave={() => setHoveredApp(null)}
                onClick={() => {
                  if (app.action) {
                    app.action();
                  } else {
                    onOpenApp(app.id);
                  }
                }}
                className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md relative overflow-hidden ${app.bg}`}
              >
                {app.icon}
              </motion.button>

              {/* Active Dot indicator */}
              <div
                className={`w-1 h-1 rounded-full mt-1 transition-opacity ${
                  isOpen ? "bg-white opacity-100 shadow-[0_0_6px_#fff]" : "opacity-0"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
