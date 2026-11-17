"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sliders,
  Palette,
  Image as ImageIcon,
  RotateCcw,
  Check,
  Clock,
  Calendar as CalendarIcon,
  CloudSun,
  Globe,
  MapPin,
  Sparkles,
  Lock,
  Sun,
  Moon,
} from "lucide-react";
import { THEMES, getThemeById } from "@/data/themesData";

export const PRESET_LOCATIONS = [
  {
    city: "Dhaka",
    country: "Bangladesh",
    timezone: "Asia/Dhaka",
    temp: 29,
    condition: "Sunny & Pleasant",
    icon: "sun",
  },
  {
    city: "New York",
    country: "USA",
    timezone: "America/New_York",
    temp: 16,
    condition: "Partly Cloudy",
    icon: "cloud",
  },
  {
    city: "London",
    country: "UK",
    timezone: "Europe/London",
    temp: 13,
    condition: "Light Rain",
    icon: "rain",
  },
  {
    city: "Tokyo",
    country: "Japan",
    timezone: "Asia/Tokyo",
    temp: 18,
    condition: "Clear & Breezy",
    icon: "sun",
  },
  {
    city: "Dubai",
    country: "UAE",
    timezone: "Asia/Dubai",
    temp: 33,
    condition: "Warm & Sunny",
    icon: "fire",
  },
  {
    city: "Paris",
    country: "France",
    timezone: "Europe/Paris",
    temp: 14,
    condition: "Overcast",
    icon: "cloud",
  },
  {
    city: "Sydney",
    country: "Australia",
    timezone: "Australia/Sydney",
    temp: 22,
    condition: "Mild & Sunny",
    icon: "sun",
  },
];

