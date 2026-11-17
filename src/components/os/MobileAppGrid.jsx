"use client";

import React from "react";

export default function MobileAppGrid({ apps = [], onOpenApp }) {
  // Chunk apps into rows of 4 starting from the bottom row up to the top.
  // The bottom-most row (closest to dock) gets the first 4 items ("নিচের সিরিয়ালে চারটা").
  // The next row above gets the next 4 items (or whatever remainder 1, 2, or 3 items).
  const rowsFromBottom = [];
  for (let i = 0; i < apps.length; i += 4) {
    rowsFromBottom.push(apps.slice(i, i + 4));
  }

  // In HTML (rendered top-to-bottom), we reverse the rows array
  // so the remainder/top rows render above, and the 4-item bottom row sits closest to the dock.
  const visualRows = [...rowsFromBottom].reverse();

  return (
    <div className="flex flex-col gap-y-3.5 w-full max-w-full select-none text-center overflow-x-hidden">
      {visualRows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 gap-x-2 w-full">
          {row.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => {
                if (app.action) {
                  app.action();
                } else {
                  onOpenApp(app.id);
                }
              }}
              className="group flex flex-col items-center gap-1.5 w-full cursor-pointer select-none active:scale-90 transition-transform duration-150 focus:outline-none"
            >
              <div
                className={`w-13 h-13 rounded-2xl flex items-center justify-center shadow-md border border-white/25 group-hover:scale-105 group-hover:shadow-lg transition-transform ${app.bg}`}
              >
                {app.icon}
              </div>
              <span className="text-[11px] font-medium text-white drop-shadow-md truncate w-full tracking-tight px-0.5">
                {app.label}
              </span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
