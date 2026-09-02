"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import { FolderOpen, Plus, Film, Clock, Play, Trash2, ArrowRight } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    {
      id: "proj-1",
      title: "Bhagavad Gita Chapter 2.11",
      description: "Ashochyan Anvashochastvam - Spiritual wisdom reel",
      duration: 30,
      status: "ready",
      updatedAt: "Today, 10:30 PM",
    },
    {
      id: "proj-2",
      title: "Daily Discipline Motivation",
      description: "High energy motivational reel on building consistency",
      duration: 30,
      status: "draft",
      updatedAt: "Yesterday",
    },
  ]);

  return (
    <div className="min-h-screen bg-[#09090d] text-white flex">
      <Sidebar />

      <section className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between border-b border-slate-800/80 px-8 py-5 bg-[#0e0e14]/80 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <FolderOpen size={20} className="text-purple-400" />
              Project Library
            </h1>
            <p className="text-xs text-slate-400">
              Manage and re-edit all your AI-generated Reels.
            </p>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-purple-600/30 transition-all"
          >
            <Plus size={16} />
            <span>Create New Reel</span>
          </Link>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-slate-800 bg-[#111116] p-5 hover:border-slate-700 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <Film size={18} />
                    </div>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-white mb-1.5 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-mono">
                    <Clock size={13} className="text-purple-400" />
                    <span>{project.duration}s</span>
                  </div>

                  <Link
                    href="/studio"
                    className="flex items-center space-x-1 text-xs font-semibold text-purple-400 hover:text-purple-300"
                  >
                    <span>Open in Studio</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
