"use client";

export default function Cta() {
  return (
    <section className="relative overflow-hidden border-t border-gray-800 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        {/* Tag */}
        <div className="mb-6 inline-flex items-center rounded-full bg-indigo-500/20 px-4 py-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
            Retail Reality Sync
          </span>
        </div>

        {/* Title */}
        <h2 className="font-nacelle text-4xl font-bold text-white md:text-5xl">
          Livinit{" "}
          <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
            (Try Beta)
          </span>
        </h2>
        <p className="mt-2 font-nacelle text-3xl font-bold text-white md:text-4xl">
          For free
        </p>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300">
          The first AI interior designer that respects your floor plan and your
          budget. Join the waitlist for 2026 early access.
        </p>

        {/* Email + Join Beta CTA */}
        <form
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:items-stretch"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email address..."
            className="form-input min-h-12 flex-1 rounded-xl border border-gray-600 bg-gray-800/80 px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 sm:min-w-0"
            aria-label="Email address"
          />
          <button
            type="submit"
            className="btn shrink-0 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/30"
          >
            Join the Beta
          </button>
        </form>

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
