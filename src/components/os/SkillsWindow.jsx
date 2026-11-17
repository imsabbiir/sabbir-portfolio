"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  FileCode,
  Eye,
  Code,
  Copy,
  Check,
  Sparkles,
  Layers,
  Wrench,
  Server,
  Terminal,
  Cpu,
  BadgeCheck,
  FileSpreadsheet,
} from "lucide-react";

export default function SkillsWindow() {
  const { skills, profile } = portfolioData;
  const [viewMode, setViewMode] = useState("preview"); // "preview" | "raw"
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const rawMarkdown = `# Skills.md — Technical Matrix (${profile.name})

> Verified technical stack, frameworks, CMS, tooling pipelines, and productivity automation.

---

## 🎨 1. Core Frontend & Frameworks
| Technology | Proficiency | Core Focus |
|:---|:---:|:---|
${skills.frontend
  .map(
    (s) =>
      `| **${s.name}** | \`${s.level}%\` | Production Architecture & High-Performance UI |`
  )
  .join("\n")}

## 🛠️ 2. Development Tools & Tooling
| Tool | Proficiency | Usage |
|:---|:---:|:---|
${skills.tools
  .map((s) => `| **${s.name}** | \`${s.level}%\` | Daily Workflow, Version Control & CI/CD |`)
  .join("\n")}

## ⚙️ 3. Backend, CMS & Services
| Tech / CMS | Proficiency | Role |
|:---|:---:|:---|
${skills.backendBasics
  .map(
    (s) =>
      `| **${s.name}** | \`${s.level}%\` | API Integration, Headless CMS, Database & Auth |`
  )
  .join("\n")}

## 🤖 4. AI Vibe Coding & Productivity Suite
| Tool / Platform | Proficiency | Capability |
|:---|:---:|:---|
${(skills.aiAndOffice || [])
  .map(
    (s) =>
      `| **${s.name}** | \`${s.level}%\` | Accelerated Development & Business Automation |`
  )
  .join("\n")}

---

