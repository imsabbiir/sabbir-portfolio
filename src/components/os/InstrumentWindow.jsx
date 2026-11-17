"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Music,
  Volume2,
  VolumeX,
  Play,
  Square,
  Sparkles,
  Sliders,
  Radio,
  Disc,
} from "lucide-react";

// Note Frequencies mapping (Base Octave 4)
const NOTE_BASE_FREQS = {
  C: 261.63,
  "C#": 277.18,
  D: 293.66,
  "D#": 311.13,
  E: 329.63,
  F: 349.23,
  "F#": 369.99,
  G: 392.0,
  "G#": 415.3,
  A: 440.0,
  "A#": 466.16,
  B: 493.88,
};

// 2 Octaves of Keys definition
const KEYS_DATA = [
  // Octave 1
  { note: "C4", name: "C", isBlack: false, key: "A" },
  { note: "C#4", name: "C#", isBlack: true, key: "W" },
  { note: "D4", name: "D", isBlack: false, key: "S" },
  { note: "D#4", name: "D#", isBlack: true, key: "E" },
  { note: "E4", name: "E", isBlack: false, key: "D" },
  { note: "F4", name: "F", isBlack: false, key: "F" },
  { note: "F#4", name: "F#", isBlack: true, key: "T" },
  { note: "G4", name: "G", isBlack: false, key: "G" },
  { note: "G#4", name: "G#", isBlack: true, key: "Y" },
  { note: "A4", name: "A", isBlack: false, key: "H" },
  { note: "A#4", name: "A#", isBlack: true, key: "U" },
  { note: "B4", name: "B", isBlack: false, key: "J" },
  // Octave 2
  { note: "C5", name: "C", isBlack: false, key: "K" },
  { note: "C#5", name: "C#", isBlack: true, key: "O" },
  { note: "D5", name: "D", isBlack: false, key: "L" },
  { note: "D#5", name: "D#", isBlack: true, key: "P" },
  { note: "E5", name: "E", isBlack: false, key: ";" },
  { note: "F5", name: "F", isBlack: false, key: "'" },
];

const INSTRUMENT_PRESETS = [
  { id: "piano", label: "Grand Piano", wave: "triangle", decay: 1.2, filter: 2400 },
  { id: "synth", label: "80s Synth Lead", wave: "sawtooth", decay: 0.9, filter: 1400 },
  { id: "rhodes", label: "Electric Rhodes", wave: "sine", decay: 1.5, filter: 3200 },
  { id: "marimba", label: "Wooden Marimba", wave: "triangle", decay: 0.4, filter: 1800 },
  { id: "chiptune", label: "8-Bit Arcade", wave: "square", decay: 0.35, filter: 4000 },
];

// Curated Melodies for Auto-play
const PRESET_MELODIES = {
  elise: {
    title: "Für Elise (Beethoven)",
    notes: [
      { note: "E5", dur: 220 },
      { note: "D#5", dur: 220 },
      { note: "E5", dur: 220 },
      { note: "D#5", dur: 220 },
      { note: "E5", dur: 220 },
      { note: "B4", dur: 220 },
      { note: "D5", dur: 220 },
      { note: "C5", dur: 220 },
      { note: "A4", dur: 450 },
      { note: "C4", dur: 220 },
      { note: "E4", dur: 220 },
      { note: "A4", dur: 220 },
      { note: "B4", dur: 450 },
    ],
  },
  bangla: {
    title: "Amar Shonar Bangla (Acoustic)",
    notes: [
      { note: "G4", dur: 320 },
      { note: "G4", dur: 320 },
      { note: "A4", dur: 320 },
      { note: "B4", dur: 450 },
      { note: "G4", dur: 320 },
      { note: "E4", dur: 320 },
      { note: "D4", dur: 450 },
      { note: "G4", dur: 320 },
      { note: "A4", dur: 320 },
      { note: "B4", dur: 320 },
      { note: "D5", dur: 500 },
    ],
  },
  interstellar: {
    title: "Interstellar Theme (Zimmer)",
    notes: [
      { note: "A4", dur: 300 },
      { note: "E5", dur: 300 },
      { note: "A4", dur: 300 },
      { note: "E5", dur: 300 },
      { note: "B4", dur: 300 },
      { note: "E5", dur: 300 },
      { note: "C5", dur: 300 },
      { note: "E5", dur: 300 },
    ],
  },
};

