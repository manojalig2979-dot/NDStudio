"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import SceneCard from "@/components/scene-card";
import StudioPreview from "@/components/studio-preview";
import Timeline from "@/components/timeline";
import MusicStudio from "@/components/music-studio";
import SFXStudio from "@/components/sfx-studio";
import PublishStudio from "@/components/publish-studio";
import { reelTemplates } from "@/data/templates";
import { audioLibrary } from "@/data/audio-library";
import type { Scene, AudioAsset, ReelTemplate } from "@/lib/types";
import {
  Sparkles,
  Plus,
  Wand2,
  Music,
  Sliders,
  Type,
  Video,
  FileText,
  Volume2,
  CheckCircle2,
  Mic,
  Image as ImageIcon,
  Download,
  Share2,
  Send,
  Loader2,
} from "lucide-react";

export default function StudioPage() {
  const [template, setTemplate] = useState<ReelTemplate>(reelTemplates[0]);
  const [projectTitle, setProjectTitle] = useState<string>("Bhagavad Gita 2.11 Wisdom");
  const [topicPrompt, setTopicPrompt] = useState<string>("Bhagavad Gita Chapter 2, Shloka 11");
  const [language, setLanguage] = useState<string>("Hindi");
  const [contentType, setContentType] = useState<string>("Spiritual");
  const [visualStyle, setVisualStyle] = useState<string>("Epic Indian");
  const [voiceStyle, setVoiceStyle] = useState<string>("Male — Deep");

  const [scenes, setScenes] = useState<Scene[]>(() =>
    reelTemplates[0].scenes.map((s, idx) => ({ ...s, id: `scene-${idx + 1}` }))
  );

  const [activeScene, setActiveScene] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"script" | "audio" | "captions" | "ai-tools">("script");

  // Audio configuration
  const [selectedMusic, setSelectedMusic] = useState<AudioAsset | null>(() =>
    audioLibrary.find((item) => item.category === "Spiritual") || null
  );
  const [musicVolume, setMusicVolume] = useState<number>(0.22);
  const [voiceVolume, setVoiceVolume] = useState<number>(1);
  const [musicDucking, setMusicDucking] = useState<boolean>(true);

  // Generation & Render states
  const [isGeneratingScript, setIsGeneratingScript] = useState<boolean>(false);
  const [isGeneratingVoice, setIsGeneratingVoice] = useState<boolean>(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [renderedVideo, setRenderedVideo] = useState<string | null>(null);
  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);

  const totalDuration = scenes.reduce((acc, s) => acc + s.duration, 0);

  // Read draft data from home page if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const draftStr = sessionStorage.getItem("ndstudio_draft");
      if (draftStr) {
        try {
          const draft = JSON.parse(draftStr);
          if (draft.topic) setTopicPrompt(draft.topic);
          if (draft.language) setLanguage(draft.language);
          if (draft.contentType) setContentType(draft.contentType);
          if (draft.visualStyle) setVisualStyle(draft.visualStyle);
          if (draft.voiceStyle) setVoiceStyle(draft.voiceStyle);

          if (draft.templateId) {
            const found = reelTemplates.find((t) => t.id === draft.templateId);
            if (found) {
              setTemplate(found);
              setProjectTitle(found.name);
              setScenes(found.scenes.map((s, idx) => ({ ...s, id: `scene-${idx + 1}` })));
            }
          }
        } catch (e) {}
      }
    }
  }, []);

  const handleUpdateScene = (updates: Partial<Scene>) => {
    setScenes((current) =>
      current.map((scene, idx) => (idx === activeScene ? { ...scene, ...updates } : scene))
    );
  };

  const handleAddScene = () => {
    const newScene: Scene = {
      id: `scene-${Date.now()}`,
      order: scenes.length + 1,
      title: `Scene ${scenes.length + 1}`,
      type: "content",
      duration: 6,
      prompt: `Cinematic ${visualStyle} sequence for ${projectTitle}`,
      text: "Enter your scene dialogue or voiceover here...",
      narration: "Enter narration speech here...",
      onScreenText: "Captions text",
      captionEnabled: true,
      captionPosition: "bottom",
    };
    setScenes([...scenes, newScene]);
    setActiveScene(scenes.length);
  };

  const handleDeleteScene = (index: number) => {
    if (scenes.length <= 1) return;
    const updated = scenes.filter((_, idx) => idx !== index);
    setScenes(updated);
    setActiveScene(Math.max(0, index - 1));
  };

  // 1. AI Script Generation
  const handleAIGenerateScript = async () => {
    setIsGeneratingScript(true);
    try {
      const res = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topicPrompt,
          duration: totalDuration || 30,
          language,
          contentType,
          visualStyle,
          voiceStyle,
        }),
      });
      const data = await res.json();
      if (data.success && data.scenes) {
        setScenes(data.scenes);
        setActiveScene(0);
        setCurrentTime(0);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingScript(false);
    }
  };

  // 2. AI Voice Generation
  const handleAIGenerateVoice = async () => {
    setIsGeneratingVoice(true);
    try {
      const activeText = scenes[activeScene]?.narration || scenes[activeScene]?.text;
      const res = await fetch("/api/generate-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: activeText,
          voice: voiceStyle,
        }),
      });
      const data = await res.json();
      if (data.audioUrl) {
        handleUpdateScene({ audioUrl: data.audioUrl });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingVoice(false);
    }
  };

  // 3. AI Image Generation
  const handleAIGenerateImage = async () => {
    setIsGeneratingImage(true);
    try {
      const activePrompt = scenes[activeScene]?.prompt || topicPrompt;
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: activePrompt,
          style: visualStyle,
        }),
      });
      const data = await res.json();
      if (data.imageUrl) {
        handleUpdateScene({ imageUrl: data.imageUrl });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // 4. Video Render
  const handleRender = async () => {
    setIsRendering(true);
    setRenderedVideo(null);
    try {
      const res = await fetch("/api/render-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: projectTitle,
          scenes,
          musicUrl: selectedMusic?.url,
          musicVolume,
          voiceVolume,
          ducking: musicDucking,
          totalDuration,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setRenderedVideo(data.videoUrl || "/sample-render.mp4");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRendering(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090d] text-white flex">
      <Sidebar />

      <section className="flex-1 flex flex-col min-w-0">
        <Topbar
          title={projectTitle}
          duration={totalDuration}
          onRender={handleRender}
          isRendering={isRendering}
          backHref="/"
        />

        {/* Render Success Banner */}
        {renderedVideo && (
          <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-purple-950 border-b border-purple-500/30 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs">
              <CheckCircle2 size={18} className="text-emerald-400" />
              <span>
                <strong className="text-white">Render Successful!</strong> 1080×1920 MP4 ready with multi-track audio mix & subtitles.
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setShowPublishModal(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Send size={13} />
                <span>Publish to Social</span>
              </button>
              <button
                type="button"
                onClick={() => setRenderedVideo(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Studio 3-Column Workspace */}
        <div className="flex-1 grid grid-cols-12 gap-5 p-6 min-h-0 overflow-y-auto">
          {/* LEFT COLUMN: Script, AI Tools, Audio & Captions */}
          <div className="col-span-12 lg:col-span-4 flex flex-col space-y-4">
            {/* Tabs Header */}
            <div className="flex rounded-xl bg-slate-900/80 p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab("script")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "script"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <FileText size={13} />
                <span>Script</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("ai-tools")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "ai-tools"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Sparkles size={13} className="text-cyan-400" />
                <span>AI Engine</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("audio")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "audio"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Music size={13} />
                <span>Audio</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("captions")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "captions"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Type size={13} />
                <span>Captions</span>
              </button>
            </div>

            {/* TAB CONTENT: Script Editor */}
            {activeTab === "script" && (
              <div className="rounded-2xl border border-slate-800 bg-[#111117] p-5 space-y-4 flex-1">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                    Scene {activeScene + 1} Editor
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {scenes[activeScene]?.type}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {scenes[activeScene]?.duration}s
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Scene Title
                  </label>
                  <input
                    type="text"
                    value={scenes[activeScene]?.title || ""}
                    onChange={(e) => handleUpdateScene({ title: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-black/40 px-3 py-2 text-xs text-white outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-400">
                      Voiceover & Narration Script
                    </label>
                    <button
                      type="button"
                      onClick={handleAIGenerateVoice}
                      disabled={isGeneratingVoice}
                      className="text-[10px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      {isGeneratingVoice ? <Loader2 size={11} className="animate-spin" /> : <Mic size={11} />}
                      <span>Generate Voice</span>
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={scenes[activeScene]?.narration || scenes[activeScene]?.text || ""}
                    onChange={(e) =>
                      handleUpdateScene({ narration: e.target.value, text: e.target.value })
                    }
                    className="w-full resize-none rounded-xl border border-slate-800 bg-black/40 p-3 text-xs text-white outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-400">
                      AI Visual Prompt
                    </label>
                    <button
                      type="button"
                      onClick={handleAIGenerateImage}
                      disabled={isGeneratingImage}
                      className="text-[10px] font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                    >
                      {isGeneratingImage ? <Loader2 size={11} className="animate-spin" /> : <ImageIcon size={11} />}
                      <span>Generate Visual</span>
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={scenes[activeScene]?.prompt || ""}
                    onChange={(e) => handleUpdateScene({ prompt: e.target.value })}
                    className="w-full resize-none rounded-xl border border-slate-800 bg-black/40 p-3 text-xs text-slate-300 outline-none focus:border-purple-500 font-mono"
                  />
                </div>

                <div className="pt-2">
                  <SFXStudio
                    sfx={scenes[activeScene]?.sfx ?? []}
                    onChange={(newSfx) => handleUpdateScene({ sfx: newSfx })}
                  />
                </div>
              </div>
            )}

            {/* TAB CONTENT: AI Engine */}
            {activeTab === "ai-tools" && (
              <div className="rounded-2xl border border-slate-800 bg-[#111117] p-5 space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">AI Reel Script Generator</h3>
                    <p className="text-[10px] text-slate-400">Powered by OpenAI / ND Engine</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Topic / Concept Prompt
                  </label>
                  <textarea
                    rows={3}
                    value={topicPrompt}
                    onChange={(e) => setTopicPrompt(e.target.value)}
                    className="w-full resize-none rounded-xl border border-slate-800 bg-black/40 p-3 text-xs text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-[#16161d] px-3 py-2 text-xs text-white"
                    >
                      <option>Hindi</option>
                      <option>English</option>
                      <option>Sanskrit</option>
                      <option>Hinglish</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Visual Style
                    </label>
                    <select
                      value={visualStyle}
                      onChange={(e) => setVisualStyle(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-[#16161d] px-3 py-2 text-xs text-white"
                    >
                      <option>Epic Indian</option>
                      <option>Cinematic</option>
                      <option>Traditional Painting</option>
                      <option>Anime</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAIGenerateScript}
                  disabled={isGeneratingScript}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 py-3 text-xs font-bold text-white shadow-lg transition-all disabled:opacity-50"
                >
                  {isGeneratingScript ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>Generating Storyboard...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 size={15} />
                      <span>Re-Generate Full Storyboard</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* TAB CONTENT: Audio Studio */}
            {activeTab === "audio" && (
              <div className="rounded-2xl border border-slate-800 bg-[#111117] p-5">
                <MusicStudio
                  selectedMusic={selectedMusic}
                  musicVolume={musicVolume}
                  voiceVolume={voiceVolume}
                  ducking={musicDucking}
                  onMusicSelect={setSelectedMusic}
                  onMusicVolumeChange={setMusicVolume}
                  onVoiceVolumeChange={setVoiceVolume}
                  onDuckingChange={setMusicDucking}
                />
              </div>
            )}

            {/* TAB CONTENT: Captions */}
            {activeTab === "captions" && (
              <div className="rounded-2xl border border-slate-800 bg-[#111117] p-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Caption & Subtitle Styling
                </h3>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    On-Screen Headline Text
                  </label>
                  <input
                    type="text"
                    value={scenes[activeScene]?.onScreenText || ""}
                    onChange={(e) => handleUpdateScene({ onScreenText: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-black/40 px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Position
                    </label>
                    <select
                      value={scenes[activeScene]?.captionPosition || "bottom"}
                      onChange={(e) =>
                        handleUpdateScene({
                          captionPosition: e.target.value as "top" | "center" | "bottom",
                        })
                      }
                      className="w-full rounded-xl border border-slate-800 bg-[#16161d] px-3 py-2 text-xs text-white"
                    >
                      <option value="top">Top</option>
                      <option value="center">Center</option>
                      <option value="bottom">Bottom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Animation
                    </label>
                    <select
                      value={scenes[activeScene]?.captionAnimation || "fade"}
                      onChange={(e) =>
                        handleUpdateScene({
                          captionAnimation: e.target.value as "fade" | "pop" | "slide" | "highlight",
                        })
                      }
                      className="w-full rounded-xl border border-slate-800 bg-[#16161d] px-3 py-2 text-xs text-white"
                    >
                      <option value="fade">Fade In</option>
                      <option value="pop">Pop / Bounce</option>
                      <option value="slide">Slide Up</option>
                      <option value="highlight">Karaoke Highlight</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CENTER COLUMN: 9:16 Video Preview Simulator */}
          <div className="col-span-12 lg:col-span-4 flex flex-col items-center justify-start space-y-4">
            <div className="w-full flex items-center justify-between px-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Vertical 9:16 Video Player
              </span>
              <span className="text-xs text-purple-400 font-semibold">
                Turbopack Ready
              </span>
            </div>

            <StudioPreview
              scenes={scenes}
              activeSceneIndex={activeScene}
              currentTime={currentTime}
              totalDuration={totalDuration}
              isPlaying={isPlaying}
              onPlayToggle={() => setIsPlaying(!isPlaying)}
              onSeek={(t) => setCurrentTime(t)}
              selectedMusic={selectedMusic}
              musicVolume={musicVolume}
              voiceVolume={voiceVolume}
              ducking={musicDucking}
            />
          </div>

          {/* RIGHT COLUMN: Scene Storyboard */}
          <div className="col-span-12 lg:col-span-4 flex flex-col space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Scene Storyboard
                </span>
                <span className="text-xs text-slate-400">({scenes.length} scenes)</span>
              </div>

              <button
                type="button"
                onClick={handleAddScene}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-all"
              >
                <Plus size={13} />
                <span>Add Scene</span>
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[580px] pr-1">
              {scenes.map((scene, idx) => (
                <SceneCard
                  key={scene.id || idx}
                  scene={scene}
                  isActive={activeScene === idx}
                  onSelect={() => {
                    setActiveScene(idx);
                    let offset = 0;
                    for (let i = 0; i < idx; i++) offset += scenes[i].duration;
                    setCurrentTime(offset);
                  }}
                  onDelete={() => handleDeleteScene(idx)}
                />
              ))}
            </div>
          </div>

          {/* BOTTOM FULL-WIDTH: Timeline Track Editor */}
          <div className="col-span-12 pt-2">
            <Timeline
              scenes={scenes}
              activeScene={activeScene}
              currentTime={currentTime}
              totalDuration={totalDuration}
              onSelectScene={(idx) => {
                setActiveScene(idx);
                let offset = 0;
                for (let i = 0; i < idx; i++) offset += scenes[i].duration;
                setCurrentTime(offset);
              }}
              onSeek={(t) => setCurrentTime(t)}
              musicName={selectedMusic?.name}
            />
          </div>
        </div>

        {/* Social Publish Modal Overlay */}
        {showPublishModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#111116] border border-slate-800 rounded-3xl p-7 max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
              <button
                onClick={() => setShowPublishModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>

              <PublishStudio
                projectId="current-project"
                videoUrl={renderedVideo || "/sample-reel.mp4"}
                projectTitle={projectTitle}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
