"use client";

import React from "react";
import { Settings } from "lucide-react";

export default function SettingsIcon({ onClick, buttonClass }) {
  const gradientClass = buttonClass || "from-blue-600 via-sky-600 to-indigo-500 shadow-blue-500/30 hover:shadow-cyan-400/40";
  return (
    <button
      onClick={onClick}
      className={`group relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr ${gradientClass} text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-500 border border-white/20 select-none cursor-pointer`}
      title="Settings & Control Center"
    >
      <Settings
        size={20}
        className="group-hover:rotate-90 transition-transform duration-500"
      />
    </button>
  );
}
