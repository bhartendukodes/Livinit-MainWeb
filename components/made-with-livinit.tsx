"use client";

import "@google/model-viewer";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const API_URL = "https://api.livinit.ai/api/v1/templates/livinit";
const TEMPLATES_LIMIT = 20;

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
  const styleLabel =
    style.charAt(0).toUpperCase() + style.slice(1).toLowerCase();
  const sizeLabel =
    sizeRoom.charAt(0).toUpperCase() + sizeRoom.slice(1).toLowerCase();
  return `${styleLabel} · ${sizeLabel}`;
}

export default function MadeWithLivinit() {
  const [templates, setTemplates] = useState<LivinitTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Fetch all 20 templates on load, then prefetch all GLB URLs so they’re cached when user scrolls down
  useEffect(() => {
    let cancelled = false;
    async function fetchTemplates() {
      try {
        const res = await fetch(`${API_URL}?limit=${TEMPLATES_LIMIT}`, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok)
          throw new Error(`Failed to load templates (${res.status})`);
        const data = (await res.json()) as { templates: LivinitTemplate[] };
        if (!cancelled && data.templates?.length) {
          setTemplates(data.templates);
          // Prefetch all GLB models in background so they’re ready when user scrolls
          data.templates.forEach((t) => {
            fetch(t.model_glb).catch(() => {});
          });
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "Could not load templates"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchTemplates();
    return () => {
      cancelled = true;
    };
  }, []);

  // When user scrolls down and section enters viewport, reveal gradually
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setInView(true);
        }
      },
      { rootMargin: "80px 0px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const slide = templates[current];
  const hasSlides = templates.length > 0;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-gray-800 py-12 md:py-16"
    >
      <div
        className="section-bg-float pointer-events-none absolute -left-1/4 top-1/4 -z-10 h-[50vmin] w-[50vmin] rounded-full bg-purple-500/30 blur-[60px]"
        aria-hidden
      />
      <div
        className="section-bg-float-slow pointer-events-none absolute -right-1/4 bottom-1/4 -z-10 h-[55vmin] w-[55vmin] rounded-full bg-indigo-500/30 blur-[60px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-purple-950/15 to-transparent"
        aria-hidden
      />
      <div
        className="section-bg-grid-purple pointer-events-none absolute inset-0 -z-10 opacity-60"
        aria-hidden
      />

      <div
        className={`relative z-10 mx-auto max-w-5xl px-4 sm:px-6 transition-all duration-700 ease-out ${
          inView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="mb-10 text-center md:mb-12">
          <h2 className="font-nacelle text-3xl font-bold text-white md:text-4xl">
            Made with LIVINIT
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-300">
            Real rooms. Real products. Real budgets.
          </p>
          <Link
            href="/catalog"
            className="group mt-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-400 transition-colors hover:text-indigo-400"
          >
            View full catalog
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {loading && (
          <div className="flex min-h-[360px] items-center justify-center rounded-3xl bg-gray-800/40 ring-1 ring-gray-700/50">
            <p className="text-gray-400">Loading templates…</p>
          </div>
        )}

        {error && !loading && (
          <div className="rounded-3xl bg-red-500/10 px-6 py-8 text-center ring-1 ring-red-500/30">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && hasSlides && slide && (
          <div className="relative">
            <div className="overflow-hidden rounded-3xl bg-gray-900 shadow-2xl ring-1 ring-gray-700/50">
              {/* GLB viewer: full width, fixed aspect, model fits fully inside card (sharp, no crop) */}
              <div className="made-with-livinit-viewer relative w-full aspect-[16/10] min-h-[280px] md:min-h-[340px]">
                {React.createElement("model-viewer", {
                  src: slide.model_glb,
                  alt: `${formatTitle(slide.style, slide.size_room)} room – 3D model`,
                  "camera-controls": true,
                  "auto-rotate": true,
                  "camera-orbit": "0deg 75deg 2.5m",
                  "min-field-of-view": "30deg",
                  "max-field-of-view": "70deg",
                })}

                {/* Gradient overlay for text readability */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"
                  aria-hidden
                />

                {/* Bottom overlay: title + cost */}
                <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-4 p-6 md:p-8">
                  <div>
                    <h3 className="font-nacelle text-xl font-bold text-white md:text-2xl">
                      {formatTitle(slide.style, slide.size_room)}
                    </h3>
                    <p className="mt-1 text-sm text-white/90">
                      Designed in under 60 seconds
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium uppercase tracking-wider text-white/80">
                      Total Room Cost
                    </p>
                    <p className="font-nacelle text-2xl font-bold text-white md:text-3xl">
                      {slide.total_cost}
                    </p>
                  </div>
                </div>

                {/* Carousel arrows */}
                <button
                  type="button"
                  onClick={() =>
                    setCurrent((c) =>
                      c === 0 ? templates.length - 1 : c - 1
                    )
                  }
                  className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-lg transition-all hover:scale-105 hover:bg-white"
                  aria-label="Previous slide"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCurrent((c) =>
                      c === templates.length - 1 ? 0 : c + 1
                    )
                  }
                  className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-lg transition-all hover:scale-105 hover:bg-white"
                  aria-label="Next slide"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {templates.map((_, i) => (
                <button
                  key={templates[i].id}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    i === current
                      ? "bg-indigo-500 ring-2 ring-indigo-500/50 ring-offset-2 ring-offset-gray-950"
                      : "bg-gray-500 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && !error && !hasSlides && (
          <div className="flex min-h-[240px] items-center justify-center rounded-3xl bg-gray-800/40 ring-1 ring-gray-700/50">
            <p className="text-gray-400">No templates available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
