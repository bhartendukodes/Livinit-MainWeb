"use client";

import React, { useState } from "react";

// Inline icons (lucide-style) – same visual as reference
const Icons = {
  Palette: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.648 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.658-1.658c.473 0 .896.149 1.225.438.27.258.607.437 1.084.437a1.64 1.64 0 0 0 1.649-1.649c0-.477-.18-.815-.438-1.084C19.335 8.18 19.737 8 20.174 8 .746 8 2 6.5 2 12 2Z" />
    </svg>
  ),
  Box: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  Cpu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="16" x="4" y="4" rx="2" ry="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2M15 20v2M9 2v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2" />
    </svg>
  ),
  Smartphone: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  ),
  Database: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  BarChart3: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />
    </svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  ShieldCheck: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Sparkles: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  Activity: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  PenTool: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19 7-7 3 3-7 7-3-3z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="m2 2 7.586 7.586" />
    </svg>
  ),
  Maximize: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  ),
  Globe: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
    </svg>
  ),
};

interface FeatureDetail {
  id: string;
  iconKey: keyof typeof Icons;
  title: string;
  desc: string;
  features: string[];
  detailedContent: string;
  technicalSpecs: string[];
  imageUrl: string;
}

const FEATURE_DETAILS: FeatureDetail[] = [
  {
    id: "upholstery",
    iconKey: "Palette",
    title: "Upholstery Try-on",
    desc: "Enable real-time material swapping for thousands of fabrics and leathers. Supports Customers Own Material (COM) with photorealistic draping.",
    features: ["COM Visualization", "Dynamic Texture Swapping", "Photorealistic Renders", "Unlimited Swatch Support"],
    detailedContent:
      "Our state-of-the-art upholstery engine simulates high-fidelity textile physics, ensuring that fabrics drape naturally over curves, cushions, and seams. By leveraging 4K texture scanning, we provide a 1:1 digital twin of physical swatches, capturing accurate sheen, weave, and thread detail.",
    technicalSpecs: ["PBR workflow", "4K Texture support", "Real-time shader", "Mobile optimized"],
    imageUrl: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "conversion",
    iconKey: "Box",
    title: "2D to 3D Conversion",
    desc: "Our proprietary pipeline converts your existing 2D product photos and CAD drawings into web-optimized 3D assets.",
    features: ["GLB/USDZ Output", "PBR Material Mastery", "Batch Asset Creation", "Quality Assurance Check"],
    detailedContent:
      "The bridge from physical to digital commerce. We use a hybrid AI and human-in-the-loop system to ensure millimeter accuracy from basic 2D reference images or technical CAD drawings. Every asset is meticulously optimized for lightning-fast web performance.",
    technicalSpecs: ["Auto-topology", "Draco compression", "Multi-format export", "Auto material mapping"],
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "layouts",
    iconKey: "Cpu",
    title: "AI Contextual Layouts",
    desc: "Generate intelligent room arrangements that respect your product's spatial rules, clearances, and aesthetic pairings.",
    features: ["Rule-Based Placement", "Spatial Constraint Logic", "Automatic Upselling", "Ready-to-Buy Sets"],
    detailedContent:
      "Our AI 'Visual Brain' understands that a coffee table needs clearance and a rug should properly frame a seating area. By analyzing floor plan data, the engine suggests complementary lighting and accessories based on your brand's unique style guide.",
    technicalSpecs: ["Heuristic solver", "Neural style matching", "Dynamic clearance", "Affinity algorithms"],
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ar",
    iconKey: "Smartphone",
    title: "Enterprise AR",
    desc: "Give customers the confidence to buy with dimension-accurate Augmented Reality that requires no app download.",
    features: ["Web-Based AR (WebXR)", "Auto-Scaling", "Real-World Shadows", "Quick-Buy Integration"],
    detailedContent:
      "Frictionless visualization at the point of purchase. By leveraging native browser capabilities (WebXR), we allow users to 'drop' products into their living room with zero app installs. Real-time lighting estimation matches environment reflections.",
    technicalSpecs: ["iOS/Android native", "Plane detection", "Light estimation", "Direct 'Add to Cart'"],
    imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "cloud",
    iconKey: "Database",
    title: "3D Asset Cloud",
    desc: "Manage your entire 3D catalog from a centralized, secure cloud platform. One source of truth for all channels.",
    features: ["Asset Versioning", "Multi-Platform Sync", "CDN Delivery", "Team Collaboration"],
    detailedContent:
      "The backbone of your digital storefront. Manage thousands of SKUs, material variations, and metadata from a centralized, secure dashboard. Stream assets directly to your website or social commerce channels.",
    technicalSpecs: ["RESTful API", "Edge CDN", "RBAC control", "Version history"],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "analytics",
    iconKey: "BarChart3",
    title: "Placement Analytics",
    desc: "Monitor how often products are placed, configured, and added to cart within 3D environments.",
    features: ["Interaction Heatmaps", "Conversion Attribution", "Regional Trends", "Material Popularity Data"],
    detailedContent:
      "Data-driven design decisions. See which corners of the room users prefer, which fabric colors have the highest 'linger time,' and identify friction points in the spatial journey. Track 'fit confidence' metrics to measure ROI.",
    technicalSpecs: ["Real-time session", "SKU interaction", "Event tagging", "PDF/CSV exports"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&w=1200&q=80",
  },
];

function FeatureDetailModal({
  feature,
  onClose,
}: {
  feature: FeatureDetail;
  onClose: () => void;
}) {
  const Icon = Icons[feature.iconKey];
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div
        className="absolute inset-0 bg-black/98 backdrop-blur-2xl"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-[3rem] border border-white/10 bg-gray-900/95 shadow-2xl backdrop-blur-md">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-8 right-8 z-20 rounded-full p-3 text-gray-400 transition-colors hover:bg-white/10"
          aria-label="Close"
        >
          <Icons.X />
        </button>

        <div className="grid min-h-[600px] grid-cols-1 lg:grid-cols-2">
          {/* Visual Side */}
          <div className="relative h-[300px] overflow-hidden lg:h-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={feature.imageUrl}
              alt={feature.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-12 left-12 right-12">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-2xl">
                <Icon />
              </div>
              <h2 className="mb-4 text-4xl font-bold text-white">{feature.title}</h2>
              <div className="flex flex-wrap gap-2">
                {feature.features.map((f, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-[10px] font-bold text-indigo-400 backdrop-blur-md"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-center p-8 md:p-16">
            <div className="space-y-12">
              <section>
                <div className="mb-4 flex items-center gap-2 text-indigo-400">
                  <Icons.Sparkles />
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em]">The Innovation</h4>
                </div>
                <p className="mb-6 text-xl font-light leading-relaxed text-white">{feature.desc}</p>
                <p className="border-l-2 border-indigo-500/30 pl-6 leading-relaxed text-gray-400">
                  {feature.detailedContent}
                </p>
              </section>

              <section>
                <div className="mb-4 flex items-center gap-2 text-indigo-400">
                  <Icons.Activity />
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Platform Capabilities</h4>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {feature.technicalSpecs.map((spec) => (
                    <div
                      key={spec}
                      className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 transition-colors hover:border-white/10"
                    >
                      <Icons.ShieldCheck />
                      <span className="text-sm font-medium text-gray-300">{spec}</span>
                    </div>
                  ))}
                </div>
              </section>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-indigo-500 px-12 py-5 font-bold text-white shadow-xl transition-all hover:scale-105 hover:bg-indigo-600 sm:w-auto"
                >
                  Request Integration Guide <Icons.ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SolutionCard({
  feature,
  onClick,
}: {
  feature: FeatureDetail;
  onClick: () => void;
}) {
  const Icon = Icons[feature.iconKey];
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/5 p-0 text-left backdrop-blur-md transition-all duration-500 hover:border-indigo-500/40 hover:bg-white/[0.04]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={feature.imageUrl}
          alt={feature.title}
          className="h-full w-full object-cover opacity-40 grayscale transition-all duration-700 group-hover:scale-110 group-hover:opacity-70 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
        <div className="absolute left-6 top-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-indigo-500/20 text-indigo-400 backdrop-blur-md transition-transform group-hover:scale-110">
            <Icon />
          </div>
        </div>
        <div className="absolute bottom-6 left-8 right-8">
          <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-indigo-400">
            {feature.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-grow flex-col p-8">
        <p className="mb-8 line-clamp-2 text-sm leading-relaxed text-gray-400">{feature.desc}</p>
        <ul className="mt-auto space-y-3 border-t border-white/5 pt-6">
          {feature.features.map((f, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-xs font-medium text-gray-500 transition-colors group-hover:text-gray-300"
            >
              <div className="h-1 w-1 rounded-full bg-indigo-500/40 transition-all group-hover:bg-indigo-500" /> {f}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100">
            View Details
          </span>
          <span className="inline-flex text-indigo-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 translate-x-[-10px]">
            <Icons.ArrowRight />
          </span>
        </div>
      </div>
    </button>
  );
}

export default function Partner3DEcosystem() {
  const [activeFeature, setActiveFeature] = useState<FeatureDetail | null>(null);

  return (
    <section className="relative py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-24 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl text-white">
              Full-Stack <br />
              <span className="text-indigo-400">3D Ecosystem.</span>
            </h2>
            <p className="text-lg leading-relaxed text-gray-500">
              Scale your visual commerce from discovery to checkout. Click a card to explore our modular platform solutions.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="flex items-center gap-4 rounded-3xl border border-indigo-500/20 bg-white/5 px-6 py-4 backdrop-blur-md">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 overflow-hidden rounded-full border-2 border-gray-950 bg-white/10"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://i.pravatar.cc/40?img=${i + 10}`}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-xs">
                <span className="font-bold text-white">50+ Brands</span>
                <p className="text-gray-500">Live on platform</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {FEATURE_DETAILS.map((feature) => (
            <SolutionCard
              key={feature.id}
              feature={feature}
              onClick={() => setActiveFeature(feature)}
            />
          ))}
        </div>
      </div>

      {activeFeature && (
        <FeatureDetailModal feature={activeFeature} onClose={() => setActiveFeature(null)} />
      )}
    </section>
  );
}
