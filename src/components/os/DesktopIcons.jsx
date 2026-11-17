"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Folder, FileText, FileCode } from "lucide-react";

export const INITIAL_ICON_POSITIONS = {
  projects: { x: 24, y: 25 },
  about: { x: 24, y: 120 },
  skills: { x: 24, y: 215 },
  resume: { x: 24, y: 310 },
};

const ICONS_CONFIG = [
  {
    id: "projects",
    label: "Projects",
    icon: <Folder className="w-11 h-11 text-sky-400 fill-sky-400/30" />,
    tag: "Folder",
  },
  {
    id: "about",
    label: "About_Me.md",
    icon: <FileCode className="w-11 h-11 text-blue-400 fill-blue-400/20" />,
    tag: "MD",
  },
  {
    id: "skills",
    label: "Skills.md",
    icon: <FileCode className="w-11 h-11 text-amber-400 fill-amber-400/20" />,
    tag: "MD",
  },
  {
    id: "resume",
    label: "Resume.pdf",
    icon: <FileText className="w-11 h-11 text-rose-400 fill-rose-400/20" />,
    tag: "PDF",
  },
];

function DraggableDesktopIcon({
  item,
  pos,
  isSelected,
  onSelect,
  onOpen,
  onAttemptMove,
}) {
  const controls = useAnimation();
  const isDraggingRef = useRef(false);
  const dragStartPointRef = useRef({ x: 0, y: 0 });
  const [isRejected, setIsRejected] = useState(false);

  useEffect(() => {
    controls.set({ x: pos.x, y: pos.y });
  }, [pos, controls]);

  const handleDragStart = (e, info) => {
    isDraggingRef.current = true;
    dragStartPointRef.current = { x: info.point.x, y: info.point.y };
    setIsRejected(false);
  };

  const handleDragEnd = (event, info) => {
    const movedDist = Math.hypot(
      info.point.x - dragStartPointRef.current.x,
      info.point.y - dragStartPointRef.current.y
    );

    setTimeout(() => {
      isDraggingRef.current = false;
    }, 100);

    // If it was just a click, do not process move
    if (movedDist < 6) {
      controls.set({ x: pos.x, y: pos.y });
      return;
    }

    const targetX = Math.round(pos.x + info.offset.x);
    const targetY = Math.round(pos.y + info.offset.y);

    const isValid = onAttemptMove(item.id, targetX, targetY);

    if (isValid) {
      // Valid drop: Lock directly to new position with zero delay
      controls.set({ x: targetX, y: targetY });
    } else {
      // Invalid drop: Crisp direct return to original position (no slow drift/wobble)
      setIsRejected(true);
      controls.start({
        x: pos.x,
        y: pos.y,
        transition: { duration: 0.16, ease: "easeOut" },
      });
      setTimeout(() => {
        setIsRejected(false);
      }, 400);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isDraggingRef.current) {
      onSelect(item.id);
    }
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    if (!isDraggingRef.current) {
      onOpen(item.id);
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      animate={controls}
      initial={{ x: pos.x, y: pos.y }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onTouchEnd={() => {
        if (!isDraggingRef.current) onOpen(item.id);
      }}
      className={`absolute left-0 top-0 w-24 p-2 rounded-xl flex flex-col items-center justify-center text-center cursor-grab active:cursor-grabbing select-none pointer-events-auto group z-20 transition-colors duration-100 ${
        isRejected
          ? "ring-2 ring-rose-500/80 bg-rose-500/25 shadow-lg"
          : isSelected
          ? "bg-white/20 backdrop-blur-md ring-1 ring-white/50 shadow-md"
          : "hover:bg-white/10"
      }`}
      title={`Movable desktop item • Double-click to open ${item.label}`}
    >
      <div className="relative group-hover:scale-105 transition-transform duration-150">
        {item.icon}
        {item.tag && (
          <span className="absolute -bottom-1 -right-1 text-[9px] font-bold px-1.5 py-0.2 rounded bg-black/70 text-white/90 border border-white/20 font-mono shadow-sm">
            {item.tag}
          </span>
        )}
      </div>
      <span className="mt-1 text-xs font-medium text-white drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.95)] truncate w-full px-1">
        {item.label}
      </span>
    </motion.div>
  );
}

export default function DesktopIcons({ onOpenApp }) {
  const [positions, setPositions] = useState(INITIAL_ICON_POSITIONS);
  const [selectedId, setSelectedId] = useState(null);

  const handleAttemptMove = (draggedId, targetX, targetY) => {
    const desktopEl = document.getElementById("desktop-canvas");
    if (!desktopEl) return false;

    const desktopRect = desktopEl.getBoundingClientRect();
    const iconWidth = 96; // w-24 is 96px
    const iconHeight = 88;

    // 1. BOUNDS CHECK: Must stay completely within visible desktop canvas
    const minX = 8;
    const minY = 8;
    const maxX = desktopRect.width - iconWidth - 8;
    const maxY = desktopRect.height - iconHeight - 68; // buffer above bottom dock

    if (targetX < minX || targetY < minY || targetX > maxX || targetY > maxY) {
      return false; // Out of bounds -> Snap back to original location!
    }

    // 2. COLLISION CHECK WITH OTHER ICONS: No icon can be placed on top of another
    for (const [otherId, otherPos] of Object.entries(positions)) {
      if (otherId === draggedId) continue;
      const xDiff = Math.abs(targetX - otherPos.x);
      const yDiff = Math.abs(targetY - otherPos.y);
      if (xDiff < 74 && yDiff < 78) {
        return false; // Overlaps another icon -> Snap back to original location!
      }
    }

    // 3. COLLISION CHECK WITH WIDGETS: E.g. Cannot sit on top of the Clock, Date, Weather or StickyNote
    const candidateScreenRect = {
      left: desktopRect.left + targetX,
      top: desktopRect.top + targetY,
      right: desktopRect.left + targetX + iconWidth,
      bottom: desktopRect.top + targetY + iconHeight,
    };

    const widgetIds = [
      "widget-clock",
      "widget-date",
      "widget-weather",
    ];

    for (const wId of widgetIds) {
      const widgetEl = document.getElementById(wId);
      if (widgetEl) {
        const wRect = widgetEl.getBoundingClientRect();
        const padding = 8;
        const intersects = !(
          candidateScreenRect.right < wRect.left + padding ||
          candidateScreenRect.left > wRect.right - padding ||
          candidateScreenRect.bottom < wRect.top + padding ||
          candidateScreenRect.top > wRect.bottom - padding
        );
        if (intersects) {
          return false; // Overlaps with a widget -> Snap back to original location!
        }
      }
    }

    // All validation checks passed! Accept the new position
    setPositions((prev) => ({
      ...prev,
      [draggedId]: { x: targetX, y: targetY },
    }));
    return true;
  };

  return (
    <div
      onClick={() => setSelectedId(null)}
      className="hidden md:block absolute inset-0 pointer-events-none z-10"
    >
      {ICONS_CONFIG.map((item) => (
        <DraggableDesktopIcon
          key={item.id}
          item={item}
          pos={positions[item.id] || INITIAL_ICON_POSITIONS[item.id]}
          isSelected={selectedId === item.id}
          onSelect={setSelectedId}
          onOpen={onOpenApp}
          onAttemptMove={handleAttemptMove}
        />
      ))}
    </div>
  );
}
