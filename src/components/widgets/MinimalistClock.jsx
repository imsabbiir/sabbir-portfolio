"use client";
import React, { useState, useEffect } from "react";

function MinimalistClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dayOfWeek = time.toLocaleDateString("en-US", { weekday: "long" });
  const dayNumber = time.getDate();
  const timeStr = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="inline-flex items-center gap-4 px-4 py-2 bg-white/70 backdrop-blur-md border border-black/10 rounded-xl font-mono text-sm shadow-sm text-black/80">
      <div className="flex flex-col">
        <span className="text-xs uppercase tracking-wider text-black/40 font-semibold">
          {dayOfWeek}
        </span>
        <span className="text-lg font-bold text-black">{dayNumber}</span>
      </div>
      <div className="h-6 w-[1px] bg-black/10" />
      <div className="flex items-center font-medium">
        <span>{timeStr}</span>
      </div>
    </div>
  );
}

export default MinimalistClock;