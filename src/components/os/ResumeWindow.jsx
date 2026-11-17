"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { Download, Printer, FileText, CheckCircle2, Award, ExternalLink, MapPin } from "lucide-react";

export default function ResumeWindow() {
  const { profile, skills } = portfolioData;
  const educationsList = profile.educations || [profile.education];
  const coursesList = profile.courses || [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 text-slate-800 dark:text-slate-100 font-sans select-text pb-6">
      {/* PDF Action Toolbar */}
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 text-xs">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-rose-500" />
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            Sabbir_Ahmed_Resume.pdf
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Verified Portfolio Document</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-black/10 dark:border-white/10 hover:bg-black/5 transition cursor-pointer"
          >
            <Printer size={13} />
            <span>Print</span>
          </button>
          <a
            href={profile.resumeUrl || "/sabbir-resume.pdf"}
            download="Sabbir_Ahmed_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition shadow-sm cursor-pointer"
          >
            <Download size={13} />
            <span>Download CV</span>
          </a>
        </div>
      </div>

      {/* Sheet Preview */}
      <div className="p-6 sm:p-8 rounded-xl bg-white text-slate-900 shadow-sm border border-black/10 space-y-6 text-xs leading-normal">
        {/* Header */}
        <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row justify-between sm:items-end gap-2">
          <div>
            <h1 className="text-2xl font-black text-slate-950 uppercase tracking-tight">
              {profile.name}
            </h1>
            <p className="text-blue-600 font-bold text-sm">{profile.title}</p>
            <p className="text-slate-500 text-[11px] mt-0.5">
              {profile.district}, {profile.city}, {profile.residence}
            </p>
          </div>
          <div className="text-slate-600 text-[11px] sm:text-right space-y-0.5">
            <div>Email: <a href={`mailto:${profile.email}`} className="text-blue-600 hover:underline">{profile.email}</a></div>
            <div>GitHub: <a href={profile.github} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">github.com/imsabbir-dev</a></div>
            <div>Portfolio: <a href={profile.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">imsabbir.xyz</a></div>
          </div>
        </div>

        {/* Summary */}
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Professional Summary
          </h2>
          <p className="text-slate-700 leading-relaxed text-xs">{profile.bio}</p>
        </div>

        {/* Work Experience */}
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Work Experience & Industry History
          </h2>
          <div className="space-y-3.5">
            {profile.experiences.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-900 text-xs font-bold">{exp.role}</span>
                    {exp.type && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                        {exp.type}
                      </span>
                    )}
                  </div>
                  <span className="text-slate-500 font-mono text-[10px]">{exp.period}</span>
                </div>
                <div className="text-blue-600 font-medium text-[11px] flex items-center justify-between">
                  <span>{exp.company}</span>
                  {exp.location && <span className="text-slate-400 text-[10px] font-normal">{exp.location}</span>}
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Education */}
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Education & Academic Background
          </h2>
          <div className="space-y-2.5">
            {educationsList.map((edu, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between text-[11px]">
                  <span className="font-bold text-slate-900">
                    {edu.degree} — <span className="text-slate-600 font-semibold">{edu.department}</span>
                  </span>
                  <span className="text-slate-500 font-mono text-[10px]">{edu.year}</span>
                </div>
                <div className="text-slate-600 text-[11px] flex items-center justify-between">
                  <span>{edu.institution} {edu.location && `(${edu.location})`}</span>
                  {edu.status && <span className="text-slate-400 text-[10px] uppercase font-mono">{edu.status}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specialized Courses & Technical Training */}
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Specialized Courses & Certifications
          </h2>
          <div className="space-y-2">
            {coursesList.map((crs, idx) => (
              <div key={idx} className="text-[11px] flex justify-between items-start gap-2 border-l-2 border-blue-500 pl-2">
                <div>
                  <span className="font-bold text-slate-900">{crs.title}</span>
                  <span className="text-slate-400 text-[10px] ml-1.5 font-mono">({crs.duration})</span>
                  <div className="text-slate-600 text-[10px] mt-0.5">{crs.focus}</div>
                </div>
                <span className="text-slate-500 font-mono text-[10px] shrink-0">{crs.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Competencies */}
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Technical Competencies & Skills
          </h2>
          <div className="space-y-1.5">
            <div>
              <span className="font-semibold text-slate-800 text-[11px]">Core Frontend: </span>
              <span className="text-slate-600 text-[11px]">
                {skills.frontend.map((s) => s.name).join(", ")}
              </span>
            </div>
            <div>
              <span className="font-semibold text-slate-800 text-[11px]">Development & Workflow Tools: </span>
              <span className="text-slate-600 text-[11px]">
                {skills.tools.map((s) => s.name).join(", ")}
              </span>
            </div>
            <div>
              <span className="font-semibold text-slate-800 text-[11px]">Backend, CMS & Services: </span>
              <span className="text-slate-600 text-[11px]">
                {skills.backendBasics.map((s) => s.name).join(", ")}
              </span>
            </div>
            {skills.aiAndOffice && (
              <div>
                <span className="font-semibold text-slate-800 text-[11px]">AI Vibe Coding & Productivity Suite: </span>
                <span className="text-slate-600 text-[11px]">
                  {skills.aiAndOffice.map((s) => s.name).join(", ")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Languages & Certifications */}
        <div className="border-t border-slate-200 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
          <div>
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">
              Languages
            </span>
            <div className="text-slate-600">
              {profile.languages?.map((l) => `${l.name} (${l.proficiency})`).join(" • ")}
            </div>
          </div>
          <div>
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">
              Honors & Certifications
            </span>
            <div className="text-slate-600">
              NSDA Certified Trainer • Creative IT Certified Graduate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
