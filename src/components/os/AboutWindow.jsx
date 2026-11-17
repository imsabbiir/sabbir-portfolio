"use client";

import React, { useState } from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import {
  FileCode,
  Eye,
  Code,
  Copy,
  Check,
  MapPin,
  Sparkles,
  Briefcase,
  GraduationCap,
  Mail,
  ExternalLink,
  BadgeCheck,
  Languages,
  Award,
  Globe,
  BookOpen,
  Calendar,
  Compass,
  Cpu,
  Clock,
  Gamepad2,
  Headphones,
  Heart,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa6";

export default function AboutWindow() {
  const { profile } = portfolioData;
  const [viewMode, setViewMode] = useState("preview"); // "preview" | "raw"
  const [copied, setCopied] = useState(false);

  const educationsList = profile.educations || [profile.education];
  const coursesList = profile.courses || [];

  const rawMarkdown = `# About_Me.md — ${profile.name}

> "${profile.bio}"

---

## 👤 Personal Overview
- **Full Name:** ${profile.name}
- **Role:** ${profile.title}
- **Residence:** ${profile.residence}
- **City & District:** ${profile.city}, ${profile.district}
- **Location:** ${profile.location}
- **Status:** 🟢 ${profile.status}
- **Languages:** ${profile.languages?.map((l) => `${l.name} (${l.level}%)`).join(", ")}

---

## 💼 Work Experience & Track Record
${profile.experiences
  .map(
    (exp) => `### ${exp.role} @ ${exp.company}
- **Type:** \`${exp.type || "Professional"}\`
- **Location:** ${exp.location}
- **Period:** \`${exp.period}\`
- **Summary:** ${exp.description}`
  )
  .join("\n\n")}

---

## 🎓 Academic Education
${educationsList
  .map(
    (edu) => `### ${edu.degree} (${edu.department})
- **Institution:** ${edu.institution}
- **Location:** ${edu.location}
- **Timeline:** \`${edu.year}\`
- **Status:** ${edu.status}`
  )
  .join("\n\n")}

---

## 📜 Specialized Courses & Technical Training
${coursesList
  .map(
    (crs) => `### ${crs.title}
- **Category:** ${crs.category}
- **Duration/Period:** \`${crs.duration || crs.period}\`
- **Key Focus:** ${crs.focus}
- **Type:** ${crs.type}`
  )
  .join("\n\n")}

---

## 🎯 Personal Hobbies & Interests
${profile.hobbies
  ?.map((hb) => `- **${hb.title} (${hb.bengali}):** ${hb.desc}`)
  .join("\n")}

---