\`\`\`json
{
  "engineer": "${profile.name}",
  "role": "${profile.title}",
  "corePhilosophy": "Pixel-perfection, 60fps fluid UI, clean modular code, and rapid iteration."
}
\`\`\`
`;

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(rawMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLevelBadge = (level) => {
    if (level >= 94) {
      return { text: "Expert", color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" };
    }
    if (level >= 88) {
      return { text: "Advanced", color: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30" };
    }
    return { text: "Proficient", color: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30" };
  };

  return (
    <div className="text-slate-800 dark:text-slate-100 font-sans select-text pb-4">
      {/* Markdown Document Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-black/10 dark:border-white/10 text-xs">
        {/* Breadcrumb & File Meta */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
            <FileCode size={16} />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-mono">
              <span className="text-slate-400 text-[11px]">workspace / docs /</span>
              <span className="font-bold text-slate-900 dark:text-white text-xs">
                Skills.md
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              Markdown • Comprehensive Technical Matrix • 3 min read
            </div>
          </div>
        </div>

        {/* View Switcher: Preview vs Raw */}
        <div className="flex items-center gap-1 bg-black/5 dark:bg-white/10 p-0.5 rounded-lg border border-black/5 dark:border-white/10">
          <button
            type="button"
            onClick={() => setViewMode("preview")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
              viewMode === "preview"
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Eye size={12} />
            <span>Preview</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("raw")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
              viewMode === "raw"
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Code size={12} />
            <span>Raw MD</span>
          </button>
        </div>
      </div>

      {/* RAW MARKDOWN VIEW */}
      {viewMode === "raw" && (
        <div className="relative rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-slate-950 text-slate-200">
          <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs">
            <span className="font-mono text-[11px] text-slate-400">Skills.md — Raw Source</span>
            <button
              type="button"
              onClick={handleCopyRaw}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-[11px] transition cursor-pointer"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              <span>{copied ? "Copied" : "Copy Raw"}</span>
            </button>
          </div>
          <pre className="p-4 text-xs font-mono whitespace-pre-wrap leading-relaxed text-slate-300 overflow-x-auto">
            {rawMarkdown}
          </pre>
        </div>
      )}

      {/* BEAUTIFULLY RENDERED PREVIEW VIEW */}
      {viewMode === "preview" && (
        <div className="space-y-6">
          {/* Document Title & Description */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-500 font-semibold uppercase tracking-wider">
              <span># Technical Documentation</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-emerald-500 flex items-center gap-1">
                <BadgeCheck size={13} /> Verified Production Stack
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Technical Skills & Expertise
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              A comprehensive breakdown of technical frameworks, modern languages, CMS, automated office dashboards, and AI tooling pipelines I leverage to ship scalable digital solutions.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 text-center">
            <div className="p-2">
              <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 font-mono">2+ Years</div>
              <div className="text-[11px] text-slate-500">Production Experience</div>
            </div>
            <div className="p-2 border-l border-black/5 dark:border-white/10">
              <div className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">15+</div>
              <div className="text-[11px] text-slate-500">Projects Shipped</div>
            </div>
            <div className="p-2 border-l border-black/5 dark:border-white/10">
              <div className="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-400 font-mono">NSDA</div>
              <div className="text-[11px] text-slate-500">Certified Trainer</div>
            </div>
            <div className="p-2 border-l border-black/5 dark:border-white/10">
              <div className="text-lg sm:text-xl font-bold text-amber-600 dark:text-amber-400 font-mono">100%</div>
              <div className="text-[11px] text-slate-500">Responsive Architecture</div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeCategory === "all"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-xs"
                  : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400"
              }`}
            >
              All Skills ({skills.frontend.length + skills.tools.length + skills.backendBasics.length + (skills.aiAndOffice?.length || 0)})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("frontend")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeCategory === "frontend"
                  ? "bg-blue-600 text-white font-bold shadow-xs"
                  : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400"
              }`}
            >
              <Layers size={13} />
              <span>Frontend ({skills.frontend.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("tools")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeCategory === "tools"
                  ? "bg-emerald-600 text-white font-bold shadow-xs"
                  : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400"
              }`}
            >
              <Wrench size={13} />
              <span>Tools ({skills.tools.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("backend")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeCategory === "backend"
                  ? "bg-purple-600 text-white font-bold shadow-xs"
                  : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400"
              }`}
            >
              <Server size={13} />
              <span>Backend & CMS ({skills.backendBasics.length})</span>
            </button>
            {skills.aiAndOffice && (
              <button
                type="button"
                onClick={() => setActiveCategory("aioffice")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeCategory === "aioffice"
                    ? "bg-amber-600 text-white font-bold shadow-xs"
                    : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400"
                }`}
              >
                <Sparkles size={13} />
                <span>AI & Office ({skills.aiAndOffice.length})</span>
              </button>
            )}
          </div>

          {/* 1. FRONTEND CATEGORY */}
          {(activeCategory === "all" || activeCategory === "frontend") && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-1.5 border-b border-black/10 dark:border-white/10">
                <Layers size={16} className="text-blue-500" />
                <h2 className="font-bold text-sm text-slate-900 dark:text-white">
                  Core Frontend & Modern Web Architecture
                </h2>
                <span className="ml-auto text-[11px] font-mono text-slate-400">
                  ## 01_frontend
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.frontend.map((item) => {
                  const badge = getLevelBadge(item.level);
                  return (
                    <div
                      key={item.name}
                      className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-black/10 dark:border-white/10 shadow-xs hover:border-blue-400/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {item.name}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}
                        >
                          {badge.text}
                        </span>
                      </div>

                      {/* Progress meter */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-700"
                            style={{ width: `${item.level}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          {item.level}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. TOOLS CATEGORY */}
          {(activeCategory === "all" || activeCategory === "tools") && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-1.5 border-b border-black/10 dark:border-white/10">
                <Wrench size={16} className="text-emerald-500" />
                <h2 className="font-bold text-sm text-slate-900 dark:text-white">
                  Development Tooling & Version Control
                </h2>
                <span className="ml-auto text-[11px] font-mono text-slate-400">
                  ## 02_tools
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.tools.map((item) => {
                  const badge = getLevelBadge(item.level);
                  return (
                    <div
                      key={item.name}
                      className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-black/10 dark:border-white/10 shadow-xs hover:border-emerald-400/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {item.name}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}
                        >
                          {badge.text}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700"
                            style={{ width: `${item.level}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          {item.level}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. BACKEND & CMS */}
          {(activeCategory === "all" || activeCategory === "backend") && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-1.5 border-b border-black/10 dark:border-white/10">
                <Server size={16} className="text-purple-500" />
                <h2 className="font-bold text-sm text-slate-900 dark:text-white">
                  Backend, WordPress & Headless CMS
                </h2>
                <span className="ml-auto text-[11px] font-mono text-slate-400">
                  ## 03_backend_cms
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.backendBasics.map((item) => {
                  const badge = getLevelBadge(item.level);
                  return (
                    <div
                      key={item.name}
                      className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-black/10 dark:border-white/10 shadow-xs hover:border-purple-400/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {item.name}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}
                        >
                          {badge.text}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-700"
                            style={{ width: `${item.level}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          {item.level}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. AI & OFFICE CATEGORY */}
          {(activeCategory === "all" || activeCategory === "aioffice") && skills.aiAndOffice && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-1.5 border-b border-black/10 dark:border-white/10">
                <Sparkles size={16} className="text-amber-500" />
                <h2 className="font-bold text-sm text-slate-900 dark:text-white">
                  AI Vibe Coding, Excel & Business Productivity Suite
                </h2>
                <span className="ml-auto text-[11px] font-mono text-slate-400">
                  ## 04_ai_productivity
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.aiAndOffice.map((item) => {
                  const badge = getLevelBadge(item.level);
                  return (
                    <div
                      key={item.name}
                      className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-black/10 dark:border-white/10 shadow-xs hover:border-amber-400/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {item.name}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}
                        >
                          {badge.text}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-700"
                            style={{ width: `${item.level}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          {item.level}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Embedded JSON / Code Snippet */}
          <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-slate-950 text-slate-300">
            <div className="px-3.5 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400">stack-config.json</span>
              <span className="text-amber-400">JSON</span>
            </div>
            <pre className="p-3.5 text-[11px] font-mono leading-relaxed overflow-x-auto text-sky-300">
{`{
  "engineer": "${profile.name}",
  "primaryStack": ["Next.js (App Router)", "React 19", "TypeScript", "Tailwind CSS v4"],
  "specializations": ["Frontend Engineering", "WordPress Theme & Plugin Development", "Excel Automated Dashboards & VBA"],
  "focus": "High-Performance Interactive Web Applications & Micro-Interactions",
  "certifications": ["NSDA Certified Trainer"]
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
