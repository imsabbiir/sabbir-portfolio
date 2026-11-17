"use client";

import React, { useState } from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import {
  ExternalLink,
  Folder,
  Layers,
  Sparkles,
  ArrowLeft,
  Eye,
  Globe,
  Tag,
  CheckCircle2,
  Calendar,
  User,
  ShoppingBag,
  Cpu,
} from "lucide-react";
import { FaGithub, FaWordpress } from "react-icons/fa6";

export default function ProjectsWindow() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Exact categories matching user's request & API
  const categories = ["All", "Frontend", "WordPress", "E-Commerce", "UI Design", "AI & Tools"];

  const filteredProjects =
    activeCategory === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeCategory);

  const getCategoryBadgeClass = (cat) => {
    switch (cat) {
      case "WordPress":
        return "bg-blue-600/15 text-blue-500 border-blue-500/30";
      case "E-Commerce":
        return "bg-emerald-600/15 text-emerald-500 border-emerald-500/30";
      case "UI Design":
        return "bg-purple-600/15 text-purple-500 border-purple-500/30";
      case "AI & Tools":
        return "bg-amber-600/15 text-amber-500 border-amber-500/30";
      default:
        return "bg-sky-600/15 text-sky-500 border-sky-500/30";
    }
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-4 text-slate-800 dark:text-slate-100 select-text pb-2">
      {/* Finder Left Sidebar */}
      <aside className="w-full md:w-52 flex md:flex-col gap-1 border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10 pb-3 md:pb-0 md:pr-3 shrink-0 text-xs">
        <div className="hidden md:block text-[10px] font-semibold tracking-wider text-black/40 dark:text-white/40 uppercase mb-2 px-2">
          Project Folders
        </div>
        {categories.map((cat) => {
          const count =
            cat === "All"
              ? portfolioData.projects.length
              : portfolioData.projects.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedProject(null);
              }}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-left transition font-medium cursor-pointer ${
                activeCategory === cat && !selectedProject
                  ? "bg-blue-600 text-white shadow-sm"
                  : "hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70"
              }`}
            >
              <div className="flex items-center gap-2">
                <Folder
                  size={14}
                  className={activeCategory === cat && !selectedProject ? "text-white" : "text-blue-500"}
                />
                <span>{cat}</span>
              </div>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat && !selectedProject
                    ? "bg-white/20 text-white"
                    : "bg-black/5 dark:bg-white/10 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto space-y-4 pr-1">
        {/* DETAIL VIEW WHEN A PROJECT IS CLICKED */}
        {selectedProject ? (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-xs font-semibold transition cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Back to Projects Grid</span>
              </button>

              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryBadgeClass(
                  selectedProject.category
                )}`}
              >
                {selectedProject.category}
              </span>
            </div>

            {/* Project Header Info */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {selectedProject.title}
              </h2>
              {selectedProject.clientName && (
                <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-1.5 font-medium">
                  <User size={12} />
                  <span>Client / Organization: {selectedProject.clientName}</span>
                </div>
              )}
            </div>

            {/* Gallery / Screenshot Viewer */}
            <div className="space-y-2">
              <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden bg-slate-900 border border-black/10 dark:border-white/10 shadow-md">
                <Image
                  src={
                    selectedProject.gallery && selectedProject.gallery.length > 0
                      ? selectedProject.gallery[activeImageIndex] || selectedProject.image
                      : selectedProject.image
                  }
                  alt={selectedProject.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Thumbnails strip */}
              {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
                  {selectedProject.gallery.map((imgUrl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImageIndex(i)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition cursor-pointer ${
                        activeImageIndex === i
                          ? "border-blue-500 scale-105 shadow-md"
                          : "border-black/10 dark:border-white/10 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={imgUrl} alt="Thumbnail" fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Detailed Description */}
            <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Project Overview & Architecture
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {selectedProject.fullDescription || selectedProject.description}
              </p>
            </div>

            {/* Technologies Used */}
            <div className="space-y-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags?.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-medium border border-blue-500/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={selectedProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-md"
              >
                <ExternalLink size={14} />
                <span>Launch Live Project Website</span>
              </a>

              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-xs font-semibold transition"
              >
                <FaGithub size={15} />
                <span>GitHub Source</span>
              </a>
            </div>
          </div>
        ) : (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleSelectProject(project)}
                className="group bg-white/70 dark:bg-white/[0.04] border border-black/8 dark:border-white/10 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all flex flex-col justify-between cursor-pointer"
              >
                <div className="relative h-40 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-md border ${getCategoryBadgeClass(
                        project.category
                      )} bg-slate-900/80`}
                    >
                      {project.category}
                    </span>
                  </div>

                  {project.clientName && (
                    <div className="absolute bottom-2 left-2 max-w-[85%]">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/70 text-white backdrop-blur-md truncate block">
                        Client: {project.clientName}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-200/60 dark:bg-white/5 text-slate-500 font-mono">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    className="flex items-center gap-2 pt-2 border-t border-black/5 dark:border-white/5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectProject(project)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-medium transition cursor-pointer"
                    >
                      <Eye size={12} />
                      <span>Details</span>
                    </button>

                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition"
                      title="Open Live Website"
                    >
                      <ExternalLink size={12} />
                      <span>Live</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
