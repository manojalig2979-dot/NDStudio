"use client";

import React, { useEffect, useState } from "react";
import { Volume2, Plus, Trash2, Zap } from "lucide-react";
import type { AudioAsset, SceneSFX } from "@/lib/types";

type SFXStudioProps = {
  sfx: SceneSFX[];
  onChange: (sfx: SceneSFX[]) => void;
};

export default function SFXStudio({ sfx, onChange }: SFXStudioProps) {
  const [library, setLibrary] = useState<AudioAsset[]>([]);

  useEffect(() => {
    fetch("/api/audio")
      .then((res) => res.json())
      .then((data) => {
        setLibrary((data.audio || []).filter((item: AudioAsset) => item.type === "sfx"));
      })
      .catch(() => {
        import("@/data/audio-library").then((mod) => {
          setLibrary(mod.audioLibrary.filter((item) => item.type === "sfx"));
        });
      });
  }, []);

  const addSfx = (item: AudioAsset) => {
    const newSfx: SceneSFX = {
      id: `${item.id}-${Date.now()}`,
      name: item.name,
      url: item.url,
      volume: item.volume ?? 0.5,
      offset: 0,
    };
    onChange([...sfx, newSfx]);
  };

  const removeSfx = (id: string) => {
    onChange(sfx.filter((item) => item.id !== id));
  };

  const updateSfx = (id: string, updates: Partial<SceneSFX>) => {
    onChange(
      sfx.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
          <Zap size={16} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Scene Sound Effects</h3>
          <p className="text-[10px] text-slate-500">Add cues like whooshes and impacts</p>
        </div>
      </div>

      {sfx.length > 0 && (
        <div className="space-y-2.5">
          {sfx.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-800 bg-[#121218] p-3 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">{item.name}</span>
                <button
                  type="button"
                  onClick={() => removeSfx(item.id)}
                  className="text-slate-500 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] text-slate-400">Volume</label>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {Math.round(item.volume * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={item.volume}
                    onChange={(e) => updateSfx(item.id, { volume: Number(e.target.value) })}
                    className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">
                    Offset (seconds)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={item.offset}
                    onChange={(e) => updateSfx(item.id, { offset: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-800 bg-black/40 px-2.5 py-1 text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        <label className="text-[11px] font-semibold text-slate-400 block mb-2 uppercase tracking-wider">
          Available Sound Library
        </label>
        <div className="grid grid-cols-2 gap-2">
          {library.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => addSfx(item)}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-left hover:border-slate-700 hover:bg-slate-800/50 transition-all text-xs text-slate-300 hover:text-white"
            >
              <span className="truncate mr-2">{item.name}</span>
              <Plus size={14} className="text-amber-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
