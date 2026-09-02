"use client";

import React, { useState } from "react";
import { FolderOpen, Film, Clock, Eye, Trash2, Search } from "lucide-react";

export default function AdminProjectsPage() {
  const [search, setSearch] = useState("");

  const projects = [
    { id: "p-101", title: "Gita Chapter 2.11 Wisdom", creator: "Aarav Sharma", duration: 30, scenes: 4, renders: 3, status: "READY" },
    { id: "p-102", title: "Daily Morning Discipline", creator: "Priya Patel", duration: 30, scenes: 3, renders: 1, status: "DRAFT" },
    { id: "p-103", title: "Karma Yoga Principles", creator: "Rohan Verma", duration: 60, scenes: 5, renders: 6, status: "READY" },
    { id: "p-104", title: "Focus & Inner Peace", creator: "Ananya Deshmukh", duration: 10, scenes: 2, renders: 2, status: "READY" },
  ];

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FolderOpen size={22} className="text-purple-400" />
            <span>Global Projects & Storyboards</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Audit and monitor all created reels across the platform.
          </p>
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-purple-500 w-64"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-[#111116] overflow-hidden shadow-xl">
        <div className="grid grid-cols-12 px-6 py-3.5 border-b border-slate-800 bg-slate-900/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <span className="col-span-5">Project Title / Creator</span>
          <span className="col-span-2">Duration / Scenes</span>
          <span className="col-span-2">Renders</span>
          <span className="col-span-3 text-right">Status</span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="grid grid-cols-12 px-6 py-4 items-center hover:bg-slate-800/30 transition-colors text-xs"
            >
              <div className="col-span-5 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Film size={15} />
                </div>
                <div>
                  <div className="font-bold text-white">{proj.title}</div>
                  <div className="text-slate-500 text-[11px]">Created by {proj.creator}</div>
                </div>
              </div>

              <div className="col-span-2 font-mono text-slate-300">
                {proj.duration}s • {proj.scenes} scenes
              </div>

              <div className="col-span-2 text-slate-400 font-mono">
                {proj.renders} renders
              </div>

              <div className="col-span-3 text-right">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {proj.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
