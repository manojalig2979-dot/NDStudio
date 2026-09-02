"use client";

import React from "react";
import { Clock, Image as ImageIcon, Sparkles, Mic, Trash2, Edit3, Volume2 } from "lucide-react";
import type { Scene } from "@/lib/types";

type SceneCardProps = {
  scene: Scene;
  isActive: boolean;
  onSelect: () => void;
  onDelete?: () => void;
  onUpdate?: (updates: Partial<Scene>) => void;
};

export default function SceneCard({
  scene,
  isActive,
  onSelect,
  onDelete,
  onUpdate,
}: SceneCardProps) {
  const getTypeBadge = (type: Scene["type"]) => {
    switch (type) {
      case "hook":
        return "bg-rose-500/10 text-rose-300 border-rose-500/20";
      case "shloka":
        return "bg-amber-500/10 text-amber-300 border-amber-500/20";
      case "meaning":
        return "bg-cyan-500/10 text-cyan-300 border-cyan-500/20";
      case "lesson":
        return "bg-purple-500/10 text-purple-300 border-purple-500/20";
      case "cta":
        return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
      default:
        return "bg-indigo-500/10 text-indigo-300 border-indigo-500/20";
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`rounded-2xl border p-4 cursor-pointer transition-all duration-200 relative group ${
        isActive
          ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/10 ring-1 ring-purple-500/40"
          : "border-slate-800/90 bg-[#111116] hover:border-slate-700 hover:bg-[#15151c]"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 rounded-full bg-slate-800 text-[11px] font-bold text-slate-300 flex items-center justify-center">
            {scene.order}
          </span>
          <span className="text-xs font-semibold text-white truncate max-w-[140px]">
            {scene.title}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md border ${getTypeBadge(
              scene.type
            )}`}
          >
            {scene.type}
          </span>
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 p-1 transition-opacity"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <p className="text-slate-300 line-clamp-2 italic font-serif">
          "{scene.text}"
        </p>

        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <Clock size={12} className="text-purple-400" />
              <span>{scene.duration}s</span>
            </span>
            {scene.sfx && scene.sfx.length > 0 && (
              <span className="flex items-center space-x-1 text-amber-400">
                <Volume2 size={12} />
                <span>{scene.sfx.length} SFX</span>
              </span>
            )}
          </div>
          <span className="text-[10px] text-slate-400">
            {scene.onScreenText || "Captions on"}
          </span>
        </div>
      </div>
    </div>
  );
}
