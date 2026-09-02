"use client";

import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import { audioLibrary, sfxLibrary } from "@/data/audio-library";
import { Music, Volume2, Play, Pause, Disc, Sparkles } from "lucide-react";

export default function AudioPage() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#09090d] text-white flex">
      <Sidebar />

      <section className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between border-b border-slate-800/80 px-8 py-5 bg-[#0e0e14]/80 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Music size={20} className="text-purple-400" />
              Royalty-Free Audio & Soundboard Vault
            </h1>
            <p className="text-xs text-slate-400">
              Audition background music tracks, divine ambient chants, and cinematic SFX cues.
            </p>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full space-y-10">
          {/* Background Music Tracks */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Disc size={16} className="text-purple-400" />
              <span>Background Music Tracks</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {audioLibrary.map((track) => (
                <div
                  key={track.id}
                  className="rounded-2xl border border-slate-800 bg-[#111116] p-5 flex items-center justify-between hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center space-x-3.5">
                    <button
                      type="button"
                      onClick={() => togglePlay(track.id)}
                      className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all shadow-sm"
                    >
                      {playingId === track.id ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                    </button>
                    <div>
                      <h3 className="font-bold text-sm text-white">{track.name}</h3>
                      <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="text-purple-300 font-medium">{track.category}</span>
                        <span>•</span>
                        <span className="font-mono">{track.duration}s</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                    Royalty Free
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sound Effects Library */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Sparkles size={16} className="text-cyan-400" />
              <span>Cinematic Sound Effects & Cues</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sfxLibrary.map((sfx) => (
                <div
                  key={sfx.id}
                  className="rounded-2xl border border-slate-800 bg-[#111116] p-4 flex flex-col justify-between space-y-3 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{sfx.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">{sfx.duration}s</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => togglePlay(sfx.id)}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-purple-600/40 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <Volume2 size={13} />
                    <span>Audition Cue</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
