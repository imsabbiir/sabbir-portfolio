"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Lock,
  Unlock,
  ChevronsRight,
  KeyRound,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export default function LockScreen({ onUnlock }) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [sliderUnlocked, setSliderUnlocked] = useState(false);
  const trackRef = useRef(null);
  const [maxDragDistance, setMaxDragDistance] = useState(180);

  const x = useMotionValue(0);
  const textOpacity = useTransform(x, [0, Math.max(maxDragDistance * 0.55, 60)], [1, 0]);

  const { profile } = portfolioData;

  // Real-time Clock & Date
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
      setDate(
        now.toLocaleDateString([], {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      );
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const measureTrack = useCallback(() => {
    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const knobSize = 48; // 48px knob
      const padding = 8; // 4px padding on each side
      const available = Math.max(rect.width - knobSize - padding, 80);
      setMaxDragDistance(available);
    }
  }, []);

  // Screen size detection & track measurement
  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      measureTrack();
    };

    checkScreen();
    // Allow DOM to settle and measure
    const timer = setTimeout(measureTrack, 100);
    window.addEventListener("resize", checkScreen);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScreen);
    };
  }, [measureTrack]);

  // Keyboard shortcut: Any key (Enter, Space, Esc, etc.) unlocks on Desktop
  useEffect(() => {
    const handleKeyDown = () => {
      if (!isMobile) {
        onUnlock?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onUnlock, isMobile]);

  // Handle Desktop background click (Click anywhere on screen to unlock)
  const handleScreenClick = () => {
    if (!isMobile) {
      onUnlock?.();
    }
  };

  const triggerUnlock = useCallback(() => {
    if (sliderUnlocked) return;
    setSliderUnlocked(true);
    animate(x, maxDragDistance, {
      type: "spring",
      stiffness: 350,
      damping: 25,
    });
    setTimeout(() => {
      onUnlock?.();
    }, 220);
  }, [sliderUnlocked, maxDragDistance, x, onUnlock]);

  const handleDrag = () => {
    // If dragged past 75%, trigger auto-completion!
    if (x.get() >= maxDragDistance * 0.75) {
      triggerUnlock();
    }
  };

  const handleDragEnd = () => {
    if (sliderUnlocked) return;
    const currentX = x.get();
    const threshold = maxDragDistance * 0.42; // Forgiving 42% threshold

    if (currentX >= threshold) {
      triggerUnlock();
    } else {
      animate(x, 0, {
        type: "spring",
        stiffness: 450,
        damping: 30,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      exit={{
        y: "-100%",
        opacity: 0,
        filter: "blur(12px)",
        transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
      }}
      onClick={handleScreenClick}
      className={`fixed inset-0 z-[100] flex flex-col justify-between items-center bg-cover bg-center overflow-hidden font-sans select-none ${
        !isMobile ? "cursor-pointer" : ""
      }`}
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=90')",
      }}
    >
      {/* Dark frosted glass overlay */}
      <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-xl" />

      {/* Top minimal header */}
      <div className="relative z-10 w-full px-6 py-4 flex justify-between items-center text-white/60 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wider font-mono uppercase text-[11px]">
             SabbirOS
          </span>
        </div>
        <div className="text-[11px] font-mono text-white/50 hidden sm:block">
          Interactive Desktop Environment
        </div>
      </div>

      {/* Main Lock Screen Hero Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-md w-full my-auto"
        onClick={(e) => {
          // If desktop, clicking hero also unlocks
          if (!isMobile) {
            onUnlock?.();
          }
        }}
      >
        {/* Date & Big Digital Clock */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-6 sm:mb-8"
        >
          <p className="text-xs sm:text-sm font-medium tracking-wider text-white/90 uppercase drop-shadow-md">
            {date || "Loading Date..."}
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <h1
              className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-white drop-shadow-[0_8px_35px_rgba(0,0,0,0.65)] font-mono"
              style={{
                textShadow: "0 0 50px rgba(255,255,255,0.25)",
              }}
            >
              {time.replace(/ AM| PM/i, "") || "--:--"}
            </h1>
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-amber-300/90 uppercase drop-shadow">
              {time.includes("AM") ? "AM" : time.includes("PM") ? "PM" : ""}
            </span>
          </div>
        </motion.div>

        {/* Center User Profile Picture & Identity */}
        <motion.div
          initial={{ y: 25, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="flex flex-col items-center"
        >
          {/* Circular Portrait Image */}
          <div className="relative group">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-3 border-white/80 shadow-[0_10px_35px_rgba(0,0,0,0.6)] ring-4 ring-white/20 transition-transform duration-300 group-hover:scale-105 bg-slate-800">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                priority
                quality={95}
                className="object-cover"
                sizes="(max-width: 640px) 112px, 128px"
                onError={(e) => {
                  e.currentTarget.src = profile.fallbackAvatar;
                }}
              />
            </div>

            {/* Online Green Badge */}
            <div
              className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-md"
              title="Online & Ready"
            />
          </div>

          {/* User Name & Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide drop-shadow-lg mt-4">
            {profile.name}
          </h2>
          <p className="text-xs sm:text-sm text-sky-200 font-medium tracking-wide drop-shadow-md mt-1 flex items-center gap-1.5">
            <Sparkles size={13} className="text-amber-400" />
            <span>{profile.title}</span>
          </p>
        </motion.div>

        {/* DESKTOP VIEW: Simulated Password / Click Anywhere to Unlock */}
        {!isMobile && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 w-full max-w-xs flex flex-col items-center"
            onClick={(e) => {
              e.stopPropagation();
              onUnlock?.();
            }}
          >
            {/* macOS Password Pill Simulation */}
            <div className="w-full py-2.5 px-3.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-2xl border border-white/30 shadow-xl flex items-center justify-between transition-all duration-200 group cursor-pointer hover:border-white/50">
              <div className="flex items-center gap-2 pl-2">
                <KeyRound size={14} className="text-white/60 group-hover:text-white" />
                <span className="text-xs text-white/80 font-mono tracking-wide">
                  Press Enter or Click to Unlock
                </span>
              </div>
              <div className="w-7 h-7 rounded-full bg-white text-slate-900 group-hover:bg-sky-400 group-hover:text-white flex items-center justify-center transition-colors shadow-sm shrink-0">
                <ArrowRight size={14} />
              </div>
            </div>

            <p className="text-[11px] text-white/60 font-mono mt-2.5 flex items-center gap-1.5">
              <span>💡</span>
              <span>Click anywhere on screen to open workspace</span>
            </p>
          </motion.div>
        )}

        {/* MOBILE VIEW: Interactive "Slide to Unlock" Slider */}
        {isMobile && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-7 w-full max-w-xs flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={trackRef}
              onPointerDown={measureTrack}
              style={{ touchAction: "none" }}
              className={`w-full h-14 rounded-full backdrop-blur-2xl p-1 relative overflow-hidden flex items-center shadow-2xl transition-colors duration-300 ${
                sliderUnlocked
                  ? "bg-emerald-500/25 border border-emerald-400/50"
                  : "bg-white/15 border border-white/25"
              }`}
            >
              {/* Shimmer Track Text */}
              <motion.div
                style={{ opacity: textOpacity }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none pl-6 pr-2 select-none"
              >
                <span className="text-xs font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white/40 via-white to-white/40 animate-pulse">
                  Slide to Unlock →
                </span>
              </motion.div>

              {/* Draggable Knob */}
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: maxDragDistance }}
                dragElastic={0}
                dragMomentum={false}
                style={{ x, touchAction: "none" }}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing z-10 shrink-0 select-none transition-shadow ${
                  sliderUnlocked
                    ? "bg-emerald-400 text-white ring-4 ring-emerald-300/50"
                    : "bg-white text-slate-900 active:scale-95"
                }`}
              >
                {sliderUnlocked ? (
                  <Unlock size={20} className="text-slate-950 font-bold" />
                ) : (
                  <ChevronsRight size={22} className="text-slate-800" />
                )}
              </motion.div>
            </div>

            {/* Mobile Fallback Tap button if user prefers */}
            <button
              type="button"
              onClick={onUnlock}
              className="mt-3 text-[11px] text-white/70 hover:text-white underline font-mono tracking-wide py-1 cursor-pointer"
            >
              Or tap here to unlock
            </button>
          </motion.div>
        )}
      </div>

      {/* Bottom subtle footer */}
      <div className="relative z-10 w-full px-6 py-4 flex justify-center items-center text-white/40 text-[11px] font-mono">
        {!isMobile ? (
          <span>Click anywhere or press Enter to unlock</span>
        ) : (
          <span>Swipe slider to unlock SabbirOS</span>
        )}
      </div>
    </motion.div>
  );
}
