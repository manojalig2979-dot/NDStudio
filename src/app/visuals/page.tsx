"use client";

import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import { Image as ImageIcon, Sparkles, Plus, Search, Filter, Download, ExternalLink } from "lucide-react";

export default function VisualsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", "Spiritual & Divine", "Cinematic Battle", "Temple & Sanctum", "Nature & Mountain", "Futuristic"];

  const assets = [
    {
      id: "v-1",
      title: "Lord Krishna with Golden Chariot",
      category: "Spiritual & Divine",
      style: "Epic Indian",
      url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1080&auto=format&fit=crop",
      prompt: "Lord Krishna holding chariot reins at dawn, golden volumetric rays, 8k resolution",
    },
    {
      id: "v-2",
      title: "Kurukshetra Battlefield Mist",
      category: "Cinematic Battle",
      style: "Cinematic",
      url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1080&auto=format&fit=crop",
      prompt: "Atmospheric battlefield shrouded in morning mist, silhouette warrior, 9:16 vertical",
    },
    {
      id: "v-3",
      title: "Sacred Sanskrit Manuscript & Oil Lamps",
      category: "Temple & Sanctum",
      style: "Traditional Painting",
      url: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1080&auto=format&fit=crop",
      prompt: "Glowing ancient temple altar with flickering diyas and sacred Sanskrit scripture",
    },
    {
      id: "v-4",
      title: "Mountain Summit at Sunrise",
      category: "Nature & Mountain",
      style: "Cinematic",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1080&auto=format&fit=crop",
      prompt: "Majestic Himalayan mountain peak bathed in golden sunrise clouds, peaceful wisdom",
    },
  ];

  const filtered = assets.filter((a) => {
    const matchesCat = activeCategory === "All" || a.category === activeCategory;
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.prompt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#09090d] text-white flex">
      <Sidebar />

      <section className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between border-b border-slate-800/80 px-8 py-5 bg-[#0e0e14]/80 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <ImageIcon size={20} className="text-purple-400" />
              AI Visuals & Asset Vault
            </h1>
            <p className="text-xs text-slate-400">
              Browse 9:16 vertical AI artwork, cinematic backgrounds, and custom media.
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-purple-600/30 transition-all"
          >
            <Sparkles size={15} />
            <span>Generate New 9:16 Art</span>
          </button>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Search & Category Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveCategory(c)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeCategory === c
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search size={14} className="absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search art by style or prompt..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-purple-500 w-64"
              />
            </div>
          </div>

          {/* 9:16 Artwork Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-800 bg-[#111116] overflow-hidden group hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[9/16] bg-slate-950 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <span className="absolute top-3 left-3 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-500/30">
                    {item.style}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-xs text-white group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {item.prompt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
