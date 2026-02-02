"use client";

const INTEGRATIONS = [
  "Shopify",
  "WooCommerce",
  "BigCommerce",
  "Custom API",
  "Product Feeds",
];

export default function PartnerIntegration() {
  return (
    <section className="relative overflow-hidden border-t border-gray-800 py-16 md:py-20">
      {/* Background animations – visible */}
      <div
        className="section-bg-float pointer-events-none absolute -right-1/4 top-1/4 -z-10 h-[60vmin] w-[60vmin] rounded-full bg-indigo-500/35 blur-[55px]"
        aria-hidden
      />
      <div
        className="section-bg-float-slow pointer-events-none absolute -left-1/4 bottom-1/4 -z-10 h-[50vmin] w-[50vmin] rounded-full bg-purple-500/30 blur-[55px]"
        aria-hidden
      />
      <div
        className="section-float-orb-1 pointer-events-none absolute right-[15%] top-[25%] -z-10 h-12 w-12 rounded-full bg-indigo-500/55 md:h-14 md:w-14"
        aria-hidden
      />
      <div
        className="section-float-orb-3 pointer-events-none absolute left-[20%] bottom-[30%] -z-10 h-10 w-10 rounded-full bg-purple-500/50 md:h-12 md:w-12"
        aria-hidden
      />
      <div
        className="section-bg-grid-integration pointer-events-none absolute inset-0 -z-10 opacity-55"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
        <div className="partner-integration-enter rounded-3xl border border-gray-700/50 bg-gray-800/40 px-8 py-12 shadow-xl backdrop-blur-sm md:px-12 md:py-16">
          <h2 className="mb-4 text-center font-nacelle text-2xl font-semibold text-white md:text-3xl">
            Seamless Integration
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-gray-300 leading-relaxed md:mb-12">
            We integrate with your existing systems. No complex setup, no
            technical headaches. Our team handles everything from product feed
            integration to 3D model generation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {INTEGRATIONS.map((name, i) => (
              <span
                key={name}
                className={`partner-tag-enter partner-tag-delay-${i} rounded-full border border-gray-600/60 bg-gray-700/50 px-5 py-2.5 text-sm font-medium text-gray-200 transition-all duration-300 hover:border-indigo-500/50 hover:bg-indigo-500/20 hover:text-white`}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
