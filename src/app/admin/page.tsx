"use client";

import React, { useEffect, useState } from "react";
import AdminStats from "@/components/admin-stats";
import Link from "next/link";
import { Users, Film, ArrowRight, ShieldCheck, Zap, Activity } from "lucide-react";

export default function AdminDashboardPage() {
  const [recentUsers, setRecentUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then((data) => {
        if (data.recentUsers) setRecentUsers(data.recentUsers);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            NDStudio Master Admin Console
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time analytics, creator activity, rendering pipelines, and credit flow.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full text-emerald-400 text-xs font-semibold">
          <Activity size={14} className="animate-pulse" />
          <span>All Production Services Operational</span>
        </div>
      </div>

      {/* KPI Stats */}
      <AdminStats />

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registered Creators */}
        <div className="rounded-2xl border border-slate-800 bg-[#111116] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users size={16} className="text-purple-400" />
              <span>Recent Creator Signups</span>
            </h3>
            <Link href="/admin/users" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
              <span>View all</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-3">
            {recentUsers.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80"
              >
                <div>
                  <div className="text-xs font-bold text-white">{u.name}</div>
                  <div className="text-[11px] text-slate-500">{u.email}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {u.plan}
                  </span>
                  <div className="text-[10px] text-slate-500 mt-0.5">{u.credits} credits</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Architecture & Template Insights */}
        <div className="rounded-2xl border border-slate-800 bg-[#111116] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap size={16} className="text-cyan-400" />
              <span>Popular Reel Templates</span>
            </h3>
          </div>

          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Bhagavad Gita Wisdom</span>
                <span className="text-purple-400 font-mono">68% usage</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: "68%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Daily Motivation & Discipline</span>
                <span className="text-cyan-400 font-mono">22% usage</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full" style={{ width: "22%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Custom AI Prompts</span>
                <span className="text-amber-400 font-mono">10% usage</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full" style={{ width: "10%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
