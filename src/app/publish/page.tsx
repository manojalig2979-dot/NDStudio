"use client";

import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import { Send, Globe, Video, Radio, Share2, Check, Calendar } from "lucide-react";

export default function PublishPage() {
  const [platforms] = useState([
    { name: "Instagram", icon: Globe, desc: "Publish Reels & Stories", connected: true, username: "@ndstudio_official" },
    { name: "YouTube", icon: Video, desc: "Publish YouTube Shorts", connected: true, username: "NDStudio AI" },
    { name: "TikTok", icon: Radio, desc: "Publish Short Videos", connected: false, username: null },
    { name: "Facebook", icon: Share2, desc: "Publish Reels & Watch", connected: false, username: null },
  ]);

  return (
    <div className="min-h-screen bg-[#09090d] text-white flex">
      <Sidebar />

      <section className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between border-b border-slate-800/80 px-8 py-5 bg-[#0e0e14]/80 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Send size={20} className="text-purple-400" />
              Social Publishing Hub
            </h1>
            <p className="text-xs text-slate-400">
              Direct multi-platform 1-click publishing & scheduling for Reels & Shorts.
            </p>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full space-y-8">
          {/* Connected Accounts */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              Connected Channels
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {platforms.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.name}
                    className="rounded-2xl border border-slate-800 bg-[#111116] p-5 flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                          <Icon size={16} />
                        </div>
                        <h3 className="font-bold text-sm text-white">{p.name}</h3>
                      </div>
                      {p.connected ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-600" />
                      )}
                    </div>

                    <p className="text-xs text-slate-400">{p.desc}</p>

                    <div className="pt-3 border-t border-slate-800/80">
                      {p.connected ? (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-purple-300 font-medium truncate">
                            {p.username}
                          </span>
                          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                            Active
                          </span>
                        </div>
                      ) : (
                        <button className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors">
                          Connect Account
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Publishing Queue */}
          <div className="rounded-2xl border border-slate-800 bg-[#111116] p-6 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Recent Publishing Schedule
            </h2>

            <div className="rounded-xl border border-slate-800/80 bg-black/30 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-16 rounded-lg bg-purple-900/30 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xs font-bold font-mono">
                  9:16
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Bhagavad Gita 2.11 Wisdom</h4>
                  <p className="text-xs text-slate-400">
                    Target: Instagram Reels + YouTube Shorts
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
                  ✓ Published
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
