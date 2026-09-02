"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Wand2, BookOpen } from "lucide-react";
import DurationSelector from "@/components/duration-selector";
import { reelTemplates } from "@/data/templates";
import type { ReelTemplate } from "@/lib/types";

type ProjectFormProps = {
  duration: number;
  onDurationChange: (duration: number) => void;
  topic: string;
  onTopicChange: (topic: string) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  contentType: string;
  onContentTypeChange: (type: string) => void;
  visualStyle: string;
  onVisualStyleChange: (style: string) => void;
  voiceStyle: string;
  onVoiceStyleChange: (voice: string) => void;
  onGenerate: () => void;
  onSelectTemplate: (template: ReelTemplate) => void;
};

export default function ProjectForm({
  duration,
  onDurationChange,
  topic,
  onTopicChange,
  language,
  onLanguageChange,
  contentType,
  onContentTypeChange,
  visualStyle,
  onVisualStyleChange,
  voiceStyle,
  onVoiceStyleChange,
  onGenerate,
  onSelectTemplate,
}: ProjectFormProps) {
  return (
    <div className="rounded-3xl border border-slate-800/90 bg-[#111116] p-7 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-sm">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              AI Reel Studio Generator
            </h2>
            <p className="text-xs text-slate-400">
              Describe your idea or pick a fast-start template
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {reelTemplates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelectTemplate(template)}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 hover:text-white border border-slate-700 transition-colors"
            >
              {template.name.split(" ")[0]} Preset
            </button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <DurationSelector selectedDuration={duration} onChange={onDurationChange} />

      {/* Topic Prompt */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          What do you want to create?
        </label>
        <textarea
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          placeholder="Example: Create a cinematic Reel explaining Bhagavad Gita Chapter 2, Shloka 11..."
          rows={4}
          className="w-full resize-none rounded-2xl border border-slate-800 bg-[#0a0a0e] p-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all font-sans"
        />
      </div>

      {/* Dropdown Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-[#16161d] px-3.5 py-2.5 text-xs text-slate-200 outline-none focus:border-purple-500"
          >
            <option>Hindi</option>
            <option>English</option>
            <option>Sanskrit</option>
            <option>Hinglish</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Content Type
          </label>
          <select
            value={contentType}
            onChange={(e) => onContentTypeChange(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-[#16161d] px-3.5 py-2.5 text-xs text-slate-200 outline-none focus:border-purple-500"
          >
            <option>Spiritual</option>
            <option>Motivational</option>
            <option>Educational</option>
            <option>Story</option>
            <option>Mythological</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Visual Style
          </label>
          <select
            value={visualStyle}
            onChange={(e) => onVisualStyleChange(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-[#16161d] px-3.5 py-2.5 text-xs text-slate-200 outline-none focus:border-purple-500"
          >
            <option>Cinematic</option>
            <option>Epic Indian</option>
            <option>Traditional Painting</option>
            <option>Hyper-Realistic</option>
            <option>Anime</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Voice
          </label>
          <select
            value={voiceStyle}
            onChange={(e) => onVoiceStyleChange(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-[#16161d] px-3.5 py-2.5 text-xs text-slate-200 outline-none focus:border-purple-500"
          >
            <option>Male — Deep</option>
            <option>Male — Calm</option>
            <option>Female — Warm</option>
            <option>Female — Calm</option>
          </select>
        </div>
      </div>

      {/* Generate Button */}
      <button
        type="button"
        onClick={onGenerate}
        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 py-4 font-bold text-sm text-white shadow-xl shadow-purple-600/25 transition-all transform hover:-translate-y-0.5"
      >
        <Wand2 size={18} />
        <span>Generate Reel Storyboard in Studio</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
