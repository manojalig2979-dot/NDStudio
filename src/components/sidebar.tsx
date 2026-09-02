"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Film,
  FolderOpen,
  Music,
  Image as ImageIcon,
  Settings,
  Send,
  Sparkles,
  LayoutTemplate,
  Shield,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const mainLinks = [
    { name: "Create Reel", href: "/", icon: Sparkles },
    { name: "Studio", href: "/studio", icon: Film },
    { name: "Projects", href: "/projects", icon: FolderOpen },
    { name: "Publishing", href: "/publish", icon: Send },
  ];

  const studioLinks = [
    { name: "Audio Studio", href: "/studio?tab=audio", icon: Music },
    { name: "Visual Studio", href: "/studio?tab=visuals", icon: ImageIcon },
    { name: "Templates", href: "/studio?tab=templates", icon: LayoutTemplate },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-slate-800/80 bg-[#0d0d12] flex flex-col min-h-screen p-5 selection:bg-purple-500 selection:text-white">
      {/* Brand */}
      <div className="mb-8">
        <Link href="/" className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-600/30">
            <Film className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <div className="text-xl font-bold tracking-tight text-white flex items-center">
              ND<span className="text-purple-400">Studio</span>
            </div>
            <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
              AI Reel Creator
            </div>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="space-y-6 flex-1">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 px-3 mb-2">
            Main Menu
          </div>
          <nav className="space-y-1">
            {mainLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-purple-600/15 text-purple-300 border border-purple-500/30 shadow-sm"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                  }`}
                >
                  <Icon size={17} className={isActive ? "text-purple-400" : "text-slate-400"} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 px-3 mb-2">
            Creation Suite
          </div>
          <nav className="space-y-1">
            {studioLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800/50 hover:text-white transition-all"
                >
                  <Icon size={17} className="text-slate-400" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom section */}
      <div className="pt-6 border-t border-slate-800/60 space-y-1">
        <Link
          href="/admin"
          className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800/50 hover:text-white transition-all"
        >
          <Shield size={16} />
          <span>Admin Console</span>
        </Link>
        <button className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800/50 hover:text-white transition-all">
          <Settings size={16} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
