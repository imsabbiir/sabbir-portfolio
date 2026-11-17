"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LockScreen from "@/components/LockScreen";
import Header from "@/components/common/Header";
import DraggableWindow from "@/components/os/DraggableWindow";
import SpotifyWidget from "@/components/widgets/SpotifyWidget";

// 3 Separate Movable Desktop Widgets
import DigitalClockWidget from "@/components/widgets/DigitalClockWidget";
import DateWidget from "@/components/widgets/DateWidget";
import LiveWeatherWidget from "@/components/widgets/LiveWeatherWidget";

// OS Components
import OSWindow from "@/components/os/OSWindow";
import DesktopIcons from "@/components/os/DesktopIcons";
import Dock from "@/components/os/Dock";
import MobileAppGrid from "@/components/os/MobileAppGrid";
import MobileSidePanel from "@/components/os/MobileSidePanel";

// App Windows
import TerminalWindow from "@/components/os/TerminalWindow";
import ProjectsWindow from "@/components/os/ProjectsWindow";
import AboutWindow from "@/components/os/AboutWindow";
import SkillsWindow from "@/components/os/SkillsWindow";
import ContactWindow from "@/components/os/ContactWindow";
import ResumeWindow from "@/components/os/ResumeWindow";
import SettingsWindow, { PRESET_LOCATIONS } from "@/components/os/SettingsWindow";
import GalleryWindow from "@/components/os/GalleryWindow";
import ChessWindow from "@/components/os/ChessWindow";
import InstrumentWindow from "@/components/os/InstrumentWindow";
import { THEMES, getThemeById } from "@/data/themesData";

