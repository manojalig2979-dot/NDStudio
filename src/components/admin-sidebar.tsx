"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Users,
  FolderOpen,
  Coins,
  Send,
  Sliders,
  ShieldAlert,
  ArrowLeft,
  Film,
} from "lucide-react";

const links = [
  { name: "Dashboard", href: "/admin", icon: BarChart3 },
  { name: "Users & Plans", href: "/admin/users", icon: Users },
  { name: "Global Projects", href: "/admin/projects", icon: FolderOpen },
  { name: "Credit Analytics", href: "/admin/analytics", icon: Coins },
  { name: "Publishing Ops", href: "/admin/publishing", icon: Send },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-slate-800/80 bg-[#0d0d12] flex flex-col min-h-screen p-5 selection:bg-purple-500 selection:text-white">
      {/* Admin Badge */}
      <div className="mb-8">
        <Link href="/" className="flex items-center space-x-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white">
            <Film size={16} />
          </div>
          <span className="font-bold text-white text-base">NDStudio</span>
        </Link>
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-bold uppercase tracking-wider">
          <ShieldAlert size={11} />
          <span>Admin Console</span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="space-y-1.5 flex-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-sm"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <Icon size={16} className={isActive ? "text-purple-400" : "text-slate-500"} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Exit to Studio */}
      <div className="pt-4 border-t border-slate-800/80">
        <Link
          href="/studio"
          className="flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Return to Studio</span>
        </Link>
      </div>
    </aside>
  );
}
