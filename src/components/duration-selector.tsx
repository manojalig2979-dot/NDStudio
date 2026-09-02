"use client";

import React from "react";
import { Clock } from "lucide-react";

type DurationSelectorProps = {
  selectedDuration: number;
  onChange: (duration: number) => void;
};

const durations = [
  { label: "10 sec", value: 10, desc: "Quick Hook / Teaser" },
  { label: "30 sec", value: 30, desc: "Optimal Viral Length" },
  { label: "60 sec", value: 60, desc: "Deep Dive / Story" },
];

export default function DurationSelector({
  selectedDuration,
  onChange,
}: DurationSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Clock size={13} className="text-purple-400" />
          Reel Duration
        </label>
        <span className="text-xs text-purple-400 font-medium">
          {selectedDuration} seconds target
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {durations.map((item) => {
          const isSelected = selectedDuration === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onChange(item.value)}
              className={`rounded-xl border p-3.5 text-left transition-all relative overflow-hidden ${
                isSelected
                  ? "border-purple-500 bg-purple-500/10 text-white shadow-md shadow-purple-500/10 ring-1 ring-purple-500/30"
                  : "border-slate-800 bg-[#121218] text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-2 h-2 rounded-bl-lg bg-purple-500" />
              )}
              <div className="text-sm font-bold text-white mb-0.5">
                {item.label}
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                {item.desc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
