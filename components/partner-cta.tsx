"use client";

export default function PartnerCta() {
  return (
    <section className="relative overflow-hidden border-t border-gray-800 py-16 md:py-24">
      {/* Background animations – visible */}
      <div
        className="section-bg-float pointer-events-none absolute -left-1/4 top-1/3 -z-10 h-[55vmin] w-[55vmin] rounded-full bg-indigo-500/35 blur-[55px]"
        aria-hidden
      />
      <div
        className="section-bg-float-slow pointer-events-none absolute -right-1/4 bottom-1/3 -z-10 h-[50vmin] w-[50vmin] rounded-full bg-purple-500/30 blur-[55px]"
        aria-hidden
      />
      <div
        className="section-float-orb-2 pointer-events-none absolute left-[10%] top-[40%] -z-10 h-16 w-16 rounded-full bg-indigo-500/50 md:h-20 md:w-20"
        aria-hidden
      />
      <div
        className="section-float-orb-4 pointer-events-none absolute right-[15%] top-[35%] -z-10 h-12 w-12 rounded-full bg-purple-500/50 md:h-14 md:w-14"
        aria-hidden
      />
      <div
        className="section-bg-grid-indigo pointer-events-none absolute inset-0 -z-10 opacity-50"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="partner-cta-title mb-4 font-nacelle text-3xl font-semibold text-white md:text-4xl">
          Ready to Transform Your Sales?
        </h2>
        <p className="partner-cta-desc mb-10 text-lg text-gray-300 leading-relaxed md:mb-12">
          Join innovative retailers who are already seeing higher conversion
          rates and happier customers.
        </p>
        <a
          href="/partner#onboarding"
          className="partner-cta-btn inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:from-indigo-500 hover:to-purple-500 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02]"
        >
          Get Started Today
        </a>
      </div>
    </section>
  );
}
