"use client";

import React, { useState, useEffect } from "react";

function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Keep date updated daily
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const todayDate = currentDate.getDate();

  const dayOfWeekName = currentDate
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

  // Days grid calculation
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  const weekHeaders = ["S", "M", "T", "W", "T", "F", "S"];
  
  // Create grid cells (empty slots for offset + total days of current month)
  const calendarCells = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: totalDaysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="w-50 p-2 bg-[#FAFAFA] rounded-2xl border border-black/5 shadow-sm font-sans select-none">
      {/* Header section */}
      <div className="mb-3">
        <h2 className="text-[10px] font-bold tracking-wider text-[#FF4D12] uppercase">
          {dayOfWeekName}
        </h2>
        <div className="text-2xl font-extrabold text-black leading-none">
          {todayDate}
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] font-semibold text-gray-400 mb-1">
        {weekHeaders.map((day, idx) => (
          <div key={idx}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] font-medium text-gray-400">
        {calendarCells.map((day, index) => {
          if (day === null) {
            return <div key={index} />;
          }

          const isToday = day === todayDate;

          return (
            <div
              key={index}
              className="flex items-center justify-center h-6 w-6 mx-auto"
            >
              {isToday ? (
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-black text-white font-bold text-[11px]">
                  {day}
                </span>
              ) : (
                <span>{day}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarWidget;