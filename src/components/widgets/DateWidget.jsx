"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

export default function DateWidget({
  timezone = "Asia/Dhaka",
  customDate = null,
  timeOffsetHours = 0,
  themeConfig = null,
}) {
  const [dateStr, setDateStr] = useState("");

  const iconColor = themeConfig?.iconColor || "text-sky-300";
  const textColor = themeConfig?.textColor || "text-white";
  const textShadow = themeConfig?.textShadow || "0 2px 15px rgba(0,0,0,0.85)";

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      let target = new Date(now);

      if (customDate) {
        const parsed = new Date(customDate);
        if (!isNaN(parsed.getTime())) {
          target.setFullYear(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
        }
      }

      if (timeOffsetHours !== 0) {
        target.setHours(target.getHours() + timeOffsetHours);
      }

      try {
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: timezone,
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        setDateStr(formatter.format(target));
      } catch (e) {
        setDateStr(target.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }));
      }
    };

    updateDate();
    const interval = setInterval(updateDate, 1000);
    return () => clearInterval(interval);
  }, [timezone, customDate, timeOffsetHours]);

  return (
    <div
      className={`cursor-grab active:cursor-grabbing select-none group inline-flex items-center gap-2.5 ${textColor} drop-shadow-[0_2px_15px_rgba(0,0,0,0.85)] hover:scale-105 transition-all duration-500`}
      style={{ textShadow }}
      title="Draggable Date Widget"
    >
      <Calendar size={20} className={`${iconColor} drop-shadow-md group-hover:scale-110 transition-all duration-500`} />
      <span className="text-base sm:text-xl font-medium tracking-wide drop-shadow-md">
        {dateStr || "Loading date..."}
      </span>
    </div>
  );
}
