"use client";

import React from "react";
import { Video, Type, Mic, Music as MusicIcon, Clock } from "lucide-react";
import type { Scene } from "@/lib/types";

type TimelineProps = {
  scenes: Scene[];
  activeScene: number;
  currentTime: number;
  totalDuration: number;
  onSelectScene: (index: number) => void;
  onDurationChange?: (sceneIndex: number, newDuration: number) => void;
  onSeek: (time: number) => void;
  musicName?: string;
};

export default function Timeline({
  scenes,
  activeScene,
  currentTime,
  totalDuration,
  onSelectScene,
  onSeek,
  musicName,
}: TimelineProps) {
  // Compute scene offsets
  let accumulatedTime = 0;
  const sceneTimes = scenes.map((s) => {
    const start = accumulatedTime;
    accumulatedTime += s.duration;
    return { start, end: accumulatedTime, duration: s.duration };
  });

  const progressPercent = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0e0e14] p-4 select-none">
      {/* Timeline Controls Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
        <div className="flex items-center space-x-2">
          <Clock size={15} className="text-purple-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Multi-Track Timeline
          </span>
        </div>
        <div className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
          {currentTime.toFixed(1)}s / {totalDuration}s
        </div>
      </div>

      {/* Main Track Grid */}
      <div className="space-y-2 relative">
        {/* Playhead Indicator Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 z-30 pointer-events-none transition-all duration-75 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
          style={{
            left: `calc(7rem + ${progressPercent * 0.88}%)`,
          }}
        >
          <div className="w-2.5 h-2.5 -ml-1 -top-1 absolute bg-cyan-400 rounded-full" />
        </div>

        {/* Video Track */}
        <div className="flex items-center space-x-3">
          <div className="w-24 shrink-0 flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
            <Video size={14} className="text-purple-400" />
            <span>VIDEO</span>
          </div>
          <div className="flex-1 flex gap-1.5 h-10 bg-black/40 rounded-xl p-1 border border-slate-800/80">
            {scenes.map((scene, idx) => {
              const widthRatio = (scene.duration / totalDuration) * 100;
              const isSelected = activeScene === idx;

              return (
                <button
                  key={scene.id || idx}
                  type="button"
                  onClick={() => onSelectScene(idx)}
                  style={{ width: `${widthRatio}%` }}
                  className={`h-full rounded-lg px-2 text-left flex items-center justify-between text-xs font-semibold transition-all truncate ${
                    isSelected
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 ring-1 ring-white/30"
                      : "bg-purple-950/40 text-purple-300 border border-purple-500/20 hover:bg-purple-900/40"
                  }`}
                >
                  <span className="truncate">Scene {idx + 1}</span>
                  <span className="text-[10px] opacity-75 font-mono ml-1">{scene.duration}s</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Text / Captions Track */}
        <div className="flex items-center space-x-3">
          <div className="w-24 shrink-0 flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
            <Type size={14} className="text-cyan-400" />
            <span>CAPTIONS</span>
          </div>
          <div className="flex-1 flex gap-1.5 h-8 bg-black/40 rounded-xl p-1 border border-slate-800/80">
            {scenes.map((scene, idx) => {
              const widthRatio = (scene.duration / totalDuration) * 100;

              return (
                <div
                  key={idx}
                  style={{ width: `${widthRatio}%` }}
                  className="h-full rounded-lg bg-cyan-950/30 border border-cyan-500/20 px-2 flex items-center text-[10px] text-cyan-300 font-medium truncate"
                >
                  <span className="truncate">{scene.onScreenText || scene.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Voice Track */}
        <div className="flex items-center space-x-3">
          <div className="w-24 shrink-0 flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
            <Mic size={14} className="text-amber-400" />
            <span>VOICE</span>
          </div>
          <div className="flex-1 flex gap-1.5 h-8 bg-black/40 rounded-xl p-1 border border-slate-800/80">
            {scenes.map((scene, idx) => {
              const widthRatio = (scene.duration / totalDuration) * 100;

              return (
                <div
                  key={idx}
                  style={{ width: `${widthRatio}%` }}
                  className="h-full rounded-lg bg-amber-950/30 border border-amber-500/20 px-2 flex items-center justify-between text-[10px] text-amber-300 font-medium truncate"
                >
                  <span className="truncate">{scene.narration || "Speech"}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Music Track */}
        <div className="flex items-center space-x-3">
          <div className="w-24 shrink-0 flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
            <MusicIcon size={14} className="text-emerald-400" />
            <span>MUSIC</span>
          </div>
          <div className="flex-1 h-8 bg-black/40 rounded-xl p-1 border border-slate-800/80">
            {musicName ? (
              <div className="h-full rounded-lg bg-emerald-950/40 border border-emerald-500/30 px-3 flex items-center text-[10px] font-semibold text-emerald-300">
                🎵 {musicName} (Looping + Ducking enabled)
              </div>
            ) : (
              <div className="h-full rounded-lg flex items-center px-3 text-[10px] text-slate-600 italic">
                No background music selected
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
