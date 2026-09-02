"use client";

import React from "react";
import { Download, Sparkles, Video, ArrowLeft } from "lucide-react";
import Link from "next/link";

type TopbarProps = {
  title?: string;
  duration?: number;
  onRender?: () => void;
  isRendering?: boolean;
  backHref?: string;
};

export default function Topbar({
  title = "Untitled Reel",
  duration = 30,
  onRender,
  isRendering = false,
  backHref,
}: TopbarProps) {
  return (
    <header className="h-16 border-b border-slate-800/80 bg-[#0d0d12]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        {backHref && (
          <Link
            href={backHref}
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
        )}
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="font-bold text-white text-base tracking-tight truncate max-w-sm">
              {title}
            </h1>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
              {duration}s Reel
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            9:16 Vertical Video Studio
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={onRender}
          disabled={isRendering}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-all disabled:opacity-50"
        >
          {isRendering ? (
            <>
              <Sparkles size={14} className="animate-spin" />
              <span>Rendering Video...</span>
            </>
          ) : (
            <>
              <Video size={14} />
              <span>Export Video (MP4)</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