export default function SettingsWindow({
  // Widgets visibility
  widgetsVisibility,
  onToggleWidget,
  onResetPositions,

  // Theme
  currentTheme,
  onSelectTheme,

  // Wallpaper
  wallpapers,
  currentWallpaperIdx,
  onSelectWallpaper,

  // Time & Timezone controls
  currentTimezone,
  onSelectTimezone,
  is24Hour,
  onToggle24Hour,
  timeOffsetHours,
  onAdjustHours,
  customDate,
  onSelectCustomDate,

  // Weather controls
  weatherCity,
  weatherTemp,
  weatherCondition,
  weatherIcon,
  onUpdateWeather,
  onResetWeatherTimeAuto,
  onLockScreen,
  isDarkMode = false,
  onToggleDarkMode,
}) {
  const [activeTab, setActiveTab] = useState("themes");
  const [autoSyncWallpaper, setAutoSyncWallpaper] = useState(true);
  const [customWallpaperUrl, setCustomWallpaperUrl] = useState("");

  const activeTheme = getThemeById(currentTheme);

  // Custom city inputs
  const [cityInput, setCityInput] = useState(weatherCity || "");
  const [tempInput, setTempInput] = useState(weatherTemp || 29);
  const [conditionInput, setConditionInput] = useState(weatherCondition || "Sunny");

  const widgetList = [
    { key: "digitalClock", label: "Digital Time Widget", icon: "🕒" },
    { key: "date", label: "Calendar Date Widget", icon: "📅" },
    { key: "weather", label: "Weather Area Widget", icon: "⛅" },
  ];

  return (
    <div className="flex flex-col sm:flex-row h-full gap-4 text-slate-800 dark:text-slate-100 font-sans">
      {/* Left Navigation Sidebar */}
      <aside className="w-full sm:w-48 flex sm:flex-col gap-1 border-b sm:border-b-0 sm:border-r border-black/10 dark:border-white/10 pb-3 sm:pb-0 sm:pr-3 shrink-0 text-xs">
        <div className="hidden sm:block text-[10px] font-semibold tracking-wider text-black/40 dark:text-white/40 uppercase mb-2 px-2">
          Control Panel
        </div>

        <button
          onClick={() => setActiveTab("time-date")}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition font-medium ${
            activeTab === "time-date"
              ? "bg-blue-600 text-white shadow-sm"
              : "hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70"
          }`}
        >
          <Clock size={14} />
          <span>Time & Date</span>
        </button>

        <button
          onClick={() => setActiveTab("weather")}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition font-medium ${
            activeTab === "weather"
              ? "bg-blue-600 text-white shadow-sm"
              : "hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70"
          }`}
        >
          <CloudSun size={14} />
          <span>Weather Area</span>
        </button>

        <button
          onClick={() => setActiveTab("widgets")}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition font-medium ${
            activeTab === "widgets"
              ? "bg-blue-600 text-white shadow-sm"
              : "hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70"
          }`}
        >
          <Sliders size={14} />
          <span>Widgets (Movable)</span>
        </button>

        <button
          onClick={() => setActiveTab("themes")}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition font-medium ${
            activeTab === "themes"
              ? "bg-blue-600 text-white shadow-sm"
              : "hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70"
          }`}
        >
          <Palette size={14} />
          <span>Themes</span>
        </button>

        <button
          onClick={() => setActiveTab("wallpapers")}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition font-medium ${
            activeTab === "wallpapers"
              ? "bg-blue-600 text-white shadow-sm"
              : "hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70"
          }`}
        >
          <ImageIcon size={14} />
          <span>Wallpapers</span>
        </button>

        {/* Manual Dark / Light Mode Toggle Button */}
        <div className="mt-auto pt-3 border-t border-black/10 dark:border-white/10 hidden sm:flex flex-col gap-2">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/25 transition font-medium text-xs shadow-xs cursor-pointer active:scale-95"
            title="Toggle Dark / Light Mode manually"
          >
            <div className="flex items-center gap-2">
              {isDarkMode ? <Moon size={13} className="text-indigo-400" /> : <Sun size={13} className="text-amber-500" />}
              <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 px-1.5 py-0.5 rounded">
              {isDarkMode ? "Dark" : "Light"}
            </span>
          </button>

          <button
            type="button"
            onClick={onLockScreen}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/30 transition font-medium text-xs shadow-sm cursor-pointer"
            title="Lock your workspace"
          >
            <Lock size={13} />
            <span>Lock Workspace</span>
          </button>
        </div>

        <div className="sm:hidden flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-left transition font-medium bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 text-xs cursor-pointer active:scale-95"
            title="Toggle Dark / Light Mode"
          >
            {isDarkMode ? <Moon size={13} className="text-indigo-400" /> : <Sun size={13} className="text-amber-500" />}
            <span>{isDarkMode ? "Dark" : "Light"}</span>
          </button>

          <button
            type="button"
            onClick={onLockScreen}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-left transition font-medium bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs cursor-pointer"
            title="Lock your workspace"
          >
            <Lock size={13} />
            <span>Lock</span>
          </button>
        </div>
      </aside>

      {/* Main Settings Panel Content */}
      <main className="flex-1 overflow-y-auto space-y-4 pr-1">
        {/* TAB 1: TIME, DATE & TIMEZONE */}
        {activeTab === "time-date" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Time, Timezone & Calendar Date
                </h3>
                <p className="text-xs text-slate-500">
                  Configure the timezone, hour format, and date displayed on your desktop.
                </p>
              </div>

              <button
                onClick={onResetWeatherTimeAuto}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-xs font-medium transition"
                title="Reset to live local auto sync"
              >
                <RotateCcw size={12} />
                <span>Reset to Auto</span>
              </button>
            </div>

            {/* Active Theme Sync Info */}
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-blue-500" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Widget Theme Glow:
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold border ${activeTheme.badgeClass}`}>
                  {activeTheme.name} ({activeTheme.accentName})
                </span>
              </div>
              <button
                onClick={() => setActiveTab("themes")}
                className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Theme Settings →
              </button>
            </div>

            {/* Timezone Presets */}
            <div className="space-y-2">
              <label className="block text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1">
                <Globe size={13} className="text-blue-500" />
                <span>Select Timezone:</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_LOCATIONS.map((loc) => {
                  const isSelected = currentTimezone === loc.timezone;
                  return (
                    <button
                      key={loc.city}
                      onClick={() => onSelectTimezone(loc.timezone, loc)}
                      className={`p-2.5 rounded-xl text-left border transition flex flex-col justify-between ${
                        isSelected
                          ? "bg-blue-600 border-blue-400 text-white shadow-sm"
                          : "bg-black/[0.02] dark:bg-white/[0.03] border-black/10 dark:border-white/10 hover:border-black/20 text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">{loc.city}</span>
                        {isSelected && <Check size={12} />}
                      </div>
                      <span className="text-[10px] opacity-75 font-mono mt-1">
                        {loc.timezone.split("/")[1]?.replace("_", " ")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Format & Adjust Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2">
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  Time Format
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onToggle24Hour(false)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition ${
                      !is24Hour
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    12-Hour (AM/PM)
                  </button>
                  <button
                    onClick={() => onToggle24Hour(true)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition ${
                      is24Hour
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    24-Hour
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2">
                <div className="flex justify-between items-center text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  <span>Manual Hour Adjust</span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono">
                    {timeOffsetHours >= 0 ? `+${timeOffsetHours}` : timeOffsetHours} hrs
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onAdjustHours(timeOffsetHours - 1)}
                    className="flex-1 py-1 rounded bg-black/5 dark:bg-white/10 font-bold hover:bg-black/10"
                  >
                    -1h
                  </button>
                  <button
                    onClick={() => onAdjustHours(0)}
                    className="px-2.5 py-1 rounded bg-black/5 dark:bg-white/10 text-[10px]"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => onAdjustHours(timeOffsetHours + 1)}
                    className="flex-1 py-1 rounded bg-black/5 dark:bg-white/10 font-bold hover:bg-black/10"
                  >
                    +1h
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Date Override */}
            <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <CalendarIcon size={13} className="text-emerald-500" />
                  <span>Calendar Date Override</span>
                </span>
                <span className="text-[10px] text-slate-500">
                  Pick any custom date to show on the Date widget.
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="date"
                  value={customDate || ""}
                  onChange={(e) => onSelectCustomDate(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-black/[0.05] dark:bg-white/[0.05] border border-black/15 dark:border-white/15 text-xs outline-none focus:border-blue-500"
                />
                {customDate && (
                  <button
                    onClick={() => onSelectCustomDate(null)}
                    className="px-2.5 py-1.5 rounded bg-black/5 dark:bg-white/10 text-[10px]"
                  >
                    Reset Today
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WEATHER & AREA SETTINGS */}
        {activeTab === "weather" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Weather Area & Location Settings
                </h3>
                <p className="text-xs text-slate-500">
                  Change the city area, temperature, and climate condition for your Weather Widget.
                </p>
              </div>

              <button
                onClick={onResetWeatherTimeAuto}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-xs font-medium transition"
              >
                <RotateCcw size={12} />
                <span>Reset to Dhaka</span>
              </button>
            </div>

            {/* Active Theme Weather Tone */}
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-blue-500" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Weather Tone Theme:
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold border ${activeTheme.badgeClass}`}>
                  {activeTheme.name}
                </span>
              </div>
              <button
                onClick={() => setActiveTab("themes")}
                className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Theme Settings →
              </button>
            </div>

            {/* Quick Cities */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-2">
                Quick Preset Cities:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_LOCATIONS.map((loc) => (
                  <button
                    key={loc.city}
                    onClick={() => {
                      onUpdateWeather(loc.city, loc.temp, loc.condition, loc.icon);
                      setCityInput(loc.city);
                      setTempInput(loc.temp);
                      setConditionInput(loc.condition);
                    }}
                    className={`p-2.5 rounded-xl text-left border transition flex flex-col justify-between ${
                      weatherCity === loc.city
                        ? "bg-blue-600 border-blue-400 text-white shadow-sm"
                        : "bg-black/[0.02] dark:bg-white/[0.03] border-black/10 dark:border-white/10 hover:border-black/20 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    <span className="font-bold text-xs">{loc.city}</span>
                    <span className="text-[10px] opacity-75 mt-1">
                      {loc.temp}°C • {loc.condition}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Location Inputs */}
            <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-3">
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                <MapPin size={13} className="text-rose-500" />
                <span>Custom City & Weather Area</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1">
                    City Name
                  </label>
                  <input
                    type="text"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    placeholder="e.g. Chittagong, Berlin"
                    className="w-full px-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.05] border border-black/15 dark:border-white/15 text-xs outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={tempInput}
                    onChange={(e) => setTempInput(Number(e.target.value))}
                    placeholder="28"
                    className="w-full px-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.05] border border-black/15 dark:border-white/15 text-xs outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1">
                    Condition Text
                  </label>
                  <input
                    type="text"
                    value={conditionInput}
                    onChange={(e) => setConditionInput(e.target.value)}
                    placeholder="Sunny, Rainy, etc."
                    className="w-full px-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.05] border border-black/15 dark:border-white/15 text-xs outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  const icon = tempInput > 30 ? "fire" : tempInput < 10 ? "snow" : "sun";
                  onUpdateWeather(cityInput || "Dhaka", tempInput, conditionInput, icon);
                }}
                className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-sm"
              >
                Apply Weather Customization
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: WIDGETS (SHOW/HIDE & RESET POSITIONS) */}
        {activeTab === "widgets" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Movable Desktop Widgets
                </h3>
                <p className="text-xs text-slate-500">
                  Each widget is individually draggable. Show/hide any widget freely.
                </p>
              </div>

              <button
                onClick={onResetPositions}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-xs font-medium transition"
                title="Reset dragged widget positions to default center"
              >
                <RotateCcw size={12} />
                <span>Reset Positions</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {widgetList.map((w) => {
                const isVisible = widgetsVisibility[w.key];
                return (
                  <div
                    key={w.key}
                    onClick={() => onToggleWidget(w.key)}
                    className="flex items-center justify-between p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 hover:border-black/15 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{w.icon}</span>
                      <span className="font-semibold text-xs text-slate-900 dark:text-white">
                        {w.label}
                      </span>
                    </div>

                    {/* iOS-Style Toggle Switch */}
                    <div
                      className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                        isVisible ? "bg-blue-600 justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-white shadow-md" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: THEMES */}
        {activeTab === "themes" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 border-b border-black/10 dark:border-white/10 gap-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Palette size={15} className="text-blue-500" />
                  <span>Workspace Theme & Environment</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Select a theme to synchronize your wallpaper and Date, Time & Weather widget aesthetics.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500">Auto-sync Wallpaper:</span>
                <button
                  onClick={() => setAutoSyncWallpaper((prev) => !prev)}
                  className={`w-9 h-5 rounded-full transition-colors p-0.5 flex items-center cursor-pointer ${
                    autoSyncWallpaper ? "bg-blue-600 justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
                  }`}
                  title="When active, selecting a theme switches the wallpaper to match"
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                </button>
              </div>
            </div>

            {/* MANUAL DARK MODE / LIGHT MODE TOGGLE CARD */}
            <div className="p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isDarkMode ? "bg-indigo-500/20 text-indigo-400" : "bg-amber-500/20 text-amber-500"
                }`}>
                  {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{isDarkMode ? "Dark Mode Active" : "Light Mode Active"}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/15 text-indigo-400 border border-indigo-400/25">
                      {isDarkMode ? "Obsidian" : "Daylight"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Switch between Dark and Light mode manually without relying on system preferences
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onToggleDarkMode}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold text-xs transition shadow-sm cursor-pointer shrink-0 flex items-center justify-center gap-2"
              >
                {isDarkMode ? <Sun size={14} className="text-amber-300" /> : <Moon size={14} className="text-indigo-200" />}
                <span>{isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {THEMES.map((th) => {
                const isSelected = currentTheme === th.id;
                return (
                  <div
                    key={th.id}
                    onClick={() => {
                      onSelectTheme(th.id, autoSyncWallpaper ? th.wallpaper : null);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/30 shadow-md"
                        : "border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-black/25"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* Left: Swatch + Title + Description */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${th.previewBg} border border-white/20 shadow-md flex items-center justify-center shrink-0 text-white`}
                        >
                          {isSelected ? <Check size={20} className="drop-shadow" /> : <Sparkles size={16} className="opacity-80" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900 dark:text-white">
                              {th.name}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${th.badgeClass}`}>
                              {th.accentName}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">{th.tagline}</p>
                        </div>
                      </div>

                      {/* Right: Live Widget Style Preview Box */}
                      <div className="flex items-center gap-3 bg-black/40 dark:bg-black/60 px-3 py-2 rounded-xl border border-white/10 shrink-0 self-start sm:self-auto">
                        {/* Clock Preview */}
                        <div className="flex flex-col items-center">
                          <span
                            className={`text-sm font-bold font-mono ${th.clock.textClass}`}
                            style={{ textShadow: th.clock.glowStyle }}
                          >
                            10:42
                          </span>
                          <span className="text-[9px] text-slate-400">Time Glow</span>
                        </div>

                        <div className="w-px h-6 bg-white/20" />

                        {/* Date Preview */}
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-1">
                            <CalendarIcon size={11} className={th.date.iconColor} />
                            <span className={`text-[11px] font-medium ${th.date.textColor}`}>
                              Today
                            </span>
                          </div>
                          <span className="text-[9px] text-slate-400">Date Accent</span>
                        </div>

                        <div className="w-px h-6 bg-white/20" />

                        {/* Weather Preview */}
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-1">
                            <span className={`text-[11px] font-bold ${th.weather.tempColor}`}>
                              29°C
                            </span>
                          </div>
                          <span className="text-[9px] text-slate-400">Weather</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: WALLPAPERS */}
        {activeTab === "wallpapers" && (
          <div className="space-y-4">
            <div className="pb-2 border-b border-black/10 dark:border-white/10">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Desktop Background Wallpaper
              </h3>
              <p className="text-xs text-slate-500">
                Click any wallpaper to apply it instantly to your workspace.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {wallpapers.map((wp, idx) => {
                const isSelected = currentWallpaperIdx === idx;
                return (
                  <div
                    key={wp}
                    onClick={() => onSelectWallpaper(idx)}
                    className={`group relative h-28 rounded-xl overflow-hidden cursor-pointer border-2 transition ${
                      isSelected
                        ? "border-blue-500 ring-2 ring-blue-500/30"
                        : "border-black/10 dark:border-white/10 hover:border-black/30"
                    }`}
                  >
                    <Image
                      src={wp}
                      alt={`Wallpaper ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition" />
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                        <Check size={14} />
                      </div>
                    )}
                    <div className="absolute bottom-1 left-2 text-[10px] text-white font-medium drop-shadow-md">
                      Wallpaper #{idx + 1}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom URL Input */}
            <div className="pt-2">
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Or Use Custom Wallpaper URL:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={customWallpaperUrl}
                  onChange={(e) => setCustomWallpaperUrl(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-xs outline-none focus:border-blue-500 transition"
                />
                <button
                  onClick={() => {
                    if (customWallpaperUrl.trim()) {
                      onSelectWallpaper(customWallpaperUrl.trim());
                      setCustomWallpaperUrl("");
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