export default function InstrumentWindow() {
  const [currentPreset, setCurrentPreset] = useState("piano");
  const [octaveShift, setOctaveShift] = useState(0); // -1, 0, +1
  const [volume, setVolume] = useState(0.7);
  const [activeKeys, setActiveKeys] = useState(new Set());
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [selectedMelody, setSelectedMelody] = useState("elise");
  const [visualizerBars, setVisualizerBars] = useState(Array(18).fill(15));

  const audioCtxRef = useRef(null);

  // Initialize Web Audio Context safely
  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Calculate exact frequency based on note and octave shift
  const calculateFreq = useCallback(
    (noteString) => {
      // noteString is e.g. "C4" or "C#4"
      const match = noteString.match(/^([A-G]#?)(\d)$/);
      if (!match) return 440;
      const noteName = match[1];
      const baseOctave = parseInt(match[2], 10);
      const targetOctave = baseOctave + octaveShift;

      const baseFreq = NOTE_BASE_FREQS[noteName] || 440;
      // Frequency doubles per octave
      return baseFreq * Math.pow(2, targetOctave - 4);
    },
    [octaveShift]
  );

  // Synthesize and play a note
  const triggerNote = useCallback(
    (noteString) => {
      const ctx = getAudioContext();
      if (!ctx) return;

      const freq = calculateFreq(noteString);
      const preset = INSTRUMENT_PRESETS.find((p) => p.id === currentPreset) || INSTRUMENT_PRESETS[0];

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = preset.wave;
      osc.frequency.setValueAtTime(freq, now);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(preset.filter, now);

      // ADSR Envelope
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(volume * 0.45, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + preset.decay);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + preset.decay);

      // Update Visual Key press & Visualizer animation
      setActiveKeys((prev) => new Set(prev).add(noteString));
      setTimeout(() => {
        setActiveKeys((prev) => {
          const next = new Set(prev);
          next.delete(noteString);
          return next;
        });
      }, 250);

      // Randomize visualizer bars for reactive dancing visuals
      setVisualizerBars((bars) =>
        bars.map(() => Math.floor(Math.random() * 65) + 20)
      );
    },
    [calculateFreq, currentPreset, getAudioContext, volume]
  );

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return;
      const char = e.key.toUpperCase();
      const found = KEYS_DATA.find((k) => k.key.toUpperCase() === char);
      if (found) {
        triggerNote(found.note);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerNote]);

  // Demo playback engine
  const playDemoMelody = async () => {
    if (isPlayingDemo) return;
    setIsPlayingDemo(true);
    const melody = PRESET_MELODIES[selectedMelody];
    if (!melody) return;

    for (const item of melody.notes) {
      triggerNote(item.note);
      await new Promise((r) => setTimeout(r, item.dur + 60));
    }

    setIsPlayingDemo(false);
  };

  return (
    <div className="text-slate-800 dark:text-slate-100 font-sans pb-4">
      {/* Top Synthesizer Control Deck */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xl mb-5">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800 text-xs">
          {/* Brand & Preset Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <Music size={16} />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white flex items-center gap-2">
                <span>SabbirOS SoundStudio 3000</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">
                  Synthesizer
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Interactive Web Audio engine • Click or press keys on your keyboard
              </p>
            </div>
          </div>

          {/* Sound Visualizer Bars */}
          <div className="flex items-end gap-1 h-7 px-3 py-1 rounded-lg bg-black/40 border border-white/5">
            {visualizerBars.map((height, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-sky-500 to-indigo-400 rounded-full transition-all duration-150"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-xs">
          {/* Instrument Preset Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-[11px] font-medium text-slate-400 mr-1 flex items-center gap-1">
              <Disc size={12} />
              <span>Preset:</span>
            </span>
            {INSTRUMENT_PRESETS.map((inst) => (
              <button
                key={inst.id}
                type="button"
                onClick={() => setCurrentPreset(inst.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                  currentPreset === inst.id
                    ? "bg-sky-500 text-white font-bold shadow-xs"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                }`}
              >
                {inst.label}
              </button>
            ))}
          </div>

          {/* Octave & Volume */}
          <div className="flex items-center gap-4">
            {/* Octave Switcher */}
            <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 px-1 font-mono">Octave:</span>
              {[-1, 0, 1].map((oct) => (
                <button
                  key={oct}
                  type="button"
                  onClick={() => setOctaveShift(oct)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition cursor-pointer ${
                    octaveShift === oct
                      ? "bg-sky-500 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {oct > 0 ? `+${oct}` : oct}
                </button>
              ))}
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <Volume2 size={14} className="text-slate-400" />
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-18 accent-sky-400 cursor-pointer"
                title="Volume"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Piano Keys Deck */}
      <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-stone-900 to-slate-950 border border-slate-800 shadow-2xl relative select-none">
        {/* Top Wood Finish Rim */}
        <div className="h-3 w-full bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 rounded-t-lg mb-4 shadow-inner" />

        {/* Piano Keyboard Container */}
        <div className="relative flex justify-center overflow-x-auto pb-4 pt-2 custom-scrollbar">
          <div className="relative flex items-start">
            {KEYS_DATA.map((k) => {
              const isActive = activeKeys.has(k.note);

              if (!k.isBlack) {
                // White Key
                return (
                  <button
                    key={k.note}
                    type="button"
                    onMouseDown={() => triggerNote(k.note)}
                    className={`relative w-11 sm:w-13 h-48 sm:h-56 rounded-b-xl border-x border-b border-slate-300 shadow-lg flex flex-col justify-end items-center pb-3 transition-all duration-75 cursor-pointer ${
                      isActive
                        ? "bg-sky-100 shadow-inner translate-y-1"
                        : "bg-gradient-to-b from-white via-white to-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-bold text-xs text-slate-800">{k.name}</span>
                    <span className="text-[10px] font-mono px-1 rounded bg-black/5 text-slate-500 mt-1">
                      {k.key}
                    </span>
                  </button>
                );
              } else {
                // Black Key (Positioned between white keys)
                return (
                  <button
                    key={k.note}
                    type="button"
                    onMouseDown={() => triggerNote(k.note)}
                    style={{ marginLeft: "-16px", marginRight: "-16px" }}
                    className={`relative z-20 w-8 sm:w-9 h-30 sm:h-34 rounded-b-lg border-x border-b border-black shadow-2xl flex flex-col justify-end items-center pb-2 transition-all duration-75 cursor-pointer ${
                      isActive
                        ? "bg-sky-600 shadow-inner translate-y-1"
                        : "bg-gradient-to-b from-slate-900 via-black to-slate-950 hover:bg-slate-800 text-white"
                    }`}
                  >
                    <span className="font-bold text-[10px] text-white/90">{k.name}</span>
                    <span className="text-[9px] font-mono px-1 rounded bg-white/20 text-sky-300 mt-1">
                      {k.key}
                    </span>
                  </button>
                );
              }
            })}
          </div>
        </div>
      </div>

      {/* Auto-Play Melodies Bar */}
      <div className="mt-4 p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles size={15} className="text-amber-500" />
          <span className="font-bold text-slate-800 dark:text-slate-100">
            Learn or Listen to Melodies:
          </span>
          <select
            value={selectedMelody}
            onChange={(e) => setSelectedMelody(e.target.value)}
            disabled={isPlayingDemo}
            className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-xs font-medium cursor-pointer"
          >
            {Object.entries(PRESET_MELODIES).map(([k, m]) => (
              <option key={k} value={k} className="bg-slate-900 text-white">
                {m.title}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={playDemoMelody}
          disabled={isPlayingDemo}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
            isPlayingDemo
              ? "bg-amber-500 text-slate-950 animate-pulse"
              : "bg-sky-600 hover:bg-sky-500 text-white"
          }`}
        >
          {isPlayingDemo ? <Square size={12} className="fill-current" /> : <Play size={12} />}
          <span>{isPlayingDemo ? "Playing Notes..." : "Play Demo Song"}</span>
        </button>
      </div>
    </div>
  );
}
