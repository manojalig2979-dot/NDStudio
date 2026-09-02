"use client";

import React, { useEffect, useState } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Film, Smartphone, Square, Monitor } from "lucide-react";
import type { Scene, AudioAsset } from "@/lib/types";

type StudioPreviewProps = {
  scenes: Scene[];
  activeSceneIndex: number;
  currentTime: number;
  totalDuration: number;
  isPlaying: boolean;
  onPlayToggle: () => void;
  onSeek: (time: number) => void;
  selectedMusic?: AudioAsset | null;
  musicVolume?: number;
  voiceVolume?: number;
  ducking?: boolean;
};

export default function StudioPreview({
  scenes,
  activeSceneIndex,
  currentTime,
  totalDuration,
  isPlaying,
  onPlayToggle,
  onSeek,
  selectedMusic,
  musicVolume = 0.3,
  voiceVolume = 1,
  ducking = true,
}: StudioPreviewProps) {
  const [aspectRatio, setAspectRatio] = useState<"9:16" | "1:1" | "16:9">("9:16");
  const currentScene = scenes[activeSceneIndex] || scenes[0];

  const aspectClass =
    aspectRatio === "9:16"
      ? "max-w-[300px] aspect-[9/16]"
      : aspectRatio === "1:1"
      ? "max-w-[340px] aspect-square"
      : "max-w-[420px] aspect-video";

  return (
    <div className="flex flex-col items-center w-full">
      {/* Aspect Ratio Switcher */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 mb-3 text-xs">
        <button
          type="button"
          onClick={() => setAspectRatio("9:16")}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-all ${
            aspectRatio === "9:16" ? "bg-purple-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
          }`}
        >
          <Smartphone size={12} />
          <span>9:16 Reel</span>
        </button>

        <button
          type="button"
          onClick={() => setAspectRatio("1:1")}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-all ${
            aspectRatio === "1:1" ? "bg-purple-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
          }`}
        >
          <Square size={12} />
          <span>1:1 Post</span>
        </button>

        <button
          type="button"
          onClick={() => setAspectRatio("16:9")}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-all ${
            aspectRatio === "16:9" ? "bg-purple-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
          }`}
        >
          <Monitor size={12} />
          <span>16:9 Landscape</span>
        </button>
      </div>

      {/* Preview Player Container */}
      <div
        className={`relative w-full ${aspectClass} rounded-3xl overflow-hidden border border-slate-800/90 bg-gradient-to-b from-[#1a1424] via-[#100d17] to-black shadow-2xl flex flex-col justify-between p-6 select-none group transition-all duration-300`}
      >
        {/* Background Visual Layer */}
        {currentScene?.imageUrl ? (
          <img
            src={currentScene.imageUrl}
            alt={currentScene.title}
            className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-90 group-hover:scale-105 transition-transform duration-700"
          />
        ) : null}

        {/* Glow & Vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none z-[1]" />

        {/* Top Header info */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 backdrop-blur-md bg-black/50 px-3.5 py-1.5 rounded-full border border-white/10 shadow-md">
          <span className="flex items-center gap-1.5 text-purple-300 font-semibold">
            <Sparkles size={12} className="text-cyan-400" />
            Scene {activeSceneIndex + 1}/{scenes.length}
          </span>
          <span className="font-mono text-[10px] text-slate-300 font-bold">
            {currentTime.toFixed(1)}s / {totalDuration}s
          </span>
        </div>

        {/* Center Visual Storyboard Content */}
        <div className="relative z-10 my-auto text-center space-y-3.5">
          <div className="inline-block text-[10px] uppercase tracking-[0.25em] text-purple-200 font-bold bg-purple-600/40 border border-purple-400/30 px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
            {currentScene?.type || "Reel"}
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white leading-tight font-serif drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {currentScene?.title || "NDStudio Reel"}
          </h2>

          <p className="text-xs text-slate-200 leading-relaxed font-sans max-w-[250px] mx-auto drop-shadow-md">
            {currentScene?.narration || currentScene?.text || "Generate viral AI videos"}
          </p>

          {/* Dynamic Captions overlay with animated Karaoke glow */}
          {currentScene?.captionEnabled !== false && (
            <div className="pt-2">
              <span
                className="inline-block px-4 py-2 rounded-xl text-sm font-black tracking-wide shadow-2xl uppercase border border-amber-400/30 backdrop-blur-md transform transition-transform hover:scale-105"
                style={{
                  color: "#fef08a",
                  backgroundColor: "rgba(0,0,0,0.85)",
                  textShadow: "0 0 12px rgba(250, 204, 21, 0.6)",
                }}
              >
                {currentScene?.onScreenText || currentScene?.text}
              </span>
            </div>
          )}
        </div>

        {/* Bottom Playback Overlay */}
        <div className="relative z-10 flex flex-col items-center space-y-2.5">
          <button
            type="button"
            onClick={onPlayToggle}
            className="w-12 h-12 rounded-full bg-white hover:bg-slate-100 text-black flex items-center justify-center shadow-xl shadow-purple-600/40 transition-transform transform active:scale-95"
          >
            {isPlaying ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" className="ml-0.5" />
            )}
          </button>

          <div className="text-[10px] text-slate-300 font-mono flex items-center gap-2 drop-shadow">
            {selectedMusic ? (
              <span className="text-purple-300 flex items-center gap-1 font-semibold">
                🎵 {selectedMusic.name}
              </span>
            ) : (
              <span>1080 × 1920 • 60 FPS</span>
            )}
          </div>
        </div>
      </div>

      {/* Quick Playhead Progress bar */}
      <div className="w-full max-w-[300px] mt-4 flex items-center space-x-3">
        <button
          type="button"
          onClick={() => onSeek(0)}
          className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          title="Restart"
        >
          <RotateCcw size={14} />
        </button>

        <div className="flex-1 relative">
          <input
            type="range"
            min="0"
            max={totalDuration}
            step="0.1"
            value={currentTime}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="w-full accent-purple-500 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
