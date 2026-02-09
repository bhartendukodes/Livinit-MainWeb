"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useMemo } from "react";
import PageIllustration from "@/components/page-illustration";
import type { LivinitTemplate } from "@/components/template-modal";

const API_URL = "https://api.livinit.ai/api/v1/templates/livinit";
const PER_PAGE = 15;

const TemplateModal = dynamic(
  () => import("@/components/template-modal"),
  { ssr: false }
);

function TemplateCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/5 bg-gray-900">
      <div className="relative aspect-[4/3] w-full bg-gray-800">
        <div className="shimmer h-full w-full" />
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="shimmer h-6 w-3/4 rounded" />
          <div className="shimmer h-6 w-16 rounded" />
        </div>
        <div className="shimmer h-4 w-1/2 rounded" />
      </div>
    </div>
  );
}

function formatTitle(style: string, sizeRoom: string): string {
  const s = style.charAt(0).toUpperCase() + (style || "").slice(1).toLowerCase();
  const r = (sizeRoom || "").charAt(0).toUpperCase() + (sizeRoom || "").slice(1).toLowerCase();
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

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23374151' width='400' height='300'/%3E%3Ctext fill='%239ca3af' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14'%3ERoom%3C/text%3E%3C/svg%3E";

function TemplateCard({ template, onSelect }: { template: LivinitTemplate; onSelect: (t: LivinitTemplate) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const name = formatTitle(template.style, template.size_room);
  const imgSrc = template.image_url && !imgError ? template.image_url : PLACEHOLDER_IMAGE;

  return (
    <button
      type="button"
      onClick={() => onSelect(template)}
      className="group relative w-full overflow-hidden rounded-3xl border border-white/5 bg-gray-900 text-left transition-all hover:border-indigo-500/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imgSrc}
          alt={name}
          className={`h-full w-full object-cover transition-all duration-700 ${isHovered ? "scale-110 blur-sm brightness-50" : ""}`}
          onError={() => setImgError(true)}
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
        <p className="text-sm text-gray-500">
          {template.size_room} · {template.no_of_assets} Products
        </p>
      </div>
    </button>
  );
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<LivinitTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roomFilter, setRoomFilter] = useState<string>("All");
  const [styleFilter, setStyleFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<LivinitTemplate | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchTemplates() {
      try {
        const res = await fetch(`${API_URL}?limit=100`, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`Failed to load templates (${res.status})`);
        const data = (await res.json()) as { templates?: LivinitTemplate[] };
        const list = Array.isArray(data.templates) ? data.templates : [];
        if (!cancelled) setTemplates(list);
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Could not load templates");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchTemplates();
    return () => { cancelled = true; };
  }, []);

  const roomOptions = useMemo(() => {
    const set = new Set(
      templates
        .map((t) => (t.size_room || "").trim())
        .filter((v) => v.length > 0)
    );
    return Array.from(set).sort();
  }, [templates]);

  const styleOptions = useMemo(() => {
    const set = new Set(
      templates
        .map((t) => (t.style || "").trim())
        .filter((v) => v.length > 0)
    );
    return Array.from(set).sort();
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    const room = (roomFilter || "").trim().toLowerCase();
    const style = (styleFilter || "").trim().toLowerCase();
    return templates.filter((t) => {
      const tRoom = (t.size_room || "").trim().toLowerCase();
      const tStyle = (t.style || "").trim().toLowerCase();
      const matchRoom = room === "" || room === "all" || tRoom === room;
      const matchStyle = style === "" || style === "all" || tStyle === style;
      return matchRoom && matchStyle;
    });
  }, [templates, roomFilter, styleFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredTemplates.length / PER_PAGE));
  const paginatedTemplates = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return filteredTemplates.slice(start, start + PER_PAGE);
  }, [filteredTemplates, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [roomFilter, styleFilter]);

  return (
    <div className="relative min-h-screen">
      <PageIllustration />
      {/* Single content wrapper – same width & horizontal padding as home (max-w-6xl px-4 sm:px-6) */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        {/* Templates page hero */}
        <section className="border-t border-gray-800 pt-16 pb-10 md:pt-20 md:pb-14">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">
              Templates
            </span>
          </div>
          <h1 className="mb-3 font-nacelle text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Inspiration Gallery
          </h1>
          <p className="max-w-xl text-lg text-gray-400">
            Explore ready-to-scale templates. All layouts are spatially accurate for your scan.
          </p>
        </section>

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
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <TemplateCardSkeleton key={i} />
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="rounded-3xl border border-red-500/30 bg-red-500/10 px-6 py-8 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && filteredTemplates.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {paginatedTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={setSelectedTemplate}
                />
              ))}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-full border border-white/10 bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/5 disabled:pointer-events-none disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-full border border-white/10 bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/5 disabled:pointer-events-none disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {!loading && !error && filteredTemplates.length === 0 && (
          <div className="rounded-3xl border border-white/5 bg-white/5 py-20 text-center backdrop-blur-md">
            <p className="text-xl text-gray-500">No templates found for this selection.</p>
          </div>
        )}
      </div>
      {/* end single content wrapper */}

      {selectedTemplate && (
        <TemplateModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </div>
  );
}