## 📬 Contact & Social Links
- **Email:** \`${profile.email}\`
- **GitHub:** ${profile.github}
- **LinkedIn:** ${profile.linkedin}
- **YouTube:** ${profile.youtube}
- **Website:** ${profile.website}
`;

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(rawMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-slate-800 dark:text-slate-100 font-sans select-text pb-6">
      {/* Markdown Document Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-black/10 dark:border-white/10 text-xs">
        {/* Breadcrumb & File Meta */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
            <FileCode size={16} />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-mono">
              <span className="text-slate-400 text-[11px]">workspace / docs /</span>
              <span className="font-bold text-slate-900 dark:text-white text-xs">
                About_Me.md
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              Markdown • Verified Bio, Experience & Academic Records
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
            <span className="font-mono text-[11px] text-slate-400">About_Me.md — Raw Source</span>
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
          {/* Top Profile Card / Markdown Header */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 border border-black/10 dark:border-white/10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              {/* Profile Image with Ring & Status Badge */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/80 dark:border-slate-700 shadow-lg shrink-0 bg-slate-800">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="112px"
                  onError={(e) => {
                    e.currentTarget.src = profile.fallbackAvatar;
                  }}
                />
                <div
                  className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm"
                  title="Available for Opportunities"
                />
              </div>

              {/* Title & Info */}
              <div className="text-center sm:text-left flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-2 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available for Opportunities
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {profile.name}
                </h1>

                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-0.5 flex items-center justify-center sm:justify-start gap-1.5">
                  <Sparkles size={14} className="text-amber-500" />
                  <span>{profile.title}</span>
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-rose-500" />
                    <span>{profile.district}, {profile.city}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <BadgeCheck size={13} className="text-emerald-500" />
                    <span>Frontend Specialist</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-400 font-mono">
                    2+ Years Exp.
                  </span>
                </div>
              </div>
            </div>

            {/* Markdown Blockquote */}
            <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10">
              <blockquote className="border-l-3 border-blue-500 pl-3.5 py-0.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic font-medium leading-relaxed bg-blue-500/[0.03] rounded-r-lg">
                &ldquo;{profile.bio}&rdquo;
              </blockquote>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-black/10 dark:border-white/10 text-center">
              <div className="p-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
                <div className="text-lg font-bold text-amber-500 font-mono">02+</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wide">Years Experience</div>
              </div>
              <div className="p-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
                <div className="text-lg font-bold text-blue-500 font-mono">15+</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wide">Completed Projects</div>
              </div>
              <div className="p-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
                <div className="text-lg font-bold text-emerald-500 font-mono">100%</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wide">Client Rating</div>
              </div>
              <div className="p-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
                <div className="text-lg font-bold text-purple-500 font-mono">B.Sc.</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wide">CSE Ongoing</div>
              </div>
            </div>
          </div>

          {/* Languages Proficiency Bar */}
          <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-black/10 dark:border-white/10 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 pb-1 border-b border-black/10 dark:border-white/10">
              <Languages size={15} className="text-blue-500" />
              <h2 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                Language Fluency
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {profile.languages?.map((lang) => (
                <div key={lang.name} className="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{lang.name}</span>
                    <span className="font-mono text-amber-500 font-bold">{lang.level}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-700"
                      style={{ width: `${lang.level}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">{lang.proficiency}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 1: WORK EXPERIENCE */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1.5 border-b border-black/10 dark:border-white/10">
              <Briefcase size={16} className="text-emerald-500" />
              <h2 className="font-bold text-sm text-slate-900 dark:text-white">
                Work Experience & Industry History
              </h2>
              <span className="ml-auto text-[11px] font-mono text-slate-400">
                ## experience ({profile.experiences.length})
              </span>
            </div>

            <div className="space-y-3">
              {profile.experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-black/10 dark:border-white/10 shadow-xs hover:border-emerald-400/40 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                        {exp.role}
                      </span>
                      {exp.type && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                          {exp.type}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold border border-blue-500/20">
                      {exp.period}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1.5">
                    <span>{exp.company}</span>
                    {exp.location && (
                      <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1 font-normal text-[11px]">
                        <MapPin size={12} className="text-rose-400" />
                        <span>{exp.location}</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: EDUCATION */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1.5 border-b border-black/10 dark:border-white/10">
              <GraduationCap size={16} className="text-purple-500" />
              <h2 className="font-bold text-sm text-slate-900 dark:text-white">
                Educational Background & Degrees
              </h2>
              <span className="ml-auto text-[11px] font-mono text-slate-400">
                ## education ({educationsList.length})
              </span>
            </div>

            <div className="space-y-3">
              {educationsList.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-black/10 dark:border-white/10 shadow-xs hover:border-purple-400/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
                      <GraduationCap size={20} />
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                          {edu.degree}
                        </span>
                        {edu.current && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Running
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                        {edu.department}
                      </div>

                      <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                        {edu.institution}
                      </div>

                      {edu.location && (
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-0.5">
                          <MapPin size={11} className="text-rose-400 shrink-0" />
                          <span>{edu.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-200">
                      {edu.year}
                    </span>
                    {edu.status && (
                      <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-mono">
                        {edu.status}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: COURSES & SPECIALIZED TRAINING */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1.5 border-b border-black/10 dark:border-white/10">
              <BookOpen size={16} className="text-amber-500" />
              <h2 className="font-bold text-sm text-slate-900 dark:text-white">
                Specialized Courses & Professional Training
              </h2>
              <span className="ml-auto text-[11px] font-mono text-slate-400">
                ## courses ({coursesList.length})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {coursesList.map((crs, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    crs.isSelfTaught
                      ? "bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent border-blue-500/30 dark:border-blue-500/20"
                      : "bg-white/70 dark:bg-slate-900/60 border-black/10 dark:border-white/10 hover:border-amber-400/40"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                        {crs.isSelfTaught ? (
                          <Sparkles size={14} className="text-amber-400 shrink-0" />
                        ) : (
                          <Award size={14} className="text-blue-500 shrink-0" />
                        )}
                        <span>{crs.title}</span>
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-semibold shrink-0">
                        {crs.year}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-mono text-amber-600 dark:text-amber-400 mb-2">
                      <Clock size={11} />
                      <span>{crs.duration}</span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                      {crs.focus}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      {crs.type}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      {crs.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: HOBBIES & PERSONAL INTERESTS (কমপ্যাক্ট সেকশন) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1.5 border-b border-black/10 dark:border-white/10">
              <Heart size={16} className="text-rose-500" />
              <h2 className="font-bold text-sm text-slate-900 dark:text-white">
                Hobbies & Personal Interests (আমার শখ)
              </h2>
              <span className="ml-auto text-[11px] font-mono text-slate-400">
                ## hobbies
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {profile.hobbies?.map((hb) => {
                const getIcon = () => {
                  if (hb.id === "traveling") return <Compass size={17} className="text-blue-500" />;
                  if (hb.id === "gaming") return <Gamepad2 size={17} className="text-purple-500" />;
                  return <Headphones size={17} className="text-emerald-500" />;
                };

                return (
                  <div
                    key={hb.id}
                    className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-black/10 dark:border-white/10 shadow-xs hover:border-black/20 dark:hover:border-white/20 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <div
                          className={`w-8 h-8 rounded-lg ${hb.bg || "bg-black/5 dark:bg-white/5"} border ${hb.borderColor || "border-black/5 dark:border-white/5"} flex items-center justify-center shrink-0`}
                        >
                          {getIcon()}
                        </div>
                        <div>
                          <h3 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                            {hb.title}
                          </h3>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {hb.bengali}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        {hb.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Connect & Contact Footer Links */}
          <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 shadow-md">
            <div>
              <div className="text-xs font-bold">Have a project in mind or looking to hire?</div>
              <div className="text-[11px] text-slate-400">{profile.email} • {profile.location}</div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition cursor-pointer"
              >
                <FaGithub size={13} />
                <span>GitHub</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition cursor-pointer"
              >
                <FaLinkedin size={13} />
                <span>LinkedIn</span>
              </a>
              <a
                href={profile.youtube}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-medium transition cursor-pointer"
              >
                <FaYoutube size={13} />
                <span>YouTube</span>
              </a>
              <a
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition cursor-pointer"
              >
                <Globe size={13} />
                <span>imsabbir.xyz</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