// Icons
import {
  FaRotateLeft,
  FaImage,
  FaTerminal,
  FaFolderOpen,
} from "react-icons/fa6";
import {
  Folder,
  Terminal,
  Mail,
  FileText,
  FileCode,
  Settings,
  Music,
  Lock,
  Images,
  Crown,
  Piano,
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
  X,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";

const INITIAL_WALLPAPERS = [
  "/bg.svg",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2400&q=85",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2400&q=85",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=85",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=85",
];

export default function Page() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Customization: Wallpapers & Theme
  const [wallpapers, setWallpapers] = useState(INITIAL_WALLPAPERS);
  const [wallpaperIdx, setWallpaperIdx] = useState(0);
  const [currentTheme, setCurrentTheme] = useState("blue");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const activeThemeConfig = getThemeById(currentTheme);

  // Customization: Time & Timezone State
  const [currentTimezone, setCurrentTimezone] = useState("Asia/Dhaka");
  const [is24Hour, setIs24Hour] = useState(false);
  const [timeOffsetHours, setTimeOffsetHours] = useState(0);
  const [customDate, setCustomDate] = useState(null);

  // Customization: Weather Location & Climate State
  const [weatherCity, setWeatherCity] = useState("Dhaka");
  const [weatherTemp, setWeatherTemp] = useState(29);
  const [weatherCondition, setWeatherCondition] = useState("Sunny & Pleasant");
  const [weatherIcon, setWeatherIcon] = useState("sun");

  // Customization: 3 Separate Movable Widgets Visibility
  const [widgetsVisibility, setWidgetsVisibility] = useState({
    digitalClock: true,
    date: true,
    weather: true,
  });

  // Widget reset key (forces remount to initial position)
  const [resetKey, setResetKey] = useState(0);

  // Window Management State
  const [topZ, setTopZ] = useState(40);
  const [openWindows, setOpenWindows] = useState({
    projects: { isOpen: false, isMinimized: false, zIndex: 30 },
    gallery: { isOpen: false, isMinimized: false, zIndex: 30 },
    chess: { isOpen: false, isMinimized: false, zIndex: 30 },
    instrument: { isOpen: false, isMinimized: false, zIndex: 30 },
    terminal: { isOpen: false, isMinimized: false, zIndex: 30 },
    about: { isOpen: false, isMinimized: false, zIndex: 30 },
    skills: { isOpen: false, isMinimized: false, zIndex: 30 },
    contact: { isOpen: false, isMinimized: false, zIndex: 30 },
    resume: { isOpen: false, isMinimized: false, zIndex: 30 },
    settings: { isOpen: false, isMinimized: false, zIndex: 30 },
    music: { isOpen: false, isMinimized: false, zIndex: 30 },
  });

  // Right-click context menu state (Desktop Only)
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  const handleContextMenu = (e) => {
    e.preventDefault();
    // Do not show desktop context menu on mobile screens (< 768px)
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setContextMenu({ visible: false, x: 0, y: 0 });
      return;
    }
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleClick = useCallback(() => {
    if (contextMenu.visible) {
      setContextMenu({ visible: false, x: 0, y: 0 });
    }
  }, [contextMenu.visible]);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  // Window Actions - High-performance functional state transitions
  const openApp = useCallback((id) => {
    setTopZ((prev) => {
      const nextZ = prev + 1;
      setOpenWindows((w) => ({
        ...w,
        [id]: {
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
        },
      }));
      return nextZ;
    });
  }, []);

  const closeApp = useCallback((id) => {
    setOpenWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
  }, []);

  const minimizeApp = useCallback((id) => {
    setOpenWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
  }, []);

  const focusApp = useCallback((id) => {
    setTopZ((prev) => {
      const nextZ = prev + 1;
      setOpenWindows((w) => ({
        ...w,
        [id]: { ...w[id], zIndex: nextZ },
      }));
      return nextZ;
    });
  }, []);

  const toggleWidget = (key) => {
    setWidgetsVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const selectWallpaper = (val) => {
    if (typeof val === "number") {
      setWallpaperIdx(val);
    } else if (typeof val === "string") {
      setWallpapers((prev) => [val, ...prev]);
      setWallpaperIdx(0);
    }
  };

  const toggleWallpaper = () => {
    setWallpaperIdx((prev) => (prev + 1) % wallpapers.length);
  };

  // Persistent Manual Dark / Light Mode (system independent)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sabbir_theme_mode");
      if (saved === "light") {
        setIsDarkMode(false);
        document.documentElement.classList.remove("dark");
        handleSelectTheme("blue");
      } else {
        // Default to dark mode manually without relying on system
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
        handleSelectTheme("charcoal");
      }
    } catch (e) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (typeof document !== "undefined") {
        if (next) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
      try {
        localStorage.setItem("sabbir_theme_mode", next ? "dark" : "light");
      } catch (e) {}

      if (next) {
        handleSelectTheme("charcoal");
      } else {
        handleSelectTheme("blue");
      }
      return next;
    });
  };

  const handleResetPositions = () => {
    setResetKey((prev) => prev + 1);
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  const handleLockScreen = () => {
    setIsUnlocked(false);
  };

  const handleSelectTimezone = (tz, preset) => {
    setCurrentTimezone(tz);
    if (preset) {
      setWeatherCity(preset.city);
      setWeatherTemp(preset.temp);
      setWeatherCondition(preset.condition);
      setWeatherIcon(preset.icon);
    }
  };

  const handleUpdateWeather = (city, temp, condition, icon) => {
    setWeatherCity(city);
    setWeatherTemp(temp);
    setWeatherCondition(condition);
    if (icon) setWeatherIcon(icon);
  };

  const handleResetWeatherTimeAuto = () => {
    setCurrentTimezone("Asia/Dhaka");
    setIs24Hour(false);
    setTimeOffsetHours(0);
    setCustomDate(null);
    setWeatherCity("Dhaka");
    setWeatherTemp(29);
    setWeatherCondition("Sunny & Pleasant");
    setWeatherIcon("sun");
  };

  const handleSelectTheme = (themeId, targetWallpaperUrl = null) => {
    setCurrentTheme(themeId);
    const targetTheme = getThemeById(themeId);
    const wpUrl = targetWallpaperUrl !== undefined ? targetWallpaperUrl : targetTheme?.wallpaper;
    if (wpUrl) {
      const existingIdx = wallpapers.findIndex((w) => w === wpUrl);
      if (existingIdx !== -1) {
        setWallpaperIdx(existingIdx);
      } else {
        setWallpapers((prev) => [wpUrl, ...prev]);
        setWallpaperIdx(0);
      }
    }
  };

  const getThemeClass = (th) => {
    switch (th) {
      case "lavender":
        return "theme-lavender";
      case "green":
        return "theme-green";
      case "charcoal":
        return "theme-charcoal";
      case "sunset":
        return "theme-sunset";
      default:
        return "";
    }
  };

  // Mobile App Springboard Grid Configuration (Smartphone OS UI)
  // Non-dock apps only (Bottom dock has Contact, Projects, Gallery, Music)
  const mobileApps = [
    {
      id: "about",
      label: "About Me",
      icon: <FileCode className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-tr from-blue-500 to-indigo-600",
    },
    {
      id: "skills",
      label: "Skills",
      icon: <Sparkles className="w-6 h-6 text-amber-200" />,
      bg: "bg-gradient-to-tr from-amber-500 to-orange-600",
    },
    {
      id: "resume",
      label: "Resume",
      icon: <FileText className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-tr from-rose-500 to-red-600",
    },
    {
      id: "terminal",
      label: "Terminal",
      icon: <Terminal className="w-6 h-6 text-emerald-400" />,
      bg: "bg-slate-900 border border-emerald-500/30",
    },
    {
      id: "chess",
      label: "Chess",
      icon: <Crown className="w-6 h-6 text-amber-200" />,
      bg: "bg-gradient-to-tr from-amber-600 via-yellow-600 to-amber-800",
    },
    {
      id: "instrument",
      label: "Piano",
      icon: <Piano className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-tr from-cyan-400 to-indigo-600",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-tr from-slate-500 via-slate-600 to-slate-700",
    },
  ];

  const mobileDockShortcuts = [
    {
      id: "contact",
      label: "Phone / Mail",
      icon: <Mail className="w-5 h-5 text-white" />,
      bg: "linear-gradient(135deg, #3b82f6, #4f46e5)",
    },
    {
      id: "projects",
      label: "Files",
      icon: <Folder className="w-5 h-5 text-white" />,
      bg: "linear-gradient(135deg, #0ea5e9, #2563eb)",
    },
    {
      id: "gallery",
      label: "Photos",
      icon: <Images className="w-5 h-5 text-white" />,
      bg: "linear-gradient(135deg, #a855f7, #ec4899)",
    },
    {
      id: "music",
      label: "Music",
      icon: <Music className="w-5 h-5 text-emerald-200" />,
      bg: "linear-gradient(135deg, #059669, #0f766e)",
    },
  ];

  return (
    <div
      className={`w-full max-w-[100vw] h-screen h-[100dvh] max-h-[100dvh] overflow-hidden overflow-x-hidden ${
        isDarkMode ? "dark" : ""
      } bg-slate-950 text-slate-100 flex flex-col font-sans select-none relative transition-colors duration-500 ${getThemeClass(
        currentTheme
      )}`}
    >
      {/* 1. LOCK SCREEN (Always starts here, smoothly unlocks) */}
      <AnimatePresence>
        {!isUnlocked && (
          <LockScreen onUnlock={() => setIsUnlocked(true)} />
        )}
      </AnimatePresence>

      {/* 2. MAIN DESKTOP ENVIRONMENT */}
      {isUnlocked && (
        <div
          onContextMenu={handleContextMenu}
          style={{
            backgroundImage: `url('${wallpapers[wallpaperIdx]}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="relative w-full max-w-[100vw] h-screen h-[100dvh] max-h-[100dvh] flex flex-col overflow-hidden overflow-x-hidden transition-all duration-700 shrink-0"
        >
          {/* Atmospheric Theme Tone Overlay */}
          <div className={`absolute inset-0 pointer-events-none transition-colors duration-700 z-0 ${activeThemeConfig.overlayClass}`} />

          {/* Top macOS Menu Bar */}
          <Header
            onOpenApp={openApp}
            onToggleWallpaper={toggleWallpaper}
            onResetPositions={handleResetPositions}
            onLockScreen={handleLockScreen}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />

          {/* Desktop Canvas Workspace */}
          <div id="desktop-canvas" className="relative flex-1 w-full max-w-[100vw] h-[calc(100vh-36px)] h-[calc(100dvh-36px)] overflow-hidden overflow-x-hidden">
            {/* 1. MOBILE SMARTPHONE LAUNCHER / SPRINGBOARD (Visible on Mobile < md) */}
            <div className="flex md:hidden flex-col justify-between w-full max-w-full h-full px-3.5 pt-2 pb-2 select-none overflow-hidden overflow-x-hidden">
              {/* A. Top Area: Desktop-Style Grand Hero Widgets (Weather, Clock, Date) */}
              {/* Lowered down by 1-2 empty rows from the top status bar as requested */}
              <div className="w-full shrink-0 flex flex-col items-center justify-center text-center pt-8 sm:pt-12 pb-2 space-y-1.5">
                {/* 1. Live Weather Widget (City, Temp, Condition, Animated Icon) */}
                <div className="scale-95 sm:scale-100 origin-center">
                  <LiveWeatherWidget
                    city={weatherCity}
                    temp={weatherTemp}
                    condition={weatherCondition}
                    iconType={weatherIcon}
                    themeConfig={activeThemeConfig.weather}
                  />
                </div>

                {/* 2. Big Glowing Digital Clock (Computer Display Style & Size) */}
                <div className="my-0.5">
                  <DigitalClockWidget
                    timezone={currentTimezone}
                    is24Hour={is24Hour}
                    timeOffsetHours={timeOffsetHours}
                    themeConfig={activeThemeConfig.clock}
                  />
                </div>

                {/* 3. Full Date Widget */}
                <div className="scale-95 sm:scale-100 origin-center">
                  <DateWidget
                    timezone={currentTimezone}
                    customDate={customDate}
                    timeOffsetHours={timeOffsetHours}
                    themeConfig={activeThemeConfig.date}
                  />
                </div>
              </div>

              {/* Flexible Spacer (pushes all springboard icons down to bottom thumb zone) */}
              <div className="flex-1 min-h-[8px]" />

              {/* B. Bottom-Anchored Springboard Apps Grid (Stacked 4-in-bottom-row, then up) */}
              <div className="w-full shrink-0">
                <MobileAppGrid
                  apps={mobileApps}
                  onOpenApp={openApp}
                />
              </div>

              {/* 1 Row Empty Gap between App Icons and Bottom Dock (বটম আর অ্যাপ আইকনের মাঝে এক রো ফাঁকা) */}
              <div className="h-[72px] shrink-0 w-full" aria-hidden="true" />

              {/* C. Persistent Mobile Phone Bottom Dock (Always 100% visible, never cut off!) */}
              <div className="pt-1 pb-1 shrink-0 z-20 w-full max-w-full">
                <div className="flex items-center justify-around py-2 px-3 rounded-3xl bg-white/20 dark:bg-black/50 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-2xl w-full">
                  {mobileDockShortcuts.map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => openApp(app.id)}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer border border-white/25 shrink-0"
                      style={{ background: app.bg }}
                      title={app.label}
                    >
                      {app.icon}
                    </button>
                  ))}
                </div>
                {/* iOS Swipe Bar Indicator */}
                <div className="w-28 h-1 rounded-full bg-white/50 mx-auto mt-2" />
              </div>
            </div>

            {/* 2. DESKTOP CANVAS WORKSPACE (Visible on Desktop >= md) */}
            {/* Movable Desktop Folders & Files (Projects, About Me, Skills.md, Resume, Gallery) */}
            <DesktopIcons key={`icons-${resetKey}`} onOpenApp={openApp} />

            {/* 3 INDEPENDENT MOVABLE HERO WIDGETS (Desktop Only) */}
            {widgetsVisibility.weather && (
              <div id="widget-weather" className="hidden md:block absolute top-10 sm:top-14 left-1/2 -translate-x-1/2 pointer-events-auto z-10">
                <DraggableWindow key={`weather-${resetKey}`} initialX={0} initialY={0}>
                  <LiveWeatherWidget
                    city={weatherCity}
                    temp={weatherTemp}
                    condition={weatherCondition}
                    iconType={weatherIcon}
                    themeConfig={activeThemeConfig.weather}
                  />
                </DraggableWindow>
              </div>
            )}

            {widgetsVisibility.digitalClock && (
              <div id="widget-clock" className="hidden md:block absolute top-[34%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10">
                <DraggableWindow key={`clock-${resetKey}`} initialX={0} initialY={0}>
                  <DigitalClockWidget
                    timezone={currentTimezone}
                    is24Hour={is24Hour}
                    timeOffsetHours={timeOffsetHours}
                    themeConfig={activeThemeConfig.clock}
                  />
                </DraggableWindow>
              </div>
            )}

            {widgetsVisibility.date && (
              <div id="widget-date" className="hidden md:block absolute top-[48%] left-1/2 -translate-x-1/2 pointer-events-auto z-10">
                <DraggableWindow key={`date-${resetKey}`} initialX={0} initialY={0}>
                  <DateWidget
                    timezone={currentTimezone}
                    customDate={customDate}
                    timeOffsetHours={timeOffsetHours}
                    themeConfig={activeThemeConfig.date}
                  />
                </DraggableWindow>
              </div>
            )}

            {/* FLOATING WINDOWS (macOS Style Draggable Windows) */}

            {/* 1. Projects Window */}
            <OSWindow
              key={`projects-${resetKey}`}
              id="projects"
              title="Finder — Projects & Works"
              icon={<Folder className="text-sky-500" size={15} />}
              isOpen={openWindows.projects.isOpen}
              isMinimized={openWindows.projects.isMinimized}
              zIndex={openWindows.projects.zIndex}
              onClose={() => closeApp("projects")}
              onMinimize={() => minimizeApp("projects")}
              onFocus={() => focusApp("projects")}
              initialPosition={{ x: 120, y: 50 }}
              defaultWidth={760}
              defaultHeight={500}
            >
              <ProjectsWindow />
            </OSWindow>

            {/* 2. Interactive Terminal Window (Elena Gonci Style) */}
            <OSWindow
              key={`terminal-${resetKey}`}
              id="terminal"
              title="Terminal — sabbir@macbook: ~"
              icon={<Terminal className="text-emerald-500" size={15} />}
              isOpen={openWindows.terminal.isOpen}
              isMinimized={openWindows.terminal.isMinimized}
              zIndex={openWindows.terminal.zIndex}
              onClose={() => closeApp("terminal")}
              onMinimize={() => minimizeApp("terminal")}
              onFocus={() => focusApp("terminal")}
              initialPosition={{ x: 180, y: 70 }}
              defaultWidth={660}
              defaultHeight={440}
            >
              <TerminalWindow onOpenApp={openApp} onResetPositions={handleResetPositions} />
            </OSWindow>

            {/* 3. About Window (About_Me.md) */}
            <OSWindow
              key={`about-${resetKey}`}
              id="about"
              title="Markdown — About_Me.md"
              icon={<FileCode className="text-blue-500" size={15} />}
              isOpen={openWindows.about.isOpen}
              isMinimized={openWindows.about.isMinimized}
              zIndex={openWindows.about.zIndex}
              onClose={() => closeApp("about")}
              onMinimize={() => minimizeApp("about")}
              onFocus={() => focusApp("about")}
              initialPosition={{ x: 150, y: 60 }}
              defaultWidth={660}
              defaultHeight={540}
            >
              <AboutWindow />
            </OSWindow>

            {/* 4. Skills Window (Skills.md) */}
            <OSWindow
              key={`skills-${resetKey}`}
              id="skills"
              title="Markdown — Skills.md"
              icon={<FileCode className="text-amber-500" size={15} />}
              isOpen={openWindows.skills.isOpen}
              isMinimized={openWindows.skills.isMinimized}
              zIndex={openWindows.skills.zIndex}
              onClose={() => closeApp("skills")}
              onMinimize={() => minimizeApp("skills")}
              onFocus={() => focusApp("skills")}
              initialPosition={{ x: 160, y: 55 }}
              defaultWidth={680}
              defaultHeight={540}
            >
              <SkillsWindow />
            </OSWindow>

            {/* 5. Contact Window */}
            <OSWindow
              key={`contact-${resetKey}`}
              id="contact"
              title="Mail — Contact Sabbir Ahmed"
              icon={<Mail className="text-blue-500" size={15} />}
              isOpen={openWindows.contact.isOpen}
              isMinimized={openWindows.contact.isMinimized}
              zIndex={openWindows.contact.zIndex}
              onClose={() => closeApp("contact")}
              onMinimize={() => minimizeApp("contact")}
              onFocus={() => focusApp("contact")}
              initialPosition={{ x: 250, y: 90 }}
              defaultWidth={560}
              defaultHeight={460}
            >
              <ContactWindow />
            </OSWindow>

            {/* 6. Resume Window */}
            <OSWindow
              key={`resume-${resetKey}`}
              id="resume"
              title="Preview — Sabbir_Ahmed_Resume.pdf"
              icon={<FileText className="text-rose-500" size={15} />}
              isOpen={openWindows.resume.isOpen}
              isMinimized={openWindows.resume.isMinimized}
              zIndex={openWindows.resume.zIndex}
              onClose={() => closeApp("resume")}
              onMinimize={() => minimizeApp("resume")}
              onFocus={() => focusApp("resume")}
              initialPosition={{ x: 140, y: 40 }}
              defaultWidth={680}
              defaultHeight={540}
            >
              <ResumeWindow />
            </OSWindow>

            {/* 7. Settings & Control Center Window */}
            <OSWindow
              key={`settings-${resetKey}`}
              id="settings"
              title="Settings — Control Panel & Customizer"
              icon={<Settings className="text-blue-400" size={15} />}
              isOpen={openWindows.settings.isOpen}
              isMinimized={openWindows.settings.isMinimized}
              zIndex={openWindows.settings.zIndex}
              onClose={() => closeApp("settings")}
              onMinimize={() => minimizeApp("settings")}
              onFocus={() => focusApp("settings")}
              initialPosition={{ x: 170, y: 60 }}
              defaultWidth={700}
              defaultHeight={520}
            >
              <SettingsWindow
                widgetsVisibility={widgetsVisibility}
                onToggleWidget={toggleWidget}
                onResetPositions={handleResetPositions}
                currentTheme={currentTheme}
                onSelectTheme={handleSelectTheme}
                wallpapers={wallpapers}
                currentWallpaperIdx={wallpaperIdx}
                onSelectWallpaper={selectWallpaper}
                currentTimezone={currentTimezone}
                onSelectTimezone={handleSelectTimezone}
                is24Hour={is24Hour}
                onToggle24Hour={setIs24Hour}
                timeOffsetHours={timeOffsetHours}
                onAdjustHours={setTimeOffsetHours}
                customDate={customDate}
                onSelectCustomDate={setCustomDate}
                weatherCity={weatherCity}
                weatherTemp={weatherTemp}
                weatherCondition={weatherCondition}
                weatherIcon={weatherIcon}
                onUpdateWeather={handleUpdateWeather}
                onResetWeatherTimeAuto={handleResetWeatherTimeAuto}
                onLockScreen={handleLockScreen}
                isDarkMode={isDarkMode}
                onToggleDarkMode={toggleDarkMode}
              />
            </OSWindow>

            {/* 8. Music / Spotify Player Window (Minimizable, Maximizable, Draggable macOS Window) */}
            <OSWindow
              key={`music-${resetKey}`}
              id="music"
              title="Music — Sabbir's Bengali & Rock Playlist"
              icon={<Music className="text-emerald-400" size={15} />}
              isOpen={openWindows.music?.isOpen}
              isMinimized={openWindows.music?.isMinimized}
              zIndex={openWindows.music?.zIndex}
              onClose={() => closeApp("music")}
              onMinimize={() => minimizeApp("music")}
              onFocus={() => focusApp("music")}
              initialPosition={{ x: 200, y: 65 }}
              defaultWidth={560}
              defaultHeight={500}
            >
              <SpotifyWidget />
            </OSWindow>

            {/* 9. Photo Gallery Window (Personal Shots, Setups) */}
            <OSWindow
              key={`gallery-${resetKey}`}
              id="gallery"
              title="Photos — Visual Gallery"
              icon={<Images className="text-purple-400" size={15} />}
              isOpen={openWindows.gallery?.isOpen}
              isMinimized={openWindows.gallery?.isMinimized}
              zIndex={openWindows.gallery?.zIndex}
              onClose={() => closeApp("gallery")}
              onMinimize={() => minimizeApp("gallery")}
              onFocus={() => focusApp("gallery")}
              initialPosition={{ x: 120, y: 35 }}
              defaultWidth={820}
              defaultHeight={580}
            >
              <GalleryWindow />
            </OSWindow>

            {/* 10. Interactive Chess Grandmaster Window */}
            <OSWindow
              key={`chess-${resetKey}`}
              id="chess"
              title="Chess — Grandmaster AI & 2-Player"
              icon={<Crown className="text-amber-400" size={15} />}
              isOpen={openWindows.chess?.isOpen}
              isMinimized={openWindows.chess?.isMinimized}
              zIndex={openWindows.chess?.zIndex}
              onClose={() => closeApp("chess")}
              onMinimize={() => minimizeApp("chess")}
              onFocus={() => focusApp("chess")}
              initialPosition={{ x: 170, y: 50 }}
              defaultWidth={780}
              defaultHeight={570}
            >
              <ChessWindow />
            </OSWindow>

            {/* 11. Interactive Musical Instrument / Piano Window */}
            <OSWindow
              key={`instrument-${resetKey}`}
              id="instrument"
              title="Synthesizer — SoundStudio 3000 Piano"
              icon={<Piano className="text-sky-400" size={15} />}
              isOpen={openWindows.instrument?.isOpen}
              isMinimized={openWindows.instrument?.isMinimized}
              zIndex={openWindows.instrument?.zIndex}
              onClose={() => closeApp("instrument")}
              onMinimize={() => minimizeApp("instrument")}
              onFocus={() => focusApp("instrument")}
              initialPosition={{ x: 150, y: 60 }}
              defaultWidth={760}
              defaultHeight={520}
            >
              <InstrumentWindow />
            </OSWindow>

            {/* Bottom Floating macOS Dock (Terminal, Gallery, Chess, Instrument, Music, Contact, Settings) */}
            <Dock
              onOpenApp={openApp}
              openWindows={openWindows}
            />
          </div>

          {/* MOBILE FLOATING EDGE SIDE PANEL (Wallpaper, Dark/Light Mode, Lock Phone) */}
          <MobileSidePanel
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
            onToggleWallpaper={toggleWallpaper}
            onLockScreen={handleLockScreen}
          />

          {/* Desktop Right-Click Context Menu (Desktop Only) */}
          {contextMenu.visible && (
            <div
              style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
              className="hidden md:block fixed z-50 w-52 bg-white/90 dark:bg-slate-900/95 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl shadow-2xl py-1 text-xs font-sans text-slate-800 dark:text-slate-100 pointer-events-auto"
            >
              <button
                onClick={() => {
                  openApp("settings");
                  setContextMenu({ visible: false, x: 0, y: 0 });
                }}
                className="w-full px-3 py-2 text-left hover:bg-blue-600 hover:text-white flex items-center gap-2 transition"
              >
                <Settings className="text-xs text-blue-400" size={14} />
                <span>Open Settings</span>
              </button>

              <button
                onClick={() => {
                  openApp("terminal");
                  setContextMenu({ visible: false, x: 0, y: 0 });
                }}
                className="w-full px-3 py-2 text-left hover:bg-blue-600 hover:text-white flex items-center gap-2 transition"
              >
                <FaTerminal className="text-xs text-emerald-500" />
                <span>Open Terminal</span>
              </button>

              <button
                onClick={() => {
                  openApp("gallery");
                  setContextMenu({ visible: false, x: 0, y: 0 });
                }}
                className="w-full px-3 py-2 text-left hover:bg-blue-600 hover:text-white flex items-center gap-2 transition"
              >
                <Images className="text-xs text-purple-400" size={14} />
                <span>Open Gallery (Photos)</span>
              </button>

              <button
                onClick={() => {
                  openApp("chess");
                  setContextMenu({ visible: false, x: 0, y: 0 });
                }}
                className="w-full px-3 py-2 text-left hover:bg-blue-600 hover:text-white flex items-center gap-2 transition"
              >
                <Crown className="text-xs text-amber-400" size={14} />
                <span>Play Chess ♟️</span>
              </button>

              <button
                onClick={() => {
                  openApp("instrument");
                  setContextMenu({ visible: false, x: 0, y: 0 });
                }}
                className="w-full px-3 py-2 text-left hover:bg-blue-600 hover:text-white flex items-center gap-2 transition"
              >
                <Piano className="text-xs text-sky-400" size={14} />
                <span>Play Synthesizer 🎹</span>
              </button>

              <button
                onClick={() => {
                  openApp("projects");
                  setContextMenu({ visible: false, x: 0, y: 0 });
                }}
                className="w-full px-3 py-2 text-left hover:bg-blue-600 hover:text-white flex items-center gap-2 transition"
              >
                <FaFolderOpen className="text-xs text-sky-500" />
                <span>Open Projects</span>
              </button>

              <button
                onClick={() => {
                  toggleWallpaper();
                  setContextMenu({ visible: false, x: 0, y: 0 });
                }}
                className="w-full px-3 py-2 text-left hover:bg-blue-600 hover:text-white flex items-center gap-2 transition"
              >
                <FaImage className="text-xs text-purple-500" />
                <span>Next Wallpaper</span>
              </button>

              {/* Manual Dark/Light Mode in Context Menu */}
              <button
                onClick={() => {
                  toggleDarkMode();
                  setContextMenu({ visible: false, x: 0, y: 0 });
                }}
                className="w-full px-3 py-2 text-left hover:bg-indigo-600 hover:text-white flex items-center gap-2 transition"
              >
                {isDarkMode ? (
                  <Sun className="text-xs text-amber-400" size={14} />
                ) : (
                  <Moon className="text-xs text-indigo-400" size={14} />
                )}
                <span>{isDarkMode ? "Light Mode (লাইট মোড)" : "Dark Mode (ডার্ক মোড)"}</span>
              </button>

              <div className="h-px bg-black/10 dark:bg-white/10 my-1" />

              <button
                onClick={handleResetPositions}
                className="w-full px-3 py-2 text-left hover:bg-blue-600 hover:text-white flex items-center gap-2 transition"
              >
                <FaRotateLeft className="text-xs text-amber-500" />
                <span>Reset Widget Positions</span>
              </button>

              <button
                onClick={() => {
                  handleLockScreen();
                  setContextMenu({ visible: false, x: 0, y: 0 });
                }}
                className="w-full px-3 py-2 text-left hover:bg-amber-600 hover:text-white flex items-center gap-2 transition"
              >
                <Lock className="text-xs text-amber-400" size={14} />
                <span>Lock Workspace 🔒</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
