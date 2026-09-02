"use client";

import React, { useEffect, useState } from "react";
import { Users, Search, Plus, Shield, Coins, Film, Video } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.users) setUsers(data.users);
      })
      .catch(() => {});
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Users size={22} className="text-purple-400" />
            <span>Creators & Subscriptions</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage creator tiers, allocated AI compute credits, and permissions.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Search creator by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-purple-500 w-64"
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-slate-800 bg-[#111116] overflow-hidden shadow-xl">
        <div className="grid grid-cols-12 px-6 py-3.5 border-b border-slate-800 bg-slate-900/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <span className="col-span-4">Creator / Email</span>
          <span className="col-span-2">Plan</span>
          <span className="col-span-2">Credits Left</span>
          <span className="col-span-2">Projects / Renders</span>
          <span className="col-span-2 text-right">Role</span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {filtered.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-12 px-6 py-4 items-center hover:bg-slate-800/30 transition-colors text-xs"
            >
              <div className="col-span-4 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white">{user.name}</div>
                  <div className="text-slate-500 text-[11px]">{user.email}</div>
                </div>
              </div>

              <div className="col-span-2">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  {user.plan}
                </span>
              </div>

              <div className="col-span-2 font-mono text-slate-200 flex items-center gap-1.5">
                <Coins size={13} className="text-amber-400" />
                <span>{user.creditsRemaining.toLocaleString()}</span>
              </div>

              <div className="col-span-2 text-slate-400">
                <span className="text-white font-semibold">{user.projectsCount}</span> reels •{" "}
                <span className="text-white font-semibold">{user.rendersCount}</span> renders
              </div>

              <div className="col-span-2 text-right">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    user.role === "ADMIN"
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {user.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
