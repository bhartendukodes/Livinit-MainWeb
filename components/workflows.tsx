import React from "react";

export default function Workflows() {
  const steps = [
    {
      title: "Scan",
      desc: "Use your device to scan your room in seconds. Dimensions and obstacles are automatically captured.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3H5a2 2 0 0 0-2 2v3" />
          <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
          <path d="M3 16v3a2 2 0 0 0 2 2h3" />
          <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
        </svg>
      ),
    },
    {
      title: "AI Generation",
      desc: "Our engine generates multiple on-brief layouts that respect walkways, budget, and style constraints.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
    {
      title: "Shop",
      desc: "One-click checkout for entire room sets. Every piece is guaranteed to fit perfectly.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
    },
  ];

  const Arrow = () => (
    <div className="flex shrink-0 items-center justify-center text-gray-500">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  );

  return (
    <section className="relative min-h-[420px] overflow-hidden pt-8 pb-12 md:min-h-[380px] md:pt-10 md:pb-16">
      {/* Full-height background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent" aria-hidden />
      <div className="section-bg-float pointer-events-none absolute -left-1/4 top-1/4 -z-10 h-[50vmin] w-[50vmin] rounded-full bg-indigo-500/20 blur-[60px]" aria-hidden />
      <div className="section-bg-float-slow pointer-events-none absolute -right-1/4 bottom-1/4 -z-10 h-[55vmin] w-[55vmin] rounded-full bg-purple-500/20 blur-[60px]" aria-hidden />
      <div className="section-bg-grid pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-10 text-center md:mb-12">
          <h2 className="font-nacelle text-4xl font-semibold text-white md:text-5xl">
            The Spatial-Commerce Engine
          </h2>
        </div>

        {/* Three steps - horizontal with arrows */}
        <div className="flex flex-col items-stretch gap-8 md:flex-row md:items-start md:justify-center md:gap-4 lg:gap-8">
          {steps.map((step, idx) => (
            <React.Fragment key={step.title}>
              <div className="flex flex-1 flex-col items-center text-center md:max-w-[280px]">
                <div className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-700/80 text-white">
                  {step.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-white md:text-xl">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {step.desc}
                </p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden shrink-0 items-center py-6 md:flex">
                  <Arrow />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}
