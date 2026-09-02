"use client";

import React, { useEffect, useState } from "react";
import { Download, Smartphone, X } from "lucide-react";

export default function InstallPwaBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("NDStudio Service Worker registered"))
        .catch((err) => console.log("Service worker registration failed", err));
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-[#161324] border border-purple-500/40 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4 backdrop-blur-md animate-in slide-in-from-bottom-5">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
          <Smartphone size={20} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-white">Install NDStudio App</h4>
          <p className="text-[11px] text-slate-400">
            Install on your phone for fullscreen mode & fast access.
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 shrink-0">
        <button
          type="button"
          onClick={handleInstallClick}
          className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-md transition-all flex items-center gap-1.5"
        >
          <Download size={13} />
          <span>Install</span>
        </button>

        <button
          type="button"
          onClick={() => setShowBanner(false)}
          className="p-1.5 text-slate-400 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
