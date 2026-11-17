"use client";

import React, { useState, useEffect } from "react";

export default function DigitalClockWidget({
  timezone = "Asia/Dhaka",
  is24Hour = false,
  timeOffsetHours = 0,
  themeConfig = null,
}) {
  const [timeStr, setTimeStr] = useState("");
  const [periodStr, setPeriodStr] = useState("");

  const textClass = themeConfig?.textClass || "text-white";
  const glowStyle = themeConfig?.glowStyle || "0 0 45px rgba(255,255,255,0.35)";
  const periodClass = themeConfig?.periodClass || "text-amber-300";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      if (timeOffsetHours !== 0) {
        now.setHours(now.getHours() + timeOffsetHours);
      }

      try {
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: timezone,
          hour: "numeric",
          minute: "2-digit",
          hour12: !is24Hour,
        });

        const parts = formatter.formatToParts(now);
        const hour = parts.find((p) => p.type === "hour")?.value || "12";
        const minute = parts.find((p) => p.type === "minute")?.value || "00";
        const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value || "";

        setTimeStr(`${hour}:${minute}`);
        setPeriodStr(dayPeriod);
      } catch (e) {
        setTimeStr(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone, is24Hour, timeOffsetHours]);

  return (
    <div
      className={`cursor-grab active:cursor-grabbing select-none flex items-baseline justify-center tracking-tight ${textClass} drop-shadow-[0_6px_30px_rgba(0,0,0,0.8)] group transition-colors duration-500`}
      title="Draggable Digital Clock"
    >
      <span
        className="text-6xl sm:text-8xl md:text-9xl font-bold font-mono tracking-tighter hover:scale-[1.02] transition-all duration-500"
        style={{
          textShadow: glowStyle,
        }}
      >
        {timeStr || "--:--"}
      </span>

      {!is24Hour && periodStr && (
        <span className={`ml-2 sm:ml-3 text-base sm:text-lg font-bold uppercase tracking-widest drop-shadow-md transition-colors duration-500 ${periodClass}`}>
          {periodStr}
        </span>
      )}
    </div>
  );
}
