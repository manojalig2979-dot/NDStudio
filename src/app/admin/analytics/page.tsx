"use client";

import React, { useEffect, useState } from "react";
import { BarChart3, Coins, TrendingUp, Calendar, Zap } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [usage, setUsage] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/analytics/usage")
      .then((res) => res.json())
      .then((data) => {
        if (data.usage) setUsage(data.usage);
      })
      .catch(() => {});
  }, []);

  const maxCredits = Math.max(...usage.map((u) => u.credits), 1);

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <BarChart3 size={22} className="text-purple-400" />
          <span>Credit & Compute Consumption Analytics</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Track daily AI generation volume, render spikes, and GPU resource load.
        </p>
      </div>

      {/* Usage Chart Card */}
      <div className="rounded-2xl border border-slate-800 bg-[#111116] p-6 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Coins size={16} className="text-purple-400" />
            <h3 className="text-sm font-bold text-white">Daily AI Credit Consumption</h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Last 9 Days</span>
        </div>

        {/* Bar Chart Visualizer */}
        <div className="h-64 flex items-end gap-3 pt-8 pb-4 border-b border-slate-800/80">
          {usage.map((item) => {
            const heightPercent = Math.round((item.credits / maxCredits) * 100);

            return (
              <div key={item.date} className="flex-1 flex flex-col items-center justify-end h-full group">
                <div className="text-[10px] font-mono text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                  {item.credits.toLocaleString()}
                </div>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-purple-700 via-indigo-600 to-cyan-400 group-hover:brightness-125 transition-all shadow-md"
                />
                <span className="text-[10px] text-slate-500 mt-2 font-mono truncate w-full text-center">
                  {item.date.slice(5)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2 text-center">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs text-slate-400">Peak Daily Compute</div>
            <div className="text-lg font-black text-white font-mono mt-1">7,850 Credits</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs text-slate-400">Average Per Video</div>
            <div className="text-lg font-black text-cyan-400 font-mono mt-1">20 Credits</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs text-slate-400">Conversion Efficiency</div>
            <div className="text-lg font-black text-emerald-400 font-mono mt-1">99.4%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
