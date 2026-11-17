"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Flame,
  Globe,
  Clock,
  Calendar,
  MapPin,
  Sliders,
  RotateCcw,
  Check,
  ChevronDown,
} from "lucide-react";

// Presets for cities, timezones, and simulated weather
const PRESETS = [
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

export default function CentralDisplayWidget() {
  // Active settings
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]); // Default Dhaka
  const [is24Hour, setIs24Hour] = useState(false);
  const [isLive, setIsLive] = useState(true);

  // Custom overrides (if not in live mode)
  const [timeOffsetHours, setTimeOffsetHours] = useState(0);
  const [timeOffsetMinutes, setTimeOffsetMinutes] = useState(0);
  const [customDate, setCustomDate] = useState(null); // ISO string if overridden

  // Custom weather overrides
  const [customCity, setCustomCity] = useState("");
  const [customTemp, setCustomTemp] = useState(29);
  const [customCondition, setCustomCondition] = useState("Sunny & Pleasant");

  // Display state
  const [timeStr, setTimeStr] = useState("");
  const [secondsStr, setSecondsStr] = useState("");
  const [periodStr, setPeriodStr] = useState("");
  const [dateStr, setDateStr] = useState("");

  // Control panel modal state
  const [showControls, setShowControls] = useState(false);

  // Update clock every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Apply custom date or time offset if modified
      let targetDate = new Date(now);

      if (customDate) {
        const parsed = new Date(customDate);
        if (!isNaN(parsed.getTime())) {
          targetDate.setFullYear(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
        }
      }

      if (timeOffsetHours !== 0 || timeOffsetMinutes !== 0) {
        targetDate.setHours(targetDate.getHours() + timeOffsetHours);
        targetDate.setMinutes(targetDate.getMinutes() + timeOffsetMinutes);
      }

      // Format time according to selected timezone
      try {
        const timeFormatter = new Intl.DateTimeFormat("en-US", {
          timeZone: selectedPreset.timezone,
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: !is24Hour,
        });

        const parts = timeFormatter.formatToParts(targetDate);
        const hour = parts.find((p) => p.type === "hour")?.value || "12";
        const minute = parts.find((p) => p.type === "minute")?.value || "00";
        const second = parts.find((p) => p.type === "second")?.value || "00";
        const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value || "";

        setTimeStr(`${hour}:${minute}`);
        setSecondsStr(second);
        setPeriodStr(dayPeriod);

        // Date formatter
        const dateFormatter = new Intl.DateTimeFormat("en-US", {
          timeZone: selectedPreset.timezone,
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        setDateStr(dateFormatter.format(targetDate));
      } catch (e) {
        // Fallback
        setTimeStr(targetDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        setDateStr(targetDate.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [selectedPreset.timezone, is24Hour, isLive, timeOffsetHours, timeOffsetMinutes, customDate]);

  // Weather Icon renderer
  const renderWeatherIcon = (type) => {
    switch (type) {
      case "sun":
        return <Sun size={20} className="text-amber-400 animate-[spin_12s_linear_infinite]" />;
      case "rain":
        return <CloudRain size={20} className="text-blue-400" />;
      case "fire":
        return <Flame size={20} className="text-orange-500 animate-pulse" />;
      case "snow":
        return <CloudSnow size={20} className="text-sky-300" />;
      default:
        return <Cloud size={20} className="text-slate-300" />;
    }
  };

  const currentCityName = customCity || selectedPreset.city;
  const currentTempDegree = customCity ? customTemp : selectedPreset.temp;
  const currentConditionText = customCity ? customCondition : selectedPreset.condition;

  const handleResetToAuto = () => {
    setSelectedPreset(PRESETS[0]);
    setIs24Hour(false);
    setIsLive(true);
    setTimeOffsetHours(0);
    setTimeOffsetMinutes(0);
    setCustomDate(null);
    setCustomCity("");
  };

  return (
    <div className="relative select-none z-10 flex flex-col items-center">
      {/* MAIN CENTER DISPLAY WIDGET CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="group relative flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-white/10 dark:bg-black/25 backdrop-blur-2xl border border-white/20 shadow-2xl hover:border-white/40 transition-all duration-300"
      >
        {/* TOP: WEATHER DETAILS */}
        <div
          onClick={() => setShowControls(true)}
          className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/15 dark:bg-white/10 border border-white/15 hover:bg-white/25 cursor-pointer transition shadow-sm mb-3"
          title="Click to change weather area or timezone"
        >
          {renderWeatherIcon(selectedPreset.icon)}
          <span className="text-xs sm:text-sm font-semibold text-white drop-shadow-md">
            {currentCityName}
          </span>
          <span className="text-xs text-white/50">•</span>
          <span className="text-xs sm:text-sm font-bold text-white drop-shadow-md">
            {currentTempDegree}°C
          </span>
          <span className="hidden sm:inline text-xs text-white/80 font-medium">
            ({currentConditionText})
          </span>
        </div>

        {/* MIDDLE: LARGE DIGITAL CLOCK */}
        <div
          onClick={() => setShowControls(true)}
          className="cursor-pointer flex items-baseline justify-center tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
          title="Click to customize Time, Timezone & Date"
        >
          <span
            className="text-6xl sm:text-8xl md:text-9xl font-bold font-mono tracking-tighter"
            style={{
              textShadow: "0 0 35px rgba(255,255,255,0.25)",
            }}
          >
            {timeStr || "--:--"}
          </span>

          {/* Seconds & AM/PM badge */}
          <div className="flex flex-col items-start ml-2 sm:ml-3 text-left">
            {!is24Hour && periodStr && (
              <span className="text-sm sm:text-base font-bold text-amber-300 uppercase tracking-widest">
                {periodStr}
              </span>
            )}
            <span className="text-xs sm:text-sm font-mono text-white/60 tabular-nums">
              :{secondsStr}
            </span>
          </div>
        </div>

        {/* BOTTOM: TODAY'S DATE & TIMEZONE */}
        <div
          onClick={() => setShowControls(true)}
          className="flex items-center gap-2 mt-3 cursor-pointer group-hover:opacity-100 transition"
          title="Click to customize calendar date"
        >
          <Calendar size={15} className="text-sky-300" />
          <span className="text-sm sm:text-base font-medium text-white/95 drop-shadow-md">
            {dateStr || "Loading date..."}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/15 text-white/80 font-mono">
            {selectedPreset.timezone.split("/")[1]?.replace("_", " ")}
          </span>
        </div>

        {/* Quick Customize Pill on Hover */}
        <button
          onClick={() => setShowControls(!showControls)}
          className="mt-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-[11px] font-medium backdrop-blur-md border border-white/20 transition shadow-md"
        >
          <Sliders size={12} />
          <span>Adjust Time, Weather & Timezone</span>
        </button>
      </motion.div>

      {/* INTERACTIVE CONTROLS MODAL / POPOVER */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mt-4 w-full max-w-lg bg-slate-900/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-5 text-white font-sans text-xs space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 font-bold text-sm text-sky-400">
                <Sliders size={16} />
                <span>Clock, Weather & Timezone Settings</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetToAuto}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] text-white/80 transition"
                  title="Reset everything to auto Dhaka live time"
                >
                  <RotateCcw size={11} />
                  <span>Reset Auto</span>
                </button>
                <button
                  onClick={() => setShowControls(false)}
                  className="px-2 py-1 rounded-lg bg-white/10 hover:bg-rose-500 text-white text-xs font-bold transition"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* 1. TIMEZONE & PRESET SELECTOR */}
            <div>
              <label className="block text-[11px] font-semibold text-white/60 uppercase mb-1.5 flex items-center gap-1">
                <Globe size={12} className="text-sky-400" />
                <span>Select Timezone & Area Preset</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESETS.map((p) => {
                  const isSelected = selectedPreset.timezone === p.timezone && !customCity;
                  return (
                    <button
                      key={p.city}
                      onClick={() => {
                        setSelectedPreset(p);
                        setCustomCity("");
                      }}
                      className={`p-2 rounded-xl text-left border transition flex flex-col justify-between ${
                        isSelected
                          ? "bg-blue-600 border-blue-400 text-white shadow-md"
                          : "bg-white/5 border-white/10 hover:bg-white/10 text-white/80"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">{p.city}</span>
                        {isSelected && <Check size={12} />}
                      </div>
                      <div className="text-[10px] text-white/60 mt-1">
                        {p.temp}°C • {p.timezone.split("/")[1]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. TIME & FORMAT ADJUSTMENTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Format Toggle */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[11px] font-semibold text-white/70 flex items-center gap-1">
                  <Clock size={12} className="text-amber-400" />
                  <span>Time Format</span>
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIs24Hour(false)}
                    className={`flex-1 py-1.5 rounded-lg font-medium transition ${
                      !is24Hour ? "bg-blue-600 text-white" : "bg-white/10 text-white/60"
                    }`}
                  >
                    12-Hour (AM/PM)
                  </button>
                  <button
                    onClick={() => setIs24Hour(true)}
                    className={`flex-1 py-1.5 rounded-lg font-medium transition ${
                      is24Hour ? "bg-blue-600 text-white" : "bg-white/10 text-white/60"
                    }`}
                  >
                    24-Hour
                  </button>
                </div>
              </div>

              {/* Time Offset Hour Adjuster */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-[11px] font-semibold text-white/70">
                  <span>Adjust Hours</span>
                  <span className="text-sky-300 font-mono">
                    {timeOffsetHours >= 0 ? `+${timeOffsetHours}` : timeOffsetHours} hrs
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTimeOffsetHours((prev) => prev - 1)}
                    className="flex-1 py-1 rounded bg-white/10 hover:bg-white/20 font-bold"
                  >
                    -1h
                  </button>
                  <button
                    onClick={() => setTimeOffsetHours(0)}
                    className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[10px]"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setTimeOffsetHours((prev) => prev + 1)}
                    className="flex-1 py-1 rounded bg-white/10 hover:bg-white/20 font-bold"
                  >
                    +1h
                  </button>
                </div>
              </div>
            </div>

            {/* 3. CALENDAR DATE PICKER */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-semibold text-white/70 flex items-center gap-1">
                  <Calendar size={12} className="text-emerald-400" />
                  <span>Override Calendar Date</span>
                </span>
                <span className="text-[10px] text-white/50">
                  Pick any custom date to display on the desktop widget.
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="date"
                  value={customDate || ""}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/20 text-white text-xs outline-none focus:border-blue-400"
                />
                {customDate && (
                  <button
                    onClick={() => setCustomDate(null)}
                    className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[10px]"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* 4. CUSTOM WEATHER & AREA INPUT */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-[11px] font-semibold text-white/70 flex items-center gap-1">
                <MapPin size={12} className="text-rose-400" />
                <span>Custom City & Weather Area</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Enter city (e.g. Chittagong)"
                  value={customCity}
                  onChange={(e) => setCustomCity(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/20 text-white text-xs outline-none focus:border-blue-400"
                />
                <input
                  type="number"
                  placeholder="Temp (°C)"
                  value={customTemp}
                  onChange={(e) => setCustomTemp(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/20 text-white text-xs outline-none focus:border-blue-400"
                />
                <input
                  type="text"
                  placeholder="Condition (e.g. Rainy)"
                  value={customCondition}
                  onChange={(e) => setCustomCondition(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/20 text-white text-xs outline-none focus:border-blue-400"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setShowControls(false)}
                className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-xs transition shadow-md"
              >
                Apply & Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
