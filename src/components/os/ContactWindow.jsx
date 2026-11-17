"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { Send, Copy, Check, Mail, Globe, MapPin, Sparkles } from "lucide-react";
import { FaLinkedin, FaGithub, FaYoutube } from "react-icons/fa6";

export default function ContactWindow() {
  const { profile } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    // Open user's default email client with prefilled details
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      form.subject || `Portfolio Contact from ${form.name}`
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )}`;
    
    window.location.href = mailtoUrl;
    setSent(true);
  };

  return (
    <div className="space-y-4 text-slate-800 dark:text-slate-100 font-sans select-text">
      {/* Top Mail Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
        <div className="flex items-center gap-2 text-xs">
          <Mail size={16} className="text-blue-500" />
          <span className="text-slate-400">Direct Contact:</span>
          <span className="font-semibold text-slate-800 dark:text-white font-mono">{profile.email}</span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-black/10 dark:border-white/10 text-xs font-medium hover:bg-black/5 transition cursor-pointer"
        >
          {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
          <span>{copied ? "Copied!" : "Copy Email"}</span>
        </button>
      </div>

      {/* Location & Status Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 flex items-center gap-2">
          <MapPin size={14} className="text-rose-500 shrink-0" />
          <span className="text-slate-600 dark:text-slate-300">
            {profile.district}, {profile.city}, {profile.residence}
          </span>
        </div>
        <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span>Available for Freelance & Frontend Roles</span>
        </div>
      </div>

      {sent ? (
        <div className="p-6 text-center space-y-2 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/40">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <Check size={24} />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white">Message Dispatched!</h3>
          <p className="text-xs text-slate-500">
            Your default email client opened with the message draft. You can also email me directly at {profile.email}.
          </p>
          <button
            onClick={() => setSent(false)}
            className="mt-2 text-xs text-blue-600 underline cursor-pointer"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-3 py-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                Your Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full px-3 py-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
              Subject
            </label>
            <input
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="Project Collaboration / Website Development"
              className="w-full px-3 py-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
              Message
            </label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Hi Sabbir, I would like to discuss a project..."
              className="w-full px-3 py-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none focus:border-blue-500 transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
          >
            <Send size={13} />
            <span>Send Message via Mail Client</span>
          </button>
        </form>
      )}

      {/* Social quick connect row */}
      <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 border-t border-black/5 dark:border-white/5">
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 hover:text-blue-600 transition"
        >
          <FaLinkedin size={14} />
          <span>LinkedIn</span>
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition"
        >
          <FaGithub size={14} />
          <span>GitHub</span>
        </a>
        <a
          href={profile.youtube}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 hover:text-rose-600 transition"
        >
          <FaYoutube size={14} />
          <span>YouTube</span>
        </a>
        <a
          href={profile.website}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 hover:text-emerald-500 transition"
        >
          <Globe size={14} />
          <span>imsabbir.xyz</span>
        </a>
      </div>
    </div>
  );
}
