"use client";

import React, { useEffect, useState } from "react";
import { Send, Globe, Video, Radio, Share2, CheckCircle2, AlertTriangle, Clock } from "lucide-react";

export default function AdminPublishingPage() {
  const [publishingStats, setPublishingStats] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/analytics/publishing")
      .then((res) => res.json())
      .then((data) => {
        if (data.publishing) setPublishingStats(data.publishing);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Send size={22} className="text-purple-400" />
          <span>Publishing Operations & Platform Queue</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor real-time social dispatch status across Instagram, YouTube, TikTok, and Facebook.
        </p>
      </div>

      {/* Platform Delivery Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {publishingStats.map((p) => (
          <div
            key={p.platform}
            className="rounded-2xl border border-slate-800 bg-[#111116] p-5 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white">{p.platform}</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 size={13} />
                  Published:
                </span>
                <span className="font-mono text-white font-bold">{p.published}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span className="flex items-center gap-1 text-purple-400">
                  <Clock size={13} />
                  In Queue:
                </span>
                <span className="font-mono text-white font-bold">{p.scheduled}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span className="flex items-center gap-1 text-rose-400">
                  <AlertTriangle size={13} />
                  Failed:
                </span>
                <span className="font-mono text-white font-bold">{p.failed}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
