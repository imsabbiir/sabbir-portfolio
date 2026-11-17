"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaBackwardStep,
  FaForwardStep,
  FaVolumeHigh,
  FaVolumeXmark,
  FaMusic,
} from "react-icons/fa6";
import { Music2 } from "lucide-react";

const PLAYLIST = [
  { id: 1, title: "Hashesh", artist: "Ayub Bachchu", genre: "Rock Classic", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "https://picsum.photos/seed/hashesh/240" },
  { id: 2, title: "Meyeti Ekhon Kothay", artist: "Ayub Bachchu", genre: "Rock Classic", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "https://picsum.photos/seed/meyeti/240" },
  { id: 3, title: "Eshob Dukhini Mon", artist: "Ayub Bachchu", genre: "Rock Classic", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "https://picsum.photos/seed/dukhini/240" },
  { id: 4, title: "Bawol Song Cover", artist: "Nigar Sumi", genre: "Folk Fusion", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "https://picsum.photos/seed/bawol1/240" },
  { id: 5, title: "Lalon Geeti (Cover)", artist: "Nigar Sumi", genre: "Folk Fusion", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "https://picsum.photos/seed/bawol2/240" },
  { id: 6, title: "Folk Medley (Cover)", artist: "Nigar Sumi", genre: "Folk Fusion", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "https://picsum.photos/seed/bawol3/240" },
  { id: 7, title: "Bheegi Bheegi", artist: "James", genre: "Bengali / Hindi Rock", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "https://picsum.photos/seed/bheegi/240" },
  { id: 8, title: "Marteri", artist: "James", genre: "Nagar Baul Rock", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "https://picsum.photos/seed/maater/240" },
  { id: 9, title: "Taray Taray", artist: "James", genre: "Nagar Baul Rock", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "https://picsum.photos/seed/taray/240" },
  { id: 10, title: "Neela", artist: "Miles", genre: "Pop Rock", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "https://picsum.photos/seed/neela/240" },
  { id: 11, title: "Firiye Dao", artist: "Miles", genre: "Pop Rock", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "https://picsum.photos/seed/firiye/240" },
  { id: 12, title: "Jadu", artist: "Miles", genre: "Pop Rock", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "https://picsum.photos/seed/jadu/240" },
  { id: 13, title: "Oniket Prantor", artist: "Artcell", genre: "Progressive Metal", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", cover: "https://picsum.photos/seed/oniket/240" },
  { id: 14, title: "Dukhkhobilash", artist: "Artcell", genre: "Progressive Metal", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", cover: "https://picsum.photos/seed/dukho/240" },
  { id: 15, title: "Eee", artist: "Artcell", genre: "Progressive Metal", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", cover: "https://picsum.photos/seed/eee/240" },
  { id: 16, title: "Avash", artist: "Avash", genre: "Alternative Rock", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3", cover: "https://picsum.photos/seed/avash1/240" },
  { id: 17, title: "Manush", artist: "Avash", genre: "Alternative Rock", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "https://picsum.photos/seed/manush/240" },
  { id: 18, title: "Aalo", artist: "Avash", genre: "Alternative Rock", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "https://picsum.photos/seed/aalo/240" },
];

export default function SpotifyWidget() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState("0:00");
  const [durationFormatted, setDurationFormatted] = useState("0:00");
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const currentSong = PLAYLIST[currentIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [currentIndex, isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 1;
      setProgress((current / duration) * 100);
      setCurrentTimeFormatted(formatTime(current));
      if (audioRef.current.duration) {
        setDurationFormatted(formatTime(audioRef.current.duration));
      }
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const duration = audioRef.current.duration;

      if (duration) {
        const newTime = (clickX / width) * duration;
        audioRef.current.currentTime = newTime;
        setProgress((newTime / duration) * 100);
        setCurrentTimeFormatted(formatTime(newTime));
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white font-sans select-none overflow-hidden p-4 sm:p-5">
      <audio
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleNext}
      />

      {/* TOP: Current Now-Playing Showcase */}
      <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 shrink-0">
        {/* Cover Art with subtle glow */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 shadow-xl border border-white/15">
          <Image
            src={currentSong.cover}
            alt={currentSong.title}
            width={100}
            height={100}
            priority
            quality={100}
            className="w-full h-full object-cover"
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none" />
          )}
        </div>

        {/* Title, Artist, & Soundwave Visualizer */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
              {currentSong.genre}
            </span>
            {isPlaying && (
              <span className="text-[10px] text-emerald-300 font-mono animate-pulse">
                ● Live Playing
              </span>
            )}
          </div>

          <h2 className="text-base sm:text-lg font-bold text-white truncate mt-1">
            {currentSong.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 truncate">
            {currentSong.artist}
          </p>

          {/* Equalizer Wave Bars */}
          <div className="flex items-end gap-1 h-3 mt-2">
            {[40, 90, 60, 100, 75, 45, 85, 55, 95, 30].map((h, i) => (
              <span
                key={i}
                className={`w-1 rounded-full bg-emerald-400 transition-all duration-300 ${
                  isPlaying ? "animate-pulse" : "opacity-30"
                }`}
                style={{
                  height: isPlaying ? `${h}%` : "30%",
                  animationDelay: `${i * 90}ms`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MIDDLE: Scrollable Playlist */}
      <div className="flex-1 min-h-[140px] overflow-y-auto my-3 pr-1 space-y-1.5 custom-scrollbar">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <FaMusic className="text-emerald-400 text-[10px]" />
            <span>Playlist ({PLAYLIST.length} Songs)</span>
          </span>
          <span className="text-[10px] text-slate-500">Click any track to play</span>
        </div>

        {PLAYLIST.map((song, idx) => {
          const isThisPlaying = idx === currentIndex;
          return (
            <div
              key={song.id}
              onClick={() => {
                setCurrentIndex(idx);
                setIsPlaying(true);
              }}
              className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition text-xs group ${
                isThisPlaying
                  ? "bg-emerald-500/20 text-white border border-emerald-500/40 font-semibold shadow-sm"
                  : "bg-white/[0.02] hover:bg-white/[0.06] text-slate-300 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <span className="w-5 text-right font-mono text-[11px] text-slate-500 group-hover:text-slate-300">
                  {idx + 1}
                </span>
                <div className="truncate">
                  <div className="truncate text-white">{song.title}</div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {song.artist}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 font-mono hidden sm:inline">
                  {song.genre}
                </span>
                {isThisPlaying && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-ping" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTTOM: Player Controls & Progress Bar */}
      <div className="pt-2 border-t border-white/10 shrink-0 space-y-2">
        {/* Interactive Seekable Progress Bar */}
        <div
          ref={progressBarRef}
          onClick={handleSeek}
          className="w-full bg-white/15 hover:bg-white/25 h-2 rounded-full cursor-pointer overflow-hidden flex items-center transition"
        >
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-300 h-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Time display & Controls */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-[11px] text-emerald-400">
            {currentTimeFormatted}
          </span>

          {/* Central Playback Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              title="Previous Track"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 hover:text-white transition active:scale-95"
            >
              <FaBackwardStep className="text-sm" />
            </button>

            <button
              onClick={togglePlay}
              title={isPlaying ? "Pause" : "Play"}
              className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition"
            >
              {isPlaying ? (
                <FaPause className="text-sm" />
              ) : (
                <FaPlay className="text-sm ml-0.5" />
              )}
            </button>

            <button
              onClick={handleNext}
              title="Next Track"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 hover:text-white transition active:scale-95"
            >
              <FaForwardStep className="text-sm" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted((prev) => !prev)}
              className="hover:text-white transition"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? (
                <FaVolumeXmark className="text-xs text-rose-400" />
              ) : (
                <FaVolumeHigh className="text-xs" />
              )}
            </button>
            <span className="font-mono text-[11px] text-slate-500">
              {durationFormatted}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
