"use client";

export default function AppDownloadCta() {
  return (
    <section className="relative overflow-hidden border-t border-gray-800 py-16 md:py-24">
      {/* Background animations – visible */}
      <div
        className="section-bg-float pointer-events-none absolute -right-1/4 top-1/4 -z-10 h-[55vmin] w-[55vmin] rounded-full bg-indigo-500/35 blur-[55px]"
        aria-hidden
      />
      <div
        className="section-bg-float-slow pointer-events-none absolute -left-1/4 bottom-1/4 -z-10 h-[50vmin] w-[50vmin] rounded-full bg-purple-500/30 blur-[55px]"
        aria-hidden
      />
      <div
        className="section-float-orb-1 pointer-events-none absolute right-[20%] top-[30%] -z-10 h-12 w-12 rounded-full bg-indigo-500/50 md:h-14 md:w-14"
        aria-hidden
      />
      <div
        className="section-float-orb-3 pointer-events-none absolute left-[15%] bottom-[35%] -z-10 h-10 w-10 rounded-full bg-purple-500/45 md:h-12 md:w-12"
        aria-hidden
      />
      <div
        className="section-bg-grid-indigo pointer-events-none absolute inset-0 -z-10 opacity-50"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="app-download-title font-nacelle text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          Your Room is Waiting
        </h2>
        <p className="app-download-subtitle mt-3 text-lg text-gray-300 md:text-xl">
          Start designing with AI that respects reality
        </p>

        <div className="app-download-buttons mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#"
            className="group flex items-center gap-3 rounded-xl bg-gray-900 px-6 py-3.5 font-medium text-white shadow-lg ring-1 ring-gray-700/50 transition-all duration-300 hover:bg-gray-800 hover:ring-indigo-500/40 hover:scale-[1.02]"
            aria-label="Download on the App Store"
          >
            <svg
              className="h-8 w-8 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <span className="text-left">
              <span className="block text-[10px] uppercase tracking-wide text-gray-400">
                Download on the
              </span>
              <span className="block text-base font-semibold">App Store</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
