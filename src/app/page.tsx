"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import ProjectForm from "@/components/project-form";
import StudioPreview from "@/components/studio-preview";
import { reelTemplates } from "@/data/templates";
import type { ReelTemplate } from "@/lib/types";
import { Plus, Sparkles, Wand2 } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<ReelTemplate>(reelTemplates[0]);
  const [duration, setDuration] = useState<number>(30);
  const [topic, setTopic] = useState<string>(
    "Create a cinematic Reel explaining Bhagavad Gita Chapter 2, Shloka 11..."
  );
  const [language, setLanguage] = useState<string>("Hindi");
  const [contentType, setContentType] = useState<string>("Spiritual");
  const [visualStyle, setVisualStyle] = useState<string>("Epic Indian");
  const [voiceStyle, setVoiceStyle] = useState<string>("Male — Deep");

  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const scenes = selectedTemplate.scenes.map((s, idx) => ({
    ...s,
    id: `scene-${idx + 1}`,
  }));

  const handleSelectTemplate = (template: ReelTemplate) => {
    setSelectedTemplate(template);
    setTopic(template.samplePrompt);
    setLanguage(template.language);
    setContentType(template.contentType);
    setVisualStyle(template.visualStyle);
    setVoiceStyle(template.voice);
    setActiveSceneIndex(0);
    setCurrentTime(0);
  };

  const handleGenerate = () => {
    // Store generation options in sessionStorage or state and navigate to /studio
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "ndstudio_draft",
        JSON.stringify({
          topic,
          duration,
          language,
          contentType,
          visualStyle,
          voiceStyle,
          templateId: selectedTemplate.id,
        })
      );
    }
    router.push("/studio");
  };

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white flex">
      <Sidebar />

      <section className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="flex items-center justify-between border-b border-slate-800/80 px-8 py-4 bg-[#0e0e14]/80 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Create your Reel
            </h1>
            <p className="text-xs text-slate-400">
              Turn an idea into a cinematic short video.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            className="flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-purple-600/30 transition-all"
          >
            <Plus size={16} />
            <span>Launch Studio</span>
          </button>
        </header>

        {/* Content Body */}
        <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto w-full">
          {/* Creation Form */}
          <div className="lg:col-span-2">
            <ProjectForm
              duration={duration}
              onDurationChange={setDuration}
              topic={topic}
              onTopicChange={setTopic}
              language={language}
              onLanguageChange={setLanguage}
              contentType={contentType}
              onContentTypeChange={setContentType}
              visualStyle={visualStyle}
              onVisualStyleChange={setVisualStyle}
              voiceStyle={voiceStyle}
              onVoiceStyleChange={setVoiceStyle}
              onGenerate={handleGenerate}
              onSelectTemplate={handleSelectTemplate}
            />
          </div>

          {/* 9:16 Live Preview */}
          <div className="sticky top-24 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 text-center">
              Live Mockup Preview
            </div>

            <StudioPreview
              scenes={scenes}
              activeSceneIndex={activeSceneIndex}
              currentTime={currentTime}
              totalDuration={duration}
              isPlaying={isPlaying}
              onPlayToggle={() => setIsPlaying(!isPlaying)}
              onSeek={(t) => setCurrentTime(t)}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
