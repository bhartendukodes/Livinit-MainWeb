"use client";

export default function PartnerHero() {
  return (
    <section className="relative overflow-hidden pb-6 md:pb-8 pt-8 md:pt-12">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <div className="py-8 md:py-12">
          <div className="pb-4 md:pb-6 text-center">
            {/* Top badge */}
            <div className="mb-6 md:mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-white">
              <span aria-hidden>⚡</span> THE VISUAL COMMERCE ENGINE
            </div>

            {/* Headline */}
            <h1 className="font-nacelle text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-7xl">
              Sell more with <br />
              <span className="text-white">Spatial Intelligence.</span>
            </h1>

            <div className="mx-auto mt-6 max-w-2xl">
              <p className="mb-10 text-lg text-gray-400 leading-relaxed md:mb-12 md:text-xl">
                The unified platform for furniture brands to manage, visualize, and sell through photorealistic 3D, AR, and AI-driven spatial layouts.
              </p>

              {/* CTAs */}
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                <a
                  href="/#retail-reality-sync"
                  className="w-full rounded-full bg-indigo-500 px-10 py-4 font-bold text-white transition-all hover:bg-indigo-600 hover:scale-105 sm:w-auto"
                >
                  Request Platform Access
                </a>
                <button
                  type="button"
                  className="w-full rounded-full border border-indigo-500/40 bg-transparent px-10 py-4 font-bold text-white transition-all hover:bg-white/5 sm:w-auto"
                >
                  Watch Platform Overview
                </button>
              </div>

              {/* Partner brands - horizontal marquee */}
              <div
                className="mx-auto mt-12 w-full max-w-4xl overflow-hidden"
                aria-hidden
              >
                <div className="hero-brands-marquee flex w-max items-center gap-x-12 sm:gap-x-16 md:gap-x-20">
                  <span className="shrink-0 text-base font-medium text-gray-500">
                    WAYFAIR
                  </span>
                  <span className="shrink-0 text-base italic text-gray-400">
                    WEST ELM
                  </span>
                  <span className="shrink-0 text-base font-bold uppercase tracking-wide text-gray-500">
                    CRATE & BARREL
                  </span>
                  <span className="shrink-0 text-base font-medium uppercase tracking-wide text-gray-500">
                    Pottery Barn
                  </span>
                  <span className="shrink-0 text-base font-medium text-gray-500">
                    WAYFAIR
                  </span>
                  <span className="shrink-0 text-base italic text-gray-400">
                    WEST ELM
                  </span>
                  <span className="shrink-0 text-base font-bold uppercase tracking-wide text-gray-500">
                    CRATE & BARREL
                  </span>
                  <span className="shrink-0 text-base font-medium uppercase tracking-wide text-gray-500">
                    Pottery Barn
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
