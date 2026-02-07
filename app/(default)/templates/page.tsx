"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

const API_URL = "https://api.livinit.ai/api/v1/templates/livinit";

export type LivinitTemplate = {
  id: number;
  model_id: string;
  style: string;
  size_room: string;
  no_of_assets: number;
  total_cost: string;
  image_url: string;
  model_usdz: string;
  model_glb: string;
  created_at: string;
};

function formatTitle(style: string, sizeRoom: string): string {
  const s = style.charAt(0).toUpperCase() + style.slice(1).toLowerCase();
  const r = sizeRoom.charAt(0).toUpperCase() + sizeRoom.slice(1).toLowerCase();
  return `${s} · ${r}`;
}

const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ShoppingCartIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

function TemplateCard({ template, onSelect }: { template: LivinitTemplate; onSelect: (t: LivinitTemplate) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const name = formatTitle(template.style, template.size_room);

  return (
    <div
      className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gray-900 transition-all hover:border-indigo-500/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={template.image_url}
          alt={name}
          className={`h-full w-full object-cover transition-all duration-700 ${isHovered ? "scale-110 blur-sm brightness-50" : ""}`}
        />
        <div
          className={`absolute inset-0 flex pointer-events-none items-center justify-center transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <div className="relative z-10 flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <EyeIcon className="text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">View Spatial Plan</span>
          </div>
        </div>
        <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
          {template.style}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <span className="font-bold text-indigo-400">{template.total_cost}</span>
        </div>
        <p className="mb-6 text-sm text-gray-500">
          {template.size_room} • {template.no_of_assets} Products
        </p>
        <Link
          href={`/templates/${template.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-bold text-white transition-all hover:border-indigo-500 hover:bg-indigo-500"
        >
          Buy the Look <ShoppingCartIcon />
        </Link>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<LivinitTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roomFilter, setRoomFilter] = useState<string>("All");
  const [styleFilter, setStyleFilter] = useState<string>("All");

  useEffect(() => {
    let cancelled = false;
    async function fetchTemplates() {
      try {
        const res = await fetch(`${API_URL}?limit=100`, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`Failed to load templates (${res.status})`);
        const data = (await res.json()) as { templates: LivinitTemplate[] };
        if (!cancelled && data.templates?.length) setTemplates(data.templates);
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Could not load templates");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchTemplates();
    return () => {
      cancelled = true;
    };
  }, []);

  const roomOptions = useMemo(() => {
    const set = new Set(templates.map((t) => t.size_room));
    return Array.from(set).sort();
  }, [templates]);

  const styleOptions = useMemo(() => {
    const set = new Set(templates.map((t) => t.style));
    return Array.from(set).sort();
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    return templates.filter((t) => {
      const matchRoom = roomFilter === "All" || t.size_room === roomFilter;
      const matchStyle = styleFilter === "All" || t.style === styleFilter;
      return matchRoom && matchStyle;
    });
  }, [templates, roomFilter, styleFilter]);

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
              Inspiration Gallery
            </h1>
            <p className="max-w-xl text-lg text-gray-400">
              Explore ready-to-scale templates curated by AI and expert designers. All layouts are spatially accurate
              for your scan.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap items-center gap-4 border-b border-white/5 pb-8">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-400">
            <FilterIcon /> Filter By
          </div>
          <select
            value={roomFilter}
            onChange={(e) => setRoomFilter(e.target.value)}
            className="cursor-pointer appearance-none rounded-full border border-white/10 bg-gray-900 px-6 py-2.5 text-sm font-medium text-white outline-none transition-all hover:bg-white/5 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="All">Room Type: All</option>
            {roomOptions.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
          <select
            value={styleFilter}
            onChange={(e) => setStyleFilter(e.target.value)}
            className="cursor-pointer appearance-none rounded-full border border-white/10 bg-gray-900 px-6 py-2.5 text-sm font-medium text-white outline-none transition-all hover:bg-white/5 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="All">Style: All</option>
            {styleOptions.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              setRoomFilter("All");
              setStyleFilter("All");
            }}
            className="px-4 text-xs font-bold uppercase tracking-widest text-indigo-400 hover:underline"
          >
            Reset
          </button>
        </div>

        {loading && (
          <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md">
            <p className="text-gray-400">Loading templates…</p>
          </div>
        )}

        {error && !loading && (
          <div className="rounded-3xl border border-red-500/30 bg-red-500/10 px-6 py-8 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && filteredTemplates.length > 0 && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} onSelect={() => {}} />
            ))}
          </div>
        )}

        {!loading && !error && filteredTemplates.length === 0 && (
          <div className="rounded-3xl border border-white/5 bg-white/5 py-20 text-center backdrop-blur-md">
            <p className="text-xl text-gray-500">No templates found for this selection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
