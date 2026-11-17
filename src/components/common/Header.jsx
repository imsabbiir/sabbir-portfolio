"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";
import {
  Apple,
  Sparkles,
  Lock,
  Wifi,
  Battery,
  Signal,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";

export default function Header({
  onOpenApp,
  onToggleWallpaper,
  onResetPositions,
  onLockScreen,
  isDarkMode = false,
  onToggleDarkMode,
}) {
  const [time, setTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dateStr = time.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    weekday: "short",
  });
  const timeStr = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const menuActions = {
    Finder: [
      { label: "About SabbirOS", action: () => onOpenApp?.("about") },
      { label: "Settings & Control Panel", action: () => onOpenApp?.("settings") },
      {
        label: isDarkMode ? "Switch to Light Mode ☀️ (লাইট মোড)" : "Switch to Dark Mode 🌙 (ডার্ক মোড)",
        action: () => onToggleDarkMode?.(),
      },
      { label: "Lock Screen 🔒 (লক করুন)", action: () => onLockScreen?.() },
      { label: "Reset All Positions", action: () => onResetPositions?.() },
      { label: "Change Wallpaper", action: () => onToggleWallpaper?.() },
      { label: "Restart Workspace", action: () => window.location.reload() },
    ],
    File: [
      { label: "Open Projects Folder", action: () => onOpenApp?.("projects") },
      { label: "Open Gallery (Photos)", action: () => onOpenApp?.("gallery") },
      { label: "Open About_Me.md", action: () => onOpenApp?.("about") },
      { label: "Open Skills.md", action: () => onOpenApp?.("skills") },
      { label: "Open Terminal (CLI)", action: () => onOpenApp?.("terminal") },
      { label: "Play Chess ♟️", action: () => onOpenApp?.("chess") },
      { label: "Play Instrument 🎹", action: () => onOpenApp?.("instrument") },
    ],
    Window: [
      { label: "Open Settings", action: () => onOpenApp?.("settings") },
      { label: "Open Terminal", action: () => onOpenApp?.("terminal") },
      { label: "Open Resume", action: () => onOpenApp?.("resume") },
      { label: "Open Contact", action: () => onOpenApp?.("contact") },
    ],
    Help: [
      { label: "Documentation & Shortcuts", action: () => onOpenApp?.("terminal") },
      {
        label: "Contact Developer (Mail)",
        action: () => (window.location.href = "mailto:sabbir@example.com"),
      },
    ],
  };

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <header className="h-9 sm:h-8 bg-white/50 dark:bg-black/40 backdrop-blur-2xl text-black/80 dark:text-white/80 border-b border-black/5 dark:border-white/10 relative z-50 font-sans text-xs select-none">
      {/* 1. DESKTOP macOS MENU BAR (Hidden on Mobile, Visible >= md) */}
      <div className="hidden md:flex w-[96%] mx-auto h-full justify-between items-center">
        {/* Left Bar Menus */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onOpenApp?.("about")}
            className="flex items-center gap-1 font-bold text-slate-900 dark:text-white hover:opacity-80 transition cursor-pointer"
            title="About Developer"
          >
            <span className="text-sm"></span>
            <span className="ml-1">SabbirOS</span>
          </button>

          <nav ref={navRef} className="flex space-x-1">
            {Object.entries(menuActions).map(([label, items]) => (
              <div key={label} className="relative">
                <button
                  onClick={() => toggleMenu(label)}
                  className={`px-2 py-1 rounded transition cursor-pointer ${
                    activeMenu === label
                      ? "bg-black/10 dark:bg-white/15 text-black dark:text-white"
                      : "hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  {label}
                </button>

                {activeMenu === label && (
                  <div className="absolute left-0 mt-1 w-52 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-black/10 dark:border-white/15 rounded-xl shadow-xl py-1 z-50">
                    {items.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          item.action?.();
                          setActiveMenu(null);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 hover:bg-blue-600 hover:text-white transition flex items-center justify-between cursor-pointer"
                      >
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right Bar Status & Time */}
        <div className="flex items-center space-x-2.5 text-xs font-medium">
          {/* Manual Dark / Light Mode Toggle Button */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/10 dark:bg-white/10 hover:bg-indigo-500/20 hover:text-indigo-600 dark:hover:text-indigo-300 text-slate-700 dark:text-slate-200 border border-black/10 dark:border-white/15 transition-all shadow-xs cursor-pointer active:scale-95 group"
            title={isDarkMode ? "Switch to Light Mode ☀️ (লাইট মোড)" : "Switch to Dark Mode 🌙 (ডার্ক মোড)"}
          >
            {isDarkMode ? (
              <>
                <Sun size={12} className="text-amber-400 group-hover:rotate-45 transition-transform" />
                <span className="font-semibold text-[11px] hidden lg:inline">Light</span>
              </>
            ) : (
              <>
                <Moon size={12} className="text-indigo-400 group-hover:-rotate-12 transition-transform" />
                <span className="font-semibold text-[11px] hidden lg:inline">Dark</span>
              </>
            )}
          </button>

          {/* Lock Screen Button */}
          <button
            type="button"
            onClick={onLockScreen}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/10 dark:bg-white/10 hover:bg-amber-500/20 hover:text-amber-600 dark:hover:text-amber-300 hover:border-amber-400/40 text-slate-700 dark:text-slate-200 border border-black/10 dark:border-white/15 transition-all shadow-xs cursor-pointer group"
            title="Lock Workspace (লক স্ক্রিনে যান)"
          >
            <Lock size={12} className="text-amber-500 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-[11px] hidden sm:inline">Lock</span>
          </button>

          <div className="h-3 w-px bg-black/10 dark:bg-white/10" />

          <div className="flex space-x-2.5 text-sm text-slate-700 dark:text-slate-300">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-black dark:hover:text-white transition"
              title="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition"
              title="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-600 transition"
              title="Instagram"
            >
              <FaInstagram />
            </a>
          </div>

          <div className="h-3 w-px bg-black/10 dark:bg-white/10" />

          <span className="text-slate-600 dark:text-slate-300 font-mono">{dateStr}</span>
          <span className="font-semibold text-slate-900 dark:text-white font-mono">{timeStr}</span>
        </div>
      </div>

      {/* 2. MOBILE SMARTPHONE STATUS BAR (< md) */}
      <div className="flex md:hidden items-center justify-between w-full px-3 h-full text-black/90 dark:text-white/90 select-none">
        {/* Mobile Clock */}
        <div className="font-semibold text-xs tracking-tight font-mono shrink-0">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
        </div>

        {/* Mobile Status Indicators */}
        <div className="flex items-center gap-2 text-xs shrink-0">
          <Wifi size={13} />
          <div className="flex items-center gap-0.5 font-mono text-[10px] font-bold">
            <span>100%</span>
            <Battery size={14} className="fill-current text-emerald-500" />
          </div>
        </div>
      </div>
    </header>
  );
}
