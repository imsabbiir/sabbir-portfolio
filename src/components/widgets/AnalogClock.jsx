/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function ClockWidget({ time }) {
  const [localTime, setLocalTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    // 1. Detect user's local city name via time zone
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Extract city from timezone string (e.g., "America/New_York" -> "New York")
      const rawCity = timeZone.split("/")[1] || timeZone;
      const formattedCity = rawCity.replace(/_/g, " ");
      setCityName(formattedCity);
    } catch (e) {
      setCityName("Local");
    }

    // 2. Keep track of current user local time
    const updateTime = () => {
      const now = new Date();
      setLocalTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    };

    updateTime(); // initial run
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Prefer local live time if parent 'time' prop is not passed
  const currentTime = time || localTime;

  const hourAngle = ((currentTime.hours % 12) + currentTime.minutes / 60) * 30;
  const minuteAngle = (currentTime.minutes + currentTime.seconds / 60) * 6;
  const secondAngle = currentTime.seconds * 6;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-square w-40">
        <div className="absolute inset-0 rounded-2xl bg-white/90 backdrop-blur-2xl overflow-hidden">
          <div className="absolute inset-1.5 rounded-full border border-black/20" />
          {Array.from({ length: 60 }, (_, index) => (
            <div
              key={index}
              className="absolute inset-0"
              style={{ transform: `rotate(${index * 6}deg)` }}
            >
              <div
                className={`absolute left-1/2 top-2 -translate-x-1/2 rounded-full ${
                  index % 5 === 0
                    ? "h-1.75 w-[1.5px] bg-black/60"
                    : "h-0.5 w-px bg-black/30"
                }`}
              />
            </div>
          ))}

          {/* City Name positioned at top -10 from center */}
          {cityName && (
            <div className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-10 text-center pointer-events-none">
              <span className="text-[10px] font-medium tracking-wider text-black/60 uppercase">
                {cityName}
              </span>
            </div>
          )}

          {/* Hour hand */}
          <div
            className="absolute left-1/2 top-1/2 h-[24%] w-1 origin-bottom rounded-full bg-black"
            style={{
              transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
            }}
          />

          {/* Minute hand */}
          <div
            className="absolute left-1/2 top-1/2 h-[34%] w-[2.5px] origin-bottom rounded-full bg-cyan-300"
            style={{
              transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
            }}
          />

          {/* Second hand */}
          <div
            className="absolute left-1/2 top-1/2 h-[38%] w-px origin-bottom rounded-full bg-rose-400"
            style={{
              transform: `translate(-50%, -100%) rotate(${secondAngle}deg)`,
            }}
          />

          {/* Center pin */}
          <div className="absolute left-1/2 top-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-950 bg-white" />
        </div>
      </div>
    </motion.div>
  );
}

export default ClockWidget;