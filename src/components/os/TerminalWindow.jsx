"use client";

import React, { useState, useRef, useEffect } from "react";
import { portfolioData } from "@/data/portfolioData";

export default function TerminalWindow({ onOpenApp, onResetPositions }) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState([
    {
      type: "system",
      content:
        "Welcome to SabbirOS Interactive Terminal v2.4 (x86_64-apple-darwin).\nType 'help' to see available commands, or click any quick command below.",
    },
  ]);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmdStr) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    const cmd = raw.toLowerCase();
    const newHistory = [...history, { type: "input", content: raw }];

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "output",
          content: `
AVAILABLE COMMANDS:
  help        - Show this manual
  projects    - List all software projects & case studies
  gallery     - Open photo gallery & workspace visual showcase
  chess       - Launch playable Chess Grandmaster app ♟️
  piano       - Launch interactive Synthesizer & Piano 🎹
  skills      - Show technical skills & tools matrix
  about       - Display biography and engineering philosophy
  contact     - View contact methods & direct links
  experience  - View work history and professional timeline
  music       - Launch Spotify/Bengali rock music player
  clear       - Clear terminal window history
  date        - Show current local time
  whoami      - Display current visitor session role
  sudo hire   - [Easter Egg] Instant hire authorization protocol 🚀
`,
        });
        break;

      case "projects":
        newHistory.push({
          type: "output",
          content: portfolioData.projects
            .map(
              (p, i) =>
                `[${i + 1}] ${p.title} (${p.category})\n    ${p.description}\n    Tech: ${p.tags.join(", ")}\n    Demo: ${p.demoUrl}`
            )
            .join("\n\n") + "\n\n💡 Tip: Double-click 'Projects' folder on desktop for GUI view!",
        });
        break;

      case "skills":
        newHistory.push({
          type: "output",
          content: `
CORE TECH STACK:
  Frontend   :: React, Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion
  Tools      :: Git, GitHub, Turbopack, Vite, Figma, Chrome DevTools
  Backend    :: Node.js, Express, REST APIs, Supabase, PostgreSQL
  Philosophy :: Clean code, 60fps animations, mobile-first responsiveness
`,
        });
        break;

      case "about":
        newHistory.push({
          type: "output",
          content: `
${portfolioData.profile.name} — ${portfolioData.profile.title}
Location: ${portfolioData.profile.location}
Bio: ${portfolioData.profile.bio}
`,
        });
        break;

      case "experience":
        newHistory.push({
          type: "output",
          content: portfolioData.profile.experiences
            .map(
              (exp) =>
                `• ${exp.role} [${exp.type || "Full Time"}] @ ${exp.company} (${exp.period})\n  Location: ${exp.location || "Bangladesh"}\n  ${exp.description}`
            )
            .join("\n\n"),
        });
        break;

      case "education":
        newHistory.push({
          type: "output",
          content: (portfolioData.profile.educations || [portfolioData.profile.education])
            .map(
              (edu) =>
                `🎓 ${edu.degree} (${edu.department || "Engineering"})\n   ${edu.institution} [${edu.location || "Dhaka"}]\n   Timeline: ${edu.year} (${edu.status || "Completed"})`
            )
            .join("\n\n"),
        });
        break;

      case "courses":
        newHistory.push({
          type: "output",
          content: (portfolioData.profile.courses || [])
            .map(
              (crs) =>
                `📜 ${crs.title} (${crs.year})\n   Duration: ${crs.duration}\n   Focus: ${crs.focus}`
            )
            .join("\n\n"),
        });
        break;

      case "contact":
        newHistory.push({
          type: "output",
          content: `
GET IN TOUCH:
  Email    : ${portfolioData.profile.email}
  GitHub   : ${portfolioData.profile.github}
  LinkedIn : ${portfolioData.profile.linkedin}
  Status   : Open to full-time & high-impact freelance opportunities!
`,
        });
        break;

      case "whoami":
        newHistory.push({
          type: "output",
          content: "guest-evaluator@recruiter-workstation (Root access granted)",
        });
        break;

      case "date":
        newHistory.push({
          type: "output",
          content: new Date().toString(),
        });
        break;

      case "music":
      case "spotify":
      case "play":
        onOpenApp?.("music");
        newHistory.push({
          type: "success",
          content: "🎵 Launching Bengali & Rock Music Player window...",
        });
        break;

      case "gallery":
      case "photos":
        onOpenApp?.("gallery");
        newHistory.push({
          type: "success",
          content: "🖼️ Opening Photo Gallery window...",
        });
        break;

      case "chess":
      case "game":
        onOpenApp?.("chess");
        newHistory.push({
          type: "success",
          content: "♟️ Opening Chess Grandmaster window...",
        });
        break;

      case "instrument":
      case "piano":
      case "synth":
        onOpenApp?.("instrument");
        newHistory.push({
          type: "success",
          content: "🎹 Launching SoundStudio 3000 Piano Synthesizer...",
        });
        break;

      case "settings":
      case "config":
        onOpenApp?.("settings");
        newHistory.push({
          type: "success",
          content: "⚙️ Opening Settings & Workspace Control Panel...",
        });
        break;

      case "reset":
        onResetPositions?.();
        newHistory.push({
          type: "success",
          content: "🔄 All widgets, windows and desktop icons reset to original layout!",
        });
        break;

      case "sudo hire":
      case "sudo hire sabbir":
        newHistory.push({
          type: "success",
          content: `
🎉 ACCESS GRANTED! Protocol: HIRE_SABBIR_AHMED initiated!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Thank you for considering me! You've found the easter egg!
Let's build innovative, high-converting digital products together.
Shoot me an email at: ${portfolioData.profile.email}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`,
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newHistory.push({
          type: "error",
          content: `zsh: command not found: ${raw}. Type 'help' for available commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="h-full flex flex-col font-mono text-xs sm:text-sm bg-white dark:bg-[#0f111a] text-slate-800 dark:text-[#a6accd] p-4 rounded-xl -m-4 sm:-m-6 select-text overflow-hidden transition-colors duration-300"
    >
      {/* Quick Action Suggestion Pills (Elena Gonci style) */}
      <div className="flex flex-wrap items-center gap-1.5 pb-3 mb-2 border-b border-black/10 dark:border-white/10 select-none">
        <span className="text-[11px] text-slate-400 dark:text-white/40 mr-1">Quick:</span>
        {["help", "projects", "skills", "about", "contact", "sudo hire"].map((pill) => (
          <button
            key={pill}
            onClick={() => executeCommand(pill)}
            className="px-2.5 py-0.5 rounded bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 border border-emerald-500/20 text-xs transition cursor-pointer font-medium"
          >
            {pill}
          </button>
        ))}
      </div>

      {/* Terminal Output Stream */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {history.map((item, idx) => (
          <div key={idx} className="leading-relaxed">
            {item.type === "input" && (
              <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">sabbir@macbook:~$</span>
                <span className="font-semibold">{item.content}</span>
              </div>
            )}
            {item.type === "system" && (
              <div className="text-sky-700 dark:text-sky-300/90 whitespace-pre-line font-medium">{item.content}</div>
            )}
            {item.type === "output" && (
              <pre className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono">{item.content}</pre>
            )}
            {item.type === "success" && (
              <pre className="text-amber-600 dark:text-amber-300 font-semibold whitespace-pre-wrap">{item.content}</pre>
            )}
            {item.type === "error" && (
              <div className="text-rose-600 dark:text-rose-400 font-medium">{item.content}</div>
            )}
          </div>
        ))}

        {/* Active Command Input Line */}
        <div className="flex items-center gap-2 pt-1 text-slate-900 dark:text-white">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">sabbir@macbook:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white font-mono placeholder-slate-400 dark:placeholder-white/20 caret-emerald-600 dark:caret-emerald-400 text-xs sm:text-sm"
            placeholder="Type 'help'..."
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
