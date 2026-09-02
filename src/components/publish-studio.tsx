"use client";

import React, { useState } from "react";
import { Calendar, Check, Send, Sparkles, Globe, Video, Radio, Share2 } from "lucide-react";
import type { SocialPlatform } from "@/lib/types";

type PublishStudioProps = {
  projectId: string;
  videoUrl: string;
  projectTitle: string;
};

const platforms: {
  id: SocialPlatform;
  name: string;
  icon: any;
}[] = [
  { id: "INSTAGRAM", name: "Instagram Reels", icon: Globe },
  { id: "YOUTUBE", name: "YouTube Shorts", icon: Video },
  { id: "TIKTOK", name: "TikTok", icon: Radio },
  { id: "FACEBOOK", name: "Facebook Reels", icon: Share2 },
];

export default function PublishStudio({
  projectId,
  videoUrl,
  projectTitle,
}: PublishStudioProps) {
  const [selected, setSelected] = useState<SocialPlatform[]>(["INSTAGRAM", "YOUTUBE"]);
  const [caption, setCaption] = useState<string>(
    "One Shloka. One Story. One Life Lesson. 🕉️✨ #BhagavadGita #NDStudio #Wisdom"
  );
  const [hashtags, setHashtags] = useState<string>(
    "#BhagavadGita #Krishna #GitaWisdom #DailyMotivation #Reels"
  );
  const [scheduleDate, setScheduleDate] = useState<string>("");
  const [publishing, setPublishing] = useState<boolean>(false);
  const [publishedSuccess, setPublishedSuccess] = useState<boolean>(false);

  const togglePlatform = (platform: SocialPlatform) => {
    setSelected((current) =>
      current.includes(platform)
        ? current.filter((item) => item !== platform)
        : [...current, platform]
    );
  };

  const handlePublish = async () => {
    if (!selected.length) return;
    setPublishing(true);
    setPublishedSuccess(false);

    // Simulate multi-platform publishing
    setTimeout(() => {
      setPublishing(false);
      setPublishedSuccess(true);
    }, 1500);
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
            <Send size={16} />
          </div>
          <h2 className="text-base font-bold text-white">
            Publish Reel across Social Channels
          </h2>
        </div>
        <p className="text-xs text-slate-400">
          Distribute your 9:16 vertical render directly to Instagram, Shorts, and TikTok.
        </p>
      </div>

      {/* Target Platforms */}
      <div>
        <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
          Select Target Channels
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {platforms.map((p) => {
            const Icon = p.icon;
            const active = selected.includes(p.id);

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => togglePlatform(p.id)}
                className={`rounded-2xl border p-3.5 text-left transition-all flex items-center justify-between ${
                  active
                    ? "border-purple-500 bg-purple-500/10 shadow-sm ring-1 ring-purple-500/30"
                    : "border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-400"
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon size={16} className={active ? "text-purple-400" : "text-slate-500"} />
                  <span className="text-xs font-bold text-white">{p.name}</span>
                </div>
                {active && <Check size={14} className="text-purple-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Caption & Description */}
      <div>
        <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
          Reel Caption & Hook
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-xl border border-slate-800 bg-black/40 p-3 text-xs text-white outline-none focus:border-purple-500"
        />
      </div>

      {/* Hashtags */}
      <div>
        <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
          Tags & Hashtags
        </label>
        <input
          type="text"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          className="w-full rounded-xl border border-slate-800 bg-black/40 px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
        />
      </div>

      {/* Schedule */}
      <div>
        <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1.5">
          <Calendar size={13} className="text-purple-400" />
          Schedule (Optional)
        </label>
        <input
          type="datetime-local"
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)}
          className="w-full rounded-xl border border-slate-800 bg-black/40 px-3 py-2 text-xs text-slate-200 outline-none focus:border-purple-500"
        />
      </div>

      {publishedSuccess && (
        <div className="rounded-xl bg-emerald-950/80 border border-emerald-500/30 p-3 text-xs text-emerald-300 flex items-center gap-2">
          <Check size={15} className="text-emerald-400" />
          <span>
            {scheduleDate ? "Reel scheduled successfully for publishing!" : "Reel broadcast dispatched successfully to connected platforms!"}
          </span>
        </div>
      )}

      {/* Action Button */}
      <button
        type="button"
        onClick={handlePublish}
        disabled={publishing || selected.length === 0}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 py-3.5 text-xs font-bold text-white shadow-lg shadow-purple-600/25 transition-all disabled:opacity-50"
      >
        <Send size={14} />
        <span>
          {publishing
            ? "Broadcasting to Platforms..."
            : scheduleDate
            ? "Schedule Automated Publishing"
            : `Publish to ${selected.length} Channels Now`}
        </span>
      </button>
    </div>
  );
}
