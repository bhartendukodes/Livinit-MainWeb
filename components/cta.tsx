"use client";

import { useState, useRef, useEffect } from "react";

export default function Cta() {
  const [showExtraFields, setShowExtraFields] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);

  // When user scrolls to bottom of section (came from below), show the 3 fields
  useEffect(() => {
    const sentinel = bottomSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setShowExtraFields(true);
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const revealExtra = () => setShowExtraFields(true);

  return (
    <section
      id="retail-reality-sync"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-gray-800 py-16 md:py-24 scroll-mt-24"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        {/* Tag */}
        <div className="mb-6 inline-flex items-center rounded-full bg-indigo-500/20 px-4 py-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
            Retail Reality Sync
          </span>
        </div>

        {/* Title */}
        <h2 className="font-nacelle text-4xl font-bold text-white md:text-5xl">
          LIVINIT{" "}
          <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
            (Try Beta)
          </span>
        </h2>
        <p className="mt-2 font-nacelle text-3xl font-bold text-white md:text-4xl">
          For free
        </p>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300">
          Spatially intelligent, budget-aware. Enter your email to get a private
          beta link for to-scale layouts that fit your floor plan.
        </p>

        {/* Form: 3 fields (above) → Email → Join Beta button (below) */}
        <form
          className="mx-auto mt-8 flex max-w-md flex-col gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Expandable: First name, Last name, Phone – only after email click/focus, ABOVE email */}
          <div
            className={`max-w-md overflow-hidden transition-all duration-500 ease-out ${
              showExtraFields ? "max-h-[280px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="First name (required)"
                  required
                  className="form-input min-h-12 rounded-xl border border-gray-600 bg-gray-800/80 px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                  aria-label="First name (required)"
                />
                <input
                  type="text"
                  placeholder="Last name (required)"
                  required
                  className="form-input min-h-12 rounded-xl border border-gray-600 bg-gray-800/80 px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                  aria-label="Last name (required)"
                />
              </div>
              <input
                type="tel"
                placeholder="Phone number (optional)"
                className="form-input min-h-12 rounded-xl border border-gray-600 bg-gray-800/80 px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                aria-label="Phone number (optional)"
              />
            </div>
          </div>

          {/* Email – full width; clicking/focusing here reveals the 3 fields above */}
          <input
            type="email"
            placeholder="Enter your email address... (required)"
            required
            className="form-input min-h-12 w-full rounded-xl border border-gray-600 bg-gray-800/80 px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
            aria-label="Email address (required)"
            onFocus={revealExtra}
            onClick={revealExtra}
          />

          {/* Join the Beta – below email, full width */}
          <button
            type="submit"
            onClick={revealExtra}
            className="btn w-full rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/30"
          >
            Join the Beta
          </button>
        </form>

        {/* Sentinel: when user scrolls from below and this is in view, show the 3 fields */}
        <div ref={bottomSentinelRef} className="h-20 w-full" aria-hidden />

        {/* Footnotes */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium uppercase tracking-wider text-gray-400">
          <span className="inline-flex items-center gap-2">
            <span className="text-green-400">✓</span>
            No credit card required
          </span>
          <span className="h-4 w-px bg-gray-600" aria-hidden />
          <span>Limited spots available</span>
        </div>
      </div>
    </section>
  );
}
