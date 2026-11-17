"use client";

import React from "react";
import { Sun, Cloud, CloudRain, CloudSnow, Flame } from "lucide-react";

export default function LiveWeatherWidget({
  city = "Dhaka",
  temp = 29,
  condition = "Sunny & Pleasant",
  iconType = "sun",
  themeConfig = null,
}) {
  const tempColor = themeConfig?.tempColor || "text-white";
  const conditionColor = themeConfig?.conditionColor || "text-white/80";
  const cityColor = themeConfig?.cityColor || "text-white";

  const renderIcon = (type) => {
    switch (type) {
      case "sun":
        return <Sun size={24} className="text-amber-400 animate-[spin_16s_linear_infinite]" />;
      case "rain":
        return <CloudRain size={24} className="text-blue-400" />;
      case "fire":
        return <Flame size={24} className="text-orange-500 animate-pulse" />;
      case "snow":
        return <CloudSnow size={24} className="text-sky-300" />;
      default:
        return <Cloud size={24} className="text-slate-200" />;
    }
  };

  return (
    <div
      className="cursor-grab active:cursor-grabbing select-none group inline-flex items-center gap-2.5 text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.85)] hover:scale-105 transition-all duration-500"
      title="Draggable Weather Widget"
    >
      <div className="drop-shadow-md group-hover:scale-110 transition-transform">
        {renderIcon(iconType)}
      </div>
      <div className="flex items-center gap-2">
        <span className={`font-semibold text-base sm:text-lg drop-shadow-md transition-colors duration-500 ${cityColor}`}>{city}</span>
        <span className="text-white/50">•</span>
        <span className={`font-bold text-base sm:text-lg drop-shadow-md transition-colors duration-500 ${tempColor}`}>{temp}°C</span>
        <span className={`inline text-xs sm:text-sm font-medium ml-1 drop-shadow-md transition-colors duration-500 ${conditionColor}`}>
          ({condition})
        </span>
      </div>
    </div>
  );
}
