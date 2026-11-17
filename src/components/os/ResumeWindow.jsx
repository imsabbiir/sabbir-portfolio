"use client";

import React, { useRef } from "react";
import { Download, Printer, FileText, ExternalLink } from "lucide-react";

export default function ResumeWindow() {
  const resumeRef = useRef(null);

  const handlePrint = () => {
    const resumeEl = resumeRef.current || document.getElementById("printable-resume");
    if (!resumeEl) {
      window.print();
      return;
    }

    // Remove any previously created print iframe
    const oldFrame = document.getElementById("resume-print-iframe");
    if (oldFrame) {
      oldFrame.remove();
    }

    // Create an isolated hidden iframe for 100% clean, single-page A4 printing
    const iframe = document.createElement("iframe");
    iframe.id = "resume-print-iframe";
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.style.visibility = "hidden";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      window.print();
      return;
    }

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>Sabbir_Ahmed_Mridul_Resume</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 6mm 10mm;
            }
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            html, body {
              background: #ffffff;
              color: #0f172a;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              font-size: 10.5px;
              line-height: 1.35;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .resume-sheet {
              width: 100%;
              max-width: 100%;
              margin: 0 auto;
              padding: 0;
              page-break-inside: avoid;
              break-inside: avoid;
            }
            h1 {
              font-size: 22px;
              font-weight: 900;
              color: #0f3b70;
              text-transform: uppercase;
              letter-spacing: -0.01em;
              line-height: 1.1;
            }
            .role-title {
              font-size: 12px;
              font-weight: 700;
              color: #2563eb;
              margin-top: 1px;
              margin-bottom: 3px;
            }
            .contact-line {
              font-size: 10px;
              color: #334155;
              margin-bottom: 2px;
            }
            .header-divider {
              border-bottom: 2px solid #0f3b70;
              padding-bottom: 5px;
              margin-bottom: 6px;
            }
            .section-title {
              font-size: 10.5px;
              font-weight: 800;
              color: #0f3b70;
              text-transform: uppercase;
              letter-spacing: 0.04em;
              border-bottom: 1px solid #cbd5e1;
              padding-bottom: 1.5px;
              margin-top: 6px;
              margin-bottom: 3px;
            }
            .summary-text {
              font-size: 10px;
              color: #1e293b;
              line-height: 1.34;
              text-align: justify;
            }
            ul {
              list-style: none;
              padding-left: 0;
              margin: 0;
            }
            li {
              position: relative;
              padding-left: 11px;
              font-size: 10px;
              color: #1e293b;
              margin-bottom: 1.5px;
              line-height: 1.32;
            }
            li::before {
              content: "•";
              position: absolute;
              left: 0;
              color: #0f3b70;
              font-weight: bold;
            }
            strong {
              font-weight: 700;
              color: #0f172a;
            }
            .flex-between {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .job-header {
              font-size: 10.5px;
              font-weight: 700;
              color: #0f172a;
              margin-bottom: 2px;
            }
            .date-badge {
              font-family: monospace;
              font-size: 10px;
              font-weight: 700;
              color: #0f172a;
              white-space: nowrap;
            }
            .project-item {
              margin-bottom: 4px;
            }
            .project-title {
              font-size: 10.5px;
              font-weight: 700;
              color: #0f172a;
              margin-bottom: 1.5px;
            }
            .tech-stack {
              font-style: italic;
              font-weight: 400;
              color: #475569;
            }
            .links-row {
              font-size: 9.5px;
              margin-top: 1.5px;
              margin-bottom: 3px;
              padding-left: 11px;
              display: flex;
              gap: 12px;
            }
            a {
              color: #2563eb;
              text-decoration: underline;
              font-weight: 700;
            }
          </style>
        </head>
        <body>
          <div class="resume-sheet">
            ${resumeEl.innerHTML}
          </div>
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch {
        window.print();
      }
    }, 250);
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
            title="Print or Save as PDF (Single Page A4)"
          >
            <Printer size={13} className="text-slate-600 dark:text-slate-300" />
            <span>Print</span>
          </button>

          {/* Download Original CV */}
          <a
            href="/sabbir-resume.pdf"
            download="Sabbir_Ahmed_Mridul_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-sm cursor-pointer"
            title="Download your original uploaded PDF"
          >
            <Download size={13} />
            <span>Download CV</span>
          </a>

          {/* View in Browser */}
          <a
            href="/sabbir-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 text-slate-700 dark:text-slate-300 transition text-[11px]"
            title="Open original PDF in new tab"
          >
            <ExternalLink size={12} />
            <span>Open PDF</span>
          </a>
        </div>
      </div>

      {/* Sheet Preview Container & Printable Resume */}
      <div
        id="printable-resume"
        ref={resumeRef}
        className="p-6 sm:p-9 rounded-xl bg-white text-slate-900 shadow-md border border-black/10 space-y-3.5 text-xs leading-normal max-w-[820px] mx-auto font-sans"
      >
        {/* Header */}
        <div className="border-b-[2px] border-[#0f3b70] pb-2 header-divider">
          <h1 className="text-2xl sm:text-[25px] font-black text-[#0f3b70] tracking-tight uppercase leading-tight">
            SABBIR AHMED MRIDUL
          </h1>
          <p className="text-blue-600 font-bold text-sm mt-0.5 role-title">
            Junior Frontend Developer
          </p>
          <div className="text-slate-700 text-[11px] mt-1 space-y-0.5">
            <p className="contact-line">
              Rupganj, Narayanganj, Dhaka &nbsp;|&nbsp; +880 1326-650567 &nbsp;|&nbsp;{" "}
              <a href="mailto:imsabbiir@gmail.com" className="text-blue-600 font-semibold hover:underline">
                imsabbiir@gmail.com
              </a>
            </p>
            <p className="space-x-1.5 contact-line">
              <a
                href="https://linkedin.com/in/imsabbir"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-bold underline hover:text-blue-800"
              >
                linkedin.com/in/imsabbir
              </a>
              <span className="text-slate-400">|</span>
              <a
                href="https://github.com/imsabbiir"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-bold underline hover:text-blue-800"
              >
                https://github.com/imsabbiir
              </a>
              <span className="text-slate-400">|</span>
              <a
                href="https://imsabbir.xyz"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-bold underline hover:text-blue-800"
              >
                imsabbir.xyz
              </a>
            </p>
          </div>
        </div>

        {/* 1. PROFESSIONAL SUMMARY */}
        <div>
          <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-[#0f3b70] border-b border-slate-300 pb-0.5 mb-1 section-title">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-slate-800 leading-normal text-[11px] text-justify summary-text">
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
          <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-[#0f3b70] border-b border-slate-300 pb-0.5 mb-1 section-title">
            CORE COMPETENCIES &amp; TECHNICAL SKILLS
          </h2>
          <ul className="space-y-1 text-slate-800 text-[10.5px]">
            <li className="flex items-start gap-1.5">
              <span className="text-[#0f3b70] font-bold leading-tight">•</span>
              <div>
                <strong className="text-slate-950 font-bold">Frontend: </strong>
                HTML5, CSS3, JavaScript (ES6+), TypeScript, React.js, Next.js, Tailwind CSS, Responsive Web Design.
              </div>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#0f3b70] font-bold leading-tight">•</span>
              <div>
                <strong className="text-slate-950 font-bold">State &amp; Backend: </strong>
                Redux Toolkit, Context API, REST APIs, Next API, MongoDB, Node.js, NestJS.
              </div>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#0f3b70] font-bold leading-tight">•</span>
              <div>
                <strong className="text-slate-950 font-bold">Tools &amp; Deployment: </strong>
                Git, GitHub, Vercel, VS Code.
              </div>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#0f3b70] font-bold leading-tight">•</span>
              <div>
                <strong className="text-slate-950 font-bold">AI-Assisted Development: </strong>
                ChatGPT, Claude, Gemini (AI-Assisted Coding, Debugging, Code Review &amp; Prompt Engineering).
              </div>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#0f3b70] font-bold leading-tight">•</span>
              <div>
                <strong className="text-slate-950 font-bold">Soft Skills: </strong>
                Communication, Public Speaking, Team Management, Problem Solving, Cross-Functional Collaboration.
              </div>
            </li>
          </ul>
        </div>

        {/* 3. PROFESSIONAL EXPERIENCE */}
        <div>
          <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-[#0f3b70] border-b border-slate-300 pb-0.5 mb-1 section-title">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div>
            <div className="flex flex-row items-center justify-between font-bold text-slate-950 text-[11px] mb-1 job-header flex-between">
              <span>
                WordPress Developer &nbsp;|&nbsp;{" "}
                <span className="font-semibold text-slate-900">
                  IN Technology Ltd. (Mirpur, Dhaka)
                </span>
              </span>
              <span className="font-bold text-slate-900 font-mono text-xs date-badge">2022 – 2023</span>
            </div>
            <ul className="space-y-0.5 text-slate-800 text-[10.5px]">
              <li className="flex items-start gap-1.5">
                <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                <div>
                  <strong className="text-slate-950 font-bold">Theme &amp; Plugin Customization: </strong>
                  Customized 8+ WordPress themes and plugins to match client branding and requirements.
                </div>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                <div>
                  <strong className="text-slate-950 font-bold">UI/UX &amp; Bug Resolution: </strong>
                  Resolved 20+ UI/UX layout issues, broken links, and CSS conflicts across device viewports.
                </div>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                <div>
                  <strong className="text-slate-950 font-bold">Performance Optimization: </strong>
                  Improved page load speeds by 30% via image compression, asset minification, and responsive fixes.
                </div>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                <div>
                  <strong className="text-slate-950 font-bold">Site Maintenance: </strong>
                  Managed ongoing content updates, plugin upgrades, and routine security checks across client sites.
                </div>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                <div>
                  <strong className="text-slate-950 font-bold">Team Collaboration: </strong>
                  Collaborated with a 3-member team to translate UI mockups into clean, production-ready pages.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 4. PROJECTS */}
        <div>
          <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-[#0f3b70] border-b border-slate-300 pb-0.5 mb-1 section-title">
            PROJECTS
          </h2>
          <div className="space-y-2.5">
            {/* Project 1 */}
            <div className="project-item">
              <div className="font-bold text-slate-950 text-[11px] mb-0.5 project-title">
                Organization Website – BPSKF &nbsp;|&nbsp;{" "}
                <span className="font-normal italic text-slate-700 tech-stack">
                  Technologies: Next.js, Tailwind CSS, Next API, MongoDB
                </span>
              </div>
              <ul className="space-y-0.5 text-slate-800 text-[10.5px]">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                  <div>
                    <strong className="text-slate-950 font-bold">Architecture &amp; UI: </strong>
                    Built a production portal with 15+ reusable Next.js components and Tailwind CSS for responsiveness.
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                  <div>
                    <strong className="text-slate-950 font-bold">Backend &amp; Engagement: </strong>
                    Engineered 6+ Next API endpoints with MongoDB for dynamic content, donations, and contact forms.
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                  <div>
                    <strong className="text-slate-950 font-bold">Error Handling: </strong>
                    Eliminated UI crashes during async data fetching using loading skeletons and fallback error states.
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                  <div>
                    <strong className="text-slate-950 font-bold">Speed &amp; Compatibility: </strong>
                    Boosted initial page rendering speed by 35% and ensured cross-browser compatibility.
                  </div>
                </li>
              </ul>
              <div className="text-[10.5px] mt-0.5 pl-3 flex flex-wrap items-center gap-2 links-row">
                <span className="font-semibold text-slate-900">Live Demo:</span>
                <a
                  href="https://bpskf.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-blue-600 underline hover:text-blue-800"
                >
                  https://bpskf.vercel.app
                </a>
                <span className="text-slate-400">|</span>
                <span className="font-semibold text-slate-900">Git Repo:</span>
                <a
                  href="https://github.com/imsabbiir/bpskf"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-blue-600 underline hover:text-blue-800"
                >
                  https://github.com/imsabbiir/bpskf
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-item">
              <div className="font-bold text-slate-950 text-[11px] mb-0.5 project-title">
                Yejara E-Commerce Platform &nbsp;|&nbsp;{" "}
                <span className="font-normal italic text-slate-700 tech-stack">
                  Technologies: Next.js, Tailwind CSS, Next API, MongoDB
                </span>
              </div>
              <ul className="space-y-0.5 text-slate-800 text-[10.5px]">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                  <div>
                    <strong className="text-slate-950 font-bold">End-to-End Workflow: </strong>
                    Architected an e-commerce platform with authentication, 100+ product catalog, and order processing.
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                  <div>
                    <strong className="text-slate-950 font-bold">Product Discovery: </strong>
                    Built real-time multi-criteria filtering, keyword search, and category navigation via REST APIs.
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                  <div>
                    <strong className="text-slate-950 font-bold">State Synchronization: </strong>
                    Resolved cart state synchronization and persistence across 10+ routes using Context API.
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#0f3b70] font-bold leading-tight">•</span>
                  <div>
                    <strong className="text-slate-950 font-bold">Performance Optimization: </strong>
                    Reduced initial load time by 40% via lazy loading, Next.js image optimization, and code splitting.
                  </div>
                </li>
              </ul>
              <div className="text-[10.5px] mt-0.5 pl-3 flex flex-wrap items-center gap-2 links-row">
                <span className="font-semibold text-slate-900">Live Demo:</span>
                <a
                  href="https://yejara.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-blue-600 underline hover:text-blue-800"
                >
                  https://yejara.vercel.app
                </a>
                <span className="text-slate-400">|</span>
                <span className="font-semibold text-slate-900">Git Repo:</span>
                <a
                  href="https://github.com/imsabbiir/yejara"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-blue-600 underline hover:text-blue-800"
                >
                  https://github.com/imsabbiir/yejara
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 5. EDUCATION */}
        <div>
          <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-[#0f3b70] border-b border-slate-300 pb-0.5 mb-1 section-title">
            EDUCATION
          </h2>
          <div className="space-y-1 text-xs">
            <div className="flex flex-row items-center justify-between flex-between">
              <div>
                <strong className="text-slate-950 font-bold">B.Sc. in Computer Science</strong>
                &nbsp;|&nbsp;
                <span className="text-slate-800">Southeast University (Tejgaon, Dhaka)</span>
              </div>
              <span className="font-bold text-slate-900 font-mono text-xs date-badge">2022 – Present</span>
            </div>
            <div className="flex flex-row items-center justify-between flex-between">
              <div>
                <strong className="text-slate-950 font-bold">Diploma in Computer</strong>
                &nbsp;|&nbsp;
                <span className="text-slate-800">
                  Narsingdi Polytechnic Institute (Police-line, Narsingdi)
                </span>
              </div>
              <span className="font-bold text-slate-900 font-mono text-xs date-badge">2017 – 2021</span>
            </div>
          </div>
        </div>

        {/* 6. CERTIFICATIONS & SPECIALIZED COURSES */}
        <div>
          <h2 className="text-[11.5px] font-bold uppercase tracking-wider text-[#0f3b70] border-b border-slate-300 pb-0.5 mb-1 section-title">
            CERTIFICATIONS &amp; SPECIALIZED COURSES
          </h2>
          <ul className="space-y-0.5 text-slate-800 text-[10.5px]">
            <li className="flex items-start gap-1.5">
              <span className="text-[#0f3b70] font-bold leading-tight">•</span>
              <div>
                <strong className="text-slate-950 font-bold">Office Specialist: </strong>
                Microsoft Office Application Specialist 3 Months, 2014–2015 – Excel Dashboards, Word, PowerPoint, Access.
              </div>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#0f3b70] font-bold leading-tight">•</span>
              <div>
                <strong className="text-slate-950 font-bold">Responsive Web Design: </strong>
                Responsive Web Design Course 8 Months, 2019–2020 – In Creative IT Institute.
              </div>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#0f3b70] font-bold leading-tight">•</span>
              <div>
                <strong className="text-slate-950 font-bold">Self-Directed Modern Stack Mastery: </strong>
                hands-on mastery of React, Next, Next API, TypeScript, Tailwind CSS, MongoDB, and Redux.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
