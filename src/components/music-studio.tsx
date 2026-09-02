"use client";

import React, { useEffect, useState } from "react";
import { Music, Play, Pause, Volume2, VolumeX, ShieldCheck } from "lucide-react";
import type { AudioAsset } from "@/lib/types";

type MusicStudioProps = {
  selectedMusic: AudioAsset | null;
  musicVolume: number;
  voiceVolume: number;
  ducking: boolean;
  onMusicSelect: (music: AudioAsset | null) => void;
  onMusicVolumeChange: (value: number) => void;
  onVoiceVolumeChange: (value: number) => void;
  onDuckingChange: (value: boolean) => void;
};

export default function MusicStudio({
  selectedMusic,
  musicVolume,
  voiceVolume,
  ducking,
  onMusicSelect,
  onMusicVolumeChange,
  onVoiceVolumeChange,
  onDuckingChange,
}: MusicStudioProps) {
  const [music, setMusic] = useState<AudioAsset[]>([]);
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/audio")
      .then((res) => res.json())
      .then((data) => {
        setMusic((data.audio || []).filter((item: AudioAsset) => item.type === "music"));
      })
      .catch(() => {
        // Fallback
        import("@/data/audio-library").then((mod) => {
          setMusic(mod.audioLibrary.filter((item) => item.type === "music"));
        });
      });
  }, []);

  const togglePreview = (item: AudioAsset) => {
    const audio = document.getElementById(`audio-${item.id}`) as HTMLAudioElement | null;
    if (!audio) return;

    if (playing === item.id) {
      audio.pause();
      setPlaying(null);
      return;
    }

    document.querySelectorAll("audio").forEach((el) => el.pause());
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setPlaying(item.id);
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Music size={16} />
            </div>
            <h3 className="text-sm font-semibold text-white">Background Music</h3>
          </div>
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <ShieldCheck size={12} className="text-emerald-400" />
            Royalty Free
          </span>
        </div>

        <div className="space-y-2">
          {music.map((item) => {
            const isSelected = selectedMusic?.id === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-xl border p-3 transition-all ${
                  isSelected
                    ? "border-purple-500 bg-purple-500/10 shadow-sm"
                    : "border-slate-800 bg-[#121218] hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">{item.name}</p>
                    <p className="text-[10px] text-slate-500">{item.category}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => togglePreview(item)}
                      className="rounded-lg bg-slate-800 p-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                      title="Preview Track"
                    >
                      {playing === item.id ? <Pause size={13} /> : <Play size={13} />}
                    </button>

                    <button
                      type="button"
                      onClick={() => onMusicSelect(isSelected ? null : item)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                        isSelected
                          ? "bg-purple-600 text-white"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                      }`}
                    >
                      {isSelected ? "Selected" : "Use"}
                    </button>
                  </div>
                </div>

                <audio
                  id={`audio-${item.id}`}
                  src={item.url}
                  onEnded={() => setPlaying(null)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 border-t border-slate-800 pt-4">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <Volume2 size={14} className="text-purple-400" />
              Music Volume
            </label>
            <span className="text-xs text-slate-400 font-mono">
              {Math.round(musicVolume * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={musicVolume}
            onChange={(e) => onMusicVolumeChange(Number(e.target.value))}
            className="w-full accent-purple-500 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <VolumeX size={14} className="text-cyan-400" />
              Voice Volume
            </label>
            <span className="text-xs text-slate-400 font-mono">
              {Math.round(voiceVolume * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={voiceVolume}
            onChange={(e) => onVoiceVolumeChange(Number(e.target.value))}
            className="w-full accent-cyan-500 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        <label className="flex cursor-pointer items-center justify-between rounded-xl bg-slate-900/60 border border-slate-800 p-3 hover:border-slate-700 transition-colors">
          <div>
            <p className="text-xs font-semibold text-white">Auto Voice Ducking</p>
            <p className="text-[10px] text-slate-400">
              Automatically lowers music volume during speech
            </p>
          </div>
          <input
            type="checkbox"
            checked={ducking}
            onChange={(e) => onDuckingChange(e.target.checked)}
            className="w-4 h-4 rounded accent-purple-600 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
}
