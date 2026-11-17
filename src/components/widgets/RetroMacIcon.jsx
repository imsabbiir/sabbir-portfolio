"use client";

import React from "react";

function RetroMacIcon({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-16 h-20 flex flex-col items-center justify-center cursor-pointer group select-none"
    >
      {/* Macintosh Icon Container */}
      <div className="w-14 h-16 bg-[#DCD7C9] rounded-lg border-2 border-black/20 shadow-md flex flex-col items-center p-1.5 group-hover:scale-105 group-hover:border-black/40 transition-all">
        {/* Retro Screen */}
        <div className="w-10 h-8 bg-[#1A237E] rounded-sm border border-black/30 flex items-center justify-center overflow-hidden">
          <div className="w-full h-0.5 bg-white/40 animate-pulse"></div>
        </div>
        {/* Floppy Drive Slot */}
        <div className="w-6 h-1 bg-black/30 rounded-full mt-2"></div>
        {/* Apple Logo Placeholder */}
        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5"></div>
      </div>
      {/* Icon Label */}
      <span className="text-[11px] font-mono text-white mt-1 drop-shadow-md">
        Terminal
      </span>
    </div>
  );
}

export default RetroMacIcon;