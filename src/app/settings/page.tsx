"use client";

import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import {
  Settings,
  Key,
  HardDrive,
  Sliders,
  CreditCard,
  ShieldCheck,
  Save,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("sk-ndstudio-prod-••••••••••••••••");
  const [storageProvider, setStorageProvider] = useState("Cloudflare R2");
  const [s3Bucket, setS3Bucket] = useState("ndstudio-reels-prod");
  const [renderQuality, setRenderQuality] = useState("1080p (60fps)");
  const [autoSubtitles, setAutoSubtitles] = useState(true);
  const [autoDucking, setAutoDucking] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#09090d] text-white flex">
      <Sidebar />

      <section className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between border-b border-slate-800/80 px-8 py-5 bg-[#0e0e14]/80 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Settings size={20} className="text-purple-400" />
              Production & Studio Settings
            </h1>
            <p className="text-xs text-slate-400">
              Configure cloud storage, API credentials, rendering defaults, and billing.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-purple-600/30 transition-all"
          >
            {saved ? <CheckCircle2 size={16} className="text-emerald-300" /> : <Save size={16} />}
            <span>{saved ? "Saved Successfully" : "Save Changes"}</span>
          </button>
        </header>

        <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
          {/* Subscription & Credit Balance */}
          <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-purple-950/40 p-6 flex flex-wrap items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
                <Sparkles size={26} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-bold text-white">PRO Creator Plan</h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  1,850 / 2,000 monthly credits remaining • Renews Oct 1, 2026
                </p>
              </div>
            </div>

            <button
              type="button"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white border border-white/20 transition-all"
            >
              Add Compute Credits
            </button>
          </div>

          {/* Cloud Storage & R2 Settings */}
          <div className="rounded-2xl border border-slate-800 bg-[#111116] p-6 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <HardDrive size={18} className="text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Cloud Storage & CDN Delivery</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Storage Provider
                </label>
                <select
                  value={storageProvider}
                  onChange={(e) => setStorageProvider(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-[#16161d] px-3.5 py-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500"
                >
                  <option>Cloudflare R2 (Zero Egress)</option>
                  <option>Amazon AWS S3</option>
                  <option>Google Cloud Storage (GCS)</option>
                  <option>Local High-Speed Storage</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Bucket Name
                </label>
                <input
                  type="text"
                  value={s3Bucket}
                  onChange={(e) => setS3Bucket(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-black/40 px-3.5 py-2.5 text-xs text-white outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* API Keys Configuration */}
          <div className="rounded-2xl border border-slate-800 bg-[#111116] p-6 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Key size={18} className="text-amber-400" />
              <h3 className="text-sm font-bold text-white">AI Engine Credentials</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-medium text-slate-400">
                    OpenAI API Key (GPT-4o & DALL-E 3 & TTS)
                  </label>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <ShieldCheck size={12} />
                    Configured via .env.local
                  </span>
                </div>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-black/40 px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Render Defaults */}
          <div className="rounded-2xl border border-slate-800 bg-[#111116] p-6 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Sliders size={18} className="text-purple-400" />
              <h3 className="text-sm font-bold text-white">Default Video Render Specs</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Default Resolution
                </label>
                <select
                  value={renderQuality}
                  onChange={(e) => setRenderQuality(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-[#16161d] px-3.5 py-2.5 text-xs text-slate-200 outline-none focus:border-purple-500"
                >
                  <option>1080p (60fps) — Recommended for Reels</option>
                  <option>4K Ultra HD (60fps)</option>
                  <option>720p (Fast Render)</option>
                </select>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                  <span>Auto-burn Subtitles into Video</span>
                  <input
                    type="checkbox"
                    checked={autoSubtitles}
                    onChange={(e) => setAutoSubtitles(e.target.checked)}
                    className="accent-purple-600 w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                  <span>Enable Auto Voice Ducking (FFmpeg Sidechain)</span>
                  <input
                    type="checkbox"
                    checked={autoDucking}
                    onChange={(e) => setAutoDucking(e.target.checked)}
                    className="accent-purple-600 w-4 h-4 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
