"use client";
import React, { useState, useEffect } from 'react';
import {
  FaUser, FaFolder, FaFileAlt, FaLayerGroup, FaListUl, FaSlidersH, FaCamera, FaCog,
  FaMusic, FaPlay, FaStepBackward, FaStepForward, FaSun, FaCloud, FaMapMarkerAlt,
  FaFigma, FaColumns, FaPenNib, FaDatabase, FaCube, FaDesktop
} from 'react-icons/fa';

const BentoDashboard = () => {
  const [theme, setTheme] = useState('blue');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const themes = {
    blue: {
      bg: '#A9C2DE',
      card: '#C3D6EA',
      accent: '#2D4A6B',
      text: '#2D4A6B',
      class: ''
    },
    mauve: {
      bg: '#D4C2DE',
      card: '#E6D6EA',
      accent: '#4A2D6B',
      text: '#4A2D6B',
      class: 'theme-lavender'
    },
    green: {
      bg: '#B8DEB6',
      card: '#D2E6D8',
      accent: '#2D6B4A',
      text: '#2D6B4A',
      class: 'theme-green'
    },
    charcoal: {
      bg: '#4A4A4A',
      card: '#666666',
      accent: '#F5F5F5',
      text: '#F5F5F5',
      class: 'theme-charcoal'
    },
  };

  const currentTheme = themes[theme];

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 p-0 flex flex-col ${currentTheme.class}`}
      style={{ backgroundColor: currentTheme.bg }}
    >
      {/* Top Navbar */}
      <nav
        className="w-full h-10 flex items-center justify-between px-6 text-xs font-medium tracking-wider uppercase"
        style={{ backgroundColor: currentTheme.accent, color: currentTheme.bg }}
      >
        <div className="flex gap-6">
          <span className="font-bold">Brand</span>
          <span className="opacity-80 cursor-pointer hover:opacity-100 transition-opacity">Work</span>
          <span className="opacity-80 cursor-pointer hover:opacity-100 transition-opacity">About</span>
          <span className="opacity-80 cursor-pointer hover:opacity-100 transition-opacity">Contact</span>
        </div>
        <div className="flex gap-6 items-center">
          <span className="opacity-80 cursor-pointer hover:opacity-100 transition-opacity">Twitter</span>
          <span className="opacity-80 cursor-pointer hover:opacity-100 transition-opacity">LinkedIn</span>
          <span className="font-mono">{new Date().toLocaleDateString()}</span>
          <span className="font-mono">{currentTime}</span>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Vertical Sidebar */}
        <aside
          className="w-12 flex items-center justify-center shrink-0 transition-colors duration-500"
          style={{ backgroundColor: currentTheme.accent }}
        >
          <span
            className="text-xl font-bold rotate-180 [writing-mode:vertical-lr]"
            style={{ color: currentTheme.bg }}
          >
            W.
          </span>
        </aside>

        {/* Main Bento Grid */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto relative">

            {/* COLUMN 1: Profile & Quick Links */}
            <div className="flex flex-col gap-4">
              {/* Profile Card */}
              <div
                className="p-6 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
                style={{ backgroundColor: currentTheme.card }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-inner"
                    style={{ backgroundColor: currentTheme.accent, color: currentTheme.bg }}
                  >
                    <FaUser size={32} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: currentTheme.accent }}>
                      Profile / Bio
                    </p>
                    <h2 className="text-xl font-bold" style={{ color: currentTheme.accent }}>Alex Designer</h2>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-black/10 rounded-full opacity-50" />
                  <div className="h-2 w-5/6 bg-black/10 rounded-full opacity-50" />
                </div>
              </div>

              {/* Quick Link Grid */}
              <div
                className="p-4 rounded-[20px] shadow-sm grid grid-cols-4 gap-2"
                style={{ backgroundColor: currentTheme.card }}
              >
                {[FaFolder, FaFileAlt, FaLayerGroup, FaListUl, FaSlidersH, FaCamera, FaCog, FaDesktop].map((Icon, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer group"
                    style={{ color: currentTheme.accent }}
                  >
                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 2 & 3: Dynamic Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Theme Selector Card */}
              <div
                className="p-6 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                style={{ backgroundColor: currentTheme.card }}
              >
                <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: currentTheme.accent }}>
                  Choose a Theme
                </p>
                <div className="flex gap-3">
                  {Object.entries(themes).map(([name, data]) => (
                    <button
                      key={name}
                      onClick={() => setTheme(name)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${theme === name ? 'border-white ring-2 ring-offset-2 ring-navy-900' : 'border-transparent'}`}
                      style={{ backgroundColor: data.bg, ringColor: data.accent }}
                    />
                  ))}
                </div>
              </div>

              {/* Weather Card 1 */}
              <div
                className="p-6 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300"
                style={{ backgroundColor: currentTheme.card }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: currentTheme.accent }}>
                      New York
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold" style={{ color: currentTheme.accent }}>52°</span>
                      <FaSun size={20} style={{ color: currentTheme.accent }} />
                    </div>
                  </div>
                  <span className="text-xs font-medium opacity-60" style={{ color: currentTheme.accent }}>Clear</span>
                </div>
              </div>

              {/* Weather Card 2 */}
              <div
                className="p-6 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300"
                style={{ backgroundColor: currentTheme.card }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: currentTheme.accent }}>
                      Los Angeles
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold" style={{ color: currentTheme.accent }}>68°</span>
                      <FaCloud size={20} style={{ color: currentTheme.accent }} />
                    </div>
                  </div>
                  <span className="text-xs font-medium opacity-60" style={{ color: currentTheme.accent }}>Cloudy</span>
                </div>
              </div>

              {/* Now Playing Card */}
              <div
                className="md:col-span-2 p-6 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative"
                style={{ backgroundColor: currentTheme.card }}
              >
                <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: currentTheme.accent }}>
                  Now Playing
                </p>
                <div
                  className="rounded-xl p-8 flex flex-col items-center justify-center gap-6 transition-colors duration-500"
                  style={{ backgroundColor: currentTheme.accent, color: currentTheme.bg }}
                >
                  <div className="w-20 h-20 rounded-lg flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                    <FaMusic size={40} />
                  </div>
                  <div className="w-full max-w-xs">
                    <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-white rounded-full" />
                    </div>
                    <div className="flex justify-center items-center gap-8 mt-6">
                      <FaStepBackward size={24} className="cursor-pointer hover:scale-110 transition-transform" />
                      <div className="w-12 h-12 rounded-full bg-white text-navy-900 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
                        <FaPlay size={24} fill="currentColor" className="ml-1" style={{ color: currentTheme.accent }} />
                      </div>
                      <FaStepForward size={24} className="cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Tech Stack Card */}
          <div className="flex justify-center mt-4 pb-8">
            <div
              className="px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-4 border border-white/20"
              style={{ backgroundColor: currentTheme.card }}
            >
              <p className="text-[9px] font-bold tracking-widest uppercase" style={{ color: currentTheme.accent }}>
                Tech Stack
              </p>
              <div className="flex gap-2">
                {[
                  { icon: FaFigma, active: false },
                  { icon: FaColumns, active: false },
                  { icon: FaPenNib, active: true },
                  { icon: FaDatabase, active: false },
                  { icon: FaCube, active: false },
                ].map((tool, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${tool.active ? 'bg-green-400 text-white scale-110 shadow-md' : 'bg-black/5 text-navy-900 hover:bg-black/10'}`}
                    style={{ color: tool.active ? 'white' : currentTheme.accent }}
                  >
                    <tool.icon size={14} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Noise Overlay for texture */}
      <div className="noise-overlay pointer-events-none opacity-[0.03] fixed inset-0 z-50" />
    </div>
  );
};

export default BentoDashboard;
