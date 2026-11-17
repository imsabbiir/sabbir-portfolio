"use client";

import React from "react";
import { Download, Printer, FileText, ExternalLink } from "lucide-react";

export default function ResumeWindow() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 text-slate-800 dark:text-slate-100 font-sans select-text pb-6">
      {/* PDF Action Toolbar (Hidden during printing) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-rose-500" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Sabbir_Ahmed_Mridul_Resume.pdf
          </span>
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
            Official 1-Page A4 Resume
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Print Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-medium transition cursor-pointer shadow-xs"
            title="Print or Save as PDF"
          >
            <Printer size={13} className="text-slate-600 dark:text-slate-300" />
            <span>Print</span>
          </button>

          {/* Download CV Button */}
          <a
            href="/sabbir-resume.pdf"
            download="Sabbir_Ahmed_Mridul_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition shadow-sm cursor-pointer"
            title="Download PDF Resume"
          >
            <Download size={13} />
            <span>Download CV</span>
          </a>
        </div>
      </div>

      {/* Sheet Preview Container & Printable Resume */}
      <div
        id="printable-resume"
        className="p-6 sm:p-9 rounded-xl bg-white text-slate-900 shadow-md border border-black/10 space-y-4 text-xs leading-relaxed max-w-[850px] mx-auto font-sans"
      >
        {/* Header */}
        <div className="border-b-2 border-[#0f3b70] pb-2.5">
          <h1 className="text-2xl sm:text-[26px] font-black text-[#0f3b70] tracking-tight uppercase">
            SABBIR AHMED MRIDUL
          </h1>
          <p className="text-blue-600 font-bold text-sm sm:text-base mt-0.5">
            Junior Frontend Developer
          </p>
          <div className="text-slate-600 text-[11px] sm:text-xs mt-1 space-y-0.5">
            <p>
              Rupganj, Narayanganj, Dhaka &nbsp;|&nbsp; +880 1326-650567 &nbsp;|&nbsp;{" "}
              <a href="mailto:imsabbiir@gmail.com" className="text-blue-600 hover:underline">
                imsabbiir@gmail.com
              </a>
            </p>
            <p className="text-blue-600">
              <a
                href="https://linkedin.com/in/imsabbir"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                linkedin.com/in/imsabbir
              </a>
              &nbsp;|&nbsp;
              <a
                href="https://github.com/imsabbiir"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                https://github.com/imsabbiir
              </a>
              &nbsp;|&nbsp;
              <a
                href="https://imsabbir.xyz"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                imsabbir.xyz
              </a>
            </p>
          </div>
        </div>

        {/* 1. PROFESSIONAL SUMMARY */}
        <div>
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-[#0f3b70] border-b border-slate-200 pb-0.5 mb-1.5">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-slate-700 leading-normal text-[11.5px] sm:text-xs text-justify">
            Junior Frontend Developer with 2.5+ years of hands-on experience coding and building responsive,
            scalable web applications using JavaScript (ES6+), TypeScript, React.js, and Next.js.
            Skilled in modern UI development with Tailwind CSS, state management via Redux Toolkit and
            Context API, and full-stack integration using REST APIs, Next API, MongoDB. Experienced in
            architecting polished, production-ready web projects and improving page load speed by up to 35%
            through clean code and AI-assisted workflows.
          </p>
        </div>

        {/* 2. CORE COMPETENCIES & TECHNICAL SKILLS */}
        <div>
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-[#0f3b70] border-b border-slate-200 pb-0.5 mb-1.5">
            CORE COMPETENCIES & TECHNICAL SKILLS
          </h2>
          <ul className="space-y-1 text-slate-700 text-[11px] sm:text-xs">
            <li className="flex items-start gap-1.5">
              <span className="text-[#0f3b70] font-bold leading-tight">•</span>
              <div>
                <strong className="text-slate-900 font-semibold">Frontend: </strong>
                HTML5, CSS3, JavaScript (ES6+), TypeScript, React.js, Next.js, Tailwind CSS, Responsive Web Design.
              </div>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#0f3b70] font-bold leading-tight">•</span>
              <div>
                <strong className="text-slate-900 font-semibold">State &amp; Backend: </strong>
                Redux Toolkit, Context API, REST APIs, Next API, MongoDB, Node.js, NestJS.
              </div>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#0f3b70] font-bold leading-tight">•</span>
              <div>
                <strong className="text-slate-900 font-semibold">Tools &amp; Deployment: </strong>
                Git, GitHub, Vercel, VS Code.
              </div>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#0f3b70] font-bold leading-tight">•</span>
              <div>
                <strong className="text-slate-900 font-semibold">AI-Assisted Development: </strong>
                ChatGPT, Claude, Gemini (AI-Assisted Coding, Debugging, Code Review &amp; Prompt Engineering).
              </div>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#0f3b70] font-bold leading-tight">•</span>
              <div>
                <strong className="text-slate-900 font-semibold">Soft Skills: </strong>
                Communication, Public Speaking, Team Management, Problem Solving, Cross-Functional Collaboration.
              </div>
            </li>
          </ul>
        </div>

        {/* 3. PROFESSIONAL EXPERIENCE */}
        <div>
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-[#0f3b70] border-b border-slate-200 pb-0.5 mb-1.5">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-slate-900 text-xs mb-1">
              <span>
                WordPress Developer &nbsp;|&nbsp;{" "}
                <span className="font-semibold text-slate-800">
                  IN Technology Ltd. (Mirpur, Dhaka)
                </span>
              </span>
              <span className="text-slate-600 font-mono text-[11px]">2022 – 2023</span>
            </div>
            <ul className="space-y-1 text-slate-700 text-[11px] sm:text-[11.5px]">
              <li className="flex items-start gap-1.5">
                <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                <div>
                  <strong className="text-slate-900 font-semibold">Theme &amp; Plugin Customization: </strong>
                  Customized 8+ WordPress themes and plugins to match client branding and requirements.
                </div>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                <div>
                  <strong className="text-slate-900 font-semibold">UI/UX &amp; Bug Resolution: </strong>
                  Resolved 20+ UI/UX layout issues, broken links, and CSS conflicts across device viewports.
                </div>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                <div>
                  <strong className="text-slate-900 font-semibold">Performance Optimization: </strong>
                  Improved page load speeds by 30% via image compression, asset minification, and responsive fixes.
                </div>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                <div>
                  <strong className="text-slate-900 font-semibold">Site Maintenance: </strong>
                  Managed ongoing content updates, plugin upgrades, and routine security checks across client sites.
                </div>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                <div>
                  <strong className="text-slate-900 font-semibold">Team Collaboration: </strong>
                  Collaborated with a 3-member team to translate UI mockups into clean, production-ready pages.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 4. PROJECTS */}
        <div>
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-[#0f3b70] border-b border-slate-200 pb-0.5 mb-1.5">
            PROJECTS
          </h2>
          <div className="space-y-3">
            {/* Project 1 */}
            <div>
              <div className="font-bold text-slate-900 text-xs mb-1">
                Organization Website – BPSKF &nbsp;|&nbsp;{" "}
                <span className="font-normal italic text-slate-600">
                  Technologies: Next.js, Tailwind CSS, Next API, MongoDB
                </span>
              </div>
              <ul className="space-y-0.5 text-slate-700 text-[11px] sm:text-[11.5px]">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                  <div>
                    <strong className="text-slate-900 font-semibold">Architecture &amp; UI: </strong>
                    Built a production portal with 15+ reusable Next.js components and Tailwind CSS for responsiveness.
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                  <div>
                    <strong className="text-slate-900 font-semibold">Backend &amp; Engagement: </strong>
                    Engineered 6+ Next API endpoints with MongoDB for dynamic content, donations, and contact forms.
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                  <div>
                    <strong className="text-slate-900 font-semibold">Error Handling: </strong>
                    Eliminated UI crashes during async data fetching using loading skeletons and fallback error states.
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                  <div>
                    <strong className="text-slate-900 font-semibold">Speed &amp; Compatibility: </strong>
                    Boosted initial page rendering speed by 35% and ensured cross-browser compatibility.
                  </div>
                </li>
              </ul>
              <div className="text-[10.5px] text-blue-600 mt-1 pl-3 flex flex-wrap gap-3">
                <a
                  href="https://bpskf.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <span>Live Demo: https://bpskf.vercel.app</span>
                  <ExternalLink size={10} />
                </a>
                <span>|</span>
                <a
                  href="https://github.com/imsabbiir/bpskf"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <span>Git Repo: https://github.com/imsabbiir/bpskf</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div>
              <div className="font-bold text-slate-900 text-xs mb-1">
                Yejara E-Commerce Platform &nbsp;|&nbsp;{" "}
                <span className="font-normal italic text-slate-600">
                  Technologies: Next.js, Tailwind CSS, Next API, MongoDB
                </span>
              </div>
              <ul className="space-y-0.5 text-slate-700 text-[11px] sm:text-[11.5px]">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                  <div>
                    <strong className="text-slate-900 font-semibold">End-to-End Workflow: </strong>
                    Architected an e-commerce platform with authentication, 100+ product catalog, and order processing.
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                  <div>
                    <strong className="text-slate-900 font-semibold">Product Discovery: </strong>
                    Built real-time multi-criteria filtering, keyword search, and category navigation via REST APIs.
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                  <div>
                    <strong className="text-slate-900 font-semibold">State Synchronization: </strong>
                    Resolved cart state synchronization and persistence across 10+ routes using Context API.
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                  <div>
                    <strong className="text-slate-900 font-semibold">Performance Optimization: </strong>
                    Reduced initial load time by 40% via lazy loading, Next.js image optimization, and code splitting.
                  </div>
                </li>
              </ul>
              <div className="text-[10.5px] text-blue-600 mt-1 pl-3 flex flex-wrap gap-3">
                <a
                  href="https://yejara.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <span>Live Demo: https://yejara.vercel.app</span>
                  <ExternalLink size={10} />
                </a>
                <span>|</span>
                <a
                  href="https://github.com/imsabbiir/yejara"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <span>Git Repo: https://github.com/imsabbiir/yejara</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 5. EDUCATION */}
        <div>
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-[#0f3b70] border-b border-slate-200 pb-0.5 mb-1.5">
            EDUCATION
          </h2>
          <div className="space-y-1 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <strong className="text-slate-900 font-bold">B.Sc. in Computer Science</strong>
                &nbsp;|&nbsp;
                <span className="text-slate-700">Southeast University (Tejgaon, Dhaka)</span>
              </div>
              <span className="text-slate-600 font-mono text-[11px]">2022 – Present</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <strong className="text-slate-900 font-bold">Diploma in Computer</strong>
                &nbsp;|&nbsp;
                <span className="text-slate-700">
                  Narsingdi Polytechnic Institute (Police-line, Narsingdi)
                </span>
              </div>
              <span className="text-slate-600 font-mono text-[11px]">2017 – 2021</span>
            </div>
          </div>
        </div>

        {/* 6. CERTIFICATIONS & SPECIALIZED COURSES */}
        <div>
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-[#0f3b70] border-b border-slate-200 pb-0.5 mb-1.5">
            CERTIFICATIONS &amp; SPECIALIZED COURSES
          </h2>
          <ul className="space-y-1 text-slate-700 text-[11px] sm:text-xs">
            <li className="flex items-start gap-1.5">
              <span className="text-[#0f3b70] font-bold leading-tight">•</span>
              <div>
                <strong className="text-slate-900 font-semibold">Office Specialist: </strong>
                Microsoft Office Application Specialist 3 Months, 2014–2015 – Excel Dashboards, Word, PowerPoint, Access.
              </div>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#0f3b70] font-bold leading-tight">•</span>
              <div>
                <strong className="text-slate-900 font-semibold">Responsive Web Design: </strong>
                Responsive Web Design Course 8 Months, 2019–2020 – In Creative IT Institute.
              </div>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#0f3b70] font-bold leading-tight">•</span>
              <div>
                <strong className="text-slate-900 font-semibold">Self-Directed Modern Stack Mastery: </strong>
                hands-on mastery of React, Next, Next API, TypeScript, Tailwind CSS, MongoDB, and Redux.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
